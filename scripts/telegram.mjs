#!/usr/bin/env node
/**
 * Il bot Telegram del Redattore: manda gli articoli alla proprietà e riceve Vai, Correggi, Scarta.
 *
 * Uso:
 *   node scripts/telegram.mjs collega               salva la chat della proprietà (dopo /start al bot)
 *   node scripts/telegram.mjs messaggio "testo"     manda un messaggio semplice
 *   node scripts/telegram.mjs articolo <n PR>       manda l'articolo della PR con i tre tasti
 *   node scripts/telegram.mjs automatico <n PR>     silenzio-assenso: unisce la PR e poi manda
 *                                                   l'articolo "già in coda" con il tasto Ritira
 *   node scripts/telegram.mjs promemoria            una volta al giorno: le bozze ferme da 2 giorni
 *   node scripts/telegram.mjs ricevi                legge i tasti premuti e i messaggi (lo lancia
 *                                                   il Mac ogni minuto) e fa quello che chiedono
 *
 * La chiave del bot sta nel Portachiavi del Mac (servizio "forge-telegram-redattore"), mai nel
 * repo. Il bot obbedisce solo alla chat salvata con "collega": gli altri messaggi li ignora.
 * Vai = merge della PR (l'articolo entra in coda), Scarta = PR chiusa, Correggi = la correzione
 * scritta finisce come commento nella PR, e si applica in sessione con /correggi-articolo.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CARTELLA = path.join(os.homedir(), "ForgeGroup", "logs", "telegram");
const FILE_CHAT = path.join(CARTELLA, "chat-id");
const FILE_OFFSET = path.join(CARTELLA, "offset");
const FILE_ATTESA = path.join(CARTELLA, "correzione-in-attesa.json");
const RADICE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
// La copia di lavoro dove si cambiano le copertine (la stessa del Redattore automatico).
const COPIA = path.join(os.homedir(), "ForgeGroup", "progetti", "sito", "repo-redattore");
const LOG = path.join(os.homedir(), "ForgeGroup", "logs", "redattore");
fs.mkdirSync(CARTELLA, { recursive: true });

function chiave() {
  try {
    return execFileSync("security", ["find-generic-password", "-s", "forge-telegram-redattore", "-w"], { encoding: "utf8" }).trim();
  } catch {
    console.error("Manca la chiave del bot nel Portachiavi (servizio forge-telegram-redattore).");
    process.exit(2);
  }
}
const API = `https://api.telegram.org/bot${chiave()}`;

/** fetch con 3 tentativi sugli errori di rete (il Mac appena sveglio, il Wi-Fi che salta). */
async function invia(url, init) {
  const attese = [2000, 5000, 10000];
  for (let i = 0; ; i++) {
    try {
      return await fetch(url, init);
    } catch (e) {
      if (i >= attese.length) throw e;
      await new Promise((ok) => setTimeout(ok, attese[i]));
    }
  }
}

/**
 * Il blocco condiviso con il Redattore del mattino: una cartella con il PID di chi lavora.
 * Un blocco di un processo morto, o più vecchio di 3 ore, si toglie (Mac spento a metà lavoro).
 */
function prendiBlocco() {
  const blocco = path.join(LOG, ".in-corso");
  fs.mkdirSync(LOG, { recursive: true });
  for (let i = 0; i < 2; i++) {
    try {
      fs.mkdirSync(blocco);
      fs.writeFileSync(path.join(blocco, "pid"), String(process.pid));
      return () => fs.rmSync(blocco, { recursive: true, force: true });
    } catch {
      const pid = Number(leggi(path.join(blocco, "pid")) || 0);
      const eta = Date.now() - fs.statSync(blocco).mtimeMs;
      let vivo = false;
      try { if (pid) { process.kill(pid, 0); vivo = true; } } catch { vivo = false; }
      if (vivo && eta < 3 * 3600 * 1000) return null;
      fs.rmSync(blocco, { recursive: true, force: true });
    }
  }
  return null;
}

