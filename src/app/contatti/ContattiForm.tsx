"use client";

import { useState } from "react";
import Link from "next/link";

type FieldGroupProps = {
  label: string;
  children: React.ReactNode;
  required?: boolean;
};

function Field({ label, children, required }: FieldGroupProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-brand-nero mb-2">
        {label} {required && <span className="text-brand-corallo">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-brand-bianco border border-brand-bordo rounded-lg px-4 py-3 text-brand-nero focus:border-brand-corallo focus:outline-none focus:ring-2 focus:ring-brand-corallo/20 transition-all";

export default function ContattiForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
    <>
      {/* HERO */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ Prequalifica Strategica</p>
          <h1 className="heading-hero font-semibold text-brand-nero leading-tight mb-6">
            Candida la tua <span className="text-brand-corallo">azienda</span>.
          </h1>
          <p className="text-lg md:text-xl text-brand-grigio leading-relaxed">
            Compila questo questionario con la massima sincerità. Accettiamo un numero limitato di partner ogni trimestre.
            Non farti perdere tempo, e non farne perdere a noi.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="bg-brand-bianco border border-brand-bordo rounded-2xl p-6 md:p-10 space-y-6"
          >
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
                {error}
              </div>
            )}

            {/* QUALIFICAZIONE */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold font-bold text-brand-nero pb-3 border-b border-brand-bordo">
                <span className="text-brand-corallo">01.</span> La tua azienda
              </h2>

              <Field label="Nome attività / Azienda" required>
                <input required type="text" name="nome_attivita" className={inputCls} />
              </Field>

              <Field label="Di cosa ti occupi? (in 1-3 frasi, come se mi parlassi di persona)" required>
                <textarea required name="occupazione" rows={3} className={inputCls} />
              </Field>

              <Field label="Qual è l'attuale fatturato annuo?" required>
                <select required name="fatturato" className={inputCls} defaultValue="">
                  <option value="" disabled>
                    Seleziona...
                  </option>
                  <option value="Meno di 250.000€">Meno di 250.000€</option>
                  <option value="Tra 250.000€ e 1.000.000€">Tra 250.000€ e 1.000.000€</option>
                  <option value="Oltre 1.000.000€">Oltre 1.000.000€</option>
                </select>
              </Field>

              <Field label="Qual è il tuo più grande ostacolo attualmente?" required>
                <select required name="ostacolo" className={inputCls} defaultValue="">
                  <option value="" disabled>
                    Seleziona...
                  </option>
                  <option value="Aumentare i potenziali clienti da contattare">
                    Aumentare i potenziali clienti da contattare
                  </option>
                  <option value="Aumentare il tasso di conversione e vendere di più">
                    Aumentare il tasso di conversione e vendere di più
                  </option>
                  <option value="Aumentare la qualità dei clienti e il margine dell'azienda">
                    Aumentare la qualità dei clienti e il margine dell&apos;azienda
                  </option>
                </select>
              </Field>

              <Field label="Come acquisisci clienti ad oggi?" required>
                <textarea required name="acquisizione_attuale" rows={2} className={inputCls} />
              </Field>

              <Field label="Hai un reparto commerciale? Come lo gestisci?" required>
                <textarea required name="reparto_commerciale" rows={2} className={inputCls} />
              </Field>

              <Field label="Quanti collaboratori/dipendenti ha l'azienda?" required>
                <input required type="text" name="dipendenti" className={inputCls} />
              </Field>
            </div>

            {/* INVESTIMENTO */}
            <div className="space-y-6 pt-6">
              <h2 className="text-lg font-semibold font-bold text-brand-nero pb-3 border-b border-brand-bordo">
                <span className="text-brand-corallo">02.</span> Investimento e tempi
              </h2>

              <Field
                label="Se siamo in linea con i tuoi obiettivi e sei disposto a investire, quando vorresti iniziare?"
                required
              >
                <select required name="tempistiche" className={inputCls} defaultValue="">
                  <option value="" disabled>
                    Seleziona...
                  </option>
                  <option value="Subito">Subito</option>
                  <option value="Tra 1 - 4 settimane">Tra 1 - 4 settimane</option>
                  <option value="Tra 1 - 3 mesi">Tra 1 - 3 mesi</option>
                </select>
              </Field>

              <Field label="Qual è il tuo budget mensile per Marketing e Vendite?" required>
                <select required name="budget" className={inputCls} defaultValue="">
                  <option value="" disabled>
                    Seleziona...
                  </option>
                  <option value="1.500€ - 2.500€ / mese">1.500€ - 2.500€ / mese</option>
                  <option value="2.500€ - 5.000€ / mese">2.500€ - 5.000€ / mese</option>
                  <option value="5.000€ - 10.000€ / mese">5.000€ - 10.000€ / mese</option>
                  <option value="+ 10.000€ / mese">+ 10.000€ / mese</option>
                </select>
              </Field>
            </div>

            {/* CONTATTI */}
            <div className="space-y-6 pt-6">
              <h2 className="text-lg font-semibold font-bold text-brand-nero pb-3 border-b border-brand-bordo">
                <span className="text-brand-corallo">03.</span> I tuoi dati
              </h2>

              <Field label="Qual è il tuo ruolo in azienda?" required>
                <input required type="text" name="ruolo" className={inputCls} />
              </Field>

              <Field label="Come sei venuto a conoscenza di Forge Group?" required>
                <select required name="provenienza" className={inputCls} defaultValue="">
                  <option value="" disabled>
                    Seleziona...
                  </option>
                  <option value="Ricerca Google">Ricerca Google</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook / Instagram">Facebook / Instagram</option>
                  <option value="Passaparola / Referenza">Passaparola / Referenza</option>
                  <option value="Evento dal vivo">Evento dal vivo</option>
                  <option value="Altro">Altro</option>
                </select>
              </Field>

              <Field label="Nome e Cognome" required>
                <input required type="text" name="nome_cognome" className={inputCls} />
              </Field>

              <div className="grid md:grid-cols-2 gap-6">
                <Field label="Telefono" required>
                  <input required type="tel" name="telefono" className={inputCls} />
                </Field>
                <Field label="Email" required>
                  <input required type="email" name="email" className={inputCls} />
                </Field>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full btn-corallo text-base mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "INVIO IN CORSO..." : "INVIA CANDIDATURA"}
            </button>

            <p className="text-xs text-center text-brand-grigio-light mt-2">
              Inviando il modulo accetti la nostra{" "}
              <Link href="/privacy-policy" className="text-brand-corallo hover:underline">
                Privacy Policy
              </Link>
              . I tuoi dati saranno usati solo per valutare la candidatura.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
