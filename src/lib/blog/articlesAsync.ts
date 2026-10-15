import { cache } from "react";
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
import {
  CATEGORIE_RINOMINATE,
  CATEGORIE_RITIRATE,
  SLUG_RITIRATI,
} from "@/data/articoliRitirati";

/**
 * Le categorie ritirate hanno un redirect permanente (next.config): non devono più avere una
 * pagina, né stare in sitemap o nella barra laterale, anche se un articolo del DB le usa ancora.
 */
const SLUG_CATEGORIE_RITIRATE = new Set(CATEGORIE_RITIRATE.map((c) => c.slug));
const categoriaAttiva = (nome: string) => !SLUG_CATEGORIE_RITIRATE.has(categoryToSlug(nome));

/**
 * `cache()` deduplica per richiesta: una pagina del blog chiama più helper
 * (lista + sidebar + categorie) e senza questo ognuno apriva la sua query Neon,
 * in sequenza. Ora la lettura del DB avviene una volta sola per render.
 */
const mergedArticles = cache(async function mergedArticles(): Promise<Article[]> {
  const fromDb = await fetchDbPublishedArticles();
  // Vince il file del repo: è lì che il Redattore scrive e riscrive dal 30/09. Prima vinceva
  // il DB, e "come-smettere-dipendere-passaparola" online era ancora la versione vecchia.
  const localSlugs = new Set(articles.map((a) => a.slug));
  const dbOnly = fromDb.filter((a) => !localSlugs.has(a.slug));
  // Gli articoli ritirati restano pubblicati nel DB: si scartano qui, e le categorie
  // rinominate prendono il nome nuovo (src/data/articoliRitirati.ts).
  return [...articles, ...dbOnly]
    .filter((a) => !SLUG_RITIRATI.has(a.slug))
    .map((a) =>
      CATEGORIE_RINOMINATE[a.category]
        ? { ...a, category: CATEGORIE_RINOMINATE[a.category] }
        : a
    );
});

export const getPublishedArticles = cache(
  async function getPublishedArticles(): Promise<Article[]> {
    return filterPublishedArticles(await mergedArticles()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
);

export async function getCategorySlugsForBuild(): Promise<string[]> {
  const merged = await mergedArticles();
  return [...new Set(merged.map((a) => a.category).filter(categoriaAttiva).map(categoryToSlug))];
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
    .filter(([name]) => categoriaAttiva(name))
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

/** Ricerca testuale del blog. Il filtro per categoria vive su /blog/categoria/[slug]. */
export async function searchArticles(query: string): Promise<Article[]> {
  const published = await getPublishedArticles();
  const q = query.trim().toLowerCase();
  if (!q) return published;

  const result = published.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags?.some((t) => t.toLowerCase().includes(q))
  );

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