async function chiama(metodo, dati = {}) {
  const r = await invia(`${API}/${metodo}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(dati) });
  const j = await r.json();
  if (!j.ok) throw new Error(`Telegram ${metodo}: ${j.description}`);
  return j.result;
}

const leggi = (f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8").trim() : "");
const chat = () => leggi(FILE_CHAT);
const gh = (...a) => execFileSync("gh", a, { cwd: RADICE, encoding: "utf8" });

async function messaggio(testo, tasti) {
  if (!chat()) throw new Error("Chat non collegata: scrivi /start al bot e lancia `node scripts/telegram.mjs collega`.");
  return chiama("sendMessage", {
    chat_id: chat(),
    text: testo.slice(0, 4000),
    parse_mode: "HTML",
    disable_web_page_preview: true,
    ...(tasti ? { reply_markup: { inline_keyboard: [tasti] } } : {}),
  });
}

const html = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** L'articolo intero, come lo legge il titolare: titoletti, paragrafi, elenchi, invito, FAQ. */
function testoIntero(a) {
  const conLink = (t) =>
    html(t).replace(/\[([^\]]+)\]\((\/[^)]*)\)/g, (_, testo, url) => `<a href="https://www.forgegroup.it${url}">${testo}</a>`);
  const parti = [`<b>${html(a.title)}</b>`];
  for (const b of a.content ?? []) {
    if (b.type === "h2" || b.type === "h3") parti.push(`<b>${html(b.text)}</b>`);
    else if (b.type === "ul") parti.push(b.items.map((v) => `• ${conLink(v)}`).join("\n"));
    else if (b.type === "quote") parti.push(`<i>${conLink(b.text)}</i>`);
    else if (b.type === "cta") parti.push(`👉 <b>${html(b.text)}</b>`);
    else if (b.text) parti.push(conLink(b.text));
  }
  if (a.faqs?.length) {
    parti.push("<b>DOMANDE FREQUENTI</b>");
    for (const f of a.faqs) parti.push(`<b>${html(f.q)}</b>\n${html(f.a)}`);
  }
  // Telegram accetta al massimo 4096 caratteri per messaggio: si divide fra un paragrafo e l'altro.
  const messaggi = [];
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

async function articolo(n, modo = "") {
  const pr = JSON.parse(gh("pr", "view", String(n), "--json", "title,url,isDraft,headRefName,files,body"));
  const file = pr.files.map((f) => f.path).find((p) => p.startsWith("content/articoli/") && p.endsWith(".json"));
  let a = {};
  if (file) {
    execFileSync("git", ["fetch", "-q", "origin", pr.headRefName], { cwd: RADICE });
    a = JSON.parse(execFileSync("git", ["show", `origin/${pr.headRefName}:${file}`], { cwd: RADICE, encoding: "utf8" }));
  }
  const automatico = modo === "automatico";
  const esito = (pr.body.match(/ESITO:\s*([A-Z ]+)/) || [])[1]?.trim() ?? "vedi la PR";
  const testo = [
    automatico
      ? "✅ <b>Articolo nuovo, già in coda.</b> Il Revisore l'ha approvato. Non devi fare niente: se non ti va, premi Ritira prima del giorno di uscita."
      : pr.isDraft ? "⚠️ <b>BOZZA: il Revisore ha dei dubbi, leggili nella PR</b>" : "📝 <b>Articolo nuovo: Vai, Correggi o Scarta?</b>",
    "",
    `<b>${html(a.title ?? pr.title)}</b>`,
    a.date ? `Esce il ${html(a.date)} alle 09:00 · livello ${html(a.livello)} · firma ${html(a.autore)}` : "",
    a.seo ? `Parola chiave: <i>${html(a.seo.parolaChiave)}</i>` : "",
    "",
    a.inBreve ? `<b>Il problema:</b> ${html(a.inBreve.problema)}\n<b>La causa:</b> ${html(a.inBreve.causa)}\n<b>Cosa cambia:</b> ${html(a.inBreve.cambia)}` : "",
    "",
    `Revisore: ${html(esito)}`,
    `L'articolo intero è nei messaggi qui sopra. Anteprima sul sito e scheda di revisione nella PR: ${pr.url}`,
  ].filter((r) => r !== undefined).join("\n");
  const tasti = automatico
    ? [{ text: "↩️ Ritira", callback_data: `ritira:${n}` }]
    : pr.isDraft
      ? [{ text: "✅ Vai lo stesso", callback_data: `vai:${n}` }, { text: "✏️ Correggi", callback_data: `correggi:${n}` }, { text: "🗑 Scarta", callback_data: `scarta:${n}` }]
      : [{ text: "✅ Vai", callback_data: `vai:${n}` }, { text: "✏️ Correggi", callback_data: `correggi:${n}` }, { text: "🗑 Scarta", callback_data: `scarta:${n}` }];
  // La copertina scelta dal Redattore, come foto, prima del testo.
  if (a.featuredImage?.startsWith("/images/blog/")) {
    try {
      const foto = execFileSync("git", ["show", `origin/${pr.headRefName}:public${a.featuredImage}`], { cwd: RADICE });
      const dati = new FormData();
      dati.append("chat_id", chat());
      dati.append("caption", `Copertina: ${a.featuredImageAlt ?? ""}${a.copertina ? ` (${a.copertina.fonte})` : ""}`.slice(0, 1000));
      dati.append("photo", new Blob([foto], { type: "image/jpeg" }), "copertina.jpg");
      dati.append("reply_markup", JSON.stringify({ inline_keyboard: [[
        { text: "👍 Va bene", callback_data: `fotook:${n}` },
        { text: "🔄 Altre copertine", callback_data: `foto:${n}` },
      ]] }));
      await invia(`${API}/sendPhoto`, { method: "POST", body: dati });
    } catch (e) {
      console.error(`copertina non inviata: ${e.message}`);
    }
  }
  if (a.content) {
    const pezzi = testoIntero(a);
    for (const [i, pezzo] of pezzi.entries()) await messaggio(`${pezzo}\n\n<i>(${i + 1}/${pezzi.length})</i>`);
  }
  await messaggio(testo, tasti);
}

