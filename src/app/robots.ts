import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

/** Crawler AI esplicitamente ammessi (playbook AI SEO — non bloccare) */
const AI_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
] as const;

export default function robots(): MetadataRoute.Robots {
  const sharedDisallow = ["/api/"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: sharedDisallow,
      },
      ...AI_BOTS.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: sharedDisallow,
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
