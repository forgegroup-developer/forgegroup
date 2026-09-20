/**
 * Recapiti diretti. Il sito si apre da un link su WhatsApp, su un
 * telefono, subito dopo una chiamata: chi legge deve poter rispondere
 * dallo stesso posto da cui e' arrivato, senza compilare niente.
 *
 * Per scelta della proprieta' il numero non si scrive in pagina, ne'
 * in testata ne' nella hero: c'e' solo il tasto WhatsApp fisso.
 */

/** Numero WhatsApp: +39 393 042 6090 */
const NUMERO_E164 = "393930426090";

const MESSAGGIO_BASE =
  "Buongiorno, vi scrivo dal sito di Forge Group. Vorrei capire come lavorate.";

/**
 * Il messaggio gia' scritto cambia con la pagina da cui parte. I
 * concorrenti mandano a tutti lo stesso "vorrei maggiori informazioni":
 * cosi' invece chi risponde sa gia' cosa ha letto l'imprenditore, ed e'
 * la prima domanda della prequalifica che non serve piu' fare.
 * Vince il prefisso piu' lungo.
 */
const MESSAGGI_PER_PAGINA: Record<string, string> = {
  "/casi-studio/edilizia":
    "Buongiorno, ho visto sul vostro sito il caso di Tetti Top. Vorrei capire se si può fare qualcosa di simile per la mia impresa.",
  "/casi-studio/arredo-commerciale":
    "Buongiorno, ho visto sul vostro sito il caso di ROVI. Vorrei capire se si può fare qualcosa di simile per la mia azienda.",
  "/casi-studio/software-b2b":
    "Buongiorno, ho visto sul vostro sito il caso di DISA. Vorrei capire se si può fare qualcosa di simile per la mia azienda.",
  "/casi-studio":
    "Buongiorno, ho guardato i vostri casi studio. Vorrei capire se si può fare qualcosa di simile per la mia impresa.",
  "/crm-gestionale-edilizia":
    "Buongiorno, ho visto sul vostro sito il CRM gestionale. Vorrei capire come funziona per un'impresa come la mia.",
  "/servizi":
    "Buongiorno, ho letto sul vostro sito come lavorate. Vorrei parlarne per la mia impresa.",
  "/contatti":
    "Buongiorno, vorrei lo studio di fattibilità per la mia impresa. Preferisco parlarne qui invece di compilare il modulo.",
  "/visione":
    "Buongiorno, ho letto la vostra visione e mi piacerebbe lavorare con voi.",
};

function messaggioPer(pathname: string): string {
  const prefisso = Object.keys(MESSAGGI_PER_PAGINA)
    .filter((p) => pathname === p || pathname.startsWith(`${p}/`))
    .sort((a, b) => b.length - a.length)[0];
  return prefisso ? MESSAGGI_PER_PAGINA[prefisso] : MESSAGGIO_BASE;
}

export function whatsappHref(pathname = "/"): string {
  return `https://wa.me/${NUMERO_E164}?text=${encodeURIComponent(messaggioPer(pathname))}`;
}

export const WHATSAPP = {
  etichetta: "Scrivici su WhatsApp",
} as const;