/** Una foto (file locale) con didascalia e tasti. */
async function foto(buffer, didascalia, tasti) {
  const dati = new FormData();
  dati.append("chat_id", chat());
  dati.append("caption", didascalia.slice(0, 1000));
  dati.append("photo", new Blob([buffer], { type: "image/jpeg" }), "foto.jpg");
  if (tasti) dati.append("reply_markup", JSON.stringify({ inline_keyboard: [tasti] }));
  const r = await (await invia(`${API}/sendPhoto`, { method: "POST", body: dati })).json();
  if (!r.ok) throw new Error(`Telegram sendPhoto: ${r.description}`);
}

/** L'articolo di una PR, letto dal suo ramo. */
function articoloDellaPr(n) {
  const pr = JSON.parse(gh("pr", "view", String(n), "--json", "headRefName,files,state"));
  if (pr.state !== "OPEN") throw new Error(`la PR #${n} non è aperta`);
  const file = pr.files.map((f) => f.path).find((p) => p.startsWith("content/articoli/") && p.endsWith(".json"));
  if (!file) throw new Error(`la PR #${n} non contiene un articolo`);
  execFileSync("git", ["fetch", "-q", "origin", pr.headRefName], { cwd: RADICE });
  const a = JSON.parse(execFileSync("git", ["show", `origin/${pr.headRefName}:${file}`], { cwd: RADICE, encoding: "utf8" }));
  return { pr, file, a };
}

