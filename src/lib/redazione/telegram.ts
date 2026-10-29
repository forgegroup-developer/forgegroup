import sharp from "sharp";
import {
  leggiFile,
  prChiudi,
  prCommenta,
  prCrea,
  prElenco,
  prFile,
  prPronta,
  prUnisci,
  prVedi,
  scriviCommit,
  shaDiMain,
} from "@/lib/redazione/github";

/**
 * Il bot Telegram del Redattore, lato Vercel: stessi messaggi e stessi tasti di
 * `scripts/telegram.mjs`, ma senza Mac. Risponde ai tasti tramite il webhook
 * `/api/telegram` e manda gli articoli quando GitHub avvisa `/api/github`.
 *
 * Chiave e chat: TELEGRAM_BOT_TOKEN e TELEGRAM_CHAT_ID su Vercel, mai nel repo.
 * Il bot obbedisce solo alla chat della proprietà.
 */
const SITO = "https://www.forgegroup.it";
const MAX_COPERTINA = 300 * 1024;

type Articolo = {
  title?: string;
  slug?: string;
  date?: string;
  livello?: number;
  autore?: string;
  tags?: string[];
  seo?: { parolaChiave?: string };
  inBreve?: { problema?: string; causa?: string; cambia?: string };
  content?: { type: string; text?: string; items?: string[] }[];
  faqs?: { q: string; a: string }[];
  featuredImage?: string;
  featuredImageAlt?: string;
  copertina?: { fonte?: string; pagina?: string; ricerca?: string; autore?: string; licenza?: string };
};
type Tasto = { text: string; callback_data: string };

function chiave() {
  const t = process.env.TELEGRAM_BOT_TOKEN?.trim();
  if (!t) throw new Error("manca TELEGRAM_BOT_TOKEN su Vercel");
  return t;
}
export const chatProprieta = () => (process.env.TELEGRAM_CHAT_ID ?? "").trim();

async function chiama<T = unknown>(metodo: string, dati: Record<string, unknown> = {}): Promise<T> {
  const r = await fetch(`https://api.telegram.org/bot${chiave()}/${metodo}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dati),
  });
  const j = (await r.json()) as { ok: boolean; result: T; description?: string };
  if (!j.ok) throw new Error(`Telegram ${metodo}: ${j.description}`);
  return j.result;
}

/**
 * Il Redattore gira di notte (01:00 UTC) per non consumare l'utilizzo della mattina:
 * tra le 22 e le 8 di Roma i messaggi arrivano senza suono, si leggono al risveglio.
 */
function diNotte() {
  const ora = Number(new Intl.DateTimeFormat("it-IT", { timeZone: "Europe/Rome", hour: "2-digit", hourCycle: "h23" }).format(new Date()));
  return ora >= 22 || ora < 8;
}

export const html = (s: unknown) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function messaggio(testo: string, tasti?: Tasto[], extra: Record<string, unknown> = {}) {
  return chiama("sendMessage", {
    chat_id: chatProprieta(),
    text: testo.slice(0, 4000),
    parse_mode: "HTML",
    disable_web_page_preview: true,
    disable_notification: diNotte(),
    ...(tasti ? { reply_markup: { inline_keyboard: [tasti] } } : {}),
    ...extra,
  });
}

export async function confermaTasto(id: string) {
  await chiama("answerCallbackQuery", { callback_query_id: id }).catch(() => {});
}

async function foto(immagine: Buffer, didascalia: string, tasti?: Tasto[]) {
  const dati = new FormData();
  dati.append("chat_id", chatProprieta());
  dati.append("caption", didascalia.slice(0, 1000));
  dati.append("disable_notification", String(diNotte()));
  dati.append("photo", new Blob([new Uint8Array(immagine)], { type: "image/jpeg" }), "foto.jpg");
  if (tasti) dati.append("reply_markup", JSON.stringify({ inline_keyboard: [tasti] }));
  const r = (await (await fetch(`https://api.telegram.org/bot${chiave()}/sendPhoto`, { method: "POST", body: dati })).json()) as {
    ok: boolean;
    description?: string;
  };
  if (!r.ok) throw new Error(`Telegram sendPhoto: ${r.description}`);
}

