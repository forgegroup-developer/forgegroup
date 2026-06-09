import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

export type ServiziTabPoint = {
  title: ReactNode;
  body: string;
};

type Props = {
  id: string;
  number: string;
  title: ReactNode;
  intro: ReactNode;
  imageSrc: string;
  imageAlt: string;
  points: ServiziTabPoint[];
};

function PointCard({ title, body, delay }: ServiziTabPoint & { delay: 0 | 1 | 2 | 3 }) {
  return (
    <Reveal delay={delay} y={18} duration={0.85}>
      <div className="group h-full rounded-2xl border border-brand-bordo bg-brand-bianco p-6 md:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-corallo/50 hover:shadow-lg hover:shadow-brand-corallo/10">
        <p className="font-display text-[1.125rem] md:text-[1.3rem] font-semibold text-brand-nero leading-snug tracking-tight [&_span]:text-brand-corallo">
          {title}
        </p>
        <div className="mt-4 flex items-start gap-3 border-t border-brand-pesca/40 pt-4">
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-corallo/10 text-brand-corallo text-sm font-bold"
            aria-hidden
          >
            ✦
          </span>
          <p className="text-brand-grigio leading-relaxed text-[15px] md:text-base">{body}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function ServiziTabCard({
  id,
  number,
  title,
  intro,
  imageSrc,
  imageAlt,
  points,
}: Props) {
  return (
    <Reveal y={32} duration={1}>
      <article
        id={id}
        className="scroll-mt-28 overflow-hidden rounded-3xl border border-white/20 bg-brand-bianco shadow-xl shadow-black/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/15"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex min-h-[520px] flex-col border-b border-brand-bordo p-8 md:p-10 lg:min-h-[580px] lg:w-[min(100%,400px)] lg:shrink-0 lg:border-b-0 lg:border-r lg:bg-brand-panna/50">
            <Reveal delay={0} y={20} duration={0.8}>
              <div>
                <span className="font-display text-[clamp(3.5rem,10vw,5.5rem)] font-bold leading-none text-brand-corallo tabular-nums">
                  {number}
                </span>
                <h2 className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold uppercase tracking-tight text-brand-corallo leading-tight mt-3 [&_span]:text-inherit">
                  {title}
                </h2>
                <div className="my-5 border-t border-brand-bordo" aria-hidden />
                <p className="font-display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold text-brand-nero leading-snug tracking-tight [&_span]:text-brand-corallo">
                  {intro}
                </p>
              </div>
            </Reveal>

            <div className="relative mt-4 min-h-[220px] flex-1 sm:min-h-[260px] lg:min-h-[300px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="pointer-events-none object-contain object-bottom scale-[1.18] origin-bottom"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>

            <Reveal delay={1} y={16} duration={0.75}>
              <Link
                href="/contatti"
                className="mt-6 inline-flex w-fit max-w-full items-center gap-1.5 whitespace-nowrap rounded-full border-2 border-brand-corallo bg-transparent px-4 py-2.5 text-[11px] font-bold normal-case text-brand-corallo shadow-sm transition-all duration-200 hover:bg-brand-corallo/10 sm:px-5 sm:text-xs"
              >
                Ottieni una consulenza gratuita
                <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-6 md:gap-5 md:p-8 lg:py-10">
            {points.map((point, idx) => (
              <PointCard key={idx} {...point} delay={(Math.min(idx, 3)) as 0 | 1 | 2 | 3} />
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
