/**
 * Articoli e categorie del vecchio posizionamento (B2B, Campania, lead generation), ritirati.
 * Un elenco solo, letto da due parti:
 * - `next.config.ts` ne fa redirect permanenti: Google li toglie dall'indice e passa il valore
 *   alla pagina di arrivo;
 * - `src/lib/blog/articlesAsync.ts` li scarta anche se nel DB risultano pubblicati, così spariscono
 *   da sitemap, categorie, ricerca, feed e `llms.txt`. Il DB non si tocca.
 * Per ritirare un articolo si aggiunge una riga qui.
 */
export type Ritiro = { slug: string; destinazione: string };

/** Ritirati il 30/09/2026, più `lead-generation-b2b-guida-2026` il 14/10/2026. */
export const ARTICOLI_RITIRATI: Ritiro[] = [
  { slug: "come-acquisire-clienti-b2b-campania", destinazione: "/servizi" },
  { slug: "sistema-vendita-b2b-dalla-lead-al-contratto", destinazione: "/servizi" },
  { slug: "agenzia-marketing-b2b-napoli", destinazione: "/" },
  { slug: "quanto-costa-lead-generation-b2b", destinazione: "/servizi" },
  { slug: "agenzia-marketing-b2b-campania-checklist", destinazione: "/" },
  { slug: "come-farsi-pagare-di-piu-prodotti-servizi", destinazione: "/servizi" },
  { slug: "come-aumentare-numero-clienti-attivita", destinazione: "/" },
  { slug: "aumentare-clienti-smettere-passaparola", destinazione: "/blog/come-smettere-dipendere-passaparola" },
  { slug: "lead-generation-b2b-guida-2026", destinazione: "/servizi" },
];

export const SLUG_RITIRATI = new Set(ARTICOLI_RITIRATI.map((r) => r.slug));

/**
 * Categorie rinominate: il vecchio nome resta negli articoli del DB, qui diventa quello nuovo.
 * "Gestione e CRM" → "Gestionale": sul sito si scrive "gestionale", mai "CRM"
 * (proprietà, 14/10/2026).
 */
export const CATEGORIE_RINOMINATE: Record<string, string> = {
  "Gestione e CRM": "Gestionale",
};

/** Casi studio che hanno cambiato indirizzo: il vecchio diceva "b2b" (14/10/2026). */
export const CASI_RINOMINATI: Ritiro[] = [
  { slug: "software-b2b", destinazione: "/casi-studio/software-edilizia" },
];

/** Indirizzi di categoria che non esistono più → dove vanno. */
export const CATEGORIE_RITIRATE: Ritiro[] = [
  { slug: "agenzia-marketing-b2b", destinazione: "/blog" },
  { slug: "vendite-b2b", destinazione: "/blog" },
  // Restava solo "come-farsi-pagare-di-più", ritirato.
  { slug: "pricing-e-margine", destinazione: "/blog" },
  // Restava solo la vecchia versione di "come-smettere-dipendere-passaparola", ora dal file.
  { slug: "acquisizione-clienti", destinazione: "/blog" },
  { slug: "gestione-e-crm", destinazione: "/blog/categoria/gestionale" },
];
