import { SITE_URL } from "@/lib/seo/site";

/**
 * IndexNow: avvisa Bing (e gli altri motori che lo usano) che una pagina è nuova o cambiata.
 * ChatGPT cerca sull'indice di Bing, quindi più Bing è veloce più presto un articolo può essere
 * citato (piano SEO GEO SEM, 15/10/2026). Google non usa IndexNow: per Google resta la sitemap.
 *
 * La chiave non è un segreto: per regola del protocollo sta in chiaro nel file
 * `public/<chiave>.txt`, ed è così che Bing verifica che le richieste vengono dal sito.
 */
export const INDEXNOW_KEY = "a32df6f5f3e4f5cb9c794500250efa9e";

export type EsitoIndexNow = { inviati: number; stato: number | null; errore?: string };

export async function inviaIndexNow(urls: string[]): Promise<EsitoIndexNow> {
  const elenco = [...new Set(urls)].filter((u) => u.startsWith(SITE_URL));
  if (elenco.length === 0) return { inviati: 0, stato: null };
  try {
    const risposta = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: elenco,
      }),
    });
    // 200 e 202 vogliono dire ricevuto; 202 = chiave ancora da verificare.
    return { inviati: elenco.length, stato: risposta.status };
  } catch (e) {
    return { inviati: 0, stato: null, errore: e instanceof Error ? e.message : String(e) };
  }
}
