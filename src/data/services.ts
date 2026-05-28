export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  subServices: { name: string; description: string; notes?: string[] }[];
  comparisonItems: { withoutForge: string; withForge: string }[];
  faqs: { q: string; a: string }[];
  whatsIncluded: string[];
  results: { value: string; label: string }[];
  forWho: string[];
};

export const services: Service[] = [
  {
    slug: "advertising-lead-generation",
    shortTitle: "Advertising & Lead Gen",
    title: "Advertising & Lead Generation",
    tagline: "Meta Ads, Google Ads, funnel e lead qualificati.",
    description:
      "Costruiamo acquisizione prevedibile con campagne e funnel orientati a contatti commercialmente utili, non volume vuoto.",
    heroHeadline: "Più Opportunità Vere, Meno Lead Inutili.",
    heroSubheadline:
      "Uniamo Meta Ads, Google Ads e funnel di conversione per creare un sistema di lead generation stabile, tracciato e scalabile.",
    subServices: [
      {
        name: "META ADS",
        description:
          "Creazione, gestione e ottimizzazione campagne Meta per generare contatti qualificati.",
        notes: ["Budget pubblicitario mensile: €________"],
      },
      {
        name: "GOOGLE ADS",
        description:
          "Campagne Search e Display per intercettare domanda attiva su Google.",
        notes: ["Budget pubblicitario mensile: €________"],
      },
      {
        name: "LANDING PAGE & FUNNEL",
        description:
          "Landing conversion-focused con form e sequenza di gestione lead fino alla fase commerciale.",
      },
    ],
    comparisonItems: [
      {
        withoutForge: "Campagne attive senza strategia di conversione",
        withForge: "Campagne + funnel con KPI commerciali reali",
      },
      {
        withoutForge: "Lead non filtrati e basso tasso di risposta",
        withForge: "Contatti prequalificati prima del passaggio al sales team",
      },
      {
        withoutForge: "Report di vanity metrics",
        withForge: "Report su CPL, CPQL, tasso di chiusura e ROI",
      },
    ],
    whatsIncluded: [
      "Setup e gestione Meta Ads",
      "Setup e gestione Google Ads",
      "Landing page + funnel di acquisizione",
      "Monitoraggio KPI e ottimizzazione continua",
    ],
    faqs: [
      {
        q: "Quanto budget pubblicitario serve per partire?",
        a: "Definiamo il budget in base a ticket medio, area geografica e obiettivi. In genere partiamo con budget test sostenibile e poi scaliamo sui canali migliori.",
      },
      {
        q: "In quanto tempo vedo i primi lead qualificati?",
        a: "Prime indicazioni nei primi 30 giorni. Dati stabili e ottimizzazione concreta in 60-90 giorni.",
      },
    ],
    results: [
      { value: "-35%", label: "Costo lead qualificato medio" },
      { value: "+2.4x", label: "Appuntamenti commerciali utili" },
      { value: "90gg", label: "Stabilizzazione canali acquisizione" },
    ],
    forWho: [
      "Aziende che vogliono pipeline prevedibile",
      "Imprese con team commerciale attivo",
      "Business pronti a investire in ads in modo strutturato",
    ],
  },
  {
    slug: "social-media-contenuti",
    shortTitle: "Social & Content",
    title: "Social Media & Contenuti",
    tagline: "Posizionamento, contenuti e produzione video orientata conversione.",
    description:
      "Gestiamo presenza social, contenuti e nurturing per aumentare credibilità, attenzione e qualità percepita del brand.",
    heroHeadline: "Brand Forte. Contenuti Coerenti. Fiducia Più Alta.",
    heroSubheadline:
      "Dalla sistemazione profili alla produzione continuativa, creiamo asset social che supportano marketing e reparto commerciale.",
    subServices: [
      {
        name: "SOCIAL SET UP",
        description:
          "Restyling completo profili social: bio, immagine, highlights, feed e identità visiva.",
      },
      {
        name: "SOCIAL MANAGEMENT",
        description:
          "Gestione continuativa canali con piano editoriale e produzione contenuti.",
        notes: ["N° Post al mese: ___", "N° Storie al mese: ___", "N° Reel/Video al mese: ___"],
      },
      {
        name: "VIDEOMAKER",
        description: "Produzione video professionali per social, ads o presentazioni aziendali.",
        notes: ["N° video inclusi: ____"],
      },
      {
        name: "EMAIL MARKETING & AUTOMAZIONI",
        description:
          "Sequenze automatiche per nurturing lead, follow-up commerciale e fidelizzazione clienti.",
      },
    ],
    comparisonItems: [
      {
        withoutForge: "Canali social incoerenti e senza strategia",
        withForge: "Piano editoriale allineato al posizionamento commerciale",
      },
      {
        withoutForge: "Contenuti casuali, poco riutilizzabili",
        withForge: "Contenuti modulari per social, ads ed email",
      },
      {
        withoutForge: "Lead freddi senza follow-up",
        withForge: "Flussi email automatici di nurturing e reattivazione",
      },
    ],
    whatsIncluded: [
      "Social set up completo",
      "Gestione mensile social",
      "Produzione contenuti video",
      "Automazioni email marketing",
    ],
    faqs: [
      {
        q: "Posso attivare solo il set up iniziale?",
        a: "Sì. Possiamo partire con un intervento una tantum e poi estendere alla gestione continuativa se serve.",
      },
      {
        q: "Gestite anche copy e calendario editoriale?",
        a: "Sì. Definiamo piano editoriale, copy e formati in base a obiettivi di awareness, fiducia e conversione.",
      },
    ],
    results: [
      { value: "+3x", label: "Produzione contenuti utile al mese" },
      { value: "+68%", label: "Engagement qualificato medio" },
      { value: "24/7", label: "Nurturing automatico lead" },
    ],
    forWho: [
      "Brand che vogliono upgrade presenza social",
      "Aziende con bisogno di costanza editoriale",
      "Team commerciali che necessitano nurturing lead",
    ],
  },
  {
    slug: "presenza-digitale",
    shortTitle: "Presenza Digitale",
    title: "Presenza Digitale & Posizionamento",
    tagline: "Sito, SEO e LinkedIn per visibilità organica autorevole.",
    description:
      "Progettiamo asset digitali proprietari che aumentano autorevolezza, traffico qualificato e opportunità commerciali.",
    heroHeadline: "Sito e Presenza Online Che Ti Fanno Sembrare Leader.",
    heroSubheadline:
      "Da sito web a SEO fino al setup LinkedIn: allineiamo comunicazione e canali per farti trovare dai clienti giusti.",
    subServices: [
      {
        name: "SITO WEB",
        description:
          "Sviluppo sito aziendale completo con struttura, copy, design e ottimizzazione mobile.",
      },
      {
        name: "SEO",
        description:
          "Ottimizzazione tecnica + contenuti per migliorare posizionamento organico su Google.",
      },
      {
        name: "SET UP LINKEDIN",
        description:
          "Ottimizzazione profilo e pagina aziendale LinkedIn + strategia outreach B2B.",
      },
    ],
    comparisonItems: [
      {
        withoutForge: "Sito vetrina non orientato alla conversione",
        withForge: "Sito business-first con CTA e percorso utente chiaro",
      },
      {
        withoutForge: "SEO sporadica e non misurata",
        withForge: "Piano SEO continuativo con KPI e priorità definite",
      },
      {
        withoutForge: "LinkedIn gestito in modo random",
        withForge: "Profilo e outreach coerenti al tuo posizionamento",
      },
    ],
    whatsIncluded: [
      "Sviluppo sito web",
      "SEO tecnica + contenuti",
      "Setup profilo/pagina LinkedIn",
      "Supporto posizionamento digitale",
    ],
    faqs: [
      {
        q: "La SEO è una tantum o continuativa?",
        a: "Possiamo fare ottimizzazione iniziale, ma i risultati migliori arrivano con continuità mensile su contenuti e monitoraggio.",
      },
      {
        q: "Fate anche restyling siti esistenti?",
        a: "Sì. Valutiamo base tecnica attuale e scegliamo se conviene restyling o rifacimento totale.",
      },
    ],
    results: [
      { value: "+52%", label: "Lead organici qualificati" },
      { value: "-28%", label: "Bounce medio sito strategico" },
      { value: "+71%", label: "Richieste B2B da LinkedIn" },
    ],
    forWho: [
      "Aziende con presenza digitale disordinata",
      "Business che vogliono traffico organico di qualità",
      "Team che puntano a posizionamento premium",
    ],
  },
  {
    slug: "vendite-crm",
    shortTitle: "Vendite & CRM",
    title: "Vendite, Processo Commerciale & CRM",
    tagline: "Pipeline, metodo vendita e controllo opportunità in ogni fase.",
    description:
      "Ottimizziamo performance commerciali con audit, processo di vendita, consulenza reparto e CRM personalizzato.",
    heroHeadline: "Più Chiusure, Meno Opportunità Perse.",
    heroSubheadline:
      "Definiamo processo commerciale chiaro, strumenti corretti e controllo numerico per aumentare conversioni e margine.",
    subServices: [
      {
        name: "AUDIT COMMERCIALE",
        description:
          "Analisi iniziale in due consulenze dedicate per fotografare criticità e leve di miglioramento.",
      },
      {
        name: "CONSULENZA REPARTO COMMERCIALE",
        description:
          "Affiancamento pratico per aumentare conversione e ottimizzare pipeline.",
        notes: ["N° consulenze al mese: ___"],
      },
      {
        name: "SET UP PROCESSO DI VENDITA",
        description:
          "Costruzione end-to-end di materiale commerciale, script, automazioni e linee operative.",
      },
      {
        name: "GESTIONALE CRM PERSONALIZZATO",
        description:
          "Setup CRM su misura con pipeline, automazioni, gestione contatti e formazione.",
      },
    ],
    comparisonItems: [
      {
        withoutForge: "Pipeline gestita in modo frammentato",
        withForge: "Pipeline centralizzata e monitorata step-by-step",
      },
      {
        withoutForge: "Commerciali senza metodo condiviso",
        withForge: "Script, criteri e processi uguali per tutto il team",
      },
      {
        withoutForge: "Decisioni a sensazione",
        withForge: "Decisioni su KPI e report periodici",
      },
    ],
    whatsIncluded: [
      "Audit commerciale strutturato",
      "Consulenza reparto vendite",
      "Set up processo di vendita",
      "CRM personalizzato con automazioni",
    ],
    faqs: [
      {
        q: "Possiamo usare il nostro CRM attuale?",
        a: "Sì. Se il CRM attuale è adatto, lo ottimizziamo. Se limita la crescita, proponiamo migrazione strutturata.",
      },
      {
        q: "Formate anche il team interno?",
        a: "Sì. La formazione è parte del progetto per garantire adozione reale del nuovo processo.",
      },
    ],
    results: [
      { value: "+45%", label: "Conversione media lead->cliente" },
      { value: "-31%", label: "Tempo medio ciclo vendita" },
      { value: "100%", label: "Opportunità tracciate in pipeline" },
    ],
    forWho: [
      "Aziende con reparto commerciale da strutturare",
      "Team vendite con performance altalenante",
      "Imprese che vogliono controllo completo della pipeline",
    ],
  },
  {
    slug: "strategia-crescita",
    shortTitle: "Strategia & Crescita",
    title: "Consulenza Strategica & Report Trimestrale",
    tagline: "Decisioni migliori con direzione, numeri e priorità chiare.",
    description:
      "Affianchiamo l'imprenditore su strategia periodica e lettura KPI per far evolvere marketing e vendite con continuità.",
    heroHeadline: "Strategia Chiara, Crescita Misurabile.",
    heroSubheadline:
      "Confronto periodico, analisi dati e roadmap operativa per guidare il trimestre successivo senza improvvisare.",
    subServices: [
      {
        name: "CONSULENZA STRATEGICA PERIODICA",
        description:
          "Check-in mensili per monitorare andamento, prendere decisioni e adattare il piano.",
        notes: ["N° consulenze al mese: ___"],
      },
      {
        name: "ANALISI & REPORT TRIMESTRALE",
        description:
          "Report KPI con performance campagne, lead, conversioni e piano operativo successivo.",
      },
    ],
    comparisonItems: [
      {
        withoutForge: "Azioni scollegate e reattive",
        withForge: "Roadmap trimestrale guidata da priorità e dati",
      },
      {
        withoutForge: "KPI poco leggibili",
        withForge: "Report leggibile con decisioni operative concrete",
      },
      {
        withoutForge: "Difficoltà a capire cosa fermare o scalare",
        withForge: "Review periodica con azioni di scale-up/ottimizzazione",
      },
    ],
    whatsIncluded: [
      "Check-in strategici mensili",
      "Lettura KPI marketing e vendite",
      "Report trimestrale operativo",
      "Piano miglioramento trimestre successivo",
    ],
    faqs: [
      {
        q: "Ricevo solo il report o anche confronto operativo?",
        a: "Entrambi. Ogni report è accompagnato da lettura strategica e indicazioni operative prioritarie.",
      },
      {
        q: "Con quale frequenza viene aggiornato il piano?",
        a: "Aggiornamento minimo mensile, con revisione strategica completa ogni trimestre.",
      },
    ],
    results: [
      { value: "+30%", label: "Efficienza media budget marketing" },
      { value: "+2x", label: "Chiarezza decisionale su KPI" },
      { value: "Q/Q", label: "Miglioramento continuo trimestrale" },
    ],
    forWho: [
      "Imprenditori che vogliono direzione costante",
      "Aziende in crescita con più canali attivi",
      "Team che vogliono pianificazione e controllo KPI",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
