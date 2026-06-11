"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Props = {
  variant?: "compact" | "featured";
};

export default function FooterNewsletter({ variant = "featured" }: Props) {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email: trimmed }),
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
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-end md:gap-10">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/85">
              ✦ Newsletter
            </p>
            <h3
              className="text-2xl font-semibold leading-tight text-white md:text-3xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Resta aggiornato su strategie e casi studio B2B
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/90 md:text-lg">
              Inserisci la tua email e ricevi insight utili per far crescere la tua azienda.
            </p>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email per la newsletter
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
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
                  className="min-w-0 flex-1 rounded-full border-2 border-white/50 bg-white/10 px-5 py-3.5 text-base text-white placeholder:text-white/55 outline-none transition-colors focus:border-white focus:bg-white/15 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="shrink-0 rounded-full border-2 border-white bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-brand-corallo transition-colors hover:bg-brand-pesca-light disabled:opacity-60"
                >
                  {status === "loading" ? "..." : "Iscriviti"}
                </button>
              </div>
            </form>
            {message ? (
              <p
                className={`mt-3 text-sm leading-snug ${
                  status === "success" ? "text-brand-pesca-light" : "text-white"
                }`}
                role={status === "error" ? "alert" : "status"}
              >
                {message}
              </p>
            ) : null}
            <p className="mt-3 text-xs leading-relaxed text-white/65">
              Iscrivendoti accetti la{" "}
              <Link href="/privacy-policy" className="underline hover:text-white/85">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      ) : (
        <>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/80">
            Newsletter
          </p>
          <p className="mb-3 text-xs leading-snug text-white/85">
            Resta aggiornato su strategie e casi studio B2B.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
                className="min-w-0 flex-1 rounded-full border border-white/45 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-white focus:bg-white/15 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="shrink-0 rounded-full border border-white bg-white px-3.5 py-2 text-xs font-bold uppercase tracking-wide text-brand-corallo transition-colors hover:bg-brand-pesca-light disabled:opacity-60"
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
          <p className="mt-2 text-[10px] leading-snug text-white/60">
            Iscrivendoti accetti la{" "}
            <Link href="/privacy-policy" className="underline hover:text-white/80">
              Privacy Policy
            </Link>
            .
          </p>
        </>
      )}
    </div>
  );
}
