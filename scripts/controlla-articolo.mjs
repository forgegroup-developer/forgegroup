#!/usr/bin/env node
/**
 * Controllo meccanico degli articoli in coda (content/articoli/*.json).
 *
 * Uso:  node scripts/controlla-articolo.mjs [file.json ...]
 *       senza argomenti controlla tutti i file della coda.
 *
 * Verifica solo quello che si può verificare senza giudizio: campi, lunghezze,
 * data e fuso di uscita, parole vietate, lineette lunghe, link interni, e le
 * cifre in euro o in percentuale confrontate con src/data/prove.ts (avviso).
 * Fatti, voce e livello di consapevolezza li controlla il Revisore.
 * Esce con codice 1 se c'è almeno un errore: in quel caso l'articolo non va in PR.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const RADICE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const CODA = path.join(RADICE, "content", "articoli");

const CATEGORIE = ["Clienti e sopralluoghi", "Trattative e vendita", "Gestione e CRM"];
const TIPI_BLOCCO = ["p", "h2", "h3", "ul", "quote", "cta", "image"];

/** Parole per livello, dalla regola della piramide. */
const PAROLE_PER_LIVELLO = {
  1: [700, 1000],
  2: [900, 1300],
  3: [1000, 1500],
  4: [800, 1200],
  5: [400, 700],
};

/** [espressione, motivo]. Tutte senza distinzione di maiuscole. */
const VIETATE = [
  [/\bgratuit\w*/i, "mai \"gratuito\""],
  [/\bgratis\b/i, "mai \"gratis\""],
  [/senza impegno/i, "mai \"senza impegno\""],
  [/\bpromess\w*|\bprometti\w*|\bpromett\w*/i, "mai \"promessa\", neanche negata: si scrive il meccanismo"],
  [/\bgaranzi\w*|\bgarantia\w*|\bgarantisc\w*|\bgarantit\w*/i, "mai \"garanzia\", neanche negata: si scrive il meccanismo"],
  [/ti insegniamo|ti formiamo|\bimpari a\b/i, "mai \"ti insegniamo\": restiamo, costruiamo con te, ti affianchiamo"],
  [/\bprequalific\w*/i, "\"prequalifica\" non si usa nei testi pubblici"],
  [/\brichiamiamo\b|\bli chiamiamo\b|\bchiamiamo (i tuoi|noi i)\b/i, "Forge non chiama i contatti del cliente"],
  [/\bfunnel\b|\bpipeline\b|\basset\b/i, "gergo da agenzia"],
  [/\blead\b/i, "\"lead\" non è una parola di Forge (ammessa solo dentro una citazione testuale: va segnalata al Revisore)"],
  [/\bvalorizz\w*|\bsinergi\w*|\becosistem\w*|\binnovativ\w*|a 360 gradi|\beccellenz\w*/i, "parola vuota da IA"],
  [/scopriamo insieme|vediamo come|ecco cosa devi sapere/i, "annuncio da IA"],
  [/\bcommess[ae]\b/i, "si dice \"contratti\", non \"commesse\""],
  [/\bventimila\b|\b20\.000 contatti/i, "\"oltre ventimila contatti\" non va in evidenza (Scheda)"],
  [/\bprevedibil\w*|\bscalabil\w*/i, "parole da agenzia"],
  [/\bcampania\b|\bnapoli\b|\bmolise\b|\bpuglia\b|\bbasilicata\b|\bavellino\b|\bbenevento\b|\bsalerno\b|\bcaserta\b|sud italia|\bmeridione\b/i, "niente riferimenti geografici: si lavora in tutta Italia"],
];

function paroleIn(testo) {
  return testo.split(/\s+/).filter(Boolean).length;
}

/** Offset di Roma per un giorno (es. "+02:00"), calcolato, non scritto a mano. */
function offsetRoma(giorno) {
  const nome = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Rome",
    timeZoneName: "shortOffset",
  })
    .formatToParts(new Date(`${giorno}T12:00:00Z`))
    .find((p) => p.type === "timeZoneName").value; // "GMT+2"
  const ore = Number(nome.replace("GMT", "") || 0);
  return `${ore >= 0 ? "+" : "-"}${String(Math.abs(ore)).padStart(2, "0")}:00`;
}

