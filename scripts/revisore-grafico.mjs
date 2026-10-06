#!/usr/bin/env node
/**
 * Il Revisore grafico: apre tutte le pagine del sito (dalla sitemap), da
 * computer e da telefono, e controlla gli errori che a occhio sfuggono.
 *
 * Uso:  node scripts/revisore-grafico.mjs [indirizzo base] [file.md]
 *       (base predefinita: http://localhost:3000; il rapporto va in file.md)
 *
 * Controlli (nati dalle correzioni della proprietà, 29/09-06/10/2026):
 *  1. Evidenziatore: il riquadro corallo di una parola chiave copre le
 *     lettere di un'altra riga.
 *  2. Pulsanti: corallo, bordato e hero devono essere alti 56 px (±3),
 *     fuori da menu e footer, e stare su al massimo due righe.
 *  3. Pagina più larga dello schermo da telefono (si scorre di lato).
 *  4. Immagini che non si caricano.
 *  5. Testo che esce dalla sua scheda.
 *
 * Esce con codice 1 se c'è almeno un errore.
 */
import fs from "node:fs";
import { chromium } from "playwright";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const RAPPORTO = process.argv[3] || "";
const DISPOSITIVI = [
  ["computer", 1440],
  ["telefono", 390],
];
const ALTEZZA_PULSANTE = 56;

async function pagine() {
  try {
    const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
    const percorsi = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    const unici = [...new Set(percorsi)].filter((p) => !p.startsWith("/blog/categoria"));
    if (unici.length) return unici;
  } catch {
    /* la sitemap manca: si usa l'elenco fisso */
  }
  return ["/", "/servizi", "/casi-studio", "/crm-gestionale-edilizia", "/contatti", "/inizia", "/blog"];
}

const opzioniLancio = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
const browser = await chromium.launch(opzioniLancio);
const errori = [];
const avvisi = [];
const elenco = await pagine();

for (const [disp, larghezza] of DISPOSITIVI) {
  const p = await browser.newPage({ viewport: { width: larghezza, height: 900 } });
  for (const percorso of elenco) {
    try {
      await p.goto(BASE + percorso, { waitUntil: "load", timeout: 90000 });
    } catch {
      errori.push(`${disp} ${percorso}: la pagina non si apre`);
      continue;
    }
    // Si scorre tutta la pagina: le sezioni caricate al passaggio devono comparire.
    const altezza = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < altezza + 2000; y += 500) {
      await p.evaluate((y) => scrollTo(0, y), y);
      await p.waitForTimeout(60);
    }
    await p.waitForTimeout(500);
    await p.evaluate(() => document.querySelectorAll("#iubenda-cs-banner, .iubenda-tp-btn").forEach((e) => e.remove()));

    const r = await p.evaluate(
      ({ ALTEZZA_PULSANTE, larghezza }) => {
        const out = { evid: [], pulsanti: [], largo: 0, immagini: [], fuori: [] };
        const fuoriMenu = (e) => !e.closest("header, nav, footer");

        // 1 · evidenziatore
        for (const e of document.querySelectorAll("body *")) {
          const cs = getComputedStyle(e);
          if (cs.display !== "inline" || !(e.innerText || "").trim()) continue;
          const pieno = cs.backgroundColor !== "rgba(0, 0, 0, 0)" || (cs.backgroundImage && cs.backgroundImage !== "none");
          if (!pieno) continue;
          const blocco = e.closest("h1,h2,h3,h4,p,li,td,dd,dt,div");
          if (!blocco) continue;
          const rng = document.createRange();
          const w = document.createTreeWalker(blocco, NodeFilter.SHOW_TEXT);
          const altri = [];
          while (w.nextNode()) {
            const n = w.currentNode;
            if (e.contains(n) || !n.textContent.trim()) continue;
            rng.selectNodeContents(n);
            altri.push(...rng.getClientRects());
          }
          let peggio = 0;
          for (const a of e.getClientRects())
            for (const o of altri) {
              const dx = Math.min(a.right, o.right) - Math.max(a.left, o.left);
              const dy = Math.min(a.bottom, o.bottom) - Math.max(a.top, o.top);
              if (dx > 2 && Math.abs(a.top - o.top) > 4) peggio = Math.max(peggio, dy);
            }
          if (peggio > 6) out.evid.push(`«${e.innerText.trim().slice(0, 40)}» copre ${Math.round(peggio)} px della riga vicina`);
        }

        // 2 · pulsanti
        for (const e of document.querySelectorAll(".btn-corallo, .btn-ghost, .btn-hero")) {
          const rc = e.getBoundingClientRect();
          if (!rc.width || !fuoriMenu(e)) continue;
          const testo = (e.innerText || "").trim().replace(/\s+/g, " ").slice(0, 40);
          if (Math.abs(rc.height - ALTEZZA_PULSANTE) > 3) {
            const righe = Math.round(rc.height / (parseFloat(getComputedStyle(e).lineHeight) || 20));
            out.pulsanti.push(`«${testo}» alto ${Math.round(rc.height)} px invece di ${ALTEZZA_PULSANTE}${righe > 2 ? " (va a capo: accorcia il testo)" : ""}`);
          }
        }

        // 3 · pagina più larga dello schermo
        out.largo = document.documentElement.scrollWidth - larghezza;

        // 4 · immagini rotte
        for (const img of document.querySelectorAll("img")) {
          if (img.complete && img.naturalWidth === 0 && img.getBoundingClientRect().width > 0)
            out.immagini.push(img.getAttribute("src") || img.alt || "(senza src)");
        }

        // 5 · testo che esce dalla sua scheda
        for (const card of document.querySelectorAll("[class*='rounded-2xl'], [class*='rounded-3xl'], .card-xl")) {
          const cs = getComputedStyle(card);
          if (cs.overflow === "hidden" || !fuoriMenu(card)) continue;
          if (card.scrollWidth > card.clientWidth + 4) {
            const t = (card.innerText || "").trim().replace(/\s+/g, " ").slice(0, 40);
            out.fuori.push(`«${t}» esce di ${card.scrollWidth - card.clientWidth} px`);
          }
        }
        return out;
      },
      { ALTEZZA_PULSANTE, larghezza },
    );

    const dove = `${disp} ${percorso}`;
    for (const x of new Set(r.evid)) errori.push(`${dove} · evidenziatore: ${x}`);
    for (const x of new Set(r.pulsanti)) errori.push(`${dove} · pulsante: ${x}`);
    if (r.largo > 2) errori.push(`${dove} · la pagina è più larga dello schermo di ${r.largo} px (si scorre di lato)`);
    for (const x of new Set(r.immagini)) errori.push(`${dove} · immagine che non si carica: ${x}`);
    for (const x of new Set(r.fuori)) avvisi.push(`${dove} · testo fuori dalla scheda: ${x}`);
  }
  await p.close();
}
await browser.close();

const righe = [
  `## Revisore grafico`,
  ``,
  `Pagine controllate: ${elenco.length}, da computer e da telefono.`,
  ``,
  errori.length ? `### ✕ ${errori.length} errori` : `### ✓ Nessun errore`,
  ...errori.map((e) => `- ${e}`),
  ``,
  avvisi.length ? `### Da guardare (${avvisi.length})` : "",
  ...avvisi.map((a) => `- ${a}`),
];
const testo = righe.filter((r, i, a) => !(r === "" && a[i - 1] === "")).join("\n");
console.log(testo);
if (RAPPORTO) fs.writeFileSync(RAPPORTO, testo + "\n");
process.exit(errori.length ? 1 : 0);
