import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, getServiceBySlug } from "@/data/services";
import CTASection from "@/components/CTASection";
import FAQAccordion from "@/components/FAQAccordion";
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
    title: s.title,
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
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pesca-light rounded-full blur-3xl" />
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

      <section className="py-16 md:py-24 bg-brand-panna border-y border-brand-bordo">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ Servizi inclusi</p>
          <h2 className="heading-section font-semibold text-brand-nero leading-tight mb-8">
            Tutto quello che contiene questo <span className="text-brand-corallo">gruppo operativo</span>.
          </h2>
          <div className="space-y-4">
            {s.subServices.map((service, i) => (
              <Reveal key={service.name} delay={(i % 3) as 0 | 1 | 2 | 3}>
                <div className="bg-brand-bianco border border-brand-bordo rounded-2xl p-6">
                  <h3 className="heading-card text-brand-nero mb-2">{service.name}</h3>
                  <p className="text-brand-grigio mb-3">{service.description}</p>
                  {service.notes?.length ? (
                    <ul className="space-y-1">
                      {service.notes.map((note) => (
                        <li key={note} className="text-sm text-brand-nero flex gap-2">
                          <span className="text-brand-corallo">✦</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-bianco">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ Tabella comparativa</p>
            <h2 className="heading-section font-semibold text-brand-nero leading-tight">
              Senza Forge vs <span className="text-brand-corallo">Con Forge</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="bg-brand-panna border border-brand-bordo rounded-2xl p-7">
                <h3 className="text-lg font-semibold text-brand-grigio mb-5">Senza Forge Group</h3>
                <ul className="space-y-4">
                  {s.comparisonItems.map((item) => (
                    <li key={item.withoutForge} className="flex gap-3 text-brand-grigio">
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs mt-0.5">
                        ✕
                      </span>
                      <span>{item.withoutForge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="bg-brand-pesca-light border-2 border-brand-corallo rounded-2xl p-7">
                <h3 className="text-lg font-semibold text-brand-corallo mb-5">Con Forge Group</h3>
                <ul className="space-y-4">
                  {s.comparisonItems.map((item) => (
                    <li key={item.withForge} className="flex gap-3 text-brand-nero">
                      <span className="text-brand-corallo">✦</span>
                      <span>{item.withForge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-panna border-y border-brand-bordo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ Risultati attesi</p>
            <h2 className="heading-section text-brand-nero">
              KPI di <span className="text-brand-corallo">impatto</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {s.results.map((r, i) => (
              <Reveal key={r.label} delay={(i % 3) as 0 | 1 | 2 | 3}>
                <div className="bg-brand-bianco border border-brand-bordo rounded-2xl p-8 text-center">
                  <div className="text-5xl md:text-6xl font-semibold text-brand-corallo mb-2">{r.value}</div>
                  <p className="text-brand-grigio font-medium">{r.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-bianco">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ FAQ servizio</p>
          <h2 className="heading-section text-brand-nero mb-8">
            Domande frequenti su <span className="text-brand-corallo">{s.shortTitle}</span>
          </h2>
          <FAQAccordion items={s.faqs} />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-panna">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ Per chi è ideale</p>
          <ul className="space-y-3">
            {s.forWho.map((item) => (
              <li key={item} className="flex items-start gap-3 bg-brand-bianco border border-brand-bordo rounded-lg p-5">
                <span className="text-brand-corallo text-xl shrink-0">✦</span>
                <span className="text-lg text-brand-nero">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ALTRI SERVIZI */}
      <section className="py-16 md:py-24 bg-brand-bianco">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold md:text-4xl font-semibold text-brand-nero leading-tight mb-10">
            Gli altri <span className="text-brand-corallo">servizi</span> Forge.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/servizi/${other.slug}`}
                className="group bg-brand-panna border border-brand-bordo rounded-2xl p-6 hover:border-brand-corallo hover:shadow-lg transition-all"
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

      <CTASection
        title={
          <>
            Pronto a <span className="text-brand-corallo">implementare</span> questo sistema?
          </>
        }
        description="Compila il questionario di prequalifica. Se sei in target, fissiamo una call di scoperta entro 48 ore."
        primary={{ label: "HAI UN MINUTO?", href: "/contatti" }}
        secondary={{ label: "Vedi i casi studio", href: "/casi-studio" }}
      />
    </>
  );
}
