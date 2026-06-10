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
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
