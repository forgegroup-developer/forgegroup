/**
 * Chi firma gli articoli del blog. Gli articoli si alternano tra i due fondatori, ognuno dal suo
 * punto di vista (decisione della proprietà, 28/09/2026). Le biografie contengono solo fatti
 * della Scheda dei fatti: se cambia la Scheda, si cambiano qui.
 */
export type AutoreId = "marco" | "gianpio";

export type Autore = {
  nome: string;
  ruolo: string;
  bio: string;
};

export const AUTORI: Record<AutoreId, Autore> = {
  marco: {
    nome: "Marco Pio Cerbone",
    ruolo: "Fondatore di Forge Group",
    bio: "Viene dal marketing: prima di Forge ha fondato un'agenzia. Con Gianpio ha costruito il Metodo F.O.R.G.E. per le imprese edili.",
  },
  gianpio: {
    nome: "Gianpio Uva",
    ruolo: "Fondatore di Forge Group",
    bio: "Viene dalla vendita: prima vendeva software per l'edilizia. È lui che chiama le imprese che si candidano per lavorare con Forge.",
  },
};
