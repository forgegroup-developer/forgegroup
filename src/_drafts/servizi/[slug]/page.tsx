import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, getServiceBySlug } from "@/data/services";
import FAQAccordion from "@/components/FAQAccordion";
import MetodoForge from "@/components/MetodoForge";
import Reveal from "@/components/Reveal";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) return {};
  return {
    title: `${s.title} | Forge Group`,
    description: s.description,
    alternates: { canonical: `/servizi/${s.slug}` },
    openGraph: {
      title: `${s.title} | Forge Group`,
      description: s.description,
      url: `/servizi/${s.slug}`,
    },
  };
}

export default async function ServizioDetail({ params }: Props) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) notFound();

  return (
    <>
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-corallo/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-brand-corallo/15 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/servizi"
            className="hero-enter hero-enter-d1 inline-flex items-center gap-2 text-sm text-brand-corallo font-bold mb-8 hover:gap-3 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tutti i servizi
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Colonna sinistra — testo */}
            <div className="flex flex-col gap-6 lg:gap-7">
              <p className="hero-enter hero-enter-d1 self-start inline-flex items-center gap-2 eyebrow text-sm px-5 py-2.5 rounded-full border border-brand-bordo bg-brand-bianco/80 backdrop-blur-sm">
                ✦ {s.shortTitle}
              </p>
              <h1 className="hero-enter hero-enter-d2 heading-hero font-semibold text-brand-nero leading-tight">
                {s.heroHeadline}
              </h1>
              <p className="hero-enter hero-enter-d2 text-xl md:text-2xl text-brand-grigio leading-relaxed">
                {s.heroSubheadline}
              </p>
              <div className="hero-enter hero-enter-d3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-1">
                <Link href="/contatti" className="btn-corallo px-8 py-4 text-sm md:text-base">
                  Hai un minuto?
                </Link>
                <Link href="/casi-studio" className="btn-ghost px-8 py-4 text-sm md:text-base">
                  Vedi i risultati
                </Link>
              </div>
            </div>

            {/* Colonna destra — card pilastri del servizio */}
            <div className="hero-enter hero-enter-d3">
              <div className="relative rounded-3xl border border-brand-bordo bg-brand-bianco shadow-xl p-7 md:p-9">
                <div aria-hidden className="absolute -top-3 -right-3 w-24 h-24 bg-brand-corallo/10 rounded-full blur-2xl" />
                <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">
                  ✦ Cosa include
                </p>
                <ul className="space-y-4">
                  {s.pillars.map((pillar, idx) => (
                    <li key={pillar.name} className="flex items-start gap-4">
                      <span className="font-display text-2xl font-semibold text-brand-corallo/40 leading-none shrink-0 w-8">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-semibold text-brand-nero leading-snug">{pillar.name}</h3>
                        <p className="text-sm text-brand-grigio leading-snug mt-0.5">{pillar.intro}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SISTEMA INTEGRATO */}
      <section className="py-16 md:py-24 section-coral border-y">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 copy-on-coral">
          <p className="eyebrow-coral mb-4">✦ Un sistema integrato</p>
          <h2 className="heading-section font-semibold leading-tight mb-6">
            Non servizi isolati, ma <span>un sistema che lavora insieme</span>.
          </h2>
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">{s.systemIntro}</p>
        </div>
      </section>

      {/* PILASTRI / SEZIONI INTERNE */}
      <section className="py-16 md:py-24 bg-brand-bianco">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ Cosa contiene</p>
          <h2 className="heading-section font-semibold text-brand-nero leading-tight mb-12">
            Tutto ciò che compone <span className="text-brand-corallo">{s.shortTitle}</span>.
          </h2>

          <div className="space-y-14">
            {s.pillars.map((pillar, pIdx) => (
              <Reveal key={pillar.name} delay={(pIdx % 3) as 0 | 1 | 2}>
                <div>
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-brand-corallo font-bold text-sm">
                      {String(pIdx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-semibold text-brand-nero">{pillar.name}</h3>
                  </div>
                  <p className="text-brand-grigio mb-6 md:pl-9">{pillar.intro}</p>
                  <div className="grid sm:grid-cols-2 gap-4 md:pl-9">
                    {pillar.items.map((item) => (
                      <div
                        key={item.name}
                        className="bg-brand-panna border border-brand-bordo rounded-2xl p-6 hover:border-brand-corallo/50 transition-colors"
                      >
                        <h4 className="font-semibold text-brand-nero mb-2 flex items-start gap-2">
                          <span className="text-brand-corallo shrink-0">✦</span>
                          <span>{item.name}</span>
                        </h4>
                        <p className="text-brand-grigio text-sm leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TABELLA COMPARATIVA — NOI VS ALTRI */}
      <section className="py-16 md:py-24 section-coral border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 copy-on-coral">
            <p className="eyebrow-coral mb-4">✦ La differenza</p>
            <h2 className="heading-section font-semibold leading-tight">
              Come lavorano gli altri vs <span>come lavoriamo noi</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="bg-brand-panna border border-brand-bordo rounded-2xl overflow-hidden h-full">
                <div className="px-6 py-4 bg-brand-bianco border-b border-brand-bordo">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-grigio">
                    Le altre agenzie
                  </h3>
                </div>
                <ul className="divide-y divide-brand-bordo">
                  {s.comparisonItems.map((item) => (
                    <li key={item.withoutForge} className="flex items-start gap-3 px-6 py-4">
                      <span
                        className="w-5 h-5 rounded-full border-2 border-brand-bordo text-brand-grigio flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                        aria-hidden
                      >
                        ✕
                      </span>
                      <span className="text-sm text-brand-grigio leading-snug">{item.withoutForge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={1}>
              <div className="bg-brand-bianco border-2 border-brand-corallo rounded-2xl overflow-hidden h-full">
                <div className="px-6 py-4 bg-brand-pesca-light border-b border-brand-corallo/30">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-corallo">
                    Forge Group
                  </h3>
                </div>
                <ul className="divide-y divide-brand-bordo">
                  {s.comparisonItems.map((item) => (
                    <li key={item.withForge} className="flex items-start gap-3 px-6 py-4">
                      <span
                        className="w-5 h-5 rounded-full bg-brand-corallo text-white flex items-center justify-center shrink-0 mt-0.5"
                        aria-hidden
                      >
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm font-medium text-brand-nero leading-snug">{item.withForge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PAIN POINTS + PER CHI È IDEALE */}
      <section className="py-16 md:py-24 bg-brand-bianco">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">
            ✦ Ti riconosci in questo?
          </p>
          <h2 className="heading-section text-brand-nero leading-tight mb-10 md:mb-12 max-w-3xl">
            I problemi che senti{" "}
            <span className="text-brand-corallo">ogni giorno</span>, prima che diventino numeri rossi.
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
            {s.painPoints.map((pain, idx) => (
              <Reveal key={pain} delay={(idx % 3) as 0 | 1 | 2}>
                <div className="flex items-start gap-4 h-full rounded-2xl border border-brand-bordo bg-brand-panna p-6">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-corallo/15 text-brand-corallo text-base font-bold"
                    aria-hidden
                  >
                    ✕
                  </span>
                  <p className="text-base md:text-lg text-brand-nero leading-snug pt-0.5">{pain}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Ponte pain → soluzione */}
          <Reveal>
            <div className="mt-8 md:mt-10 rounded-2xl border-l-4 border-brand-corallo bg-brand-pesca-light px-6 py-6 md:px-8 md:py-7">
              <p className="text-lg md:text-xl text-brand-nero leading-relaxed">{s.painConclusion}</p>
            </div>
          </Reveal>

          {/* Per chi è ideale */}
          <div className="mt-14 md:mt-20 pt-12 border-t border-brand-bordo">
            <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">
              ✦ Allora {s.shortTitle} è per te
            </p>
            <div className="grid md:grid-cols-3 gap-4 md:gap-5">
              {s.forWho.map((item, idx) => (
                <Reveal key={item} delay={(idx % 3) as 0 | 1 | 2}>
                  <div className="flex h-full flex-col gap-3 rounded-2xl border border-brand-bordo bg-brand-bianco p-6 shadow-sm">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-corallo text-white shrink-0"
                      aria-hidden
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-base text-brand-nero leading-snug">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-10">
              <Link href="/contatti" className="btn-corallo">
                Hai un minuto?
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* METODO FORGE */}
      <MetodoForge className="section-coral border-y" onCoral />

      {/* FAQ EDUCATIVE */}
      <section className="py-16 md:py-24 bg-brand-bianco">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ Domande frequenti</p>
          <h2 className="heading-section text-brand-nero mb-8">
            Quello che spesso ci si chiede su <span className="text-brand-corallo">{s.shortTitle}</span>
          </h2>
          <FAQAccordion items={s.faqs} />
        </div>
      </section>

    </>
  );
}
