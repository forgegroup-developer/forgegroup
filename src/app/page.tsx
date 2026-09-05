import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroGooeySection from "@/components/HeroGooeySection";
import SectionHeader from "@/components/SectionHeader";
import FAQAccordion from "@/components/FAQAccordion";
import LazyCaseStudyStack from "@/components/LazyCaseStudyStack";
import MetodoForge from "@/components/MetodoForge";
import PercorsoDomande from "@/components/PercorsoDomande";
import RegistroContatti from "@/components/RegistroContatti";
import ServiceCard, { services } from "@/components/ServiceCard";
import JsonLdFAQ from "@/components/JsonLdFAQ";
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
      {/* S1 — HERO ampia, centrata.
          Impianto a tutta larghezza: il claim al centro e due pulsanti,
          uno caldo e uno freddo. Lo sfondo e' predisposto per ricevere una
          fotografia: basta passare --foto-hero alla sezione e il muro
          disegnato lascia il posto allo scatto, velo e sfumatura compresi. */}
      <HeroGooeySection
        muro
        scura
        className="lg:min-h-[calc(100dvh-80px)] lg:flex lg:items-center"
        innerClassName="w-full max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-12 sm:py-14"
      >
        <div className="flex flex-col items-center gap-5 text-center sm:gap-6">
          <Image
            src="/logo-bianco.png"
            alt="Forge Group"
            width={140}
            height={140}
            priority
            className="hero-enter hero-enter-d1 h-14 w-auto sm:h-16"
          />

          <p className="hero-enter hero-enter-d1 eyebrow eyebrow-mark pillola-occhiello rounded-full border border-brand-bordo bg-brand-bianco/85 px-5 py-2.5 text-xs shadow-sm backdrop-blur-sm sm:text-sm">
            Specializzati nell&apos;acquisizione clienti in edilizia
          </p>

          {/* Il claim in tre mosse: clienti che pagano il tuo prezzo — via
              chi tratta solo sul prezzo — diventi il riferimento della zona.
              Il prezzo in prima riga perche' e' la ferita vera: chi fa questo
              mestiere al Sud non perde i lavori, li perde a ribasso. */}
          {/* L'H1 e' la promessa per intero, non uno slogan: e' lunga
              apposta, perche' in tre righe dice tutto il perimetro del
              servizio — chi portiamo, chi togliamo, e fin dove restiamo.
              Scala ridotta rispetto al display pieno: una frase di venti
              parole a 3rem diventa un muro. */}
          <h1 className="hero-enter hero-enter-d2 heading-display-frase max-w-4xl text-balance">
            Ti portiamo clienti che possono permettersi il tuo lavoro,
            scartiamo chi tratta solo sul prezzo e restiamo in trattativa con te{" "}
            <span className="text-brand-corallo-text">fino alla firma.</span>
          </h1>

          <p className="hero-enter hero-enter-d3 max-w-2xl text-balance text-lg leading-relaxed text-brand-grigio sm:text-xl">
            Chiudi più contratti al prezzo che chiedi tu, senza perdere i sabati
            con chi cerca solo un preventivo da confrontare.
          </p>

          <p className="hero-enter hero-enter-d3 max-w-2xl text-balance text-base leading-relaxed text-brand-nero sm:text-lg">
            È il metodo{" "}
            <strong className="font-semibold">Dal Contatto alla Firma</strong>:
            quello che ti fa diventare il nome che fanno nella tua zona.
          </p>

          <div className="hero-enter hero-enter-d3 mt-2 flex w-full max-w-2xl flex-col items-stretch gap-4 sm:flex-row sm:justify-center">
            <Link href="/contatti" className="btn-hero btn-hero-caldo flex-1 text-sm md:text-base">
              <span>Sì, voglio lo studio di fattibilità per la mia impresa</span>
              <span className="btn-hero-freccia" aria-hidden>
                →
              </span>
            </Link>
            <Link href="#metodo" className="btn-hero btn-hero-freddo flex-1 text-sm md:text-base">
              <span>Voglio prima conoscere il metodo Dal Contatto alla Firma</span>
              <span className="btn-hero-freccia" aria-hidden>
                ↓
              </span>
            </Link>
          </div>

          <p className="hero-enter hero-enter-d3 max-w-2xl text-sm text-brand-grigio">
            Imprese edili, serramentisti, impiantisti, fotovoltaico, arredo
            commerciale e fornitori del settore.
          </p>
        </div>
      </HeroGooeySection>

      {/* S1a — LA GARANZIA DI TRASPARENZA
          Esce dalla hero e diventa una fascia sotto: e' la prima obiezione
          che il lettore porta con se', e va letta subito dopo il claim. */}
      <section className="section-bianco border-b py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
          <p className="eyebrow eyebrow-mark mb-8 flex justify-center">
            La garanzia di trasparenza
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {[
              {
                t: "Sai dove finiscono i tuoi soldi",
                d: "Quanto va in pubblicità e quanto a noi, separato. Ogni mese.",
              },
              {
                t: "Non parli con dieci persone diverse",
                d: "Hai i tuoi consulenti dedicati, sempre gli stessi.",
              },
              {
                t: "Prima di partire sai se ha senso",
                d: "Si comincia da uno studio di fattibilità. A volte la risposta è no, e te la diciamo.",
              },
              {
                t: "Formazione per te e per chi lavora con te",
                d: "Consulenza e percorsi per il titolare e per chi sta in trattativa.",
              },
            ].map((g) => (
              <div key={g.t} className="border-t-2 border-brand-corallo pt-5">
                <p className="font-display font-bold leading-snug text-brand-nero">
                  {g.t}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-brand-grigio">{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S1b — IL PERCORSO: le quattro domande legate dal filo */}
      <PercorsoDomande />

      {/* S2 — LOGHI CLIENTI */}
      <DeferredMount minHeight="280px">
        <ClientiLogos />
      </DeferredMount>

      {/* S3 — SERVIZI */}
      <section className="py-20 md:py-28 section-bianco border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Cosa facciamo"
            title={
              <>
                Ti affianchiamo dal primo contatto{" "}
                <span className="text-brand-corallo-text">alla firma del contratto</span>.
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
              Scopri come lavoriamo
            </Link>
          </div>
        </div>
      </section>

      {/* S3b — IL REGISTRO DEI CONTATTI
          Risponde all'obiezione che ferma piu' trattative di ogni altra:
          "non so come lavorate davvero". Sta qui perche' la domanda nasce
          dopo il problema e prima del metodo. */}
      <DeferredMount minHeight="900px" rootMargin="320px 0px">
        <RegistroContatti />
      </DeferredMount>

      {/* S4 — METODO FORGE
          Era sepolto in /servizi: e' il metodo con nome proprio, l'asset che
          trasforma il servizio in un prodotto riconoscibile. Sta in home, su
          fondo notte, tra il "cosa facciamo" e la prova dei risultati. */}
      <DeferredMount minHeight="640px" rootMargin="320px 0px">
        <MetodoForge className="section-coral" />
      </DeferredMount>

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
              Voglio il check-up della mia provincia
            </Link>
            <Link href="/casi-studio" className="btn-ghost px-8 py-4 text-sm md:text-base text-center">
              Vedi tutti i casi studio
            </Link>
          </div>
        </div>
      </section>

      {/* S6 — CONFRONTO (tabella comparativa unificata) */}
      <DeferredMount minHeight="480px">
      <section className="py-20 md:py-28 section-sabbia border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Il confronto"
            title={
              <>
                Dove si ferma un'agenzia.{" "}
                <span className="text-brand-corallo-text">Dove arriviamo noi.</span>
              </>
            }
          />
          <Reveal>
            <div className="max-w-5xl mx-auto rounded-2xl border border-brand-bordo overflow-hidden bg-brand-bianco shadow-lg">
              {/* Intestazioni colonne — sempre 2 colonne anche su mobile */}
              <div className="grid grid-cols-2 divide-x divide-brand-bordo border-b border-brand-bordo">
                <div className="px-4 py-3 md:px-8 md:py-5 bg-red-50">
                  <p className="text-xs md:text-base font-bold text-red-800 uppercase tracking-wide leading-snug">
                    L'agenzia che ti consegna il contatto
                  </p>
                </div>
                <div className="px-4 py-3 md:px-8 md:py-5 bg-emerald-50">
                  <p className="text-xs md:text-base font-bold text-emerald-800 uppercase tracking-wide leading-snug">
                    Forge Group
                  </p>
                </div>
              </div>

              {/* Righe allineate — sempre 2 colonne */}
              {[
                {
                  other: "Ti consegna il contatto e il suo lavoro finisce lì",
                  forge: "Restiamo dentro fino alla firma del contratto",
                },
                {
                  other: "Ti manda chiunque abbia lasciato un numero",
                  forge: "Filtriamo prima del sopralluogo: chi non può comprare non ci arriva",
                },
                {
                  other: "Il preventivo mandato è affare tuo",
                  forge: "Prepariamo la trattativa e ti addestriamo a chiuderla",
                },
                {
                  other: "Report su visualizzazioni, clic e copertura",
                  forge: "Si contano i cantieri firmati e il margine che lasciano",
                },
                {
                  other: "Non ha mai visto un cantiere del tuo settore",
                  forge: "In cantiere ci veniamo, e in edilizia abbiamo numeri veri",
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
