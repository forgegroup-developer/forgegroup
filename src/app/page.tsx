import type { Metadata } from "next";
import Candidatura from "@/components/blocchi/Candidatura";
import ChiSiamo from "@/components/blocchi/ChiSiamo";
import ComeFunziona from "@/components/blocchi/ComeFunziona";
import ConfrontoAgenzia from "@/components/blocchi/ConfrontoAgenzia";
import Hero from "@/components/blocchi/Hero";
import Problemi from "@/components/blocchi/Problemi";
import TreCasi from "@/components/blocchi/TreCasi";
import {
  CONTENITORE,
  SEZIONE,
  STRETTO,
  Chiave,
  Titolo,
} from "@/components/blocchi/ui";
import MetodoForge from "@/components/sezioni/MetodoForge";
import PerChiSiPerChiNo from "@/components/sezioni/PerChiSiPerChiNo";
import VideoScettico from "@/components/sezioni/VideoScettico";
import FAQAccordion from "@/components/ui/FAQAccordion";
import JsonLdFAQ from "@/components/ui/JsonLdFAQ";
import { faqsPagina } from "@/data/site";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/seo/site";

/**
 * La home, ricostruita il 29/09/2026 con i blocchi della landing /inizia
 * (REGOLE-DEL-SITO.md, analisi della comunicazione del 29/09).
 *
 * Il titolo è la USP intera, approvata dalla proprietà il 28/09 ("CRM"
 * diventa "gestionale", decisione del 29/09): la prima parte è l'H1, il
 * resto il sottotitolo. Poi l'ordine delle Regole v2 §3: il problema con la
 * soluzione accanto e il confronto con l'agenzia, il metodo, come funziona,
 * le prove, il video per chi è scettico, per chi è, chi siamo, le domande,
 * la candidatura. Sotto la hero, bianco e mattone si alternano.
 */

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
      <JsonLdFAQ items={faqsPagina("home")} />

      <Hero
        occhiello="Specializzati nelle richieste di lavoro per imprese edili"
        titolo={
          <>
            Aiutiamo i titolari di imprese edili che vivono di passaparola a
            ricevere{" "}
            <span className="text-brand-corallo">
              richieste di lavoro qualificate
            </span>
          </>
        }
        sottotitolo={
          <>
            con un processo di vendita strutturato e un gestionale che mostra
            quanto rende ogni euro di pubblicità,{" "}
            <strong className="font-semibold text-brand-nero">
              con i numeri nero su bianco in 90 giorni
            </strong>
            , senza più regalare sopralluoghi a chi cerca solo il prezzo più
            basso e senza pagare più agenzie generaliste.
          </>
        }
        principale={{
          testo: "Richiedi lo studio di fattibilità",
          href: "#candidati",
        }}
        secondario={{ testo: "Guarda il Metodo FORGE", href: "#metodo" }}
        dopo={
          <p className="text-sm leading-relaxed text-brand-grigio">
            Imprese edili, serramentisti, impiantisti, fotovoltaico, arredo
            commerciale, software per l&apos;edilizia e fornitori del settore.
          </p>
        }
      />

      {/* 1 · Bianco: i problemi con la soluzione accanto, e il confronto. */}
      <Problemi dopo={<ConfrontoAgenzia />} />

      {/* 2 · Mattone: il metodo, con i nomi della Scheda. */}
      <MetodoForge className="section-mattone" />

      {/* 3 · Bianco: i passi e il gestionale. */}
      <ComeFunziona />

      {/* 4 · Mattone: i tre casi e la recensione Google. */}
      <TreCasi />

      {/* 5 · Bianco: chi ha già provato con un'agenzia ascolta un titolare. */}
      <VideoScettico />

      {/* 6 · Mattone: per chi è, per chi non è. */}
      <PerChiSiPerChiNo
        sfondo="mattone"
        nota="Lavoriamo con poche imprese, una per territorio."
        ctaHref="#candidati"
      />

      {/* 7 · Bianco: i fondatori e la squadra. */}
      <ChiSiamo />

      {/* 8 · Mattone: le domande, con i dati strutturati per Google. */}
      <section id="faq" className={`section-mattone scroll-mt-24 ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo occhiello="Domande frequenti">
            Quello che gli <Chiave>imprenditori edili</Chiave> ci chiedono
            sempre
          </Titolo>
          <div className={STRETTO}>
            <FAQAccordion onCoral items={faqsPagina("home")} />
          </div>
        </div>
      </section>

      {/* 9 · Bianco: lo studio di fattibilità e il modulo. */}
      <Candidatura sorgente="home" />
    </>
  );
}
