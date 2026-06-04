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
  /** Chiusura narrativa: cosa è successo dopo i primi 90 giorni */
  evolution?: string;
  /** URL della video recensione del caso studio, se disponibile */
  videoUrl?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "software-b2b",
    sector: "Software B2B",
    title: "Software B2B: €126.500 in 90 giorni",
    shortTitle: "Software B2B",
    resultHeadline: "€126.500 in 90 giorni",
    excerpt:
      "Come abbiamo portato DISA SRL da zero acquisizione a €126.500 in 90 giorni, con un costo per contatto di soli €1,48.",
    excerptHighlights: ["€126.500", "90 giorni", "€1,48"],
    metaDescription:
      "Caso studio Software B2B: come DISA SRL ha generato €126.500 in 90 giorni con il software SOS APPALTI, un costo per contatto di €1,48 e un sistema di acquisizione scalabile.",
    context: [
      { label: "Settore", value: "Software B2B" },
      { label: "Azienda", value: "DISA SRL — software SOS APPALTI" },
      { label: "Ticket medio", value: "Oltre 12.000€" },
      { label: "Mercato", value: "Italia" },
    ],
    challenge:
      "DISA SRL fatturava già oltre 1 milione di euro all'anno, ma trovava nuovi clienti solo con chiamate, referenze e passaparola. Non esisteva un sistema per intercettare chi non conosceva ancora SOS APPALTI: i commerciali percorrevano anche più di 50 km per appuntamenti con persone che non sapevano nemmeno cosa fosse il software, né perché potesse servire alla loro attività.",
    diagnosis: [
      "Nessun canale di acquisizione prevedibile: tutto dipendeva da passaparola e referenze personali",
      "Contatti non consapevoli: chi incontravano non conosceva il software né ne percepiva l'utilità",
      "Commerciali in trasferta su appuntamenti senza reale interesse, con tassi di chiusura bassi",
      "Mercato di fatto limitato al territorio vicino, impossibile da scalare",
    ],
    system: [
      {
        step: "01",
        title: "Comunicazione & posizionamento",
        description:
          "Riscritto il modo in cui SOS APPALTI si presenta online: messaggi chiari su cosa fa, per chi e perché conviene, così chi arriva capisce subito il valore del software.",
      },
      {
        step: "02",
        title: "Contenuti professionali",
        description:
          "Prodotto video professionali e infografiche con il nostro videomaker per spiegare il software e costruire fiducia prima ancora del contatto commerciale.",
      },
      {
        step: "03",
        title: "Sistema di acquisizione Meta Ads",
        description:
          "Individuato e costruito un metodo di lead generation su Meta, con gestione ottimale del budget mensile e campagne mirate per intercettare aziende davvero in target.",
      },
      {
        step: "04",
        title: "Form di qualifica",
        description:
          "Campagne con form per raccogliere le informazioni chiave: al commerciale arrivano contatti già consapevoli e interessati, non più nomi a freddo.",
      },
      {
        step: "05",
        title: "Lancio geolocalizzato & scala",
        description:
          "Partenza su un'area a 250 km dalla sede per validare il sistema, oggi pronto a essere replicato e scalato in tutta Italia.",
      },
    ],
    results: [
      { value: "€126.500", label: "Fatturato generato", detail: "Nei primi 90 giorni" },
      { value: "€1,48", label: "Costo per contatto", detail: "Fino a max €3 nei primi mesi" },
      { value: "~550", label: "Contatti generati", detail: "Già consapevoli e in target" },
      { value: "€350.000+", label: "Fatturato ad oggi", detail: "Cliente attivo, ancora in crescita" },
    ],
    quote: {
      text: "126.500€ di fatturato, non me lo aspettavo. Ero scettico all'inizio: questo metodo per me ha funzionato. Lo consiglio a tutte le aziende che vogliono crescere sul mercato.",
      author: "DISA SRL",
      role: "CEO & Founder · Software B2B",
    },
    evolution:
      "I 126.500€ sono arrivati nei primi 90 giorni. Ma DISA è ancora oggi nostro cliente e ha già superato i 350.000€ di fatturato. Non dipende più dal passaparola: lavora solo con le campagne di acquisizione. I commerciali parlano con clienti già interessati, che sanno di cosa si parla e sono pronti a fissare appuntamenti: il tasso di chiusura è cresciuto e vendere SOS APPALTI è diventato più semplice. Il risultato è un sistema funzionante, testato e di proprietà dell'azienda, pronto a essere scalato in tutta Italia senza più vincoli di territorio.",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
