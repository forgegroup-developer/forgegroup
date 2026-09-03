/**
 * Configurazione SEO centralizzata — sitemap, mirror AI, documentazione.
 * Aggiornare qui quando si aggiunge una nuova pagina indicizzabile.
 */
export const SITE_URL = "https://www.forgegroup.it";

/** Titolo principale — tab browser, Open Graph, posizionamento keyword.
    Cluster A (marketing impresa edile) + categoria rivendicata. Fuori il
    cluster growth hacking: parlava a marketer, non a imprenditori edili. */
export const SITE_TITLE =
  "Acquisizione clienti per imprese edili | Forge Group";

export const SITE_NAME = "Forge Group Italia";

export const SITE_TITLE_TEMPLATE = "%s | Forge Group Italia";

export const SITE_DESCRIPTION =
  "Richieste qualificate, processi di vendita e formazione commerciale per le imprese edili. Non ci fermiamo al contatto: entriamo nella trattativa con te.";

/** Profili social ufficiali — footer, schema sameAs, documentazione */
export const SOCIAL_PROFILES = {
  facebook: "https://www.facebook.com/profile.php?id=61590577058663",
  instagram: "https://www.instagram.com/forgegroupitalia/",
  linkedin: "https://www.linkedin.com/company/forge-group-italia",
} as const;

export const SOCIAL_SAME_AS = Object.values(SOCIAL_PROFILES);

export const SITE_KEYWORDS = [
  "forge group italia",
  "marketing impresa edile",
  "marketing per imprese edili",
  "trovare clienti impresa edile",
  "pubblicita impresa edile",
  "acquisizione clienti imprese edili",
  "reparto commerciale esterno edilizia",
  "ricerca personale edile",
  "controllo di gestione impresa edile",
  "sito web impresa edile",
  "marketing per serramentisti",
  "crm edilizia",
];

export type SeoRoute = {
  path: string;
  label: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** Incluso in llms.txt come pagina HTML principale */
  inLlmsMainPages?: boolean;
  /** false = esclusa da sitemap (es. pagine legali con noindex) */
  indexable?: boolean;
};

/** Pagine statiche — policy legali presenti ma non in sitemap (noindex) */
export const STATIC_SEO_ROUTES: SeoRoute[] = [
  { path: "/", label: "Home", priority: 1, changeFrequency: "weekly", inLlmsMainPages: true },
  {
    path: "/servizi",
    label: "Servizi B2B",
    priority: 0.9,
    changeFrequency: "monthly",
    inLlmsMainPages: true,
  },
  {
    path: "/casi-studio",
    label: "Casi studio",
    priority: 0.9,
    changeFrequency: "monthly",
    inLlmsMainPages: true,
  },
  {
    path: "/visione",
    label: "Lavora con noi",
    priority: 0.8,
    changeFrequency: "monthly",
    inLlmsMainPages: true,
  },
  {
    path: "/contatti",
    label: "Contatti",
    priority: 0.9,
    changeFrequency: "yearly",
    inLlmsMainPages: true,
  },
  {
    path: "/blog",
    label: "Blog",
    priority: 0.8,
    changeFrequency: "weekly",
    inLlmsMainPages: true,
  },
  {
    path: "/privacy-policy",
    label: "Privacy policy",
    priority: 0.3,
    changeFrequency: "yearly",
    indexable: false,
  },
  {
    path: "/cookie-policy",
    label: "Cookie policy",
    priority: 0.3,
    changeFrequency: "yearly",
    indexable: false,
  },
];

export function getIndexableStaticRoutes(): SeoRoute[] {
  return STATIC_SEO_ROUTES.filter((route) => route.indexable !== false);
}

export function absoluteUrl(path: string): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
