"use client";

import { sendGAEvent } from "@next/third-parties/google";

/**
 * Piccoli aiuti condivisi fra il modulo di candidatura e i riquadri
 * "ti chiamiamo noi" (piano del 09/11/2026: modulo corto e clic su
 * WhatsApp recuperati).
 *
 * Lo storage del browser può mancare (finestra privata, dati bloccati):
 * ogni lettura e scrittura sta in un try/catch e il sito funziona
 * comunque, al massimo il riquadro compare una volta in più.
 */

const CHIAVE_INVIATA = "forge_candidatura_inviata";
const CHIAVE_RIQUADRO = "forge_riquadro_visto";
const CHIAVE_CLIC_WA = "forge_wa_clic";

function leggi(store: "local" | "session", chiave: string): string | null {
  try {
    return (store === "local" ? window.localStorage : window.sessionStorage).getItem(chiave);
  } catch {
    return null;
  }
}

function scrivi(store: "local" | "session", chiave: string, valore: string) {
  try {
    (store === "local" ? window.localStorage : window.sessionStorage).setItem(chiave, valore);
  } catch {
    /* storage non disponibile: si va avanti senza */
  }
}

/** Evento GA4 solo se Analytics è caricato. Mai dati personali nei parametri (REGOLE §8). */
export function traccia(nome: string, parametri: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  if (!(window as unknown as { dataLayer?: unknown[] }).dataLayer) return;
  sendGAEvent("event", nome, parametri);
}

/** Dopo una candidatura inviata non si mostrano più i riquadri. */
export function segnaCandidaturaInviata() {
  scrivi("local", CHIAVE_INVIATA, String(Date.now()));
}

export function candidaturaGiaInviata(): boolean {
  return leggi("local", CHIAVE_INVIATA) !== null;
}

/** Il riquadro "al ritorno" compare una volta sola per visitatore. */
export function riquadroRitornoGiaVisto(): boolean {
  return leggi("local", `${CHIAVE_RIQUADRO}_ritorno`) !== null;
}

/** Il riquadro di uscita compare una volta per visita. */
export function riquadroUscitaGiaVisto(): boolean {
  return leggi("session", `${CHIAVE_RIQUADRO}_uscita`) !== null;
}

export function segnaRiquadroVisto(tipo: "ritorno" | "uscita") {
  if (tipo === "ritorno") scrivi("local", `${CHIAVE_RIQUADRO}_ritorno`, "1");
  // Nella stessa visita, dopo un riquadro non ne compare un secondo.
  scrivi("session", `${CHIAVE_RIQUADRO}_uscita`, "1");
}

/** Il tocco su WhatsApp: serve a riconoscere chi torna sul sito senza aver scritto. */
export function segnaClicWhatsApp() {
  scrivi("session", CHIAVE_CLIC_WA, String(Date.now()));
}

/** Millisecondi dall'ultimo tocco su WhatsApp in questa visita, o null. */
export function msDalClicWhatsApp(): number | null {
  const v = leggi("session", CHIAVE_CLIC_WA);
  if (!v) return null;
  const t = Number(v);
  return Number.isFinite(t) ? Date.now() - t : null;
}

export function dimenticaClicWhatsApp() {
  try {
    window.sessionStorage.removeItem(CHIAVE_CLIC_WA);
  } catch {
    /* niente */
  }
}
