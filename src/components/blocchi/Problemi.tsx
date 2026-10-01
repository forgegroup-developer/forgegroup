import {
  CONTENITORE,
  SEZIONE,
  STACCO,
  STRETTO,
  Chiave,
  ConForge,
  ScenaAI,
  Titolo,
} from "@/components/blocchi/ui";
import { altriProblemi, problemiConScena } from "@/data/blocchi";
import type { ReactNode } from "react";

/** Le situazioni in cui il titolare si riconosce, ognuna con la sua soluzione, poi "è normale", il conto e la svolta. `dopo` aggiunge un blocco in fondo alla sezione (in home: il confronto con l'agenzia). */
export default function Problemi({ dopo }: { dopo?: ReactNode }) {
  return (
    <>
      {/* 2 · I problemi, con le parole dei titolari. Poi "è normale" e il conto. */}
      <section className={`section-bianco border-y ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo
            occhiello="Prima di tutto"
            sottotitolo="Sono le cose che ci raccontano i titolari al primo appuntamento. Se ne riconosci anche solo una, questa pagina è per te."
          >
            Ti suona <Chiave>familiare?</Chiave>
          </Titolo>

          <div className={`${STACCO} space-y-16 md:space-y-20`}>
            {problemiConScena.map((p, i) => (
              <article
                key={p.tema}
                className="grid items-center gap-6 md:grid-cols-2 md:gap-12"
              >
                <div className={i % 2 === 1 ? "md:order-2" : undefined}>
                  <ScenaAI
                    src={p.src}
                    alt={p.alt}
                    sizes="(min-width: 768px) 460px, 100vw"
                  />
                </div>
                <div>
                  <p className="eyebrow mb-3">{p.tema}</p>
                  <p className="mb-4 font-display text-2xl font-bold leading-snug text-brand-nero md:text-3xl">
                    <Chiave>&laquo;</Chiave>
                    {p.frase}
                    <Chiave>&raquo;</Chiave>
                  </p>
                  <p className="body-lg mb-5">{p.testo}</p>
                  <ConForge>{p.soluzione}</ConForge>
                </div>
              </article>
            ))}
          </div>

          <div
            className={`${STACCO} rounded-2xl border border-brand-bordo bg-brand-bianco px-5 sm:px-8`}
          >
            <p className="border-b border-brand-bordo py-5 font-display text-lg font-bold text-brand-nero">
              E poi ci sono queste. Ti riconosci?
            </p>
            <ol>
              {altriProblemi.map((p, i) => (
                <li
                  key={p.tema}
                  className="grid gap-3 border-b border-brand-bordo py-7 last:border-b-0 md:grid-cols-[3rem_1fr_1fr] md:gap-8"
                >
                  <span
                    className="font-display text-2xl font-bold leading-none text-brand-corallo-text"
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="eyebrow mb-1">{p.tema}</p>
                    <p className="mb-2 font-display text-lg font-bold leading-snug text-brand-nero">
                      {p.frase}
                    </p>
                    <p className="text-[0.98rem] leading-relaxed text-brand-grigio">
                      {p.testo}
                    </p>
                  </div>
                  <ConForge>{p.soluzione}</ConForge>
                </li>
              ))}
            </ol>
          </div>

          <div className={`${STRETTO} ${STACCO}`}>
            <p className="body-lg mb-5">
              È normale. Succede alle imprese che vivono di passaparola: nei
              mesi buoni il lavoro arriva da solo, in quelli morti le spese
              corrono lo stesso, e si finisce a prendere i clienti{" "}
              <strong className="chiave">
                per bisogno invece di sceglierli
              </strong>
              .
            </p>
            <p className="body-lg">
              <strong className="chiave">
                Non è la stagionalità, e non è la crisi.
              </strong>{" "}
              Manca un modo per far arrivare{" "}
              <Chiave>le richieste giuste</Chiave> e per{" "}
              <Chiave>portarle alla firma</Chiave>.
            </p>
          </div>

          <div
            className={`section-mattone ${STRETTO} ${STACCO} rounded-2xl bg-brand-mattone p-6 sm:p-10`}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide">
              Facciamo due conti, con numeri tondi
            </p>
            <p className="mb-5 text-lg leading-relaxed">
              Esci per otto sopralluoghi al mese e ne chiudi uno: sono sette
              giornate a vuoto al mese, più di ottanta l&apos;anno.
            </p>
            <h3 className="font-display text-2xl font-bold leading-snug md:text-3xl">
              <span>Più di quattro mesi di lavoro</span> regalati a chi non
              avrebbe mai firmato.
            </h3>
          </div>

          {/* La svolta: tutti i problemi sopra hanno la stessa risposta. */}
          <div className={`${STRETTO} text-center`}>
            <p className="eyebrow eyebrow-mark mb-4 flex justify-center">
              La soluzione
            </p>
            <p className="font-display text-2xl font-bold leading-snug text-brand-nero md:text-3xl">
              Per ognuno di questi problemi hai letto cosa facciamo noi. È tutto
              nello stesso percorso:{" "}
              <Chiave>
                richieste già filtrate, un processo di vendita scritto con te,
                il nostro gestionale, e noi al tuo fianco ogni settimana fino
                alla firma
              </Chiave>
              .
            </p>
          </div>
          {dopo}
        </div>
      </section>
    </>
  );
}
