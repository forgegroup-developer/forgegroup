import { faqs, type Faq } from "@/data/site";

/**
 * Lo schema deve corrispondere a quello che si vede in pagina: la home
 * mostra le sei di `faqsHome`, /servizi le mostra tutte. Per questo le
 * voci si passano dall'esterno invece di prendere sempre l'elenco intero.
 */
export default function JsonLdFAQ({ items = faqs }: { items?: Faq[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <script id="ld-faq" type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
  );
}
