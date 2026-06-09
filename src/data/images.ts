/** Percorsi immagini professionali in /public/images */
export const caseStudyImages: Record<string, string> = {
  "software-b2b": "/images/casi-studio/software-b2b.jpg",
  edilizia: "/images/casi-studio/edilizia.jpg",
  "arredo-commerciale": "/images/casi-studio/arredo-commerciale.jpg",
  "hotel-hospitality": "/images/casi-studio/hotel-hospitality.jpg",
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
  consulenza: "/images/servizi/imprenditore-consulenza.png",
} as const;

export function getCaseStudyImage(slug: string): string {
  return caseStudyImages[slug] ?? "/images/casi-studio/software-b2b.jpg";
}

export function getBlogImage(slug: string): string {
  return blogImages[slug] ?? siteImages.heroGrowth;
}
