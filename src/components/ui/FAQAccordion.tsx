"use client";

import { useId, useState } from "react";
import { faqs, type Faq } from "@/data/site";

type Props = {
  items?: Faq[];
  /** Card bianche su sfondo corallo */
  onCoral?: boolean;
};

export default function FAQAccordion({ items = faqs, onCoral = false }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  /* Le domande possono comparire su piu' pagine, e due accordion nella
     stessa pagina genererebbero id uguali: useId da' un prefisso suo a
     ogni istanza. */
  const base = useId();

  return (
    <div className="space-y-3">
      {items.map((f, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div
            key={idx}
            className={`superficie-chiara border rounded-2xl overflow-hidden transition-all duration-300 ${
              isOpen
                ? onCoral
                  ? "border-brand-corallo bg-brand-bianco shadow-md"
                  : "border-brand-corallo bg-brand-pesca-light"
                : onCoral
                  ? "border-white/35 bg-brand-bianco/95 shadow-sm"
                  : "border-brand-bordo bg-brand-bianco"
            }`}
          >
            <h3 className="m-0">
              <button
                id={`${base}-d${idx}`}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
                aria-controls={`${base}-r${idx}`}
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
            </h3>
            {/* La risposta chiusa sparisce all'occhio con
                grid-template-rows: 0fr, ma senza inert resterebbe
                nell'albero di accessibilita': un lettore di schermo
                leggerebbe tutte le risposte come se fossero aperte, e
                col Tab si finirebbe dentro un pannello invisibile.
                inert la toglie da tutti e due i giri senza rompere
                l'animazione, che display:none invece bloccherebbe. */}
            <div
              id={`${base}-r${idx}`}
              role="region"
              aria-labelledby={`${base}-d${idx}`}
              inert={!isOpen}
              className={`accordion-content ${isOpen ? "open" : ""}`}
            >
              <div>
                <div className="px-6 pb-6 text-brand-grigio leading-relaxed">{f.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
