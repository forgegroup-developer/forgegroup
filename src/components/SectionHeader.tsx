type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  /** Larghezza contenitore titolo (default max-w-3xl) */
  maxWidth?: "3xl" | "4xl" | "5xl";
};

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  maxWidth = "3xl",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const widthClass =
    maxWidth === "5xl" ? "max-w-5xl" : maxWidth === "4xl" ? "max-w-4xl" : "max-w-3xl";
  return (
    <div className={`${widthClass} ${alignClass} mb-12 md:mb-16`}>
      {eyebrow && <p className="eyebrow mb-4">✦ {eyebrow}</p>}
      <h2 className="heading-section text-brand-nero">{title}</h2>
      {subtitle && <p className="body-lg mt-5 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
