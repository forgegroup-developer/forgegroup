import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import HeroVideoRecensione from "@/components/HeroVideoRecensione";
import SectionHeader from "@/components/SectionHeader";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import SocialProof from "@/components/SocialProof";
import CaseStudyCarousel from "@/components/CaseStudyCarousel";
import TeamSection from "@/components/TeamSection";
import ServiceCard, { services } from "@/components/ServiceCard";

export const metadata: Metadata = {
  title: "Forge Group — Sistema di Crescita per Imprese B2B",
  description:
    "Aiutiamo imprese B2B ad acquisire clienti, organizzare le vendite e crescere in modo prevedibile. Dalle prime contatti al contratto firmato: un sistema completo.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* S1 — HERO full-viewport */}
      <section className="relative overflow-hidden min-h-[calc(100dvh-80px)] flex items-center">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-14 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-stretch">

            {/* Colonna sinistra — testo */}
            <div className="flex flex-col justify-center gap-6 lg:gap-8 py-4 lg:py-6">
              <p className="hero-enter hero-enter-d1 self-start inline-flex items-center gap-2 eyebrow text-sm md:text-base px-5 py-2.5 rounded-full border border-brand-bordo bg-brand-bianco/80 backdrop-blur-sm">
                ✦ La prima azienda di GROWTH HACKING in Italia!
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
                <Link href="/casi-studio" className="btn-ghost px-8 py-4 text-sm md:text-base">
                  Vedi i risultati
                </Link>
              </div>
              </div>
            </div>

            {/* Colonna destra — video recensione */}
            <div className="hero-enter hero-enter-d3 w-full flex flex-col justify-center">
              <HeroVideoRecensione />
            </div>

          </div>
        </div>
      </section>

      {/* S2 — RIPROVA SOCIALE (3 card, numeri count-up) */}
      <SocialProof />

      {/* S3 — VIDEO RECENSIONE */}
      <section id="recensione" className="py-20 md:py-28 bg-brand-bianco/70 backdrop-blur-sm border-t border-brand-bordo scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} className="w-6 h-6 text-brand-corallo" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.518-4.674z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-semibold text-brand-nero leading-tight max-w-3xl mx-auto mb-8" style={{ fontFamily: "var(--font-display)" }}>
              &ldquo;
              <span className="text-brand-corallo">126.500€ di fatturato</span>, non me lo aspettavo. Ero scettico all&apos;inizio:{" "}
              <span className="text-brand-corallo">questo metodo</span> per me{" "}
              <span className="text-brand-corallo">ha funzionato</span>.{" "}
              <span className="text-brand-corallo">Lo consiglio</span> a tutte le aziende che hanno un prodotto o un servizio e vogliono{" "}
              <span className="text-brand-corallo">crescere sul mercato</span>.
              &rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-brand-bordo bg-white flex items-center justify-center shrink-0">
                <Image
                  src="/images/logo-disa.png"
                  alt="DISA Appalti & Servizi"
                  width={56}
                  height={56}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="text-left">
                <p className="text-brand-nero font-semibold text-sm">DISA Software</p>
                <p className="text-brand-grigio text-xs">CEO & Founder · Software B2B</p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contatti" className="btn-corallo">
                Voglio risultati simili
              </Link>
              <Link href="/casi-studio/software-b2b" className="btn-ghost">
                Leggi il caso studio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* S4 — SERVIZI */}
      <section className="py-20 md:py-28 bg-brand-panna/75 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
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

      {/* S5 — CASI STUDIO (carousel full-bleed) */}
      <section className="py-20 md:py-28 bg-brand-bianco/70 backdrop-blur-sm overflow-hidden">
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
        {/* Full-bleed carousel — outside max-w constraint */}
        <CaseStudyCarousel />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 mt-10 md:mt-12">
            <Link href="/contatti" className="btn-corallo">
              Sono pronto per iniziare
            </Link>
            <Link href="/casi-studio" className="btn-ghost">
              Vedi tutti i casi studio
            </Link>
          </div>
        </div>
      </section>

      {/* S6 — CONFRONTO (tabella comparativa unificata) */}
      <section className="py-20 md:py-28 bg-brand-panna/75 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Perché Forge Group"
            title={
              <>
                Non siamo un&apos;agenzia.{" "}
                <span className="text-brand-corallo">Siamo il tuo reparto crescita.</span>
              </>
            }
          />
          <Reveal>
            <div className="max-w-5xl mx-auto rounded-3xl border border-brand-bordo overflow-hidden bg-brand-bianco shadow-lg">
              {/* Intestazioni colonne */}
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-brand-bordo">
                <div className="p-6 md:p-8 pb-4 md:pb-5 bg-red-50 border-b border-red-100">
                  <p className="text-[10px] uppercase tracking-widest text-red-600 font-bold mb-2 md:hidden">
                    ✕ Non funziona
                  </p>
                  <h3 className="text-red-800 text-base md:text-lg font-bold uppercase tracking-wider leading-snug">
                    Le aziende con le quali hai lavorato
                  </h3>
                </div>
                <div className="p-6 md:p-8 pb-4 md:pb-5 bg-emerald-50 border-b border-emerald-100">
                  <p className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold mb-2 md:hidden">
                    ✓ Funziona
                  </p>
                  <h3 className="text-emerald-800 text-base md:text-lg font-bold uppercase tracking-wider leading-snug">
                    Il nostro sistema Forge Group
                  </h3>
                </div>
              </div>

              {/* Righe allineate punto per punto */}
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
                  className={`grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-brand-bordo/80 ${
                    idx > 0 ? "border-t border-brand-bordo/80" : ""
                  }`}
                >
                  <div className="flex items-start gap-3 min-h-[4.5rem] px-6 md:px-8 py-4 bg-red-50/80 border-l-4 border-red-400 transition-colors hover:bg-red-50">
                    <span
                      className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-sm"
                      aria-hidden
                    >
                      ✕
                    </span>
                    <span className="text-sm md:text-base leading-snug text-red-950/90 font-medium pt-0.5">
                      {row.other}
                    </span>
                  </div>
                  <div className="flex items-start gap-3 min-h-[4.5rem] px-6 md:px-8 py-4 bg-emerald-50/90 border-l-4 border-emerald-500 transition-colors hover:bg-emerald-50">
                    <span
                      className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm"
                      aria-hidden
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm md:text-base leading-snug font-semibold text-emerald-950 pt-0.5">
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
      <section className="py-20 md:py-28 bg-brand-bianco/70 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Domande Frequenti"
            title={
              <>
                Quello che gli{" "}
                <span className="text-brand-corallo">imprenditori</span> ci chiedono sempre.
              </>
            }
          />
          <Reveal>
            <FAQAccordion />
          </Reveal>
        </div>
      </section>

      {/* S9 — CTA */}
      <CTASection
        eyebrow="Pronto a smettere di improvvisare?"
        title={
          <>
            Costruiamo insieme il tuo sistema.
            <br />
            <span className="text-brand-corallo">Parti dalla prequalifica.</span>
          </>
        }
        description="Accettiamo un numero limitato di partner ogni trimestre. Compila il questionario: se siamo allineati ti ricontattiamo entro 48 ore con un piano concreto."
        primary={{ label: "Hai un minuto?", href: "/contatti" }}
        secondary={{ label: "Vedi i casi studio", href: "/casi-studio" }}
      />
    </>
  );
}
