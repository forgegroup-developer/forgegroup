import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleList from "@/components/blog/ArticleList";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  getArticlesByCategory,
  getCategoryFromSlug,
  getCategorySlugsForBuild,
} from "@/lib/blog/articlesAsync";
import HeroGooeySection from "@/components/HeroGooeySection";

type Props = { params: Promise<{ category: string }> };

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getCategorySlugsForBuild();
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryName = await getCategoryFromSlug(category);
  if (!categoryName) return {};

  return {
    title: `Articoli su ${categoryName}`,
    description: `Guide e articoli su ${categoryName.toLowerCase()} per imprenditori B2B. Strategie pratiche da Forge Group.`,
    alternates: { canonical: `/blog/categoria/${category}` },
    openGraph: {
      title: `${categoryName} | Blog Forge Group`,
      description: `Articoli su ${categoryName.toLowerCase()} per imprenditori e aziende B2B.`,
      url: `/blog/categoria/${category}`,
      images: [{ url: "/logo.png", width: 1024, height: 1024, alt: `Blog ${categoryName}` }],
    },
    twitter: {
      card: "summary",
      title: `${categoryName} | Blog Forge Group`,
      description: `Articoli su ${categoryName.toLowerCase()} per imprenditori B2B.`,
    },
  };
}

export default async function BlogCategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryName = await getCategoryFromSlug(category);
  if (!categoryName) notFound();

  const categoryArticles = await getArticlesByCategory(category);

  return (
    <>
      <HeroGooeySection innerClassName="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">
          ✦ {categoryName}
        </p>
        <h1 className="heading-hero font-semibold text-brand-nero leading-tight mb-6">
          Articoli su <span className="text-brand-corallo">{categoryName}</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-brand-grigio md:text-lg">
          Tutti gli articoli nella categoria {categoryName}. Torna all&apos;{" "}
          <Link href="/blog" className="font-semibold text-brand-corallo hover:underline">
            archivio completo
          </Link>
          .
        </p>
        <div className="mt-8 flex justify-center">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: categoryName },
            ]}
          />
        </div>
      </HeroGooeySection>

      <section className="py-16 md:py-20 section-bianco">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
            <div>
              <ArticleList
                articles={categoryArticles}
                emptyMessage={`Nessun articolo nella categoria ${categoryName}.`}
              />
            </div>
            <BlogSidebar />
          </div>
        </div>
      </section>
    </>
  );
}
