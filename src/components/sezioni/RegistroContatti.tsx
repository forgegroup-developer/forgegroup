import Link from "next/link";

/**
 * Il blocco che risponde all'obiezione che ferma piu' trattative di ogni
 * altra: "non so come lavorate davvero". Quattro imprenditori su quattro,
 * nelle conoscitive, non lamentavano risultati scarsi — lamentavano di non
 * aver potuto vedere niente.
 *
 * Mostra il registro vero, ricostruito: la sua voce prima e dopo, poi la
 * tabella. Il disordine di partenza lo disegna gia' il blocco sopra
 * (ConfrontoCaos): qui si entra dentro il registro e basta.
 *
 * ⚠️ I dati della tabella sono ANONIMIZZATI: nessun nome, nessun recapito,
 * nessun riferimento a persone reali. Le note riproducono la forma di quelle
 * vere, non il contenuto.
 */

/** Fasi reali del sistema, con i dati d'esempio resi anonimi. */
const righe = [
  {
    richiesta: "Ristrutturazione attività esistente",
    zona: "Provincia di Napoli",
    fase: "1° APP. DI REVISIONE",
    tono: "avanti" as const,
    nota: "Locale 50 mq, ristrutturazione completa. Ha già altri tre preventivi: 22, 28 e 33 mila. Non ha ancora un tecnico.",
    quando: "Giovedì 20 · 9:30",
  },
  {
    richiesta: "Nuova attività, arredo e progettazione",
    zona: "Provincia di Avellino",
    fase: "DA RICHIAMARE",
    tono: "attesa" as const,
    nota: "Budget indicativo confermato in chiamata. Deve parlare con la proprietà del locale prima di decidere.",
    quando: "1 settembre",
  },
  {
    richiesta: "Ha un progetto e cerca chi lo realizzi",
    zona: "Provincia di Caserta",
    fase: "NON RISPONDE",
    tono: "fermo" as const,
    nota: "Due chiamate, mattina e pomeriggio. Mandato messaggio su WhatsApp.",
    quando: "Richiamo a 48h",
  },
  {
    richiesta: "Solo informazioni, nessun budget",
    zona: "Fuori zona",
    fase: "SQUALIFICATO",
    tono: "scartato" as const,
    nota: "Chiedeva un prezzo al metro quadro. Nessun lavoro in programma. Chiuso prima del sopralluogo.",
    quando: "—",
  },
  {
    richiesta: "Ristrutturazione attività esistente",
    zona: "Provincia di Salerno",
    fase: "CONTRATTO",
    tono: "chiuso" as const,
    nota: "Progetto approvato in sede. Piano dei lavori firmato.",
    quando: "Chiuso",
  },
];

const stileFase: Record<string, string> = {
  avanti: "bg-amber-50 text-amber-900 border-amber-200",
  attesa: "bg-sky-50 text-sky-900 border-sky-200",
  fermo: "bg-neutral-100 text-neutral-700 border-neutral-300",
  scartato: "bg-red-50 text-red-900 border-red-200",
  chiuso: "bg-emerald-50 text-emerald-900 border-emerald-300",
};

export default function RegistroContatti() {
  return (
    <section id="registro" className="section-sabbia scroll-mt-24 border-y py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <p className="eyebrow eyebrow-mark mb-4 flex">Come lavoriamo</p>
        <h2 className="heading-section-xl mb-6 max-w-3xl text-balance">
          Le richieste ci sono già.{" "}
          <span className="text-brand-corallo-text">Manca il posto dove stanno scritte.</span>
        </h2>
        <p className="body-lg mb-12 max-w-2xl md:mb-16">
          Prima ancora della pubblicità, la prima cosa che mettiamo in piedi è
          questa: un registro dove ogni richiesta ha un budget, una data e una
          persona che la segue. Non un report che ti arriva a fine mese — un
          registro che apri tu, quando vuoi.
        </p>

        {/* Prima e dopo, nella sua voce */}
        <div className="mb-12 grid gap-4 md:mb-16 md:grid-cols-2 md:gap-6">
          <div className="rounded-2xl bg-red-50 p-6 sm:p-7">
            <p className="mb-2 text-sm font-bold text-red-900">Come va adesso</p>
            <p className="text-base italic leading-relaxed text-red-950/90">
              &ldquo;Faccio preventivi tutto il giorno e a fine anno non so
              nemmeno quanti ne ho chiusi.&rdquo;
            </p>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-6 sm:p-7">
            <p className="mb-2 text-sm font-bold text-emerald-900">Come va dopo</p>
            <p className="text-base italic leading-relaxed text-emerald-950/90">
              &ldquo;Apro il registro e vedo ogni richiesta a che punto è. E in
              cantiere ci vado per lavorare, non per rincorrere il telefono.&rdquo;
            </p>
          </div>
        </div>

        {/* La ricostruzione del registro */}
        <div className="overflow-hidden rounded-2xl border border-brand-bordo bg-brand-bianco shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-bordo bg-brand-panna px-5 py-4">
            <p className="font-display text-sm font-bold text-brand-nero">
              Registro contatti — esempio
            </p>
            <p className="text-xs text-brand-grigio">Dati anonimizzati</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-brand-bordo bg-brand-panna/50">
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
                {righe.map((r) => (
                  <tr key={r.nota} className="border-b border-brand-bordo/60 last:border-0 align-top">
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

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-brand-grigio">
          Quella colonna delle note è il punto. Non è un elenco di numeri di
          telefono: è la trattativa scritta. Quanto ha di budget, quanti altri
          preventivi ha in mano, chi decide davvero, cosa gli serve prima di
          firmare.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link
            href="/contatti"
            className="btn-corallo px-8 py-4 text-center text-sm sm:whitespace-nowrap md:text-base"
          >
            Richiedi lo studio di fattibilità
          </Link>
          <Link href="#metodo" className="arrow-link text-sm md:text-base">
            Come lo mettiamo in piedi
          </Link>
        </div>
      </div>
    </section>
  );
}
