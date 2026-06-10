"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";
import { getCaseStudyImage } from "@/data/images";

const NAV_OFFSET_REM = 5;
const STACK_STEP_REM = 1.25;
const SCROLL_VH_PER_CARD = 85;

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function ExcerptWithHighlights({
  text,
  highlights,
  highlightClassName = "text-brand-corallo",
}: {
  text: string;
  highlights?: string[];
  highlightClassName?: string;
}) {
  if (!highlights?.length) return <>{text}</>;

  const pattern = highlights.map(escapeRegExp).join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "g")).filter((p) => p.length > 0);

  return (
    <>
      {parts.map((part, i) =>
        highlights.includes(part) ? (
          <span key={i} className={highlightClassName}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function CaseStudyCard({
  c,
  index,
  total,
}: {
  c: (typeof caseStudies)[number];
  index: number;
  total: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <article className="flex w-full min-h-[300px] flex-col overflow-hidden rounded-3xl border border-brand-bordo bg-brand-bianco shadow-[0_24px_64px_-16px_rgba(17,17,17,0.2)] transition-shadow duration-300 md:min-h-[340px] md:flex-row lg:min-h-[380px]">
      {/* Immagine — sinistra su desktop */}
      <div className="relative h-52 w-full shrink-0 bg-brand-panna md:h-auto md:min-h-[340px] md:w-[55%] lg:min-h-[380px]">
        <Image
          src={getCaseStudyImage(c.slug)}
          alt={c.shortTitle}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 55vw"
          draggable={false}
        />
      </div>

      {/* Contenuto — destra su desktop */}
      <div className="relative flex flex-1 flex-col p-6 md:w-[45%] md:p-8 lg:p-10 bg-brand-nero">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full bg-brand-corallo/15 blur-3xl"
        />

        <div className="relative mb-5 flex items-center justify-between gap-4 md:mb-6">
          <span className="rounded-full border border-brand-corallo/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-pesca-light">
            {c.sector}
          </span>
          <span className="text-sm font-medium tabular-nums text-white/40">
            {num} / {totalStr}
          </span>
        </div>

        <h3
          className="relative mb-3 font-display text-xl font-semibold leading-tight text-white md:text-2xl lg:text-[1.75rem]"
        >
          {c.resultHeadline}
        </h3>

        <p className="relative flex-1 text-sm leading-relaxed text-white/75 md:text-[15px] lg:text-base">
          <ExcerptWithHighlights
            text={c.excerpt}
            highlights={c.excerptHighlights}
            highlightClassName="font-semibold text-brand-pesca-light"
          />
        </p>

        {c.excerptHighlights && c.excerptHighlights.length > 0 && (
          <div className="relative mt-4 flex flex-wrap gap-2">
            {c.excerptHighlights.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="relative mt-6 border-t border-white/10 pt-5 md:mt-8">
          <Link
            href={`/casi-studio/${c.slug}`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-brand-pesca-light"
          >
            Vedi il caso studio
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CaseStudyStack() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const total = caseStudies.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reducedMotion) {
    return (
      <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
        {caseStudies.map((c, i) => (
          <CaseStudyCard key={c.slug} c={c} index={i} total={total} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
      style={{ height: `${caseStudies.length * SCROLL_VH_PER_CARD}vh` }}
    >
      {caseStudies.map((c, i) => (
        <div
          key={c.slug}
          className="sticky flex items-start justify-center"
          style={{
            top: `calc(${NAV_OFFSET_REM}rem + ${i * STACK_STEP_REM}rem)`,
            zIndex: i + 1,
            minHeight: `${SCROLL_VH_PER_CARD}vh`,
          }}
        >
          <CaseStudyCard c={c} index={i} total={total} />
        </div>
      ))}
    </div>
  );
}
