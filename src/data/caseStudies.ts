import type { BeforeAfterRow } from "@/components/casi-studio/CaseStudyBeforeAfter";
import type { TextSegment } from "@/components/ui/HighlightedText";
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
  /** Screenshot Meta/dashboard in cornice telefono accanto al contesto */
  contextPhoneScreenshot?: {
    src: string;
    alt: string;
    imageObjectPosition?: string;
  };
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
  /** Versione originale (con sfondo) per display grande in contesto */
  clientLogoFull?: string;
  /** Variante ottimizzata per badge tondi (es. Rovi) */
  clientLogoCircle?: string;
  clientLogoAlt?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "edilizia",
    sector: "Coperture e lattoneria",
    title: "Coperture e lattoneria: 4 clienti qualificati al mese senza pubblicità",
    shortTitle: "Coperture e lattoneria",
    resultHeadline: "4 clienti qualificati al mese, senza spendere un euro in pubblicità.",
    excerpt:
      "Con Tetti Top, azienda edile che viveva di passaparola, abbiamo messo a punto un sistema che porta 4 richieste qualificate al mese.",
    hubExcerpt: "Tetti Top: 4 clienti qualificati al mese, senza spendere un euro in pubblicità.",
    excerptHighlights: ["4 clienti qualificati", "senza pubblicità", "azienda di famiglia"],
    metaDescription:
      "Caso studio coperture e lattoneria: come Tetti Top, azienda a conduzione familiare, ha raggiunto 4 clienti qualificati al mese senza spendere un euro in pubblicità, con preventivi fino a 175.000€ + IVA.",
    context: [
      { label: "Settore", value: "Coperture, tetti e lattoneria" },
      { label: "Azienda", value: "Tetti Top" },
      { label: "Modello", value: "Azienda a conduzione familiare" },
      { label: "Mercato", value: "Locale, geolocalizzato" },
    ],
    challenge:
      "Tetti Top sapeva fare un lavoro eccellente. Il problema non era la qualità: i clienti arrivavano a caso, senza un sistema, impossibili da prevedere. Mesi pieni e mesi vuoti, risposte a chiunque chiedeva un preventivo e zero visibilità online per chi cercava un'impresa nella zona. Lo stesso scenario di quasi ogni PMI edile.",
    diagnosis: [
      "Flusso imprevedibile: mesi pieni e mesi vuoti, nessun modo di pianificare crescita o assunzioni",
      "Nessun filtro in ingresso: si rispondeva anche a richieste orientate solo al prezzo più basso",
      "Invisibile online: chi cercava un'azienda nella zona non trovava Tetti Top",
      "Molto tempo su contatti che non portavano a contratto",
    ],
    system: [
      {
        step: "01",
        title: "Sito web ad alte performance",
        description:
          "Con Tetti Top abbiamo costruito un sito veloce e persuasivo, ottimizzato in modo geolocalizzato per le zone esatte in cui l'azienda opera. Chi cerca, trova Tetti Top e capisce subito perché sceglierla.",
      },
      {
        step: "02",
        title: "Modulo di pre-qualifica",
        description:
          "Insieme a Tetti Top abbiamo introdotto un modulo che, prima del primo contatto, raccoglie le informazioni chiave per qualificare il potenziale cliente, incluso il budget a disposizione. Solo richieste reali, niente perditempo.",
      },
      {
        step: "03",
        title: "Chiamate di pre-qualifica",
        description:
          "Ogni contatto passa attraverso una chiamata di pre-qualifica: insieme al team verifichiamo se ci sono i presupposti e fissiamo l'appuntamento solo quando ha senso davvero.",
      },
      {
        step: "04",
        title: "Sopralluoghi qualificati",
        description:
          "Con Tetti Top abbiamo strutturato sopralluoghi mirati: il titolare incontra solo clienti già caldi e selezionati, con tecnico e titolare presenti, da chi è pronto a decidere. E abbiamo introdotto il sopralluogo a pagamento, in un mercato dove tutti lo regalano: chi lo prenota ha già deciso di fare sul serio.",
      },
      {
        step: "05",
        title: "Presenza online completa",
        description:
          "Con Tetti Top abbiamo curato social, profilo Google Business, video recensione di un cliente soddisfatto e materiale video aziendale. Tutta la comunicazione orientata ad attrarre e selezionare le persone giuste.",
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
        before: "Molto tempo su contatti che non portavano a contratto",
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
      "Titolari nell'edilizia e nei servizi tecnici che vogliono dedicare meno tempo a contatti non in target",
      "Imprenditori che vogliono scegliere i clienti, non accettare chiunque pur di lavorare",
      "Chi vuole un sistema che resti, non una campagna che si spegne quando smetti di pagare",
    ],
    ...caseStudyLogosBySlug.edilizia,
  },
  {
    slug: "arredo-commerciale",
    sector: "Arredamento negozi",
    title: "Arredamento negozi: 25.000 € chiusi in 4 mesi",
    shortTitle: "Arredamento negozi",
    resultHeadline: "25.000 € chiusi in quattro mesi, con oltre 200.000 € di trattative ancora aperte.",
    excerpt:
      "ROVI Srl, arredamento negozi: da sola dipendenza dal passaparola a 25.000 € chiusi in quattro mesi e oltre 200.000 € di trattative aperte in cinque.",
    hubExcerpt: "ROVI Srl: 25.000 € chiusi in quattro mesi e oltre 200.000 € di trattative aperte.",
    excerptHighlights: ["25.000 €", "quattro mesi", "200.000 € di trattative aperte"],
    metaDescription:
      "Caso studio arredamento negozi: ROVI Srl. Da sola dipendenza dal passaparola a 25.000 € di contratti chiusi in quattro mesi e oltre 200.000 € di trattative aperte in cinque, con processi commerciali, Meta Ads e progettazione a pagamento.",
    context: [
      { label: "Settore", value: "Arredamento negozi e locali commerciali" },
      { label: "Specializzazione", value: "Arredamento negozi e attività commerciali" },
      { label: "Azienda", value: "ROVI Srl" },
      { label: "Ticket medio", value: "+25.000€" },
      { label: "Mercato", value: "Italia" },
      { label: "Fatturato attuale", value: "+40.000€/mese" },
      { label: "Max storico", value: "400.000€ su singolo progetto" },
    ],
    challenge:
      "ROVI è un'azienda solida, con oltre 40 anni di attività, progetti fino a 400.000€ e una reputazione costruita nel tempo. Il problema non era la qualità del lavoro: tutta la crescita dipendeva da passaparola e referral. Zero canali attivi, zero processi commerciali strutturati, zero sistema scalabile. Il titolare aveva la visione per fare molto di più. Mancava il sistema per farlo succedere.",
    diagnosis: [
      "Acquisizione clienti solo passaparola: nessun canale attivo o prevedibile",
      "Progettazione gratuita ceduta a lead non qualificati: 36 progetti persi ogni anno senza ritorno",
      "Vendita non strutturata: agenda cartacea, WhatsApp, nessuno storico delle trattative",
      "Media di 10 incontri per chiudere un contratto, senza script né protocolli definiti",
      "La maggior parte dei lead arrivava senza budget né urgenza definita: nessun filtro all'ingresso",
    ],
    system: [
      {
        step: "01",
        title: "Posizionamento & comunicazione",
        description:
          "Con ROVI abbiamo ridefinito il modo in cui si presenta: da showroom a partner progettuale premium per attività commerciali. Messaggi chiari su chi serve, cosa offre e perché sceglierla rispetto alla concorrenza.",
      },
      {
        step: "02",
        title: "Processi commerciali strutturati",
        description:
          "Insieme a ROVI abbiamo costruito tre processi di vendita distinti, ciascuno ragionato per macroarea di intervento, con script dedicati, protocolli di prequalifica, gestione obiezioni e follow-up definito giorno per giorno.",
      },
      {
        step: "03",
        title: "Progettazione a pagamento",
        description:
          "Con ROVI abbiamo introdotto un sistema di progettazione a pagamento che filtra le richieste non in target, monetizza il lavoro consulenziale e aumenta il commitment del cliente prima della firma del contratto.",
      },
      {
        step: "04",
        title: "Prequalifica & filtro lead",
        description:
          "Insieme al team commerciale abbiamo definito un gate di prequalifica all'ingresso di ogni processo: domande su budget, stato immobile e tempistiche, per intercettare solo chi è pronto ad acquistare.",
      },
      {
        step: "05",
        title: "Sistema di acquisizione Meta Ads",
        description:
          "Con ROVI abbiamo avviato campagne Facebook e Instagram per intercettare chi sta aprendo o rinnovando un'attività commerciale, con form di qualifica integrati per non ricevere più nomi a freddo.",
      },
      {
        step: "06",
        title: "Pipeline vendita & appuntamenti",
        description:
          "Insieme a ROVI abbiamo strutturato un sistema di appuntamenti intermedi con schede operative, budget progressivi e meccaniche di commitment che guidano ogni cliente verso la firma in modo prevedibile.",
      },
    ],
    resultsEyebrow: "Dove siamo adesso",
    resultsHeading: "Il sistema è",
    resultsHeadingHighlight: "operativo",
    results: [
      { value: "25K€", label: "Contratti chiusi", detail: "Nei primi quattro mesi di lavoro insieme" },
      { value: "+200K€", label: "Trattative aperte", detail: "Valore generato in cinque mesi, ancora in corso" },
      { value: "3", label: "Processi commerciali", detail: "Strutturati e attivi da subito" },
      { value: "A pagamento", label: "Progettazione", detail: "Meno tempo perso in trattative non allineate" },
    ],
    quote: {
      text: "Progetto in corso con Forge Group.",
      author: "ROVI Srl",
      role: "Arredamento negozi e attività commerciali",
    },
    evolutionEyebrow: "Cosa succede ora",
    evolutionHeading: "I primi numeri ci sono.",
    evolutionHeadingHighlight: "Il sistema continua a lavorare.",
    beforeAfter: [
      {
        aspect: "Acquisizione",
        before: "100% passaparola, zero canali attivi",
        after: "Meta Ads live con form di qualifica integrati",
      },
      {
        aspect: "Progettazione",
        before: "Gratuita: 36 progetti persi ogni anno senza ritorno",
        after: "A pagamento: filtra le richieste non in target e monetizza la consulenza",
      },
      {
        aspect: "Vendita",
        before: "Agenda cartacea, WhatsApp, nessuno storico delle trattative",
        after: "3 processi commerciali con script e follow-up giornalieri",
      },
      {
        aspect: "Prequalifica",
        before: "La maggior parte dei lead senza budget né urgenza definita",
        after: "Gate su budget, stato immobile e tempistiche",
      },
      {
        aspect: "Chiusura",
        before: "10 incontri per contratto, senza protocolli",
        after: "Appuntamenti strutturati con schede e commitment progressivo",
      },
      {
        aspect: "Obiettivo",
        before: "Crescita legata soprattutto al passaparola",
        after: "+300k fatturato aggiuntivo in 12 mesi (traguardo in corso)",
      },
    ],
    statusBadge: "Progetto attivo · primi contratti chiusi",
    forWhom: [
      "Studi di arredo e progettazione B2B con ticket alto e passaparola come unico canale",
      "Aziende che offrono consulenza e progettazione a lead non ancora qualificati",
      "Titolari con team commerciale informale che vogliono processi, script e trattative tracciate",
      "Chi vuole aprire un canale Meta Ads con form di qualifica integrati",
    ],
    ...caseStudyLogosBySlug["arredo-commerciale"],
  },
  {
    slug: "software-b2b",
    sector: "Software per l'edilizia",
    title: "Software per l'edilizia: 126.500 € in 90 giorni",
    shortTitle: "Software per l'edilizia",
    resultHeadline: "€126.500 in 90 giorni",
    excerpt:
      "Come abbiamo portato DISA SRL da zero acquisizione a €126.500 in 90 giorni, con un costo per contatto di soli €1,48.",
    hubExcerpt: "DISA SRL: €126.500 in 90 giorni. Costo per contatto €1,48.",
    excerptHighlights: ["€126.500", "90 giorni", "€1,48"],
    metaDescription:
      "Caso studio software per l'edilizia: come DISA SRL ha generato €126.500 in 90 giorni con il software SOS APPALTI, a un costo per contatto di €1,48 e un sistema di acquisizione scalabile.",
    context: [
      { label: "Settore", value: "Software per l'edilizia — gare d'appalto" },
      { label: "Azienda", value: "DISA SRL — SOS APPALTI, software per le gare d'appalto" },
      { label: "Ticket medio", value: "Oltre 12.000€" },
      { label: "Mercato", value: "Italia" },
    ],
    challenge:
      "DISA SRL fatturava già oltre 1 milione di euro all'anno, ma trovava nuovi clienti solo con chiamate, referenze e passaparola. Non esisteva un sistema per intercettare chi non conosceva ancora SOS APPALTI: i commerciali percorrevano anche più di 50 km per appuntamenti con persone che non sapevano nemmeno cosa fosse il software, né perché potesse servire alla loro attività.",
    diagnosis: [
      "Nessun canale di acquisizione prevedibile: tutto dipendeva da passaparola e referenze personali",
      "Contatti non consapevoli: quelli che incontravano non conoscevano il software né ne percepivano l'utilità",
      "Molte trasferte commerciali, spesso su appuntamenti con poco interesse reale",
      "Mercato di fatto limitato al territorio vicino, difficile da scalare oltre la zona vicina",
    ],
    system: [
      {
        step: "01",
        title: "Comunicazione & posizionamento",
        description:
          "Con DISA abbiamo riscritto il modo in cui SOS APPALTI si presenta online: messaggi chiari su cosa fa, per chi e perché conviene, così chi arriva capisce subito il valore del software.",
      },
      {
        step: "02",
        title: "Contenuti professionali",
        description:
          "Con DISA e il nostro videomaker abbiamo realizzato video professionali e infografiche per spiegare il software e costruire fiducia prima ancora del contatto commerciale.",
      },
      {
        step: "03",
        title: "Sistema di acquisizione Meta Ads",
        description:
          "Insieme al team commerciale di DISA abbiamo costruito un metodo di lead generation su Meta, con gestione ottimale del budget mensile e campagne mirate per intercettare aziende davvero in target.",
      },
      {
        step: "04",
        title: "Form di qualifica",
        description:
          "Abbiamo integrato nelle campagne form per raccogliere le informazioni chiave: al commerciale arrivano contatti già consapevoli e interessati, non più nomi a freddo.",
      },
      {
        step: "05",
        title: "Lancio geolocalizzato e crescita in Italia",
        description:
          "Abbiamo avviato il sistema su un'area a 250 km dalla sede per validarlo insieme a DISA; oggi è pronto a essere replicato in tutta Italia con risultati in crescita.",
      },
    ],
    results: [
      { value: "+126k", label: "Fatturato generato", detail: "Nei primi 90 giorni" },
      { value: "€1,48", label: "Costo per contatto", detail: "Fino a max €3 nei primi mesi" },
      { value: "+550", label: "Contatti generati", detail: "Già consapevoli e in target" },
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
        after: "Lead già consapevoli e in target (+550 generati)",
      },
      {
        aspect: "Commerciali",
        before: "Trasferte per appuntamenti a freddo, poche chiusure",
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
    contextPhoneScreenshot: {
      src: "/images/casi-studio/disa-meta-ads-dashboard.png",
      alt: "Dashboard Meta Ads con campagne lead generation DISA SRL",
      imageObjectPosition: "center 13%",
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
