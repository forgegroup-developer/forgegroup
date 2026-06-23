import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { caseStudies } from "@/data/caseStudies";
import { getIndexableStaticRoutes, SITE_URL, absoluteUrl } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = getIndexableStaticRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const caseRoutes: MetadataRoute.Sitemap = caseStudies.map((c) => ({
    url: absoluteUrl(`/casi-studio/${c.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: absoluteUrl(`/blog/${a.slug}`),
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...caseRoutes, ...articleRoutes];
}
