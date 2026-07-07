import type { Article } from "@/data/articles";

/** Data/ora effettiva di pubblicazione (ISO). Se assente, usa `date`. */
export function getArticlePublishDate(article: Article): string {
  return article.publishAt ?? article.date;
}

export function isArticlePublished(article: Article, now: Date = new Date()): boolean {
  return new Date(getArticlePublishDate(article)) <= now;
}

export function filterPublishedArticles(list: Article[], now: Date = new Date()): Article[] {
  return list.filter((article) => isArticlePublished(article, now));
}
