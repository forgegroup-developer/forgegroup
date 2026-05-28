export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: { type: "p" | "h2" | "h3" | "ul" | "quote" | "cta"; text?: string; items?: string[] }[];
};

export const articles: Article[] = [
  {
    slug: "come-acquisire-clienti-b2b-campania",
    title: "Come Acquisire Clienti B2B in Campania Senza Sprecare Budget",
    description:
      "Guida pratica per imprenditori B2B in Campania che vogliono costruire un sistema di acquisizione clienti senza bruciare soldi in pubblicità inefficaci.",
    category: "Acquisizione Clienti",
    date: "2026-05-20",
    readTime: "8 min",
    excerpt:
      "La maggior parte delle aziende B2B in Campania spende in marketing senza un sistema. Ecco come passare da budget bruciato a sistema prevedibile.",
    content: [
      {
        type: "p",
        text: "Se sei un imprenditore B2B in Campania, probabilmente hai già provato a investire in pubblicità online — Facebook Ads, Google Ads, magari LinkedIn — e ti sei trovato con due risultati: o nessuna richiesta seria, o tante richieste che però non comprano mai. Questo articolo spiega perché succede e cosa fare concretamente per cambiare la situazione.",
      },
      { type: "h2", text: "Perché il marketing tradizionale fallisce in Campania" },
      {
        type: "p",
        text: "Le aziende B2B campane spesso commettono lo stesso errore: trattano il marketing come una spesa, non come un sistema. Spendono 800€ in Ads, vedono che 'non ha funzionato', e tornano al passaparola. Il problema non è il budget. Il problema è che manca tutto quello che c'è prima e dopo la pubblicità.",
      },
      { type: "h2", text: "I 3 errori più comuni che vediamo ogni mese" },
      {
        type: "ul",
        items: [
          "Targeting troppo ampio: campagne aperte a chiunque invece di solo decision-maker in target",
          "Landing page generiche che parlano dell'azienda invece che del problema del cliente",
          "Nessun sistema di follow-up: i lead vengono richiamati quando ci si ricorda, se va bene",
        ],
      },
      { type: "h2", text: "Il sistema che funziona davvero per il B2B in Campania" },
      {
        type: "p",
        text: "Per acquisire clienti B2B in modo prevedibile servono 4 elementi che lavorano insieme: posizionamento differenziante, asset di marketing a risposta diretta, traffico mirato e processo commerciale strutturato. Manca anche uno solo dei 4 e tutto il sistema crolla.",
      },
      { type: "h3", text: "1. Posizionamento" },
      {
        type: "p",
        text: "Devi smettere di essere 'un'agenzia/un'impresa/uno studio professionale come tanti'. Devi essere LA scelta ovvia per un segmento specifico. In Campania funziona soprattutto quando ti specializzi per settore (edilizia commerciale, hospitality, software B2B).",
      },
      { type: "h3", text: "2. Asset a risposta diretta" },
      {
        type: "p",
        text: "Servono landing page, VSL, lead magnet costruiti con la tecnica del marketing a risposta diretta. Ogni elemento ha un solo obiettivo: portare il visitatore al passo successivo. Niente brochure aziendali, niente 'chi siamo' in homepage.",
      },
      { type: "h3", text: "3. Traffico mirato" },
      {
        type: "p",
        text: "Solo decision-maker in target. In Campania significa usare LinkedIn Ads per i ruoli C-level e Meta per imprenditori PMI, con creatività e copy diversi per ogni piattaforma.",
      },
      { type: "h3", text: "4. Processo commerciale" },
      {
        type: "p",
        text: "Il lead deve essere richiamato entro 5 minuti, gestito con script testati, inserito in un CRM e seguito con follow-up automatizzato. Senza questo, l'80% dei lead si perde per strada.",
      },
      {
        type: "quote",
        text: "Le aziende che crescono in Campania nei prossimi 5 anni saranno quelle che smettono di improvvisare e iniziano a sistematizzare l'acquisizione clienti.",
      },
      { type: "h2", text: "Quanto serve investire davvero" },
      {
        type: "p",
        text: "Per un'azienda B2B con fatturato sopra 350K€ il budget realistico per costruire un sistema è di almeno 2.500€/mese in advertising più la struttura. Sotto questa soglia non riesci a generare abbastanza dati per ottimizzare. Sopra, i risultati arrivano nei primi 90 giorni.",
      },
      { type: "cta" },
    ],
  },
  {
    slug: "sistema-vendita-b2b-dalla-lead-al-contratto",
    title: "Sistema di Vendita B2B: Dalla Lead al Contratto in 45 Giorni",
    description:
      "Come strutturare un processo di vendita B2B che porta il decision-maker dal primo contatto al contratto firmato in meno di 45 giorni.",
    category: "Processi di Vendita",
    date: "2026-05-15",
    readTime: "10 min",
    excerpt:
      "Il ciclo di vendita B2B medio in Italia è di 90+ giorni. Vediamo come dimezzarlo con un sistema chiaro, automatizzato e testato.",
    content: [
      {
        type: "p",
        text: "Nel B2B italiano il ciclo di vendita medio è di 90-120 giorni. Significa che dal primo contatto al contratto firmato passano 3-4 mesi. Questo è un problema perché blocca il flusso di cassa, costringe il commerciale a gestire centinaia di trattative aperte e abbassa il tasso di chiusura.",
      },
      { type: "h2", text: "Il problema del ciclo lungo non è il prodotto. È il processo." },
      {
        type: "p",
        text: "La maggior parte degli imprenditori pensa che il ciclo lungo dipenda dalla complessità del prodotto. Falso. Dipende dal processo. Le aziende che vendono lo stesso identico servizio possono avere cicli di 30 giorni o 120 giorni a seconda di come gestiscono il percorso del lead.",
      },
      { type: "h2", text: "Le 5 fasi del sistema 45 giorni" },
      { type: "h3", text: "Fase 1: Qualificazione iniziale (Giorno 0-2)" },
      {
        type: "p",
        text: "Quando arriva un lead, ha senso parlargli solo se rientra nel target. Servono 5-7 domande di prequalifica automatica: fatturato, ruolo, budget, tempi, problema principale. Solo chi supera questo filtro passa alla fase 2.",
      },
      { type: "h3", text: "Fase 2: Call di scoperta (Giorno 2-7)" },
      {
        type: "p",
        text: "Call di 30-45 minuti strutturata in 4 momenti: situazione attuale, problemi, obiettivi, valutazione. Obiettivo della call: capire se c'è un fit. Se sì, si fissa direttamente la fase 3. Se no, si chiude con eleganza.",
      },
      { type: "h3", text: "Fase 3: Proposta personalizzata (Giorno 7-14)" },
      {
        type: "p",
        text: "Documento di 8-12 pagine con: analisi del problema, soluzione proposta, deliverable, timeline, investimento, casi studio del settore, FAQ.",
      },
      { type: "h3", text: "Fase 4: Call di proposta (Giorno 14-21)" },
      {
        type: "p",
        text: "Si presenta la proposta in call, si gestiscono obiezioni con uno script testato, si arriva a una decisione binaria: sì o no. Mai 'ci pensiamo'.",
      },
      { type: "h3", text: "Fase 5: Chiusura e firma (Giorno 21-45)" },
      {
        type: "p",
        text: "Se è un sì, si firma entro 21 giorni gestendo iter contrattuali con follow-up sistematici. Se è un no, si chiede il motivo reale e si torna in nurturing per riproporre dopo 6 mesi.",
      },
      { type: "h2", text: "Come automatizzare senza perdere l'umano" },
      {
        type: "ul",
        items: [
          "CRM con stadio del lead sempre aggiornato e visibile a tutti",
          "Promemoria automatici al commerciale 24h prima di ogni scadenza",
          "Sequenze email post-call per riepiloghi e materiale aggiuntivo",
          "Notifiche WhatsApp per momenti chiave (proposta inviata, firma in attesa)",
          "Dashboard con tasso di chiusura per fase e tempo medio per fase",
        ],
      },
      { type: "cta" },
    ],
  },
  {
    slug: "agenzia-marketing-b2b-napoli",
    title: "Agenzia Marketing B2B a Napoli: Perché il Marketing Tradizionale Non Funziona",
    description:
      "Cosa serve davvero a un'azienda B2B di Napoli per crescere: perché le agenzie di marketing tradizionali falliscono e cosa cercare in un partner serio.",
    category: "Strategia",
    date: "2026-05-10",
    readTime: "9 min",
    excerpt:
      "Negli ultimi 10 anni a Napoli sono nate centinaia di agenzie di marketing. Quasi nessuna porta risultati misurabili al B2B. Ecco perché.",
    content: [
      {
        type: "p",
        text: "Se sei un imprenditore B2B a Napoli o in provincia, probabilmente hai già lavorato con almeno una o due agenzie di marketing locali. E probabilmente sei rimasto deluso. Non è un caso. È un problema strutturale.",
      },
      { type: "h2", text: "Il modello rotto delle agenzie tradizionali" },
      {
        type: "p",
        text: "La maggior parte delle agenzie a Napoli vende 'pacchetti social' o 'gestione campagne' a prezzo fisso mensile. Producono creatività, pubblicano post, lanciano qualche ads. Il problema è che questo modello non genera business per il B2B perché manca tutta la struttura intorno: sistema commerciale, follow-up, CRM, materiale di vendita.",
      },
      { type: "h2", text: "I 4 segnali che ti dicono che stai sprecando budget" },
      {
        type: "ul",
        items: [
          "L'agenzia ti manda report con metriche di vanità (like, copertura, impression) invece che KPI di business",
          "Non ti hanno mai chiesto qual è il tuo costo per cliente sostenibile",
          "Non parlano mai del tuo processo commerciale, solo di 'creatività'",
          "Non sanno dirti quanto fatturato hanno generato per i loro clienti negli ultimi 12 mesi",
        ],
      },
      { type: "h2", text: "Cosa cercare in un'agenzia B2B seria a Napoli" },
      {
        type: "p",
        text: "Una vera agenzia per il B2B deve fare 4 cose: capire profondamente il tuo modello di business, costruire asset di marketing a risposta diretta, integrarsi col tuo processo commerciale e misurare tutto in termini di ROAS reale (non di clic).",
      },
      { type: "h3", text: "Domande da fare in fase di selezione" },
      {
        type: "ul",
        items: [
          "Quanti dei vostri clienti hanno fatturato più di 500K€ all'anno?",
          "Mi mostrate 3 casi studio con numeri di fatturato reali, non di clic?",
          "Come integrate il vostro lavoro con il mio reparto commerciale?",
          "Quanto è realistico aspettarsi un ROAS positivo nei primi 3 mesi?",
          "Cosa succede se nei primi 90 giorni i risultati non sono in linea con le aspettative?",
        ],
      },
      { type: "h2", text: "Perché Napoli e la Campania sono un'opportunità unica" },
      {
        type: "p",
        text: "La maggior parte delle aziende B2B campane non ha ancora sistematizzato l'acquisizione clienti. Significa che il primo concorrente diretto che lo fa ottiene un vantaggio enorme — perché parte da un mercato dove tutti improvvisano. La finestra di opportunità è ancora aperta, ma non per molto.",
      },
      {
        type: "quote",
        text: "A Napoli vince chi capisce che il marketing non è una spesa: è infrastruttura.",
      },
      { type: "cta" },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
