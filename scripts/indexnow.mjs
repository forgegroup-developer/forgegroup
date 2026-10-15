#!/usr/bin/env node
/**
 * Avvisa Bing con IndexNow di tutte le pagine della sitemap del sito in produzione.
 * Gli articoli nuovi li avvisa da solo il cron giornaliero (/api/cron/publish-articles):
 * questo script serve dopo una modifica a più pagine (una PR sul sito) o la prima volta.
 *
 * Uso:  node scripts/indexnow.mjs            (tutta la sitemap)
 *       node scripts/indexnow.mjs /servizi /  (solo queste pagine)
 */
const SITO = "https://www.forgegroup.it";
const CHIAVE = "a32df6f5f3e4f5cb9c794500250efa9e"; // la stessa di src/lib/seo/indexnow.ts

const percorsi = process.argv.slice(2);
let urls;
if (percorsi.length > 0) {
  urls = percorsi.map((p) => SITO + (p.startsWith("/") ? p : `/${p}`));
} else {
  const sitemap = await (await fetch(`${SITO}/sitemap.xml`)).text();
  urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const risposta = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITO).host, key: CHIAVE, keyLocation: `${SITO}/${CHIAVE}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${urls.length} pagine inviate, risposta ${risposta.status} (200 o 202 = ricevuto)`);
if (risposta.status >= 400) process.exit(1);
