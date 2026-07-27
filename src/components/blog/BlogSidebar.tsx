import Image from "next/image";
import Link from "next/link";
import {
  getCategories,
  getPublishedArticles,
  getRecentArticles,
} from "@/lib/blog/articlesAsync";
import { getBlogImage } from "@/data/images";
import BlogSidebarNewsletter from "@/components/blog/BlogSidebarNewsletter";

type Props = {
  excludeSlug?: string;
  searchQuery?: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogSidebar({ excludeSlug, searchQuery = "" }: Props) {
  const recent = await getRecentArticles(3, excludeSlug);
  const categories = await getCategories();
  const publishedCount = (await getPublishedArticles()).length;

  return (
    <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-2xl border border-brand-bordo bg-brand-bianco p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-nero mb-4">Cerca</h2>
        <form action="/blog/cerca" method="get" className="flex gap-2">
          <label htmlFor="blog-sidebar-search" className="sr-only">
            Cerca nel blog
          </label>
          <input
            id="blog-sidebar-search"
            type="search"
            name="q"
            defaultValue={searchQuery}
            placeholder="Cerca articoli..."
            className="min-w-0 flex-1 rounded-xl border border-brand-bordo bg-brand-panna px-4 py-2.5 text-sm text-brand-nero outline-none focus:border-brand-corallo"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-brand-corallo px-4 py-2.5 text-sm font-bold text-white hover:opacity-90 transition-opacity"
            aria-label="Cerca"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>
      </div>

      {recent.length > 0 && (
        <div className="rounded-2xl border border-brand-bordo bg-brand-bianco p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-nero mb-4">Articoli recenti</h2>
          <ul className="space-y-4">
            {recent.map((article) => (
              <li key={article.slug}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex gap-3 items-start"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-brand-bordo">
                    <Image
                      src={getBlogImage(article.slug, article.featuredImage)}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-wide text-brand-grigio-light mb-1">
                      {formatDate(article.date)}
                    </p>
                    <p className="text-sm font-semibold text-brand-nero leading-snug group-hover:text-brand-corallo transition-colors line-clamp-2">
                      {article.title}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {categories.length > 0 && (
        <div className="rounded-2xl border border-brand-bordo bg-brand-bianco p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-brand-nero mb-4">Categorie</h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/blog/categoria/${cat.slug}`}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-brand-grigio hover:bg-brand-panna hover:text-brand-corallo transition-colors"
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-brand-grigio-light">({cat.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-2xl border border-brand-bordo bg-brand-panna p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-nero mb-2">Iniziamo</h2>
        <p className="text-sm text-brand-grigio mb-4">
          Vuoi costruire un sistema di acquisizione clienti prevedibile?
        </p>
        <p className="text-sm text-brand-nero mb-1">
          <a href="mailto:info@forgegroup.it" className="font-semibold text-brand-corallo hover:underline">
            info@forgegroup.it
          </a>
        </p>
        <Link href="/contatti" className="btn-corallo mt-4 inline-block text-sm">
          Richiedi una call
        </Link>
      </div>

      <div className="rounded-2xl border border-brand-bordo bg-brand-corallo p-5 shadow-sm text-white">
        <h2 className="text-lg font-semibold mb-2">Iscriviti alla newsletter</h2>
        <p className="text-sm text-white/85 mb-4">Niente spam. Solo aggiornamenti utili.</p>
        <BlogSidebarNewsletter />
      </div>

      {publishedCount === 0 && (
        <p className="text-sm text-brand-grigio">Nessun articolo disponibile.</p>
      )}
    </aside>
  );
}