/** L'articolo intero, come lo legge il titolare, diviso in messaggi da meno di 4096 caratteri. */
function testoIntero(a: Articolo) {
  const conLink = (t: string) =>
    html(t).replace(/\[([^\]]+)\]\((\/[^)]*)\)/g, (_, testo, url) => `<a href="${SITO}${url}">${testo}</a>`);
  const parti = [`<b>${html(a.title)}</b>`];
  for (const b of a.content ?? []) {
    if (b.type === "h2" || b.type === "h3") parti.push(`<b>${html(b.text)}</b>`);
    else if (b.type === "ul") parti.push((b.items ?? []).map((v) => `• ${conLink(v)}`).join("\n"));
    else if (b.type === "quote") parti.push(`<i>${conLink(b.text ?? "")}</i>`);
    else if (b.type === "cta") parti.push(`👉 <b>${html(b.text)}</b>`);
    else if (b.text) parti.push(conLink(b.text));
  }
  if (a.faqs?.length) {
    parti.push("<b>DOMANDE FREQUENTI</b>");
    for (const f of a.faqs) parti.push(`<b>${html(f.q)}</b>\n${html(f.a)}`);
  }
  const messaggi: string[] = [];
  let corrente = "";
  for (const p of parti) {
    if ((corrente + "\n\n" + p).length > 3800) {
      messaggi.push(corrente);
      corrente = p;
    } else corrente = corrente ? `${corrente}\n\n${p}` : p;
  }
  if (corrente) messaggi.push(corrente);
  return messaggi;
}

const eArticolo = (p: string) => p.startsWith("content/articoli/") && p.endsWith(".json");

/** L'articolo di una PR, letto dal ramo (o dal commit di merge se il ramo non c'è più). */
async function articoloDellaPr(n: number | string) {
  const pr = await prVedi(n);
  const file = (await prFile(n)).find(eArticolo);
  if (!file) return { pr, file: null, a: {} as Articolo, rif: pr.headSha };
  const rif = pr.mergeSha ?? pr.headSha;
  const a = JSON.parse((await leggiFile(rif, file)).toString("utf8")) as Articolo;
  return { pr, file, a, rif };
}

/**
 * Manda l'articolo della PR. `automatico`: è già in coda (silenzio-assenso) e c'è solo Ritira;
 * altrimenti Vai, Correggi, Scarta.
 */
