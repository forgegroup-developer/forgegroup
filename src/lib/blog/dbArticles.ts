import { neon } from "@neondatabase/serverless";
import type { Article } from "@/data/articles";

type DbArticleRow = {
  slug: string;
  title: string;
  description: string;
  category: string;
  excerpt: string;
  read_time: string;
  tags: string[];
  faqs: Article["faqs"];
  content: Article["content"];
  featured_image: string | null;
  date: string | null;
  updated_date: string | null;
};

function mapRow(row: DbArticleRow): Article {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category,
    excerpt: row.excerpt,
    readTime: row.read_time,
    tags: row.tags ?? [],
    faqs: row.faqs ?? [],
    content: row.content ?? [],
    featuredImage: row.featured_image?.trim() || undefined,
    date: row.date ?? new Date().toISOString().slice(0, 10),
    updatedDate: row.updated_date ?? undefined,
  };
}

/** Articoli pubblicati da ForgeFlow (Neon). Fallback silenzioso se DB assente. */
export async function fetchDbPublishedArticles(): Promise<Article[]> {
  const url = process.env.DATABASE_URL;
  if (!url) return [];

  try {
    const sql = neon(url);
    const rows = (await sql`
      SELECT slug, title, description, category, excerpt, read_time,
             tags, faqs, content, featured_image, date, updated_date
      FROM articles
      WHERE status = 'published'
      ORDER BY date DESC NULLS LAST
    `) as DbArticleRow[];
    return rows.map(mapRow);
  } catch (err) {
    console.error("[dbArticles] lettura fallita, uso solo articoli hardcoded:", err);
    return [];
  }
}
