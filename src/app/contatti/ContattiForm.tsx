"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import LightBeamButton from "@/components/LightBeamButton";
type FormData = {
  nome_attivita: string;
  occupazione: string;
  fatturato: string;
  ostacolo: string;
  acquisizione_attuale: string;
  reparto_commerciale: string;
  dipendenti: string;
  tempistiche: string;
  budget: string;
  ruolo: string;
  provenienza: string;
  nome_cognome: string;
  telefono: string;
  email: string;
};

const initialFormData: FormData = {
  nome_attivita: "",
  occupazione: "",
  fatturato: "",
  ostacolo: "",
  acquisizione_attuale: "",
  reparto_commerciale: "",
  dipendenti: "",
  tempistiche: "",
  budget: "",
  ruolo: "",
  provenienza: "",
  nome_cognome: "",
  telefono: "",
  email: "",
};

type StepType = "text" | "textarea" | "tel" | "email" | "select";

type FormStep = {
  name: keyof FormData;
  label: string;
  type: StepType;
  placeholder?: string;
  rows?: number;
  options?: { value: string; label: string }[];
};

const steps: FormStep[] = [
  { name: "nome_attivita", label: "Nome attività / Azienda", type: "text", placeholder: "Es. Rossi Srl" },
  {
    name: "occupazione",
    label: "Di cosa ti occupi? (in 1-3 frasi, come se mi parlassi di persona)",
    type: "textarea",
    rows: 4,
    placeholder: "Raccontaci cosa fa la tua azienda...",
  },
  {
    name: "fatturato",
    label: "Qual è l'attuale fatturato annuo?",
    type: "select",
    options: [
      { value: "Meno di 250.000€", label: "Meno di 250.000€" },
      { value: "Tra 250.000€ e 1.000.000€", label: "Tra 250.000€ e 1.000.000€" },
      { value: "Oltre 1.000.000€", label: "Oltre 1.000.000€" },
    ],
  },
  {
    name: "ostacolo",
    label: "Qual è il tuo più grande ostacolo attualmente?",
    type: "select",
    options: [
      { value: "Aumentare i potenziali clienti da contattare", label: "Aumentare i potenziali clienti da contattare" },
      { value: "Aumentare il tasso di conversione e vendere di più", label: "Aumentare il tasso di conversione e vendere di più" },
      {
        value: "Aumentare la qualità dei clienti e il margine dell'azienda",
        label: "Aumentare la qualità dei clienti e il margine dell'azienda",
      },
    ],
  },
  {
    name: "acquisizione_attuale",
    label: "Come acquisisci clienti ad oggi?",
    type: "textarea",
    rows: 3,
    placeholder: "Passaparola, ads, fiere, outbound...",
  },
  {
    name: "reparto_commerciale",
    label: "Hai un reparto commerciale? Come lo gestisci?",
    type: "textarea",
    rows: 3,
    placeholder: "Descrivi team, processi, strumenti...",
  },
  {
    name: "dipendenti",
    label: "Quanti collaboratori/dipendenti ha l'azienda?",
    type: "text",
    placeholder: "Es. 12 persone",
  },
  {
    name: "tempistiche",
    label: "Se siamo in linea con i tuoi obiettivi, quando vorresti iniziare?",
    type: "select",
    options: [
      { value: "Subito", label: "Subito" },
      { value: "Tra 1 e 4 settimane", label: "Tra 1 e 4 settimane" },
      { value: "Tra 1 e 3 mesi", label: "Tra 1 e 3 mesi" },
    ],
  },
  {
    name: "budget",
    label: "Qual è il tuo budget mensile per Marketing e Vendite?",
    type: "select",
    options: [
      { value: "da 1.500€ a 2.500€ / mese", label: "da 1.500€ a 2.500€ / mese" },
      { value: "da 2.500€ a 5.000€ / mese", label: "da 2.500€ a 5.000€ / mese" },
      { value: "da 5.000€ a 10.000€ / mese", label: "da 5.000€ a 10.000€ / mese" },
      { value: "+ 10.000€ / mese", label: "+ 10.000€ / mese" },
    ],
  },
  {
    name: "ruolo",
    label: "Qual è il tuo ruolo in azienda?",
    type: "text",
    placeholder: "Es. Titolare, CEO, Direttore commerciale",
  },
  {
    name: "provenienza",
    label: "Come sei venuto a conoscenza di Forge Group?",
    type: "select",
    options: [
      { value: "Ricerca Google", label: "Ricerca Google" },
      { value: "LinkedIn", label: "LinkedIn" },
      { value: "Facebook / Instagram", label: "Facebook / Instagram" },
      { value: "Passaparola / Referenza", label: "Passaparola / Referenza" },
      { value: "Evento dal vivo", label: "Evento dal vivo" },
      { value: "Altro", label: "Altro" },
    ],
  },
  { name: "nome_cognome", label: "Nome e Cognome", type: "text", placeholder: "Mario Rossi" },
  { name: "telefono", label: "Telefono", type: "tel", placeholder: "+39 333 1234567" },
  { name: "email", label: "Email", type: "email", placeholder: "nome@azienda.it" },
];

const inputCls =
  "w-full bg-brand-bianco border-2 border-brand-bordo rounded-xl px-5 py-4 text-lg text-brand-nero placeholder:text-brand-grigio-light focus:border-brand-corallo focus:outline-none focus:ring-2 focus:ring-brand-corallo/20 transition-all";

