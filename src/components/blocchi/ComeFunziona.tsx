import { GestionaleContenuto } from "@/components/blocchi/Gestionale";
import {
  CONTENITORE,
  SEZIONE,
  STACCO,
  STRETTO,
  Chiave,
  Titolo,
} from "@/components/blocchi/ui";
import { passi } from "@/data/blocchi";

/** I passi dopo la chiamata e il gestionale, in una sezione bianca. */
export default function ComeFunziona() {
  return (
    <>
      {/* 4 · Come funziona: i passi dopo la chiamata, poi il gestionale, cioè
          cosa vuol dire "ti facciamo vedere tutto". Una sezione sola, così
          bianco e mattone continuano ad alternarsi (la video-recensione DISA
          è stata tolta dalla landing il 28/09). Fatti dalla Scheda (Gestione)
          e dalla Testa aziendale (§5, l'impegno). */}
      <section
        id="come-funziona"
        className={`section-bianco scroll-mt-24 border-y ${SEZIONE}`}
      >
        <div className={CONTENITORE}>
          <Titolo occhiello="Come funziona">
            Da qui <Chiave>in avanti</Chiave>
          </Titolo>
          <div className={`${STRETTO} ${STACCO}`}>
            <ol className="ml-5 space-y-9 border-l-2 border-brand-bordo pl-9">
              {passi.map((p, i) => (
                <li key={p.titolo} className="relative">
                  <span
                    className="absolute -left-[3.45rem] top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-corallo bg-brand-bianco font-display text-lg font-bold text-brand-corallo-text"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <h3 className="mb-1 pt-1.5 font-display text-xl font-bold text-brand-nero">
                    {p.titolo}
                  </h3>
                  <p className="body-lg">{p.testo}</p>
                </li>
              ))}
            </ol>
          </div>

          <GestionaleContenuto />
        </div>
      </section>
    </>
  );
}
