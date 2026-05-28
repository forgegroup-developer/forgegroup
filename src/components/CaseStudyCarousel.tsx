"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "@/data/caseStudies";
import { getCaseStudyImage } from "@/data/images";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const DUR = 340;
const GAP = 24; // gap-6

export default function CaseStudyCarousel() {
  const total = caseStudies.length;
  // Triple-clone for seamless infinite loop
  const items = [...caseStudies, ...caseStudies, ...caseStudies];

  // rawIdx tracks position in the 3x array; starts at middle set
  const rawIdxRef = useRef(total);
  const [rawIdx, setRawIdxState] = useState(total);
  const [animated, setAnimated] = useState(true);
  const blocked = useRef(false);

  const setRawIdx = useCallback((v: number) => {
    rawIdxRef.current = v;
    setRawIdxState(v);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (blocked.current) return;
      setRawIdx(rawIdxRef.current + dir);
    },
    [setRawIdx]
  );

  /** After transform transition ends, silently jump back to middle clone set */
  const onTransEnd = useCallback(
    (e: React.TransitionEvent) => {
      if (e.propertyName !== "transform") return;
      const cur = rawIdxRef.current;
      if (cur >= 2 * total) {
        blocked.current = true;
        setAnimated(false);
        setRawIdx(cur - total);
      } else if (cur <= 0) {
        blocked.current = true;
        setAnimated(false);
        setRawIdx(cur + total);
      }
    },
    [total, setRawIdx]
  );

  // Re-enable animation after instant jump (double RAF to guarantee DOM update)
  useEffect(() => {
    if (!animated) {
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimated(true);
          blocked.current = false;
        })
      );
      return () => cancelAnimationFrame(id);
    }
  }, [animated]);

  // --- Measurement ---
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [unit, setUnit] = useState(0);       // cardW + GAP
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const wrap = wrapRef.current;
      if (!track || !wrap) return;
      const firstCard = track.firstElementChild as HTMLElement | null;
      if (!firstCard) return;
      setUnit(firstCard.offsetWidth + GAP);
      setContainerW(wrap.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // translateX to keep rawIdx card perfectly centered
  const cardW = unit > 0 ? unit - GAP : 0;
  const tx = unit > 0 ? containerW / 2 - rawIdx * unit - cardW / 2 : 0;

  const activeReal = ((rawIdx % total) + total) % total;

  return (
    <div ref={wrapRef} className="relative overflow-hidden py-4">

      {/* ── Navigation arrows ── centered vertically on image area ── */}
      <div
        className="
          absolute z-10 pointer-events-none
          left-4 right-4
          md:left-[calc(50%-min(26vw,360px)-32px)]
          md:right-[calc(50%-min(26vw,360px)-32px)]
        "
        style={{ top: 0, bottom: "92px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <button
          onClick={() => go(-1)}
          className="
            pointer-events-auto
            w-12 h-12 md:w-14 md:h-14 rounded-full
            bg-brand-bianco border-2 border-brand-bordo shadow-xl
            flex items-center justify-center
            text-brand-nero hover:border-brand-corallo hover:text-brand-corallo
            transition-all duration-100 ease-in-out hover:scale-110
          "
          aria-label="Caso studio precedente"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => go(1)}
          className="
            pointer-events-auto
            w-12 h-12 md:w-14 md:h-14 rounded-full
            bg-brand-bianco border-2 border-brand-bordo shadow-xl
            flex items-center justify-center
            text-brand-nero hover:border-brand-corallo hover:text-brand-corallo
            transition-all duration-100 ease-in-out hover:scale-110
          "
          aria-label="Caso studio successivo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* ── Track ── */}
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{
          gap: `${GAP}px`,
          transform: `translateX(${tx}px)`,
          transition: animated ? `transform ${DUR}ms ${EASE}` : "none",
        }}
        onTransitionEnd={onTransEnd}
      >
        {items.map((c, i) => {
          const isActive = i === rawIdx;
          return (
            <article
              key={`${c.slug}-${i}`}
              className="flex-shrink-0 w-[82vw] md:w-[52vw] lg:w-[46vw] rounded-3xl overflow-hidden bg-brand-bianco border border-brand-bordo shadow-sm"
              style={{
                opacity: isActive ? 1 : 0.48,
                transform: `scale(${isActive ? 1 : 0.95})`,
                transition: `opacity ${DUR}ms ${EASE}, transform ${DUR}ms ${EASE}`,
              }}
            >
              {/* ── Image area (top) ── */}
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-panna">
                <Image
                  src={getCaseStudyImage(c.slug)}
                  alt={c.shortTitle}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 82vw, 52vw"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-nero/30 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.18em] text-white font-bold bg-brand-nero/40 backdrop-blur-sm px-3 py-1 rounded-full">
                  {c.sector}
                </span>
              </div>

              {/* ── Metadata row (bottom) ── */}
              <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5">
                <div className="min-w-0">
                  <h3 className="font-bold text-brand-nero text-base md:text-lg leading-tight truncate">
                    {c.shortTitle}
                  </h3>
                  <p className="text-brand-grigio text-sm mt-0.5 truncate">{c.resultHeadline}</p>
                </div>

                {/* Circular arrow button */}
                <Link
                  href={`/casi-studio/${c.slug}`}
                  className="
                    shrink-0 w-11 h-11 rounded-full
                    bg-brand-corallo
                    flex items-center justify-center
                    hover:scale-110 hover:bg-brand-corallo-dark
                    transition-all duration-100 ease-in-out
                    shadow-md shadow-brand-corallo/30
                  "
                  aria-label={`Leggi caso studio ${c.shortTitle}`}
                  tabIndex={isActive ? 0 : -1}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── Dots indicator ── */}
      <div className="flex justify-center items-center gap-2.5 mt-8">
        {caseStudies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (blocked.current) return;
              const diff = idx - activeReal;
              setRawIdx(rawIdxRef.current + diff);
            }}
            className={`transition-all duration-300 rounded-full ${
              idx === activeReal
                ? "w-8 h-2.5 bg-brand-corallo"
                : "w-2.5 h-2.5 bg-brand-bordo hover:bg-brand-pesca"
            }`}
            aria-label={`Vai al caso studio ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
