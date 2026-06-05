import type { BeforeAfterRow } from "@/components/CaseStudyBeforeAfter";
import type { TextSegment } from "@/components/HighlightedText";
import { caseStudyLogosBySlug } from "@/data/clientLogos";

export type CaseStudy = {
  slug: string;
  sector: string;
  title: string;
  shortTitle: string;
  resultHeadline: string;
  excerpt: string;
  /** Anteprima breve per card hub `/casi-studio` */
  hubExcerpt: string;
  metaDescription: string;
  context: { label: string; value: string }[];
  challenge: string;
  diagnosis: string[];
  system: { step: string; title: string; description: string }[];
  results: { value: string; label: string; detail?: string }[];
  quote: { text: string; author: string; role: string };
  /** Frasi da evidenziare in corallo nell'anteprima carousel */
  excerptHighlights?: string[];
  /** Tabella prima / dopo (template standard casi studio) */
  beforeAfter: BeforeAfterRow[];
  /** Testimonianza cliente con keyword in corallo */
  quoteSegments?: TextSegment[];
  /** Logo prodotto/servizio (es. SOS Appalti per DISA) */
  productLogo?: string;
  productLogoAlt?: string;
  /** URL della video recensione del caso studio, se disponibile */
  videoUrl?: string;
  /** Elenco "È pensato per chi…" */
  forWhom?: string[];
  /** Mostra il box citazione cliente (solo se testimonianza reale) */
  showQuote?: boolean;
  /** Nota a piè di pagina sui numeri chiave */
  resultNote?: string;
  /** Intestazioni personalizzate sezione risultati */
  resultsEyebrow?: string;
  resultsHeading?: string;
  resultsHeadingHighlight?: string;
  /** Intestazioni personalizzate sezione evoluzione */
  evolutionEyebrow?: string;
  evolutionHeading?: string;
  evolutionHeadingHighlight?: string;
  /** Badge progetto in corso (es. ROVI) */
  statusBadge?: string;
  /** Logo cliente (carousel, hub, contesto). Omesso se cliente non pubblicato */
  clientLogo?: string;
  /** Variante ottimizzata per badge tondi (es. Rovi) */
  clientLogoCircle?: string;
  clientLogoAlt?: string;
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
    hubExcerpt: "DISA SRL: €126.500 in 90 giorni. Costo per contatto €1,48.",
    excerptHighlights: ["€126.500", "90 giorni", "€1,48"],
    metaDescription:
      "Caso studio Software B2B: come DISA SRL ha generato €126.500 in 90 giorni con il software SOS APPALTI, un costo per contatto di €1,48 e un sistema di acquisizione scalabile.",
    context: [
      { label: "Settore", value: "Software B2B" },
      { label: "Azienda", value: "DISA SRL, software SOS APPALTI" },
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
          "Realizzati video professionali e infografiche con il nostro videomaker per spiegare il software e costruire fiducia prima ancora del contatto commerciale.",
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
      { value: "+126k", label: "Fatturato generato", detail: "Nei primi 90 giorni" },
      { value: "€1,48", label: "Costo per contatto", detail: "Fino a max €3 nei primi mesi" },
      { value: "~550", label: "Contatti generati", detail: "Già consapevoli e in target" },
      { value: "+350k", label: "Fatturato ad oggi", detail: "Cliente attivo, ancora in crescita" },
    ],
    quote: {
      text: "126.500€ di fatturato, non me lo aspettavo. Ero scettico all'inizio: questo metodo per me ha funzionato. Lo consiglio a tutte le aziende che vogliono crescere sul mercato.",
      author: "DISA SRL",
      role: "CEO & Founder · Software B2B",
    },
    quoteSegments: [
      { text: "126.500€ di fatturato", highlight: true },
      { text: ", non me lo aspettavo. Ero scettico all'inizio: " },
      { text: "questo metodo", highlight: true },
      { text: " per me " },
      { text: "ha funzionato", highlight: true },
      { text: ". " },
      { text: "Lo consiglio", highlight: true },
      { text: " a tutte le aziende che vogliono " },
      { text: "crescere sul mercato", highlight: true },
      { text: "." },
    ],
    ...caseStudyLogosBySlug["software-b2b"],
    evolutionEyebrow: "Cosa è successo dopo",
    evolutionHeading: "Prima e",
    evolutionHeadingHighlight: "dopo",
    beforeAfter: [
      {
        aspect: "Acquisizione",
        before: "Solo passaparola, chiamate e referenze personali",
        after: "Campagne Meta Ads attive con form di qualifica",
      },
      {
        aspect: "Contatti",
        before: "Persone che non conoscevano SOS APPALTI",
        after: "Lead già consapevoli e in target (~550 generati)",
      },
      {
        aspect: "Commerciali",
        before: "Trasferte per appuntamenti a freddo, tasso di chiusura basso",
        after: "Appuntamenti con clienti interessati e pronti a firmare",
      },
      {
        aspect: "Fatturato",
        before: "Crescita imprevedibile, legata al passaparola",
        after: "+126k nei primi 90 giorni, +350k ad oggi",
      },
      {
        aspect: "Scalabilità",
        before: "Mercato limitato al territorio vicino",
        after: "Sistema di proprietà dell'azienda, scalabile in tutta Italia",
      },
    ],
    videoUrl: "/video-recensione.mp4",
    showQuote: true,
  },
  {
    slug: "edilizia",
    sector: "Edilizia B2C",
    title: "Edilizia B2C: 4 clienti qualificati al mese senza pubblicità",
    shortTitle: "Edilizia B2C",
    resultHeadline: "4 clienti qualificati al mese, senza spendere un euro in pubblicità.",
    excerpt:
      "Abbiamo trasformato Tetti Top, azienda edile a conduzione familiare che viveva di passaparola, in un sistema di acquisizione che porta 4 richieste qualificate al mese. Senza spendere un euro in pubblicità, e ancora attivo oggi.",
    hubExcerpt: "Tetti Top: 4 clienti qualificati al mese, senza spendere un euro in pubblicità.",
    excerptHighlights: ["4 clienti qualificati", "senza pubblicità", "azienda di famiglia"],
    metaDescription:
      "Caso studio Edilizia B2C: come Tetti Top, azienda a conduzione familiare, ha raggiunto 4 clienti qualificati al mese senza spendere un euro in pubblicità, con preventivi fino a 175.000€ + IVA.",
    context: [
      { label: "Settore", value: "Edilizia B2C" },
      { label: "Azienda", value: "Tetti Top" },
      { label: "Modello", value: "Azienda a conduzione familiare" },
      { label: "Mercato", value: "Locale, geolocalizzato" },
    ],
    challenge:
      "Tetti Top sapeva fare un lavoro eccellente. Il problema non era la qualità: i clienti arrivavano a caso, senza un sistema, impossibili da prevedere. Mesi pieni e mesi vuoti, risposte a chiunque chiedeva un preventivo e zero visibilità online per chi cercava un'impresa nella zona. Lo stesso scenario di quasi ogni PMI edile.",
    diagnosis: [
      "Flusso imprevedibile: mesi pieni e mesi vuoti, nessun modo di pianificare crescita o assunzioni",
      "Nessuna selezione: si rispondeva anche a chi cercava solo il prezzo più basso e non avrebbe mai comprato",
      "Invisibile online: chi cercava un'azienda nella zona non trovava Tetti Top",
      "Tempo prezioso bruciato su contatti che non chiudevano mai",
    ],
    system: [
      {
        step: "01",
        title: "Sito web ad alte performance",
        description:
          "Abbiamo costruito un sito veloce e persuasivo, ottimizzato in modo geolocalizzato per le zone esatte in cui l'azienda opera. Chi cerca, trova Tetti Top e capisce subito perché sceglierla.",
      },
      {
        step: "02",
        title: "Modulo di pre-qualifica",
        description:
          "Prima del primo contatto, un modulo intelligente raccoglie le informazioni chiave per qualificare il potenziale cliente, incluso il budget a disposizione. Solo richieste reali, niente perditempo.",
      },
      {
        step: "03",
        title: "Chiamate di pre-qualifica",
        description:
          "Ogni contatto passa attraverso una chiamata di pre-qualifica: si verifica se ci sono i presupposti e si fissa l'appuntamento solo quando ha senso davvero.",
      },
      {
        step: "04",
        title: "Sopralluoghi qualificati",
        description:
          "Il titolare incontra solo clienti già caldi e selezionati. Sopralluoghi mirati, con tecnico e titolare presenti: si va da chi è pronto a decidere, non da chi sta solo guardando le vetrine.",
      },
      {
        step: "05",
        title: "Presenza online completa",
        description:
          "Gestione social, ottimizzazione del profilo Google Business, video recensione di un cliente soddisfatto e raccolta di materiale video aziendale. Tutta la comunicazione orientata ad attrarre e selezionare le persone giuste.",
      },
    ],
    results: [
      { value: "4", label: "Clienti qualificati al mese", detail: "Media stabile, scala da azienda familiare" },
      { value: "0€", label: "Investiti in pubblicità", detail: "Solo posizionamento organico" },
      { value: "175K€", label: "Preventivo più alto", detail: "Valore generato dal sistema (+ IVA)" },
      { value: "100%", label: "Agenda piena", detail: "Lavori a calendario bloccato" },
    ],
    quote: {
      text: "4 clienti qualificati al mese, senza spendere un euro in pubblicità, solo grazie al posizionamento online. Trattative generate fino a 175.000€ + IVA. Un'azienda di famiglia che oggi lavora finalmente a calendario bloccato.",
      author: "Edilizia B2C",
      role: "Tetti Top · Sistema Forge Group",
    },
    evolutionEyebrow: "Cosa è successo dopo",
    evolutionHeading: "Prima e",
    evolutionHeadingHighlight: "dopo",
    beforeAfter: [
      {
        aspect: "Flusso clienti",
        before: "Mesi pieni e mesi vuoti, tutto a caso",
        after: "4 richieste qualificate al mese in media",
      },
      {
        aspect: "Visibilità",
        before: "Invisibile online per chi cercava in zona",
        after: "Sito geolocalizzato + presenza Google e social",
      },
      {
        aspect: "Selezione",
        before: "Preventivi a chiunque chiedeva, anche non in target",
        after: "Modulo e chiamate di prequalifica con budget",
      },
      {
        aspect: "Sopralluoghi",
        before: "Tempo sprecato su contatti che non chiudevano",
        after: "Solo clienti caldi, titolare e tecnico su appuntamenti mirati",
      },
      {
        aspect: "Pubblicità",
        before: "Nessun canale digitale strutturato",
        after: "0€ in pubblicità: solo posizionamento organico",
      },
      {
        aspect: "Agenda",
        before: "Impossibile pianificare crescita o assunzioni",
        after: "Calendario pieno, lavori a calendario bloccato",
      },
    ],
    resultNote:
      "I 175.000€ + IVA rappresentano il valore del preventivo più alto generato dal sistema. Lo riportiamo per trasparenza: indica la qualità delle trattative che il sistema è in grado di portare al tavolo.",
    forWhom: [
      "Aziende a conduzione familiare che vivono di passaparola e vogliono un flusso prevedibile",
      "Titolari nell'edilizia e nei servizi tecnici che perdono tempo con contatti non qualificati",
      "Imprenditori che vogliono scegliere i clienti, non accettare chiunque pur di lavorare",
      "Chi vuole un sistema che resti, non una campagna che si spegne quando smetti di pagare",
    ],
    ...caseStudyLogosBySlug.edilizia,
  },
  {
    slug: "arredo-commerciale",
    sector: "Edilizia B2B",
    title: "Edilizia B2B: arredamento negozi, sistema nuovo da zero",
    shortTitle: "Edilizia B2B",
    resultHeadline: "40 anni di storia. Un sistema nuovo da zero.",
    excerpt:
      "Caso studio nel settore dell'arredamento negozi e attività commerciali: ROVI Srl progetta e realizza spazi per chi apre o rinnova un punto vendita. Non era in difficoltà, aveva scelto di smettere di dipendere dal passaparola e costruire un sistema di acquisizione e vendita scalabile. Siamo dentro con loro.",
    hubExcerpt: "ROVI Srl: arredamento negozi. Sistema commerciale nuovo, progetto attivo.",
    excerptHighlights: ["arredamento negozi", "40 anni", "progetto attivo"],
    metaDescription:
      "Caso studio Edilizia B2B: ROVI Srl, arredamento negozi e attività commerciali. Da passaparola a processi commerciali, Meta Ads e progettazione a pagamento. Progetto attivo, obiettivo +300k in 12 mesi.",
    context: [
      { label: "Settore", value: "Edilizia B2B" },
      { label: "Specializzazione", value: "Arredamento negozi e attività commerciali" },
      { label: "Azienda", value: "ROVI Srl" },
      { label: "Ticket medio", value: "~25.000€" },
      { label: "Mercato", value: "Italia" },
      { label: "Fatturato attuale", value: "~40.000€/mese" },
      { label: "Max storico", value: "400.000€ su singolo progetto" },
    ],
    challenge:
      "ROVI è un'azienda solida, con oltre 40 anni di attività, progetti fino a 400.000€ e una reputazione costruita nel tempo. Il problema non era la qualità del lavoro: tutta la crescita dipendeva da passaparola e referral. Zero canali attivi, zero processi commerciali strutturati, zero sistema scalabile. Il titolare aveva la visione per fare molto di più. Mancava il sistema per farlo succedere.",
    diagnosis: [
      "Acquisizione clienti solo passaparola: nessun canale attivo o prevedibile",
      "Progettazione gratuita ceduta a lead non qualificati: 36 progetti persi ogni anno senza ritorno",
      "Vendita artigianale: agenda cartacea, WhatsApp, zero CRM e zero pipeline",
      "Media di ~10 incontri per chiudere un contratto, senza script né protocolli definiti",
      "70% dei lead erano sognatori senza budget né urgenza reale: nessun filtro all'ingresso",
    ],
    system: [
      {
        step: "01",
        title: "Posizionamento & comunicazione",
        description:
          "Ridefinito il modo in cui ROVI si presenta: da showroom a partner progettuale premium per attività commerciali. Messaggi chiari su chi serve, cosa offre e perché sceglierla rispetto alla concorrenza.",
      },
      {
        step: "02",
        title: "Processi commerciali strutturati",
        description:
          "Costruiti tre processi di vendita distinti, ciascuno ragionato per macroarea di intervento, con script dedicati, protocolli di prequalifica, gestione obiezioni e follow up definito giorno per giorno.",
      },
      {
        step: "03",
        title: "Progettazione a pagamento",
        description:
          "Introdotto un sistema di progettazione a pagamento che filtra i perditempo, monetizza il lavoro consulenziale e aumenta il commitment del cliente prima della firma del contratto.",
      },
      {
        step: "04",
        title: "Prequalifica & filtro lead",
        description:
          "Definito un gate di prequalifica all'ingresso di ogni processo: domande su budget, stato immobile e tempistiche, per intercettare solo chi è pronto ad acquistare.",
      },
      {
        step: "05",
        title: "Sistema di acquisizione Meta Ads",
        description:
          "Campagne Facebook e Instagram per intercettare chi sta aprendo o rinnovando un'attività commerciale, con form di qualifica integrati per non ricevere più nomi a freddo.",
      },
      {
        step: "06",
        title: "Pipeline vendita & appuntamenti",
        description:
          "Strutturato un sistema di appuntamenti intermedi con schede operative, budget progressivi e meccaniche di commitment che guidano ogni cliente verso la firma in modo prevedibile.",
      },
    ],
    resultsEyebrow: "Dove siamo adesso",
    resultsHeading: "Il sistema è",
    resultsHeadingHighlight: "operativo",
    results: [
      { value: "3", label: "Processi commerciali", detail: "Strutturati e attivi da subito" },
      { value: "A pagamento", label: "Progettazione", detail: "Zero perditempo da oggi" },
      { value: "Live", label: "Meta Ads", detail: "Da zero acquisizione a canale attivo" },
      { value: "40 anni", label: "Di esperienza", detail: "Ora con un sistema scalabile dietro" },
    ],
    quote: {
      text: "Progetto in corso con Forge Group.",
      author: "ROVI Srl",
      role: "Arredamento negozi e attività commerciali",
    },
    evolutionEyebrow: "Cosa succede ora",
    evolutionHeading: "I dati arriveranno.",
    evolutionHeadingHighlight: "Il sistema è già lì.",
    beforeAfter: [
      {
        aspect: "Acquisizione",
        before: "100% passaparola, zero canali attivi",
        after: "Meta Ads live con form di qualifica integrati",
      },
      {
        aspect: "Progettazione",
        before: "Gratuita: 36 progetti persi ogni anno senza ritorno",
        after: "A pagamento: filtra i perditempo e monetizza la consulenza",
      },
      {
        aspect: "Vendita",
        before: "Agenda cartacea, WhatsApp, nessun CRM né pipeline",
        after: "3 processi commerciali con script e follow up giornalieri",
      },
      {
        aspect: "Prequalifica",
        before: "70% lead senza budget né urgenza reale",
        after: "Gate su budget, stato immobile e tempistiche",
      },
      {
        aspect: "Chiusura",
        before: "~10 incontri per contratto, senza protocolli",
        after: "Appuntamenti strutturati con schede e commitment progressivo",
      },
      {
        aspect: "Obiettivo",
        before: "Crescita legata al passaparola e alla fortuna",
        after: "+300k fatturato aggiuntivo in 12 mesi (traguardo in corso)",
      },
    ],
    statusBadge: "Progetto attivo · aggiornamenti in arrivo",
    forWhom: [
      "Studi di arredo e progettazione B2B con ticket alto e passaparola come unico canale",
      "Aziende che regalano consulenza e progettazione a lead non qualificati",
      "Titolari con team commerciale informale che vogliono processi, script e pipeline",
      "Chi vuole aprire un canale Meta Ads senza ricevere più nomi a freddo",
    ],
    ...caseStudyLogosBySlug["arredo-commerciale"],
  },
  {
    slug: "hotel-hospitality",
    sector: "Hospitality",
    title: "Hospitality: 258 prenotazioni in 48 ore",
    shortTitle: "Hospitality",
    resultHeadline: "258 prenotazioni in 48 ore.",
    excerpt:
      "Abbiamo lanciato da zero un hotel sotto nuova gestione. Nelle prime 48 ore dal lancio: oltre 258 prenotazioni raccolte, per un valore di circa 20.000€. Da calendario vuoto a struttura che vende fin dal primo giorno.",
    hubExcerpt: "Hotel nuova gestione: 258 prenotazioni in 48 ore, ~20.000€ di valore.",
    excerptHighlights: ["258 prenotazioni", "48 ore", "20.000€"],
    metaDescription:
      "Caso studio Hospitality: lancio hotel sotto nuova gestione con 258 prenotazioni in 48 ore e circa 20.000€ di valore. OTA, contenuti, Google Business e campagne sponsorizzate.",
    context: [
      { label: "Settore", value: "Hospitality" },
      { label: "Struttura", value: "Hotel sotto nuova gestione" },
      { label: "Obiettivo", value: "Occupazione da subito, non in stagione" },
      { label: "Mercato", value: "Prenotazioni via OTA e presenza diretta" },
    ],
    challenge:
      "L'hotel era appena passato di mano. Nessuno storico utile, presenza online da ricostruire, e l'obiettivo del titolare era uno solo: iniziare ad acquisire prenotazioni fin dal primo giorno. Lo scenario più difficile, partire da zero, con il cronometro acceso.",
    diagnosis: [
      "Partenza da zero: nuova gestione, nessuno slancio ereditato, camere vuote che non aspettano",
      "Invisibile online: schede OTA da sistemare, foto deboli, nessun posizionamento. Chi cercava, non sceglieva",
      "Zero riprova sociale: senza recensioni nessuno prenota, e senza prenotazioni non arrivano recensioni",
    ],
    system: [
      {
        step: "01",
        title: "Consulenza e formazione iniziale",
        description:
          "Abbiamo inquadrato il modello di business e l'obiettivo reale del titolare: lanciare la struttura e iniziare a raccogliere prenotazioni da subito. Strategia prima dell'azione.",
      },
      {
        step: "02",
        title: "Controllo e ottimizzazione di tutte le piattaforme",
        description:
          "Abbiamo preso la proprietà di tutte le piattaforme, le abbiamo sistemate e messe a punto. Ogni canale allineato, coerente, pronto a convertire.",
      },
      {
        step: "03",
        title: "Contenuti e fotografia professionale",
        description:
          "Abbiamo prodotto foto e contenuti studiati per attirare l'attenzione e far desiderare la struttura. Nell'hospitality si vende con gli occhi: l'immagine giusta è metà della prenotazione.",
      },
      {
        step: "04",
        title: "Sito, posizionamento, Google Business e recensioni",
        description:
          "Presenza propria oltre alle OTA: sito posizionato, profilo Google Business curato e un sistema per raccogliere recensioni in modo continuo, alimentando la riprova sociale che fa scattare le prenotazioni.",
      },
      {
        step: "05",
        title: "Lancio su tutte le OTA con campagne sponsorizzate",
        description:
          "Con le fondamenta pronte, abbiamo lanciato la struttura su tutte le piattaforme OTA, supportandola con campagne sponsorizzate mirate sulle piattaforme stesse. È qui che sono arrivate le 258 prenotazioni.",
      },
    ],
    results: [
      { value: "258+", label: "Prenotazioni raccolte", detail: "Nelle prime 48 ore dal lancio" },
      { value: "48h", label: "Dal go-live", detail: "Dalla messa online della struttura" },
      { value: "~20K€", label: "Valore generato", detail: "Stima sulle prenotazioni raccolte" },
      { value: "0", label: "Punto di partenza", detail: "Gestione appena cambiata, calendario vuoto" },
    ],
    quote: {
      text: "Nelle prime 48 ore dal lancio: oltre 258 prenotazioni raccolte, per un valore di circa 20.000€.",
      author: "Sistema Forge Group",
      role: "Lancio struttura ricettiva · nuova gestione",
    },
    evolutionEyebrow: "Prima e dopo",
    evolutionHeading: "Il confronto",
    evolutionHeadingHighlight: "reale",
    beforeAfter: [
      {
        aspect: "Gestione",
        before: "Hotel appena passato di mano, zero storico utile",
        after: "Lancio operativo con occupazione fin dal primo giorno",
      },
      {
        aspect: "Presenza online",
        before: "OTA trascurate, foto deboli, nessun posizionamento",
        after: "Piattaforme ottimizzate, sito, Google Business e contenuti pro",
      },
      {
        aspect: "Riprova sociale",
        before: "Poche o nessuna recensione recente",
        after: "Sistema di raccolta recensioni attivo e continuo",
      },
      {
        aspect: "Prenotazioni",
        before: "Calendario vuoto, pressione di riempire subito",
        after: "258+ prenotazioni nelle prime 48 ore",
      },
      {
        aspect: "Valore",
        before: "Nessun fatturato prevedibile al cambio gestione",
        after: "Circa 20.000€ di valore generato in 48 ore",
      },
      {
        aspect: "Canali",
        before: "Nessuna campagna strutturata sulle OTA",
        after: "Lancio su tutte le OTA con ads mirate",
      },
    ],
    resultNote:
      "Risultato misurato sulle prenotazioni effettivamente raccolte nelle prime 48 ore dal lancio sulle piattaforme. Le fondamenta costruite prima del lancio (presenza, contenuti, recensioni) continuano a sostenere la struttura nel tempo.",
    forWhom: [
      "Hotel, B&B e strutture ricettive sotto nuova gestione o in fase di rilancio",
      "Chi ha schede OTA trascurate, foto deboli e poche recensioni recenti",
      "Titolari che vogliono occupazione da subito, non tra sei mesi",
      "Chi vuole una presenza online che continua a portare prenotazioni, non solo uno sprint iniziale",
    ],
    ...caseStudyLogosBySlug["hotel-hospitality"],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
