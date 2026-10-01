import Image from "next/image";

export type BeforeAfterRow = {
  /** Etichetta opzionale della riga (es. Acquisizione, Vendita) */
  aspect?: string;
  before: string;
  after: string;
};

type Foto = { src: string; alt: string };

type Props = {
  rows: BeforeAfterRow[];
  /** Le due scene, prima e dopo (immagini AI, con la scritta). */
  foto?: { prima: Foto; dopo: Foto };
};

/*
 * Prima e dopo (rifatto il 29/09/2026, proprietà: "layout pessimo").
 * Sopra le due scene affiancate, sotto una tabella sola come quella del
 * confronto in home: una riga per aspetto, a sinistra com'era (✕), a
 * destra com'è (✓). Da telefono ogni riga diventa una scheda con il prima
 * sopra e il dopo sotto. Schede bianche, il verde solo nella spunta.
 */
export default function CaseStudyBeforeAfter({ rows, foto }: Props) {
  return (
    <div>
      {foto && (
        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {(
            [
              ["Prima", foto.prima, "bg-brand-corallo"],
              ["Dopo", foto.dopo, "bg-brand-verde"],
            ] as const
          ).map(([etichetta, f, colore]) => (
            <figure key={etichetta} className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-brand-bianco">
              <Image src={f.src} alt={f.alt} fill sizes="(min-width: 640px) 440px, 100vw" className="object-cover" />
              <p className={`absolute left-3 top-3 rounded-full px-4 py-1.5 text-sm font-bold text-white shadow ${colore}`}>
                {etichetta}
              </p>
              <figcaption className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] text-white">
                Immagine generata con AI
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-brand-bordo bg-brand-bianco shadow-lg">
        <div className="hidden grid-cols-2 border-b border-brand-bordo md:grid">
          <p className="px-8 py-5 font-display text-lg font-bold text-brand-corallo-text">Prima</p>
          <p className="border-l border-brand-bordo px-8 py-5 font-display text-lg font-bold text-brand-verde-text">
            Dopo
          </p>
        </div>
        <ol>
          {rows.map((row, idx) => (
            <li
              key={row.before}
              className={`grid md:grid-cols-2 ${idx > 0 ? "border-t border-brand-bordo" : ""}`}
            >
              <div className="flex gap-3.5 px-5 pt-5 md:px-8 md:py-6">
                <span className="segno-no mt-0.5" aria-hidden>
                  ✕
                </span>
                <div>
                  {row.aspect && (
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-corallo-text">
                      {row.aspect}
                    </p>
                  )}
                  <p className="mt-1 leading-snug text-brand-grigio">{row.before}</p>
                </div>
              </div>
              <div className="flex gap-3.5 px-5 pb-5 pt-3 md:border-l md:border-brand-bordo md:px-8 md:py-6">
                <span className="segno-si mt-0.5" aria-hidden>
                  ✓
                </span>
                <div>
                  {row.aspect && (
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-verde-text">
                      <span className="md:hidden">Dopo</span>
                      <span className="hidden md:inline">{row.aspect}</span>
                    </p>
                  )}
                  <p className="mt-1 font-display font-bold leading-snug text-brand-nero">{row.after}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
