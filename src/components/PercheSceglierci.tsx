import Link from "next/link";

/**
 * "Perché scegliere Forge Group" — impianto preso dalla sezione omonima
 * di Mirco Gasparotto.
 *
 * La sua sequenza è: occhiello con la domanda, poi il meccanismo come
 * titolo ("La chiave per la crescita aziendale: il controllo dei
 * numeri"), poi il paragrafo che dice "abbiamo eliminato tutti questi
 * problemi creando un Metodo…", e infine il pannello con la percentuale
 * e l'elenco dei modi in cui il lettore si sta facendo male da solo.
 *
 * Funziona perché l'elenco non accusa: descrive. Il lettore si conta
 * dentro da solo, e a quel punto il metodo non è una proposta, è la via
 * d'uscita da una cosa che ha appena riconosciuto.
 *
 * L'elenco è la voce della proprietà, non una lista scritta a tavolino.
 */

const abitudini = [
  "Prende lavori sottocosto pur di chiudere il cantiere",
  "Applica il 30% di ricarico sui costi e chiama margine quello che resta",
  "Manda preventivi a gente che non comprerà mai",
  "Cade nella guerra dei prezzi, e la perde",
  "Regala tempo, sopralluoghi e progetti a chi sta solo guardando",
  "Aspetta che sia il cliente a farsi vivo, prima e dopo il preventivo",
  "Tiene aperte trattative che non si chiuderanno mai",
];

export default function PercheSceglierci() {
  return (
    <section id="perche" className="section-mattone scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="mb-6">
            <span className="eyebrow-rule">Perché scegliere Forge Group</span>
          </p>

          <p className="mb-3 font-display text-xl font-bold leading-snug text-white/85 sm:text-2xl">
            La chiave per crescere in edilizia:
          </p>
          <h2 className="titolo-meccanismo mb-6">
            <span>il controllo della trattativa</span>
          </h2>

          <p className="text-pretty text-lg leading-relaxed">
            Noi abbiamo tolto di mezzo tutti questi problemi costruendo il
            Metodo FORGE: ti portiamo richieste da chi il lavoro può pagarlo,
            scartiamo chi tratta solo sul prezzo e restiamo dentro la
            trattativa con te fino alla firma. Senza che tu debba rincorrere
            nessuno, e senza che tu debba diventare un esperto di pubblicità.
          </p>

          <div className="mt-9">
            <Link href="#metodo" className="btn-ghost">
              Vedi il Metodo FORGE, i 5 step
            </Link>
          </div>
        </div>

        <div className="superficie-chiara rounded-3xl border border-brand-bordo bg-brand-panna p-7 shadow-lg sm:p-9">
          <p className="mb-1 font-display text-3xl font-bold leading-none text-brand-nero sm:text-4xl">
            L&apos;80% delle imprese edili
          </p>
          <p className="mb-7 text-sm text-brand-grigio">
            Non perde lavori perché lavora male. Li perde qui.
          </p>

          <ul className="space-y-4">
            {abitudini.map((riga) => (
              <li key={riga} className="flex gap-3.5">
                <span className="segno-no" aria-hidden>
                  ✕
                </span>
                <span className="text-[0.98rem] leading-snug text-brand-nero">
                  {riga}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
