import Link from "next/link";
import type { ReactNode } from "react";
import { ConForge, ScenaAI } from "@/components/blocchi/ui";
import type { Problema } from "@/data/blocchi";

export type ServiziTabPoint = {
  title: ReactNode;
  body: string;
};

type Props = {
  id: string;
  number: string;
  title: ReactNode;
  intro: ReactNode;
  /** La scena del problema principale (immagine AI della landing). */
  scena: { src: string; alt: string };
  /** I problemi della landing che questa macroarea risolve, con le stesse parole. */
  problemi: Problema[];
  points: ServiziTabPoint[];
  /** Le regole che si scrivono con il cliente. */
  pratica?: { titolo: string; voci: string[] };
  /** Un blocco in più dopo i problemi (in acquisizione: il conto dei sopralluoghi). */
  extra?: ReactNode;
};

/* Le colonne seguono il numero delle schede: niente scheda sola in fondo. */
function colonne(n: number) {
  if (n === 1) return "";
  if (n === 3) return "lg:grid-cols-3";
  return "md:grid-cols-2";
}

/*
 * Una macroarea di /servizi. Rifatta il 29/09/2026 (proprietà: "troppo
 * spazio a sinistra, foto piccola"): niente più colonna laterale. Tutto a
 * piena larghezza, dall'alto in basso:
 * 1. apertura: numero, nome e frase a sinistra, la scena grande a destra;
 * 2. i problemi della landing, con le stesse parole e la soluzione accanto;
 * 3. il blocco in più (il conto), dove c'è;
 * 4. cosa facciamo, in concreto, affiancato;
 * 5. le regole, dove ci sono, e il pulsante.
 */
export default function ServiziTabCard({
  id,
  number,
  title,
  intro,
  scena,
  problemi,
  points,
  pratica,
  extra,
}: Props) {
  return (
    <article
      id={id}
      className="card-xl superficie-chiara scroll-mt-28 overflow-hidden rounded-3xl border bg-brand-bianco shadow-xl shadow-black/10"
    >
      {/* 1 · Apertura */}
      <div className="grid items-center gap-8 border-b border-brand-bordo p-5 md:p-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <span className="font-display text-[clamp(3.5rem,8vw,5rem)] font-bold leading-none tabular-nums text-brand-corallo">
            {number}
          </span>
          <h3 className="mt-3 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold uppercase leading-tight tracking-tight text-brand-corallo [&_span]:text-inherit">
            {title}
          </h3>
          <div className="my-5 w-16 border-t-2 border-brand-corallo" aria-hidden />
          <p className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-semibold leading-snug tracking-tight text-brand-nero [&_span]:text-brand-corallo">
            {intro}
          </p>
        </div>
        {/* Da telefono senza scena: la frase sopra dice già il problema
            (proprietà, 15/10: alleggerire la lettura da telefono). */}
        <div className="max-md:hidden">
          <ScenaAI src={scena.src} alt={scena.alt} sizes="(min-width: 1024px) 520px, 100vw" />
        </div>
      </div>

      <div className="space-y-10 p-5 md:space-y-12 md:p-10">
        {/* 2 · I problemi */}
        <div>
          <p className="eyebrow mb-5">
            {problemi.length > 1 ? "I problemi che risolve" : "Il problema che risolve"}
          </p>
          <ol className={`grid gap-5 ${colonne(problemi.length)}`}>
            {problemi.map((p) => (
              <li
                key={p.tema}
                /* Da telefono niente scheda dentro la scheda: due bordi
                   lasciavano al testo 220 px. Una riga divide i problemi. */
                className={`flex flex-col bg-brand-bianco max-md:border-t max-md:border-brand-bordo max-md:pt-5 max-md:first:border-t-0 max-md:first:pt-0 md:rounded-2xl md:border md:border-brand-bordo md:p-6 ${
                  problemi.length === 1 ? "md:grid md:grid-cols-2 md:items-start md:gap-8" : ""
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <span className="segno-no mt-0.5" aria-hidden>
                    ✕
                  </span>
                  <div className="min-w-0">
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-brand-grigio">
                      {p.tema}
                    </p>
                    <p className="mb-3 font-display text-lg font-bold leading-snug text-brand-nero md:mb-2 md:text-xl">
                      &laquo;{p.frase}&raquo;
                    </p>
                    {/* Da telefono: la frase del titolare e accanto "Con
                        Forge"; la spiegazione in mezzo resta da computer. */}
                    <p className="mb-4 leading-relaxed text-brand-grigio max-md:hidden">{p.testo}</p>
                  </div>
                </div>
                <div className="mt-auto">
                  <ConForge>{p.soluzione}</ConForge>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* 3 · Il blocco in più */}
        {extra}

        {/* 4 · Cosa facciamo */}
        <div>
          <p className="eyebrow mb-5">Cosa facciamo, in concreto</p>
          <ul className={`grid gap-3 md:gap-5 ${colonne(points.length)}`}>
            {points.map((point, idx) => (
              /* Da telefono un elenco: spunta e titolo, senza il testo
                 sotto e senza scheda intorno. */
              <li
                key={idx}
                className="bg-brand-bianco max-md:flex max-md:items-start max-md:gap-3 md:rounded-2xl md:border md:border-brand-bordo md:p-6"
              >
                <span className="segno-si mb-4 max-md:mb-0 max-md:mt-0.5 max-md:shrink-0" aria-hidden>
                  ✓
                </span>
                <p className="font-display text-lg font-bold leading-snug text-brand-nero [&_span]:text-[color:var(--color-brand-corallo-text)]">
                  {point.title}
                </p>
                <p className="mt-2 leading-relaxed text-brand-grigio max-md:hidden">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 5 · Le regole e il pulsante */}
        {pratica && (
          <div className="rounded-2xl border-l-4 border-brand-corallo bg-brand-bianco px-5 py-5 shadow-sm md:px-8 md:py-6">
            <p className="mb-4 font-display text-xl font-bold text-brand-nero">{pratica.titolo}</p>
            <ul className="grid gap-x-8 gap-y-3 md:grid-cols-2">
              {pratica.voci.map((v) => (
                <li key={v} className="flex items-start gap-3 leading-relaxed text-brand-grigio">
                  <span className="segno-si mt-0.5" aria-hidden>
                    ✓
                  </span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex justify-center">
          {/* Il colore scritto per esteso: sul mattone la classe
              text-brand-corallo-text diventa evidenziatore e toglie il
              padding al pulsante. */}
          <Link
            href="/contatti"
            className="btn-ghost"
          >
            Richiedi lo studio ↗
          </Link>
        </div>
      </div>
    </article>
  );
}
