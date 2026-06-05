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
      <div className="group h-full rounded-2xl border border-brand-bordo bg-brand-panna/80 p-6 md:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-corallo/45 hover:shadow-lg hover:shadow-brand-corallo/10">
        <p className="font-semibold text-brand-nero mb-2 leading-snug">{title}</p>
        <p className="text-brand-grigio leading-relaxed text-[15px]">{body}</p>
      </div>
    </Reveal>
  );
}

export default function ServiziTabCard({ id, number, title, intro, points }: Props) {
  return (
    <Reveal y={32} duration={1}>
      <article
        id={id}
        className="scroll-mt-28 overflow-hidden rounded-3xl border border-brand-bordo/80 bg-brand-bianco shadow-xl shadow-brand-nero/5 transition-shadow duration-500 hover:shadow-2xl hover:shadow-brand-corallo/10"
      >
        <div className="flex flex-col lg:flex-row lg:min-h-[320px]">
          <div className="flex flex-col justify-between gap-6 border-b border-brand-bordo p-8 md:p-10 lg:w-[min(100%,340px)] lg:shrink-0 lg:border-b-0 lg:border-r lg:bg-brand-panna/40">
            <Reveal delay={0} y={20} duration={0.8}>
              <div>
                <span className="text-brand-corallo font-bold text-sm uppercase tracking-[0.2em]">
                  {number}
                </span>
                <h2 className="heading-section !text-brand-nero mt-3 mb-4 leading-tight">{title}</h2>
                <p className="body-lg !text-brand-grigio">{intro}</p>
              </div>
            </Reveal>
            <Reveal delay={1} y={16} duration={0.75}>
              <Link
                href="/contatti"
                className="inline-flex w-full sm:w-fit items-center justify-center gap-1.5 rounded-full border-2 border-brand-corallo bg-transparent px-5 py-2.5 text-sm font-bold normal-case text-brand-corallo shadow-sm transition-all duration-200 hover:bg-brand-corallo/10"
              >
                Ottieni una consulenza gratuita
              </Link>
            </Reveal>
          </div>

          <div className="grid flex-1 gap-4 p-6 md:gap-5 md:p-8 sm:grid-cols-2 content-center">
            {points.map((point, idx) => (
              <div
                key={point.title}
                className={
                  idx === points.length - 1 && points.length % 2 !== 0 ? "sm:col-span-2" : undefined
                }
              >
                <PointCard {...point} delay={(Math.min(idx, 3)) as 0 | 1 | 2 | 3} />
              </div>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
