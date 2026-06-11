"use client";

import { useState } from "react";
import GlowingEdgeCard from "@/components/GlowingEdgeCard";
import { testimonials } from "@/data/site";

export default function TestimonialSlider() {
  const [idx, setIdx] = useState(0);
  const total = testimonials.length;
  const t = testimonials[idx];

  const prev = () => setIdx((idx - 1 + total) % total);
  const next = () => setIdx((idx + 1) % total);

  return (
    <div className="max-w-4xl mx-auto">
      <GlowingEdgeCard
        className="rounded-2xl shadow-sm"
        innerClassName="bg-brand-bianco p-8 md:p-14 text-center"
      >
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <svg key={i} className="w-6 h-6 text-brand-corallo" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.075 9.101c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.518-4.674z" />
            </svg>
          ))}
        </div>

        <blockquote className="text-lg md:text-xl font-medium text-brand-nero leading-relaxed mb-8">
          &ldquo;{t.text}&rdquo;
        </blockquote>

        <div>
          <div className="font-semibold text-brand-nero">{t.author}</div>
          <div className="text-sm text-brand-corallo mt-1">
            {t.role} · {t.sector}
          </div>
        </div>
      </GlowingEdgeCard>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          aria-label="Recensione precedente"
          className="w-12 h-12 rounded-full border-2 border-brand-corallo text-brand-corallo hover:bg-brand-corallo hover:text-white transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Vai a recensione ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === idx ? "w-8 bg-brand-corallo" : "w-2 bg-brand-bordo"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Recensione successiva"
          className="w-12 h-12 rounded-full border-2 border-brand-corallo text-brand-corallo hover:bg-brand-corallo hover:text-white transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
