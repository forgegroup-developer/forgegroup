import Image from "next/image";
import Link from "next/link";
import CaseStudyBeforeAfter from "@/components/CaseStudyBeforeAfter";
import CaseStudyClientLogo from "@/components/CaseStudyClientLogo";
import HighlightedText from "@/components/HighlightedText";
import PhoneScreenshotMockup from "@/components/PhoneScreenshotMockup";
import VideoRecensionePoster from "@/components/VideoRecensionePoster";
import DeferredMount from "@/components/DeferredMount";
import type { CaseStudy } from "@/data/caseStudies";
import { getCaseStudyImage, getCaseStudyImagePosition } from "@/data/images";

type Props = {
  c: CaseStudy;
  showBackLink?: boolean;
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function ExcerptWithHighlights({
  text,
  highlights,
}: {
  text: string;
  highlights?: string[];
}) {
  if (!highlights?.length) return <>{text}</>;

  const pattern = highlights.map(escapeRegExp).join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "g")).filter((p) => p.length > 0);

  return (
    <>
      {parts.map((part, i) =>
        highlights.includes(part) ? (
          <span key={i} className="text-brand-corallo">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function getClientDisplayName(c: CaseStudy): string {
  const azienda = c.context.find((ctx) => ctx.label === "Azienda")?.value;
  if (azienda) return azienda.split(",")[0].trim();
  if (c.clientLogoAlt) return c.clientLogoAlt;
  return c.shortTitle;
}

export default function CaseStudyDetail({ c, showBackLink = false }: Props) {
  const clientName = getClientDisplayName(c);
  return (
    <>
      {/* HERO */}
      <section className="relative z-0 overflow-hidden border-b section-coral">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={getCaseStudyImage(c.slug)}
            alt={`Caso studio ${c.shortTitle}`}
            fill
            className="object-cover object-center"
            style={{ objectPosition: getCaseStudyImagePosition(c.slug) }}
            sizes="100vw"
            quality={85}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-corallo/88 via-brand-corallo/72 to-brand-corallo/48" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 pb-12 pt-16 copy-on-coral sm:px-6 md:pb-16 md:pt-24 lg:px-8">
          {showBackLink && (
            <Link
              href="/casi-studio"
              className="link-coral mb-6 inline-flex items-center gap-2 text-sm hover:underline"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Tutti i casi studio
            </Link>
          )}

          <div className="max-w-3xl">
            <p className="eyebrow-coral mb-6">✦ {c.sector}</p>
            <h1 className="heading-hero font-semibold leading-tight">{c.resultHeadline}</h1>
          </div>
        </div>
      </section>

      {/* CONTEXT — titolo cliente e logo affiancati senza sovrapposizione */}
      <section className="relative z-10 section-bianco border-b border-brand-bordo pb-14 pt-10 md:pt-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-8 grid gap-6 md:mb-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-8">
            <h2 className="min-w-0 font-display text-[clamp(2.25rem,6vw,3.75rem)] font-bold uppercase leading-[0.95] tracking-tight text-brand-nero">
              {clientName}
            </h2>
            {c.clientLogo && (
              <div className="w-full max-w-full justify-self-start md:w-auto md:max-w-[min(100%,26rem)] md:justify-self-end">
                <CaseStudyClientLogo
                  src={c.clientLogo}
                  alt={c.clientLogoAlt ?? clientName}
                  variant="card"
                  size="3xl"
                  className="max-w-full"
                />
              </div>
            )}
          </div>

          <div>
            <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">+ Il Contesto</p>

            <p className="mb-8 max-w-3xl text-base leading-relaxed font-bold text-brand-nero">
              <ExcerptWithHighlights text={c.excerpt} highlights={c.excerptHighlights} />
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {c.context.filter((ctx) => ctx.label !== "Azienda").map((ctx, i) => (
                <div key={i} className="bg-brand-panna border border-brand-bordo rounded-xl p-5 md:p-6">
                  <div className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-2">
                    {ctx.label}
                  </div>
                  <div className="text-brand-nero font-medium leading-snug">{ctx.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="py-16 md:py-20 section-coral border-y">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
            <div className="min-w-0">
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
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/80"
                        aria-hidden
                      />
                      <span className="text-brand-nero">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {c.contextPhoneScreenshot && (
              <div className="flex w-full justify-center md:justify-end md:sticky md:top-24 md:self-start">
                <PhoneScreenshotMockup
                  src={c.contextPhoneScreenshot.src}
                  alt={c.contextPhoneScreenshot.alt}
                  imageObjectPosition={c.contextPhoneScreenshot.imageObjectPosition}
                />
              </div>
            )}
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
            <p className="max-w-3xl mx-auto mt-10 text-center text-base md:text-lg text-white/90 leading-relaxed">
              {c.resultNote}
            </p>
          )}
        </div>
      </section>

      {/* VIDEO RECENSIONE */}
      {c.videoUrl && (
        <section className="border-b border-brand-bordo py-10 sm:py-16 md:py-24 section-bianco">
          <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
            <div className="mb-6 sm:mb-10 max-w-2xl">
              <p className="mb-3 sm:mb-4 text-xs font-bold uppercase tracking-widest text-brand-corallo">
                ✦ Videorecensione
              </p>
              <h2 className="heading-section font-semibold leading-tight text-brand-nero text-balance">
                La parola di <span className="text-brand-corallo">{clientName}</span>
              </h2>
            </div>

            <DeferredMount minHeight="360px" rootMargin="320px 0px">
            <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
              <div className="min-w-0 overflow-hidden rounded-2xl sm:rounded-3xl border border-brand-bordo bg-brand-nero shadow-[0_20px_56px_-16px_rgba(17,17,17,0.28)]">
                <VideoRecensionePoster
                  src={c.videoUrl}
                  label={`Videorecensione ${clientName}`}
                />
              </div>

              <div className="min-w-0 rounded-2xl border border-brand-bordo bg-brand-panna px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
                <div className="mb-3 sm:mb-4 flex gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 sm:h-5 sm:w-5 text-brand-corallo"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.518-4.674z" />
                    </svg>
                  ))}
                </div>

                <blockquote className="mb-5 sm:mb-6 font-display text-base sm:text-lg font-semibold leading-relaxed text-brand-nero md:text-xl text-balance">
                  &ldquo;
                  {c.quoteSegments ? (
                    <HighlightedText segments={c.quoteSegments} />
                  ) : (
                    c.quote.text
                  )}
                  &rdquo;
                </blockquote>

                <div className="flex flex-col gap-3 rounded-xl border border-brand-bordo bg-brand-bianco px-4 py-4 sm:flex-row sm:items-center sm:gap-4">
                  <div className="flex min-w-0 items-center gap-3 sm:flex-1">
                    {c.clientLogo && (
                      <CaseStudyClientLogo
                        src={c.clientLogo}
                        alt={c.clientLogoAlt ?? c.quote.author}
                        variant="inline"
                        size="md"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-sm font-bold leading-snug text-brand-nero sm:truncate">
                        {c.quote.author}
                      </p>
                      <p className="mt-0.5 text-[11px] sm:text-xs font-medium uppercase tracking-wide text-brand-grigio leading-snug">
                        {c.quote.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2 border-t border-brand-bordo pt-3 sm:shrink-0 sm:flex-col sm:items-end sm:justify-center sm:border-t-0 sm:pt-0">
                    <span className="text-xs uppercase tracking-widest text-brand-grigio sm:hidden">Recensione</span>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-sm font-bold leading-none text-brand-corallo">5/5</span>
                      <span className="hidden text-[10px] uppercase tracking-widest text-brand-grigio sm:block">
                        Recensione
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </DeferredMount>
          </div>
        </section>
      )}

      {/* PRIMA / DOPO */}
      {c.beforeAfter.length > 0 && (
        <section className="py-16 md:py-24 section-bianco">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
                {c.slug === "edilizia" ? (
                  <>
                    Per imprese che fanno bene il lavoro e vogliono un{" "}
                    <span>flusso più prevedibile</span>.
                  </>
                ) : (
                  <>
                    È pensato per chi fa un ottimo lavoro, ma è stanco di{" "}
                    <span>rincorrere i clienti</span>.
                  </>
                )}
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

    </>
  );
}
