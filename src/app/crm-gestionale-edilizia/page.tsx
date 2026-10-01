import Link from "next/link";
import type { Metadata } from "next";
import HeroPagina from "@/components/sezioni/HeroPagina";
import CrmGestionale from "@/components/sezioni/CrmGestionale";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import FAQAccordion from "@/components/ui/FAQAccordion";
import JsonLdFAQ from "@/components/ui/JsonLdFAQ";
import { CONTENITORE, SEZIONE, STRETTO, Chiave, ConForge, Titolo } from "@/components/blocchi/ui";
import { altriProblemi, problemiConScena } from "@/data/blocchi";
import { iniziaImages } from "@/data/images";
import { faqsPagina } from "@/data/site";
import { SITE_NAME } from "@/lib/seo/site";

/**
 * La pagina del gestionale (rifatta il 29/09/2026).
 *
 * "Gestionale impresa edile" è la ricerca con domanda vera (Keyword
 * Planner): il titolare con un problema cerca un programma, non
 * un'agenzia. Questa pagina è la porta d'ingresso da Google e la pagina
 * da mandare a chi in chiamata dice "non so come lavorate davvero".
 *
 * Ordine: hero, i problemi (quelli della landing, stesse parole), cosa
 * vedi quando lo apri (anteprima con dati di prova), il confronto con i
 * gestionali di cantiere (A contro B), le domande. Sfondi alternati
 * bianco e mattone; la pagina chiude bianca sopra il footer mattone.
 */

export const metadata: Metadata = {
  title: "Gestionale per imprese edili: le trattative fino alla firma",
  description:
    "Il gestionale per imprese edili che tiene le trattative: ogni richiesta con fase, data e chi la segue, e quanto rende ogni euro. Lo apri dal cantiere.",
  alternates: { canonical: "/crm-gestionale-edilizia" },
  openGraph: {
    title: "Gestionale per imprese edili | Forge Group",
    description:
      "I gestionali di cantiere tengono il dopo firma. Questo tiene la trattativa che deve diventare cantiere: fase, data e persona che la segue.",
    url: "/crm-gestionale-edilizia",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: SITE_NAME }],
  },
};

/* I problemi della landing che il gestionale risolve. */
const temi = ["Il preventivo e poi il silenzio", "Il titolare dentro il cantiere", "L'agenzia di prima"];
const problemi = temi.map((t) => [...problemiConScena, ...altriProblemi].find((p) => p.tema === t)!);

/* A contro B: i gestionali di cantiere guardano il dopo firma. Dalla
   ricerca del 24/09/2026 sui gestionali del settore. */
const confronto = {
  cantiere: [
    "I costi, le ore e le bolle",
    "I rapportini degli operai",
    "Quanto ti è rimasto su quel lavoro",
  ],
  forge: [
    "La richiesta arrivata martedì, con tipo di lavoro, tempi, budget e zona",
    "Il sopralluogo fissato per sabato",
    "Il piano dei lavori mandato, e la data per richiamare",
    "Quanto ti rende ogni euro di pubblicità, contratto per contratto",
  ],
};

