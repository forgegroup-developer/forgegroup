import Link from "next/link";
import type { Metadata } from "next";
import ArticleList from "@/components/blog/ArticleList";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getPublishedArticles } from "@/lib/blog/articlesAsync";
import HeroGooeySection from "@/components/HeroGooeySection";

export const metadata: Metadata = {
  title: "Blog Marketing B2B | Intelligence",
  description:
    "Strategie avanzate di acquisizione clienti, vendita high-ticket e processi commerciali B2B. Articoli tecnici per imprenditori e direttori vendite.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog Forge Group | Marketing B2B e acquisizione clienti",
    description:
      "Articoli su acquisizione clienti, vendita high-ticket e processi commerciali B2B.",
    url: "/blog",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group Blog" }],
  },
  twitter: {
    card: "summary",
    title: "Blog Forge Group",
    description: "Intelligence su marketing B2B e acquisizione clienti.",
  },
};

// Nessun searchParams qui: leggerli renderebbe la rotta dinamica e questo
// `revalidate` verrebbe ignorato (ogni visita = query a Neon). La ricerca sta
// su /blog/cerca, così l'hub resta prerenderizzato e servito dalla CDN.
export const revalidate = 3600;

export default async function BlogHub() {
  const articoli = await getPublishedArticles();

  return (
    <>
      <HeroGooeySection innerClassName="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ Blog</p>
        <h1 className="heading-hero font-semibold text-brand-nero leading-tight mb-6">
          Leggi i nostri <span className="text-brand-corallo">articoli</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-brand-grigio md:text-lg">
          Guide pratiche su acquisizione clienti B2B, processi di vendita e crescita per imprese in
          Campania e in Italia. Per un percorso su misura, scopri i{" "}
          <Link href="/servizi" className="font-semibold text-brand-corallo hover:underline">
            nostri servizi
          </Link>{" "}
          o i{" "}
          <Link href="/casi-studio" className="font-semibold text-brand-corallo hover:underline">
            casi studio
          </Link>
          .
        </p>
        <div className="mt-8 flex justify-center">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Home", href: "/" },
              { label: "Blog" },
            ]}
          />
        </div>
      </HeroGooeySection>

      <section className="py-16 md:py-20 section-bianco">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
            <div>
              <h2 className="sr-only">Leggi i nostri articoli</h2>
              <ArticleList
                articles={articoli}
                emptyMessage="Nessun articolo disponibile al momento."
              />
            </div>
            <BlogSidebar />
          </div>
        </div>
      </section>
    </>
  );
}
