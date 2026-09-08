export type BeforeAfterRow = {
  /** Etichetta opzionale della riga (es. Acquisizione, Vendita) */
  aspect?: string;
  before: string;
  after: string;
};

type Props = {
  rows: BeforeAfterRow[];
};

export default function CaseStudyBeforeAfter({ rows }: Props) {
  return (
    <div className="rounded-2xl border border-brand-bordo overflow-hidden bg-brand-bianco shadow-lg">
      {/* Intestazioni — sempre 2 colonne anche su mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:divide-x divide-brand-bordo border-b border-brand-bordo">
        <div className="px-4 py-3 md:px-8 md:py-5 bg-red-50 border-b border-brand-bordo sm:border-b-0">
          <p className="text-xs md:text-base font-bold text-red-800 uppercase tracking-wide leading-snug">
            Prima
          </p>
        </div>
        <div className="px-4 py-3 md:px-8 md:py-5 bg-emerald-50">
          <p className="text-xs md:text-base font-bold text-emerald-800 uppercase tracking-wide leading-snug">
            Dopo
          </p>
        </div>
      </div>

      {rows.map((row, idx) => (
        <div
          key={idx}
          className={`grid grid-cols-1 sm:grid-cols-2 sm:divide-x divide-brand-bordo/60 ${
            idx > 0 ? "border-t border-brand-bordo/60" : ""
          }`}
        >
          <div className="flex items-start gap-2 md:gap-3 px-4 md:px-8 py-3 md:py-4 bg-red-50/70 border-b border-brand-bordo/40 sm:border-b-0">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400/80"
              aria-hidden
            />
            <div className="min-w-0">
              {row.aspect && (
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-red-700/80 font-bold mb-1">
                  {row.aspect}
                </p>
              )}
              <span className="text-xs md:text-sm leading-snug text-red-950/85 font-medium pt-0.5">
                {row.before}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2 md:gap-3 px-3 md:px-8 py-3 md:py-4 bg-emerald-50/80">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600/80"
              aria-hidden
            />
            <div className="min-w-0">
              {row.aspect && (
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-emerald-800/80 font-bold mb-1">
                  {row.aspect}
                </p>
              )}
              <span className="text-xs md:text-sm leading-snug font-semibold text-emerald-950 pt-0.5">
                {row.after}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
