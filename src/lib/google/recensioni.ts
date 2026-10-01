import { recensioniGoogle } from "@/data/prove";

/**
 * Le recensioni Google della scheda Forge Group, lette dalle Places API
 * (New) e aggiornate una volta al giorno. Dati pubblici della scheda: nessun
 * dato del sito va a Google.
 *
 * Servono due variabili su Vercel:
 *   GOOGLE_PLACES_API_KEY  chiave con solo "Places API (New)" abilitata,
 *                          limitata a questa API
 *   GOOGLE_PLACE_ID        l'id della scheda (se manca si cerca per nome)
 * Senza chiave, o se Google non risponde, si usano i dati fissi di prove.ts.
 * Costo: una chiamata al giorno, dentro la quota gratuita di Google.
 */

export type Recensione = {
  autore: string;
  foto?: string;
  voto: number;
  testo?: string;
  quando?: string;
  link?: string;
};

export type RecensioniGoogle = {
  voto: number;
  totale: number;
  recensioni: Recensione[];
  linkScheda?: string;
  dalVivo: boolean;
};

const UN_GIORNO = 60 * 60 * 24;

const riserva: RecensioniGoogle = {
  voto: Number(recensioniGoogle.voto.replace(",", ".")),
  totale: recensioniGoogle.totale,
  recensioni: [{ autore: recensioniGoogle.autore, voto: 5, testo: recensioniGoogle.testo }],
  dalVivo: false,
};

type RispostaPlace = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    text?: { text?: string };
    originalText?: { text?: string };
    relativePublishTimeDescription?: string;
    authorAttribution?: { displayName?: string; photoUri?: string; uri?: string };
  }[];
};

async function trovaPlaceId(chiave: string): Promise<string | undefined> {
  const r = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": chiave,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: "Forge Group Italia Fontanarosa", languageCode: "it" }),
    next: { revalidate: UN_GIORNO },
  });
  if (!r.ok) return undefined;
  const j = (await r.json()) as { places?: { id: string }[] };
  return j.places?.[0]?.id;
}

export async function leggiRecensioniGoogle(): Promise<RecensioniGoogle> {
  const chiave = process.env.GOOGLE_PLACES_API_KEY;
  if (!chiave) return riserva;
  try {
    const id = process.env.GOOGLE_PLACE_ID || (await trovaPlaceId(chiave));
    if (!id) return riserva;
    const r = await fetch(`https://places.googleapis.com/v1/places/${id}?languageCode=it`, {
      headers: {
        "X-Goog-Api-Key": chiave,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
      },
      next: { revalidate: UN_GIORNO },
    });
    if (!r.ok) return riserva;
    const p = (await r.json()) as RispostaPlace;
    if (!p.rating || !p.userRatingCount) return riserva;
    return {
      voto: p.rating,
      totale: p.userRatingCount,
      linkScheda: p.googleMapsUri,
      dalVivo: true,
      recensioni: (p.reviews ?? []).map((v) => ({
        autore: v.authorAttribution?.displayName ?? "Cliente Google",
        foto: v.authorAttribution?.photoUri,
        link: v.authorAttribution?.uri,
        voto: v.rating ?? 5,
        testo: (v.originalText?.text ?? v.text?.text)?.trim() || undefined,
        quando: v.relativePublishTimeDescription,
      })),
    };
  } catch {
    return riserva;
  }
}
