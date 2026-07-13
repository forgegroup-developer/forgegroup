/** Percorsi immagini professionali in /public/images */
export const caseStudyImages: Record<string, string> = {
  "software-b2b": "/images/casi-studio/software-b2b.jpg",
  edilizia: "/images/casi-studio/edilizia.jpg",
  "arredo-commerciale": "/images/casi-studio/arredo-commerciale.jpg",
  "hotel-hospitality": "/images/casi-studio/hotel-hospitality.jpg",
};

export type CaseStudyImageLayout = {
  fit: "cover" | "contain";
  position: string;
};

/** Layout per copertina: inquadratura e fit ottimizzati per ogni foto 16:9 */
export const caseStudyImageLayout: Record<string, CaseStudyImageLayout> = {
  "software-b2b": { fit: "cover", position: "50% 42%" },
  edilizia: { fit: "cover", position: "54% 36%" },
  "arredo-commerciale": { fit: "cover", position: "50% 36%" },
  "hotel-hospitality": { fit: "cover", position: "50% 54%" },
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
  videoPoster: "/images/video-recensione-poster.jpg",
  /** Derivato da PNG originale 1920×1080, ridimensionato a 640px */
  videoPosterMobile: "/images/video-recensione-poster-mobile.jpg",
  gianpioReel: "/video-gianpio-reel.mp4",
  gianpioReelPoster: "/images/team/gianpio-reel-poster.jpg",
  marcoReel: "/video-marco-reel.mp4",
  marcoReelPoster: "/images/team/marco-reel-poster.jpg",
} as const;

/** Illustrazioni macroaree — stesse della home (magnete, bersaglio, bussola) */
export const serviziSidebarImages = {
  acquisizione: "/images/servizi/magnete.webp",
  vendite: "/images/servizi/bersaglio.webp",
  consulenza: "/images/servizi/bussola.webp",
} as const;

export function getCaseStudyImage(slug: string): string {
  return caseStudyImages[slug] ?? "/images/casi-studio/software-b2b.jpg";
}

export function getCaseStudyImageLayout(slug: string): CaseStudyImageLayout {
  return caseStudyImageLayout[slug] ?? { fit: "cover", position: "50% 50%" };
}

export function getCaseStudyImagePosition(slug: string): string {
  return getCaseStudyImageLayout(slug).position;
}

export function getCaseStudyImageFit(slug: string): "cover" | "contain" {
  return getCaseStudyImageLayout(slug).fit;
}

export function getBlogImage(slug: string, featuredImage?: string): string {
  if (featuredImage?.trim()) return featuredImage.trim();
  return blogImages[slug] ?? siteImages.heroGrowth;
}
