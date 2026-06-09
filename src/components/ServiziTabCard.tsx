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
                <h2 className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold uppercase tracking-tight text-brand-corallo leading-tight mt-3">
                  {title}
                </h2>
                <div className="my-5 border-t border-brand-bordo" aria-hidden />
                <p className="font-display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold text-brand-nero leading-snug tracking-tight [&_span]:text-brand-corallo">
                  {intro}
                </p>
              </div>
            </Reveal>

            <div className="relative mt-6 min-h-[120px] flex-1 md:min-h-[160px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="pointer-events-none object-contain object-bottom"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>

            <Reveal delay={1} y={16} duration={0.75}>
              <Link
                href="/contatti"
                className="btn-ghost-coral mt-6 inline-flex w-full shrink-0 items-center justify-between gap-3 px-6 py-3 text-sm normal-case tracking-normal sm:w-full"
              >
                <span className="flex flex-col items-start leading-tight text-left">
                  <span className="text-sm font-bold uppercase tracking-wide">Ottieni</span>
                  <span className="text-xs font-semibold normal-case tracking-normal opacity-90">
                    una consulenza gratuita
                  </span>
                </span>
                <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
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
