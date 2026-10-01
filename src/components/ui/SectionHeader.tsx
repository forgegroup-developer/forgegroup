type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  /** Larghezza contenitore titolo (default max-w-3xl) */
  maxWidth?: "3xl" | "4xl" | "5xl";
  /** Larghezza sottotitolo (default max-w-2xl) */
  subtitleMaxWidth?: "2xl" | "3xl" | "4xl";
  /** Testi chiari per sezioni con sfondo corallo */
  onCoral?: boolean;
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  maxWidth = "3xl",
  subtitleMaxWidth = "2xl",
  onCoral = false,
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const widthClass =
    maxWidth === "5xl"
      ? "max-w-5xl"
      : maxWidth === "4xl"
        ? "max-w-4xl"
        : "max-w-3xl";
  const subtitleWidthClass =
    subtitleMaxWidth === "4xl"
      ? "max-w-4xl"
      : subtitleMaxWidth === "3xl"
        ? "max-w-3xl"
        : "max-w-2xl";
  const subtitleAlign = align === "center" ? "mx-auto" : "";

  return (
    <div
      className={`${widthClass} ${alignClass} mb-12 md:mb-16 ${onCoral ? "copy-on-coral" : ""}`}
    >
      {/* Il marcatore dell'occhiello arriva da .eyebrow-mark::before:
          decorativo, quindi fuori dal testo copiabile e dagli screen reader. */}
      {/* Stesso stile dei titoli dei blocchi (REGOLE-DEL-SITO.md §4):
          occhiello con la riga sotto, titolo pieno e compatto. Sul mattone
          la parola chiave diventa da sola evidenziatore. */}
      {eyebrow && (
        <p
          className={`mb-6 flex ${align === "center" ? "justify-center" : ""}`}
        >
          <span className="eyebrow-rule">{eyebrow}</span>
        </p>
      )}
      <h2
        className={`heading-section-xl text-balance ${onCoral ? "text-white" : "text-brand-nero"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`body-lg mt-5 ${subtitleWidthClass} ${subtitleAlign} ${onCoral ? "text-white/90" : ""}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
