/**
 * Le domande facoltative che il modulo fa dopo l'invio (dal 09/11/2026:
 * prima stavano dentro il modulo e lo allungavano). Le stesse voci le
 * accetta /api/contact/dettagli: un valore fuori elenco viene scartato.
 */
export const OPZIONI_OSTACOLO = [
  "Aumentare i potenziali clienti da contattare",
  "Aumentare il tasso di conversione e vendere di più",
  "Aumentare la qualità dei clienti e il margine dell'azienda",
] as const;

export const OPZIONI_FONTE = [
  "Su Google",
  "Da ChatGPT o un'altra intelligenza artificiale",
  "Su LinkedIn",
  "Su Instagram o Facebook",
  "Me ne ha parlato un'altra impresa",
  "Ci siamo già sentiti con Forge Group",
  "Altro",
] as const;

/** Da dove parte la candidatura: modulo di una pagina o riquadro "ti chiamiamo noi". */
export const SORGENTI_RIQUADRO = ["riquadro-ritorno", "riquadro-uscita"] as const;
