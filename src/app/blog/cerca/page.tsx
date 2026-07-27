import Link from "next/link";
import type { Metadata } from "next";
import ArticleList from "@/components/blog/ArticleList";
import BlogSidebar from "@/components/blog/BlogSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { searchArticles } from "@/lib/blog/articlesAsync";
import HeroGooeySection from "@/components/HeroGooeySection";

// Pagina di servizio: dinamica per forza di cose (dipende da ?q=) e fuori
// dall'indice, così /blog resta prerenderizzato e servito dalla CDN.
export const metadata: Metadata = {
  title: "Cerca nel blog",
  description: "Cerca tra gli articoli del blog Forge Group su marketing B2B e acquisizione clienti.",
  robots: { index: false, follow: true },
};

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function BlogSearch({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const risultati = await searchArticles(query);

  return (
    <>
      <HeroGooeySection innerClassName="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ Blog</p>
        <h1 className="heading-hero font-semibold text-brand-nero leading-tight mb-6">
          Risultati <span className="text-brand-corallo">ricerca</span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-brand-grigio md:text-lg">
          {query
            ? `${risultati.length} ${risultati.length === 1 ? "articolo" : "articoli"} per "${query}".`
            : "Scrivi una parola chiave nel riquadro di ricerca per filtrare gli articoli."}{" "}
          Torna a{" "}
          <Link href="/blog" className="font-semibold text-brand-corallo hover:underline">
            tutti gli articoli
          </Link>
          .
        </p>
        <div className="mt-8 flex justify-center">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: "Ricerca" },
            ]}
          />
        </div>
      </HeroGooeySection>

      <section className="py-16 md:py-20 section-bianco">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
            <div>
              <h2 className="sr-only">
                {query ? `Risultati per "${query}"` : "Tutti gli articoli"}
              </h2>
              <ArticleList
                articles={risultati}
                emptyMessage="Nessun articolo corrisponde alla ricerca. Prova con altre parole chiave."
              />
            </div>
            <BlogSidebar searchQuery={query} />
          </div>
        </div>
      </section>
    </>
  );
}
