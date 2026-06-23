import Link from "next/link";
import { articles } from "@/data/articles";
import { caseStudies } from "@/data/caseStudies";
import { getIndexableStaticRoutes } from "@/lib/seo/site";

type SeoHubNavProps = {
  currentPath?: string;
  showCaseStudies?: boolean;
  showArticles?: boolean;
};

export default function SeoHubNav({
  currentPath,
  showCaseStudies = false,
  showArticles = false,
}: SeoHubNavProps) {
  const hubPages = getIndexableStaticRoutes().filter((route) => route.path !== currentPath);

  return (
    <nav
      aria-label="Pagine principali del sito"
      className="border-t border-brand-bordo bg-brand-bianco py-12 md:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="eyebrow mb-3">Esplora Forge Group</p>
        <h2 className="mb-6 text-xl font-semibold text-brand-nero md:text-2xl">
          Acquisizione clienti, casi studio e risorse B2B
        </h2>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {hubPages.map((route) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className="block rounded-2xl border border-brand-bordo px-5 py-4 text-sm font-semibold text-brand-nero transition-colors hover:border-brand-corallo hover:text-brand-corallo"
              >
                {route.label}
              </Link>
            </li>
          ))}
        </ul>

        {showCaseStudies ? (
          <div className="mt-10">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-corallo">
              Casi studio
            </h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {caseStudies.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/casi-studio/${study.slug}`}
                    className="text-sm text-brand-grigio transition-colors hover:text-brand-corallo"
                  >
                    {study.shortTitle} — {study.sector}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {showArticles && articles.length > 0 ? (
          <div className="mt-10">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-corallo">
              Articoli del blog
            </h3>
            <ul className="space-y-2">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="text-sm text-brand-grigio transition-colors hover:text-brand-corallo"
                  >
                    {article.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
