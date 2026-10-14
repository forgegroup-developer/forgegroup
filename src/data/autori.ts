/**
 * Chi firma gli articoli del blog. Gli articoli si alternano tra i due fondatori, ognuno dal suo
 * punto di vista (decisione della proprietà, 28/09/2026). Le biografie contengono solo fatti
 * della Scheda dei fatti: se cambia la Scheda, si cambiano qui. I lavori di prima di Forge non si
 * scrivono (Scheda, "Chi è Forge", 29/09/2026).
 *
 * Ogni autore ha la sua pagina (/autori/[slug]): per Google e per le AI è la prova che dietro gli
 * articoli ci sono persone vere, collegate a Forge Group e ai loro profili LinkedIn.
 */
export type AutoreId = "marco" | "gianpio";

export type Autore = {
  slug: string;
  nome: string;
  ruolo: string;
  bio: string;
  /** Description della pagina autore: 140-155 caratteri (REGOLE-DEL-SITO §7). */
  descrizione: string;
  foto: string;
  linkedin: string;
};

export const AUTORI: Record<AutoreId, Autore> = {
  marco: {
    slug: "marco-pio-cerbone",
    nome: "Marco Pio Cerbone",
    ruolo: "Fondatore di Forge Group",
    bio: "Con Gianpio è entrato in contatto con centinaia di imprese edili e ne ha analizzato i processi scendendo sul campo: richieste, sopralluoghi, preventivi, firma. In Forge segue il marketing e le consulenze.",
    descrizione:
      "Marco Pio Cerbone, fondatore di Forge Group: segue il marketing e le consulenze per le imprese edili. Qui trovi i suoi articoli su richieste e pubblicità.",
    foto: "/images/team/foto-marco.webp",
    linkedin: "https://www.linkedin.com/in/marco-pio-cerbone-01520b2a6",
  },
  gianpio: {
    slug: "gianpio-uva",
    nome: "Gianpio Uva",
    ruolo: "Fondatore di Forge Group",
    bio: "Con Marco è entrato in contatto con centinaia di imprese edili e ne ha analizzato i processi scendendo sul campo. In Forge segue la vendita: è lui che chiama le imprese che si candidano per lavorare con noi.",
    descrizione:
      "Gianpio Uva, fondatore di Forge Group: segue la vendita e chiama le imprese che si candidano. Qui trovi i suoi articoli su trattative e gestionale.",
    foto: "/images/team/foto-gianpio.jpg",
    linkedin: "https://www.linkedin.com/in/gianpio-uva-9170432b9",
  },
};

export const AUTORE_IDS = Object.keys(AUTORI) as AutoreId[];

export function autorePath(id: AutoreId): string {
  return `/autori/${AUTORI[id].slug}`;
}

export function autoreDaSlug(slug: string): AutoreId | undefined {
  return AUTORE_IDS.find((id) => AUTORI[id].slug === slug);
}
