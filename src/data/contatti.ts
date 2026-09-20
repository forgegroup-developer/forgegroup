/**
 * Recapiti diretti. Il sito si apre da un link su WhatsApp, su un
 * telefono, subito dopo una chiamata: chi legge deve poter rispondere
 * dallo stesso posto da cui e' arrivato, senza compilare niente.
 */

/** Numero unico, telefono e WhatsApp: +39 393 042 6090 */
const NUMERO_E164 = "393930426090";

export const TELEFONO = {
  /** Come si legge in pagina */
  etichetta: "393 042 6090",
  href: `tel:+${NUMERO_E164}`,
} as const;

const MESSAGGIO_WHATSAPP =
  "Buongiorno, vi scrivo dal sito di Forge Group. Vorrei capire come lavorate.";

export const WHATSAPP = {
  etichetta: "Scrivici su WhatsApp",
  href: `https://wa.me/${NUMERO_E164}?text=${encodeURIComponent(MESSAGGIO_WHATSAPP)}`,
} as const;
