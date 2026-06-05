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
      <div className="grid grid-cols-2 divide-x divide-brand-bordo border-b border-brand-bordo">
        <div className="px-4 py-3 md:px-8 md:py-5 bg-red-50">
          <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-red-600 font-bold mb-0.5">
            ✕ Prima
          </p>
          <h3 className="text-xs md:text-base font-bold text-red-800 uppercase tracking-wide leading-snug">
            Senza sistema
          </h3>
        </div>
        <div className="px-4 py-3 md:px-8 md:py-5 bg-emerald-50">
          <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-emerald-700 font-bold mb-0.5">
            ✓ Dopo
          </p>
          <h3 className="text-xs md:text-base font-bold text-emerald-800 uppercase tracking-wide leading-snug">
            Con Forge Group
          </h3>
        </div>
      </div>

      {rows.map((row, idx) => (
        <div
          key={idx}
          className={`grid grid-cols-2 divide-x divide-brand-bordo/60 ${
            idx > 0 ? "border-t border-brand-bordo/60" : ""
          }`}
        >
          <div className="flex items-start gap-2 md:gap-3 px-3 md:px-8 py-3 md:py-4 bg-red-50/70">
            <span
              className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] md:text-xs font-bold shadow-sm"
              aria-hidden
            >
              ✕
            </span>
            <div className="min-w-0">
              {row.aspect && (
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-red-700/80 font-bold mb-1">
                  {row.aspect}
                </p>
              )}
              <span className="text-xs md:text-sm leading-snug text-red-950/85 font-medium">
                {row.before}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-2 md:gap-3 px-3 md:px-8 py-3 md:py-4 bg-emerald-50/80">
            <span
              className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm"
              aria-hidden
            >
              <svg className="w-2.5 h-2.5 md:w-3.5 md:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            <div className="min-w-0">
              {row.aspect && (
                <p className="text-[10px] md:text-xs uppercase tracking-widest text-emerald-800/80 font-bold mb-1">
                  {row.aspect}
                </p>
              )}
              <span className="text-xs md:text-sm leading-snug font-semibold text-emerald-950">
                {row.after}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
