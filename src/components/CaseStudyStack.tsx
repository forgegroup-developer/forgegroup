"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";
import {
  getCaseStudyImage,
  getCaseStudyImageFit,
  getCaseStudyImagePosition,
} from "@/data/images";

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

function CaseStudyCard({ c }: { c: (typeof caseStudies)[number] }) {
  const imageFit = getCaseStudyImageFit(c.slug);

  return (
    <article className="flex h-[480px] w-full flex-col overflow-hidden rounded-3xl border border-brand-bordo bg-brand-bianco shadow-[0_24px_64px_-16px_rgba(17,17,17,0.2)] transition-shadow duration-300 md:h-[400px] md:flex-row">
      {/* Immagine — sinistra su desktop */}
      <div className="relative h-[200px] w-full shrink-0 overflow-hidden bg-brand-corallo md:h-full md:w-[55%]">
        <Image
          src={getCaseStudyImage(c.slug)}
          alt={c.shortTitle}
          fill
          className={`z-[1] object-center ${
            imageFit === "contain" ? "object-contain" : "object-cover"
          }`}
          style={{ objectPosition: getCaseStudyImagePosition(c.slug) }}
          sizes="(max-width: 768px) 100vw, 55vw"
          quality={95}
          unoptimized
          draggable={false}
        />
        <div
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-brand-corallo/10 via-transparent to-brand-corallo/35"
          aria-hidden
        />
      </div>

      {/* Contenuto — destra su desktop */}
      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-brand-corallo p-6 md:w-[45%] md:p-8">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full bg-white/10 blur-3xl"
        />

        <div className="relative mb-4 shrink-0">
          <span className="rounded-full border border-white/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            {c.sector}
          </span>
        </div>

        <h3 className="relative mb-2 line-clamp-2 shrink-0 font-display text-xl font-semibold leading-tight text-white md:text-2xl">
          {c.resultHeadline}
        </h3>

        <p className="relative shrink-0 text-sm leading-relaxed text-white/90 md:text-[15px]">
          <ExcerptWithHighlights
            text={c.excerpt}
            highlights={c.excerptHighlights}
            highlightClassName="font-semibold text-brand-pesca-light"
          />
        </p>

        <div className="relative mt-auto shrink-0 border-t border-white/20 pt-4">
          <Link
            href={`/casi-studio/${c.slug}`}
            className="group inline-flex w-fit items-center gap-2 rounded-full border-2 border-white/55 bg-white/15 px-5 py-2.5 text-sm font-bold text-white shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/25"
          >
            Vedi il caso studio
            <svg
              className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
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
    </article>
  );
}

export default function CaseStudyStack() {
  const [reducedMotion, setReducedMotion] = useState(false);
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
          <CaseStudyCard key={c.slug} c={c} />
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
          <CaseStudyCard c={c} />
        </div>
      ))}
    </div>
  );
}
