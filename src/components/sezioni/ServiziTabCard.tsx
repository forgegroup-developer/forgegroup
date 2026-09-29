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
  /** Come si fa in pratica: regole nate dalle consulenze vere (ROVI). */
  pratica?: { titolo: string; voci: string[] };
  /** Un blocco in più dopo i problemi (in acquisizione: il conto dei sopralluoghi). */
  extra?: ReactNode;
};

/*
 * Una macroarea di /servizi (rifatta il 29/09/2026 su richiesta della
 * proprietà): prima i problemi, presi dalla landing /inizia con le stesse
 * frasi dei titolari e la stessa soluzione accanto; poi cosa facciamo in
 * concreto; poi, dove c'è, la pratica. A sinistra la scena del problema
 * al posto dell'illustrazione.
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
      <div className="flex flex-col lg:flex-row">
        {/* Colonna sinistra: resta ferma mentre si leggono i problemi. */}
        <div className="border-b border-brand-bordo p-6 md:p-10 lg:w-[400px] lg:shrink-0 lg:border-b-0 lg:border-r">
          <div className="lg:sticky lg:top-28">
            <span className="font-display text-[clamp(3.5rem,10vw,5.5rem)] font-bold leading-none tabular-nums text-brand-corallo">
              {number}
            </span>
            <h3 className="mt-3 font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold uppercase leading-tight tracking-tight text-brand-corallo [&_span]:text-inherit">
              {title}
            </h3>
            <div className="my-5 border-t border-brand-bordo" aria-hidden />
            <p className="mb-6 font-display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold leading-snug tracking-tight text-brand-nero [&_span]:text-brand-corallo">
              {intro}
            </p>
            <ScenaAI src={scena.src} alt={scena.alt} sizes="(min-width: 1024px) 330px, 100vw" />
            {/* Il colore scritto per esteso: sul mattone la classe
                text-brand-corallo-text diventa evidenziatore e toglie il
                padding al pulsante. */}
            <Link
              href="/contatti"
              className="mt-6 inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border-2 border-brand-corallo px-5 py-2.5 text-xs font-bold text-[color:var(--color-brand-corallo-text)] transition-colors hover:bg-brand-corallo/10"
            >
              Richiedi lo studio di fattibilità ↗
            </Link>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-6 md:p-8 lg:py-10">
          <p className="eyebrow">
            {problemi.length > 1 ? "I problemi che risolve" : "Il problema che risolve"}
          </p>
          <ol className="space-y-5">
            {problemi.map((p) => (
              <li key={p.tema} className="rounded-2xl border border-brand-bordo bg-brand-bianco p-5 md:p-6">
                <div className="flex items-start gap-3.5">
                  <span className="segno-no mt-0.5" aria-hidden>
                    ✕
                  </span>
                  <div className="min-w-0">
                    <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-brand-grigio">
                      {p.tema}
                    </p>
                    <p className="mb-2 font-display text-lg font-bold leading-snug text-brand-nero md:text-xl">
                      &laquo;{p.frase}&raquo;
                    </p>
                    <p className="mb-4 leading-relaxed text-brand-grigio">{p.testo}</p>
                  </div>
                </div>
                <ConForge>{p.soluzione}</ConForge>
              </li>
            ))}
          </ol>

          {extra}

          <p className="eyebrow mt-4">Cosa facciamo, in concreto</p>
          <ul className="divide-y divide-brand-bordo rounded-2xl border border-brand-bordo bg-brand-bianco px-5 md:px-6">
            {points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3.5 py-5">
                <span className="segno-si mt-0.5" aria-hidden>
                  ✓
                </span>
                <div>
                  <p className="font-display text-lg font-bold leading-snug text-brand-nero [&_span]:text-[color:var(--color-brand-corallo-text)]">
                    {point.title}
                  </p>
                  <p className="mt-1.5 leading-relaxed text-brand-grigio">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>

          {pratica && (
            <div className="rounded-2xl border-l-4 border-brand-corallo bg-brand-bianco px-6 py-5 shadow-sm">
              <p className="mb-3 font-display text-lg font-bold text-brand-nero">{pratica.titolo}</p>
              <ul className="space-y-2.5">
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
        </div>
      </div>
    </article>
  );
}
