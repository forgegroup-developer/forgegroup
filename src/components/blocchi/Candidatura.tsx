import ContattiFormLoader from "@/app/contatti/ContattiFormLoader";
import {
  CONTENITORE,
  SEZIONE,
  Chiave,
  ScenaAI,
  Titolo,
} from "@/components/blocchi/ui";
import { studio } from "@/data/blocchi";
import { iniziaImages } from "@/data/images";

/** Cosa c'è nello studio di fattibilità, e accanto il modulo senza banner. `sorgente` separa le candidature in GA4. */
export default function Candidatura({ sorgente }: { sorgente: string }) {
  return (
    <>
      {/* 8 · Cosa riceve chi si candida, e accanto il modulo senza banner.
          Da computer due colonne larghe quanto il resto della pagina; da
          telefono prima lo studio, poi il modulo. */}
      <section
        id="candidati"
        className={`section-bianco scroll-mt-24 ${SEZIONE}`}
      >
        <div className={CONTENITORE}>
          <Titolo occhiello="Il primo passo">
            Candida la tua impresa e ricevi{" "}
            <Chiave>lo studio di fattibilità</Chiave>
          </Titolo>
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-8">
                <ScenaAI
                  src={iniziaImages.studioDiFattibilita}
                  alt="Un consulente mostra a un imprenditore edile lo studio di fattibilità, con la cartina della zona e i grafici sul tavolo"
                  sizes="(min-width: 1024px) 540px, 100vw"
                />
              </div>
              <p className="body-lg mb-6">
                Prima di parlare di pubblicità, facciamo i conti sulla tua
                impresa e sulla tua zona. Nello studio di fattibilità trovi:
              </p>
              <ul className="mb-8 space-y-4">
                {studio.map((riga) => (
                  <li key={riga.cosa} className="flex gap-3.5">
                    <span className="segno-si mt-1" aria-hidden>
                      ✓
                    </span>
                    <p className="body-lg">
                      <strong className="text-brand-nero">{riga.cosa}</strong>{" "}
                      {riga.dettaglio}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="body-lg">
                Compili il modulo in due minuti.{" "}
                <strong className="text-brand-nero">
                  Ti chiamiamo entro 48 ore lavorative
                </strong>{" "}
                e fissiamo l&apos;appuntamento in cui te lo presentiamo.
              </p>
            </div>
            <div className="lg:sticky lg:top-28">
              <ContattiFormLoader sorgente={sorgente} senzaBanner />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
