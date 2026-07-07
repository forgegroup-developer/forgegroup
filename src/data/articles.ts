import { scheduledArticles } from "@/data/scheduledArticles";
import {
  filterPublishedArticles,
  getArticlePublishDate,
  isArticlePublished,
} from "@/lib/blog/publishing";

export type ArticleFaq = {
  q: string;
  a: string;
};

export type ArticleContentBlock = {
  type: "p" | "h2" | "h3" | "ul" | "quote" | "cta";
  text?: string;
  items?: string[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  /** Se impostata, l'articolo resta nascosto fino a questa data/ora (ISO). */
  publishAt?: string;
  updatedDate?: string;
  readTime: string;
  excerpt: string;
  tags?: string[];
  faqs?: ArticleFaq[];
  content: ArticleContentBlock[];
};

export const ARTICLE_AUTHOR = "Forge Group";

export const articles: Article[] = [
  {
    slug: "come-acquisire-clienti-b2b-campania",
    title: "Come Acquisire Clienti B2B in Campania Senza Sprecare Budget",
    description:
      "Guida pratica per imprenditori B2B in Campania che vogliono costruire un sistema di acquisizione clienti senza bruciare soldi in pubblicità inefficaci.",
    category: "Acquisizione Clienti",
    date: "2026-05-20",
    updatedDate: "2026-07-01",
    readTime: "8 min",
    excerpt:
      "La maggior parte delle aziende B2B in Campania spende in marketing senza un sistema. Ecco come passare da budget bruciato a sistema prevedibile.",
    tags: ["acquisizione clienti", "b2b", "campania", "lead generation"],
    faqs: [
      {
        q: "Quanto budget serve per acquisire clienti B2B in Campania?",
        a: "Non esiste un importo valido per tutti. Per PMI B2B strutturate, un sistema completo (ads, landing, CRM) parte tipicamente da 1.500€/mese e scala in base agli obiettivi di fatturato e al margine disponibile.",
      },
      {
        q: "In quanto tempo si vedono i primi risultati con il marketing B2B?",
        a: "Tra 30 e 60 giorni iniziano ad arrivare i primi contatti qualificati. Tra 90 e 120 giorni l'obiettivo è avere un flusso più stabile e misurabile, non solo lead sporadici.",
      },
      {
        q: "Qual è la differenza tra lead generation e acquisizione clienti?",
        a: "La lead generation produce contatti. L'acquisizione clienti è il sistema completo che include prequalifica, processo commerciale e follow-up fino al contratto.",
      },
      {
        q: "Meta Ads o LinkedIn Ads per il B2B in Campania?",
        a: "Dipende dal target. LinkedIn funziona meglio per ruoli C-level e decision maker. Meta è efficace per imprenditori PMI e settori tradizionali. Spesso la combinazione dei due canali rende di più.",
      },
      {
        q: "Perché le campagne pubblicitarie non portano clienti che comprano?",
        a: "Di solito manca uno dei quattro pilastri: posizionamento chiaro, asset a risposta diretta, targeting preciso o processo commerciale strutturato. Senza tutti e quattro, il budget si disperde.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Se sei un imprenditore B2B in Campania, probabilmente hai già provato a investire in pubblicità online, con Facebook Ads, Google Ads o magari LinkedIn, e ti sei trovato con due risultati: o nessuna richiesta seria, o tante richieste che però non comprano mai. Questo articolo spiega perché succede e cosa fare concretamente per cambiare la situazione.",
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
        text: "Devi smettere di essere 'un'agenzia/un'impresa/uno studio professionale come tanti'. Devi essere la scelta ovvia per un segmento specifico. In Campania funziona soprattutto quando ti specializzi per settore (edilizia commerciale, hospitality, software B2B).",
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
        text: "Il lead deve essere richiamato entro 5 minuti, gestito con script testati, inserito in un CRM e seguito con follow-up automatizzato. Senza questo, l'80% dei lead si perde per strada. Se vuoi vedere il framework completo passo per passo, leggi la guida al [sistema di vendita B2B dalla lead al contratto](/blog/sistema-vendita-b2b-dalla-lead-al-contratto).",
      },
      {
        type: "p",
        text: "Su questi 4 pilastri costruiamo i nostri [servizi di acquisizione clienti B2B](/servizi): puoi vedere un esempio applicato nel [caso studio di un'azienda software B2B](/casi-studio/software-b2b) che ha strutturato il sistema da zero.",
      },
      {
        type: "quote",
        text: "Le aziende che crescono in Campania nei prossimi 5 anni saranno quelle che smettono di improvvisare e iniziano a sistematizzare l'acquisizione clienti.",
      },
      {
        type: "p",
        text: "Prima di investire budget, vale la pena capire anche [quanto costa realmente la lead generation B2B](/blog/quanto-costa-lead-generation-b2b) e, se stai valutando un partner esterno, [come scegliere l'agenzia giusta in Campania](/blog/agenzia-marketing-b2b-campania-checklist).",
      },
    ],
  },
  {
    slug: "sistema-vendita-b2b-dalla-lead-al-contratto",
    title: "Sistema di Vendita B2B: Dalla Lead al Contratto in 7 Passi",
    description:
      "Framework operativo per trasformare contatti freddi in contratti B2B: prequalifica, discovery, proposta e follow-up senza perdere opportunita.",
    category: "Vendite B2B",
    date: "2026-07-07",
    updatedDate: "2026-07-07",
    readTime: "9 min",
    excerpt:
      "Se hai lead ma non chiudi, il problema non e il traffico: e il processo commerciale. Ecco il sistema pratico per aumentare il tasso di conversione.",
    tags: ["vendite b2b", "processo commerciale", "crm", "follow-up", "conversione lead"],
    faqs: [
      {
        q: "Qual e il tempo massimo per contattare un lead B2B?",
        a: "Idealmente entro 5 minuti per i lead caldi e comunque entro 30 minuti. Oltre questo tempo, il tasso di risposta cala drasticamente.",
      },
      {
        q: "Serve davvero un CRM per vendere di piu?",
        a: "Si. Senza CRM perdi storico, priorita e follow-up. Con un CRM semplice ma disciplinato, aumenti controllo e chiusure.",
      },
      {
        q: "Come capisco se un lead e qualificato?",
        a: "Valuta quattro criteri: problema reale, budget disponibile, ruolo decisionale e tempistiche di acquisto. Se mancano due o piu elementi, non e ancora pronto.",
      },
      {
        q: "Quanti follow-up servono prima di chiudere o scartare?",
        a: "In media da 5 a 8 follow-up multicanale (email, telefono, messaggio) prima di classificare il lead come non attivo.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Molte aziende B2B hanno un problema ricorrente: i contatti entrano, il commerciale lavora, ma i contratti restano pochi. Quando succede, quasi sempre la causa non e la mancanza di lead. E la mancanza di un processo di vendita strutturato, misurabile e replicabile. Se prima devi ancora costruire il flusso di contatti, parti dalla guida [come acquisire clienti B2B in Campania](/blog/come-acquisire-clienti-b2b-campania).",
      },
      { type: "h2", text: "Perche i lead non diventano contratti" },
      {
        type: "p",
        text: "Se il passaggio tra marketing e commerciale e confuso, ogni venditore lavora in modo diverso. Questo crea ritardi nei ricontatti, call poco preparate, offerte non allineate al problema reale e follow-up incoerenti. Il risultato e una pipeline piena ma improduttiva.",
      },
      { type: "h2", text: "I 7 passi di un sistema di vendita B2B che funziona" },
      {
        type: "h3",
        text: "1. Prequalifica in ingresso",
      },
      {
        type: "p",
        text: "Inserisci nel form domande su settore, obiettivo, ticket medio e urgenza. Non tutti i lead devono arrivare alla call commerciale.",
      },
      { type: "h3", text: "2. Primo contatto rapido" },
      {
        type: "p",
        text: "Contatta il lead entro pochi minuti. Un contatto veloce aumenta fiducia e probabilita di appuntamento.",
      },
      { type: "h3", text: "3. Discovery call strutturata" },
      {
        type: "p",
        text: "Usa uno script con domande su situazione attuale, obiettivi, vincoli, decision maker e tempistiche. Se non c'e fit, fermati subito.",
      },
      { type: "h3", text: "4. Offerta con next step chiaro" },
      {
        type: "p",
        text: "La proposta deve legarsi ai KPI discussi in call: numero appuntamenti, costo lead target, tempo di rientro. Mai inviare solo un listino servizi.",
      },
      { type: "h3", text: "5. Follow-up calendarizzato" },
      {
        type: "p",
        text: "Pianifica in CRM i follow-up prima di chiudere la call. Se aspetti la memoria del commerciale, perdi vendite.",
      },
      { type: "h3", text: "6. Nurturing dei lead non pronti" },
      {
        type: "p",
        text: "Chi non compra oggi puo comprare tra 30-90 giorni. Inserisci questi lead in sequenze email con casi studio e contenuti utili.",
      },
      { type: "h3", text: "7. Review settimanale della pipeline" },
      {
        type: "p",
        text: "Monitora quattro metriche: lead-to-call, call-to-proposta, proposta-to-chiusura e tempo medio di chiusura. Se una metrica scende, intervieni subito.",
      },
      {
        type: "ul",
        items: [
          "Definisci SLA tra marketing e commerciale",
          "Standardizza script e obiezioni principali",
          "Automatizza reminder e follow-up nel CRM",
          "Rimuovi i lead non qualificati prima della sales call",
        ],
      },
      {
        type: "quote",
        text: "Nel B2B vince chi ha il processo migliore, non chi fa la proposta piu lunga.",
      },
      {
        type: "p",
        text: "Costruire questo processo internamente richiede tempo. I nostri [servizi di supporto commerciale e vendita B2B](/servizi) integrano CRM, script e follow-up nello stesso sistema usato per l'acquisizione clienti. Prima di scegliere se farlo da soli o con un partner, leggi anche quanto [costa realmente la lead generation B2B](/blog/quanto-costa-lead-generation-b2b).",
      },
      {
        type: "cta",
        text: "Vuoi costruire il tuo sistema di vendita B2B?",
      },
    ],
  },
  {
    slug: "agenzia-marketing-b2b-napoli",
    title: "Agenzia Marketing B2B Napoli: Come Scegliere Quella Giusta",
    description:
      "Checklist pratica per selezionare un'agenzia marketing B2B a Napoli senza sprecare budget: KPI, metodo, reportistica e processo commerciale.",
    category: "Agenzia Marketing B2B",
    date: "2026-07-07",
    updatedDate: "2026-07-07",
    readTime: "8 min",
    excerpt:
      "Non tutte le agenzie sono uguali. Ecco i criteri concreti per scegliere un partner B2B orientato a risultati e non solo a visibilita.",
    tags: ["agenzia marketing b2b napoli", "lead generation napoli", "marketing b2b", "kpi"],
    faqs: [
      {
        q: "Come riconosco un'agenzia B2B davvero orientata ai risultati?",
        a: "Ti parla di metriche di business (lead qualificati, appuntamenti, contratti), non solo di impression e like.",
      },
      {
        q: "Meglio agenzia specializzata o generalista?",
        a: "Per il B2B conviene una specializzazione chiara: settore, ticket medio e processo commerciale sono molto diversi dal B2C.",
      },
      {
        q: "Quali KPI devo chiedere nel report mensile?",
        a: "Costo per lead qualificato, tasso lead-to-appuntamento, tasso appuntamento-to-contratto e ROI su periodo.",
      },
      {
        q: "In quanto tempo capisco se la collaborazione funziona?",
        a: "In 60-90 giorni dovresti gia avere segnali chiari su qualita lead e performance del funnel.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Se stai cercando un'agenzia marketing B2B a Napoli, il rischio principale non e scegliere quella piu costosa. E scegliere quella sbagliata per il tuo modello di vendita. In B2B non basta fare campagne: serve un sistema completo che collega marketing e commerciale, come descritto nella guida al [sistema di vendita B2B dalla lead al contratto](/blog/sistema-vendita-b2b-dalla-lead-al-contratto).",
      },
      { type: "h2", text: "I 5 segnali di un'agenzia che porta risultati reali" },
      {
        type: "ul",
        items: [
          "Parla di obiettivi di fatturato e pipeline, non solo di traffico",
          "Definisce un ICP chiaro prima di lanciare campagne",
          "Integra landing page, CRM e follow-up nel progetto",
          "Mostra casi studio con numeri verificabili",
          "Condivide report semplici con KPI decisionali",
        ],
      },
      { type: "h2", text: "Le domande da fare prima di firmare" },
      {
        type: "h3",
        text: "1. Qual e il vostro metodo di prequalifica lead?",
      },
      {
        type: "p",
        text: "Se non hanno una risposta precisa, preparati a ricevere contatti fuori target.",
      },
      {
        type: "h3",
        text: "2. Come lavorate con il team commerciale?",
      },
      {
        type: "p",
        text: "Marketing e vendite devono lavorare sugli stessi KPI. Senza allineamento, i costi salgono e le chiusure calano.",
      },
      {
        type: "h3",
        text: "3. Che report ricevero ogni mese?",
      },
      {
        type: "p",
        text: "Pretendi numeri leggibili e comparabili mese su mese. Se ricevi solo grafici estetici, non stai gestendo il business.",
      },
      {
        type: "h2",
        text: "Perche molte collaborazioni falliscono dopo i primi mesi",
      },
      {
        type: "p",
        text: "Spesso si parte dalle piattaforme e non dalla strategia. Si accendono le ads senza un posizionamento chiaro, senza proposta commerciale forte e senza un processo di follow-up. Il marketing genera contatti, ma il sistema non li trasforma in contratti.",
      },
      {
        type: "quote",
        text: "Un partner B2B non ti vende campagne: ti costruisce una macchina commerciale prevedibile.",
      },
      {
        type: "p",
        text: "Se operi anche fuori Napoli, la logica non cambia ma i criteri di scelta vanno adattati al territorio: trovi la checklist completa in [agenzia marketing B2B in Campania, la checklist definitiva](/blog/agenzia-marketing-b2b-campania-checklist). Puoi anche vedere i nostri [risultati nei casi studio](/casi-studio) prima di scegliere.",
      },
      {
        type: "cta",
        text: "Vuoi capire se il tuo funnel attuale e davvero scalabile?",
      },
    ],
  },
  {
    slug: "quanto-costa-lead-generation-b2b",
    title: "Quanto Costa la Lead Generation B2B nel 2026: Guida ai Prezzi Reali",
    description:
      "Budget indicativi, voci di costo e fattori che determinano il prezzo di un sistema di lead generation B2B in Italia, con esempi pratici.",
    category: "Acquisizione Clienti",
    date: "2026-07-07",
    updatedDate: "2026-07-07",
    readTime: "7 min",
    excerpt:
      "Prima di chiedere un preventivo, capisci come si compone davvero il costo della lead generation B2B e quali variabili lo fanno salire o scendere.",
    tags: [
      "costo lead generation b2b",
      "prezzi agenzia marketing b2b",
      "budget marketing b2b",
      "lead generation prezzi",
    ],
    faqs: [
      {
        q: "Qual e il budget minimo per iniziare con la lead generation B2B?",
        a: "Per un test serio su un canale (es. Meta o LinkedIn Ads) servono in genere almeno 800-1.200€/mese di spesa pubblicitaria, a cui si aggiunge il costo di gestione e degli asset (landing page, CRM).",
      },
      {
        q: "Perche due agenzie mi fanno preventivi molto diversi per lo stesso servizio?",
        a: "Spesso il preventivo piu basso non include asset (landing, copy, CRM) o prevede meno ottimizzazione. Confronta sempre cosa e incluso, non solo il totale.",
      },
      {
        q: "Conviene pagare a performance invece che a canone fisso?",
        a: "Dipende. I modelli a performance puri sono rari nel B2B complesso perche il ciclo di vendita e lungo; piu spesso si trova un mix tra fee fissa e bonus legati a KPI concordati.",
      },
      {
        q: "Il costo per lead qualificato B2B e uguale in ogni settore?",
        a: "No. Varia molto in base a settore, ticket medio e competitivita del mercato: un lead per servizi ad alto valore costa fisiologicamente di piu di un lead per prodotti a basso ticket.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Una delle domande che riceviamo piu spesso da imprenditori B2B e semplice: 'quanto costa la lead generation?'. La risposta onesta e che dipende da diverse variabili, ma esistono range realistici che puoi usare per valutare un preventivo prima ancora di parlare con un'agenzia.",
      },
      { type: "h2", text: "Le voci di costo di un sistema di lead generation B2B" },
      {
        type: "ul",
        items: [
          "Spesa pubblicitaria (ad spend) su Meta, Google o LinkedIn",
          "Gestione e ottimizzazione delle campagne",
          "Creazione di landing page e asset a risposta diretta",
          "CRM e automazioni di follow-up",
          "Eventuale consulenza su processo commerciale",
        ],
      },
      { type: "h2", text: "Budget indicativi per fascia di azienda" },
      {
        type: "h3",
        text: "PMI in fase di test (1.500€ - 2.500€/mese)",
      },
      {
        type: "p",
        text: "Include ad spend contenuto, una landing page, un CRM base e gestione mensile. Obiettivo: validare canale e messaggio prima di scalare.",
      },
      {
        type: "h3",
        text: "Azienda strutturata in crescita (2.500€ - 5.000€/mese)",
      },
      {
        type: "p",
        text: "Piu canali attivi in parallelo, asset multipli, ottimizzazione settimanale e integrazione piu stretta con il processo commerciale interno.",
      },
      {
        type: "h3",
        text: "Azienda in scaling aggressivo (5.000€+/mese)",
      },
      {
        type: "p",
        text: "Piu mercati o piu linee di prodotto, team dedicato, test continui su creativita e targeting, reportistica avanzata.",
      },
      { type: "h2", text: "Cosa fa salire o scendere il costo per lead qualificato" },
      {
        type: "p",
        text: "Il costo per lead qualificato dipende da competitivita del settore, chiarezza del posizionamento, qualita della landing page e livello di prequalifica nel form. Puoi vedere questi principi applicati nella guida [come acquisire clienti B2B in Campania senza sprecare budget](/blog/come-acquisire-clienti-b2b-campania).",
      },
      {
        type: "quote",
        text: "Il vero costo non e quanto spendi in ads, ma quanti di quei contatti diventano clienti: per questo il budget va sempre letto insieme al processo di vendita.",
      },
      {
        type: "p",
        text: "Per questo motivo, quando parliamo di budget, lo colleghiamo sempre al [sistema di vendita B2B dalla lead al contratto](/blog/sistema-vendita-b2b-dalla-lead-al-contratto): un budget alto con un processo debole rende meno di un budget medio con un processo solido.",
      },
      {
        type: "p",
        text: "Se stai valutando un partner esterno, prima di firmare leggi anche la nostra checklist per [scegliere un'agenzia marketing B2B in Campania](/blog/agenzia-marketing-b2b-campania-checklist) e confronta i nostri [servizi di acquisizione clienti](/servizi).",
      },
      {
        type: "cta",
        text: "Vuoi un budget realistico costruito sul tuo caso?",
      },
    ],
  },
  {
    slug: "agenzia-marketing-b2b-campania-checklist",
    title: "Agenzia Marketing B2B in Campania: la Checklist Definitiva per Scegliere Bene",
    description:
      "Checklist punto per punto per valutare un'agenzia marketing B2B in Campania (Napoli, Salerno, Caserta, Avellino, Benevento) prima di firmare.",
    category: "Agenzia Marketing B2B",
    date: "2026-07-07",
    updatedDate: "2026-07-07",
    readTime: "8 min",
    excerpt:
      "Una checklist pratica, punto per punto, per valutare in modo oggettivo un'agenzia marketing B2B in Campania prima di affidarle il budget.",
    tags: [
      "agenzia marketing b2b campania",
      "checklist agenzia marketing",
      "napoli salerno caserta avellino benevento",
      "scegliere agenzia b2b",
    ],
    faqs: [
      {
        q: "Meglio un'agenzia locale in Campania o una nazionale da remoto?",
        a: "Non e la vicinanza geografica il criterio decisivo, ma la specializzazione nel B2B e la conoscenza del tuo settore. Un'agenzia da remoto con metodo solido spesso rende piu di una locale generalista.",
      },
      {
        q: "Quanti punti della checklist deve soddisfare un'agenzia per essere affidabile?",
        a: "Non serve il 100%, ma i punti su prequalifica, KPI e processo commerciale integrato sono non negoziabili: se mancano quelli, il rischio di spreco budget e alto.",
      },
      {
        q: "Devo firmare un contratto lungo con una nuova agenzia?",
        a: "Meglio partire con un periodo di test di 60-90 giorni con obiettivi chiari, prima di impegnarti su contratti annuali.",
      },
      {
        q: "La checklist vale anche per aziende fuori Campania?",
        a: "Si, i criteri sono universali per il B2B italiano: la Campania e il contesto di riferimento ma il metodo si applica a qualsiasi regione.",
      },
    ],
    content: [
      {
        type: "p",
        text: "Se operi in Campania, tra Napoli, Salerno, Caserta, Avellino e Benevento, il mercato delle agenzie marketing e affollato. Invece di valutare a sensazione, usa una checklist oggettiva: ogni punto sotto corrisponde a un rischio concreto se manca.",
      },
      { type: "h2", text: "Checklist: strategia e posizionamento" },
      {
        type: "ul",
        items: [
          "Definisce un ICP (Ideal Customer Profile) chiaro prima di proporre canali o budget",
          "Ti spiega perche un canale e migliore di un altro per il tuo settore specifico",
          "Ha esperienza documentata nel B2B, non solo e-commerce o B2C",
        ],
      },
      { type: "h2", text: "Checklist: esecuzione e asset" },
      {
        type: "ul",
        items: [
          "Costruisce landing page dedicate, non ti manda solo traffico sul sito esistente",
          "Include prequalifica nel form (settore, budget, ruolo, urgenza)",
          "Integra CRM e automazioni di follow-up nel progetto",
        ],
      },
      { type: "h2", text: "Checklist: numeri e trasparenza" },
      {
        type: "ul",
        items: [
          "Fornisce un report mensile con KPI decisionali, non solo grafici estetici",
          "Ti mostra il costo per lead qualificato, non solo il costo per click",
          "Accetta un periodo di test con obiettivi concordati prima di un contratto lungo",
        ],
      },
      { type: "h2", text: "Checklist: processo commerciale" },
      {
        type: "p",
        text: "Un punto spesso ignorato: l'agenzia deve occuparsi anche di cosa succede dopo il lead. Se non parla mai di follow-up, script o CRM, il rischio e ricevere contatti che poi si perdono nel tuo funnel interno. Approfondisci nella guida al [sistema di vendita B2B dalla lead al contratto](/blog/sistema-vendita-b2b-dalla-lead-al-contratto).",
      },
      {
        type: "quote",
        text: "Un'agenzia seria in Campania si riconosce da quante domande scomode ti fa prima di proporti un budget, non da quanto e bella la presentazione.",
      },
      {
        type: "p",
        text: "Prima di scegliere, confronta anche i budget realistici nella guida [quanto costa la lead generation B2B nel 2026](/blog/quanto-costa-lead-generation-b2b) e valuta i nostri [servizi e casi studio](/casi-studio) come metro di paragone.",
      },
      {
        type: "cta",
        text: "Vuoi confrontare il tuo progetto con la checklist insieme a noi?",
      },
    ],
  },
  ...scheduledArticles,
];

export { getArticlePublishDate, isArticlePublished };

export function getPublishedArticles(): Article[] {
  return filterPublishedArticles(articles).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function categoryToSlug(category: string): string {
  return category
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getCategorySlugsForBuild(): string[] {
  return [...new Set(articles.map((a) => categoryToSlug(a.category)))];
}

export function getCategoryFromSlug(slug: string): string | undefined {
  const categories = [...new Set(getPublishedArticles().map((a) => a.category))];
  return categories.find((c) => categoryToSlug(c) === slug);
}

export function getCategories(): { name: string; slug: string; count: number }[] {
  const map = new Map<string, number>();
  for (const article of getPublishedArticles()) {
    map.set(article.category, (map.get(article.category) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([name, count]) => ({ name, slug: categoryToSlug(name), count }))
    .sort((a, b) => a.name.localeCompare(b.name, "it"));
}

export function getArticlesByCategory(categoryOrSlug: string): Article[] {
  const category =
    getCategoryFromSlug(categoryOrSlug) ??
    articles.find((a) => a.category === categoryOrSlug)?.category;
  if (!category) return [];
  return getPublishedArticles().filter((a) => a.category === category);
}

export function getRecentArticles(limit = 3, excludeSlug?: string): Article[] {
  return getPublishedArticles()
    .filter((a) => a.slug !== excludeSlug)
    .slice(0, limit);
}

export function filterArticles(options?: {
  q?: string;
  category?: string;
}): Article[] {
  let result = getPublishedArticles();

  if (options?.category) {
    const category =
      getCategoryFromSlug(options.category) ??
      articles.find((a) => a.category === options.category)?.category;
    if (category) {
      result = result.filter((a) => a.category === category);
    } else {
      result = [];
    }
  }

  if (options?.q?.trim()) {
    const q = options.q.trim().toLowerCase();
    result = result.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
  const article = articles.find((a) => a.slug === slug);
  if (!article || !isArticlePublished(article)) return undefined;
  return article;
}

/** Per generateStaticParams e cron: include anche articoli programmati. */
export function getArticleBySlugIncludingScheduled(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function countArticleWords(article: Article): number {
  let count = 0;
  for (const block of article.content) {
    if (block.text) {
      count += block.text.split(/\s+/).filter(Boolean).length;
    }
    if (block.items) {
      for (const item of block.items) {
        count += item.split(/\s+/).filter(Boolean).length;
      }
    }
  }
  if (article.faqs) {
    for (const faq of article.faqs) {
      count += faq.q.split(/\s+/).filter(Boolean).length;
      count += faq.a.split(/\s+/).filter(Boolean).length;
    }
  }
  return count;
}
