/**
 * ══════════════════════════════════════════════════════════════════
 * I NUMERI DEL SITO. Unica fonte, per decisione della proprietà (29/09/2026).
 *
 * 1. Ogni cifra in euro o in percentuale che compare sul sito viene da qui.
 *    Sono i numeri della tabella "Numeri" della Scheda dei fatti, e solo
 *    quelli: niente stime, niente arrotondamenti nuovi, niente numeri presi
 *    dalle call senza che la proprietà li abbia confermati.
 * 2. Un numero nuovo si aggiunge PRIMA alla Scheda dei fatti, poi qui.
 * 3. `npm run controlla:sito` segnala ogni cifra del sito che non è in
 *    questo file (o nell'elenco delle eccezioni dello script, con il motivo).
 * ══════════════════════════════════════════════════════════════════
 */

/** Le forme in cui i numeri dei casi possono comparire. */
export const NUMERI_AMMESSI = [
  // DISA: solo dalle Meta Ads (va sempre scritto)
  "126.500 €",
  "€126.500",
  "126.500€",
  "+126k",
  "1,48 €",
  "€1,48",
  // Dal 04/11/2026 (videorecensione dopo 12 mesi): circa 300.000 € in 12 mesi
  // con 6.000 € di pubblicità in tutto, circa 500 € al mese, circa 50 € per euro.
  "300.000 €",
  "300.000€",
  "+300k",
  "+300K€",
  "6.000 €",
  "500 €",
  "50 €",
  // Tetti Top: mai la cifra del sopralluogo. "0 €" = "senza pubblicità" (Scheda)
  "0 €", "0€",
  "175.000 €",
  "175K€",
  "175.000€",
  // ROVI
  "25.000 €",
  "25K€",
  "200.000 €",
  "+200K€",
] as const;

export const recensioniGoogle = {
  voto: "5,0",
  totale: 6,
  testo: "Mi sono trovato benissimo, fanno davvero la differenza!",
  autore: "Fabio Dell'Erario",
} as const;

/** I tre casi, come li racconta la landing. */
export const casi = [
  {
    slug: "software-edilizia",
    chi: "DISA",
    settore: "Software per l'edilizia",
    numero: "300.000 €",
    numeroDetto: "in 12 mesi, solo dalle Meta Ads",
    prima:
      "I commerciali chiamavano a freddo imprenditori edili senza sapere chi fosse interessato, e chiedevano nomi ai clienti.",
    dopo: "Circa 300.000 € in un anno con 6.000 € di pubblicità in tutto, circa 500 € al mese. Nei primi 90 giorni 126.500 € di nuovi contratti, a 1,48 € per contatto.",
  },
  {
    slug: "edilizia",
    chi: "Tetti Top",
    settore: "Coperture e lattoneria",
    numero: "4 al mese",
    numeroDetto: "clienti qualificati, senza pubblicità",
    prima:
      "Viveva di passaparola, con mesi pieni e mesi vuoti, e faceva preventivi a chiunque chiedesse.",
    dopo: "Preventivi fino a 175.000 €, e il sopralluogo è diventato a pagamento.",
  },
  {
    slug: "arredo-commerciale",
    chi: "ROVI",
    settore: "Arredamento negozi",
    numero: "25.000 €",
    numeroDetto:
      "chiusi in quattro mesi, e oltre 200.000 € di trattative aperte",
    prima:
      "Tutto dal passaparola, sopralluoghi e progetti per chiunque chiedesse, trattative che saltavano sul prezzo.",
    dopo: "Oggi conosce il budget del cliente prima dell'appuntamento.",
  },
];