/** Tre copertine alternative da Pixabay, ognuna con il tasto "Usa questa". */
async function altreCopertine(n) {
  const { a } = articoloDellaPr(n);
  const attuale = String(a.copertina?.pagina ?? "").match(/-(\d+)\/?$/)?.[1];
  const ricerche = [a.copertina?.ricerca, a.seo?.parolaChiave, a.tags?.[0]].filter(Boolean);
  const visti = new Set([attuale]);
  const scelte = [];
  for (const q of ricerche) {
    const lista = JSON.parse(execFileSync("node", [path.join(RADICE, "scripts", "copertina.mjs"), "cerca", q], { encoding: "utf8" }));
    for (const f of lista) if (!visti.has(String(f.id)) && scelte.length < 3) { visti.add(String(f.id)); scelte.push(f); }
    if (scelte.length >= 3) break;
  }
  if (!scelte.length) return messaggio("Non ho trovato altre copertine adatte: dimmi in chat cosa vorresti vedere.");
  for (const f of scelte) {
    const img = Buffer.from(await (await fetch(f.anteprima, { headers: { "User-Agent": "Mozilla/5.0 (Macintosh) ForgeRedattore" } })).arrayBuffer());
    await foto(img, `Alternativa per la PR #${n} (Pixabay)`, [{ text: "✅ Usa questa", callback_data: `usa:${n}:${f.id}` }]);
  }
}

/**
 * Mette nella PR la copertina scelta: scarica, comprime, aggiorna il file dell'articolo,
 * commit e push sul ramo della PR. Nessun agente: solo questo script, sulla copia del Redattore.
 */
async function usaCopertina(n, id) {
  if (!fs.existsSync(COPIA)) throw new Error("la copia di lavoro del Redattore non c'è ancora");
  const libera = prendiBlocco();
  if (!libera) throw new Error("il Redattore sta lavorando: riprova fra qualche minuto");
  try {
    const { pr, file, a } = articoloDellaPr(n);
    const git = (...x) => execFileSync("git", x, { cwd: COPIA, encoding: "utf8" });
    git("fetch", "-q", "origin", pr.headRefName);
    git("checkout", "-q", "-B", pr.headRefName, `origin/${pr.headRefName}`);
    const esito = JSON.parse(execFileSync("node", [path.join(RADICE, "scripts", "copertina.mjs"), "scarica", String(Number(id)), a.slug, COPIA], { encoding: "utf8" }));
    const percorso = path.join(COPIA, file);
    const art = JSON.parse(fs.readFileSync(percorso, "utf8"));
    art.featuredImage = esito.featuredImage;
    art.featuredImageAlt = `Immagine di copertina dell'articolo: ${art.title}`;
    art.copertina = { ...esito.copertina, ricerca: a.copertina?.ricerca };
    fs.writeFileSync(percorso, JSON.stringify(art, null, 2) + "\n");
    git("add", file, `public${esito.featuredImage}`);
    git("commit", "-q", "-m", `articolo: copertina scelta dalla proprietà su Telegram (Pixabay ${id})`);
    git("push", "-q", "origin", `HEAD:${pr.headRefName}`);
    git("checkout", "-q", "--detach", "origin/main");
    await foto(fs.readFileSync(path.join(COPIA, "public", esito.featuredImage)), `Copertina aggiornata nella PR #${n}. Se ti va bene anche l'articolo, premi Vai sul suo messaggio.`, [
      { text: "✅ Vai", callback_data: `vai:${n}` },
    ]);
  } finally {
    libera();
  }
}

