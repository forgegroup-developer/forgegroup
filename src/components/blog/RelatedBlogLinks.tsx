import Link from "next/link";
import { getArticleBySlug } from "@/data/articles";

type Props = {
  slugs: string[];
  title?: string;
};

/**
 * Blocco di internal linking da pagine servizi/casi-studio verso articoli
 * blog pertinenti. Chiude il ciclo di link interni in entrambe le direzioni.
 */
export default function RelatedBlogLinks({ slugs, title = "Approfondisci sul blog" }: Props) {
  const items = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (items.length === 0) return null;

  return (
    <section className="py-16 md:py-20 section-bianco border-t border-brand-bordo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-brand-nero mb-8">{title}</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group rounded-2xl border border-brand-bordo bg-brand-panna p-6 hover:border-brand-corallo hover:shadow-md transition-all"
            >
              <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-3">
                {article.category}
              </p>
              <h3 className="text-lg font-semibold text-brand-nero mb-2 group-hover:text-brand-corallo transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-sm text-brand-grigio line-clamp-2 mb-3">{article.excerpt}</p>
              <span className="text-sm font-bold text-brand-corallo">Leggi l&apos;articolo →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
