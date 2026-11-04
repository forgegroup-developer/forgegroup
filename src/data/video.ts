/**
 * La videorecensione di DISA dopo 12 mesi, pubblicata su YouTube il
 * 29/10/2026 (canale FORGE GROUP, sottotitoli impressi nel video).
 *
 * Titolo, descrizione, durata e capitoli sono quelli di YouTube: se cambiano
 * lì, si cambiano qui. Servono al lettore (il video), a Google (VideoObject
 * con i "momenti chiave") e alle intelligenze artificiali (llms.txt): i fatti
 * devono essere gli stessi dappertutto (REGOLE-DEL-SITO §7 bis, punto 4).
 *
 * Il video vecchio (/video-recensione.mp4, 126.500 € in 90 giorni) è stato
 * tolto: il suo indirizzo porta qui con un redirect (next.config.ts), perché
 * è già dentro le email di risposta mandate prima del 04/11/2026.
 */
export const videoDisa = {
  id: "GdAON_dLDMQ",
  url: "https://www.youtube.com/watch?v=GdAON_dLDMQ",
  /** youtube-nocookie: nessun cookie di YouTube finché il video non parte. */
  embedUrl: "https://www.youtube-nocookie.com/embed/GdAON_dLDMQ",
  titolo:
    "300.000 € di fatturato in 12 mesi tramite le Meta Ads | Metodo FORGE in Edilizia",
  descrizione:
    "DISA, software per l'edilizia, dopo 12 mesi di lavoro con Forge Group: 6.000 € di pubblicità in tutto, circa 500 € al mese, e circa 300.000 € di fatturato, solo dalle Meta Ads. Forge ha gestito le campagne e filtrato le richieste con un modulo; DISA le ha richiamate con i suoi setter e i suoi commerciali hanno chiuso i contratti.",
  copertina: "/images/video-recensione-disa-12-mesi.jpg",
  /** Pubblicazione su YouTube, con il fuso di YouTube. */
  dataPubblicazione: "2026-10-29T04:06:18-07:00",
  /** 2:39, letta da YouTube. */
  durataSecondi: 159,
  /** I capitoli della descrizione di YouTube: per Google sono i "momenti chiave". */
  capitoli: [
    { inizio: 0, titolo: "Il risultato dopo un anno" },
    { inizio: 11, titolo: "Chi è DISA" },
    { inizio: 27, titolo: "Il fatturato in 12 mesi" },
    { inizio: 55, titolo: "Un canale da continuare" },
    { inizio: 79, titolo: "La rifaresti?" },
    { inizio: 97, titolo: "A chi lo consiglia" },
    { inizio: 110, titolo: "Cosa direbbe a sé stesso un anno fa" },
    { inizio: 136, titolo: "A chi ha paura di investire" },
  ],
} as const;
