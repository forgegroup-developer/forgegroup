export type BeforeAfterRow = {
  /** Etichetta opzionale della riga (es. Acquisizione, Vendita) */
  aspect?: string;
  before: string;
  after: string;
};

type Props = {
  rows: BeforeAfterRow[];
};

/*
 * Prima e dopo, riga per riga: le stesse coppie ✕ → ✓ del confronto in
 * home. Schede bianche, niente celle tinte di rosso o di verde (REGOLE §2):
 * il verde resta solo nella spunta.
 */
export default function CaseStudyBeforeAfter({ rows }: Props) {
  return (
    <div>
      <div className="mb-4 hidden grid-cols-2 gap-10 md:grid">
        <p className="etichetta-confronto etichetta-confronto-no">Prima</p>
        <p className="etichetta-confronto etichetta-confronto-si">Dopo</p>
      </div>

      <ol className="space-y-5">
        {rows.map((row) => (
          <li
            key={row.before}
            className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr] md:gap-4"
          >
            <div className="flex items-start gap-3.5 rounded-2xl border border-brand-bordo bg-brand-bianco p-5 md:p-6">
              <span className="segno-no mt-0.5" aria-hidden>
                ✕
              </span>
              <div className="min-w-0">
                {row.aspect && (
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-grigio">
                    {row.aspect}
                    <span className="md:hidden"> · prima</span>
                  </p>
                )}
                <p className="leading-snug text-brand-grigio">{row.before}</p>
              </div>
            </div>
            <span
              className="flex items-center justify-center text-2xl font-bold text-brand-corallo-text"
              aria-hidden
            >
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </span>
            <div className="flex items-start gap-3.5 rounded-2xl border-2 border-brand-verde/40 bg-brand-bianco p-5 md:p-6">
              <span className="segno-si mt-0.5" aria-hidden>
                ✓
              </span>
              <div className="min-w-0">
                {row.aspect && (
                  <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-verde-text">
                    {row.aspect}
                    <span className="md:hidden"> · dopo</span>
                  </p>
                )}
                <p className="font-display font-bold leading-snug text-brand-nero">{row.after}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
