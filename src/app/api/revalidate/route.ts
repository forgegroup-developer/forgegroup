import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Webhook chiamato da ForgeFlow dopo la pubblicazione di un articolo.
 * Header: Authorization: Bearer <REVALIDATE_SECRET>
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "REVALIDATE_SECRET non configurato" },
      { status: 503 }
    );
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
