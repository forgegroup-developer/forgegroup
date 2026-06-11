"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import AnimatedStepper, { Step } from "@/components/AnimatedStepper";
import HeroGooeySection from "@/components/HeroGooeySection";

type FormData = {
  nome_attivita: string;
  occupazione: string;
  ostacolo: string;
  acquisizione_attuale: string;
  nome_cognome: string;
  telefono: string;
  email: string;
};

const initialFormData: FormData = {
  nome_attivita: "",
  occupazione: "",
  ostacolo: "",
  acquisizione_attuale: "",
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
  { name: "nome_attivita", label: "Nome attività / Azienda", type: "text", placeholder: "Es. Edil Srl" },
  {
    name: "occupazione",
    label: "Di cosa ti occupi? (in 1-3 frasi, come se mi parlassi di persona)",
    type: "textarea",
    rows: 4,
    placeholder: "Raccontaci cosa fa la tua azienda...",
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
  { name: "nome_cognome", label: "Nome e Cognome", type: "text", placeholder: "Mario Rossi" },
  { name: "telefono", label: "Telefono", type: "tel", placeholder: "+39 333 1234567" },
  { name: "email", label: "Email", type: "email", placeholder: "nome@azienda.it" },
];

const inputCls =
  "w-full bg-brand-bianco border-2 border-brand-bordo rounded-xl px-5 py-4 text-lg text-brand-nero placeholder:text-brand-grigio-light focus:border-brand-corallo focus:outline-none focus:ring-2 focus:ring-brand-corallo/20 transition-all";

export default function ContattiForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [stepError, setStepError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const current = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const updateField = (name: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setStepError("");
  };

  const validateStep = useCallback(
    (index = stepIndex): boolean => {
      const step = steps[index];
      const value = form[step.name].trim();
      if (!value) {
        setStepError("Completa questa domanda per continuare.");
        return false;
      }
      if (step.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setStepError("Inserisci un indirizzo email valido.");
        return false;
      }
      setStepError("");
      return true;
    },
    [form, stepIndex]
  );

  const goNext = useCallback(() => {
    if (!validateStep()) return;
    if (isLastStep) return;
    setStepIndex((s) => s + 1);
  }, [isLastStep, validateStep]);

  const handleSubmit = async (): Promise<boolean> => {
    if (!validateStep()) return false;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });

      if (!response.ok) {
        const j = await response.json().catch(() => ({}));
        throw new Error(j.message || "Errore durante l'invio della candidatura.");
      }

      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Si è verificato un errore inaspettato.";
      setError(message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [stepIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || e.shiftKey) return;
    if (current.type === "textarea" || current.type === "select") return;
    e.preventDefault();
    if (isLastStep) {
      void handleSubmit();
    } else {
      goNext();
    }
  };

  const renderField = (step: FormStep) => {
    if (step.type === "select" && step.options) {
      return (
        <div className="space-y-3">
          {step.options.map((opt) => {
            const selected = form[step.name] === opt.value;
            const stepIsLast = steps.indexOf(step) === steps.length - 1;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  updateField(step.name, opt.value);
                  if (!stepIsLast) {
                    window.setTimeout(() => setStepIndex((i) => i + 1), 280);
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
      );
    }

    if (step.type === "textarea") {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={form[step.name]}
          onChange={(e) => updateField(step.name, e.target.value)}
          rows={step.rows ?? 4}
          placeholder={step.placeholder}
          className={`${inputCls} resize-y min-h-[140px]`}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type={step.type}
        value={form[step.name]}
        onChange={(e) => updateField(step.name, e.target.value)}
        placeholder={step.placeholder}
        className={inputCls}
        autoComplete={
          step.type === "email" ? "email" : step.type === "tel" ? "tel" : "organization"
        }
      />
    );
  };

  if (success) {
    return (
      <HeroGooeySection
        className="min-h-[70vh] flex items-center py-20"
        innerClassName="max-w-2xl mx-auto px-4 text-center"
      >
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
      </HeroGooeySection>
    );
  }

  return (
    <>
      <HeroGooeySection innerClassName="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">
          ✦ Prequalifica Strategica
        </p>
        <h1 className="heading-hero font-semibold text-brand-nero leading-tight">
          Candida la tua <span className="text-brand-corallo">azienda</span>.
        </h1>
      </HeroGooeySection>

      <section className="pb-20 md:pb-28 section-bianco pt-8 md:pt-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div onKeyDown={handleKeyDown}>
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
          <AnimatedStepper
            variant="typeform"
            currentStep={stepIndex + 1}
            onStepChange={(s) => setStepIndex(s - 1)}
            onBeforeNext={() => validateStep()}
            onBeforeComplete={() => handleSubmit()}
            disableStepIndicators
            renderFooter={({ currentStep, handleBack, handleNext, isLastStep: last }) => (
              <>
                {stepError && (
                  <p className="mb-4 text-sm font-medium text-brand-corallo" role="alert" aria-live="polite">
                    {stepError}
                  </p>
                )}
                {error && (
                  <div
                    className="mb-4 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm"
                    role="alert"
                    aria-live="assertive"
                  >
                    {error}
                  </div>
                )}

                <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 1 || submitting}
                    className="touch-target text-sm font-semibold text-brand-grigio hover:text-brand-nero disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Indietro
                  </button>

                  {last ? (
                    <button
                      type="button"
                      onClick={() => void handleSubmit()}
                      disabled={submitting}
                      className="btn-corallo px-10 py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "INVIO IN CORSO..." : "INVIA CANDIDATURA"}
                    </button>
                  ) : current.type !== "select" ? (
                    <button type="button" onClick={handleNext} className="btn-corallo px-10 py-4 text-base">
                      Continua →
                    </button>
                  ) : (
                    <p className="text-sm text-brand-grigio text-center sm:text-right">
                      Seleziona un&apos;opzione per continuare
                    </p>
                  )}
                </div>

                {last && (
                  <p className="text-xs text-center text-brand-grigio-light mt-6">
                    Inviando il modulo accetti la nostra{" "}
                    <Link href="/privacy-policy" className="text-brand-corallo hover:underline">
                      Privacy Policy
                    </Link>
                    . I tuoi dati saranno usati solo per valutare la candidatura.
                  </p>
                )}
              </>
            )}
          >
            {steps.map((step) => (
              <Step key={step.name} title={step.label}>
                {renderField(step)}
              </Step>
            ))}
          </AnimatedStepper>
        </div>
        </div>
      </section>
    </>
  );
}