/** Toglie dalla coda un articolo già unito: una PR che cancella il file (e la copertina), unita subito. */
function ritira(n) {
  const pr = JSON.parse(gh("pr", "view", String(n), "--json", "state,files,title"));
  if (pr.state === "OPEN") {
    gh("pr", "close", String(n), "--delete-branch");
    return `🗑 PR #${n} chiusa: l'articolo non entra in coda.`;
  }
  const file = pr.files.map((f) => f.path).find((p) => p.startsWith("content/articoli/") && p.endsWith(".json"));
  if (!file) return `La PR #${n} non contiene un articolo: non tocco niente.`;
  const slug = path.basename(file, ".json");
  const libera = prendiBlocco();
  if (!libera) return "Il Redattore sta lavorando: riprova fra qualche minuto.";
  try {
    const git = (...x) => execFileSync("git", x, { cwd: COPIA, encoding: "utf8" });
    const ramo = `articolo/ritira-${slug}`;
    git("fetch", "-q", "origin");
    git("checkout", "-q", "-B", ramo, "origin/main");
    git("rm", "-q", "--ignore-unmatch", file, `public/images/blog/${slug}.jpg`);
    git("commit", "-q", "-m", `articolo ritirato dalla proprietà: ${slug}`);
    git("push", "-q", "-f", "origin", ramo);
    execFileSync("gh", ["pr", "create", "--base", "main", "--head", ramo, "--title", `Ritiro: ${pr.title}`, "--body", `Ritirato dalla proprietà con il tasto Ritira su Telegram (PR #${n}).`], { cwd: COPIA });
    execFileSync("gh", ["pr", "merge", ramo, "--squash", "--delete-branch"], { cwd: COPIA });
    git("checkout", "-q", "--detach", "origin/main");
    return `↩️ Articolo ritirato: non uscirà. L'argomento torna libero per il Redattore.`;
  } finally {
    libera();
  }
}

/**
 * Silenzio-assenso: prima si unisce la PR, poi si avvisa. Se l'unione non riesce, arriva
 * l'articolo con Vai, Correggi e Scarta, e un messaggio con il motivo.
 */
async function automatico(n) {
  const pr = JSON.parse(gh("pr", "view", String(n), "--json", "headRefName"));
  try {
    gh("pr", "merge", String(n), "--squash");
  } catch (e) {
    await articolo(n);
    await messaggio(`Non sono riuscito a mettere in coda da solo la PR #${n}: ${html(e.message).slice(0, 300)}. Premi Vai se ti va bene.`);
    return;
  }
  await articolo(n, "automatico"); // il ramo esiste ancora: si legge da lì
  try {
    execFileSync("git", ["push", "-q", "origin", "--delete", pr.headRefName], { cwd: RADICE, stdio: "ignore" });
  } catch {
    /* il ramo si può cancellare anche dopo */
  }
}

/** Una volta al giorno: le bozze ferme da più di 2 giorni. */
async function promemoria() {
  const file = path.join(CARTELLA, `promemoria-${new Date().toISOString().slice(0, 10)}`);
  if (fs.existsSync(file)) return;
  const bozze = JSON.parse(gh("pr", "list", "--state", "open", "--label", "articolo", "--draft", "--json", "number,title,createdAt"));
  const ferme = bozze.filter((b) => Date.now() - new Date(b.createdAt).getTime() > 2 * 24 * 3600 * 1000);
  if (ferme.length) {
    await messaggio(
      "⏳ <b>Bozze che aspettano una tua scelta</b>\n\n" +
        ferme.map((b) => `• PR #${b.number}: ${html(b.title)}`).join("\n") +
        "\n\nI tasti sono sotto i loro messaggi. Se il giorno di uscita passa senza risposta, la bozza si chiude da sola.",
      ferme.slice(0, 3).map((b) => ({ text: `✅ Vai #${b.number}`, callback_data: `vai:${b.number}` }))
    );
  }
  fs.writeFileSync(file, "");
}

async function collega() {
  const agg = await chiama("getUpdates", { timeout: 0 });
  const ultimo = [...agg].reverse().find((u) => u.message?.chat?.type === "private");
  if (!ultimo) {
    console.log("Nessun messaggio trovato: apri il bot su Telegram, premi Avvia (/start) e rilancia.");
    process.exit(1);
  }
  fs.writeFileSync(FILE_CHAT, String(ultimo.message.chat.id));
  fs.writeFileSync(FILE_OFFSET, String(ultimo.update_id + 1));
  await messaggio("Collegato. Da qui riceverai gli articoli del Redattore, con i tasti Vai, Correggi e Scarta.");
  console.log(`Chat collegata (${ultimo.message.from?.first_name ?? "proprietà"}).`);
}

