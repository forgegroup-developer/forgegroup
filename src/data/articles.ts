import { scheduledArticles } from "@/data/scheduledArticles";
import { readFileArticles } from "@/lib/blog/fileArticles";
import {
  filterPublishedArticles,
  getArticlePublishDate,
  isArticlePublished,
} from "@/lib/blog/publishing";

export type ArticleFaq = {
  q: string;
  a: string;
};

export type ArticleContentBlock = {
  type: "p" | "h2" | "h3" | "ul" | "quote" | "cta" | "image";
  text?: string;
  items?: string[];
  src?: string;
  alt?: string;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  /** Se impostata, l'articolo resta nascosto fino a questa data/ora (ISO). */
  publishAt?: string;
  updatedDate?: string;
  readTime: string;
  excerpt: string;
  tags?: string[];
  faqs?: ArticleFaq[];
  content: ArticleContentBlock[];
  /** Copertina da ForgeFlow (override immagine predefinita per slug) */
  featuredImage?: string;
};

export const ARTICLE_AUTHOR = "Forge Group";

export const articles: Article[] = [
  ...scheduledArticles,
  ...readFileArticles(),
];

export { getArticlePublishDate, isArticlePublished };

export function getPublishedArticles(): Article[] {
  return filterPublishedArticles(articles).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCategorySlugsForBuild(): string[] {
  return [...new Set(articles.map((a) => categoryToSlug(a.category)))];
}

export function getCategoryFromSlug(slug: string): string | undefined {
  const categories = [...new Set(getPublishedArticles().map((a) => a.category))];
  return categories.find((c) => categoryToSlug(c) === slug);
}

export function getCategories(): { name: string; slug: string; count: number }[] {
  const map = new Map<string, number>();
  for (const article of getPublishedArticles()) {
    map.set(article.category, (map.get(article.category) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, slug: categoryToSlug(name), count }))
    .sort((a, b) => a.name.localeCompare(b.name, "it"));
}

export function getArticlesByCategory(categoryOrSlug: string): Article[] {
  const category =
    getCategoryFromSlug(categoryOrSlug) ??
    articles.find((a) => a.category === categoryOrSlug)?.category;
  if (!category) return [];
  return getPublishedArticles().filter((a) => a.category === category);
}

export function getRecentArticles(limit = 3, excludeSlug?: string): Article[] {
  return getPublishedArticles()
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, limit);
}

export function filterArticles(options?: {
  q?: string;
  category?: string;
}): Article[] {
  let result = getPublishedArticles();

  if (options?.category) {
    const category =
      getCategoryFromSlug(options.category) ??
      articles.find((a) => a.category === options.category)?.category;
    if (category) {
      result = result.filter((a) => a.category === category);
    } else {
      result = [];
    }
  }

  if (options?.q?.trim()) {
    const q = options.q.trim().toLowerCase();
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
  const article = articles.find((a) => a.slug === slug);
  if (!article || !isArticlePublished(article)) return undefined;
  return article;
}

/** Per generateStaticParams e cron: include anche articoli programmati. */
export function getArticleBySlugIncludingScheduled(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function countArticleWords(article: Article): number {
  let count = 0;
  for (const block of article.content) {
    if (block.text) {
      count += block.text.split(/\s+/).filter(Boolean).length;
    }
    if (block.items) {
      for (const item of block.items) {
        count += item.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  if (article.faqs) {
    for (const faq of article.faqs) {
      count += faq.q.split(/\s+/).filter(Boolean).length;
      count += faq.a.split(/\s+/).filter(Boolean).length;
    }
  }
  return count;
}
