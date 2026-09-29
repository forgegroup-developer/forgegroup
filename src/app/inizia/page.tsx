import type { Metadata } from "next";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Hero from "@/components/blocchi/Hero";
import PerChiSiPerChiNo from "@/components/sezioni/PerChiSiPerChiNo";
import Candidatura from "@/components/blocchi/Candidatura";
import ChiSiamo from "@/components/blocchi/ChiSiamo";
import ComeFunziona from "@/components/blocchi/ComeFunziona";
import Problemi from "@/components/blocchi/Problemi";
import TreCasi from "@/components/blocchi/TreCasi";
import {
  CONTENITORE,
  SEZIONE,
  STRETTO,
  Chiave,
  Titolo,
} from "@/components/blocchi/ui";
import { domandeDopoLaChiamata } from "@/data/blocchi";

/**
 * La pagina che Gianpio manda su WhatsApp dopo la prima telefonata.
 *
 * Non è la home: arriva in un momento preciso (dieci minuti dopo la chiamata,
 * dal telefono, a un titolare diffidente) e deve rispondere in un minuto a
 * "chi sono, cosa hanno fatto, cosa succede adesso". Fuori da Google, perché
 * non serve a chi cerca: serve a chi abbiamo appena sentito.
 *
 * È una landing: il menu in alto non c'è (lo toglie Navbar su questo
 * percorso) e nella pagina non ci sono link che portano altrove. Il footer è
 * quello di tutto il sito, senza la fascia finale, come in home. Si chiude
 * col modulo, senza il suo banner, e GA4 conta a parte queste candidature
 * (sorgente "inizia"). Colori e titoli seguono la home.
 *
 * I problemi vengono dalla Testa aziendale (§3, gli otto problemi) e dalle
 * frasi dette davvero nelle call. Numeri solo dalla Scheda dei fatti.
 */

export const metadata: Metadata = {
  title: "Inizia da qui",
  description:
    "Chi siamo, cosa abbiamo fatto per tre imprese edili e come funziona dopo la prima telefonata.",
  alternates: { canonical: "/inizia" },
  robots: { index: false, follow: true },
};

export default function IniziaPage() {
  return (
    <>
      <Hero
        occhiello="Ci siamo appena sentiti al telefono"
        titolo={
          <>
            Portiamo richieste di lavoro alle imprese edili, e le seguiamo con
            te{" "}
            <span className="text-brand-corallo no-spezza">
              fino alla firma
            </span>
            .
          </>
        }
        sottotitolo={
          <>
            Se vivi di passaparola, hai già pagato un&apos;agenzia senza vedere
            niente o perdi lavori per 500 euro di differenza, qui trovi in un
            minuto{" "}
            <strong className="font-semibold text-brand-nero">
              chi siamo, cosa abbiamo fatto e come lavoriamo
            </strong>
            .
          </>
        }
        principale={{ testo: "Candida la tua impresa", href: "#candidati" }}
        secondario={{ testo: "Guarda come lavoriamo", href: "#come-funziona" }}
      />

      <Problemi />

      <TreCasi />

      <ComeFunziona />

      {/* 5 · Per chi è: il blocco del sito, con il pulsante che porta al modulo qui sotto. */}
      <PerChiSiPerChiNo
        sfondo="mattone"
        nota="Lavoriamo con poche imprese, una per territorio."
        ctaHref="#candidati"
      />

      <ChiSiamo dopoLaChiamata />

      {/* 7 · Le domande che ci fanno dopo la chiamata. */}
      <section className={`section-mattone ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo occhiello="Domande frequenti">
            Le domande <Chiave>che ci fate</Chiave> dopo la chiamata
          </Titolo>
          <div className={STRETTO}>
            <FAQAccordion onCoral items={domandeDopoLaChiamata} />
          </div>
        </div>
      </section>

      <Candidatura sorgente="inizia" />

      {/* Il tasto flottante di iubenda qui non serve: le preferenze cookie
          stanno nel footer, e su una landing ogni tasto fisso è un'uscita. */}
      <style>{`.iubenda-tp-btn { display: none !important; }`}</style>
    </>
  );
}