export default function ContattiForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [stepError, setStepError] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const current = steps[step];
  const progress = ((step + 1) / steps.length) * 100;
  const isLastStep = step === steps.length - 1;

  const updateField = (name: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setStepError("");
  };

  const validateStep = useCallback((): boolean => {
    const value = form[current.name].trim();
    if (!value) {
      setStepError("Completa questa domanda per continuare.");
      return false;
    }
    if (current.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStepError("Inserisci un indirizzo email valido.");
      return false;
    }
    setStepError("");
    return true;
  }, [current, form]);

  const goNext = useCallback(() => {
    if (!validateStep()) return;
    if (isLastStep) return;
    setStep((s) => s + 1);
  }, [isLastStep, validateStep]);

  const goBack = () => {
    if (step === 0) return;
    setStepError("");
    setStep((s) => s - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const j = await response.json().catch(() => ({}));
        throw new Error(j.message || "Errore durante l'invio della candidatura.");
      }

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Si è verificato un errore inaspettato.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || e.shiftKey) return;
    if (current.type === "textarea") return;
    e.preventDefault();
    if (isLastStep) {
      void handleSubmit();
    } else {
      goNext();
    }
  };

  if (success) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl text-center">
          <div className="w-20 h-20 bg-brand-corallo rounded-full flex items-center justify-center mb-8 mx-auto">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ Candidatura ricevuta</p>
          <h1 className="heading-section font-semibold text-brand-nero leading-tight mb-6">
            Grazie. Adesso <span className="text-brand-corallo">analizziamo</span> il tuo caso.
          </h1>
          <p className="text-lg text-brand-grigio leading-relaxed mb-8">
            Abbiamo ricevuto le tue informazioni. Se riterremo che ci siano i presupposti per una collaborazione
            profittevole per entrambi, ti contatteremo entro <strong>48 ore lavorative</strong>.
          </p>
          <Link href="/" className="btn-ghost">
            Torna alla Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-16 pb-20 md:pt-24 md:pb-28 section-bianco">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ Prequalifica Strategica</p>
        <h1 className="heading-hero font-semibold text-brand-nero leading-tight mb-10 md:mb-12">
          Candida la tua <span className="text-brand-corallo">azienda</span>.
        </h1>

        <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-brand-grigio mb-2">
              <span>
                Domanda {step + 1} di {steps.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-brand-bordo overflow-hidden">
              <div
                className="h-full rounded-full bg-brand-corallo transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div
            key={step}
            className="animate-[fadeSlideIn_0.35s_ease-out]"
            onKeyDown={handleKeyDown}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-nero leading-snug mb-8">
              {current.label}
              <span className="text-brand-corallo ml-1">*</span>
            </h2>

            {current.type === "select" && current.options ? (
              <div className="space-y-3">
                {current.options.map((opt) => {
                  const selected = form[current.name] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        updateField(current.name, opt.value);
                        if (!isLastStep) {
                          setTimeout(() => setStep((s) => s + 1), 280);
                        }
                      }}
                      className={`w-full text-left rounded-xl border-2 px-5 py-4 text-base md:text-lg transition-all duration-200 ${
                        selected
                          ? "border-brand-corallo bg-brand-corallo/5 text-brand-nero shadow-sm"
                          : "border-brand-bordo bg-brand-bianco text-brand-grigio hover:border-brand-corallo/50 hover:bg-brand-panna/50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            ) : current.type === "textarea" ? (
              <textarea
                ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                value={form[current.name]}
                onChange={(e) => updateField(current.name, e.target.value)}
                rows={current.rows ?? 4}
                placeholder={current.placeholder}
                className={`${inputCls} resize-y min-h-[140px]`}
              />
            ) : (
              <input
                ref={inputRef as React.RefObject<HTMLInputElement>}
                type={current.type}
                value={form[current.name]}
                onChange={(e) => updateField(current.name, e.target.value)}
                placeholder={current.placeholder}
                className={inputCls}
                autoComplete={current.type === "email" ? "email" : current.type === "tel" ? "tel" : "organization"}
              />
            )}

            {stepError && <p className="mt-4 text-sm font-medium text-brand-corallo">{stepError}</p>}
            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">{error}</div>
            )}

            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 mt-10">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0 || submitting}
                className="text-sm font-semibold text-brand-grigio hover:text-brand-nero disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                ← Indietro
              </button>

              {isLastStep ? (
                <LightBeamButton
                  type="button"
                  onClick={() => void handleSubmit()}
                  disabled={submitting}
                  size="lg"
                >
                  {submitting ? "INVIO IN CORSO..." : "INVIA CANDIDATURA"}
                </LightBeamButton>
              ) : current.type !== "select" ? (
                <LightBeamButton type="button" onClick={goNext} size="lg">
                  Continua →
                </LightBeamButton>
              ) : (
                <p className="text-sm text-brand-grigio text-center sm:text-right">Seleziona un&apos;opzione per continuare</p>
              )}
            </div>

            {isLastStep && (
              <p className="text-xs text-center text-brand-grigio-light mt-6">
                Inviando il modulo accetti la nostra{" "}
                <Link href="/privacy-policy" className="text-brand-corallo hover:underline">
                  Privacy Policy
                </Link>
                . I tuoi dati saranno usati solo per valutare la candidatura.
              </p>
            )}
          </div>
      </div>
    </section>
  );
}
