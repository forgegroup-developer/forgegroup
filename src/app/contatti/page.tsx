import type { Metadata } from "next";
import ContattiFormLoader from "./ContattiFormLoader";
import { studio } from "@/data/blocchi";
import BannerGoogle from "@/components/sezioni/BannerGoogle";
import {
  CONTENITORE,
  SEZIONE,
  STRETTO,
  Chiave,
  Titolo,
} from "@/components/blocchi/ui";
import FAQAccordion from "@/components/ui/FAQAccordion";
import JsonLdFAQ from "@/components/ui/JsonLdFAQ";
import { faqsPagina } from "@/data/site";

export const metadata: Metadata = {
  title: "Candida la tua impresa edile",
  description:
    "Candida la tua impresa edile: lo studio di fattibilità dice se ha senso lavorare insieme, e può dire di no. Ti chiamiamo entro 48 ore lavorative.",
  alternates: { canonical: "/contatti" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Candida la tua impresa edile | Forge Group",
    description:
      "Lo studio di fattibilità dice se ha senso lavorare insieme. Prendiamo poche imprese per territorio. Ti chiamiamo entro 48 ore lavorative.",
    url: "/contatti",
    images: [
      { url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Candida la tua impresa edile | Forge Group",
    description: "Lo studio di fattibilità dice se ha senso lavorare insieme.",
    images: ["/logo.png"],
  },
};

/* Cosa chiediamo a chi si candida (proprietà, 30/09: "ho bisogno che anche
   il cliente si comprometta"). Fatti dalla Scheda: selezione, un territorio
   alla volta, le richieste le richiama l'impresa, contratto annuale. */
const impegno = [
  {
    cosa: "Rispondi con i numeri veri.",
    dettaglio:
      "Le domande del modulo servono a fare i conti sulla tua impresa: più sono precise, più è onesta la risposta.",
  },
  {
    cosa: "All'appuntamento porta chi decide con te.",
    dettaglio:
      "Il socio, un familiare, chi segue la vendita: lo studio si guarda insieme a chi poi dovrà scegliere.",
  },
  {
    cosa: "Le richieste le richiama la tua impresa, in tempo.",
    dettaglio:
      "Il filtro e le parole le costruiamo noi con te, ma le telefonate le fa chi lavora in azienda.",
  },
  {
    cosa: "Il titolare c'è.",
    dettaglio:
      "Il sistema lo costruiamo con te nelle consulenze, non al posto tuo, e resta in azienda anche dopo.",
  },
  {
    cosa: "Un anno di lavoro insieme.",
    dettaglio:
      "In edilizia fra la prima richiesta e la firma passano spesso tre o quattro mesi: per vedere i frutti serve tempo.",
  },
];

export default function ContattiPage() {
  return (
    <>
      {/* 1 · IN CIMA: cosa stai facendo (la candidatura per lo studio di
          fattibilità) e accanto il modulo, come nel blocco candidatura della
          landing. Il pulsante "Candida la tua azienda" del menu porta qui:
          il titolo deve dire subito che cosa si riceve. */}
      <section
        className={`section-bianco border-b border-brand-bordo pt-12 pb-20 md:pt-16 md:pb-28`}
      >
        <div className={CONTENITORE}>
          {/* Da telefono: titolo, poi subito il modulo, poi cosa c'è nello
              studio. Da computer: testo a sinistra, modulo fermo a destra. */}
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0">
            <div className="lg:col-start-1 lg:row-start-1">
              <p className="mb-6">
                <span className="eyebrow-rule">
                  Candidatura · Studio di fattibilità
                </span>
              </p>
              <h1 className="heading-display-frase mb-6 text-balance">
                Candida la tua impresa per lo{" "}
                <Chiave>studio di fattibilità</Chiave>.
              </h1>
              <p className="body-lg mb-8 text-pretty">
                È il primo passo per lavorare con noi. Prima di parlare di
                pubblicità facciamo i conti sulla tua impresa e sulla tua zona,
                e decidiamo insieme se ha senso partire:{" "}
                <strong className="chiave">a volte la risposta è no</strong>, e
                te la diamo prima che tu abbia speso un euro.
              </p>
            </div>
            <div className="lg:sticky lg:top-28 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="rounded-3xl border border-brand-bordo bg-brand-bianco p-6 shadow-xl shadow-black/5 md:p-8">
                <p className="mb-2 font-display text-xl font-bold text-brand-nero">
                  La tua candidatura
                </p>
                <BannerGoogle className="mb-6" />
                <ContattiFormLoader sorgente="contatti" senzaBanner />
              </div>
            </div>
            <div className="lg:col-start-1 lg:row-start-2">
              <p className="mb-4 font-display text-lg font-bold text-brand-nero">
                Nello studio di fattibilità trovi:
              </p>
              <ul className="mb-8 space-y-4">
                {studio.map((riga) => (
                  <li key={riga.cosa} className="flex gap-3.5">
                    <span className="segno-si mt-1" aria-hidden>
                      ✓
                    </span>
                    <p className="body-lg">
                      <strong className="chiave">{riga.cosa}</strong>{" "}
                      {riga.dettaglio}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="body-lg">
                Compili il modulo in due minuti.{" "}
                <strong className="chiave">
                  Ti chiamiamo entro 48 ore lavorative
                </strong>{" "}
                e fissiamo l&apos;appuntamento in cui te lo presentiamo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2 · COSA CHIEDIAMO A TE · mattone. Al posto di "Qui non compri
          niente" (proprietà, 30/09): la selezione vale in tutte e due le
          direzioni. */}
      <section className={`section-mattone ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo
            occhiello="Prima di candidarti"
            sottotitolo="Prendiamo poche imprese, un territorio alla volta. Se l'impresa non regge il lavoro che le arriva, il problema diventa di tutti e due."
          >
            Ci mettiamo impegno noi, e lo chiediamo <Chiave>anche a te</Chiave>.
          </Titolo>
          <ul className={`${STRETTO} grid gap-4 md:grid-cols-2`}>
            {impegno.map((riga) => (
              <li
                key={riga.cosa}
                className="card-xl superficie-chiara flex gap-3.5 rounded-2xl border p-6"
              >
                <span className="segno-si mt-0.5" aria-hidden>
                  ✓
                </span>
                <div>
                  <p className="mb-1 font-display text-lg font-bold text-brand-nero">
                    {riga.cosa}
                  </p>
                  <p className="leading-relaxed">{riga.dettaglio}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 · LE DOMANDE · bianco: cosa comporta candidarsi, la zona, la durata. */}
      <section
        id="domande"
        className={`section-bianco scroll-mt-24 ${SEZIONE}`}
      >
        <div className={CONTENITORE}>
          <Titolo occhiello="Domande frequenti">
            Prima di compilare, <Chiave>quello che chiedono tutti</Chiave>.
          </Titolo>
          <div className="mx-auto max-w-3xl">
            <FAQAccordion items={faqsPagina("contatti")} />
          </div>
        </div>
      </section>

      <JsonLdFAQ items={faqsPagina("contatti")} />
    </>
  );
}
