"use client";

import { useState } from "react";
import Link from "next/link";

export default function Contatti() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
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
        throw new Error("Errore durante l'invio della candidatura.");
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || "Si è verificato un errore inaspettato.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-nero flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-brand-bianco">Candidatura Inviata</h1>
        <p className="text-xl text-gray-400 mb-8 max-w-lg">
          Abbiamo ricevuto le tue informazioni. Se riterremo che ci siano i presupposti per una collaborazione profittevole, ti contatteremo entro 48 ore.
        </p>
        <Link href="/" className="text-brand-corallo font-bold hover:underline">
          &larr; Torna alla Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-nero py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-brand-corallo mb-8 inline-block hover:underline font-bold">
          &larr; Torna alla Home
        </Link>
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Candidatura Strategica</h1>
          <div className="w-20 h-2 bg-brand-corallo mb-6"></div>
          <p className="text-xl text-gray-400">
            Compila questo questionario con la massima sincerità. Accettiamo solo un numero limitato di partner ogni trimestre. Non farti perdere tempo, e non farne perdere a noi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-brand-terra/10 border border-brand-terra/30 p-8 rounded-lg">
          {error && <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded">{error}</div>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-brand-bianco mb-2">Nome & Cognome *</label>
              <input required type="text" name="nome" className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-bianco mb-2">Nome Attività / Azienda *</label>
              <input required type="text" name="azienda" className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-brand-bianco mb-2">Email *</label>
              <input required type="email" name="email" className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-bianco mb-2">Telefono *</label>
              <input required type="tel" name="telefono" className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-bianco mb-2">Di cosa ti occupi? (in 1-3 frasi) *</label>
            <textarea required name="occupazione" rows={3} className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-bianco mb-2">Qual è il tuo ruolo in Azienda? *</label>
            <input required type="text" name="ruolo" className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-bianco mb-2">Qual è l'attuale fatturato annuo? *</label>
            <select required name="fatturato" className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none">
              <option value="">Seleziona...</option>
              <option value="Meno di 250.000€">Meno di 250.000€</option>
              <option value="Tra 250.000€ e 1.000.000€">Tra 250.000€ e 1.000.000€</option>
              <option value="Oltre 1.000.000€">Oltre 1.000.000€</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-bianco mb-2">Qual'è il tuo più grande ostacolo attualmente? *</label>
            <select required name="ostacolo" className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none">
              <option value="">Seleziona...</option>
              <option value="Aumentare i potenziali clienti da contattare">Aumentare i potenziali clienti da contattare</option>
              <option value="Aumentare il tasso di conversione e vendere di più">Aumentare il tasso di conversione e vendere di più</option>
              <option value="Aumentare la qualità del clienti e il margine dell'azienda">Aumentare la qualità del clienti e il margine dell'azienda</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-bianco mb-2">Come acquisisci clienti ad oggi? *</label>
            <textarea required name="acquisizione_attuale" rows={2} className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-bianco mb-2">Hai un reparto commerciale? Come lo gestisci? *</label>
            <textarea required name="reparto_commerciale" rows={2} className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-brand-bianco mb-2">Quanti collaboratori/dipendenti ha l'azienda? *</label>
              <input required type="text" name="dipendenti" className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-bianco mb-2">Come sei venuto a conoscenza di Forge Group? *</label>
              <select required name="provenienza" className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none">
                <option value="">Seleziona...</option>
                <option value="Ricerca Google">Ricerca Google</option>
                <option value="Social Media (LinkedIn/Facebook/Instagram)">Social Media</option>
                <option value="Passaparola / Referenza">Passaparola / Referenza</option>
                <option value="Altro">Altro</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-brand-bianco mb-2">Quando vorresti iniziare? *</label>
              <select required name="tempistiche" className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none">
                <option value="">Seleziona...</option>
                <option value="Subito">Subito</option>
                <option value="Tra 1 - 4 settimane">Tra 1 - 4 settimane</option>
                <option value="Tra 1 - 3 mesi">Tra 1 - 3 mesi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-bianco mb-2">Budget mensile per Marketing e Vendite *</label>
              <select required name="budget" className="w-full bg-black border border-brand-terra/50 rounded p-3 text-white focus:border-brand-corallo focus:outline-none">
                <option value="">Seleziona...</option>
                <option value="1.500€ - 2.500€ / mese">1.500€ - 2.500€ / mese</option>
                <option value="2.500€ - 5.000€ / mese">2.500€ - 5.000€ / mese</option>
                <option value="5.000€ - 10.000€ / mese">5.000€ - 10.000€ / mese</option>
                <option value="+ 10.000€ / mese">+ 10.000€ / mese</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-brand-corallo text-brand-nero py-4 text-xl font-bold rounded-sm shadow-[6px_6px_0px_0px_rgba(74,27,12,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-8"
          >
            {isSubmitting ? "INVIO IN CORSO..." : "INVIA CANDIDATURA"}
          </button>
        </form>
      </div>
    </div>
  );
}
