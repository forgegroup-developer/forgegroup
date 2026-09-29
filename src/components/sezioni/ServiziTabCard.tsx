import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type ServiziTabPoint = {
  title: ReactNode;
  body: string;
};

type Props = {
  id: string;
  /** Il problema vero da cui parte la macroarea (Testa aziendale, gli otto problemi). */
  problema: { titolo: string; testo: string };
  /** Come si fa in pratica: regole nate dalle consulenze vere (ROVI). */
  pratica?: { titolo: string; voci: string[] };
  number: string;
  title: ReactNode;
  intro: ReactNode;
  points: ServiziTabPoint[];
  sidebarImage?: string;
  sidebarImageAlt?: string;
};

function PointCard({ title, body }: ServiziTabPoint) {
  return (
    <div>
      <div className="group h-full rounded-2xl border border-brand-bordo bg-brand-bianco p-6 md:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-corallo/50 hover:shadow-lg hover:shadow-brand-corallo/10">
        <p className="font-display text-[1.125rem] md:text-[1.3rem] font-semibold text-brand-nero leading-snug tracking-tight [&_span]:text-brand-corallo-text">
          {title}
        </p>
        <div className="mt-4 flex items-start gap-3 border-t border-brand-pesca/40 pt-4">
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-corallo/10 text-brand-corallo-text text-sm font-bold"
            aria-hidden
          >
            ✦
          </span>
          <p className="text-brand-grigio leading-relaxed text-[15px] md:text-base">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServiziTabCard({
  id,
  problema,
  pratica,
  number,
  title,
  intro,
  points,
  sidebarImage,
  sidebarImageAlt,
}: Props) {
  return (
    <div>
      <article
        id={id}
        className="scroll-mt-28 overflow-hidden card-xl superficie-chiara rounded-3xl border bg-brand-bianco shadow-xl shadow-black/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/15"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col border-b border-brand-bordo p-8 md:p-10 lg:min-h-[620px] lg:w-[min(100%,400px)] lg:shrink-0 lg:border-b-0 lg:border-r ">
            <div>
              <div>
                <span className="font-display text-[clamp(3.5rem,10vw,5.5rem)] font-bold leading-none text-brand-corallo tabular-nums">
                  {number}
                </span>
                <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold uppercase tracking-tight text-brand-corallo leading-tight mt-3 [&_span]:text-inherit">
                  {title}
                </h3>
                <div className="my-5 border-t border-brand-bordo" aria-hidden />
                <p className="font-display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold text-brand-nero leading-snug tracking-tight [&_span]:text-brand-corallo">
                  {intro}
                </p>
              </div>
            </div>

            {sidebarImage ? (
              <div className="relative mt-6 hidden min-h-[220px] flex-1 lg:block">
                <Image
                  src={sidebarImage}
                  alt={sidebarImageAlt ?? ""}
                  fill
                  className="object-contain object-bottom drop-shadow-sm"
                  sizes="400px"
                />
              </div>
            ) : null}

            <div>
              {/* Il colore scritto per esteso: sul mattone la classe
                  text-brand-corallo-text diventa evidenziatore e toglie il
                  padding al pulsante. */}
              <Link
                href="/contatti"
                className="mt-8 inline-flex w-fit max-w-full items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-brand-corallo bg-transparent px-4 py-2.5 text-[11px] font-bold normal-case text-[color:var(--color-brand-corallo-text)] shadow-sm transition-all duration-200 hover:bg-brand-corallo/10 sm:px-5 sm:text-xs lg:mt-auto"
              >
                Richiedi lo studio di fattibilità
                <svg
                  className="h-3.5 w-3.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-6 md:gap-5 md:p-8 lg:py-10">
            {/* Prima il problema, poi la soluzione accanto (REGOLE §5). */}
            <div className="flex items-start gap-3.5 rounded-2xl border border-brand-bordo bg-brand-bianco p-6 md:p-7">
              <span className="segno-no mt-0.5" aria-hidden>
                ✕
              </span>
              <div>
                <p className="eyebrow mb-1.5">Il problema</p>
                <p className="font-display text-[1.125rem] font-bold leading-snug text-brand-nero md:text-[1.3rem]">
                  {problema.titolo}
                </p>
                <p className="mt-2 leading-relaxed text-brand-grigio">{problema.testo}</p>
              </div>
            </div>
            <p className="eyebrow mt-2">Con Forge</p>
            {points.map((point, idx) => (
              <PointCard key={idx} {...point} />
            ))}
            {pratica && (
              <div className="rounded-2xl border-l-4 border-brand-corallo bg-brand-bianco px-6 py-5 shadow-sm">
                <p className="mb-3 font-display text-lg font-bold text-brand-nero">
                  {pratica.titolo}
                </p>
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
    </div>
  );
}
