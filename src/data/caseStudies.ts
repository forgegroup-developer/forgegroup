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
  /** Problema, soluzione e risultato in una riga ciascuno, in apertura. */
  sintesi: { problema: string; soluzione: string; risultato: string };
  /** Una scena vera dal lavoro con il cliente (Scene ROVI, video-recensione DISA). */
  scena?: { titolo: string; testo: string };
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

/*
 * I tre casi, riscritti il 29/09/2026 con i soli fatti della Scheda dei fatti
 * (tabella "Numeri") e le scene vere (Scene e metodo dalle consulenze ROVI,
 * video-recensione DISA). I numeri sono quelli di src/data/prove.ts. Tolto
 * quello che la Scheda non conferma: per ROVI "tre processi" e "progettazione a
 * pagamento", per Tetti Top "agenda piena". ROVI si presenta come arredamento
 * negozi (proprietà, 29/09: "azienda che lavora in edilizia" non si usa).
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "edilizia",
    sector: "Coperture e lattoneria",
    title: "Coperture e lattoneria: 4 clienti qualificati al mese senza pubblicità",
    shortTitle: "Coperture e lattoneria",
    resultHeadline: "4 clienti qualificati al mese, senza pubblicità. E oggi il sopralluogo si paga.",
    excerpt:
      "Tetti Top viveva di passaparola, con mesi pieni e mesi vuoti, e faceva preventivi a chiunque chiedesse. Oggi ha 4 clienti qualificati al mese senza pubblicità, preventivi fino a 175.000 € e il sopralluogo a pagamento.",
    hubExcerpt:
      "Da mesi pieni e mesi vuoti a 4 clienti qualificati al mese senza pubblicità, con il sopralluogo diventato a pagamento.",
    excerptHighlights: ["4 clienti qualificati al mese", "il sopralluogo a pagamento"],
    sintesi: {
      problema: "Clienti solo dal passaparola, mesi pieni e mesi vuoti, sopralluoghi per chiunque chiedesse.",
      soluzione: "Il modulo che filtra, le parole per richiamare, il sopralluogo a pagamento, il sito e il profilo Google per la sua zona.",
      risultato: "4 clienti qualificati al mese senza pubblicità, preventivi fino a 175.000 € + IVA.",
    },
    metaDescription:
      "Tetti Top, coperture e lattoneria: da mesi pieni e mesi vuoti a 4 clienti qualificati al mese senza pubblicità, preventivi fino a 175.000 € e sopralluogo a pagamento.",
    context: [
      { label: "Settore", value: "Coperture, tetti e lattoneria" },
      { label: "Azienda", value: "Tetti Top" },
      { label: "Modello", value: "Azienda a conduzione familiare" },
      { label: "Mercato", value: "La sua zona" },
    ],
    challenge:
      "Tetti Top il lavoro lo sa fare. Il problema era un altro: i clienti arrivavano solo dal passaparola, quando arrivavano. Mesi pieni e mesi vuoti, preventivi a chiunque chiedesse, sopralluoghi anche per chi voleva solo un prezzo da confrontare.",
    diagnosis: [
      "I mesi morti: mesi pieni e mesi vuoti, nessun modo di pianificare il lavoro o le assunzioni",
      "Nessun filtro: preventivi anche a chi cercava solo il prezzo più basso",
      "Sopralluoghi regalati: giornate intere per clienti che non avrebbero firmato",
      "Invisibile a chi cercava: chi cercava un'impresa di coperture in zona non la trovava",
    ],
    system: [
      {
        step: "01",
        title: "Il modulo che filtra",
        description:
          "Prima del primo contatto il modulo chiede tipo di lavoro, tempi, budget e zona. A Tetti Top arriva chi ha un lavoro vero da fare, già con le informazioni per decidere se vale il viaggio.",
      },
      {
        step: "02",
        title: "Chi richiama, e con quali parole",
        description:
          "Le richieste le richiama Tetti Top. Insieme abbiamo scritto cosa chiedere e in che ordine, così l'appuntamento si fissa solo quando ha senso davvero.",
      },
      {
        step: "03",
        title: "Il sopralluogo diventa a pagamento",
        description:
          "In un mercato dove tutti lo regalano, Tetti Top oggi fa pagare il sopralluogo. È uno degli obiettivi che ci mettiamo con le imprese: chi lo prenota ha già deciso di fare sul serio.",
      },
      {
        step: "04",
        title: "Farsi trovare nella sua zona",
        description:
          "Il sito costruito per Google e per la sua zona, il profilo Google, i social e i video: chi cerca un'impresa di coperture in zona trova Tetti Top e capisce subito cosa fa.",
      },
    ],
    results: [
      { value: "4", label: "Clienti qualificati al mese", detail: "Senza pubblicità" },
      { value: "0€", label: "Investiti in pubblicità", detail: "Il lavoro arriva da chi cerca in zona" },
      { value: "175K€", label: "Il preventivo più alto", detail: "Più IVA" },
    ],
    quote: {
      text: "4 clienti qualificati al mese, senza pubblicità, preventivi fino a 175.000 € + IVA, e oggi il sopralluogo si paga.",
      author: "Tetti Top",
      role: "Coperture e lattoneria",
    },
    evolutionEyebrow: "Prima e dopo",
    evolutionHeading: "Cosa è cambiato",
    evolutionHeadingHighlight: "per Tetti Top",
    beforeAfter: [
      {
        aspect: "Richieste",
        before: "Mesi pieni e mesi vuoti, tutto dal passaparola",
        after: "4 clienti qualificati al mese, senza pubblicità",
      },
      {
        aspect: "Filtro",
        before: "Preventivi a chiunque chiedesse",
        after: "Il modulo che chiede tipo di lavoro, tempi, budget e zona",
      },
      {
        aspect: "Sopralluoghi",
        before: "Regalati, anche a chi voleva solo un prezzo",
        after: "A pagamento, con chi ha già deciso di fare sul serio",
      },
      {
        aspect: "Richiamate",
        before: "A memoria, quando c'era tempo",
        after: "Con le parole scritte insieme: cosa chiedere e in che ordine",
      },
      {
        aspect: "Visibilità",
        before: "Invisibile a chi cercava in zona",
        after: "Sito, profilo Google, social e video pensati per la sua zona",
      },
    ],
    resultNote:
      "I 175.000 € + IVA sono il preventivo più alto arrivato dalle nuove richieste. Lo scriviamo perché dice che tipo di clienti arrivano, non quanto è stato incassato.",
    forWhom: [
      "Imprese a conduzione familiare che vivono di passaparola e vogliono richieste tutto l'anno",
      "Titolari che vogliono smettere di regalare sopralluoghi a chi cerca solo il prezzo",
      "Imprenditori che vogliono scegliere i clienti, invece di prenderli per bisogno",
    ],
    ...caseStudyLogosBySlug.edilizia,
  },
  {
    slug: "arredo-commerciale",
    sector: "Arredamento negozi",
    title: "Arredamento negozi: 25.000 € chiusi in 4 mesi",
    shortTitle: "Arredamento negozi",
    resultHeadline: "25.000 € chiusi in quattro mesi, e oltre 200.000 € di trattative aperte.",
    excerpt:
      "ROVI lavorava solo con il passaparola, faceva sopralluoghi e progetti per chiunque chiedesse e perdeva trattative sul prezzo. Oggi conosce il budget del cliente prima dell'appuntamento: 25.000 € chiusi in quattro mesi e oltre 200.000 € di trattative aperte.",
    hubExcerpt:
      "Da sopralluoghi e progetti per chiunque a clienti con il budget già detto: 25.000 € chiusi in quattro mesi e oltre 200.000 € di trattative aperte.",
    excerptHighlights: ["conosce il budget del cliente prima dell'appuntamento", "oltre 200.000 € di trattative aperte"],
    sintesi: {
      problema: "Solo passaparola, sopralluoghi e progetti per chiunque, trattative perse sul prezzo.",
      soluzione: "Chi decide al primo incontro, la cifra detta presto, il piano dei lavori presentato di persona, ogni trattativa nel gestionale.",
      risultato: "25.000 € chiusi in quattro mesi e oltre 200.000 € di trattative aperte.",
    },
    metaDescription:
      "ROVI, arredamento negozi: dal solo passaparola a 25.000 € chiusi in quattro mesi e oltre 200.000 € di trattative aperte, con il budget del cliente saputo prima.",
    context: [
      { label: "Settore", value: "Arredamento e allestimento di negozi e locali" },
      { label: "Azienda", value: "ROVI Srl" },
      { label: "Mercato", value: "Italia" },
    ],
    challenge:
      "ROVI il lavoro lo sa fare, e i clienti lo scelgono anche per la cura. In un negozio, un altro preventivo metteva due vetrine da un metro e settantacinque più il banco cassa: messi così, la porta non si apriva più. ROVI le misure le aveva prese sul posto. Il problema era vendere quella professionalità: tutto arrivava dal passaparola, sopralluoghi e progetti si facevano per chiunque chiedesse, e le trattative saltavano sul prezzo.",
    scena: {
      titolo: "Cinque appuntamenti, nessuna firma",
      testo:
        "Un locale da arredare. La trattativa la seguiva la figlia del proprietario: cinque appuntamenti e nessuna firma. In consulenza si è capito perché: le decisioni sui soldi le prendeva il padre, e al tavolo non c'era mai stato. Da lì la prima regola: al primo incontro si capisce chi decide e chi paga, prima di progettare.",
    },
    diagnosis: [
      "Solo passaparola: nessun altro canale per trovare clienti",
      "Sopralluoghi e progetti regalati: a chiunque chiedesse, senza sapere il budget",
      "La guerra dei prezzi: la cura del lavoro non si vedeva nel preventivo",
      "Il preventivo e poi il silenzio: agenda, WhatsApp, nessuna data per richiamare",
    ],
    system: [
      {
        step: "01",
        title: "Chi decide, al primo incontro",
        description:
          "Il primo incontro serve a capire chi decide, chi paga e quanto vuole spendere. Non si progetta ancora.",
      },
      {
        step: "02",
        title: "La cifra detta presto",
        description:
          "La fascia di prezzo si dice subito, in chiamata. Se è sostenibile si fissa il sopralluogo: così si esce solo per chi può spendere.",
      },
      {
        step: "03",
        title: "Il piano dei lavori, presentato di persona",
        description:
          "Non si chiama più preventivo ma piano dei lavori, e si presenta in sede o in videochiamata con lo schermo condiviso. Mai su WhatsApp, e non si lascia in copia prima della firma.",
      },
      {
        step: "04",
        title: "Ogni incontro finisce con una data",
        description:
          "Il prossimo contatto si scrive nel gestionale prima di salutarsi, insieme alla trattativa: cosa ha chiesto, cosa gli serve, chi decide.",
      },
      {
        step: "05",
        title: "Le campagne con il modulo che filtra",
        description:
          "Campagne su Facebook e Instagram per chi sta aprendo o rinnovando un'attività, con le domande su budget, stato del locale e tempi prima dell'appuntamento.",
      },
      {
        step: "06",
        title: "I pagamenti fissati prima",
        description:
          "Bonifico, acconto all'arrivo della merce, saldo allo scarico: come e quando si paga si decide prima di iniziare, per iscritto.",
      },
    ],
    resultsEyebrow: "Dove siamo adesso",
    resultsHeading: "I primi numeri,",
    resultsHeadingHighlight: "e il lavoro continua",
    results: [
      { value: "25K€", label: "Contratti chiusi", detail: "Nei primi quattro mesi di lavoro insieme" },
      { value: "+200K€", label: "Trattative aperte", detail: "In cinque mesi, ancora in corso" },
    ],
    quote: {
      text: "Progetto in corso con Forge Group.",
      author: "ROVI Srl",
      role: "Arredamento negozi",
    },
    evolutionEyebrow: "Prima e dopo",
    evolutionHeading: "Cosa è cambiato",
    evolutionHeadingHighlight: "per ROVI",
    beforeAfter: [
      {
        aspect: "Richieste",
        before: "Solo passaparola",
        after: "Campagne con il modulo che chiede budget, stato del locale e tempi",
      },
      {
        aspect: "Sopralluoghi e progetti",
        before: "Per chiunque chiedesse",
        after: "Solo dopo aver detto la cifra e capito chi decide",
      },
      {
        aspect: "Il preventivo",
        before: "Mandato su WhatsApp, confrontato solo sul prezzo",
        after: "Un piano dei lavori presentato di persona",
      },
      {
        aspect: "Le trattative",
        before: "Agenda cartacea e WhatsApp, nessuno storico",
        after: "Nel gestionale, e ogni incontro finisce con una data",
      },
      {
        aspect: "I pagamenti",
        before: "Decisi strada facendo",
        after: "Fissati per iscritto prima di iniziare",
      },
    ],
    statusBadge: "Progetto attivo · primi contratti chiusi",
    forWhom: [
      "Imprese che lavorano su progetti importanti e vivono solo di passaparola",
      "Imprese che regalano sopralluoghi e progetti a chi non ha ancora deciso di comprare",
      "Titolari che perdono trattative sul prezzo anche quando lavorano meglio degli altri",
    ],
    ...caseStudyLogosBySlug["arredo-commerciale"],
  },
  {
    slug: "software-b2b",
    sector: "Software per l'edilizia",
    title: "Software per l'edilizia: 126.500 € in 90 giorni solo dalle Meta Ads",
    shortTitle: "Software per l'edilizia",
    resultHeadline: "126.500 € di nuovi contratti in 90 giorni, solo dalle Meta Ads.",
    excerpt:
      "DISA trovava clienti solo con chiamate a freddo e referenze. Con le campagne su Meta e il modulo che filtra: 126.500 € di nuovi contratti in 90 giorni a 1,48 € per contatto, e circa 350.000 € in 12 mesi con circa 300 € al mese di pubblicità.",
    hubExcerpt:
      "Dalle chiamate a freddo a 126.500 € di nuovi contratti in 90 giorni, e circa 350.000 € in 12 mesi, solo dalle Meta Ads.",
    excerptHighlights: ["126.500 € di nuovi contratti in 90 giorni", "circa 350.000 € in 12 mesi"],
    sintesi: {
      problema: "Chiamate a freddo, referenze chieste ai clienti, trasferte con chi non conosceva il software.",
      soluzione: "Il messaggio riscritto, i video, le campagne su Meta e il modulo che filtra.",
      risultato: "126.500 € in 90 giorni a 1,48 € per contatto, circa 350.000 € in 12 mesi.",
    },
    metaDescription:
      "DISA, software per l'edilizia: 126.500 € di nuovi contratti in 90 giorni solo dalle Meta Ads, a 1,48 € per contatto, e circa 350.000 € in 12 mesi.",
    context: [
      { label: "Settore", value: "Software per l'edilizia, gare d'appalto" },
      { label: "Azienda", value: "DISA SRL, SOS APPALTI: software per le gare d'appalto" },
      { label: "Mercato", value: "Italia" },
    ],
    challenge:
      "I commerciali di DISA chiamavano a freddo imprenditori edili senza sapere chi fosse interessato, e chiedevano nomi ai clienti. Facevano trasferte per incontrare persone che non conoscevano il software e non sapevano a cosa servisse.",
    scena: {
      titolo: "Non ci credeva",
      testo:
        "Il titolare di DISA non si aspettava niente dalle campagne. Nella video-recensione lo dice lui stesso, «ero scettico all'inizio», e subito dopo racconta i 126.500 € dei primi 90 giorni.",
    },
    diagnosis: [
      "Chiamate a freddo: nessun canale per trovare chi aveva davvero bisogno del software",
      "Referenze chieste ai clienti: il lavoro nuovo dipendeva dal favore di qualcuno",
      "Contatti non consapevoli: chi incontravano non sapeva a cosa servisse il software",
      "Trasferte a vuoto: appuntamenti lontani con poco interesse reale",
    ],
    system: [
      {
        step: "01",
        title: "Il messaggio giusto",
        description:
          "Con DISA abbiamo riscritto come SOS APPALTI si presenta: cosa fa, per chi e perché conviene, così chi arriva capisce subito a cosa gli serve.",
      },
      {
        step: "02",
        title: "I video",
        description:
          "Con il nostro videomaker abbiamo girato i video che spiegano il software, prima ancora del contatto commerciale.",
      },
      {
        step: "03",
        title: "Le campagne su Meta",
        description:
          "Le campagne le gestiamo noi, con circa 300 € al mese di pubblicità, per raggiungere le imprese che partecipano alle gare.",
      },
      {
        step: "04",
        title: "Il modulo che filtra",
        description:
          "Chi risponde alla pubblicità compila un modulo con le informazioni chiave: ai commerciali arrivano persone che conoscono già il software e ne hanno bisogno.",
      },
      {
        step: "05",
        title: "Prima vicino, poi tutta Italia",
        description:
          "Il sistema è partito su un'area vicina alla sede per provarlo insieme a DISA; oggi è pronto per tutta Italia.",
      },
    ],
    results: [
      { value: "+126k", label: "Nuovi contratti", detail: "Nei primi 90 giorni, solo dalle Meta Ads" },
      { value: "€1,48", label: "Costo per contatto", detail: "Solo dalle Meta Ads" },
      { value: "+350k", label: "In 12 mesi", detail: "Con circa 300 € al mese di pubblicità" },
      { value: "97 €", label: "Per ogni euro di pubblicità", detail: "Circa, sulla sola spesa pubblicitaria" },
    ],
    resultNote:
      "I circa 97 € di fatturato per ogni euro sono calcolati sulla sola spesa pubblicitaria, senza il compenso di Forge.",
    quote: {
      text: "126.500€ di fatturato, non me lo aspettavo. Ero scettico all'inizio: questo metodo per me ha funzionato. Lo consiglio a tutte le aziende che vogliono crescere sul mercato.",
      author: "DISA SRL",
      role: "Titolare · Software per l'edilizia",
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
    evolutionEyebrow: "Prima e dopo",
    evolutionHeading: "Cosa è cambiato",
    evolutionHeadingHighlight: "per DISA",
    beforeAfter: [
      {
        aspect: "Richieste",
        before: "Chiamate a freddo e referenze chieste ai clienti",
        after: "Campagne Meta Ads con il modulo che filtra",
      },
      {
        aspect: "Contatti",
        before: "Persone che non conoscevano SOS APPALTI",
        after: "Richieste di chi conosce già il software e ne ha bisogno",
      },
      {
        aspect: "Commerciali",
        before: "Trasferte per appuntamenti a freddo",
        after: "Appuntamenti con clienti interessati",
      },
      {
        aspect: "Contratti",
        before: "Legati al passaparola",
        after: "126.500 € nei primi 90 giorni, circa 350.000 € in 12 mesi",
      },
      {
        aspect: "Mercato",
        before: "La zona vicino alla sede",
        after: "Un sistema pronto per tutta Italia",
      },
    ],
    videoUrl: "/video-recensione.mp4",
    contextPhoneScreenshot: {
      src: "/images/casi-studio/disa-meta-ads-dashboard.png",
      alt: "Le campagne Meta Ads di DISA SRL",
      imageObjectPosition: "center 13%",
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
