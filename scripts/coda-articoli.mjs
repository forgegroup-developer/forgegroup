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
  let pr = [];
  try {
    pr = JSON.parse(esegui("gh", ["pr", "list", "--state", "open", "--label", "articolo", "--json", "number,headRefName,files,isDraft"]));
  } catch {
    return [];
  }
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

console.log(
  JSON.stringify(
    {
      oggi: giorno(adesso),
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
      giaScritti: tutti.map((a) => ({ argomento: a.argomento, livello: a.livello, slug: a.slug })),
    },
    null,
    2
  )
);