async function ricevi() {
  const offset = Number(leggi(FILE_OFFSET) || 0);
  const agg = await chiama("getUpdates", { offset, timeout: 0 });
  for (const u of agg) {
    try {
      await gestisci(u);
    } catch (e) {
      console.error(`aggiornamento ${u.update_id}: ${e.message}`);
    }
    // Segnato come letto solo dopo averlo gestito (anche se è fallito: non si ripete all'infinito).
    fs.writeFileSync(FILE_OFFSET, String(u.update_id + 1));
  }
}

async function gestisci(u) {
  {
    const daChi = String(u.callback_query?.message?.chat?.id ?? u.message?.chat?.id ?? "");
    if (!chat() || daChi !== chat()) return; // solo la proprietà

    if (u.callback_query) {
      const [azione, n] = u.callback_query.data.split(":");
      // La conferma del tasto scade dopo pochi secondi: se è scaduta, si va avanti lo stesso.
      await chiama("answerCallbackQuery", { callback_query_id: u.callback_query.id }).catch(() => {});
      try {
        if (azione === "vai") {
          // Una bozza approvata dalla proprietà diventa pronta prima del merge.
          if (JSON.parse(gh("pr", "view", n, "--json", "isDraft")).isDraft) gh("pr", "ready", n);
          gh("pr", "merge", n, "--squash", "--delete-branch");
          await messaggio(`✅ PR #${n} unita: l'articolo è in coda ed esce nel suo giorno.`);
        } else if (azione === "scarta") {
          gh("pr", "close", n, "--delete-branch");
          await messaggio(`🗑 PR #${n} chiusa. L'argomento torna libero.`);
        } else if (azione === "ritira") {
          await messaggio(`Ritiro l'articolo della PR #${n}…`);
          await messaggio(ritira(n));
        } else if (azione === "fotook") {
          await messaggio(`👍 Copertina della PR #${n} confermata.`);
        } else if (azione === "foto") {
          await messaggio(`Cerco altre copertine per la PR #${n}…`);
          await altreCopertine(n);
        } else if (azione === "usa") {
          await messaggio(`Metto la copertina scelta nella PR #${n}…`);
          await usaCopertina(n, u.callback_query.data.split(":")[2]);
        } else if (azione === "correggi") {
          fs.writeFileSync(FILE_ATTESA, JSON.stringify({ pr: n, quando: Date.now() }));
          await messaggio(`✏️ Scrivimi (o detta) cosa cambiare nell'articolo della PR #${n}.`);
        }
      } catch (e) {
        await messaggio(`Non ci sono riuscito: ${html(e.message).slice(0, 500)}`);
      }
      return;
    }

    const testo = u.message?.text?.trim();
    if (!testo || testo.startsWith("/")) return;
    const attesa = leggi(FILE_ATTESA);
    if (!attesa) {
      await messaggio("Ricevuto. Per correggere un articolo premi prima ✏️ Correggi sotto l'articolo.");
      return;
    }
    const { pr } = JSON.parse(attesa);
    fs.rmSync(FILE_ATTESA);
    // La correzione resta scritta nella PR: la applica il Redattore in una sessione con la proprietà
    // (/correggi-articolo). Nessun agente parte da solo su un messaggio arrivato da Telegram.
    gh("pr", "comment", String(pr), "--body", `**Correzione della proprietà (da Telegram):**\n\n${testo}`);
    await messaggio(`Correzione salvata nella PR #${pr}. La applichiamo con /correggi-articolo ${pr} in una sessione.`);
  }
}

const [comando, ...resto] = process.argv.slice(2);
if (comando === "collega") await collega();
else if (comando === "messaggio") await messaggio(html(resto.join(" ")));
else if (comando === "articolo") await articolo(resto[0], resto[1]);
else if (comando === "automatico") await automatico(resto[0]);
else if (comando === "promemoria") await promemoria();
else if (comando === "ricevi") await ricevi();
else {
  console.log("Uso: collega | messaggio \"testo\" | articolo <n PR> | automatico <n PR> | promemoria | ricevi");
  process.exit(1);
}
