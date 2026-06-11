import type { MetadataRoute } from "next";

const HOST = "https://www.forgegroup.it";

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
    sitemap: `${HOST}/sitemap.xml`,
    host: HOST,
  };
}
