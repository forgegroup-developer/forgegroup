import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Script from "next/script";
import { articles, getArticleBySlug } from "@/data/articles";
import { getBlogImage } from "@/data/images";
import LightBeamButton from "@/components/LightBeamButton";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticleBySlug(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.description,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: {
      type: "article",
      title: `${a.title} | Forge Group`,
      description: a.description,
      url: `/blog/${a.slug}`,
      publishedTime: a.date,
      images: [{ url: getBlogImage(a.slug), width: 1200, height: 750, alt: a.title }],
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
  const a = getArticleBySlug(slug);
  if (!a) notFound();

  const others = articles.filter((x) => x.slug !== a.slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    author: { "@type": "Organization", name: "Forge Group" },
    publisher: {
      "@type": "Organization",
      name: "Forge Group",
      logo: { "@type": "ImageObject", url: "https://www.forgegroup.it/logo.png" },
    },
  };

  return (
    <>
      <Script id={`ld-article-${a.slug}`} type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(articleJsonLd)}
      </Script>

      <article>
        <header className="pt-16 pb-10 md:pt-24 md:pb-12 section-coral border-b">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 copy-on-coral">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm link-coral mb-6 hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Tutti gli articoli
            </Link>
            <p className="eyebrow-coral mb-6">✦ {a.category}</p>
            <h1 className="heading-section font-semibold leading-tight mb-6">
              {a.title}
            </h1>
            <p className="text-lg md:text-xl text-brand-grigio leading-relaxed mb-6">{a.description}</p>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span>{formatDate(a.date)}</span>
              <span>·</span>
              <span>{a.readTime} di lettura</span>
            </div>
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-brand-bordo shadow-md">
              <Image
                src={getBlogImage(a.slug)}
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
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {a.content.map((block, i) => {
              if (block.type === "p")
                return (
                  <p key={i} className="text-lg text-brand-nero leading-relaxed">
                    {block.text}
                  </p>
                );
              if (block.type === "h2")
                return (
                  <h2
                    key={i}
                    className="text-2xl font-semibold md:text-4xl font-semibold text-brand-nero leading-tight pt-6 mt-2"
                  >
                    {block.text}
                  </h2>
                );
              if (block.type === "h3")
                return (
                  <h3
                    key={i}
                    className="text-xl font-semibold font-bold text-brand-nero leading-tight pt-4"
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
                        <span>{it}</span>
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
                    <h3 className="text-xl font-semibold md:text-3xl font-semibold text-brand-nero mb-4">
                      Compila la prequalifica
                    </h3>
                    <p className="text-brand-grigio mb-6">
                      Se sei un imprenditore B2B con fatturato 350K+, ne parliamo entro 48 ore.
                    </p>
                    <LightBeamButton href="/contatti">HAI UN MINUTO?</LightBeamButton>
                  </div>
                );
              return null;
            })}
          </div>
        </section>
      </article>

      {others.length > 0 && (
        <section className="py-16 md:py-24 section-coral border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="heading-section text-white [&_span]:text-brand-pesca-light mb-10">
              Altri <span>articoli</span>.
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/blog/${o.slug}`}
                  className="group bg-brand-bianco border border-brand-bordo rounded-2xl p-6 hover:border-brand-corallo hover:shadow-lg transition-all"
                >
                  <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-2">{o.category}</p>
                  <h3 className="text-lg font-semibold font-bold text-brand-nero mb-3 group-hover:text-brand-corallo transition-colors">
                    {o.title}
                  </h3>
                  <p className="text-sm text-brand-grigio mb-3">{o.excerpt}</p>
                  <span className="text-brand-corallo font-bold text-sm">Leggi →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
