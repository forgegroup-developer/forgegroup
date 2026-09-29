import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroGooeySection from "@/components/sfondi/HeroGooeySection";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { faqsPagina } from "@/data/site";
import CasiStudioCarousel from "@/components/casi-studio/CasiStudioCarousel";
import MetodoForge from "@/components/sezioni/MetodoForge";
import ClientiLogos from "@/components/sezioni/ClientiLogos";
import ConfrontoCaos from "@/components/sezioni/ConfrontoCaos";
import PercheSceglierci from "@/components/sezioni/PercheSceglierci";
import PerChiSiPerChiNo from "@/components/sezioni/PerChiSiPerChiNo";
import VideoScettico from "@/components/sezioni/VideoScettico";
import RecensioniGoogle from "@/components/sezioni/RecensioniGoogle";
import Gestionale from "@/components/blocchi/Gestionale";
import ServiceCard, { services } from "@/components/sezioni/ServiceCard";
import JsonLdFAQ from "@/components/ui/JsonLdFAQ";
import DeferredMount from "@/components/ui/DeferredMount";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/seo/site";
import { CONTENITORE, SEZIONE, STRETTO } from "@/components/blocchi/ui";

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

/** Il confronto: i problemi della Testa aziendale §3, con le parole dei titolari. */
const confronto = [
  {
    tema: "Sopralluoghi regalati",
    problema: "Gli faccio sopralluogo e progetto, e poi sceglie un altro",
    soluzione:
      "Il modulo chiede tipo di lavoro, tempi, budget e zona prima che la richiesta ti arrivi: il sopralluogo lo fissi solo quando vale il viaggio.",
  },
  {
    tema: "Il preventivo e poi il silenzio",
    problema: "Dopo il ci devo pensare non si è più fatto sentire",
    soluzione:
      "Nel gestionale ogni preventivo ha una data per richiamare, e ogni settimana passiamo con te le trattative aperte una per una.",
  },
  {
    tema: "La guerra dei prezzi",
    problema: "Per 500 euro in meno ha scelto l'altra azienda",
    soluzione:
      "Al posto del solito preventivo costruiamo con te il piano dei lavori e il materiale per presentarlo: il cliente vede cosa compra prima del totale.",
  },
  {
    tema: "L'agenzia di prima",
    problema: "Ho pagato, ma i contatti non erano nemmeno lavorabili",
    soluzione:
      "Il filtro lo mettiamo noi, e nel gestionale vedi contratto per contratto quanto ti rende ogni euro. Dopo 60 giorni rivediamo le stime sui dati veri.",
  },
  {
    tema: "I mesi morti",
    problema: "In quelli morti aspetto che squilli il telefono",
    soluzione:
      "Le campagne su Meta e Google le gestiamo noi, con i video girati nei tuoi cantieri: lavorano anche quando il passaparola si ferma.",
  },
  {
    tema: "La paura di vendere",
    problema: "Non richiamo per non sembrare insistente",
    soluzione:
      "Le parole per richiamare le scriviamo insieme, così chi risponde al telefono sa cosa dire e quando dire la cifra.",
  },
  {
    tema: "Il titolare dentro il cantiere",
    problema: "Dalle 8 alle 20 sto in cantiere, e il resto lo faccio io",
    soluzione:
      "Il processo di vendita lo mettiamo per iscritto, così può seguirlo anche chi risponde al telefono. Tu guardi i numeri, anche dal cantiere.",
  },
  {
    tema: "I soldi che non entrano",
    problema: "Il lavoro l'ho finito, ma i soldi non arrivano",
    soluzione:
      "Nel processo di vendita come e quando ti pagano si decide prima di iniziare, per iscritto: acconto, saldo, bonifico.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLdFAQ items={faqsPagina("home")} />
      {/* S1 — HERO a due colonne.
          Testo a sinistra, i due fondatori a destra a tutta altezza.
          Da telefono prima il testo e poi la foto: chi apre il link deve
          sapere cosa facciamo prima di vedere chi siamo. Con la foto in
          cima il titolo cominciava a meta' schermo e i pulsanti finivano
          sotto la piega (misurato il 21 settembre 2026, scelta della
          proprieta').
          La hero sta nello stesso contenitore del menu: a tutta larghezza
          il testo partiva 280px piu' a sinistra del logo e il paragrafo
          arrivava a 103 caratteri per riga.
          Il marchio non si ripete qui: sta gia' nell'intestazione. */}
      <HeroGooeySection
        pulita
        className=""
        innerClassName="hero-split mx-auto max-w-7xl"
      >
        <div className="order-1 flex flex-col justify-center gap-5 px-4 pb-8 pt-12 sm:gap-6 sm:px-6 sm:pt-14 lg:justify-start lg:pb-0 lg:pl-8 lg:pr-14 lg:pt-20">
          <p className="hero-enter hero-enter-d1 eyebrow eyebrow-mark pillola-occhiello-corallo self-start rounded-full border px-5 py-2.5 text-xs sm:text-sm">
            Specializzati nelle richieste di lavoro per imprese edili
          </p>

          {/* La USP intera, approvata dalla proprieta' (28/09, "gestionale"
              al posto di "CRM" dal 29/09), in due frasi complete: nel titolo
              chi, cosa riceve e in quanto tempo lo vede; nel sottotitolo come
              e senza cosa. Spezzata a meta' frase si leggeva mezza grande e
              mezza piccola (proprieta', 29/09). */}
          <h1 className="hero-enter hero-enter-d2 heading-display-frase text-pretty">
            Aiutiamo gli imprenditori edili che vivono di passaparola a ricevere{" "}
            <span className="text-brand-corallo">richieste di lavoro</span>{" "}
            {/* l'ultima parola resta attaccata alla virgola: niente virgola
                sola a inizio riga */}
            <span className="whitespace-nowrap">
              <span className="text-brand-corallo">qualificate</span>,
            </span>{" "}
            con i numeri nero su bianco in 90 giorni.
          </h1>

          <p className="hero-enter hero-enter-d3 max-w-xl text-pretty text-lg leading-relaxed text-brand-grigio">
            Lo facciamo con un processo di vendita strutturato e un gestionale
            che ti mostra{" "}
            <strong className="font-semibold text-brand-nero">
              quanto rende ogni euro di pubblicità
            </strong>
            : senza più regalare sopralluoghi a chi cerca solo il prezzo più
            basso, e senza pagare più agenzie generaliste.
          </p>

          <p className="hero-enter hero-enter-d3 firma-fondatori">
            Il Metodo FORGE l&apos;abbiamo costruito noi due,{" "}
            <strong className="font-semibold text-brand-nero">
              Marco e Gianpio
            </strong>
            , dopo aver analizzato sul campo i processi di centinaia di imprese
            edili.
          </p>

          {/* Due pulsanti larghi quanto il loro testo: prima erano due
              lastre da 505x84 quasi uguali, e l'occhio non capiva quale
              fosse quello da premere. Il segno dice dove porta il tasto
              prima ancora di leggerlo: freccia obliqua per la pagina
              dedicata, freccia in basso per il metodo, piu' giu' in questa
              stessa pagina. */}
          <div className="hero-enter hero-enter-d3 mt-1 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/contatti"
              className="btn-hero btn-hero-compatto btn-hero-caldo text-base"
            >
              <span>Richiedi lo studio di fattibilità</span>
              <span className="btn-hero-freccia" aria-hidden>
                ↗
              </span>
            </Link>
            <Link
              href="#metodo"
              className="btn-hero btn-hero-compatto btn-hero-freddo text-base"
            >
              <span>Guarda il Metodo FORGE</span>
              <span className="btn-hero-freccia" aria-hidden>
                ↓
              </span>
            </Link>
          </div>
        </div>

        <div className="hero-foto order-2">
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
              <span aria-hidden>✳</span>I fondatori di Forge Group
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
      {/* Dalla hero al Metodo le sezioni si montano subito, non in
          DeferredMount. Sono solo testo e immagini, senza JavaScript loro:
          rimandarle non faceva risparmiare niente. In compenso partivano
          da segnaposti piu' bassi del vero (280 contro 667, 560 contro 819,
          900 contro 1387 px) e crescevano di oltre 1.100px mentre il
          pulsante "Guarda il Metodo FORGE" faceva scorrere la pagina: si
          arrivava su "Gestione" invece che sul titolo. */}
      <ClientiLogos />

      {/* S2b — PERCHE' SCEGLIERE FORGE GROUP
          Il problema detto come elenco di abitudini, non come accusa.
          Sta qui perche' il lettore ha appena visto i numeri dei clienti
          e deve capire cosa lo separa da quei numeri. */}
      <PercheSceglierci />

      {/* S3b — IL REGISTRO DEI CONTATTI
          Risponde all'obiezione che ferma piu' trattative di ogni altra:
          "non so come lavorate davvero". Sta qui perche' la domanda nasce
          dopo il problema e prima del metodo. */}
      <ConfrontoCaos />

      {/* S4 — METODO FORGE
          Era sepolto in /servizi: e' il metodo con nome proprio, l'asset che
          trasforma il servizio in un prodotto riconoscibile. Sta in home, su
          fondo notte, tra il "cosa facciamo" e la prova dei risultati.
          Montato subito, non in DeferredMount: dentro quello #metodo non
          esisteva finche' non ci si scorreva vicino, quindi il pulsante
          "Guarda il Metodo FORGE" della hero non portava da nessuna parte,
          la sezione compariva a scatti e il server mandava a Google un
          riquadro vuoto. E' solo testo, montarlo subito non costa niente. */}
      <MetodoForge className="section-mattone" />

      {/* S5b — IL GESTIONALE
          Al posto di "Cosa vedi tu, e quando" (proprieta', 29/09): il punto
          in cui il lettore si chiede "come faccio a controllarvi" riceve la
          risposta concreta, con il gestionale della landing. */}
      <Gestionale />

      {/* S6 — SERVIZI
          Stavano prima del metodo: si elencava cosa facciamo a un lettore
          che non sapeva ancora perche' gli servisse, e si spezzava in due
          il blocco del problema. Qui arrivano dopo che il metodo ha un
          nome, e diventano "cosa c'e' dentro". */}
      <section className={`section-mattone ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <SectionHeader
            eyebrow="Cosa facciamo per te"
            title={
              <>
                Ti affianchiamo dal primo contatto{" "}
                <span className="text-brand-corallo-text">
                  alla firma del contratto
                </span>
                .
              </>
            }
          />

          <div className="grid md:grid-cols-3 gap-6 lg:gap-7 items-stretch">
            {services.map((item) => (
              <div key={item.label}>
                <ServiceCard item={item} />
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href="/servizi" className="btn-ghost">
              Vedi le cinque fasi del Metodo FORGE
            </Link>
          </div>
        </div>
      </section>

      {/* S7 — CONFRONTO: a sinistra i problemi del titolare, in prima
          persona (frasi delle call e i problemi della Testa aziendale), a
          destra cosa facciamo. Prima parlava solo del servizio (proprieta',
          29/09); e il valore si mostra con il metodo, senza svalutare chi
          c'era prima. */}
      <DeferredMount minHeight="480px">
        <section className={`section-bianco border-y ${SEZIONE}`}>
          <div className={CONTENITORE}>
            <SectionHeader
              eyebrow="Il confronto"
              title={
                <>
                  Quello che vivi oggi.{" "}
                  <span className="text-brand-corallo-text">
                    Cosa cambia con noi.
                  </span>
                </>
              }
            />
            {/* Riga per riga: il problema come lo racconta il titolare (Testa
                aziendale §3, frasi delle call) e cosa facciamo, detto come
                meccanismo (Scheda dei fatti). Da telefono ogni riga diventa
                una scheda con il problema sopra e la risposta sotto. */}
            <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-brand-bordo bg-brand-bianco shadow-lg">
              <div className="hidden grid-cols-2 border-b border-brand-bordo md:grid">
                <p className="px-8 py-5 font-display text-lg font-bold text-brand-corallo-text">
                  Quello che vivi oggi
                </p>
                <p className="border-l border-brand-bordo px-8 py-5 font-display text-lg font-bold text-brand-verde-text">
                  Cosa facciamo con te
                </p>
              </div>
              <ol>
                {confronto.map((riga, idx) => (
                  <li
                    key={riga.problema}
                    className={`grid md:grid-cols-2 ${idx > 0 ? "border-t border-brand-bordo" : ""}`}
                  >
                    <div className="flex gap-3.5 px-5 pt-5 md:px-8 md:py-6">
                      <span className="segno-no mt-0.5" aria-hidden>
                        ✕
                      </span>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-corallo-text">
                          {riga.tema}
                        </p>
                        <p className="mt-1 font-display text-base font-bold leading-snug text-brand-nero md:text-lg">
                          &laquo;{riga.problema}&raquo;
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3.5 px-5 pb-5 pt-3 md:border-l md:border-brand-bordo md:px-8 md:py-6">
                      <span className="segno-si mt-0.5" aria-hidden>
                        ✓
                      </span>
                      <p className="text-[0.98rem] leading-relaxed text-brand-grigio">
                        {riga.soluzione}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
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

      {/* S6c — LE RECENSIONI GOOGLE, aggiornate da sole ogni giorno. */}
      <RecensioniGoogle sfondo="mattone" />

      {/* S7 — TEAM */}
      <DeferredMount minHeight="480px" rootMargin="320px 0px">
        <TeamSection />
      </DeferredMount>

      {/* S8 — FAQ */}
      <DeferredMount minHeight="360px">
        <section id="faq" className={`section-mattone scroll-mt-24 ${SEZIONE}`}>
          <div className={CONTENITORE}>
            <SectionHeader
              eyebrow="Domande Frequenti"
              title={
                <>
                  Quello che gli{" "}
                  <span className="text-brand-corallo-text">
                    imprenditori edili
                  </span>{" "}
                  ci chiedono sempre
                </>
              }
            />
            <div className={STRETTO}>
              <FAQAccordion onCoral items={faqsPagina("home")} />
            </div>
          </div>
        </section>
      </DeferredMount>

      {/* S9 — IL FILTRO
          Chiude la pagina qualificando invece di chiedere: chi si
          riconosce a destra non ci fa perdere una conoscitiva, chi si
          riconosce a sinistra scrive gia' convinto. */}
      <DeferredMount minHeight="620px">
        <PerChiSiPerChiNo studio />
      </DeferredMount>
    </>
  );
}
