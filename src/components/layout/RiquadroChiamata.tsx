"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { whatsappHref } from "@/data/contatti";
import {
  candidaturaGiaInviata,
  dimenticaClicWhatsApp,
  msDalClicWhatsApp,
  riquadroRitornoGiaVisto,
  riquadroUscitaGiaVisto,
  segnaCandidaturaInviata,
  segnaRiquadroVisto,
  traccia,
} from "@/lib/leadClient";

type Tipo = "ritorno" | "uscita";

/** Pagine dove il modulo c'è già, o dove un riquadro non ha senso. */
const PAGINE_ESCLUSE = ["/contatti", "/inizia", "/privacy-policy", "/cookie-policy"];

/** Chi torna dopo meno di 4 secondi ha solo sfiorato il tasto; dopo 30 minuti è un'altra visita. */
const RITORNO_MIN_MS = 4_000;
const RITORNO_MAX_MS = 30 * 60_000;

/** Il riquadro di uscita si arma dopo 10 secondi sulla pagina: prima è un rimbalzo, non un'uscita. */
const USCITA_ARMATA_DOPO_MS = 10_000;

const inputCls =
  "w-full bg-brand-bianco border-2 border-brand-bordo rounded-xl px-4 py-3 text-base text-brand-nero placeholder:text-brand-grigio-light focus:border-brand-corallo focus:outline-none focus:ring-2 focus:ring-brand-corallo/20 transition-all";

/**
 * Il riquadro "ti chiamiamo noi" (proprietà, 09/11/2026: "non dobbiamo
 * perdere i click su WhatsApp").
 *
 * - **Al ritorno:** chi tocca WhatsApp e dopo qualche secondo torna sul sito
 *   spesso non ha scritto. Gli si offre la chiamata, una volta sola.
 * - **All'uscita, solo da computer:** quando il mouse va verso la chiusura.
 *   Da telefono no: Google penalizza le finestre che coprono la pagina a chi
 *   arriva dalla ricerca, e su telefono l'uscita non si riconosce bene.
 *
 * Mai prima di WhatsApp: un passaggio in più fra il tocco e la chat farebbe
 * perdere proprio chi era pronto a scrivere.
 */
export default function RiquadroChiamata() {
  const pathname = usePathname() ?? "/";
  const [tipo, setTipo] = useState<Tipo | null>(null);
  const tipoRef = useRef<Tipo | null>(null);
  const escluso = PAGINE_ESCLUSE.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  const apri = useCallback(
    (t: Tipo) => {
      if (tipoRef.current || escluso || candidaturaGiaInviata()) return;
      // Uno solo per visita: dopo il primo riquadro (di qualunque tipo) non ne compare un altro.
      if (riquadroUscitaGiaVisto()) return;
      if (t === "ritorno" && riquadroRitornoGiaVisto()) return;
      segnaRiquadroVisto(t);
      tipoRef.current = t;
      setTipo(t);
      traccia("riquadro_view", { tipo: t, pagina: window.location.pathname });
    },
    [escluso],
  );

  const chiudi = useCallback(() => {
    if (tipoRef.current) traccia("riquadro_chiuso", { tipo: tipoRef.current });
    tipoRef.current = null;
    setTipo(null);
  }, []);

  // Al ritorno da WhatsApp: la scheda torna visibile, o la pagina si ricarica
  // (da telefono WhatsApp a volte apre nella stessa scheda).
  useEffect(() => {
    const controlla = () => {
      if (document.visibilityState !== "visible") return;
      const ms = msDalClicWhatsApp();
      if (ms === null || ms < RITORNO_MIN_MS) return;
      dimenticaClicWhatsApp();
      if (ms > RITORNO_MAX_MS) return;
      traccia("whatsapp_ritorno", { pagina: window.location.pathname });
      apri("ritorno");
    };
    controlla();
    document.addEventListener("visibilitychange", controlla);
    window.addEventListener("pageshow", controlla);
    window.addEventListener("focus", controlla);
    return () => {
      document.removeEventListener("visibilitychange", controlla);
      window.removeEventListener("pageshow", controlla);
      window.removeEventListener("focus", controlla);
    };
  }, [apri]);

  // All'uscita, solo con mouse e schermo da computer.
  useEffect(() => {
    if (escluso) return;
    if (!window.matchMedia("(pointer: fine) and (min-width: 1024px)").matches) return;
    let armato = false;
    const timer = window.setTimeout(() => {
      armato = true;
    }, USCITA_ARMATA_DOPO_MS);
    const esce = (e: MouseEvent) => {
      if (!armato || e.relatedTarget || e.clientY > 0) return;
      apri("uscita");
    };
    document.addEventListener("mouseout", esce);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", esce);
    };
  }, [apri, escluso, pathname]);

  // Esc chiude.
  useEffect(() => {
    if (!tipo) return;
    const tasto = (e: KeyboardEvent) => {
      if (e.key === "Escape") chiudi();
    };
    document.addEventListener("keydown", tasto);
    return () => document.removeEventListener("keydown", tasto);
  }, [tipo, chiudi]);

  if (!tipo) return null;

  const centrato = tipo === "uscita";
  return (
    <div
      className={
        centrato
          ? "fixed inset-0 z-[100] flex items-center justify-center bg-brand-nero/40 p-4 print:hidden"
          : "fixed inset-x-4 bottom-4 z-[100] flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6 print:hidden"
      }
      onClick={centrato ? (e) => e.target === e.currentTarget && chiudi() : undefined}
    >
      <div
        role="dialog"
        aria-modal={centrato}
        aria-labelledby="riquadro-titolo"
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-brand-bordo bg-brand-bianco p-5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] md:p-7"
      >
        <button
          type="button"
          onClick={chiudi}
          aria-label="Chiudi"
          className="touch-target absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-full text-2xl leading-none text-brand-grigio hover:text-brand-nero"
        >
          ×
        </button>
        <ModuloRiquadro tipo={tipo} onChiudi={chiudi} focusIniziale={centrato} />
      </div>
    </div>
  );
}

