import type { MetadataRoute } from "next";
import { getCategories, getPublishedArticles } from "@/lib/blog/articlesAsync";
import { caseStudies } from "@/data/caseStudies";
import { getBlogImage } from "@/data/images";
import { getIndexableStaticRoutes, absoluteUrl } from "@/lib/seo/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const categoryRoutes: MetadataRoute.Sitemap = (await getCategories()).map((cat) => ({
    url: absoluteUrl(`/blog/categoria/${cat.slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const articleRoutes: MetadataRoute.Sitemap = (await getPublishedArticles()).map((a) => ({
    url: absoluteUrl(`/blog/${a.slug}`),
    lastModified: new Date(a.updatedDate ?? a.date),
    changeFrequency: "monthly",
    priority: 0.7,
    images: [absoluteUrl(getBlogImage(a.slug, a.featuredImage))],
  }));

  return [...staticRoutes, ...caseRoutes, ...categoryRoutes, ...articleRoutes];
}
