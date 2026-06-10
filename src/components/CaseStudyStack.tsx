"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CaseStudyClientLogo from "@/components/CaseStudyClientLogo";
import { caseStudies } from "@/data/caseStudies";
import { getCaseStudyImage } from "@/data/images";

const NAV_OFFSET_REM = 5;
const STACK_STEP_REM = 1.25;
const SCROLL_VH_PER_CARD = 80;

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function ExcerptWithHighlights({
  text,
  highlights,
}: {
  text: string;
  highlights?: string[];
}) {
  if (!highlights?.length) return <>{text}</>;

  const pattern = highlights.map(escapeRegExp).join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "g")).filter((p) => p.length > 0);

  return (
    <>
      {parts.map((part, i) =>
        highlights.includes(part) ? (
          <span key={i} className="text-brand-corallo">
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
  return (
    <article className="w-full overflow-hidden rounded-3xl border border-brand-bordo bg-brand-bianco shadow-[0_24px_64px_-16px_rgba(17,17,17,0.2)] transition-shadow duration-300">
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-panna sm:aspect-video">
        <Image
          src={getCaseStudyImage(c.slug)}
          alt={c.shortTitle}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 896px"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-nero/70 via-brand-nero/15 to-transparent" />
        <span className="absolute top-4 left-4 z-10 rounded-full bg-brand-corallo px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-sm">
          {c.sector}
        </span>
        {c.resultHeadline && (
          <p className="absolute bottom-4 left-4 z-10 max-w-[70%] font-display text-xl font-semibold leading-tight text-white sm:text-2xl md:text-3xl">
            {c.resultHeadline}
          </p>
        )}
        {c.clientLogo && (
          <div className="absolute right-4 bottom-4 z-10">
            <CaseStudyClientLogo
              src={c.clientLogo}
              alt={c.clientLogoAlt ?? c.shortTitle}
              variant="circle"
              size="md"
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-7 md:py-6">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-grigio-light">
            {c.shortTitle}
          </p>
          <h3
            className="line-clamp-3 font-semibold text-base leading-snug text-brand-nero md:text-lg"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <ExcerptWithHighlights text={c.excerpt} highlights={c.excerptHighlights} />
          </h3>
        </div>

        <Link
          href={`/casi-studio/${c.slug}`}
          className="
            flex h-12 w-12 shrink-0 items-center justify-center rounded-full
            bg-brand-corallo shadow-md shadow-brand-corallo/30
            transition-all duration-200 ease-out
            hover:scale-110 hover:bg-brand-corallo-dark
          "
          aria-label={`Leggi caso studio ${c.shortTitle}`}
        >
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
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
      <div className="mx-auto max-w-4xl space-y-6 px-4 sm:px-6 lg:px-8">
        {caseStudies.map((c) => (
          <CaseStudyCard key={c.slug} c={c} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"
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
