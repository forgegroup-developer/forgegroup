import Link from "next/link";
import type { Metadata } from "next";
import HeroGooeySection from "@/components/HeroGooeySection";
import HeroVideoRecensione from "@/components/HeroVideoRecensione";
import SectionHeader from "@/components/SectionHeader";
import FAQAccordion from "@/components/FAQAccordion";
import Reveal from "@/components/Reveal";
import ClientiLogos from "@/components/ClientiLogos";
import SocialProof from "@/components/SocialProof";
import LazyCaseStudyStack from "@/components/LazyCaseStudyStack";
import TeamSection from "@/components/TeamSection";
import ServiceCard, { services } from "@/components/ServiceCard";
import JsonLdFAQ from "@/components/JsonLdFAQ";

export const metadata: Metadata = {
  title: "Forge Group | Sistema di Crescita per Imprese B2B",
  description:
    "Aiutiamo imprese B2B ad acquisire clienti, organizzare le vendite e crescere in modo prevedibile. Dalle prime contatti al contratto firmato: un sistema completo.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Forge Group | Sistema di Crescita per Imprese B2B",
    description:
      "Aiutiamo imprese B2B ad acquisire clienti, organizzare le vendite e crescere in modo prevedibile.",
    url: "/",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge Group | Sistema di Crescita per Imprese B2B",
    description:
      "Aiutiamo imprese B2B ad acquisire clienti, organizzare le vendite e crescere in modo prevedibile.",
    images: ["/logo.png"],
  },
};

