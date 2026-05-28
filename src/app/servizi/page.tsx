import Link from "next/link";
import type { Metadata } from "next";
import { services } from "@/data/services";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Servizi — Forge Group | Acquisizione, Vendite, Crescita B2B",
  description:
    "Dal lead all'acquisto: advertising, social, sito web, SEO, CRM, processi di vendita e consulenza strategica. Scopri come costruiamo il sistema di crescita per la tua azienda.",
  alternates: { canonical: "/servizi" },
};

export default function ServiziHub() {
  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ Come Lavoriamo</p>
          <h1 className="heading-hero font-semibold text-brand-nero leading-tight mb-6">
            Dal primo contatto{" "}
            <span className="text-brand-corallo">al contratto firmato</span>
          </h1>
          <p className="text-xl text-brand-grigio leading-relaxed">
            Non vendiamo servizi isolati. Costruiamo un sistema integrato di acquisizione clienti,
            vendita e crescita aziendale su misura della tua impresa.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-panna border-y border-brand-bordo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {services.map((s, idx) => (
              <Reveal key={s.slug} delay={(idx % 3) as 0 | 1 | 2 | 3}>
                <Link
                  href={`/servizi/${s.slug}`}
                  className="group bg-brand-bianco border border-brand-bordo rounded-3xl p-8 hover:border-brand-corallo hover:shadow-xl transition-all flex flex-col h-full"
                >
                  <div className="text-5xl font-semibold text-brand-pesca group-hover:text-brand-corallo transition-colors mb-4">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <h2 className="heading-card text-brand-nero mb-3">{s.title}</h2>
                  <p className="text-brand-grigio mb-6 leading-relaxed flex-grow">{s.tagline}</p>
                  <ul className="space-y-2 mb-6">
                    {s.subServices.slice(0, 3).map((sub) => (
                      <li key={sub.name} className="text-sm text-brand-nero flex items-start gap-2">
                        <span className="text-brand-corallo shrink-0">✦</span>
                        <span>{sub.name}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-brand-corallo font-bold text-sm group-hover:gap-3 transition-all mt-auto">
                    Scopri gruppo servizi
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-bianco">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Come Lavoriamo"
            title={
              <>
                Un <span className="text-brand-corallo">sistema unico</span>, cinque aree integrate.
              </>
            }
            subtitle="Ogni gruppo servizi contiene tabella comparativa, FAQ dedicate e azioni operative allineate al tuo obiettivo commerciale."
          />

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { n: "01", title: "Advertising & Lead Generation", desc: "Portiamo richieste qualificate dal mercato." },
              { n: "02", title: "Social & Content", desc: "Aumentiamo credibilità e costanza comunicativa." },
              { n: "03", title: "Presenza Digitale", desc: "Sito, SEO e LinkedIn allineati al posizionamento." },
              { n: "04", title: "Vendite & CRM", desc: "Ottimizziamo pipeline, conversione e controllo commerciale." },
              { n: "05", title: "Strategia & Crescita", desc: "Monitoraggio KPI e direzione trimestrale." },
            ].map((item) => (
              <div
                key={item.n}
                className="flex items-start gap-6 bg-brand-panna border border-brand-bordo rounded-xl p-6"
              >
                <div className="font-display text-5xl font-semibold text-brand-corallo shrink-0">{item.n}</div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-nero mb-2">{item.title}</h3>
                  <p className="text-brand-grigio">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={
          <>
            Vuoi capire <span className="text-brand-corallo">quale combinazione</span> serve alla tua azienda?
          </>
        }
        description="Compila la prequalifica: in base alle tue risposte ti diciamo da dove partire e con quale priorità."
        primary={{ label: "HAI UN MINUTO?", href: "/contatti" }}
      />
    </>
  );
}
