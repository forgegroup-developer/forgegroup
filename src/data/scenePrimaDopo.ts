import { iniziaImages, primaDopoImages } from "@/data/images";

/*
 * Le scene del prima e dopo dei casi (immagini AI, sempre con la scritta).
 * Le usano la pagina di ogni caso e le storie dei clienti in home.
 * `commento` racconta la situazione che la foto mostra.
 */
export type Scena = { src: string; alt: string; commento: string };

const scenaCantiere: Scena = {
  src: iniziaImages.cantiereTelefono,
  alt: "Un imprenditore edile in cantiere guarda sul telefono le richieste, mentre due operai alzano un muro",
  commento: "Le richieste arrivano già filtrate, e il titolare le segue dal telefono anche in cantiere.",
};

export const scenePrimaDopo: Record<string, { prima: Scena; dopo: Scena }> = {
  edilizia: {
    prima: {
      src: iniziaImages.sopralluogoAVuoto,
      alt: "Durante un sopralluogo il tecnico prende le misure mentre la cliente guarda il telefono",
      commento: "Il sopralluogo fatto a chi voleva solo un prezzo da confrontare.",
    },
    dopo: scenaCantiere,
  },
  "arredo-commerciale": {
    prima: {
      src: iniziaImages.prezzoPiuBasso,
      alt: "Un titolare guarda due preventivi affiancati: il cliente indica quello più basso",
      commento: "Due preventivi sul tavolo, e il cliente guarda solo il totale più basso.",
    },
    dopo: {
      src: primaDopoImages.roviDopo,
      alt: "In un negozio appena arredato, l'arredatore e la titolare guardano sorridendo il piano dei lavori su un tablet",
      commento: "Il piano dei lavori presentato di persona, e il negozio consegnato.",
    },
  },
  "software-b2b": {
    prima: {
      src: primaDopoImages.disaPrima,
      alt: "Un commerciale alla scrivania al telefono, stanco, davanti a un elenco di numeri da chiamare",
      commento: "Chiamate a freddo a chi non conosceva il software.",
    },
    dopo: {
      src: primaDopoImages.disaDopo,
      alt: "Lo stesso commerciale sorride in videochiamata con un imprenditore edile in cantiere, con il contratto firmato sulla scrivania",
      commento: "In videochiamata con un imprenditore che sa già cosa gli serve.",
    },
  },
};
