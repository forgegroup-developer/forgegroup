import Link from "next/link";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroGooeySection from "@/components/HeroGooeySection";
import HeroVideoRecensione from "@/components/HeroVideoRecensione";
import SectionHeader from "@/components/SectionHeader";
import FAQAccordion from "@/components/FAQAccordion";
import LazyCaseStudyStack from "@/components/LazyCaseStudyStack";
import ServiceCard, { services } from "@/components/ServiceCard";
import JsonLdFAQ from "@/components/JsonLdFAQ";
import ClientSceneEffects from "@/components/ClientSceneEffects";
import DeferredMount from "@/components/DeferredMount";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/seo/site";

const Reveal = dynamic(() => import("@/components/Reveal"));

const ClientiLogos = dynamic(() => import("@/components/ClientiLogos"), {
  loading: () => <div className="min-h-[280px]" aria-hidden />,
});

const TeamSection = dynamic(() => import("@/components/TeamSection"), {
  loading: () => <div className="min-h-[480px]" aria-hidden />,
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/logo.png"],
  },
};

export default function Home() {
  return (
    <>
      <JsonLdFAQ />
      {/* S1 — HERO full-viewport */}
      <HeroGooeySection
        className="lg:min-h-[calc(100dvh-80px)] lg:flex lg:items-center"
        innerClassName="w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16"
      >
        <div className="flex flex-col gap-10 sm:gap-12 lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 lg:items-stretch">
          {/* Mobile: titolo e CTA per primi (ordine DOM); desktop: colonna sinistra */}
          <div className="flex flex-col justify-center gap-7 sm:gap-8 py-2 sm:py-4 lg:py-6 w-full min-w-0">
            <p className="hero-enter hero-enter-d1 self-center lg:self-start inline-flex items-center gap-2 eyebrow text-xs sm:text-sm md:text-base px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-brand-bordo bg-brand-bianco/85 backdrop-blur-sm shadow-sm text-center max-w-full text-balance">
              ✦ Vuoi aumentare il fatturato della tua azienda?
            </p>
            <div className="flex flex-col gap-5 sm:gap-6 lg:gap-5 w-full min-w-0">
              <h1 className="hero-enter hero-enter-d2 heading-hero heading-hero-home text-brand-nero max-w-xl mx-auto lg:mx-0 text-center lg:text-left text-balance">
                Portiamo la tua azienda{" "}
                <span className="text-brand-corallo">
                  verso un sistema prevedibile
                </span>{" "}
                di acquisizione e vendita.
              </h1>
              <div className="hero-enter hero-enter-d3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto max-w-sm sm:max-w-none mx-auto lg:mx-0">
                <Link href="/contatti" className="btn-corallo px-8 py-4 text-sm md:text-base text-center">
                  Hai un minuto?
                </Link>
                <Link href="/casi-studio" className="btn-ghost px-8 py-4 text-sm md:text-base text-center">
                  Vedi i risultati
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile: video recensione sotto titolo e CTA; desktop: colonna destra */}
          <div className="w-full min-w-0 flex flex-col justify-center lg:mt-0">
            <HeroVideoRecensione />
          </div>
        </div>
      </HeroGooeySection>

      <ClientSceneEffects />

      {/* S2 — LOGHI CLIENTI */}
      <DeferredMount minHeight="280px">
        <ClientiLogos />
      </DeferredMount>

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

          <div className="mt-10 flex justify-center">
            <Link href="/servizi" className="btn-ghost px-8 py-4 text-sm md:text-base">
              Scopri tutti i servizi B2B
            </Link>
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
                Risultati <span className="text-brand-corallo">verificati</span> in casi reali.{" "}
                <span className="text-brand-corallo">Vuoi capire se un percorso simile ha senso per la tua azienda?</span>
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
      <DeferredMount minHeight="480px">
      <section className="py-20 md:py-28 section-coral border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            onCoral
            eyebrow="Perché Forge Group"
            title={
              <>
                Acquisizione Clienti B2B &{" "}
                <span className="text-brand-corallo">Growth Hacking Italia</span>
              </>
            }
          />
          <Reveal>
            <div className="max-w-5xl mx-auto rounded-2xl border border-brand-bordo overflow-hidden bg-brand-bianco shadow-lg">
              {/* Intestazioni colonne — sempre 2 colonne anche su mobile */}
              <div className="grid grid-cols-2 divide-x divide-brand-bordo border-b border-brand-bordo">
                <div className="px-4 py-3 md:px-8 md:py-5 bg-red-50">
                  <p className="text-xs md:text-base font-bold text-red-800 uppercase tracking-wide leading-snug">
                    Cosa succede spesso
                  </p>
                </div>
                <div className="px-4 py-3 md:px-8 md:py-5 bg-emerald-50">
                  <p className="text-xs md:text-base font-bold text-emerald-800 uppercase tracking-wide leading-snug">
                    Come lavoriamo noi
                  </p>
                </div>
              </div>

              {/* Righe allineate — sempre 2 colonne */}
              {[
                {
                  other: "Spesso il focus resta su reach e like, non sui contratti",
                  forge: "Costruiamo con te un sistema orientato a clienti paganti",
                },
                {
                  other: "Poco coinvolgimento del reparto commerciale",
                  forge: "Lavoriamo e formiamo con te il reparto commerciale",
                },
                {
                  other: "Report su visualizzazioni e metriche di vanità",
                  forge: "Dati misurabili su contatti, clienti e fatturato",
                },
                {
                  other: "Pacchetti standard, poca personalizzazione",
                  forge: "Strategia su misura in base al livello della tua azienda",
                },
                {
                  other: "Dipendenza continua dal fornitore esterno",
                  forge: "Creiamo con te un sistema che resta di tua proprietà",
                },
              ].map((row, idx) => (
                <div
                  key={row.other}
                  className={`grid grid-cols-2 divide-x divide-brand-bordo/60 ${idx > 0 ? "border-t border-brand-bordo/60" : ""}`}
                >
                  <div className="flex items-start gap-2 md:gap-3 px-3 md:px-8 py-3 md:py-4 bg-red-50/70 hover:bg-red-50 transition-colors">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/80"
                      aria-hidden
                    />
                    <span className="text-xs md:text-sm leading-snug text-red-950/85 font-medium pt-0.5">
                      {row.other}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3 px-3 md:px-8 py-3 md:py-4 bg-emerald-50/80 hover:bg-emerald-50 transition-colors">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600/80"
                      aria-hidden
                    />
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
      </DeferredMount>

      {/* S7 — TEAM */}
      <DeferredMount minHeight="480px" rootMargin="320px 0px">
        <TeamSection />
      </DeferredMount>

      {/* S8 — FAQ */}
      <DeferredMount minHeight="360px">
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
      </DeferredMount>

    </>
  );
}
