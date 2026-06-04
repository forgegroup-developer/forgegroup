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
    maxWidth === "5xl" ? "max-w-5xl" : maxWidth === "4xl" ? "max-w-4xl" : "max-w-3xl";
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
      {eyebrow && (
        <p className={onCoral ? "eyebrow-coral mb-4" : "eyebrow mb-4"}>✦ {eyebrow}</p>
      )}
      <h2
        className={`heading-section ${onCoral ? "text-white [&_span]:text-brand-pesca-light" : "text-brand-nero"}`}
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
