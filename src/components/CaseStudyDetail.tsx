import Link from "next/link";
import CaseStudyBeforeAfter from "@/components/CaseStudyBeforeAfter";
import CaseStudyClientLogo from "@/components/CaseStudyClientLogo";
import ClientReviewSection from "@/components/ClientReviewSection";
import type { CaseStudy } from "@/data/caseStudies";

type Props = {
  c: CaseStudy;
  showBackLink?: boolean;
};

export default function CaseStudyDetail({ c, showBackLink = false }: Props) {
  return (
    <>
      {/* HERO */}
      <section className="pt-16 pb-0 md:pt-24 section-coral border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 copy-on-coral">
          {showBackLink && (
            <Link
              href="/casi-studio"
              className="inline-flex items-center gap-2 text-sm link-coral mb-6 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Tutti i casi studio
            </Link>
          )}

          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="eyebrow-coral mb-6">✦ {c.sector}</p>
              <h1 className="heading-hero font-semibold leading-tight mb-6">{c.resultHeadline}</h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">{c.excerpt}</p>
            </div>

            <div className="flex shrink-0 items-center justify-end gap-2.5 sm:pt-1">
              <CaseStudyClientLogo
                src="/logo-transparent.png"
                alt="Forge Group"
                variant="circle"
                size="lg"
              />
              {c.clientLogo && (
                <CaseStudyClientLogo
                  src={c.clientLogoCircle ?? c.clientLogo}
                  alt={c.clientLogoAlt ?? c.shortTitle}
                  variant="circle"
                  size="lg"
                />
              )}
            </div>
          </div>
        </div>
        {c.videoUrl && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
            <div className="rounded-3xl overflow-hidden border border-white/20 shadow-lg bg-brand-nero">
              <video
                controls
                preload="metadata"
                playsInline
                poster="/images/video-recensione-poster.png"
                className="w-full block aspect-video object-cover"
              >
                <source src={c.videoUrl} type="video/mp4" />
              </video>
            </div>
          </div>
        )}
        {!c.videoUrl && <div className="pb-12 md:pb-16" />}
      </section>

      {/* CONTEXT */}
      <section className="py-16 md:py-20 section-bianco">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
            <div>
              <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ Il Contesto</p>
              <h2 className="text-2xl font-semibold md:text-4xl text-brand-nero leading-tight">
                Chi è il cliente.
              </h2>
            </div>
            {c.clientLogo && (
            <div className="flex flex-wrap items-center justify-end gap-3">
              <CaseStudyClientLogo
                src={c.clientLogo}
                alt={c.clientLogoAlt ?? c.shortTitle}
                variant="inline"
                size="lg"
              />
              {c.productLogo && (
                <CaseStudyClientLogo
                  src={c.productLogo}
                  alt={c.productLogoAlt ?? "Prodotto"}
                  variant="inline"
                  size="lg"
                />
              )}
            </div>
            )}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {c.context.map((ctx, i) => (
              <div key={i} className="bg-brand-panna border border-brand-bordo rounded-lg p-5">
                <div className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-1">
                  {ctx.label}
                </div>
                <div className="text-brand-nero font-medium">{ctx.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="py-16 md:py-20 section-coral border-y">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="copy-on-coral mb-8">
            <p className="eyebrow-coral mb-4">✦ La Sfida</p>
            <h2 className="heading-section leading-tight mb-6">
              Da dove <span>siamo partiti</span>.
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">{c.challenge}</p>
          </div>

          <div className="bg-brand-bianco border border-brand-bordo rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-semibold text-brand-nero mb-4">La diagnosi Forge:</h3>
            <ul className="space-y-3">
              {c.diagnosis.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5"
                    aria-hidden
                  >
                    ✕
                  </span>
                  <span className="text-brand-nero">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SISTEMA */}
      <section className="py-16 md:py-24 section-bianco">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ La Soluzione</p>
            <h2 className="heading-section font-semibold text-brand-nero leading-tight">
              Il sistema che <span className="text-brand-corallo">abbiamo implementato</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {c.system.map((step) => (
              <div
                key={step.step}
                className="bg-brand-panna border border-brand-bordo rounded-2xl p-7 hover:border-brand-corallo transition-colors"
              >
                <div className="font-display text-5xl font-semibold text-brand-corallo mb-4">{step.step}</div>
                <h3 className="text-lg font-semibold text-brand-nero mb-3">{step.title}</h3>
                <p className="text-brand-grigio leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISULTATI */}
      <section className="py-16 md:py-24 section-coral border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 copy-on-coral">
            <p className="eyebrow-coral mb-4">✦ {c.resultsEyebrow ?? "I Risultati"}</p>
            <h2 className="heading-section font-semibold leading-tight">
              {c.resultsHeading ?? "I numeri"}{" "}
              <span>{c.resultsHeadingHighlight ?? "reali"}</span>.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {c.results.map((r, i) => {
              const compactValue =
                r.value.length > 5 || /[A-Za-zÀ-ÿ]{3,}/.test(r.value.replace(/^[+~€]/, ""));
              return (
              <div
                key={i}
                className="bg-brand-bianco border border-brand-bordo rounded-2xl p-6 md:p-8 text-center hover:border-brand-corallo transition-colors"
              >
                <div
                  className={`font-semibold text-brand-corallo mb-2 ${
                    compactValue ? "text-xl md:text-2xl leading-snug" : "text-4xl md:text-5xl"
                  }`}
                >
                  {r.value}
                </div>
                <p className="text-brand-nero font-semibold text-sm md:text-base mb-1">{r.label}</p>
                {r.detail && <p className="text-xs md:text-sm text-brand-grigio">{r.detail}</p>}
              </div>
            );
            })}
          </div>
          {c.resultNote && (
            <p className="max-w-3xl mx-auto mt-10 text-center text-sm text-white/75 leading-relaxed">
              {c.resultNote}
            </p>
          )}
        </div>
      </section>

      {/* PRIMA / DOPO */}
      {c.beforeAfter.length > 0 && (
        <section className="py-16 md:py-24 section-bianco">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">
              ✦ {c.evolutionEyebrow ?? "Prima e dopo"}
            </p>
            <h2 className="heading-section font-semibold text-brand-nero leading-tight mb-8">
              {c.evolutionHeading ?? "Il confronto"}{" "}
              <span className="text-brand-corallo">
                {c.evolutionHeadingHighlight ?? "reale"}
              </span>
              {!c.evolutionHeading && "."}
            </h2>
            <CaseStudyBeforeAfter rows={c.beforeAfter} />
            {c.statusBadge && (
              <p className="mt-8 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold text-brand-corallo">
                <span className="w-2 h-2 rounded-full bg-brand-corallo animate-pulse" aria-hidden />
                {c.statusBadge}
              </p>
            )}
          </div>
        </section>
      )}

      {/* A CHI SERVE */}
      {c.forWhom && c.forWhom.length > 0 && (
        <section className="py-16 md:py-24 section-coral border-y">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="copy-on-coral mb-8">
              <p className="eyebrow-coral mb-4">✦ A chi serve</p>
              <h2 className="heading-section font-semibold leading-tight">
                È pensato per chi fa un ottimo lavoro, ma è stanco di{" "}
                <span>rincorrere i clienti</span>.
              </h2>
            </div>
            <ul className="space-y-3">
              {c.forWhom.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-brand-bianco border border-brand-bordo rounded-xl p-5"
                >
                  <span
                    className="w-6 h-6 rounded-full bg-brand-corallo text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold"
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span className="text-brand-nero leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Recensione cliente — stessa sezione della homepage */}
      {c.showQuote && c.quoteSegments && c.clientLogo && (
        <ClientReviewSection
          quoteSegments={c.quoteSegments}
          author={c.quote.author}
          role={c.quote.role}
          logoSrc={c.clientLogo}
          logoAlt={c.clientLogoAlt ?? c.quote.author}
        />
      )}
    </>
  );
}
