import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import HeroBento from "@/components/HeroBento";
import SectionHeader from "@/components/SectionHeader";
import FAQAccordion from "@/components/FAQAccordion";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import SocialProof from "@/components/SocialProof";
import CaseStudyCarousel from "@/components/CaseStudyCarousel";
import TeamSection from "@/components/TeamSection";
import MagneticCursor from "@/components/MagneticCursor";
import { getCaseStudyImage } from "@/data/images";

export const metadata: Metadata = {
  title: "Forge Group — Sistema di Crescita per Imprese B2B",
  description:
    "Aiutiamo imprese B2B ad acquisire clienti, organizzare le vendite e crescere in modo prevedibile. Dalle prime contatti al contratto firmato: un sistema completo.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* S1 — HERO */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 bg-brand-bianco">
        <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pesca-light/60 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-pesca/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Colonna sinistra — entrance on page load */}
            <div>
              <p className="hero-enter hero-enter-d1 inline-flex items-center gap-2 eyebrow mb-6 px-4 py-2 rounded-full border border-brand-bordo bg-brand-bianco">
                ✦ Sistema di Crescita B2B · Italia
              </p>
              <h1 className="hero-enter hero-enter-d2 heading-hero text-brand-nero mb-6">
                Portiamo la tua azienda{" "}
                <span className="text-brand-corallo">
                  dal disordine a un sistema prevedibile
                </span>{" "}
                di acquisizione e vendita.
              </h1>
              <div className="hero-enter hero-enter-d3 flex flex-col sm:flex-row items-start gap-3">
                <Link href="/contatti" className="btn-corallo">
                  Hai un minuto?
                </Link>
                <Link href="/casi-studio" className="btn-ghost">
                  Vedi i risultati
                </Link>
              </div>
            </div>

            {/* Colonna destra — doppio marquee verticale opposto */}
            <div className="hero-enter hero-enter-d3 w-full">
              <HeroBento />
            </div>
          </div>
        </div>
      </section>

      {/* S2 — RIPROVA SOCIALE (3 card, numeri count-up) */}
      <SocialProof />

      {/* S3 — VIDEO RECENSIONE */}
      <section id="recensione" className="py-20 md:py-28 bg-brand-bianco border-t border-brand-bordo scroll-mt-24">
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
              &ldquo;€126.500 generati in 90 giorni con una spesa media di €500/mese in advertising. Ci hanno costruito il sistema di vendita da zero.&rdquo;
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

            {/* Video embed */}
            <div className="rounded-2xl overflow-hidden border border-brand-bordo shadow-xl max-w-2xl mx-auto mb-10">
              <video
                controls
                preload="metadata"
                playsInline
                className="w-full block aspect-video"
              >
                <source src="/video-recensione.mov" type="video/quicktime" />
                <source src="/video-recensione.mov" type="video/mp4" />
                Il tuo browser non supporta il video.
              </video>
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
      <section className="py-20 md:py-28 bg-brand-panna">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Come Lavoriamo"
            title={
              <>
                Non facciamo gestione{" "}
                <span className="text-brand-corallo">social</span>.
              </>
            }
            subtitle="Costruiamo un sistema integrato che lavora in sequenza: porta clienti, qualificali, convertili, scala."
          />

          <div className="flex justify-center mb-12">
            <Link href="/servizi" className="btn-ghost">
              Vedi tutti i servizi
            </Link>
          </div>

          <MagneticCursor label="Scopri">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Acquisizione Clienti",
                body: "Campagne Meta e Google Ads, landing page, funnel e lead generation per portare contatti qualificati già filtrati prima ancora di parlare col tuo commerciale.",
                href: "/servizi/advertising-lead-generation",
                image: getCaseStudyImage("software-b2b"),
              },
              {
                title: "Vendite e Processi Commerciali",
                body: "Script di vendita, CRM, follow-up automatizzato, materiale commerciale e supporto al reparto vendite per convertire più lead in contratti firmati.",
                href: "/servizi/vendite-crm",
                image: getCaseStudyImage("edilizia"),
              },
              {
                title: "Consulenza e Crescita",
                body: "Strategia, report trimestrali, analisi KPI e affiancamento periodico per prendere decisioni corrette e scalare senza improvvisare.",
                href: "/servizi/strategia-crescita",
                image: getCaseStudyImage("hotel-hospitality"),
              },
            ].map((item, idx) => (
              <Reveal key={item.title} delay={idx}>
                <Link
                  href={item.href}
                  className="group bg-brand-bianco border border-brand-bordo rounded-3xl overflow-hidden hover:border-brand-corallo hover:shadow-xl transition-all flex flex-col h-full"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-nero/50 via-transparent to-transparent" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="heading-card text-brand-nero mb-3">{item.title}</h3>
                    <p className="text-brand-grigio leading-relaxed flex-grow text-sm">{item.body}</p>
                    <span className="inline-flex items-center gap-2 text-brand-corallo font-bold text-sm mt-6 group-hover:gap-3 transition-all">
                      Scopri come funziona
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          </MagneticCursor>
        </div>
      </section>

      {/* S5 — CASI STUDIO (carousel full-bleed) */}
      <section className="py-20 md:py-28 bg-brand-bianco overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Casi Studio"
            title={
              <>
                Risultati <span className="text-brand-corallo">reali</span>, non promesse.
              </>
            }
            subtitle="Tre settori diversi. Un sistema uguale. Numeri verificabili."
          />
          <div className="flex justify-center mt-8 mb-12">
            <Link href="/casi-studio" className="btn-ghost">
              Vedi tutti i casi studio
            </Link>
          </div>
        </div>
        {/* Full-bleed carousel — outside max-w constraint */}
        <CaseStudyCarousel />
      </section>

      {/* S6 — CONFRONTO (tabella comparativa unificata) */}
      <section className="py-20 md:py-28 bg-brand-panna">
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
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-brand-bordo">
                {/* Left — tradizionale */}
                <div className="p-8 md:p-10">
                  <h3 className="text-brand-grigio text-sm font-semibold uppercase tracking-wider mb-6">
                    Approccio tradizionale
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Ti vendono visibilità, non clienti",
                      "Nessuna integrazione con il tuo commerciale",
                      "Report con like e impression, non fatturato",
                      "Pacchetti uguali per tutti, senza strategia",
                      "Smettono di lavorare se smetti di pagare",
                    ].map((item) => (
                      <li key={item} className="group flex items-start gap-3 text-brand-grigio rounded-xl px-3 py-2 -mx-3 hover:bg-red-50/60 transition-colors duration-200">
                        <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold group-hover:scale-110 transition-transform">
                          ✕
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right — Forge Group */}
                <div className="p-8 md:p-10 bg-brand-pesca-light">
                  <h3 className="text-brand-corallo text-sm font-semibold uppercase tracking-wider mb-6">
                    Sistema Forge Group
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Costruiamo un sistema che porta clienti paganti",
                      "Lavoriamo dentro al tuo processo commerciale",
                      "KPI reali: ROAS, CAC, tasso di chiusura, LTV",
                      "Strategia su misura dopo analisi della tua azienda",
                      "Il sistema resta tuo anche dopo il progetto",
                    ].map((item) => (
                      <li key={item} className="group flex items-start gap-3 text-brand-nero rounded-xl px-3 py-2 -mx-3 hover:bg-brand-corallo/5 transition-colors duration-200">
                        <span className="w-6 h-6 rounded-full bg-brand-corallo/10 border border-brand-corallo/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-corallo/20 group-hover:scale-110 transition-all">
                          <svg className="w-3 h-3 text-brand-corallo" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* S7 — TEAM */}
      <TeamSection />

      {/* S8 — FAQ */}
      <section className="py-20 md:py-28 bg-brand-bianco">
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
