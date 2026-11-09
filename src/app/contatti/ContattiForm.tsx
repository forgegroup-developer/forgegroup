"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { segnaCandidaturaInviata, traccia } from "@/lib/leadClient";
import { OPZIONI_FONTE, OPZIONI_OSTACOLO } from "@/data/candidatura";
import AnimatedStepper, { Step } from "@/components/sezioni/AnimatedStepper";
import HeroGooeySection from "@/components/sfondi/HeroGooeySection";

type FormData = {
  nome_attivita: string;
  zona: string;
  nome_cognome: string;
  telefono: string;
};

const initialFormData: FormData = {
  nome_attivita: "",
  zona: "",
  nome_cognome: "",
  telefono: "",
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

// Due schermate invece di quattro (proprietà, 09/11/2026: "il modulo è troppo
// lungo"). Restano solo i dati che servono prima di chiamare: impresa e zona
// (le guardiamo prima di sentirti), poi nome e telefono. L'email non serve
// per partire; ostacolo e fonte si chiedono dopo l'invio, facoltativi.
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
  const iniziato = useRef(false);

  const current = steps[stepIndex];
  const isLastStep = stepIndex === steps.length - 1;

  const updateField = (name: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (!iniziato.current && value.trim()) {
      iniziato.current = true;
      traccia("form_start", { form_name: sorgente });
    }
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
        body: JSON.stringify({
          ...form,
          sorgente,
          pagina: window.location.pathname,
          website: honeypot,
        }),
      });

      if (!response.ok) {
        const j = await response.json().catch(() => ({}));
        throw new Error(j.message || "Errore durante l'invio del modulo.");
      }

      traccia("generate_lead", { form_name: sorgente });
      segnaCandidaturaInviata();
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
    // Si conta solo chi va avanti: dice a quale schermata ci si ferma.
    if (stepIndex > domandaPrecedente.current) {
      traccia("form_step", { form_name: sorgente, step: stepIndex + 1 });
    }
    domandaPrecedente.current = stepIndex;
    const primo = steps[stepIndex].fields[0];
    if (primo.type !== "select") campiRef.current[primo.name]?.focus();
  }, [stepIndex, sorgente]);

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
        <DomandeDopoInvio form={form} sorgente={sorgente} />
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

/**
 * Dopo l'invio, due domande facoltative: prima stavano dentro il modulo e lo
 * allungavano. Chi risponde le aggiunge alla candidatura con una seconda mail;
 * chi non risponde ha già fatto tutto quello che serviva.
 */
function DomandeDopoInvio({ form, sorgente }: { form: FormData; sorgente: string }) {
  const [ostacolo, setOstacolo] = useState("");
  const [fonte, setFonte] = useState("");
  const [stato, setStato] = useState<"aperto" | "invio" | "fatto" | "errore">("aperto");

  const invia = async () => {
    if (!ostacolo && !fonte) return;
    setStato("invio");
    try {
      const r = await fetch("/api/contact/dettagli", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_cognome: form.nome_cognome,
          telefono: form.telefono,
          nome_attivita: form.nome_attivita,
          ostacolo,
          fonte,
        }),
      });
      if (!r.ok) throw new Error();
      // La fonte detta dalla persona va in GA4: è una voce di un elenco, non un dato personale.
      traccia("lead_dettagli", { form_name: sorgente, fonte: fonte || "non detta" });
      setStato("fatto");
    } catch {
      setStato("errore");
    }
  };

  if (stato === "fatto") {
    return (
      <p className="mb-8 text-base text-brand-grigio" role="status">
        Grazie, le abbiamo aggiunte alla tua candidatura.
      </p>
    );
  }

  const gruppo = (
    titolo: string,
    opzioni: readonly string[],
    valore: string,
    scegli: (v: string) => void,
  ) => (
    <fieldset className="mb-6 text-left">
      <legend className="mb-3 text-base font-semibold text-brand-nero">{titolo}</legend>
      <div className="space-y-2" role="radiogroup">
        {opzioni.map((o) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={valore === o}
            onClick={() => scegli(valore === o ? "" : o)}
            className={`w-full rounded-xl border-2 px-4 py-3 text-left text-base transition-all ${
              valore === o
                ? "border-brand-corallo bg-brand-corallo/5 font-semibold text-brand-nero"
                : "border-brand-bordo bg-brand-bianco text-brand-grigio hover:border-brand-corallo/50"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="mx-auto mb-10 max-w-xl rounded-2xl border border-brand-bordo bg-brand-bianco p-5 text-left md:p-7">
      <p className="mb-5 text-lg text-brand-nero">
        Ci aiuti a preparare la chiamata?{" "}
        <span className="text-brand-grigio">Due tocchi, se vuoi.</span>
      </p>
      {gruppo("Qual è il tuo più grande ostacolo oggi?", OPZIONI_OSTACOLO, ostacolo, setOstacolo)}
      {gruppo("Come ci hai conosciuto?", OPZIONI_FONTE, fonte, setFonte)}
      {stato === "errore" && (
        <p className="mb-4 text-sm font-medium text-brand-corallo-text" role="alert">
          Non siamo riusciti a inviarle. La candidatura invece è arrivata: ne parliamo al telefono.
        </p>
      )}
      <button
        type="button"
        onClick={() => void invia()}
        disabled={(!ostacolo && !fonte) || stato === "invio"}
        className="btn-corallo w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {stato === "invio" ? "Invio in corso..." : "Aggiungi le risposte"}
      </button>
    </div>
  );
}
