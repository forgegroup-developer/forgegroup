import { getPublishedArticles } from "@/lib/blog/articlesAsync";
import { getBlogImage } from "@/data/images";
import { SITE_NAME, absoluteUrl } from "@/lib/seo/site";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const revalidate = 3600;

export async function GET() {
  const sorted = (await getPublishedArticles()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = sorted
    .map((article) => {
      const link = absoluteUrl(`/blog/${article.slug}`);
      const pubDate = new Date(article.date).toUTCString();
      const image = absoluteUrl(getBlogImage(article.slug, article.featuredImage));

      return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description>${escapeXml(article.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(article.category)}</category>
      <enclosure url="${image}" type="image/jpeg" />
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} Blog`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <description>Articoli su acquisizione clienti B2B, marketing e processi di vendita.</description>
    <language>it-IT</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl("/blog/feed.xml")}" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
