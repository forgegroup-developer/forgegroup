#!/usr/bin/env node
/**
 * Lo stato della coda degli articoli, per il Redattore.
 *
 * Uso:  node scripts/coda-articoli.mjs
 *
 * Legge gli articoli già su main (origin/main:content/articoli) e quelli nelle PR aperte con
 * l'etichetta "articolo", e stampa in JSON:
 *   - quanti articoli sono in coda (uscita futura)
 *   - il prossimo giorno libero (il giorno dopo l'ultimo in coda, almeno domani)
 *   - gli argomenti e i livelli già scritti, per non ripeterli
 * I conti li fa questo script, non il modello.
 */
import { execFileSync } from "node:child_process";

const OBIETTIVO_CODA = 7;

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
    pr = JSON.parse(esegui("gh", ["pr", "list", "--state", "open", "--label", "articolo", "--json", "number,headRefName,files"]));
  } catch {
    return [];
  }
  const articoli = [];
  for (const p of pr) {
    for (const f of p.files.map((x) => x.path).filter((x) => x.startsWith("content/articoli/") && x.endsWith(".json"))) {
      try {
        esegui("git", ["fetch", "-q", "origin", p.headRefName]);
        articoli.push({ ...JSON.parse(esegui("git", ["show", `origin/${p.headRefName}:${f}`])), fonte: `PR #${p.number}` });
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
const inCoda = tutti.filter((a) => new Date(a.publishAt) > adesso);

const domani = new Date(adesso.getTime() + 24 * 3600 * 1000);
let prossimo = giorno(domani);
for (const a of inCoda) {
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
      daScrivere: Math.max(0, OBIETTIVO_CODA - inCoda.length),
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