export default function CrmGestionalePage() {
  return (
    <>
      <div className={`${CONTENITORE} pt-6`}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Gestionale" },
          ]}
        />
      </div>

      <HeroPagina
        occhiello="Il gestionale"
        titolo={
          <>
            Il gestionale per imprese edili che segue ogni trattativa{" "}
            <span className="text-brand-corallo no-spezza">fino alla firma</span>.
          </>
        }
        testo={
          <>
            Le richieste stanno sul quaderno, su WhatsApp e nella testa di chi ha risposto al
            telefono. Il gestionale lo costruiamo noi, sul processo di vendita scritto con te:{" "}
            <strong className="chiave">ogni richiesta ha una fase, una data e chi la segue</strong>, e
            lo apri dal telefono anche in cantiere.
          </>
        }
        nota={<>È compreso nel lavoro con Forge: niente licenza da rinnovare, niente assistenza a parte.</>}
        primario={{
          href: "/contatti",
          testo: "Richiedi lo studio di fattibilità",
          freccia: "↗",
        }}
        secondario={{
          href: "#anteprima",
          testo: "Guarda cosa vedi quando lo apri",
          freccia: "↓",
        }}
        immagine={{
          src: iniziaImages.cantiereTelefono,
          alt: "Un imprenditore edile in cantiere guarda il telefono mentre due operai alzano un muro",
          didascalia: "Immagine generata con AI",
        }}
      />

      {/* I PROBLEMI · mattone. Quelli della landing, con le stesse parole. */}
      <section className={`section-mattone ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo
            occhiello="Il problema"
            sottotitolo="Sono le cose che ci raccontano i titolari al primo appuntamento. Accanto a ognuna, cosa fa il gestionale."
          >
            Le richieste ci sono già, manca <Chiave>il posto dove stanno scritte</Chiave>.
          </Titolo>

          <ol className="grid gap-5 lg:grid-cols-3">
            {problemi.map((p, i) => (
              <li key={p.tema} className="card-xl superficie-chiara flex flex-col rounded-2xl border p-6">
                <p className="eyebrow mb-2">
                  Problema #{i + 1} · {p.tema}
                </p>
                <p className="mb-3 font-display text-xl font-bold leading-snug text-brand-nero">
                  &laquo;{p.frase}&raquo;
                </p>
                <p className="mb-5 leading-relaxed">{p.testo}</p>
                <div className="mt-auto">
                  <ConForge>{p.soluzione}</ConForge>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* COSA VEDI · bianco: i quattro punti e lo schermo di prova. */}
      <CrmGestionale />

      {/* A CONTRO B · mattone: se hai già un gestionale di cantiere. */}
      <section className={`section-mattone ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo
            occhiello="Se hai già un gestionale"
            sottotitolo="Se ne hai uno per il cantiere e ti trovi bene, tienilo. Questo guarda quello che succede prima."
          >
            Non sostituisce il tuo gestionale di cantiere: tiene <Chiave>la parte prima della firma</Chiave>.
          </Titolo>

          <div className="grid items-stretch gap-5 md:grid-cols-2">
            <div className="card-xl superficie-chiara rounded-2xl border p-6 md:p-8">
              <p className="eyebrow mb-2">A · Il gestionale di cantiere</p>
              <h3 className="mb-5 font-display text-xl font-bold text-brand-nero">
                Guarda quello che succede dopo la firma
              </h3>
              <ul className="space-y-3">
                {confronto.cantiere.map((v) => (
                  <li key={v} className="flex items-start gap-3 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-grigio" aria-hidden />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-xl superficie-chiara rounded-2xl border-2 !border-brand-verde/50 p-6 md:p-8">
              <p className="eyebrow mb-2">B · Il gestionale di Forge</p>
              <h3 className="mb-5 font-display text-xl font-bold text-brand-nero">
                Guarda quello che succede prima della firma
              </h3>
              <ul className="space-y-3">
                {confronto.forge.map((v) => (
                  <li key={v} className="flex items-start gap-3 leading-relaxed">
                    <span className="segno-si mt-0.5" aria-hidden>
                      ✓
                    </span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className={`${STRETTO} mt-12 text-pretty text-center font-display text-2xl font-bold leading-snug !text-white md:text-3xl`}>
            Un cantiere che va male lo vedi nei numeri a fine lavori. Una trattativa persa{" "}
            <Chiave>non la vedi mai</Chiave>.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4">
            <p className={`${STRETTO} text-center`}>
              Nel Metodo FORGE il gestionale è la fase G, Gestione: ogni settimana lo apriamo con te e
              guardiamo le trattative una per una.
            </p>
            <Link href="/servizi#metodo" className="btn-ghost text-center">
              Guarda il Metodo FORGE per intero ↗
            </Link>
          </div>
        </div>
      </section>

      {/* LE DOMANDE · bianco: controllare il lavoro, e quanto costa lo strumento. */}
      <section id="domande" className={`section-bianco scroll-mt-24 ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo occhiello="Domande frequenti">
            Sul gestionale, <Chiave>quello che ci chiedono</Chiave>.
          </Titolo>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion items={faqsPagina("crm")} />
          </div>
        </div>
      </section>

      <JsonLdFAQ items={faqsPagina("crm")} />
    </>
  );
}