/** Slug già esistenti: articoli nel codice e file della coda. */
function slugEsistenti() {
  const slug = new Map();
  for (const file of ["src/data/articles.ts", "src/data/scheduledArticles.ts"]) {
    const testo = fs.readFileSync(path.join(RADICE, file), "utf8");
    for (const m of testo.matchAll(/slug: "([^"]+)"/g)) slug.set(m[1], { da: file });
  }
  if (fs.existsSync(CODA)) {
    for (const nome of fs.readdirSync(CODA).filter((n) => n.endsWith(".json"))) {
      try {
        const a = JSON.parse(fs.readFileSync(path.join(CODA, nome), "utf8"));
        slug.set(a.slug, { da: `content/articoli/${nome}`, publishAt: a.publishAt, argomento: a.argomento, livello: a.livello, titolo: a.title });
      } catch {
        /* l'errore lo segnala il controllo del file stesso */
      }
    }
  }
  return slug;
}

const ROTTE = new Set([
  "/",
  "/servizi",
  "/crm-gestionale-edilizia",
  "/casi-studio",
  "/casi-studio/edilizia",
  "/casi-studio/arredo-commerciale",
  "/casi-studio/software-b2b",
  "/visione",
  "/contatti",
  "/blog",
  "/inizia",
]);

/**
 * Le cifre ammesse: quelle di src/data/prove.ts (tabella "Numeri" della Scheda).
 * Stessa normalizzazione di scripts/controlla-sito.mjs.
 */
function normalizza(n) {
  return n
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/^\+/, "")
    .replace(/euro/g, "€")
    .replace(/^€(.*)$/, "$1€")
    .replace(/\.(?=\d{3}\b)/g, "");
}
const FILE_PROVE = path.join(RADICE, "src", "data", "prove.ts");
const NUMERI_AMMESSI = fs.existsSync(FILE_PROVE)
  ? new Set(
      [...fs.readFileSync(FILE_PROVE, "utf8").matchAll(/"([^"]*\d[^"]*)"/g)]
        .map((m) => m[1])
        .filter((x) => /€|%|k\b|K€/.test(x))
        .map(normalizza)
    )
  : null;
const RE_NUMERO = /(?:€\s?\d[\d.,]*|\+?\d{1,3}(?:\.\d{3})+(?:,\d+)?\s?(?:€|euro\b)|\+?\d+(?:,\d+)?\s?(?:€|euro\b|%)|\+?\d+(?:[.,]\d+)?\s?[kK]€?(?=\W|$))/g;

/**
 * I testi del concorrente A, scaricati il 28/09/2026 (fuori dal repo, sul computer di lavoro).
 * Se ci sono, ogni sequenza di OTTO parole identica ai suoi testi è un errore: da lui si prendono
 * gli argomenti, mai le frasi (Regole v2 §6).
 */
const CORPUS = path.join(os.homedir(), "ForgeGroup", "ricerca", "concorrente-a");
const LUNGHEZZA_COPIA = 8;
function parolePiane(t) {
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim().split(" ").filter(Boolean);
}
function hash(s) {
  let h1 = 0x811c9dc5, h2 = 0x01000193;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 16777619);
    h2 = Math.imul(h2 ^ c, 2246822519);
  }
  return (h1 >>> 0) * 2097152 + ((h2 >>> 0) & 2097151);
}
let sequenzeConcorrente = null;
function caricaConcorrente() {
  if (sequenzeConcorrente !== null) return sequenzeConcorrente;
  sequenzeConcorrente = false;
  if (!fs.existsSync(CORPUS)) return false;
  const set = new Set();
  for (const sito of fs.readdirSync(CORPUS)) {
    for (const nome of ["articoli.json", "altre.json"]) {
      const f = path.join(CORPUS, sito, nome);
      if (!fs.existsSync(f)) continue;
      for (const a of JSON.parse(fs.readFileSync(f, "utf8"))) {
        const w = parolePiane(`${a.titolo ?? ""} ${(a.sottotitoli ?? []).join(" ")} ${a.testo ?? ""}`);
        for (let i = 0; i + LUNGHEZZA_COPIA <= w.length; i++) set.add(hash(w.slice(i, i + LUNGHEZZA_COPIA).join(" ")));
      }
    }
  }
  sequenzeConcorrente = set;
  return set;
}

