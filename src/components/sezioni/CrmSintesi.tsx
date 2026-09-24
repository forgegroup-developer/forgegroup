import Link from "next/link";
import { righeCrm, stileFase } from "@/data/crm";

/**
 * Il CRM gestionale in home, detto corto.
 *
 * In revisione la decisione e' stata netta: il CRM in home non si spiega,
 * si nomina. Qui restano la frase che regge tutto — "non aumentiamo solo
 * le richieste, ti diamo anche come gestirle" — tre righe di sostanza e
 * un assaggio del CRM vero. Il resto sta su /crm-gestionale-edilizia.
 */

const punti = [
  "Ogni richiesta ha una data, uno stato e una persona che la segue.",
  "Lo apri tu dal telefono quando vuoi: non è un report che arriva a fine mese.",
  "È compreso per chi lavora con noi. Non è un extra da pagare a parte.",
];

export default function CrmSintesi() {
  return (
    <section id="crm" className="section-sabbia scroll-mt-24 border-y py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
        <div>
          <p className="eyebrow eyebrow-mark mb-4 flex">Come lavoriamo</p>
          <h2 className="heading-section-xl mb-6 text-balance">
            Non aumentiamo solo le richieste di lavoro.{" "}
            <span className="text-brand-corallo-text">
              Ti diamo anche come gestirle.
            </span>
          </h2>
          <p className="body-lg mb-8">
            Insieme alle richieste ti diamo il CRM gestionale dove finiscono tutte:
            quelle che stiamo portando noi e quelle che ti arrivano per
            passaparola. È il posto dove vedi, senza chiedere niente a
            nessuno, a che punto sta ogni trattativa.
          </p>

          <ul className="mb-9 space-y-4">
            {punti.map((riga) => (
              <li key={riga} className="flex gap-3.5">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-corallo"
                  aria-hidden
                />
                <span className="text-[0.98rem] leading-snug text-brand-nero">
                  {riga}
                </span>
              </li>
            ))}
          </ul>

          <Link href="/crm-gestionale-edilizia" className="btn-ghost">
            Guarda com&apos;è fatto il CRM gestionale
          </Link>
        </div>

        {/* Tre righe vere, per far capire di che cosa si parla senza
            trasformare la home nella pagina del CRM. */}
        <div className="overflow-hidden rounded-2xl border border-brand-bordo bg-brand-bianco shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-bordo bg-brand-panna px-5 py-4">
            <p className="font-display text-sm font-bold text-brand-nero">
              CRM gestionale
            </p>
            <p className="text-xs text-brand-grigio">Dati anonimizzati</p>
          </div>
          <ul className="divide-y divide-brand-bordo/60">
            {righeCrm.slice(0, 3).map((r) => (
              <li key={r.nota} className="px-5 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-brand-nero">
                    {r.richiesta}
                  </p>
                  <span
                    className={`inline-block whitespace-nowrap rounded-full border px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wide ${stileFase[r.tono]}`}
                  >
                    {r.fase}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-snug text-brand-grigio">
                  {r.nota}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-grigio-light">
                  Prossimo passo: {r.quando}
                </p>
              </li>
            ))}
          </ul>
          <p className="border-t border-brand-bordo bg-brand-panna/60 px-5 py-3 text-xs text-brand-grigio">
            Nel CRM vero le righe sono tutte quelle della tua impresa.
          </p>
        </div>
      </div>
    </section>
  );
}
