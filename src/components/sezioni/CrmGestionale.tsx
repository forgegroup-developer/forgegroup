import Link from "next/link";
import { CONTENITORE, SEZIONE, Chiave, Evidenzia, Titolo } from "@/components/blocchi/ui";
import { crm } from "@/data/blocchi";
import { righeCrm, stileFase } from "@/data/crm";

/**
 * L'anteprima del gestionale, per chi dice "non so come lavorate davvero"
 * (quattro imprenditori su quattro, nelle conoscitive).
 *
 * Rifatta il 29/09/2026 sul modello dell'anteprima dello strumento nella
 * pagina di vendita del concorrente A: prima "cosa ci trovi" in quattro
 * punti, poi lo schermo con i dati di prova. Tolte le due frasi fra
 * virgolette che nessun titolare aveva detto davvero.
 *
 * ⚠️ I dati della tabella sono ANONIMIZZATI: nessun nome, nessun recapito,
 * nessun riferimento a persone reali. Le note riproducono la forma di quelle
 * vere, non il contenuto.
 */

/* La frase chiave di ogni punto (REGOLE §5 bis). */
const chiavi = [
  "chi cercava solo un prezzo lo vedi subito",
  "ogni incontro finisce con una data",
  "contratto per contratto",
  "passiamo le trattative una per una",
];

export default function CrmGestionale() {
  return (
    <section id="anteprima" className={`section-bianco scroll-mt-24 ${SEZIONE}`}>
      <div className={CONTENITORE}>
        <Titolo
          occhiello="Come funziona"
          sottotitolo="Il gestionale lo costruiamo noi, sul processo di vendita che scriviamo con te. Quello che vedi sotto è un esempio con dati di prova."
        >
          Cosa vedi quando lo apri, <Chiave>anche dal cantiere</Chiave>.
        </Titolo>

        <ol className="mb-16 grid gap-5 md:mb-20 md:grid-cols-2">
          {crm.map((c, i) => (
            <li key={c.titolo} className="flex gap-5 rounded-2xl border border-brand-bordo bg-brand-bianco p-6">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-corallo font-display text-lg font-bold text-white"
                aria-hidden
              >
                {i + 1}
              </span>
              <div>
                <h3 className="mb-1.5 font-display text-xl font-bold leading-snug text-brand-nero">
                  {c.titolo}
                </h3>
                <p className="leading-relaxed text-brand-grigio">
                  <Evidenzia testo={c.testo} chiave={chiavi[i]} />
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Lo schermo del gestionale, con dati di prova */}
        <div className="overflow-hidden rounded-2xl border border-brand-bordo bg-brand-bianco shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-bordo px-5 py-4">
            <p className="font-display text-sm font-bold text-brand-nero">Il gestionale, un esempio</p>
            <p className="text-xs text-brand-grigio">Dati di prova, anonimi</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-brand-bordo">
                  {["Richiesta", "Zona", "Fase", "Note", "Prossimo passo"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-[0.7rem] font-bold uppercase tracking-widest text-brand-grigio"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {righeCrm.map((r) => (
                  <tr key={r.nota} className="border-b border-brand-bordo/60 align-top last:border-0">
                    <td className="px-5 py-4 text-sm font-semibold text-brand-nero">{r.richiesta}</td>
                    <td className="px-5 py-4 text-sm text-brand-grigio">{r.zona}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-block whitespace-nowrap rounded-full border px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wide ${stileFase[r.tono]}`}
                      >
                        {r.fase}
                      </span>
                    </td>
                    <td className="max-w-sm px-5 py-4 text-sm leading-snug text-brand-grigio">{r.nota}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-brand-nero">
                      {r.quando}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-pretty text-center leading-relaxed text-brand-grigio">
          Quella colonna delle note è il punto. Non è un elenco di numeri di telefono:{" "}
          <strong className="chiave">è la trattativa scritta</strong>. Quanto ha di budget, quanti
          altri preventivi ha in mano, chi decide davvero, cosa gli serve prima di firmare.
        </p>

        <div className="mt-12 flex justify-center">
          <Link href="/contatti" className="btn-ghost text-center">
            Richiedi lo studio di fattibilità ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
