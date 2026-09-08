import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroGooeySection from "@/components/sfondi/HeroGooeySection";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import CasiStudioCarousel from "@/components/casi-studio/CasiStudioCarousel";
import MetodoForge from "@/components/sezioni/MetodoForge";
import ConfrontoCaos from "@/components/sezioni/ConfrontoCaos";
import PercorsoDomande from "@/components/sezioni/PercorsoDomande";
import RegistroSintesi from "@/components/sezioni/RegistroSintesi";
import PercheSceglierci from "@/components/sezioni/PercheSceglierci";
import PerChiSiPerChiNo from "@/components/sezioni/PerChiSiPerChiNo";
import VideoScettico from "@/components/sezioni/VideoScettico";
import GaranziaTrasparenza from "@/components/sezioni/GaranziaTrasparenza";
import ServiceCard, { services } from "@/components/sezioni/ServiceCard";
import JsonLdFAQ from "@/components/ui/JsonLdFAQ";
import DeferredMount from "@/components/ui/DeferredMount";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/seo/site";

const Reveal = dynamic(() => import("@/components/ui/Reveal"));

const ClientiLogos = dynamic(() => import("@/components/sezioni/ClientiLogos"), {
  loading: () => <div className="min-h-[280px]" aria-hidden />,
});

const TeamSection = dynamic(() => import("@/components/sezioni/TeamSection"), {
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
      {/* S1 — HERO a due colonne.
          Testo a sinistra, i due fondatori a destra a tutta altezza.
          Il sito si apre su un telefono, su WhatsApp, subito dopo una
          chiamata a freddo: le prime due domande che si fa chi apre il
          link sono "cosa fate" e "chi siete". Cosi' stanno tutt'e due
          nello stesso schermo, senza dover scorrere.
          Il marchio non si ripete qui: sta gia' nell'intestazione. */}
      <HeroGooeySection
        muro
        className=""
        innerClassName="hero-split"
      >
        <div className="order-2 flex flex-col justify-center gap-5 px-5 py-12 sm:gap-6 sm:px-6 sm:py-14 lg:order-1 lg:justify-start lg:pb-0 lg:pl-8 lg:pr-14 lg:pt-20 xl:pl-16">
          <p className="hero-enter hero-enter-d1 eyebrow eyebrow-mark pillola-occhiello-corallo self-start rounded-full border px-5 py-2.5 text-xs sm:text-sm">
            Specializzati nell&apos;acquisizione clienti in edilizia
          </p>

          {/* L'H1 e' la promessa per intero, non uno slogan: dice chi
              portiamo, chi togliamo e fin dove restiamo. In corallo solo
              i due punti che il lettore deve portarsi via se legge
              soltanto quelli: che i clienti possono pagarlo, e che non
              lo lasciamo solo in trattativa. */}
          {/* Impianto preso dalla hero di Gasparotto: "Aumenta margini,
              utili aziendali e compensi personali grazie al controllo dei
              numeri." Verbo all'imperativo, tre benefici in fila di cui
              due marcati, poi "grazie al" e il nome del meccanismo. Il
              lettore sa in dieci parole cosa ottiene e con che cosa.
              La promessa per intero — chi portiamo, chi togliamo, fin dove
              restiamo — scende nella riga sotto, dove c'e' spazio per
              dirla senza spezzare il titolo. */}
          <h1 className="hero-enter hero-enter-d2 heading-display-frase text-pretty">
            Acquisisci clienti disposti a{" "}
            <span className="text-brand-corallo no-spezza">pagarti quanto chiedi</span>,
            chiudi più contratti e diventa{" "}
            <span className="text-brand-corallo no-spezza">il riferimento della tua zona</span>{" "}
            grazie al Metodo FORGE.
          </h1>

          <p className="hero-enter hero-enter-d3 text-pretty text-lg leading-relaxed text-brand-grigio sm:text-xl">
            Ti portiamo richieste da chi il lavoro può pagarlo, scartiamo chi
            tratta solo sul prezzo e restiamo in trattativa con te{" "}
            <strong className="font-semibold text-brand-nero">
              fino alla firma
            </strong>
            . Senza perdere i sabati con chi cerca solo un preventivo da
            confrontare, senza rincorrere nessuno e senza che tu debba
            diventare un esperto di pubblicità.
          </p>

          <p className="hero-enter hero-enter-d3 firma-fondatori">
            Il Metodo FORGE l&apos;abbiamo costruito noi due,{" "}
            <strong className="font-semibold text-brand-nero">
              Marco e Gianpio
            </strong>
            , su oltre ventimila contatti gestiti e partendo da imprese che
            oggi lavorano con un metodo, senza rincorrere i clienti.
          </p>

          {/* I due pulsanti si specchiano. Il segno dice dove porta il
              tasto prima ancora di leggerlo: freccia obliqua per la
              pagina dedicata, freccia in basso per il metodo, che sta
              piu' giu' in questa stessa pagina. */}
          <div className="hero-enter hero-enter-d3 mt-1 flex w-full flex-col items-stretch gap-3 sm:flex-row">
            <Link
              href="/contatti"
              className="btn-hero btn-hero-caldo btn-hero-sinistra flex-1 text-sm md:text-base"
            >
              <span>Voglio lo studio di fattibilità per la mia impresa</span>
              <span className="btn-hero-freccia" aria-hidden>
                ↗
              </span>
            </Link>
            <Link
              href="#metodo"
              className="btn-hero btn-hero-freddo btn-hero-destra flex-1 text-sm md:text-base"
            >
              <span>Prima voglio vedere il Metodo FORGE</span>
              <span className="btn-hero-freccia" aria-hidden>
                ↓
              </span>
            </Link>
          </div>

        </div>

        <div className="hero-foto order-1 lg:order-2">
          <div className="hero-foto-cornice">
            <Image
              src="/images/team/vision/founders-duo.png"
              alt="I due fondatori di Forge Group"
              fill
              priority
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
            {/* La firma sta sulla foto, non sotto: sotto era una riga
                grigia che nessuno legge. Il velo in basso e' li' apposta
                per reggerla. */}
            <p className="hero-foto-firma">
              <span aria-hidden>✳</span>
              I fondatori di Forge Group
            </p>
          </div>
        </div>

        {/* Il perimetro dei mestieri, con lo stesso asterisco
            dell'occhiello in cima: e' la nota a piede della promessa, e
            sta sotto entrambe le colonne perche' vale per tutta la hero. */}
        <p className="hero-enter hero-enter-d3 riga-mestieri order-3">
          <span className="riga-mestieri-asterisco" aria-hidden>
            ✳
          </span>
          Imprese edili, serramentisti, impiantisti, fotovoltaico, arredo
          commerciale, software per l&apos;edilizia e fornitori del settore.
        </p>

      </HeroGooeySection>

      {/* S2 — LOGHI CLIENTI */}
      <DeferredMount minHeight="280px">
        <ClientiLogos />
      </DeferredMount>

      {/* S2b — PERCHE' SCEGLIERE FORGE GROUP
          Il problema detto come elenco di abitudini, non come accusa.
          Sta qui perche' il lettore ha appena visto i numeri dei clienti
          e deve capire cosa lo separa da quei numeri. */}
      <DeferredMount minHeight="560px" rootMargin="320px 0px">
        <PercheSceglierci />
      </DeferredMount>

      {/* S3 — IL PERCORSO, IN QUATTRO DOMANDE
          Il corpo della lettera: dove si perde il lavoro, raccontato in
          ordine cronologico e sempre come domanda. La conclusione la tira
          lui: se gliela affermiamo noi, si difende. Le quattro scene sono
          quelle gia' testate al telefono nel playbook. */}
      <DeferredMount minHeight="900px" rootMargin="320px 0px">
        <PercorsoDomande />
      </DeferredMount>

      {/* S3b — IL REGISTRO DEI CONTATTI
          Risponde all'obiezione che ferma piu' trattative di ogni altra:
          "non so come lavorate davvero". Sta qui perche' la domanda nasce
          dopo il problema e prima del metodo. */}
      <DeferredMount minHeight="900px" rootMargin="320px 0px">
        <ConfrontoCaos />
      </DeferredMount>

      {/* S3c — IL REGISTRO, DETTO CORTO
          In revisione: in home il registro si nomina, non si spiega. Resta
          la frase che regge tutto — non aumentiamo solo le richieste, ti
          diamo anche come gestirle — con tre righe vere del registro. Il
          resto sta su /il-tuo-registro. */}
      <DeferredMount minHeight="620px" rootMargin="320px 0px">
        <RegistroSintesi />
      </DeferredMount>

      {/* S4 — METODO FORGE
          Era sepolto in /servizi: e' il metodo con nome proprio, l'asset che
          trasforma il servizio in un prodotto riconoscibile. Sta in home, su
          fondo notte, tra il "cosa facciamo" e la prova dei risultati. */}
      <DeferredMount minHeight="640px" rootMargin="320px 0px">
        <MetodoForge className="section-mattone" />
      </DeferredMount>

      {/* S5b — LA GARANZIA DI TRASPARENZA
          Il punto esatto in cui il lettore si chiede "si', ma come faccio
          a controllarvi". Il CRM e' l'unica risposta che dimostra invece
          di dichiarare. */}
      <DeferredMount minHeight="520px" rootMargin="320px 0px">
        <GaranziaTrasparenza />
      </DeferredMount>

      {/* S6 — SERVIZI
          Stavano prima del metodo: si elencava cosa facciamo a un lettore
          che non sapeva ancora perche' gli servisse, e si spezzava in due
          il blocco del problema. Qui arrivano dopo che il metodo ha un
          nome, e diventano "cosa c'e' dentro". */}
      <section className="py-20 md:py-28 section-sabbia border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Cosa facciamo per te"
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
            <Link href="/servizi" className="btn-ghost">
              Vedi il Metodo FORGE, i 5 step
            </Link>
          </div>
        </div>
      </section>


      {/* S7 — CONFRONTO (tabella comparativa unificata) */}
      <DeferredMount minHeight="480px">
      <section className="py-20 md:py-28 section-bianco border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Il confronto"
            title={
              <>
                Dove si ferma un&apos;agenzia.{" "}
                <span className="text-brand-corallo-text">Dove arriviamo noi.</span>
              </>
            }
          />
          <Reveal>
            <div className="max-w-5xl mx-auto rounded-2xl border border-brand-bordo overflow-hidden bg-brand-bianco shadow-lg">
              {/* Intestazioni colonne — sempre 2 colonne anche su mobile */}
              <div className="grid grid-cols-2 divide-x divide-brand-bordo border-b border-brand-bordo">
                <div className="px-4 py-3 md:px-8 md:py-5 bg-brand-panna">
                  <p className="text-xs md:text-base font-bold text-brand-corallo-text uppercase tracking-wide leading-snug">
                    L&apos;agenzia che ti consegna il contatto
                  </p>
                </div>
                <div className="px-4 py-3 md:px-8 md:py-5 bg-[color-mix(in_srgb,#1f7a5c_10%,#ffffff)]">
                  <p className="text-xs md:text-base font-bold text-[#155c45] uppercase tracking-wide leading-snug">
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
                  forge: "Si contano i contratti firmati e il margine che lasciano",
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
                  <div className="flex items-start gap-2 md:gap-3 px-3 md:px-8 py-3 md:py-4 bg-brand-panna/70 hover:bg-brand-panna transition-colors">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-corallo"
                      aria-hidden
                    />
                    <span className="text-xs md:text-sm leading-snug text-brand-grigio font-medium pt-0.5">
                      {row.other}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 md:gap-3 px-3 md:px-8 py-3 md:py-4 bg-[color-mix(in_srgb,#1f7a5c_8%,#ffffff)] hover:bg-[color-mix(in_srgb,#1f7a5c_14%,#ffffff)] transition-colors">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1f7a5c]"
                      aria-hidden
                    />
                    <span className="text-xs md:text-sm leading-snug font-semibold text-brand-nero pt-0.5">
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

      {/* S5 — CASI STUDIO, uno alla volta */}
      <DeferredMount minHeight="720px" rootMargin="320px 0px">
        <CasiStudioCarousel />
      </DeferredMount>

      {/* S6b — PER CHI E' SCETTICO
          Quattro imprenditori su quattro, nelle conoscitive, avevano gia'
          provato con un'agenzia. Qui non si argomenta: parla uno che era
          nella stessa posizione, e la sua prima frase e' "ero scettico". */}
      <DeferredMount minHeight="560px" rootMargin="320px 0px">
        <VideoScettico />
      </DeferredMount>

      {/* S7 — TEAM */}
      <DeferredMount minHeight="480px" rootMargin="320px 0px">
        <TeamSection />
      </DeferredMount>

      {/* S8 — FAQ */}
      <DeferredMount minHeight="360px">
      <section id="faq" className="scroll-mt-24 py-20 md:py-28 section-mattone">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Domande Frequenti"
            title={
              <>
                Quello che gli{" "}
                <span className="text-brand-corallo-text">imprenditori edili</span>{" "}
                ci chiedono sempre.
              </>
            }
          />
          <Reveal>
            <FAQAccordion onCoral />
          </Reveal>
        </div>
      </section>
      </DeferredMount>


      {/* S9 — IL FILTRO
          Chiude la pagina qualificando invece di chiedere: chi si
          riconosce a destra non ci fa perdere una conoscitiva, chi si
          riconosce a sinistra scrive gia' convinto. */}
      <DeferredMount minHeight="620px">
        <PerChiSiPerChiNo />
      </DeferredMount>

    </>
  );
}
