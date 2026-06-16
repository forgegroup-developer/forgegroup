/** Dati condivisi tra Privacy Policy e Cookie Policy — aggiornare qui le revisioni legali. */
export const LEGAL = {
  lastUpdated: "16 giugno 2026",
  controllerName: "Forge Group Italia",
  controllerShortName: "Forge Group",
  controllerEmail: "info@forgegroup.it",
  controllerLocation: "Campania, Italia",
  siteUrl: "https://www.forgegroup.it",
  garanteUrl: "https://www.garanteprivacy.it",
  garanteReclamiUrl: "https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/4535524",
} as const;

export const LEGAL_PROCESSORS = [
  {
    name: "Vercel Inc.",
    role: "Hosting del sito web e infrastruttura cloud",
    location: "Stati Uniti d'America / Unione Europea",
    privacyUrl: "https://vercel.com/legal/privacy-policy",
  },
  {
    name: "Resend Inc.",
    role: "Invio e gestione delle email transazionali (form contatti, newsletter, risposte automatiche)",
    location: "Stati Uniti d'America",
    privacyUrl: "https://resend.com/legal/privacy-policy",
  },
] as const;
