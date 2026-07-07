import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/articles";
import { ARTICLE_AUTHOR, categoryToSlug } from "@/data/articles";
import { getBlogImage } from "@/data/images";

type Props = {
  articles: Article[];
  emptyMessage?: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleList({
  articles: list,
  emptyMessage = "Nessun articolo trovato.",
}: Props) {
  if (list.length === 0) {
    return (
      <p className="rounded-2xl border border-brand-bordo bg-brand-bianco p-8 text-center text-brand-grigio">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {list.map((article) => (
        <article
          key={article.slug}
          className="group overflow-hidden rounded-3xl border border-brand-bordo bg-brand-bianco shadow-sm transition-all hover:border-brand-corallo hover:shadow-lg"
        >
          <div className="flex flex-col md:flex-row">
            <Link
              href={`/blog/${article.slug}`}
              className="relative aspect-[16/10] md:aspect-auto md:w-2/5 md:min-h-[220px] shrink-0 overflow-hidden"
            >
              <Image
                src={getBlogImage(article.slug)}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </Link>
            <div className="flex flex-col justify-center p-6 md:p-8 md:w-3/5">
              <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-widest text-brand-grigio-light">
                <Link
                  href={`/blog/categoria/${categoryToSlug(article.category)}`}
                  className="font-bold text-brand-corallo hover:underline"
                >
                  {article.category}
                </Link>
                <span aria-hidden>·</span>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                <span aria-hidden>·</span>
                <span>di {ARTICLE_AUTHOR}</span>
              </div>
              <h2 className="mb-3 text-xl font-semibold leading-snug text-brand-nero md:text-2xl">
                <Link href={`/blog/${article.slug}`} className="group-hover:text-brand-corallo transition-colors">
                  {article.title}
                </Link>
              </h2>
              <p className="mb-5 text-brand-grigio leading-relaxed line-clamp-3">{article.excerpt}</p>
              <Link
                href={`/blog/${article.slug}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-corallo hover:underline"
              >
                Continua a leggere
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
