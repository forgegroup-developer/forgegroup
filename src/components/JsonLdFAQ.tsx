import { faqs } from "@/data/site";

export default function JsonLdFAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
