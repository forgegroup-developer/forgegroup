import { isAllowedRemoteImage } from "./imageHosts";

/**
 * ══════════════════════════════════════════════════════════════════
 * LE REGOLE DELLE IMMAGINI. Leggere prima di aggiungerne una.
 *
 * Scritte il 24/09/2026 insieme a quelle dei font e dei pulsanti, per
 * lo stesso motivo: senza una regola scritta ogni pagina nuova fa a
 * modo suo, e dopo sei mesi non si capisce piu' niente.
 *
 * 1. I PERCORSI STANNO SOLO QUI.
 *    Nessun componente scrive "/images/..." a mano. Se serve una
 *    immagine nuova si aggiunge a questo file e si passa dall'helper.
 *    Un percorso scritto in due posti diventa due percorsi diversi il
 *    giorno in cui si rinomina il file.
 *
 * 2. SEMPRE next/image, MAI <img>.
 *    E' quello che ridimensiona, converte in formato moderno e serve
 *    la misura giusta al telefono. Un <img> manda l'originale intero.
 *
 * 3. CON fill SERVE SEMPRE sizes.
 *    Senza, il browser scarica la versione piu' grande anche su un
 *    telefono. E' l'errore che pesa di piu' e non si vede.
 *
 * 4. priority SOLO SOPRA LA PIEGA, UNA PER PAGINA.
 *    Se sono tutte prioritarie, nessuna lo e'.
 *    Tutto il resto resta lazy, che e' il comportamento normale.
 *
 * 5. IL CONTENITORE HA UN RAPPORTO FISSO.
 *    aspect-ratio in CSS, cosi' lo spazio e' gia' riservato e la
 *    pagina non salta mentre carica.
 *
 * 6. PESO MASSIMO DEL FILE SORGENTE: 300 KB.
 *    Sopra, si ricomprime prima di metterlo in public. next/image
 *    riduce quello che serve, ma parte sempre dall'originale.
 *
 * 7. L'ALT DICE COSA SI VEDE.
 *    "Copertura in lamiera posata su un capannone", non
 *    "edilizia.jpg" e non "immagine". Se l'immagine e' decorativa,
 *    alt="" e basta: un alt inventato e' peggio di nessun alt.
 *
 * 8. FOTO VERE DOVE C'E' UNA PROVA.
 *    Nei casi studio e accanto ai numeri vanno i lavori veri delle
 *    imprese. Una foto di repertorio accanto a un numero fa dubitare
 *    anche del numero.
 * ══════════════════════════════════════════════════════════════════
 */


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
  /** Copertina della videorecensione DISA, l'unico video del sito. */
  videoPoster: "/images/video-recensione-poster.jpg",
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
  const src = featuredImage?.trim();
  // Percorsi locali sempre validi; URL remoti solo dagli host in remotePatterns,
  // altrimenti next/image risponde 400 e l'immagine risulta rotta.
  if (src && (src.startsWith("/") || isAllowedRemoteImage(src))) return src;
  return blogImages[slug] ?? siteImages.heroGrowth;
}
