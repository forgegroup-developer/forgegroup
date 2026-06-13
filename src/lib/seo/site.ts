/**
 * Configurazione SEO centralizzata — sitemap, mirror AI, documentazione.
 * Aggiornare qui quando si aggiunge una nuova pagina indicizzabile.
 */
export const SITE_URL = "https://www.forgegroup.it";

/** Titolo principale — tab browser, Open Graph, posizionamento keyword */
export const SITE_TITLE =
  "Forge Group Italia | Acquisizione Clienti B2B & Growth Hacking";

export const SITE_NAME = "Forge Group Italia";

export const SITE_TITLE_TEMPLATE = "%s | Forge Group Italia";

export const SITE_DESCRIPTION =
  "Forge Group Italia: acquisizione clienti B2B e growth hacking per imprese che vogliono sistemi prevedibili di marketing e vendita. Oltre 30 clienti soddisfatti, €350K+ generati in 12 mesi.";

export const SITE_KEYWORDS = [
  "forge group italia",
  "acquisizione clienti b2b",
  "growth hacking italia",
  "growth hacking",
  "acquisizione clienti",
  "lead generation b2b italia",
  "marketing b2b italia",
  "agenzia marketing b2b",
  "sistemi di vendita b2b",
  "agenzia marketing campania",
];

export type SeoRoute = {
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** Incluso in llms.txt come pagina HTML principale */
  inLlmsMainPages?: boolean;
};

/** Pagine statiche indicizzabili (escluse policy legali da llms main se preferito) */
export const STATIC_SEO_ROUTES: SeoRoute[] = [
  { path: "/", priority: 1, changeFrequency: "weekly", inLlmsMainPages: true },
  { path: "/servizi", priority: 0.9, changeFrequency: "monthly", inLlmsMainPages: true },
  { path: "/casi-studio", priority: 0.9, changeFrequency: "monthly", inLlmsMainPages: true },
  { path: "/contatti", priority: 0.9, changeFrequency: "yearly", inLlmsMainPages: true },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly", inLlmsMainPages: true },
  { path: "/chi-siamo-e-manifesto", priority: 0.7, changeFrequency: "monthly", inLlmsMainPages: true },
  { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookie-policy", priority: 0.3, changeFrequency: "yearly" },
];

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
