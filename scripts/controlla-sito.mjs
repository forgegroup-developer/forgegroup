#!/usr/bin/env node
/**
 * Controlla che il testo del sito rispetti REGOLE-DEL-SITO.md.
 *
 *   npm run controlla:sito
 *
 * Errori (bloccano la PR):
 *   - una cifra in euro o in percentuale che non sta in src/data/prove.ts
 *     né nelle eccezioni qui sotto (regola dei numeri, proprietà 29/09/2026)
 *   - una parola vietata nel testo (Regole v2 §5, Scheda dei fatti)
 *   - la lineetta lunga nel testo
 * Avvisi:
 *   - titolo della pagina oltre 60 caratteri, descrizione fuori da 140-155
 *
 * Legge solo il testo: i commenti del codice non contano.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RADICE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CARTELLE = ["src/app", "src/components", "src/data", "src/lib/aiSeo", "src/lib/email", "src/lib/seo"];
const ESCLUSI = [
  "src/data/prove.ts", // la fonte dei numeri
  "src/data/articles.ts", // vecchi articoli, si ritirano (passo 8)
  "src/data/scheduledArticles.ts",
  "src/app/blog", // gli articoli nuovi hanno il loro controllo (controlla-articolo.mjs)
  "src/components/blog",
  "src/lib/email/contactInternalNotification.ts", // mail interna, non la legge il cliente
  "src/lib/email/candidaturaInternalNotification.ts", // idem
];

/** Cifre ammesse che non sono prove, ognuna con il motivo. */
const ECCEZIONI = {
  "500 euro": "la frase del cliente \"per 500 euro in meno\" (Testa aziendale, problema 5)",
  "500 euro di differenza": "come sopra, nella hero",
  "60.000 euro": "la scena d'esempio del preventivo in fondo alla chat (Lettera di vendita, blocco 4)",
};

const PAROLE_VIETATE = [
  [/\bgaranzi[ae]\b|\bgarantiam|\bgarantit/i, "mai garanzia, neanche negata"],
  [/\bpromess[ae]\b|\bpromettiamo\b/i, "mai promessa, neanche negata"],
  [/\bgratuit[oaie]\b|\bgratis\b/i, "mai gratuito"],
  [/\bCRM\b/, "si scrive \"gestionale\""],
  [/\blead\b|\blead generation\b/i, "si scrive \"richieste di lavoro\""],
  [/\bfunnel\b|\bpipeline\b|\basset\b/i, "parole da agenzia"],
  [/\bprequalific|\bpre-qualific/i, "non si usa sul sito"],
  [/\bB2B\b/, "vecchio posizionamento"],
  [/\bprevedibil|\bscalabil/i, "parole da agenzia"],
  [/\bti insegniamo\b|\bti formiamo\b|\baddestriamo\b/i, "mai \"ti insegniamo\""],
  [/\bvalorizzare\b|\bsinergi|\becosistema\b|a 360 gradi/i, "parole vuote"],
  [/\bcommesse\b/i, "si scrive \"contratti\""],
  [/\bventimila\b/i, "non in evidenza (Scheda)"],
];

function file(dir) {
  const out = [];
  for (const nome of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, nome.name);
    const rel = path.relative(RADICE, p);
    if (ESCLUSI.some((e) => rel === e || rel.startsWith(e + "/"))) continue;
    if (nome.isDirectory()) out.push(...file(p));
    else if (/\.(tsx?|mjs)$/.test(nome.name)) out.push(p);
  }
  return out;
}

/** Toglie i commenti, lasciando le righe al loro posto per i numeri di riga. */
function senzaCommenti(s) {
  return s
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:"'`])\/\/.*$/gm, (m, a) => a + " ".repeat(m.length - a.length));
}