export async function inviaArticolo(n: number | string, modo: "automatico" | "" = "") {
  const { pr, a, rif } = await articoloDellaPr(n);
  const automatico = modo === "automatico";
  const esito = pr.body.match(/ESITO:\s*([A-Z ]+)/)?.[1]?.trim() ?? "vedi la PR";
  const testo = [
    automatico
      ? pr.labels.includes("dubbi-revisore")
        ? "✅ <b>Articolo nuovo, già in coda.</b> ⚠️ Il Revisore aveva dei dubbi: leggili nella PR. Se non ti va, premi Ritira prima del giorno di uscita."
        : "✅ <b>Articolo nuovo, già in coda.</b> Il Revisore l'ha approvato. Non devi fare niente: se non ti va, premi Ritira prima del giorno di uscita."
      : pr.isDraft
        ? "⚠️ <b>BOZZA: il Revisore ha dei dubbi, leggili nella PR</b>"
        : "📝 <b>Articolo nuovo: Vai, Correggi o Scarta?</b>",
    "",
    `<b>${html(a.title ?? pr.title)}</b>`,
    a.date ? `Esce il ${html(a.date)} alle 09:00 · livello ${html(a.livello)} · firma ${html(a.autore)}` : "",
    a.seo ? `Parola chiave: <i>${html(a.seo.parolaChiave)}</i>` : "",
    "",
    a.inBreve
      ? `<b>Il problema:</b> ${html(a.inBreve.problema)}\n<b>La causa:</b> ${html(a.inBreve.causa)}\n<b>Cosa cambia:</b> ${html(a.inBreve.cambia)}`
      : "",
    "",
    `Revisore: ${html(esito)}`,
    `L'articolo intero è nei messaggi qui sopra. Anteprima sul sito e scheda di revisione nella PR: ${pr.url}`,
  ].join("\n");
  const tasti: Tasto[] = automatico
    ? [{ text: "↩️ Ritira", callback_data: `ritira:${n}` }]
    : [
        { text: pr.isDraft ? "✅ Vai lo stesso" : "✅ Vai", callback_data: `vai:${n}` },
        { text: "✏️ Correggi", callback_data: `correggi:${n}` },
        { text: "🗑 Scarta", callback_data: `scarta:${n}` },
      ];
  if (a.featuredImage?.startsWith("/images/blog/")) {
    try {
      const immagine = await leggiFile(rif, `public${a.featuredImage}`);
      await foto(immagine, `Copertina: ${a.featuredImageAlt ?? ""}${a.copertina ? ` (${a.copertina.fonte})` : ""}`, [
        { text: "👍 Va bene", callback_data: `fotook:${n}` },
        { text: "🔄 Altre copertine", callback_data: `foto:${n}` },
      ]);
    } catch (e) {
      console.error(`copertina non inviata: ${e instanceof Error ? e.message : e}`);
    }
  }
  if (a.content) {
    const pezzi = testoIntero(a);
    for (const [i, pezzo] of pezzi.entries()) await messaggio(`${pezzo}\n\n<i>(${i + 1}/${pezzi.length})</i>`);
  }
  await messaggio(testo, tasti);
}

/* ---------- Copertine da Pixabay ---------- */

async function pixabay(parametri: Record<string, string>) {
  const key = process.env.PIXABAY_API_KEY?.trim();
  if (!key) throw new Error("manca PIXABAY_API_KEY su Vercel");
  const q = new URLSearchParams({ key, image_type: "photo", safesearch: "true", ...parametri });
  const r = await fetch(`https://pixabay.com/api/?${q}`);
  if (!r.ok) throw new Error(`Pixabay risponde ${r.status}`);
  return (await r.json()) as {
    hits: { id: number; webformatURL: string; largeImageURL: string; user: string; pageURL: string; tags: string }[];
  };
}

// Pixabay rifiuta i download senza l'intestazione di un browser (403).
const scaricaImmagine = async (url: string) =>
  Buffer.from(await (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Macintosh) ForgeRedattore" } })).arrayBuffer());

async function altreCopertine(n: string) {
  const { pr, a } = await articoloDellaPr(n);
  if (pr.state !== "OPEN") throw new Error(`la PR #${n} non è aperta`);
  const attuale = String(a.copertina?.pagina ?? "").match(/-(\d+)\/?$/)?.[1];
  const ricerche = [a.copertina?.ricerca, a.seo?.parolaChiave, a.tags?.[0]].filter((x): x is string => Boolean(x));
  const visti = new Set([attuale]);
  const scelte: { id: number; webformatURL: string }[] = [];
  for (const q of ricerche) {
    const { hits } = await pixabay({ q: q.slice(0, 100), orientation: "horizontal", per_page: "12", lang: "it", min_width: "1200" });
    for (const f of hits) {
      if (!visti.has(String(f.id)) && scelte.length < 3) {
        visti.add(String(f.id));
        scelte.push(f);
      }
    }
    if (scelte.length >= 3) break;
  }
  if (!scelte.length) return messaggio("Non ho trovato altre copertine adatte: dimmi in chat cosa vorresti vedere.");
  for (const f of scelte) {
    await foto(await scaricaImmagine(f.webformatURL), `Alternativa per la PR #${n} (Pixabay)`, [
      { text: "✅ Usa questa", callback_data: `usa:${n}:${f.id}` },
    ]);
  }
}

/** Larghezza 1600 e qualità che scende finché il file sta sotto i 300 KB (regola 6 delle immagini). */
async function comprimi(originale: Buffer) {
  for (const quality of [72, 65, 58, 50, 42]) {
    const out = await sharp(originale).resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality, mozjpeg: true }).toBuffer();
    if (out.length <= MAX_COPERTINA) return out;
  }
  throw new Error("la foto resta sopra i 300 KB: scegline un'altra");
}

