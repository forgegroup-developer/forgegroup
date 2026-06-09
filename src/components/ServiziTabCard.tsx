import Link from "next/link";
import Reveal from "@/components/Reveal";

export type ServiziTabPoint = {
  title: string;
  body: string;
};

type Props = {
  id: string;
  number: string;
  title: string;
  intro: string;
  points: ServiziTabPoint[];
};

function PointCard({ title, body, delay }: ServiziTabPoint & { delay: 0 | 1 | 2 | 3 }) {
  return (
    <Reveal delay={delay} y={18} duration={0.85}>
      <div className="group h-full rounded-2xl border border-brand-bordo bg-brand-bianco p-6 md:p-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-corallo/50 hover:shadow-lg hover:shadow-brand-corallo/10">
        <p className="font-display text-[1.125rem] md:text-[1.3rem] font-semibold text-brand-nero leading-snug tracking-tight">
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

export default function ServiziTabCard({ id, number, title, intro, points }: Props) {
  return (
    <Reveal y={32} duration={1}>
      <article
        id={id}
        className="scroll-mt-28 overflow-hidden rounded-3xl border border-white/20 bg-brand-bianco shadow-xl shadow-black/10 transition-shadow duration-500 hover:shadow-2xl hover:shadow-black/15"
      >
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col justify-between gap-8 border-b border-brand-bordo p-8 md:p-10 lg:w-[min(100%,360px)] lg:shrink-0 lg:border-b-0 lg:border-r lg:bg-brand-panna/50">
            <Reveal delay={0} y={20} duration={0.8}>
              <div>
                <span className="text-brand-corallo font-bold text-xs uppercase tracking-[0.22em]">
                  {number} · {title}
                </span>
                <p className="font-display text-[clamp(1.35rem,2.5vw,1.75rem)] font-semibold text-brand-nero mt-5 leading-snug tracking-tight">
                  {intro}
                </p>
              </div>
            </Reveal>
            <Reveal delay={1} y={16} duration={0.75}>
              <Link
                href="/contatti"
                className="btn-corallo inline-flex w-full sm:w-fit items-center justify-center px-6 py-3 text-sm"
              >
                Ottieni una consulenza gratuita
              </Link>
            </Reveal>
          </div>

          <div className="flex flex-1 flex-col gap-4 p-6 md:gap-5 md:p-8 lg:py-10">
            {points.map((point, idx) => (
              <PointCard key={point.title} {...point} delay={(Math.min(idx, 3)) as 0 | 1 | 2 | 3} />
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
