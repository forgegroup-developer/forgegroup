"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";
import AnimatedStepper, { Step } from "@/components/sezioni/AnimatedStepper";
import HeroGooeySection from "@/components/sfondi/HeroGooeySection";

type FormData = {
  nome_attivita: string;
  zona: string;
  ostacolo: string;
  fonte: string;
  nome_cognome: string;
  telefono: string;
  email: string;
};

const initialFormData: FormData = {
  nome_attivita: "",
  zona: "",
  ostacolo: "",
  fonte: "",
  nome_cognome: "",
  telefono: "",
  email: "",
};

type FieldType = "text" | "tel" | "email" | "select";

type Field = {
  name: keyof FormData;
  /** Etichetta sopra il campo: serve solo quando la schermata ha più campi. */
  label?: string;
  type: FieldType;
  placeholder?: string;
  autoComplete?: string;
  options?: { value: string; label: string }[];
};

type FormStep = {
  title: string;
  fields: Field[];
};

// Quattro schermate invece di otto (15/10/2026): via le due domande a testo
// libero, che da telefono fermavano chi compilava. Quello che serviva sapere
// prima di chiamare (impresa e zona) sta nella prima schermata.
const steps: FormStep[] = [
  {
    title: "Come si chiama la tua impresa, e dove lavora?",
    fields: [
      {
        name: "nome_attivita",
        label: "Nome dell'impresa",
        type: "text",
        placeholder: "Es. Edil Srl",
        autoComplete: "organization",
      },
      {
        name: "zona",
        label: "Zona in cui lavori",
        type: "text",
        placeholder: "Es. Bari e provincia",
        autoComplete: "address-level2",
      },
    ],
  },
  {
    title: "Qual è il tuo più grande ostacolo oggi?",
    fields: [
      {
        name: "ostacolo",
        type: "select",
        options: [
          {
            value: "Aumentare i potenziali clienti da contattare",
            label: "Aumentare i potenziali clienti da contattare",
          },
          {
            value: "Aumentare il tasso di conversione e vendere di più",
            label: "Aumentare il tasso di conversione e vendere di più",
          },
          {
            value: "Aumentare la qualità dei clienti e il margine dell'azienda",
            label: "Aumentare la qualità dei clienti e il margine dell'azienda",
          },
        ],
      },
    ],
  },
  {
    // Le visite dalle AI non portano la parola cercata: questa risposta dice da dove arriva
    // davvero la candidatura (piano SEO del 14/10/2026). Va anche nell'evento GA4.
    title: "Come ci hai conosciuto?",
    fields: [
      {
        name: "fonte",
        type: "select",
        options: [
          { value: "Su Google", label: "Su Google" },
          { value: "Da ChatGPT o un'altra intelligenza artificiale", label: "Da ChatGPT o un'altra intelligenza artificiale" },
          { value: "Su LinkedIn", label: "Su LinkedIn" },
          { value: "Su Instagram o Facebook", label: "Su Instagram o Facebook" },
          { value: "Me ne ha parlato un'altra impresa", label: "Me ne ha parlato un'altra impresa" },
          { value: "Ci siamo già sentiti con Forge Group", label: "Ci siamo già sentiti con Forge Group" },
          { value: "Altro", label: "Altro" },
        ],
      },
    ],
  },
  {
    title: "Dove ti chiamiamo entro 48 ore?",
    fields: [
      {
        name: "nome_cognome",
        label: "Nome e cognome",
        type: "text",
        placeholder: "Mario Rossi",
        autoComplete: "name",
      },
      {
        name: "telefono",
        label: "Telefono",
        type: "tel",
        placeholder: "333 1234567",
        autoComplete: "tel",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "nome@azienda.it",
        autoComplete: "email",
      },
    ],
  },
];

const isSelectStep = (step: FormStep) =>
  step.fields.length === 1 && step.fields[0].type === "select";

const ERROR_ID = "form-errore-step";

// text-base o più: sotto i 16 px iPhone ingrandisce la pagina quando si tocca il campo.
const inputCls =
  "w-full bg-brand-bianco border-2 border-brand-bordo rounded-xl px-4 py-3.5 text-base md:text-lg text-brand-nero placeholder:text-brand-grigio-light focus:border-brand-corallo focus:outline-none focus:ring-2 focus:ring-brand-corallo/20 transition-all";

type Props = {
  /** Da quale pagina arriva la candidatura, per contarle a parte in GA4. */
  sorgente?: string;
  /** Senza il banner "Candida la tua impresa": per le pagine che hanno già il loro titolo. */
  senzaBanner?: boolean;
};

