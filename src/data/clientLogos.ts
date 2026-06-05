/** Loghi clienti — nomi file = azienda nel logo (PNG trasparenti) */
export const clientLogos = {
  disa: {
    src: "/images/clienti/cliente-disa.png",
    alt: "DISA Appalti & Servizi",
  },
  tettitop: {
    src: "/images/clienti/cliente-tettitop.png",
    alt: "Tetti Top",
  },
  rovi: {
    src: "/images/clienti/cliente-rovi.png",
    alt: "ROVI Arredo Negozi",
  },
  sosAppalti: {
    src: "/images/clienti/cliente-sos-appalti.png",
    alt: "SOS Appalti",
  },
  evaConsulting: {
    src: "/images/clienti/cliente-eva-consulting.png",
    alt: "EVA Consulting",
  },
} as const;

/** Logo per ogni caso studio (slug → cliente + eventuale prodotto) */
export const caseStudyLogosBySlug = {
  "software-b2b": {
    clientLogo: clientLogos.disa.src,
    clientLogoAlt: clientLogos.disa.alt,
    productLogo: clientLogos.sosAppalti.src,
    productLogoAlt: clientLogos.sosAppalti.alt,
  },
  edilizia: {
    clientLogo: clientLogos.tettitop.src,
    clientLogoAlt: clientLogos.tettitop.alt,
  },
  "arredo-commerciale": {
    clientLogo: clientLogos.rovi.src,
    clientLogoAlt: clientLogos.rovi.alt,
  },
} as const;

export type CaseStudySlug = keyof typeof caseStudyLogosBySlug;

export function getCaseStudyLogos(slug: string) {
  return caseStudyLogosBySlug[slug as CaseStudySlug];
}
