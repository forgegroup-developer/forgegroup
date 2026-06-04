import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/data/articles";
import { getBlogImage } from "@/data/images";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Blog Marketing B2B — Intelligence",
  description:
    "Strategie avanzate di acquisizione clienti, vendita high-ticket e processi commerciali B2B. Articoli tecnici per imprenditori e direttori vendite.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogHub() {
  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ Intelligence B2B</p>
          <h1 className="heading-hero font-semibold text-brand-nero leading-tight mb-6">
            Strategie per <span className="text-brand-corallo">imprenditori</span> seri.
          </h1>
          <p className="text-xl text-brand-grigio leading-relaxed">
            Articoli tecnici riservati a chi vuole capire davvero come funziona l&apos;acquisizione clienti e la vendita B2B
            high-ticket.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 section-coral border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((a, idx) => (
              <Reveal key={a.slug} delay={(idx % 3) as 0 | 1 | 2 | 3}>
              <Link
                href={`/blog/${a.slug}`}
                className="group bg-brand-bianco border border-brand-bordo rounded-3xl overflow-hidden hover:border-brand-corallo hover:shadow-xl transition-all flex flex-col h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={getBlogImage(a.slug)}
                    alt={a.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-nero/50 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 inline-block text-xs uppercase tracking-widest text-brand-corallo font-bold bg-brand-bianco/95 backdrop-blur-sm px-3 py-1 rounded-full">
                    {a.category}
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-lg font-semibold text-brand-nero mb-3 group-hover:text-brand-corallo transition-colors leading-snug">
                    {a.title}
                  </h2>
                  <p className="text-sm text-brand-grigio mb-6 flex-grow">{a.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-brand-grigio-light pt-4 border-t border-brand-bordo">
                    <span>{formatDate(a.date)}</span>
                    <span>{a.readTime} di lettura</span>
                  </div>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