export default function ContattiForm({
  sorgente = "contatti",
  senzaBanner = false,
}: Props) {
  const [stepIndex, setStepIndex] = useState(0);
  const [form, setForm] = useState<FormData>(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [stepError, setStepError] = useState("");
  const [campoErrato, setCampoErrato] = useState<keyof FormData | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const campiRef = useRef<Partial<Record<keyof FormData, HTMLInputElement | null>>>({});

  const current = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const updateField = (name: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setStepError("");
    setCampoErrato(null);
  };

  const validateStep = useCallback(
    (index = stepIndex): boolean => {
      for (const field of steps[index].fields) {
        const value = form[field.name].trim();
        let messaggio = "";
        if (!value) {
          messaggio =
            field.type === "select"
              ? "Scegli una risposta per continuare."
              : `Manca: ${(field.label ?? "questa risposta").toLowerCase()}.`;
        } else if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          messaggio = "Controlla l'email: sembra scritta male.";
        } else if (field.type === "tel" && value.replace(/\D/g, "").length < 8) {
          messaggio = "Controlla il numero di telefono: sembra incompleto.";
        }
        if (messaggio) {
          setStepError(messaggio);
          setCampoErrato(field.name);
          campiRef.current[field.name]?.focus();
          return false;
        }
      }
      setStepError("");
      setCampoErrato(null);
      return true;
    },
    [form, stepIndex],
  );

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
        throw new Error(j.message || "Errore durante l'invio del modulo.");
      }

      sendGAEvent("event", "generate_lead", { form_name: sorgente, fonte: form.fonte });
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return true;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Si è verificato un errore inaspettato.";
      setError(message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Il cursore va nel primo campo solo quando si passa alla domanda dopo: al
  // primo caricamento il focus farebbe scorrere la pagina fino al modulo, e su
  // /inizia il modulo sta in fondo.
  const domandaPrecedente = useRef(stepIndex);
  useEffect(() => {
    if (domandaPrecedente.current === stepIndex) return;
    domandaPrecedente.current = stepIndex;
    const primo = steps[stepIndex].fields[0];
    if (primo.type !== "select") campiRef.current[primo.name]?.focus();
  }, [stepIndex]);

  // Invio sulla tastiera: passa al campo dopo della stessa schermata, poi
  // alla schermata dopo, e sull'ultima invia.
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || e.shiftKey) return;
    if (isSelectStep(current)) return;
    e.preventDefault();
    const campi = current.fields;
    const qui = campi.findIndex((f) => campiRef.current[f.name] === e.target);
    if (qui >= 0 && qui < campi.length - 1) {
      campiRef.current[campi[qui + 1].name]?.focus();
      return;
    }
    if (isLastStep) {
      void handleSubmit();
    } else if (validateStep()) {
      setStepIndex((s) => s + 1);
    }
  };

  const renderSelect = (step: FormStep, field: Field) => (
    <div
      role="radiogroup"
      aria-labelledby={`titolo-${stepIndex}`}
      aria-required="true"
      aria-invalid={stepError ? true : undefined}
      aria-describedby={stepError ? ERROR_ID : undefined}
      className="space-y-2.5"
    >
      {field.options?.map((opt) => {
        const selected = form[field.name] === opt.value;
        const stepIsLast = steps.indexOf(step) === steps.length - 1;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => {
              updateField(field.name, opt.value);
              if (!stepIsLast) {
                window.setTimeout(() => setStepIndex((i) => i + 1), 280);
              }
            }}
            className={`w-full text-left rounded-xl border-2 px-4 py-3.5 text-base md:px-5 md:py-4 md:text-lg transition-all duration-200 ${
              selected
                ? "border-brand-corallo bg-brand-corallo/5 text-brand-nero font-semibold shadow-sm"
                : "border-brand-bordo bg-brand-bianco text-brand-grigio hover:border-brand-corallo/50 hover:bg-brand-panna/50"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );

  const renderInput = (field: Field) => {
    const fieldId = `campo-${field.name}`;
    const errato = campoErrato === field.name;
    return (
      <div key={field.name}>
        {field.label && (
          <label
            htmlFor={fieldId}
            className="mb-1.5 block text-sm font-semibold text-brand-nero"
          >
            {field.label}
          </label>
        )}
        <input
          id={fieldId}
          name={field.name}
          ref={(el) => {
            campiRef.current[field.name] = el;
          }}
          type={field.type}
          inputMode={field.type === "tel" ? "tel" : field.type === "email" ? "email" : undefined}
          enterKeyHint={
            field === current.fields[current.fields.length - 1]
              ? isLastStep
                ? "send"
                : "next"
              : "next"
          }
          autoCapitalize={field.type === "email" ? "none" : "words"}
          autoCorrect="off"
          spellCheck={false}
          value={form[field.name]}
          onChange={(e) => updateField(field.name, e.target.value)}
          placeholder={field.placeholder}
          required
          aria-required="true"
          aria-invalid={errato ? true : undefined}
          aria-describedby={errato ? ERROR_ID : undefined}
          className={`${inputCls} ${errato ? "border-brand-corallo" : ""}`}
          autoComplete={field.autoComplete}
        />
      </div>
    );
  };

  const renderStep = (step: FormStep) =>
    isSelectStep(step) ? (
      renderSelect(step, step.fields[0])
    ) : (
      <div className="space-y-4">{step.fields.map(renderInput)}</div>
    );

  if (success) {
    return (
      <HeroGooeySection
        className="min-h-[70vh] flex items-center py-20"
        innerClassName="max-w-2xl mx-auto px-4 text-center"
      >
        <div className="w-20 h-20 bg-brand-corallo rounded-full flex items-center justify-center mb-8 mx-auto">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="mb-6 flex justify-center">
          <span className="eyebrow-rule">Candidatura ricevuta</span>
        </p>
        <h1 className="heading-section-xl text-balance text-brand-nero mb-6">
          Grazie. Adesso{" "}
          <span className="text-brand-corallo-text">guardiamo i tuoi numeri</span>.
        </h1>
        <div className="text-lg text-brand-grigio leading-relaxed mb-8 space-y-4 max-w-xl mx-auto">
          <p>
            Prima di sentirti ci guardiamo la tua impresa e la tua zona, così
            quando ti chiamiamo sappiamo già di cosa stiamo parlando e non ti
            facciamo perdere venti minuti a raccontarci quello che hai già
            scritto.
          </p>
          <p>
            Ti chiamiamo entro <strong>48 ore lavorative</strong>.
          </p>
          <p>
            Quella chiamata serve a capire se ci sono i presupposti per lavorare
            insieme. Se ci sono, fissiamo un appuntamento: di persona se sei in
            una zona dove arriviamo, altrimenti in videochiamata. Se non ci
            sono, te lo diciamo lì.
          </p>
        </div>
        <Link href="/" className="btn-ghost">
          Torna alla Home
        </Link>
      </HeroGooeySection>
    );
  }

  return (
    <>
      {!senzaBanner && (
        <HeroGooeySection innerClassName="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow mb-6">✦ Studio di fattibilità</p>
          <h1 className="heading-hero font-semibold text-brand-nero leading-tight">
            Candida la tua <span className="text-brand-corallo">impresa</span>.
          </h1>
        </HeroGooeySection>
      )}

      <section
        className={
          senzaBanner ? "" : "pb-20 md:pb-28 section-bianco pt-8 md:pt-10"
        }
      >
        <div
          className={
            senzaBanner ? "" : "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"
          }
        >
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
              renderFooter={({
                currentStep,
                handleBack,
                handleNext,
                isLastStep: last,
              }) => (
                <>
                  {stepError && (
                    <p
                      id={ERROR_ID}
                      className="mb-4 text-sm font-medium text-brand-corallo-text"
                      role="alert"
                      aria-live="polite"
                    >
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
                        className="btn-corallo disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submitting ? "Invio in corso..." : "Invia la candidatura"}
                      </button>
                    ) : !isSelectStep(current) ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn-corallo"
                      >
                        Continua →
                      </button>
                    ) : (
                      <p className="text-sm text-brand-grigio text-center sm:text-right">
                        Tocca una risposta per continuare
                      </p>
                    )}
                  </div>

                  {last && (
                    <p className="text-xs text-center text-brand-grigio-light mt-6">
                      Inviando il modulo accetti la nostra{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-brand-corallo-text hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      . I tuoi dati saranno usati solo per valutare la
                      candidatura.
                    </p>
                  )}
                </>
              )}
            >
              {steps.map((step, i) => (
                <Step key={step.title} title={step.title} titleId={`titolo-${i}`}>
                  {renderStep(step)}
                </Step>
              ))}
            </AnimatedStepper>
          </div>
        </div>
      </section>
    </>
  );
}
