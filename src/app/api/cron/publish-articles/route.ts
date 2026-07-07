import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { articles, categoryToSlug } from "@/data/articles";

export const runtime = "nodejs";

/**
 * Chiamato da Vercel Cron ogni giorno (09:00 ora di Roma) per rendere visibili gli articoli
 * la cui publishAt è scaduta (ISR + revalidazione on-demand).
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/blog/feed.xml");

  for (const article of articles) {
    revalidatePath(`/blog/${article.slug}`);
  }

  const categorySlugs = [...new Set(articles.map((a) => categoryToSlug(a.category)))];
  for (const slug of categorySlugs) {
    revalidatePath(`/blog/categoria/${slug}`);
  }

  return NextResponse.json({
    revalidated: true,
    at: new Date().toISOString(),
  });
}