export default function Home() {
  return (
    <>
      <JsonLdFAQ />
      {/* S1 — HERO full-viewport */}
      <HeroGooeySection
        className="min-h-[calc(100dvh-80px)] flex items-center"
        innerClassName="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16"
      >
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-stretch">
              <div className="flex flex-col justify-center gap-6 lg:gap-8 py-4 lg:py-6">
                <p className="hero-enter hero-enter-d1 self-start inline-flex items-center gap-2 eyebrow text-sm md:text-base px-5 py-2.5 rounded-full border border-brand-bordo bg-brand-bianco/85 backdrop-blur-sm shadow-sm">
                  ✦ Vuoi aumentare il fatturato della tua azienda?
                </p>
                <div className="flex flex-col gap-4 lg:gap-5">
                  <h1 className="hero-enter hero-enter-d2 heading-hero text-brand-nero max-w-xl">
                    Portiamo la tua azienda{" "}
                    <span className="text-brand-corallo">
                      dal disordine a un sistema prevedibile
                    </span>{" "}
                    di acquisizione e vendita.
                  </h1>
                  <div className="hero-enter hero-enter-d3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                    <Link href="/contatti" className="btn-corallo px-8 py-4 text-sm md:text-base">
                      Hai un minuto?
                    </Link>
                    <Link href="/#casi-studio" className="btn-ghost px-8 py-4 text-sm md:text-base">
                      Vedi i risultati
                    </Link>
                  </div>
                </div>
              </div>

              <div className="hero-enter hero-enter-d3 w-full flex flex-col justify-center">
                <HeroVideoRecensione />
              </div>
            </div>
      </HeroGooeySection>

      {/* S2 — RIPROVA SOCIALE (3 card, numeri count-up) */}
      <SocialProof />

      {/* S2b — LOGHI CLIENTI */}
      <ClientiLogos />

      {/* S3 — SERVIZI */}
      <section className="py-20 md:py-28 section-coral border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            onCoral
            eyebrow="I Nostri Servizi"
            title={
              <>
                Ti affianchiamo nella{" "}
                <span className="text-brand-corallo">crescita della tua azienda</span>.
              </>
            }
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            {services.map((item, idx) => (
              <Reveal key={item.label} delay={idx}>
                <ServiceCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* S5 — CASI STUDIO (stacking cards on scroll) */}
      <section id="casi-studio" className="py-20 md:py-28 section-bianco scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Casi Studio"
            maxWidth="4xl"
            title={
              <>
                Risultati <span className="text-brand-corallo">verificati</span>. Sei pronto a diventare il{" "}
                <span className="text-brand-corallo">nostro prossimo caso studio</span>?
              </>
            }
          />
        </div>
        <LazyCaseStudyStack />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <Link href="/contatti" className="btn-corallo px-8 py-4 text-sm md:text-base text-center">
              Hai un minuto?
            </Link>
            <Link href="/casi-studio" className="btn-ghost px-8 py-4 text-sm md:text-base text-center">
              Vedi tutti i casi studio
            </Link>
          </div>
        </div>
      </section>

      {/* S6 — CONFRONTO (tabella comparativa unificata) */}
      <section className="py-20 md:py-28 section-coral border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            onCoral
            eyebrow="Perché Forge Group"
            title="Azienda di Growth Hacking Italia"
          />
          <Reveal>
            <div className="max-w-5xl mx-auto rounded-2xl border border-brand-bordo overflow-hidden bg-brand-bianco shadow-lg">
              {/* Intestazioni colonne — sempre 2 colonne anche su mobile */}
              <div className="grid grid-cols-2 divide-x divide-brand-bordo border-b border-brand-bordo">
                <div className="px-4 py-3 md:px-8 md:py-5 bg-red-50">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-red-600 font-bold mb-0.5">
                    ✕ Non funziona
                  </p>
                  <h3 className="text-xs md:text-base font-bold text-red-800 uppercase tracking-wide leading-snug">
                    Le altre aziende
                  </h3>
                </div>
                <div className="px-4 py-3 md:px-8 md:py-5 bg-emerald-50">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-emerald-700 font-bold mb-0.5">
                    ✓ Funziona
                  </p>
                  <h3 className="text-xs md:text-base font-bold text-emerald-800 uppercase tracking-wide leading-snug">
                    Forge Group
                  </h3>
                </div>
              </div>

              {/* Righe allineate — sempre 2 colonne */}
              {[
                {
                  other: "Ti vendono visibilità, non clienti",
                  forge: "Costruiamo un sistema che porta clienti paganti",
                },
                {
                  other: "Nessun contatto con i tuoi commerciali",
                  forge: "Lavoriamo e formiamo il tuo reparto commerciale",
                },
                {
                  other: "Ti presentano report di visualizzazioni e like ai post",
                  forge: "Dati misurabili, previsione di clienti e fatturato per i prossimi anni",
                },
                {
                  other: "Pacchetti uguali per tutti, senza strategia",
                  forge: "Strategia su misura in base al livello della tua azienda",
                },
                {
                  other: "Smettono di lavorare se smetti di pagare",
                  forge: "Creiamo un sistema che resta di tua proprietà",
                },
              ].map((row, idx) => (
                <div
                  key={row.other}
                  className={`grid grid-cols-2 divide-x divide-brand-bordo/60 ${idx > 0 ? "border-t border-brand-bordo/60" : ""}`}
                >
                  <div className="flex items-start gap-2 md:gap-3 px-3 md:px-8 py-3 md:py-4 bg-red-50/70 hover:bg-red-50 transition-colors">
                    <span
                      className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] md:text-xs font-bold shadow-sm"
                      aria-hidden
                    >
                      ✕
                    </span>
                    <span className="text-xs md:text-sm leading-snug text-red-950/85 font-medium pt-0.5">
                      {row.other}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3 px-3 md:px-8 py-3 md:py-4 bg-emerald-50/80 hover:bg-emerald-50 transition-colors">
                    <span
                      className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm"
                      aria-hidden
                    >
                      <svg className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-xs md:text-sm leading-snug font-semibold text-emerald-950 pt-0.5">
                      {row.forge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* S7 — TEAM */}
      <TeamSection />

      {/* S8 — FAQ */}
      <section id="faq" className="scroll-mt-24 py-20 md:py-28 section-coral border-y">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            onCoral
            eyebrow="Domande Frequenti"
            title={
              <>
                Quello che gli <span>imprenditori</span> ci chiedono sempre.
              </>
            }
          />
          <Reveal>
            <FAQAccordion onCoral />
          </Reveal>
        </div>
      </section>

    </>
  );
}
