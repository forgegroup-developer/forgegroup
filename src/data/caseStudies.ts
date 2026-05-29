export type CaseStudy = {
  slug: string;
  sector: string;
  title: string;
  shortTitle: string;
  resultHeadline: string;
  excerpt: string;
  metaDescription: string;
  context: { label: string; value: string }[];
  challenge: string;
  diagnosis: string[];
  system: { step: string; title: string; description: string }[];
  results: { value: string; label: string; detail?: string }[];
  quote: { text: string; author: string; role: string };
  /** Frasi da evidenziare in corallo nell'anteprima carousel */
  excerptHighlights?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "software-b2b",
    sector: "Software B2B / SaaS",
    title: "Software B2B: €126.500 in 90 giorni",
    shortTitle: "Software B2B",
    resultHeadline: "€126.500 in 90 giorni",
    excerpt:
      "Come abbiamo generato €126.500 in 90 giorni mantenendo una spesa media ads di 500€.",
    excerptHighlights: ["€126.500", "90 giorni", "500€"],
    metaDescription:
      "Caso studio Software B2B: €126.500 di fatturato in 90 giorni con una spesa media ads di 500€ grazie al sistema Forge.",
    context: [
      { label: "Settore", value: "SaaS B2B (HR Tech)" },
      { label: "Dimensione", value: "12 dipendenti, fatturato 480K€" },
      { label: "Mercato", value: "Italia + Spagna" },
      { label: "Periodo", value: "90 giorni" },
    ],
    challenge:
      "L'azienda generava lead inbound da SEO ma il tasso di chiusura era sotto al 4%. I commerciali perdevano ore a parlare con curiosi senza budget. Il churn dei nuovi clienti era alto perché venivano firmati clienti non in target.",
    diagnosis: [
      "Lead in target solo per il 22% — il resto erano studenti, freelance, micro-imprese",
      "Nessun processo di prequalifica: si chiamavano tutti, sempre",
      "Demo prodotto generica, non collegata al pain del decision-maker",
      "Pricing pubblico in pagina che attirava la fascia più bassa del mercato",
    ],
    system: [
      {
        step: "01",
        title: "Riposizionamento e pricing",
        description:
          "Eliminato il piano da 19€/mese, creato un piano enterprise da 499€/mese con onboarding dedicato.",
      },
      {
        step: "02",
        title: "Form di prequalifica",
        description:
          "Implementato form con 8 domande chiave prima di concedere accesso alla demo: dimensione azienda, ruolo, budget.",
      },
      {
        step: "03",
        title: "Demo strutturata + sales script",
        description:
          "Creato script demo a 4 fasi (diagnosi, dimostrazione mirata, gestione obiezioni, closing) basato sui pain reali.",
      },
      {
        step: "04",
        title: "Campagne LinkedIn + Google",
        description:
          "Lanciate campagne mirate per HR Director e CFO di aziende 50–500 dipendenti con messaging diverso per ruolo.",
      },
    ],
    results: [
      { value: "€126.500", label: "Fatturato generato", detail: "Nei primi 90 giorni" },
      { value: "€500", label: "Spesa media mensile ads", detail: "Meta + Google" },
      { value: "90gg", label: "Time to result", detail: "Sistema attivato e scalato" },
    ],
    quote: {
      text: "Abbiamo smesso di vendere licenze e iniziato a vendere risultati. Il prezzo è triplicato e i clienti pagano volentieri perché capiscono cosa stanno comprando.",
      author: "Cliente SaaS HR Tech",
      role: "CEO & Founder",
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
