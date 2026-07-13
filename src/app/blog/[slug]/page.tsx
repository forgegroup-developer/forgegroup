import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import FaqAccordion from "@/components/blog/FaqAccordion";
import InlineLinkText from "@/components/blog/InlineLinkText";
import {
  ARTICLE_AUTHOR,
  categoryToSlug,
  countArticleWords,
} from "@/data/articles";
import {
  getAllArticlesForBuild,
  getArticleBySlug,
  getPublishedArticles,
} from "@/lib/blog/articlesAsync";
import { getBlogImage } from "@/data/images";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo/site";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const all = await getAllArticlesForBuild();
  return all.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) return {};

  const modified = a.updatedDate ?? a.date;

  return {
    title: a.title,
    description: a.description,
    keywords: a.tags,
    authors: [{ name: ARTICLE_AUTHOR }],
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      type: "article",
      title: `${a.title} | Forge Group`,
      description: a.description,
      url: `/blog/${a.slug}`,
      publishedTime: a.date,
      modifiedTime: modified,
      section: a.category,
      images: [{ url: getBlogImage(a.slug, a.featuredImage), width: 1200, height: 750, alt: a.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${a.title} | Forge Group`,
      description: a.description,
      images: [getBlogImage(a.slug, a.featuredImage)],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticleDetail({ params }: Props) {
  const { slug } = await params;
  const a = await getArticleBySlug(slug);
  if (!a) notFound();

  const modified = a.updatedDate ?? a.date;
  const articleUrl = absoluteUrl(`/blog/${a.slug}`);
  const imageUrl = absoluteUrl(getBlogImage(a.slug, a.featuredImage));
  const wordCount = countArticleWords(a);
  const categorySlug = categoryToSlug(a.category);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: modified,
    wordCount,
    articleSection: a.category,
    inLanguage: "it-IT",
    mainEntityOfPage: { "@id": articleUrl },
    author: { "@type": "Organization", name: ARTICLE_AUTHOR },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 750,
      caption: a.title,
    },
  };

  const allPublished = await getPublishedArticles();
  const prevArticle = allPublished
    .filter((x) => x.slug !== a.slug && new Date(x.date) < new Date(a.date))
    .sort((x, y) => new Date(y.date).getTime() - new Date(x.date).getTime())[0];
  const nextArticle = allPublished
    .filter((x) => x.slug !== a.slug && new Date(x.date) > new Date(a.date))
    .sort((x, y) => new Date(x.date).getTime() - new Date(y.date).getTime())[0];

  return (
    <>
      <script id={`ld-article-${a.slug}`} type="application/ld+json">
        {JSON.stringify(articleJsonLd)}
      </script>

      <article>
        <header className="pt-16 pb-10 md:pt-24 md:pb-12 section-coral border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 copy-on-coral">
            <div className="mb-6">
              <Breadcrumbs
                variant="light"
                items={[
                  { label: "Home", href: "/" },
                  { label: "Blog", href: "/blog" },
                  { label: a.category, href: `/blog/categoria/${categorySlug}` },
                  { label: a.title },
                ]}
              />
            </div>
            <div className="max-w-3xl">
              <p className="eyebrow-coral mb-6">
                <Link href={`/blog/categoria/${categorySlug}`} className="hover:underline">
                  ✦ {a.category}
                </Link>
              </p>
              <h1 className="heading-section font-semibold leading-tight mb-6">{a.title}</h1>
              <p className="text-lg md:text-xl text-brand-grigio leading-relaxed mb-6">
                {a.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/70 uppercase tracking-wide">
                <time dateTime={a.date}>{formatDate(a.date)}</time>
                <span aria-hidden>·</span>
                <span>{a.readTime} di lettura</span>
                <span aria-hidden>·</span>
                <span>di {ARTICLE_AUTHOR}</span>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-brand-bordo shadow-md">
              <Image
                src={getBlogImage(a.slug, a.featuredImage)}
                alt={a.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>
          </div>
        </header>

        <section className="py-12 md:py-16 section-bianco">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
              <div className="max-w-3xl space-y-6">
                {a.content.map((block, i) => {
                  if (block.type === "p")
                    return (
                      <p key={i} className="text-lg text-brand-nero leading-relaxed">
                        <InlineLinkText text={block.text ?? ""} />
                      </p>
                    );
                  if (block.type === "h2")
                    return (
                      <h2
                        key={i}
                        className="text-2xl font-semibold md:text-4xl text-brand-nero leading-tight pt-6 mt-2"
                      >
                        {block.text}
                      </h2>
                    );
                  if (block.type === "h3")
                    return (
                      <h3
                        key={i}
                        className="text-xl font-semibold text-brand-nero leading-tight pt-4"
                      >
                        {block.text}
                      </h3>
                    );
                  if (block.type === "ul")
                    return (
                      <ul key={i} className="space-y-3">
                        {block.items?.map((it, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-lg text-brand-nero">
                            <span className="text-brand-corallo text-xl shrink-0 mt-0.5">✦</span>
                            <span>
                              <InlineLinkText text={it} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    );
                  if (block.type === "quote")
                    return (
                      <blockquote
                        key={i}
                        className="border-l-4 border-brand-corallo bg-brand-pesca-light pl-6 py-6 my-8 italic text-xl md:text-2xl text-brand-nero font-display leading-snug"
                      >
                        &ldquo;{block.text}&rdquo;
                      </blockquote>
                    );
                  if (block.type === "cta")
                    return (
                      <div
                        key={i}
                        className="bg-brand-panna border-2 border-brand-corallo rounded-2xl p-6 md:p-8 my-8 text-center"
                      >
                        <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-3">
                          ✦ Vuoi applicarlo alla tua azienda?
                        </p>
                        <h3 className="text-xl font-semibold md:text-3xl text-brand-nero mb-4">
                          {block.text || "Compila la prequalifica"}
                        </h3>
                        <p className="text-brand-grigio mb-6">
                          Se sei un imprenditore B2B con fatturato 350K+, ne parliamo entro 48 ore.
                        </p>
                        <Link href="/contatti" className="btn-corallo">
                          HAI UN MINUTO?
                        </Link>
                      </div>
                    );
                  if (block.type === "image" && block.src?.trim())
                    return (
                      <figure key={i} className="my-8 overflow-hidden rounded-2xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={block.src}
                          alt={block.alt ?? ""}
                          className="w-full object-cover"
                          loading="lazy"
                        />
                      </figure>
                    );
                  return null;
                })}

                {a.faqs && a.faqs.length > 0 && <FaqAccordion faqs={a.faqs} />}

                {(prevArticle || nextArticle) && (
                  <nav
                    aria-label="Navigazione articoli"
                    className="mt-12 grid gap-4 border-t border-brand-bordo pt-8 sm:grid-cols-2"
                  >
                    {prevArticle ? (
                      <Link
                        href={`/blog/${prevArticle.slug}`}
                        className="rounded-2xl border border-brand-bordo p-4 hover:border-brand-corallo transition-colors"
                      >
                        <p className="text-xs uppercase tracking-wide text-brand-grigio-light mb-1">
                          Articolo precedente
                        </p>
                        <p className="font-semibold text-brand-nero">{prevArticle.title}</p>
                      </Link>
                    ) : (
                      <div />
                    )}
                    {nextArticle ? (
                      <Link
                        href={`/blog/${nextArticle.slug}`}
                        className="rounded-2xl border border-brand-bordo p-4 text-right hover:border-brand-corallo transition-colors sm:col-start-2"
                      >
                        <p className="text-xs uppercase tracking-wide text-brand-grigio-light mb-1">
                          Articolo successivo
                        </p>
                        <p className="font-semibold text-brand-nero">{nextArticle.title}</p>
                      </Link>
                    ) : null}
                  </nav>
                )}
              </div>

              <BlogSidebar excludeSlug={a.slug} />
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