async function usaCopertina(n: string, id: string) {
  const { pr, file, a } = await articoloDellaPr(n);
  if (pr.state !== "OPEN") throw new Error(`la PR #${n} non è aperta`);
  if (!file || !a.slug || !/^[a-z0-9-]+$/.test(a.slug)) throw new Error(`la PR #${n} non contiene un articolo valido`);
  const f = (await pixabay({ id: String(Number(id)) })).hits?.[0];
  if (!f) throw new Error("foto non trovata su Pixabay");
  const immagine = await comprimi(await scaricaImmagine(f.largeImageURL));
  const featuredImage = `/images/blog/${a.slug}.jpg`;
  const nuovo: Articolo = {
    ...a,
    featuredImage,
    featuredImageAlt: `Immagine di copertina dell'articolo: ${a.title}`,
    copertina: {
      fonte: "Pixabay",
      autore: f.user,
      pagina: f.pageURL,
      licenza: "Licenza dei contenuti Pixabay (uso commerciale libero)",
      ricerca: a.copertina?.ricerca,
    },
  };
  await scriviCommit({
    ramo: pr.headRefName,
    messaggio: `articolo: copertina scelta dalla proprietà su Telegram (Pixabay ${Number(id)})`,
    file: [
      { percorso: file, contenuto: Buffer.from(JSON.stringify(nuovo, null, 2) + "\n") },
      { percorso: `public${featuredImage}`, contenuto: immagine },
    ],
  });
  await foto(immagine, `Copertina aggiornata nella PR #${n}. Se ti va bene anche l'articolo, premi Vai sul suo messaggio.`, [
    { text: "✅ Vai", callback_data: `vai:${n}` },
  ]);
}

/* ---------- Ritira, promemoria ---------- */

/** Toglie dalla coda un articolo già unito: una PR che cancella il file e la copertina, unita subito. */
async function ritira(n: string) {
  const { pr, file } = await articoloDellaPr(n);
  if (pr.state === "OPEN") {
    await prChiudi(n);
    return `🗑 PR #${n} chiusa: l'articolo non entra in coda.`;
  }
  if (!file) return `La PR #${n} non contiene un articolo: non tocco niente.`;
  const slug = file.split("/").pop()!.replace(/\.json$/, "");
  const ramo = `articolo/ritira-${slug}-${Date.now().toString(36)}`;
  const daTogliere = [file];
  try {
    await leggiFile("main", `public/images/blog/${slug}.jpg`);
    daTogliere.push(`public/images/blog/${slug}.jpg`);
  } catch {
    // nessuna copertina con quel nome
  }
  await scriviCommit({
    ramo,
    crea: true,
    base: await shaDiMain(),
    messaggio: `articolo ritirato dalla proprietà: ${slug}`,
    file: daTogliere.map((percorso) => ({ percorso, contenuto: null })),
  });
  const ritiro = await prCrea({ ramo, titolo: `Ritiro: ${pr.title}`, corpo: `Ritirato dalla proprietà con il tasto Ritira su Telegram (PR #${n}).` });
  await prUnisci(ritiro.number);
  return "↩️ Articolo ritirato: non uscirà. L'argomento torna libero per il Redattore.";
}

/** Una volta al giorno (cron): le bozze ferme da più di 2 giorni. */
export async function promemoria() {
  const bozze = await prElenco({ etichetta: "articolo", bozze: true });
  const ferme = bozze.filter((b) => Date.now() - new Date(b.createdAt).getTime() > 2 * 24 * 3600 * 1000);
  if (!ferme.length) return 0;
  await messaggio(
    "⏳ <b>Bozze che aspettano una tua scelta</b>\n\n" +
      ferme.map((b) => `• PR #${b.number}: ${html(b.title)}`).join("\n") +
      "\n\nI tasti sono sotto i loro messaggi. Se il giorno di uscita passa senza risposta, la bozza si chiude da sola.",
    ferme.slice(0, 3).map((b) => ({ text: `✅ Vai #${b.number}`, callback_data: `vai:${b.number}` }))
  );
  return ferme.length;
}