function controlla(file, esistenti) {
  const errori = [];
  const avvisi = [];
  const nome = path.basename(file);

  let a;
  try {
    a = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    return { errori: [`JSON non valido: ${e.message}`], avvisi };
  }

  for (const campo of ["slug", "title", "description", "category", "date", "publishAt", "readTime", "excerpt", "tags", "faqs", "content", "livello", "argomento", "autore", "inBreve", "seo"]) {
    if (a[campo] === undefined || a[campo] === "") errori.push(`manca il campo "${campo}"`);
  }
  if (errori.length) return { errori, avvisi };

  if (`${a.slug}.json` !== nome) errori.push(`il file si chiama ${nome} ma lo slug è "${a.slug}"`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(a.slug)) errori.push("slug: solo minuscole, cifre e trattini");
  if (a.slug.length > 60) errori.push(`slug di ${a.slug.length} caratteri (massimo 60)`);
  const gia = esistenti.get(a.slug);
  if (gia && gia.da !== `content/articoli/${nome}`) errori.push(`lo slug esiste già in ${gia.da}`);

  if (a.title.length > 65) errori.push(`titolo di ${a.title.length} caratteri (massimo 65)`);
  if (a.description.length < 140 || a.description.length > 155) errori.push(`description di ${a.description.length} caratteri (da 140 a 155, guida §8)`);
  if (!CATEGORIE.includes(a.category)) errori.push(`categoria "${a.category}": deve essere una di ${CATEGORIE.join(", ")}`);
  if (![1, 2, 3, 4, 5].includes(a.livello)) errori.push("livello: un numero da 1 a 5");
  if (!Array.isArray(a.tags) || a.tags.length < 3 || a.tags.length > 5) errori.push("tags: da 3 a 5");
  if (!["marco", "gianpio"].includes(a.autore)) errori.push('autore: "marco" o "gianpio"');
  for (const riga of ["problema", "causa", "cambia"]) {
    const n = paroleIn(a.inBreve?.[riga] ?? "");
    if (n < 5 || n > 35) errori.push(`inBreve.${riga}: ${n} parole (da 5 a 35)`);
  }

  // La ricerca SEO, GEO e SEM (guida editoriale §11): obbligatoria su ogni articolo.
  const seo = a.seo ?? {};
  for (const campo of ["parolaChiave", "domanda", "serp", "geo", "sem"]) {
    if (typeof seo[campo] !== "string" || seo[campo].trim().length < 3) errori.push(`seo.${campo}: manca (guida §11)`);
  }
  if (!Array.isArray(seo.secondarie) || seo.secondarie.length < 2) errori.push("seo.secondarie: almeno due parole chiave secondarie");
  if (!Array.isArray(seo.concorrente) || seo.concorrente.length < 3) errori.push("seo.concorrente: almeno tre testi del concorrente A letti (codici di cerca.py)");
  if (typeof seo.parolaChiave === "string" && seo.parolaChiave.length >= 3) {
    const pc = seo.parolaChiave.toLowerCase();
    const inizio = a.content.filter((b) => b.type === "p").slice(0, 4).map((b) => b.text).join(" ").toLowerCase();
    const titoletti = a.content.filter((b) => b.type === "h2").map((b) => b.text.toLowerCase());
    if (!a.title.toLowerCase().includes(pc)) avvisi.push(`la parola chiave "${seo.parolaChiave}" non è nel titolo`);
    if (!a.description.toLowerCase().includes(pc)) avvisi.push(`la parola chiave "${seo.parolaChiave}" non è nella description`);
    if (!titoletti.some((t) => t.includes(pc)) && !a.faqs.some((f) => f.q.toLowerCase().includes(pc))) {
      avvisi.push(`la parola chiave "${seo.parolaChiave}" non è in nessun titoletto né in una FAQ`);
    }
    if (!inizio.includes(pc) && !Object.values(a.inBreve ?? {}).join(" ").toLowerCase().includes(pc)) {
      avvisi.push(`la parola chiave "${seo.parolaChiave}" non compare né nell'In breve né nei primi paragrafi`);
    }
  }

  // Data e ora di uscita: le 09:00 di Roma, con il fuso giusto per quel giorno.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(a.date)) {
    errori.push("date: formato AAAA-MM-GG");
  } else {
    const atteso = `${a.date}T09:00:00${offsetRoma(a.date)}`;
    if (a.publishAt !== atteso) errori.push(`publishAt deve essere "${atteso}" (09:00 di Roma quel giorno), è "${a.publishAt}"`);
    // Una riscrittura sostituisce un articolo già online allo stesso indirizzo: esce subito,
    // altrimenti la pagina resterebbe vuota fino alla data (proprietà, 30/09/2026).
    if (!a.riscrittura && new Date(a.publishAt) <= new Date()) errori.push("publishAt è già passato: l'articolo uscirebbe subito");
    if (a.riscrittura && new Date(a.publishAt) > new Date()) errori.push("una riscrittura esce subito: publishAt deve essere oggi o prima");
  }

  // Blocchi e parole.
  let parole = 0;
  let testoIntero = `${a.title}\n${a.description}\n${a.excerpt}\n${Object.values(a.inBreve ?? {}).join("\n")}\n`;
  let haCta = false;
  for (const [i, b] of a.content.entries()) {
    if (!TIPI_BLOCCO.includes(b.type)) errori.push(`blocco ${i + 1}: tipo "${b.type}" non ammesso`);
    if (b.type === "ul") {
      if (!Array.isArray(b.items) || !b.items.length) errori.push(`blocco ${i + 1}: elenco senza voci`);
      for (const v of b.items ?? []) {
        parole += paroleIn(v);
        testoIntero += `${v}\n`;
      }
    } else if (b.type !== "image") {
      if (!b.text) errori.push(`blocco ${i + 1} (${b.type}): testo vuoto`);
      parole += paroleIn(b.text ?? "");
      testoIntero += `${b.text ?? ""}\n`;
    }
    if (b.type === "cta") haCta = true;
  }
  for (const f of a.faqs) {
    testoIntero += `${f.q}\n${f.a}\n`;
    if (!f.q.trim().endsWith("?")) errori.push(`FAQ "${f.q.slice(0, 40)}…": dev'essere una domanda, scritta come la cercherebbe il titolare`);
  }

  const [min, max] = PAROLE_PER_LIVELLO[a.livello] ?? [0, Infinity];
  if (parole < min || parole > max) errori.push(`${parole} parole: per il livello ${a.livello} vanno da ${min} a ${max}`);
  const minuti = Math.max(1, Math.round(parole / 200));
  if (a.readTime !== `${minuti} min`) errori.push(`readTime deve essere "${minuti} min" (${parole} parole a 200 al minuto)`);
  if (a.faqs.length < 3 || a.faqs.length > 4) errori.push(`${a.faqs.length} FAQ (da 3 a 4)`);
  if (a.livello >= 2 && !haCta) errori.push("dal livello 2 in su serve un blocco cta");
  if (a.livello === 1 && haCta) errori.push("il livello 1 non chiede niente: niente blocco cta, solo il link al livello 2");

  // Segnali di testo fatto a macchina e parole vietate.
  if (/[—–]/.test(testoIntero)) errori.push("c'è una lineetta lunga (— o –): si usano virgola, puntini o due punti");
  // Le parole vietate si cercano nel testo che si legge, non negli indirizzi dei link
  // (un articolo riscritto tiene il suo vecchio indirizzo).
  const testoLetto = testoIntero.replace(/\]\([^)]*\)/g, "]");
  for (const [re, motivo] of VIETATE) {
    const m = testoLetto.match(re);
    if (m) errori.push(`"${m[0]}": ${motivo}`);
  }
  // "CRM" solo in maiuscolo, fuori dal nome della categoria (Scheda, decisioni del 29/09).
  if (/\bCRM\b/.test(testoIntero)) errori.push("\"CRM\": nel testo si scrive \"gestionale\", anche nei titoli e nelle FAQ");

  // Cifre in euro o in percentuale: solo quelle della Scheda. Le altre le giudica il Revisore
  // (conto dichiarato tondo, o cifra dentro una frase vera di un cliente).
  if (!NUMERI_AMMESSI) {
    avvisi.push("src/data/prove.ts non trovato: le cifre non sono state confrontate con la Scheda");
  } else {
    for (const m of new Set(testoIntero.match(RE_NUMERO) ?? [])) {
      if (!NUMERI_AMMESSI.has(normalizza(m))) {
        avvisi.push(`cifra "${m.trim()}" non è nella tabella "Numeri" della Scheda: il Revisore verifica che sia un conto tondo dichiarato o una frase vera di un cliente`);
      }
    }
  }

  // Frasi copiate dal concorrente A.
  const seq = caricaConcorrente();
  if (!seq) {
    avvisi.push(`testi del concorrente non trovati in ${CORPUS}: controllo delle frasi copiate saltato`);
  } else {
    const w = parolePiane(testoIntero);
    const copiate = [];
    for (let i = 0; i + LUNGHEZZA_COPIA <= w.length; i++) {
      if (seq.has(hash(w.slice(i, i + LUNGHEZZA_COPIA).join(" ")))) copiate.push(i);
    }
    // Sequenze vicine diventano un solo pezzo, per leggerlo meglio.
    const pezzi = [];
    for (const i of copiate) {
      const ultimo = pezzi[pezzi.length - 1];
      if (ultimo && i <= ultimo[1]) ultimo[1] = i + LUNGHEZZA_COPIA;
      else pezzi.push([i, i + LUNGHEZZA_COPIA]);
    }
    for (const [da, a2] of pezzi) errori.push(`uguale a un testo del concorrente A: "${w.slice(da, a2).join(" ")}" (riscrivi con parole di Forge)`);
  }

  // Link interni.
  const link = [...testoIntero.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)].map((m) => ({ testo: m[1], href: m[2] }));
  const interni = link.filter((l) => l.href.startsWith("/"));
  if (interni.length < 3) errori.push(`${interni.length} link interni (almeno 3)`);
  for (const l of interni) {
    const href = l.href.replace(/[#?].*$/, "").replace(/\/$/, "") || "/";
    if (ROTTE.has(href)) continue;
    const m = href.match(/^\/blog\/([a-z0-9-]+)$/);
    if (!m) {
      errori.push(`link a una pagina che non esiste: ${l.href}`);
      continue;
    }
    const dest = esistenti.get(m[1]);
    if (!dest) errori.push(`link a un articolo che non esiste: ${l.href}`);
    else if (dest.publishAt && new Date(dest.publishAt) > new Date(a.publishAt)) {
      errori.push(`link a un articolo che esce dopo questo: ${l.href}`);
    }
    if (/^(clicca qui|qui|leggi qui)$/i.test(l.testo.trim())) errori.push(`testo del link "${l.testo}": deve dire cosa si trova dall'altra parte`);
  }

  // La scala: se esiste l'articolo del livello sopra sullo stesso argomento, va linkato.
  for (const [slug, info] of esistenti) {
    if (info.argomento === a.argomento && info.livello === a.livello + 1 && !interni.some((l) => l.href.includes(slug))) {
      avvisi.push(`esiste il livello ${a.livello + 1} sullo stesso argomento (${slug}): va linkato`);
    }
  }

  // Titoli tutti uguali sono il segnale di produzione in serie: la forma va alternata.
  const forma = formaTitolo(a.title);
  const precedente = [...esistenti.values()]
    .filter((x) => x.publishAt && x.publishAt < a.publishAt && x.titolo)
    .sort((x, y) => y.publishAt.localeCompare(x.publishAt))[0];
  if (precedente && formaTitolo(precedente.titolo) === forma) {
    avvisi.push(`il titolo ha la stessa forma ("${forma}") dell'articolo precedente: alterna`);
  }

  return { errori, avvisi };
}

function formaTitolo(t) {
  if (/^[«"]/.test(t)) return "frase del cliente";
  if (/^(come|perché|quanto|quando|cosa|chi)\b/i.test(t)) return "domanda o come";
  if (/\?/.test(t)) return "domanda";
  if (/\d/.test(t)) return "numero o conto";
  if (/:/.test(t)) return "due punti";
  return "frase";
}

const argomenti = process.argv.slice(2);
const file = argomenti.length
  ? argomenti
  : fs.existsSync(CODA)
    ? fs.readdirSync(CODA).filter((n) => n.endsWith(".json")).map((n) => path.join(CODA, n))
    : [];

if (!file.length) {
  console.log("Nessun articolo da controllare.");
  process.exit(0);
}

const esistenti = slugEsistenti();
let totaleErrori = 0;
for (const f of file) {
  const { errori, avvisi } = controlla(f, esistenti);
  totaleErrori += errori.length;
  console.log(`\n${errori.length ? "✗" : "✓"} ${path.relative(RADICE, path.resolve(f))}`);
  for (const e of errori) console.log(`  errore: ${e}`);
  for (const w of avvisi) console.log(`  avviso: ${w}`);
}
console.log(totaleErrori ? `\n${totaleErrori} errori: l'articolo non può andare in PR.` : "\nTutto a posto.");
process.exit(totaleErrori ? 1 : 0);
