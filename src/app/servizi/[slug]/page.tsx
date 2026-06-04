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
    title: `${s.title} — Forge Group`,
    description: s.description,
    alternates: { canonical: `/servizi/${s.slug}` },
    openGraph: {
      title: `${s.title} — Forge Group`,
      description: s.description,
      url: `/servizi/${s.slug}`,
    },
  };
}

export default async function ServizioDetail({ params }: Props) {
  const { slug } = await params;
  const s = getServiceBySlug(slug);
  if (!s) notFound();

  const otherServices = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-corallo/15 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/servizi" className="inline-flex items-center gap-2 text-sm text-brand-corallo font-bold mb-6 hover:underline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tutti i servizi
          </Link>
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ {s.shortTitle}</p>
          <h1 className="heading-hero font-semibold text-brand-nero leading-tight mb-6">{s.heroHeadline}</h1>
          <p className="text-xl md:text-2xl text-brand-grigio leading-relaxed mb-10">{s.heroSubheadline}</p>
          <Link href="/contatti" className="btn-corallo">
            HAI UN MINUTO?
          </Link>
        </div>
      </section>

      {/* SISTEMA INTEGRATO */}
      <section className="py-16 md:py-24 section-coral border-y">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 copy-on-coral">
          <p className="eyebrow-coral mb-4">✦ Un sistema integrato</p>
          <h2 className="heading-section font-semibold leading-tight mb-6">
            Non servizi isolati, ma <span>un sistema che lavora insieme</span>.
          </h2>
          <p className="text-lg md:text-xl text-brand-grigio leading-relaxed">{s.systemIntro}</p>
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

      {/* PER CHI È IDEALE */}
      <section className="py-16 md:py-24 bg-brand-bianco">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ Per chi è ideale</p>
          <ul className="space-y-3">
            {s.forWho.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-brand-panna border border-brand-bordo rounded-lg p-5">
                <span className="text-brand-corallo text-xl shrink-0">✦</span>
                <span className="text-lg text-brand-nero">{item}</span>
              </li>
            ))}
          </ul>
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

      {/* ALTRE MACRO AREE */}
      <section className="py-16 md:py-24 section-coral border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-section text-white [&_span]:text-brand-pesca-light mb-10">
            Le altre <span className="text-brand-corallo">aree di servizio</span> Forge.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/servizi/${other.slug}`}
                className="group bg-brand-bianco border border-brand-bordo rounded-2xl p-6 hover:border-brand-corallo hover:shadow-lg transition-all"
              >
                <h3 className="text-lg font-semibold font-bold text-brand-nero mb-2 group-hover:text-brand-corallo transition-colors">
                  {other.title}
                </h3>
                <p className="text-brand-grigio text-sm mb-4">{other.tagline}</p>
                <span className="inline-flex items-center gap-2 text-brand-corallo font-bold text-sm">
                  Scopri di più →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