function ModuloRiquadro({
  tipo,
  onChiudi,
  focusIniziale,
}: {
  tipo: Tipo;
  onChiudi: () => void;
  focusIniziale: boolean;
}) {
  const pathname = usePathname() ?? "/";
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [impresa, setImpresa] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [stato, setStato] = useState<"aperto" | "invio" | "fatto">("aperto");
  const [errore, setErrore] = useState("");
  const primoCampo = useRef<HTMLInputElement | null>(null);
  const sorgente = `riquadro-${tipo}`;

  // Da computer il cursore va nel primo campo; da telefono no, per non aprire la tastiera da sola.
  useEffect(() => {
    if (focusIniziale) primoCampo.current?.focus();
  }, [focusIniziale]);

  const invia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return setErrore("Manca il nome.");
    if (!impresa.trim()) return setErrore("Manca il nome dell'impresa.");
    if (telefono.replace(/\D/g, "").length < 8) {
      return setErrore("Controlla il numero di telefono: sembra incompleto.");
    }
    setErrore("");
    setStato("invio");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_cognome: nome,
          telefono,
          nome_attivita: impresa,
          sorgente,
          pagina: window.location.pathname,
          website: honeypot,
        }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.message || "Non siamo riusciti a inviare. Riprova, o scrivici su WhatsApp.");
      }
      traccia("generate_lead", { form_name: sorgente });
      segnaCandidaturaInviata();
      setStato("fatto");
    } catch (err) {
      setErrore(err instanceof Error ? err.message : "Non siamo riusciti a inviare. Riprova.");
      setStato("aperto");
    }
  };

  if (stato === "fatto") {
    return (
      <div role="status" className="pr-8">
        <p id="riquadro-titolo" className="mb-2 text-xl font-semibold text-brand-nero">
          Fatto.
        </p>
        <p className="mb-5 text-base text-brand-grigio">
          <strong className="chiave">Ti chiama Gianpio entro 48 ore lavorative.</strong>
        </p>
        <button type="button" onClick={onChiudi} className="btn-ghost w-full">
          Chiudi
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={invia} noValidate>
      <p id="riquadro-titolo" className="mb-2 pr-8 text-xl font-semibold leading-snug text-brand-nero">
        {tipo === "ritorno"
          ? "Preferisci che ti chiamiamo noi?"
          : "Prima di chiudere: ha senso lavorare insieme?"}
      </p>
      <p className="mb-5 text-base leading-relaxed text-brand-grigio">
        {tipo === "ritorno" ? (
          <>
            Lascia i tuoi dati.{" "}
            <strong className="chiave">Ti chiama Gianpio entro 48 ore lavorative</strong> per
            capire se ha senso lavorare insieme.
          </>
        ) : (
          <>
            Lo capiamo con una telefonata. Lascia i tuoi dati e{" "}
            <strong className="chiave">ti chiama Gianpio entro 48 ore lavorative</strong>.
          </>
        )}
      </p>

      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="space-y-3">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-brand-nero">Nome e cognome</span>
          <input
            ref={primoCampo}
            className={inputCls}
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            autoComplete="name"
            placeholder="Mario Rossi"
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-brand-nero">Telefono</span>
          <input
            className={inputCls}
            type="tel"
            inputMode="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            autoComplete="tel"
            placeholder="333 1234567"
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-brand-nero">Nome dell&apos;impresa</span>
          <input
            className={inputCls}
            value={impresa}
            onChange={(e) => setImpresa(e.target.value)}
            autoComplete="organization"
            placeholder="Es. Edil Srl"
            required
          />
        </label>
      </div>

      {errore && (
        <p className="mt-3 text-sm font-medium text-brand-corallo-text" role="alert">
          {errore}
        </p>
      )}

      <button
        type="submit"
        disabled={stato === "invio"}
        className="btn-corallo mt-5 w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {stato === "invio" ? "Invio in corso..." : "Chiamatemi"}
      </button>

      {tipo === "uscita" && (
        <p className="mt-4 text-center text-sm text-brand-grigio">
          Preferisci scrivere?{" "}
          <a
            href={whatsappHref(pathname)}
            target="_blank"
            rel="noopener noreferrer"
            data-wa="riquadro-uscita"
            className="font-semibold text-brand-corallo-text hover:underline"
          >
            Apri WhatsApp
          </a>
        </p>
      )}

      <p className="mt-4 text-center text-xs text-brand-grigio-light">
        Inviando accetti la nostra{" "}
        <Link href="/privacy-policy" className="text-brand-corallo-text hover:underline">
          Privacy Policy
        </Link>
        . I tuoi dati servono solo a richiamarti.
      </p>
    </form>
  );
}
