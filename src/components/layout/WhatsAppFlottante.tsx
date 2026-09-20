"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { WHATSAPP, whatsappHref } from "@/data/contatti";
import IconaWhatsApp from "@/components/ui/IconaWhatsApp";

/** Oltre questa soglia l'etichetta si ritira e resta l'icona: in cima
    alla pagina dice cosa fa il tasto, piu' giu' non deve coprire il testo.
    Su telefono l'etichetta non c'e' mai: aperta copriva il testo della
    hero, e li' lo schermo e' tutto quello che c'e'. */
const SOGLIA_SCROLL = 320;

/**
 * Il tasto WhatsApp fisso, in basso a destra: e' dove arriva il pollice
 * ed e' dove lo mettono tutti, quindi dove lo si cerca. Sta sopra al
 * pulsante delle preferenze cookie di iubenda, che occupa l'angolo.
 *
 * Corallo e non verde: il corallo sul sito vuol dire "qui si clicca", e
 * il verde sta solo nel blocco confronto. Il segno basta a riconoscerlo.
 */
export default function WhatsAppFlottante() {
  const pathname = usePathname() ?? "/";
  const [ritirato, setRitirato] = useState(false);

  useEffect(() => {
    const aggiorna = () => setRitirato(window.scrollY > SOGLIA_SCROLL);
    window.addEventListener("scroll", aggiorna, { passive: true });
    return () => window.removeEventListener("scroll", aggiorna);
  }, []);

  // Un ascoltatore solo per tutti i link a WhatsApp del sito, anche
  // quelli dentro pagine rese dal server che un onClick non possono
  // averlo. Conta il tocco e da dove e' partito.
  useEffect(() => {
    const conta = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href*="wa.me/"]');
      if (!link) return;
      if (!(window as unknown as { dataLayer?: unknown[] }).dataLayer) return;
      sendGAEvent("event", "whatsapp_click", {
        posizione: link.getAttribute("data-wa") ?? "altro",
        pagina: window.location.pathname,
      });
    };
    document.addEventListener("click", conta);
    return () => document.removeEventListener("click", conta);
  }, []);

  return (
    <a
      href={whatsappHref(pathname)}
      target="_blank"
      rel="noopener noreferrer"
      data-wa="flottante"
      aria-label={WHATSAPP.etichetta}
      className="fixed right-4 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-[90] flex h-14 min-w-14 items-center justify-center rounded-full bg-brand-corallo px-3.5 text-white shadow-[0_12px_28px_-10px_rgba(111,42,18,0.55)] transition-colors hover:bg-brand-corallo-dark print:hidden"
    >
      <IconaWhatsApp className="h-7 w-7 shrink-0" />
      <span
        aria-hidden
        className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width,opacity,margin] duration-300 motion-reduce:transition-none ${
          ritirato
            ? "ml-0 max-w-0 opacity-0"
            : "ml-0 max-w-0 opacity-0 sm:ml-2.5 sm:mr-1.5 sm:max-w-[12rem] sm:opacity-100"
        }`}
      >
        {WHATSAPP.etichetta}
      </span>
    </a>
  );
}
