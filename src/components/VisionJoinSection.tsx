"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { loadGsapScrollTrigger } from "@/lib/loadGsap";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-vision-join-title",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-vision-join-body",
  display: "swap",
});

type FormState = {
  nome_cognome: string;
  email: string;
  telefono: string;
  occupazione: string;
  racconto: string;
  privacy: boolean;
};

const initialForm: FormState = {
  nome_cognome: "",
  email: "",
  telefono: "",
  occupazione: "",
  racconto: "",
  privacy: false,
};

const inputCls =
  "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/40 backdrop-blur-sm transition-all focus:border-[#C0471A] focus:outline-none focus:ring-[3px] focus:ring-[#C0471A]/20";

const labelCls = "mb-2 block text-[0.9rem] font-medium text-white";

export default function VisionJoinSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState<FormState>(initialForm);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const section = sectionRef.current;
    const copy = copyRef.current;
    const formCol = formRef.current;
    if (!section || !copy || !formCol) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let cleanup: (() => void) | undefined;

    void loadGsapScrollTrigger().then(({ gsap }) => {
      gsap.set([copy, formCol], { opacity: 0, y: 40 });

      const tween = gsap.to([copy, formCol], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => cleanup?.();
  }, []);

  const update = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const validate = (): boolean => {
    if (!form.nome_cognome.trim()) {
      setError("Inserisci nome e cognome.");
      return false;
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Inserisci un indirizzo email valido.");
      return false;
    }
    if (!form.telefono.trim()) {
      setError("Inserisci il numero di telefono.");
      return false;
    }
    if (!form.occupazione.trim()) {
      setError("Indica di cosa ti occupi.");
      return false;
    }
    if (!form.racconto.trim()) {
      setError("Raccontaci chi sei e cosa potresti portare.");
      return false;
    }
    if (!form.privacy) {
      setError("Devi accettare la privacy policy per inviare la candidatura.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/candidatura", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          privacy: form.privacy ? "true" : "false",
          website: honeypot,
        }),
      });

      const json = (await res.json()) as { success?: boolean; message?: string };

      if (!res.ok || !json.success) {
        setError(json.message || "Errore durante l'invio. Riprova.");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Errore di connessione. Riprova tra poco.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="entra-a-far-parte"
      className={`${bricolage.variable} ${hanken.variable} scroll-mt-24 bg-[#1A1A1A] py-[72px] md:py-[120px]`}
      aria-labelledby="vision-join-heading"
    >
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-10 px-6 md:grid-cols-2 md:gap-16">
        <div ref={copyRef}>
          <p
            className="text-[0.85rem] font-semibold uppercase tracking-[0.1em] text-[#C0471A]"
            style={{ fontFamily: "var(--font-vision-join-body)" }}
          >
            Entra a far parte
          </p>
          <h2
            id="vision-join-heading"
            className="mt-4 text-balance leading-[1.1] text-white"
            style={{
              fontFamily: "var(--font-vision-join-title)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 700,
            }}
          >
            La <span className="text-brand-corallo">community</span> è il progetto vero.
          </h2>
          <p
            className="mt-6 text-pretty text-white/75"
            style={{
              fontFamily: "var(--font-vision-join-body)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
            }}
          >
            Forge Group non è fatto solo di chi ci lavora oggi. È fatto di chi condivide lo stesso
            modo di stare al mondo: lealtà, trasparenza, umiltà, lavoro fatto bene. Non guardiamo
            prima al curriculum. Guardiamo a chi sei. Se leggendo la nostra visione hai sentito che
            è anche la tua, raccontaci chi sei e cosa potresti portare. Il resto lo scopriamo da lì.
          </p>
        </div>

        <div ref={formRef}>
          <div className="vision-join-glass rounded-3xl border border-white/15 bg-white/10 p-7 shadow-[0_8px_40px_rgba(0,0,0,0.25)] backdrop-blur-md md:p-10">
            {success ? (
              <div className="py-8 text-center">
                <p
                  className="text-xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-vision-join-title)" }}
                >
                  Grazie. Ti risponderemo presto.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                />

                <div className="mb-5">
                  <label htmlFor="vision-nome" className={labelCls} style={{ fontFamily: "var(--font-vision-join-body)" }}>
                    Nome e cognome
                  </label>
                  <input
                    id="vision-nome"
                    type="text"
                    required
                    value={form.nome_cognome}
                    onChange={(e) => update("nome_cognome", e.target.value)}
                    className={inputCls}
                    style={{ fontFamily: "var(--font-vision-join-body)" }}
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="vision-email" className={labelCls} style={{ fontFamily: "var(--font-vision-join-body)" }}>
                    Email
                  </label>
                  <input
                    id="vision-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={inputCls}
                    style={{ fontFamily: "var(--font-vision-join-body)" }}
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="vision-tel" className={labelCls} style={{ fontFamily: "var(--font-vision-join-body)" }}>
                    Telefono
                  </label>
                  <input
                    id="vision-tel"
                    type="tel"
                    required
                    value={form.telefono}
                    onChange={(e) => update("telefono", e.target.value)}
                    className={inputCls}
                    style={{ fontFamily: "var(--font-vision-join-body)" }}
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="vision-occupazione" className={labelCls} style={{ fontFamily: "var(--font-vision-join-body)" }}>
                    Di cosa ti occupi
                  </label>
                  <input
                    id="vision-occupazione"
                    type="text"
                    required
                    placeholder="Es. copywriter, sviluppatore, venditore..."
                    value={form.occupazione}
                    onChange={(e) => update("occupazione", e.target.value)}
                    className={inputCls}
                    style={{ fontFamily: "var(--font-vision-join-body)" }}
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="vision-racconto" className={labelCls} style={{ fontFamily: "var(--font-vision-join-body)" }}>
                    Raccontaci chi sei e cosa potresti portare a Forge Group
                  </label>
                  <textarea
                    id="vision-racconto"
                    required
                    rows={5}
                    placeholder="Chi sei, cosa fai, perché senti che questa visione è anche la tua."
                    value={form.racconto}
                    onChange={(e) => update("racconto", e.target.value)}
                    className={`${inputCls} min-h-[140px] resize-y`}
                    style={{ fontFamily: "var(--font-vision-join-body)" }}
                  />
                </div>

                <label className="mb-6 flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    checked={form.privacy}
                    onChange={(e) => update("privacy", e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 rounded border-white/30 bg-white/10 text-[#C0471A] focus:ring-[#C0471A]/20"
                  />
                  <span
                    className="text-[0.85rem] leading-snug text-white/70"
                    style={{ fontFamily: "var(--font-vision-join-body)" }}
                  >
                    Ho letto e accetto la{" "}
                    <Link href="/privacy-policy" className="text-brand-corallo underline underline-offset-2 hover:text-[#A93D16]">
                      privacy policy
                    </Link>
                  </span>
                </label>

                {error ? (
                  <p className="mb-4 text-sm text-red-300" role="alert" aria-live="polite">
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C0471A] px-6 py-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#A93D16] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base md:w-auto md:px-8"
                  style={{ fontFamily: "var(--font-vision-join-body)" }}
                >
                  {submitting ? "Invio in corso..." : "Entra a far parte di Forge Group"}
                  {!submitting ? (
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  ) : null}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
