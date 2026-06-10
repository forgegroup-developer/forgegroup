/** Percorsi immagini professionali in /public/images */
export const caseStudyImages: Record<string, string> = {
  "software-b2b": "/images/casi-studio/software-b2b.jpg",
  edilizia: "/images/casi-studio/edilizia.jpg",
  "arredo-commerciale": "/images/casi-studio/arredo-commerciale.jpg",
  "hotel-hospitality": "/images/casi-studio/hotel-hospitality.jpg",
};

/** Focal point per mostrare tutti i soggetti nelle copertine 16:9 */
export const caseStudyImagePosition: Record<string, string> = {
  "software-b2b": "50% 42%",
  edilizia: "54% 38%",
  "arredo-commerciale": "50% 40%",
  "hotel-hospitality": "50% 52%",
};

/** Fit per card stack: cover riempie il pannello, contain per soggetti larghi */
export const caseStudyImageFit: Record<string, "cover" | "contain"> = {
  "software-b2b": "cover",
  edilizia: "cover",
  "arredo-commerciale": "contain",
  "hotel-hospitality": "cover",
};

export const blogImages: Record<string, string> = {
  "come-acquisire-clienti-b2b-campania":
    "/images/blog/come-acquisire-clienti-b2b-campania.jpg",
  "sistema-vendita-b2b-dalla-lead-al-contratto":
    "/images/blog/sistema-vendita-b2b-dalla-lead-al-contratto.jpg",
  "agenzia-marketing-b2b-napoli": "/images/blog/agenzia-marketing-b2b-napoli.jpg",
};

export const siteImages = {
  heroGrowth: "/images/hero/hero-growth.jpg",
  videoPoster: "/images/video-recensione-poster.png",
} as const;

/** Grafiche showcase hero — doppio marquee verticale */
export const heroShowcaseImages = {
  consulenza: "/images/hero/hero-consulenza.png",
  crmIntegrato: "/images/hero/hero-crm-integrato.png",
  metaAds: "/images/hero/hero-meta-ads.png",
  formazioneCommerciale: "/images/hero/hero-formazione-commerciale.png",
} as const;

export const serviziSidebarImages = {
  acquisizione: "/images/servizi/imprenditore-acquisizione.png",
  vendite: "/images/servizi/imprenditore-vendite.png",
  consulenza: "/images/servizi/imprenditrice-consulenza.png",
} as const;

export function getCaseStudyImage(slug: string): string {
  return caseStudyImages[slug] ?? "/images/casi-studio/software-b2b.jpg";
}

export function getCaseStudyImagePosition(slug: string): string {
  return caseStudyImagePosition[slug] ?? "50% 50%";
}

export function getCaseStudyImageFit(slug: string): "cover" | "contain" {
  return caseStudyImageFit[slug] ?? "cover";
}

export function getBlogImage(slug: string): string {
  return blogImages[slug] ?? siteImages.heroGrowth;
}
