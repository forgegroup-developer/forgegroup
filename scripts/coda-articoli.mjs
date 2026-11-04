#!/usr/bin/env node
/**
 * Lo stato della coda degli articoli, per il Redattore.
 *
 * Uso:  node scripts/coda-articoli.mjs
 *
 * Legge gli articoli già su main (origin/main:content/articoli) e quelli nelle PR aperte con
 * l'etichetta "articolo", e stampa in JSON:
 *   - quanti articoli sono in coda (uscita futura): su main e nelle PR pronte
 *   - le bozze (PR in bozza) a parte: non contano come coda, ma tengono occupato il loro giorno
 *   - quante scriverne oggi: 7 meno la coda, e zero se le bozze aperte sono già 2
 *   - il prossimo giorno libero (dopo l'ultimo occupato, da coda o da bozze; almeno domani)
 *   - le bozze scadute (giorno di uscita passato senza approvazione), da chiudere
 *   - gli argomenti e i livelli già scritti, per non ripeterli
 * I conti li fa questo script, non il modello.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { prElenco } from "./github.mjs";

const RADICE = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

const OBIETTIVO_CODA = 7;
const MASSIMO_BOZZE = 2;

function esegui(comando, argomenti) {
  return execFileSync(comando, argomenti, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
}

function articoliSuMain() {
  esegui("git", ["fetch", "-q", "origin", "main"]);
  let elenco = "";
  try {
    elenco = esegui("git", ["ls-tree", "--name-only", "origin/main", "content/articoli/"]);
  } catch {
    return [];
  }
  return elenco
    .split("\n")
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ ...JSON.parse(esegui("git", ["show", `origin/main:${f}`])), fonte: "main" }));
}

function articoliInPr() {
  // Se GitHub non risponde ci si ferma: una coda letta vuota per errore farebbe scrivere
  // articoli per giorni già occupati (nel cloud `gh pr list` falliva in silenzio).
  const pr = prElenco({ etichetta: "articolo" });
  const articoli = [];
  for (const p of pr) {
    for (const f of p.files.map((x) => x.path).filter((x) => x.startsWith("content/articoli/") && x.endsWith(".json"))) {
      try {
        esegui("git", ["fetch", "-q", "origin", p.headRefName]);
        articoli.push({ ...JSON.parse(esegui("git", ["show", `origin/${p.headRefName}:${f}`])), fonte: `PR #${p.number}`, pr: p.number, bozza: p.isDraft });
      } catch {
        /* PR senza il file sul remoto: si ignora */
      }
    }
  }
  return articoli;
}

function ultimoAutore() {
  const conFirma = tutti.filter((a) => a.autore).sort((x, y) => x.date.localeCompare(y.date));
  return conFirma.length ? conFirma[conFirma.length - 1].autore : "gianpio";
}

function giorno(d) {
  return d.toLocaleDateString("sv-SE", { timeZone: "Europe/Rome" }); // AAAA-MM-GG
}

const tutti = [...articoliSuMain(), ...articoliInPr()];
const adesso = new Date();
const futuri = tutti.filter((a) => new Date(a.publishAt) > adesso);
const inCoda = futuri.filter((a) => !a.bozza);
const bozze = tutti.filter((a) => a.bozza);
const bozzeScadute = bozze.filter((a) => new Date(a.publishAt) <= adesso);
const daScrivere = bozze.length - bozzeScadute.length >= MASSIMO_BOZZE ? 0 : Math.max(0, OBIETTIVO_CODA - inCoda.length);

const domani = new Date(adesso.getTime() + 24 * 3600 * 1000);
let prossimo = giorno(domani);
// Anche i giorni delle bozze sono occupati: due articoli non escono lo stesso giorno.
for (const a of futuri) {
  const dopo = new Date(`${a.date}T12:00:00Z`);
  dopo.setUTCDate(dopo.getUTCDate() + 1);
  const g = dopo.toISOString().slice(0, 10);
  if (g > prossimo) prossimo = g;
}

// La mappa per settore (decisione della proprietà del 04/11/2026): la prossima voce non ancora
// scritta, di un settore diverso da quello degli ultimi due articoli; prima i settori meno coperti.
function prossimaVoce() {
  const mappa = JSON.parse(fs.readFileSync(path.join(RADICE, "content", "mappa-settori.json"), "utf8"));
  const scritte = new Set(tutti.map((a) => a.mappa).filter(Boolean));
  const recenti = tutti
    .filter((a) => a.settore)
    .sort((x, y) => y.date.localeCompare(x.date))
    .slice(0, 2)
    .map((a) => a.settore);
  const libere = mappa.voci.filter((v) => !scritte.has(v.id));
  const usatiPerSettore = (s) => tutti.filter((a) => a.settore === s).length;
  const ordinate = libere
    .filter((v) => !recenti.includes(v.settore))
    .sort((x, y) => usatiPerSettore(x.settore) - usatiPerSettore(y.settore) || mappa.voci.indexOf(x) - mappa.voci.indexOf(y));
  return { prossimaVoce: ordinate[0] ?? libere[0] ?? null, vociLibere: libere.length, ultimiSettori: recenti };
}

console.log(
  JSON.stringify(
    {
      oggi: giorno(adesso),
      ...prossimaVoce(),
      inCoda: inCoda.length,
      obiettivo: OBIETTIVO_CODA,
      daScrivere,
      bozze: bozze.map((a) => ({ pr: a.pr, date: a.date, slug: a.slug })),
      bozzeScadute: bozzeScadute.map((a) => ({ pr: a.pr, date: a.date, slug: a.slug })),
      prossimoGiornoLibero: prossimo,
      // Gli articoli si alternano tra i due fondatori.
      prossimoAutore: ultimoAutore() === "marco" ? "gianpio" : "marco",
      coda: inCoda
        .sort((x, y) => x.date.localeCompare(y.date))
        .map((a) => ({ date: a.date, slug: a.slug, argomento: a.argomento, livello: a.livello, autore: a.autore, fonte: a.fonte })),
      giaScritti: tutti.map((a) => ({ argomento: a.argomento, livello: a.livello, slug: a.slug, settore: a.settore, mappa: a.mappa })),
    },
    null,
    2
  )
);