/** Solo il testo che si legge: stringhe e testo fra i tag JSX. */
function testoLeggibile(riga) {
  const pezzi = [];
  for (const m of riga.matchAll(/"([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`/g)) {
    const t = m[0].slice(1, -1);
    // via nomi di classe, percorsi, import, chiavi tecniche
    if (/^[\w\-/.:@[\]%#()&>=!,]*$/.test(t) && !/\s/.test(t)) continue;
    if (/^(@\/|\.\/|\/|https?:)/.test(t)) continue;
    if (/\b(className|flex|grid|px-|py-|text-|bg-|border|rounded|md:|lg:)\b/.test(t) && !/[àèéìòù]/.test(t)) continue;
    pezzi.push(t);
  }
  const jsx = riga.replace(/<[^>]*>/g, "\u0000").split("\u0000").map((x) => x.trim()).filter((x) => x && !/^[{}()[\];,]*$/.test(x) && !/^[\w.]+\(|=>|^import |^export |^const |^return/.test(x));
  if (/^\s*[A-Za-zÀ-ÿ"«].*[a-zà-ù.,:!?»"]\s*$/.test(riga) && !/[=;{}]/.test(riga)) pezzi.push(riga.trim());
  // Via i valori di stile (gradienti, trasformazioni, colori).
  const stile = (x) => /rgba?\(|gradient|translate|calc\(|var\(--|\[[^\]]*%|object-position|hsl\(/.test(x);
  const tutti = [...pezzi, ...jsx.filter((x) => /[a-zà-ù]{3}/i.test(x) && !/[=;{}]/.test(x))].filter((x) => !stile(x));
  // Le frasi vere (almeno tre parole): lì si cercano parole vietate e percentuali.
  const frase = (x) => /(\p{L}{2,}[\s,.'’]+){2,}\p{L}/u.test(x);
  return { frasi: tutti.filter(frase).join(" | "), tutto: tutti.join(" | ") };
}

function normalizza(n) {
  return n
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/^\+/, "")
    .replace(/euro/g, "€")
    .replace(/^€(.*)$/, "$1€")
    .replace(/\.(?=\d{3}\b)/g, "");
}

const prove = fs.readFileSync(path.join(RADICE, "src/data/prove.ts"), "utf8");
const ammessi = new Set(
  [...prove.matchAll(/"([^"]*\d[^"]*)"/g)].map((m) => m[1]).filter((x) => /€|%|k\b|K€/.test(x)).map(normalizza)
);
const RE_NUMERO = /(?:€\s?\d[\d.,]*|\+?\d{1,3}(?:\.\d{3})+(?:,\d+)?\s?(?:€|euro\b)|\+?\d+(?:,\d+)?\s?(?:€|euro\b|%)|\+?\d+(?:[.,]\d+)?\s?[kK]€?(?=\W|$))/g;

let errori = 0;
let avvisi = 0;
const segnala = (tipo, f, riga, msg) => {
  if (tipo === "ERRORE") errori++;
  else avvisi++;
  console.log(`${tipo}  ${path.relative(RADICE, f)}:${riga}  ${msg}`);
};

for (const f of CARTELLE.flatMap((c) => file(path.join(RADICE, c)))) {
  const righe = senzaCommenti(fs.readFileSync(f, "utf8")).split("\n");
  let dentroBlocco = false; // dentro un testo fra apici inversi su più righe
  righe.forEach((r, i) => {
    const eraDentro = dentroBlocco;
    const apici = (r.replace(/\\`/g, "").match(/`/g) || []).length;
    if (apici % 2 === 1) dentroBlocco = !dentroBlocco;
    const letto = testoLeggibile(r);
    // Una riga dentro un blocco di testo (llms.txt, mail) si legge tutta,
    // tolte le espressioni ${…}: elenchi, titoli con # e righe con variabili.
    if (eraDentro || (dentroBlocco && apici)) {
      const riga = r
        .replace(/\$\{[^}]*\}/g, " ")
        .replace(/<[^>]*>/g, " ") // i tag HTML delle mail, con i loro stili
        .replace(/`/g, " ")
        .trim();
      if (riga) {
        letto.tutto = [letto.tutto, riga].filter(Boolean).join(" | ");
        letto.frasi = [letto.frasi, riga].filter(Boolean).join(" | ");
      }
    }
    const { frasi: t, tutto } = letto;
    if (!tutto) return;
    const visti = new Set();
    for (const m of tutto.matchAll(RE_NUMERO)) {
      const n = m[0].trim().replace(/[.,;:]+$/, "");
      if (visti.has(n)) continue;
      visti.add(n);
      // le percentuali contano solo dentro una frase
      if (n.endsWith("%") && !t.includes(n)) continue;
      const ok = ammessi.has(normalizza(n)) || Object.keys(ECCEZIONI).some((e) => tutto.includes(e) && e.includes(n.replace(/^\+/, "")));
      if (!ok) segnala("ERRORE", f, i + 1, `numero "${n}" non in src/data/prove.ts (aggiungilo prima alla Scheda dei fatti)`);
    }
    for (const [re, motivo] of PAROLE_VIETATE) {
      const m = t.match(re);
      if (m) segnala("ERRORE", f, i + 1, `"${m[0]}": ${motivo}`);
    }
    if (t.includes("—")) segnala("ERRORE", f, i + 1, "lineetta lunga nel testo: usa i due punti o la virgola");
  });

  // Stile (REGOLE §2 e §4): titoli piccoli e sfondi fuori palette.
  // Avvisi finché servizi, casi, gestionale e 404 non sono rifatti (passi
  // 4-7 dell'analisi del 29/09); poi diventano errori.
  {
    const grezzo = fs.readFileSync(f, "utf8");
    grezzo.split("\n").forEach((r, i) => {
      if (/className=["`{][^"`]*\bheading-section\b(?!-)/.test(r))
        segnala("AVVISO", f, i + 1, "titolo con heading-section: i titoli di sezione sono heading-section-xl");
      if (/\bsection-sabbia\b/.test(r) && !/^\s*(\*|\/\/)/.test(r))
        segnala("AVVISO", f, i + 1, "sfondo section-sabbia: le sezioni sono bianche o mattone");
    });
  }

  // titolo e descrizione per Google, nelle pagine
  if (f.endsWith("page.tsx")) {
    const s = fs.readFileSync(f, "utf8");
    const meta = s.match(/export const metadata[\s\S]*?\n};/);
    // le pagine fuori da Google (noindex) non contano
    if (meta && !/index:\s*false/.test(meta[0])) {
      const titolo = meta[0].match(/^\s{2}title:\s*"([^"]+)"/m);
      const descr = meta[0].match(/^\s{2}description:\s*\n?\s*"([^"]+)"/m);
      if (titolo && titolo[1].length > 60) segnala("AVVISO", f, 0, `titolo di ${titolo[1].length} caratteri (massimo 60)`);
      if (descr && (descr[1].length < 140 || descr[1].length > 155))
        segnala("AVVISO", f, 0, `descrizione di ${descr[1].length} caratteri (fra 140 e 155)`);
    }
  }
}

console.log(`\n${errori} errori, ${avvisi} avvisi.`);
process.exit(errori ? 1 : 0);
