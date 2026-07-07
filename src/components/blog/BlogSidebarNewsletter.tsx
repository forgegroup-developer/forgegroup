"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";

export default function BlogSidebarNewsletter() {
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

      sendGAEvent("event", "newsletter_signup", { location: "blog_sidebar" });
      setStatus("success");
      setMessage("Iscrizione ricevuta. Grazie!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Errore di connessione. Riprova tra poco.");
    }
  }

  return (
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
      <label htmlFor="blog-sidebar-newsletter-email" className="sr-only">
        Email per la newsletter
      </label>
      <div className="flex flex-col gap-2">
        <input
          id="blog-sidebar-newsletter-email"
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
          className="w-full rounded-xl border border-white/40 bg-white/15 px-4 py-2.5 text-sm text-white placeholder:text-white/70 outline-none focus:border-white focus:bg-white/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-brand-corallo hover:bg-brand-pesca-light transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "..." : "Iscriviti"}
        </button>
      </div>
      {message ? (
        <p
          className={`mt-2 text-xs ${status === "success" ? "text-brand-pesca-light" : "text-white"}`}
          role={status === "error" ? "alert" : "status"}
        >
          {message}
        </p>
      ) : null}
      <p className="mt-2 text-[10px] leading-snug text-white/75">
        Iscrivendoti accetti la{" "}
        <Link href="/privacy-policy" className="font-semibold text-white underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
