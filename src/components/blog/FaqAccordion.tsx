"use client";

import { useId, useState } from "react";
import type { ArticleFaq } from "@/data/articles";

type Props = {
  faqs: ArticleFaq[];
  title?: string;
};

export default function FaqAccordion({ faqs, title = "Domande frequenti" }: Props) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs.length) return null;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section className="mt-12 border-t border-brand-bordo pt-10">
      <script id={`ld-faq-${baseId}`} type="application/ld+json">
        {JSON.stringify(faqJsonLd)}
      </script>
      <h2 className="text-2xl font-semibold text-brand-nero mb-6">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <div
              key={faq.q}
              className="rounded-2xl border border-brand-bordo bg-brand-panna overflow-hidden"
            >
              <h3 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-brand-nero hover:bg-brand-pesca-light/30 transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{faq.q}</span>
                  <span
                    className={`shrink-0 text-brand-corallo text-xl transition-transform ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="px-5 pb-5 text-brand-grigio leading-relaxed"
              >
                {faq.a}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
