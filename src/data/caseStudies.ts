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
  {
    slug: "edilizia",
    sector: "Edilizia High-Ticket",
    title: "Edilizia: €850K di pipeline in 90 giorni",
    shortTitle: "Edilizia High-Ticket",
    resultHeadline: "€850K di Pipeline in 90 Giorni",
    excerpt:
      "Generazione di appalti qualificati B2B per un'impresa edile specializzata in ristrutturazioni commerciali.",
    metaDescription:
      "Caso studio Edilizia: €850K di pipeline qualificata generata in 90 giorni per un'impresa edile high-ticket.",
    context: [
      { label: "Settore", value: "Edilizia B2B (ristrutturazioni commerciali)" },
      { label: "Dimensione", value: "8 dipendenti + indotto, fatturato 1.2M€" },
      { label: "Mercato", value: "Campania + Lazio" },
      { label: "Periodo", value: "90 giorni" },
    ],
    challenge:
      "Storicamente l'azienda lavorava solo su passaparola. Quando il volume si è fermato, l'imprenditore ha provato annunci Facebook che hanno generato richieste da privati senza budget. Zero appalti commerciali in 4 mesi.",
    diagnosis: [
      "Pubblico sbagliato: campagne aperte a chiunque invece di solo property manager e proprietari di immobili commerciali",
      "Nessuna riprova sociale dei lavori grandi (solo foto di interventi piccoli)",
      "Mancanza di contenuto educativo sul perché scegliere chi è strutturato",
      "Preventivi fatti a vuoto senza qualificare budget e tempi",
    ],
    system: [
      {
        step: "01",
        title: "Posizionamento high-ticket",
        description:
          "Riscritto il messaggio: 'partner per ristrutturazioni commerciali superiori a 80K€'. Eliminato tutto il resto.",
      },
      {
        step: "02",
        title: "Landing + portfolio premium",
        description:
          "Creata landing dedicata con portfolio di 12 progetti grandi, certificazioni, processo di lavoro e tempi garantiti.",
      },
      {
        step: "03",
        title: "Campagne mirate Meta + Google Local",
        description:
          "Targeting solo decision-maker B2B in Campania e Lazio, con form di qualificazione su tipo di immobile e budget.",
      },
      {
        step: "04",
        title: "Sopralluogo a pagamento",
        description:
          "Introdotto un sopralluogo tecnico a 290€ scontato a 0 in caso di firma. Filtra automaticamente chi non è serio.",
      },
    ],
    results: [
      { value: "€850K", label: "Pipeline qualificato in 90 giorni" },
      { value: "23", label: "Sopralluoghi tecnici prenotati" },
      { value: "5", label: "Contratti chiusi (ticket medio 165K€)" },
    ],
    quote: {
      text: "Per la prima volta abbiamo iniziato a scegliere noi i clienti, non il contrario. Quest'anno chiudiamo con il margine più alto della nostra storia.",
      author: "Cliente Edilizia",
      role: "Amministratore Unico",
    },
  },
  {
    slug: "hotel-hospitality",
    sector: "Hotel & Hospitality",
    title: "Hotel: -40% costo acquisizione gruppo alberghiero",
    shortTitle: "Hotel & Hospitality",
    resultHeadline: "-40% Costo Acquisizione Cliente",
    excerpt:
      "Ottimizzazione del funnel di acquisizione B2B per un piccolo gruppo alberghiero del Sud Italia.",
    metaDescription:
      "Caso studio Hotel & Hospitality: -40% sul costo di acquisizione cliente per un gruppo alberghiero italiano.",
    context: [
      { label: "Settore", value: "Hospitality (3 strutture 4★)" },
      { label: "Dimensione", value: "35 dipendenti, fatturato 2.4M€" },
      { label: "Mercato", value: "Sud Italia (Costiera + Cilento)" },
      { label: "Periodo", value: "4 mesi" },
    ],
    challenge:
      "Il gruppo dipendeva pesantemente da OTA come Booking, pagando commissioni del 18–22%. I tentativi di disintermediare via Google Ads erano falliti perché il sito non convertiva e il costo per prenotazione superava il margine.",
    diagnosis: [
      "Sito vetrina datato con prenotazione su pagina esterna (drop-off 78%)",
      "Nessuna strategia di acquisizione diretta",
      "Mancanza di pacchetti differenziati per segmenti (coppie, famiglie, gruppi business)",
      "Zero retargeting o email marketing sui visitatori del sito",
    ],
    system: [
      {
        step: "01",
        title: "Restyling pagine prenotazione",
        description:
          "Nuove landing per segmento con motore di prenotazione integrato, vantaggi diretti vs OTA e urgenza dinamica.",
      },
      {
        step: "02",
        title: "Campagne Meta + Google segmentate",
        description:
          "3 campagne separate (coppie weekend, famiglie estate, eventi corporate) con creatività e budget dedicati.",
      },
      {
        step: "03",
        title: "Sistema email + WhatsApp",
        description:
          "Sequenza di nurturing post-richiesta info e remarketing a chi abbandona il carrello prenotazione.",
      },
      {
        step: "04",
        title: "Dashboard ROAS",
        description:
          "Cruscotto in tempo reale per monitorare costo per prenotazione diretta vs costo OTA per ogni segmento.",
      },
    ],
    results: [
      { value: "-40%", label: "Costo per acquisizione cliente" },
      { value: "+58%", label: "Prenotazioni dirette via sito" },
      { value: "-32%", label: "Dipendenza da OTA in 4 mesi" },
    ],
    quote: {
      text: "Finalmente abbiamo i numeri sotto controllo. Sappiamo esattamente quanto ci costa ogni cliente, da quale canale arriva e quanto margine ci porta. Non vivo più alla giornata.",
      author: "Cliente Gruppo Alberghiero",
      role: "Direttore Generale",
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
