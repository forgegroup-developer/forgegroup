import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { categoryToSlug } from "@/data/articles";
import { getPublishedArticles } from "@/lib/blog/articlesAsync";
import { getArticlePublishDate } from "@/lib/blog/publishing";
import { inviaIndexNow } from "@/lib/seo/indexnow";
import { absoluteUrl } from "@/lib/seo/site";

export const runtime = "nodejs";

/**
 * Chiamato da Vercel Cron una volta al giorno, alle 08:05 UTC: le 10:05 d'estate
 * e le 09:05 d'inverno a Roma, quindi sempre dopo le 09:00 in cui escono gli
 * articoli in coda. È una rete di sicurezza: le pagine del blog si rigenerano
 * comunque ogni ora (`revalidate = 3600`), qui si forza la rigenerazione subito.
 *
 * Si rigenerano le rotte per modello e non slug per slug, così sono compresi
 * anche gli articoli letti dai file della coda e dal database.
 *
 * Poi avvisa Bing con IndexNow degli articoli usciti nelle ultime 26 ore (26 e non 24, così
 * un giro saltato o in ritardo non perde l'articolo), con il blog e la loro categoria.
 * Solo in produzione: le anteprime non devono finire nell'indice.
 */
const FINESTRA_ORE = 26;
export async function GET(request: Request) {
  // Il segreto è obbligatorio: la rotta manda IndexNow, non deve poterla chiamare chiunque.
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/blog");
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/blog/categoria/[category]", "page");
  revalidatePath("/sitemap.xml");
  revalidatePath("/blog/feed.xml");

  let indexNow = null;
  if (process.env.VERCEL_ENV === "production") {
    const adesso = Date.now();
    const usciti = (await getPublishedArticles()).filter((a) => {
      const uscita = new Date(getArticlePublishDate(a)).getTime();
      return uscita <= adesso && adesso - uscita < FINESTRA_ORE * 3600 * 1000;
    });
    if (usciti.length > 0) {
      indexNow = await inviaIndexNow([
        absoluteUrl("/blog"),
        ...usciti.map((a) => absoluteUrl(`/blog/${a.slug}`)),
        ...usciti.map((a) => absoluteUrl(`/blog/categoria/${categoryToSlug(a.category)}`)),
      ]);
    }
  }

  return NextResponse.json({
    revalidated: true,
    indexNow,
    at: new Date().toISOString(),
  });
}
