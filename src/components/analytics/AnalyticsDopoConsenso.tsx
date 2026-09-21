"use client";

import { useSyncExternalStore } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * Google Analytics pesa 187 KB e prima si scaricava sempre, anche per chi
 * rifiutava: con il consenso negato non raccoglieva niente, e quei KB erano
 * buttati. Qui lo carichiamo solo dopo che il visitatore ha accettato.
 *
 * iubenda numera le finalita': 1 tecnici, 2 funzionalita', 4 misurazione.
 * Google Analytics sta nella 4. Il banner non avvisa quando qualcuno
 * sceglie, quindi il consenso lo guardiamo noi: e' uno stato che vive fuori
 * da React, percio' useSyncExternalStore invece di un effetto.
 */
const FINALITA_MISURAZIONE = 4;
const OGNI = 800;
const SMETTI_DOPO = 10 * 60 * 1000;

type ConsensoIubenda = {
  cs?: { consent?: { purposes?: Record<string, boolean> } };
};

/**
 * Chi torna ha gia' scelto, e la scelta sta nel cookie _iub_cs-<sito> fin dal
 * primo byte della pagina. Leggerlo da li' fa partire Analytics subito, senza
 * aspettare che il JavaScript di iubenda finisca di girare: aspettandolo, la
 * prima visita di pagina partiva dopo 7,5 secondi, e chi usciva prima non
 * veniva contato.
 */
function sceltaSalvata(): Record<string, boolean> | undefined {
  const riga = document.cookie.split("; ").find((c) => c.startsWith("_iub_cs-"));
  if (!riga) return undefined;
  try {
    const valore = decodeURIComponent(riga.slice(riga.indexOf("=") + 1));
    return (JSON.parse(valore) as { purposes?: Record<string, boolean> }).purposes;
  } catch {
    return undefined;
  }
}

function misurazioneAccettata(): boolean {
  if (typeof window === "undefined") return false;
  if (sceltaSalvata()?.[FINALITA_MISURAZIONE] === true) return true;
  const iub = (window as unknown as { _iub?: ConsensoIubenda })._iub;
  return iub?.cs?.consent?.purposes?.[FINALITA_MISURAZIONE] === true;
}

/** Chi non tocca il banner smette di essere controllato dopo dieci minuti. */
function osserva(avvisa: () => void) {
  if (misurazioneAccettata()) return () => {};
  const inizio = Date.now();
  const controllo = window.setInterval(() => {
    if (misurazioneAccettata()) {
      window.clearInterval(controllo);
      avvisa();
    } else if (Date.now() - inizio > SMETTI_DOPO) {
      window.clearInterval(controllo);
    }
  }, OGNI);
  return () => window.clearInterval(controllo);
}

export default function AnalyticsDopoConsenso({ gaId }: { gaId: string }) {
  const accettato = useSyncExternalStore(osserva, misurazioneAccettata, () => false);
  if (!accettato) return null;
  return <GoogleAnalytics gaId={gaId} />;
}
