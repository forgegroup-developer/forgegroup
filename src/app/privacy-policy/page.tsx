import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy del sito Forge Group e trattamento dei dati personali ai sensi del GDPR.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <article className="py-16 md:py-24 section-bianco">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg">
        <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ Privacy Policy</p>
        <h1 className="heading-section font-semibold text-brand-nero leading-tight mb-8">
          Privacy Policy
        </h1>

        <p className="text-brand-grigio leading-relaxed mb-6">
          Ultimo aggiornamento: 27 maggio 2026
        </p>

        <h2 className="text-xl font-semibold md:text-3xl font-bold text-brand-nero mt-10 mb-4">
          Titolare del trattamento
        </h2>
        <p className="text-brand-grigio leading-relaxed mb-6">
          Il titolare del trattamento dei dati personali raccolti tramite questo sito è <strong>Forge Group</strong>,
          contattabile via email all&apos;indirizzo{" "}
          <a href="mailto:info@forgegroup.it" className="text-brand-corallo hover:underline">
            info@forgegroup.it
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold md:text-3xl font-bold text-brand-nero mt-10 mb-4">
          Dati raccolti
        </h2>
        <p className="text-brand-grigio leading-relaxed mb-3">
          Tramite il form di candidatura raccogliamo i seguenti dati:
        </p>
        <ul className="space-y-2 mb-6">
          {[
            "Dati identificativi: nome, cognome, ruolo aziendale",
            "Dati di contatto: email, numero di telefono",
            "Dati aziendali: nome attività, fatturato, dimensione, ostacoli operativi",
            "Dati di profilazione commerciale: budget, tempistiche, fonte di provenienza",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-brand-nero">
              <span className="text-brand-corallo">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-semibold md:text-3xl font-bold text-brand-nero mt-10 mb-4">
          Finalità del trattamento
        </h2>
        <p className="text-brand-grigio leading-relaxed mb-6">
          I dati raccolti sono utilizzati esclusivamente per: valutare la candidatura alla collaborazione, contattare il
          richiedente, gestire la relazione commerciale e adempiere a obblighi di legge.
        </p>

        <h2 className="text-xl font-semibold md:text-3xl font-bold text-brand-nero mt-10 mb-4">
          Base giuridica
        </h2>
        <p className="text-brand-grigio leading-relaxed mb-6">
          Il trattamento si basa sul consenso esplicito fornito dall&apos;interessato al momento della compilazione del
          modulo e sull&apos;esecuzione di misure precontrattuali ai sensi dell&apos;art. 6, par. 1, lett. b) del
          Regolamento UE 2016/679 (GDPR).
        </p>

        <h2 className="text-xl font-semibold md:text-3xl font-bold text-brand-nero mt-10 mb-4">
          Periodo di conservazione
        </h2>
        <p className="text-brand-grigio leading-relaxed mb-6">
          I dati sono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti e
          comunque per un massimo di 24 mesi dalla data di raccolta, salvo l&apos;avvio di una collaborazione attiva.
        </p>

        <h2 className="text-xl font-semibold md:text-3xl font-bold text-brand-nero mt-10 mb-4">
          Diritti dell&apos;interessato
        </h2>
        <p className="text-brand-grigio leading-relaxed mb-6">
          L&apos;interessato ha il diritto di accedere ai propri dati, rettificarli, cancellarli, limitarne il
          trattamento, opporsi al trattamento e ricevere i dati in formato portabile. Per esercitare questi diritti è
          sufficiente scrivere a{" "}
          <a href="mailto:info@forgegroup.it" className="text-brand-corallo hover:underline">
            info@forgegroup.it
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold md:text-3xl font-bold text-brand-nero mt-10 mb-4">
          Sicurezza dei dati
        </h2>
        <p className="text-brand-grigio leading-relaxed mb-6">
          Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati,
          perdita o distruzione.
        </p>

        <p className="text-sm text-brand-grigio-light mt-12">
          Questa è una versione preliminare. Una versione completa e legalmente vincolante verrà pubblicata
          contestualmente al lancio del sito in produzione.
        </p>
      </div>
    </article>
  );
}
