import type { Article } from "@/data/articles";

/**
 * Nelle anteprime Vercel e in locale gli articoli in coda si vedono subito:
 * è lì che la proprietà li legge prima di approvare la PR. In produzione
 * restano nascosti fino a `publishAt`.
 */
const MOSTRA_ARTICOLI_IN_CODA =
  process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development";

/** Data/ora effettiva di pubblicazione (ISO). Se assente, usa `date`. */
export function getArticlePublishDate(article: Article): string {
  return article.publishAt ?? article.date;
}

/** Vero se l'articolo ha una data di uscita non ancora arrivata. */
export function isArticleScheduled(article: Article, now: Date = new Date()): boolean {
  return new Date(getArticlePublishDate(article)) > now;
}

export function isArticlePublished(article: Article, now: Date = new Date()): boolean {
  return MOSTRA_ARTICOLI_IN_CODA || !isArticleScheduled(article, now);
}

export function filterPublishedArticles(list: Article[], now: Date = new Date()): Article[] {
  return list.filter((article) => isArticlePublished(article, now));
}
