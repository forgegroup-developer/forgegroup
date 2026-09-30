import fs from "node:fs";
import path from "node:path";
import type { Article } from "@/data/articles";

/**
 * La coda degli articoli: un file JSON per articolo in `content/articoli/`.
 * Il Redattore aggiunge un file con una PR; il merge è l'approvazione, e
 * `publishAt` decide quando l'articolo compare. Il formato è descritto in
 * `content/articoli/LEGGIMI.md`.
 *
 * I file entrano nel bundle delle funzioni tramite `outputFileTracingIncludes`
 * (next.config.ts): senza, la rigenerazione ISR su Vercel non li troverebbe.
 */
const CARTELLA = path.join(process.cwd(), "content", "articoli");

export function readFileArticles(): Article[] {
  let nomi: string[];
  try {
    nomi = fs.readdirSync(CARTELLA).filter((n) => n.endsWith(".json"));
  } catch {
    return [];
  }

  return nomi.map((nome) => {
    const articolo = JSON.parse(
      fs.readFileSync(path.join(CARTELLA, nome), "utf8")
    ) as Article;
    if (`${articolo.slug}.json` !== nome) {
      throw new Error(`content/articoli/${nome}: lo slug interno è "${articolo.slug}"`);
    }
    return articolo;
  });
}
