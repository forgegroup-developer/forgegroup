import {
  CONTENITORE,
  SEZIONE,
  Chiave,
  ScenaAI,
  Titolo,
} from "@/components/blocchi/ui";
import { crm } from "@/data/blocchi";
import { iniziaImages } from "@/data/images";

/**
 * Il gestionale: cosa vuol dire "ti facciamo vedere tutto". Fatti dalla
 * Scheda (fase Gestione) e dalla Testa aziendale (§5, l'impegno). Il
 * contenuto sta anche dentro "Come funziona" sulla landing.
 */
export function GestionaleContenuto() {
  return (
    <>
      <Titolo
        occhiello="Il gestionale"
        sottotitolo="Il gestionale lo costruiamo noi, sul processo di vendita che mettiamo in piedi con te. Lo apri dal telefono, anche in cantiere."
      >
        Vedi tutto quello che succede,{" "}
        <Chiave>anche quando sei in cantiere</Chiave>
      </Titolo>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <ScenaAI
          src={iniziaImages.cantiereTelefono}
          alt="Un imprenditore edile in cantiere, casco sotto il braccio, guarda il telefono sorridendo mentre due operai alzano un muro"
          sizes="(min-width: 1024px) 540px, 100vw"
        />
        <ol className="space-y-7">
          {crm.map((c, i) => (
            <li key={c.titolo} className="flex gap-5">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-corallo font-display text-lg font-bold text-white"
                aria-hidden
              >
                {i + 1}
              </span>
              <div>
                <h3 className="mb-1 font-display text-xl font-bold leading-snug text-brand-nero">
                  {c.titolo}
                </h3>
                <p className="text-[1.02rem] leading-relaxed text-brand-grigio">
                  {c.testo}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

/** Il gestionale come sezione a sé, bianca (in home al posto di "Cosa vedi tu"). */
export default function Gestionale() {
  return (
    <section
      id="gestionale"
      className={`section-bianco scroll-mt-24 border-y ${SEZIONE}`}
    >
      <div className={CONTENITORE}>
        <GestionaleContenuto />
      </div>
    </section>
  );
}
