import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Chiamato da Vercel Cron una volta al giorno, alle 08:05 UTC: le 10:05 d'estate
 * e le 09:05 d'inverno a Roma, quindi sempre dopo le 09:00 in cui escono gli
 * articoli in coda. È una rete di sicurezza: le pagine del blog si rigenerano
 * comunque ogni ora (`revalidate = 3600`), qui si forza la rigenerazione subito.
 *
 * Si rigenerano le rotte per modello e non slug per slug, così sono compresi
 * anche gli articoli letti dai file della coda e dal database.
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
  revalidatePath("/blog/[slug]", "page");
  revalidatePath("/blog/categoria/[category]", "page");
  revalidatePath("/sitemap.xml");
  revalidatePath("/blog/feed.xml");

  return NextResponse.json({
    revalidated: true,
    at: new Date().toISOString(),
  });
}
