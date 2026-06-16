"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Props = {
  variant?: "compact" | "featured";
};

export default function FooterNewsletter({ variant = "featured" }: Props) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setMessage("Inserisci un indirizzo email valido.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, website: honeypot }),
      });
      const data = (await res.json()) as { success?: boolean; message?: string };

      if (!res.ok || !data.success) {
        setStatus("error");
        setMessage(data.message ?? "Qualcosa è andato storto. Riprova.");
        return;
      }

      setStatus("success");
      setMessage("Iscrizione ricevuta. Grazie!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Errore di connessione. Riprova tra poco.");
    }
  }

  const isFeatured = variant === "featured";

  return (
    <div className={isFeatured ? "" : "mt-5"}>
      {isFeatured ? (
        <div className="max-w-xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Newsletter
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] h-0 w-0 opacity-0 pointer-events-none"
            />
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email per la newsletter
            </label>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                id="footer-newsletter-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                placeholder="La tua email"
                autoComplete="email"
                disabled={status === "loading"}
                className="min-w-0 flex-1 rounded-full border border-white/70 bg-white/20 px-4 py-3 text-base text-white placeholder:text-white/80 outline-none transition-colors focus:border-white focus:bg-white/25 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="shrink-0 rounded-full border border-white bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-brand-corallo transition-colors hover:bg-brand-pesca-light disabled:opacity-60"
              >
                {status === "loading" ? "..." : "Iscriviti"}
              </button>
            </div>
          </form>
          {message ? (
            <p
              className={`mt-2 text-xs leading-snug ${
                status === "success" ? "text-brand-pesca-light" : "text-white"
              }`}
              role={status === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          ) : null}
          <p className="mt-2 text-[10px] leading-snug text-brand-pesca-light">
            Iscrivendoti accetti la{" "}
            <Link href="/privacy-policy" className="font-semibold text-white underline underline-offset-2 hover:text-brand-pesca-light">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      ) : (
        <>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white">
            Newsletter
          </p>
          <p className="mb-3 text-xs leading-snug text-brand-pesca-light">
            Resta aggiornato su strategie e casi studio B2B.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute -left-[9999px] h-0 w-0 opacity-0 pointer-events-none"
            />
            <label htmlFor="footer-newsletter-email" className="sr-only">
              Email per la newsletter
            </label>
            <div className="flex gap-2">
              <input
                id="footer-newsletter-email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== "idle") {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                placeholder="La tua email"
                autoComplete="email"
                disabled={status === "loading"}
                className="min-w-0 flex-1 rounded-full border border-white/70 bg-white/20 px-3 py-3 text-base text-white placeholder:text-white/80 outline-none transition-colors focus:border-white focus:bg-white/25 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="touch-target shrink-0 rounded-full border border-white bg-white px-4 text-xs font-bold uppercase tracking-wide text-brand-corallo transition-colors hover:bg-brand-pesca-light disabled:opacity-60"
              >
                {status === "loading" ? "..." : "Iscriviti"}
              </button>
            </div>
          </form>
          {message ? (
            <p
              className={`mt-2 text-xs leading-snug ${
                status === "success" ? "text-brand-pesca-light" : "text-white"
              }`}
              role={status === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          ) : null}
          <p className="mt-2 text-[10px] leading-snug text-brand-pesca-light">
            Iscrivendoti accetti la{" "}
            <Link href="/privacy-policy" className="font-semibold text-white underline underline-offset-2 hover:text-brand-pesca-light">
              Privacy Policy
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
}
