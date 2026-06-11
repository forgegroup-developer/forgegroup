import { buildLlmsTxt } from "@/lib/aiSeo/mirrors";

export const runtime = "nodejs";

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "index, follow",
    },
  });
}
