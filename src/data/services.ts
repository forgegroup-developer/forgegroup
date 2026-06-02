export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
  systemIntro: string;
  pillars: {
    name: string;
    intro: string;
    items: { name: string; description: string }[];
  }[];
  comparisonItems: { withoutForge: string; withForge: string }[];
  faqs: { q: string; a: string }[];
  forWho: string[];
};

export const services: Service[] = [
  {
    slug: "acquisizione-clienti",
    shortTitle: "Acquisizione Clienti",
    title: "Acquisizione Clienti",
    tagline: "Advertising, contenuti e presenza digitale per un flusso costante di contatti qualificati.",
    description:
      "Un sistema integrato che porta nel tuo funnel le persone giuste: campagne, contenuti, sito e SEO che lavorano insieme, non a compartimenti stagni.",
    heroHeadline: "Un flusso costante di clienti giusti, non di contatti a caso.",
    heroSubheadline:
      "Mettiamo in un unico sistema advertising, contenuti e presenza digitale: ogni canale alimenta gli altri per portarti richieste qualificate, mese dopo mese.",
    systemIntro:
      "L'acquisizione non è \u201cfare ads\u201d o \u201cpubblicare sui social\u201d. È un sistema in cui pubblicità, contenuti e presenza online si rinforzano a vicenda. Per questo non vendiamo singoli pezzi: li orchestriamo insieme, così ogni euro investito lavora meglio.",
    pillars: [
      {
        name: "Advertising & Lead Generation",
        intro: "Campagne che portano contatti pronti a parlarti, non solo click.",
        items: [
          {
            name: "Meta Ads",
            description:
              "Campagne su Facebook e Instagram costruite per intercettare chi è davvero in target, con creatività e copy testati di continuo.",
          },
          {
            name: "Google Ads",
            description:
              "Search e Display per farti trovare nel momento esatto in cui qualcuno cerca ciò che offri.",
          },
          {
            name: "Landing Page & Funnel",
            description:
              "Pagine e percorsi di conversione che trasformano il traffico in richieste qualificate, con i lead già filtrati prima di arrivare al commerciale.",
          },
        ],
      },
      {
        name: "Social Media & Contenuti",
        intro: "Contenuti che costruiscono fiducia e rendono più facile vendere.",
        items: [
          {
            name: "Social Set Up",
            description:
              "Profili coerenti e professionali: bio, immagine, highlights e feed allineati al tuo posizionamento.",
          },
          {
            name: "Social Management",
            description:
              "Piano editoriale e gestione continuativa dei canali, con contenuti pensati per attrarre e convertire.",
          },
          {
            name: "Videomaker",
            description:
              "Produzione video professionale per ads, social e presentazioni aziendali.",
          },
          {
            name: "Email Marketing & Automazioni",
            description:
              "Sequenze automatiche per coltivare i contatti nel tempo e riattivare chi non ha ancora deciso.",
          },
        ],
      },
      {
        name: "Presenza Digitale & Posizionamento",
        intro: "Asset di proprietà che ti fanno trovare e ti fanno sembrare leader.",
        items: [
          {
            name: "Sito Web",
            description:
              "Sito orientato alla conversione, con struttura, copy e design pensati per generare richieste, non solo per essere bello.",
          },
          {
            name: "SEO",
            description:
              "Ottimizzazione tecnica e contenuti per posizionarti su Google e attrarre traffico organico di valore.",
          },
          {
            name: "Set Up LinkedIn",
            description:
              "Profilo e pagina aziendale ottimizzati, con una strategia di presenza B2B coerente al tuo posizionamento.",
          },
        ],
      },
    ],
    comparisonItems: [
      {
        withoutForge: "Attivano campagne scollegate da sito, contenuti e processo di vendita",
        withForge: "Costruiamo un sistema dove ads, contenuti e presenza digitale lavorano insieme",
      },
      {
        withoutForge: "Ottimizzano per click, impression e \u201cmi piace\u201d",
        withForge: "Ottimizziamo per contatti qualificati e richieste commerciali reali",
      },
      {
        withoutForge: "Consegnano lead grezzi al tuo commerciale",
        withForge: "Filtriamo i contatti prima del passaggio al reparto vendite",
      },
      {
        withoutForge: "Report pieni di metriche che non dicono nulla sul fatturato",
        withForge: "Report chiari sui numeri che contano: costo per contatto utile e opportunità generate",
      },
    ],
    faqs: [
      {
        q: "Qual è la differenza tra un lead e un contatto davvero qualificato?",
        a: "Un lead è semplicemente un contatto: un nome, un'email, un numero. Un contatto qualificato è una persona che ha un reale bisogno, può permettersi ciò che offri e ha l'intenzione di decidere. Il nostro sistema è costruito per generare i secondi, non solo i primi: così il tuo commerciale parla con persone pronte ad ascoltare.",
      },
      {
        q: "Meglio investire in pubblicità o lavorare prima sulla presenza online?",
        a: "Non è un aut-aut. La pubblicità porta traffico subito, ma se chi arriva trova un sito confuso o profili social trascurati, difficilmente si fida. Per questo li trattiamo come un unico sistema: presenza digitale e contenuti rendono la pubblicità più efficace, e la pubblicità dà visibilità agli asset che costruisci.",
      },
      {
        q: "Quanto tempo serve prima di vedere risultati concreti?",
        a: "Le prime indicazioni arrivano già nelle prime settimane, ma i dati diventano stabili e ottimizzabili in genere tra i 60 e i 90 giorni. L'acquisizione è un sistema che migliora nel tempo: più dati raccogliamo, più diventa preciso ed efficiente.",
      },
      {
        q: "I social servono davvero a vendere o sono solo vanità?",
        a: "Dipende da come li usi. Pubblicare per fare numero non porta clienti. Pubblicare contenuti che rispondono ai dubbi del tuo cliente ideale, invece, costruisce fiducia e rende molto più facile la vendita. Noi usiamo i social per supportare il processo commerciale, non per inseguire le visualizzazioni.",
      },
      {
        q: "Devo per forza attivare tutti i servizi insieme?",
        a: "Partiamo da dove ha più senso per la tua situazione. Ma il valore vero nasce quando i pezzi lavorano insieme: per questo, anche se iniziamo con una sola attività, la inseriamo sempre in una visione di sistema, così ogni passo successivo si incastra senza sprechi.",
      },
    ],
    forWho: [
      "Aziende B2B che vogliono un flusso prevedibile di richieste, non picchi casuali",
      "Imprese con un'offerta valida ma poco visibile online",
      "Realtà pronte a investire in marketing in modo strutturato e misurabile",
    ],
  },
  {
    slug: "vendite-processi-commerciali",
    shortTitle: "Processi di Vendita",
    title: "Processi di Vendita",
    tagline: "Audit, processo di vendita, affiancamento e CRM per convertire più opportunità in contratti.",
    description:
      "Trasformiamo i contatti in contratti: un processo commerciale chiaro, gli strumenti giusti e il controllo di ogni opportunità, dal primo contatto alla firma.",
    heroHeadline: "Più contratti firmati, meno opportunità perse per strada.",
    heroSubheadline:
      "Avere richieste non basta: conta quante ne converti. Mettiamo ordine nel tuo processo di vendita con metodo, strumenti e affiancamento concreto.",
    systemIntro:
      "La maggior parte delle aziende non ha un problema di contatti, ma di conversione: opportunità che si raffreddano, commerciali senza un metodo condiviso, pipeline gestite a memoria. Mettiamo insieme audit, processo, strumenti e affiancamento in un unico sistema che fa firmare di più.",
    pillars: [
      {
        name: "Audit & Strategia Commerciale",
        intro: "Prima capiamo dove perdi opportunità, poi interveniamo.",
        items: [
          {
            name: "Audit Commerciale",
            description:
              "Analisi della situazione attuale per individuare colli di bottiglia, opportunità perse e leve di miglioramento immediate.",
          },
        ],
      },
      {
        name: "Processo & Metodo di Vendita",
        intro: "Un metodo chiaro che tutto il team segue allo stesso modo.",
        items: [
          {
            name: "Set Up Processo di Vendita",
            description:
              "Costruzione end-to-end di script, materiale commerciale, automazioni e linee operative, dalla prima chiamata alla firma del contratto.",
          },
          {
            name: "Consulenza Reparto Commerciale",
            description:
              "Affiancamento pratico al team per migliorare conversione, gestione delle obiezioni e capacità di chiusura.",
          },
        ],
      },
      {
        name: "Strumenti & CRM",
        intro: "Gli strumenti che ti danno controllo su ogni opportunità.",
        items: [
          {
            name: "Gestionale CRM Personalizzato",
            description:
              "CRM su misura con pipeline, automazioni e gestione contatti, così nessuna opportunità resta indietro.",
          },
          {
            name: "Formazione all'Uso degli Strumenti",
            description:
              "Formiamo il team perché adotti davvero il nuovo processo e il CRM, non solo sulla carta.",
          },
        ],
      },
    ],
    comparisonItems: [
      {
        withoutForge: "Lasciano il commerciale libero di improvvisare ogni trattativa",
        withForge: "Definiamo script, criteri e fasi uguali per tutto il team",
      },
      {
        withoutForge: "Ti vendono un software e poi ti lasciano solo",
        withForge: "Configuriamo il CRM sul tuo processo e formiamo chi lo usa",
      },
      {
        withoutForge: "Misurano solo il fatturato a fine mese",
        withForge: "Monitoriamo ogni fase della pipeline per capire dove intervenire",
      },
      {
        withoutForge: "Si fermano alla teoria e ai corsi una tantum",
        withForge: "Affianchiamo il reparto nel tempo, sulle trattative reali",
      },
    ],
    faqs: [
      {
        q: "Cos'è esattamente un \u201cprocesso di vendita\u201d e perché mi serve?",
        a: "È l'insieme di passaggi ripetibili che portano un contatto dal primo interesse alla firma: chi fa cosa, cosa si dice, quando si fa follow-up, come si gestiscono le obiezioni. Senza un processo, ogni commerciale vende a modo suo e i risultati dipendono dalla persona. Con un processo, i risultati diventano prevedibili e migliorabili.",
      },
      {
        q: "Ho già un CRM ma non lo usa nessuno: cosa cambia con voi?",
        a: "Il problema raramente è il software, quasi sempre è che non è stato configurato sul vostro modo di lavorare e che nessuno è stato formato davvero. Noi partiamo dal processo, configuriamo il CRM perché lo rispecchi e formiamo il team finché diventa parte della routine quotidiana, non un peso in più.",
      },
      {
        q: "Perché fare un audit commerciale prima di intervenire?",
        a: "Perché agire senza capire dove si perdono le opportunità significa rischiare di sistemare la cosa sbagliata. L'audit fotografa il processo attuale e mostra con chiarezza dove i contatti si raffreddano o si bloccano: così ogni intervento successivo è mirato e non a tentativi.",
      },
      {
        q: "La formazione al team è un corso una tantum?",
        a: "No. Un corso isolato si dimentica in poche settimane. Noi affianchiamo il reparto nel tempo, lavorando sulle trattative reali, così il metodo si radica e le conversioni migliorano in modo stabile.",
      },
      {
        q: "Posso migliorare le vendite senza aumentare i contatti?",
        a: "Quasi sempre sì, ed è spesso il primo passo. Molte aziende hanno già abbastanza opportunità ma ne convertono una piccola parte. Lavorare sul processo di vendita aumenta il ritorno sui contatti che hai già, prima ancora di investire per generarne di nuovi.",
      },
    ],
    forWho: [
      "Aziende con un reparto commerciale da strutturare o riorganizzare",
      "Team di vendita con risultati altalenanti, dipendenti dalla singola persona",
      "Imprese che vogliono controllo e prevedibilità sulla pipeline",
    ],
  },
  {
    slug: "consulenza-formazione",
    shortTitle: "Consulenza & Formazione",
    title: "Consulenza & Formazione",
    tagline: "Direzione strategica, lettura dei numeri e formazione continua per crescere con metodo.",
    description:
      "Affianchiamo l'imprenditore e il team con consulenza strategica, lettura dei KPI e formazione continua: decisioni guidate dai dati, non dall'istinto.",
    heroHeadline: "Cresci con un metodo, non per fortuna.",
    heroSubheadline:
      "Direzione strategica, numeri letti nel modo giusto e formazione continua del team: il sistema che fa evolvere la tua azienda trimestre dopo trimestre.",
    systemIntro:
      "Marketing e vendite funzionano davvero solo quando c'è una regia. Consulenza e formazione sono il livello che tiene insieme tutto il resto: danno direzione, leggono i numeri e fanno crescere le competenze del team, così il sistema continua a migliorare nel tempo.",
    pillars: [
      {
        name: "Consulenza Strategica",
        intro: "Una direzione chiara, rivista con costanza.",
        items: [
          {
            name: "Consulenza Strategica Periodica",
            description:
              "Check-in regolari con l'imprenditore per monitorare l'andamento, definire priorità e adattare il piano.",
          },
          {
            name: "Analisi & Report Trimestrale",
            description:
              "Lettura dei KPI di marketing e vendite con un piano operativo concreto per il trimestre successivo.",
          },
        ],
      },
      {
        name: "Formazione del Team",
        intro: "Competenze che restano in azienda.",
        items: [
          {
            name: "Formazione Commerciale",
            description:
              "Percorsi continui per il reparto vendite su metodo, gestione delle trattative e chiusura, calibrati sulla tua realtà.",
          },
          {
            name: "Formazione Marketing & Strumenti",
            description:
              "Trasferiamo al team le competenze per gestire e mantenere nel tempo ciò che costruiamo insieme.",
          },
        ],
      },
    ],
    comparisonItems: [
      {
        withoutForge: "Ti consegnano un report e ti lasciano interpretarlo da solo",
        withForge: "Leggiamo i numeri con te e li traduciamo in decisioni operative",
      },
      {
        withoutForge: "Offrono consulenze spot, senza continuità",
        withForge: "Ti affianchiamo con un confronto periodico e una roadmap che evolve",
      },
      {
        withoutForge: "Erogano corsi standard, uguali per tutti",
        withForge: "Formiamo il tuo team sulla tua realtà e sui tuoi casi reali",
      },
      {
        withoutForge: "Spingono ad agire su tutto, subito",
        withForge: "Definiamo priorità chiare su cosa scalare, cosa ottimizzare e cosa fermare",
      },
    ],
    faqs: [
      {
        q: "Che differenza c'è tra consulenza e formazione?",
        a: "La consulenza ti aiuta a prendere le decisioni giuste oggi: quali priorità, dove investire, cosa correggere. La formazione costruisce le competenze perché il team sappia farlo anche domani, in autonomia. Insieme creano un'azienda che non dipende da fornitori esterni per ogni scelta.",
      },
      {
        q: "Ricevo solo un report o anche un confronto operativo?",
        a: "Entrambi. Il report serve a vedere i numeri con chiarezza, ma il valore vero è nel confronto: insieme li interpretiamo e definiamo le azioni prioritarie per il periodo successivo. Un dato senza una decisione è solo un grafico.",
      },
      {
        q: "Ogni quanto ha senso rivedere la strategia?",
        a: "Consigliamo un confronto almeno mensile per restare allineati sull'operativo e una revisione strategica completa ogni trimestre. Il mercato e i tuoi numeri cambiano: una direzione che non si aggiorna diventa in fretta una direzione sbagliata.",
      },
      {
        q: "La formazione serve se i miei commerciali hanno già esperienza?",
        a: "Sì, anche di più. L'esperienza senza un metodo condiviso porta ognuno a vendere a modo proprio. La formazione allinea il team su un linguaggio e un processo comuni, e mantiene alte le competenze man mano che mercato e offerta evolvono.",
      },
      {
        q: "Come faccio a sapere se sto crescendo davvero o solo lavorando di più?",
        a: "Guardando i numeri giusti. Un fatturato in crescita con margini che calano, o un team sempre più sotto pressione, sono segnali che stai lavorando di più senza crescere davvero. La consulenza serve esattamente a questo: misurare la crescita reale e renderla sostenibile.",
      },
    ],
    forWho: [
      "Imprenditori che vogliono una direzione costante e basata sui dati",
      "Aziende in crescita con più canali attivi da coordinare",
      "Team che vogliono acquisire competenze e non dipendere solo da fornitori esterni",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