/* ---------- Tasti e messaggi in arrivo ---------- */

const RICHIESTA_CORREZIONE = /^✏️ Correzione per la PR #(\d+)/;

type Aggiornamento = {
  callback_query?: { id: string; data?: string; message?: { chat?: { id: number } } };
  message?: {
    chat?: { id: number };
    text?: string;
    reply_to_message?: { text?: string; from?: { is_bot?: boolean } };
  };
};

export async function gestisci(u: Aggiornamento) {
  const daChi = String(u.callback_query?.message?.chat?.id ?? u.message?.chat?.id ?? "");
  if (!chatProprieta() || daChi !== chatProprieta()) return; // solo la proprietà

  if (u.callback_query) {
    const [azione, n, extra] = (u.callback_query.data ?? "").split(":");
    await confermaTasto(u.callback_query.id);
    if (!/^\d+$/.test(n ?? "")) return;
    try {
      if (azione === "vai") {
        // Una bozza approvata dalla proprietà diventa pronta prima del merge.
        await prPronta(n);
        await prUnisci(n);
        await messaggio(`✅ PR #${n} unita: l'articolo è in coda ed esce nel suo giorno.`);
      } else if (azione === "scarta") {
        await prChiudi(n);
        await messaggio(`🗑 PR #${n} chiusa. L'argomento torna libero.`);
      } else if (azione === "ritira") {
        await messaggio(`Ritiro l'articolo della PR #${n}…`);
        await messaggio(await ritira(n));
      } else if (azione === "fotook") {
        await messaggio(`👍 Copertina della PR #${n} confermata.`);
      } else if (azione === "foto") {
        await messaggio(`Cerco altre copertine per la PR #${n}…`);
        await altreCopertine(n);
      } else if (azione === "usa" && /^\d+$/.test(extra ?? "")) {
        await messaggio(`Metto la copertina scelta nella PR #${n}…`);
        await usaCopertina(n, extra);
      } else if (azione === "correggi") {
        // Niente stato salvato: la PR viaggia nel testo del messaggio a cui si risponde.
        await messaggio(`✏️ Correzione per la PR #${n}: rispondi a questo messaggio scrivendo (o dettando) cosa cambiare.`, undefined, {
          reply_markup: { force_reply: true, input_field_placeholder: "Cosa cambio nell'articolo?" },
        });
      }
    } catch (e) {
      await messaggio(`Non ci sono riuscito: ${html(e instanceof Error ? e.message : e).slice(0, 500)}`);
    }
    return;
  }

  const testo = u.message?.text?.trim();
  if (!testo || testo.startsWith("/")) return;
  const risposta = u.message?.reply_to_message;
  const pr = risposta?.from?.is_bot ? risposta.text?.match(RICHIESTA_CORREZIONE)?.[1] : undefined;
  if (!pr) {
    await messaggio("Ricevuto. Per correggere un articolo premi prima ✏️ Correggi sotto l'articolo, poi rispondi al messaggio che ti mando.");
    return;
  }
  // La correzione resta scritta nella PR: la applica il Redattore in una sessione con la proprietà
  // (/correggi-articolo). Nessun agente parte da solo su un messaggio arrivato da Telegram.
  await prCommenta(pr, `**Correzione della proprietà (da Telegram):**\n\n${testo}`);
  await messaggio(`Correzione salvata nella PR #${pr}. La applichiamo con /correggi-articolo ${pr} in una sessione.`);
}

/** Silenzio-assenso: la PR è stata unita dal Redattore (etichetta `silenzio-assenso`). */
export async function avvisaUnita(n: number) {
  await inviaArticolo(n, "automatico");
}

export { prUnisci, prPronta };
