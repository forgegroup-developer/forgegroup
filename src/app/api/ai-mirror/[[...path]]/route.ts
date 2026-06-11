import { getMirrorMarkdown, getMirrorPath } from "@/lib/aiSeo/mirrors";

export const runtime = "nodejs";

type Params = { params: Promise<{ path?: string[] }> };

export async function GET(_request: Request, { params }: Params) {
  const { path: pathSegments } = await params;
  const mirrorPath = getMirrorPath(pathSegments);

  if (mirrorPath === null) {
    return new Response("Not found", { status: 404 });
  }

  const markdown = getMirrorMarkdown(mirrorPath);
  if (!markdown) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "index, follow",
    },
  });
}
