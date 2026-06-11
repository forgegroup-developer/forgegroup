"use client";

import { useState } from "react";
import GlowingEdgeCard from "@/components/GlowingEdgeCard";
import { faqs } from "@/data/site";

type FAQItem = { q: string; a: string };

type Props = {
  items?: FAQItem[];
  /** Card bianche su sfondo corallo */
  onCoral?: boolean;
};

export default function FAQAccordion({ items = faqs, onCoral = false }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((f, idx) => {
        const isOpen = openIdx === idx;
        return (
          <GlowingEdgeCard
            key={idx}
            className="rounded-2xl"
            innerClassName={`overflow-hidden transition-all duration-300 ${
              isOpen
                ? onCoral
                  ? "!border-brand-corallo bg-brand-bianco shadow-md"
                  : "!border-brand-corallo bg-brand-pesca-light"
                : onCoral
                  ? "!border-white/35 bg-brand-bianco/95 shadow-sm"
                  : "bg-brand-bianco"
            }`}
          >
            <button
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-brand-nero text-lg">{f.q}</span>
              <span
                className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen
                    ? "border-brand-corallo bg-brand-corallo text-white rotate-45"
                    : "border-brand-bordo text-brand-grigio"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </span>
            </button>
            <div className={`accordion-content ${isOpen ? "open" : ""}`}>
              <div>
                <div className="px-6 pb-6 text-brand-grigio leading-relaxed">{f.a}</div>
              </div>
            </div>
          </GlowingEdgeCard>
        );
      })}
    </div>
  );
}
