import {
  articles,
  categoryToSlug,
  type Article,
} from "@/data/articles";
import {
  filterPublishedArticles,
  isArticlePublished,
} from "@/lib/blog/publishing";
import { fetchDbPublishedArticles } from "@/lib/blog/dbArticles";

async function mergedArticles(): Promise<Article[]> {
  const fromDb = await fetchDbPublishedArticles();
  const dbSlugs = new Set(fromDb.map((a) => a.slug));
  const localOnly = articles.filter((a) => !dbSlugs.has(a.slug));
  return [...localOnly, ...fromDb];
}

export async function getPublishedArticles(): Promise<Article[]> {
  return filterPublishedArticles(await mergedArticles()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getCategorySlugsForBuild(): Promise<string[]> {
  const merged = await mergedArticles();
  return [...new Set(merged.map((a) => categoryToSlug(a.category)))];
}

export async function getCategoryFromSlug(
  slug: string
): Promise<string | undefined> {
  const categories = [
    ...new Set((await getPublishedArticles()).map((a) => a.category)),
  ];
  return categories.find((c) => categoryToSlug(c) === slug);
}

export async function getCategories(): Promise<
  { name: string; slug: string; count: number }[]
> {
  const map = new Map<string, number>();
  for (const article of await getPublishedArticles()) {
    map.set(article.category, (map.get(article.category) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, slug: categoryToSlug(name), count }))
    .sort((a, b) => a.name.localeCompare(b.name, "it"));
}

export async function getArticlesByCategory(
  categoryOrSlug: string
): Promise<Article[]> {
  const merged = await mergedArticles();
  const category =
    (await getCategoryFromSlug(categoryOrSlug)) ??
    merged.find((a) => a.category === categoryOrSlug)?.category;
  if (!category) return [];
  return (await getPublishedArticles()).filter((a) => a.category === category);
}

export async function getRecentArticles(
  limit = 3,
  excludeSlug?: string
): Promise<Article[]> {
  return (await getPublishedArticles())
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, limit);
}

export async function filterArticles(options?: {
  q?: string;
  category?: string;
}): Promise<Article[]> {
  const merged = await mergedArticles();
  let result = await getPublishedArticles();

  if (options?.category) {
    const category =
      (await getCategoryFromSlug(options.category)) ??
      merged.find((a) => a.category === options.category)?.category;
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

  return result.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getArticleBySlug(
  slug: string
): Promise<Article | undefined> {
  const article = (await mergedArticles()).find((a) => a.slug === slug);
  if (!article || !isArticlePublished(article)) return undefined;
  return article;
}

/** Per generateStaticParams: include anche articoli programmati nel codice. */
export async function getAllArticlesForBuild(): Promise<Article[]> {
  return mergedArticles();
}
