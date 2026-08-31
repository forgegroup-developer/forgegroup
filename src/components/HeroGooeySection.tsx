import GooeyGradientBackground from "@/components/GooeyGradientBackground";

type HeroGooeySectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  innerClassName?: string;
  after?: React.ReactNode;
  /** Fondale "muro in costruzione" dietro al contenuto della hero. */
  muro?: boolean;
};

export default function HeroGooeySection({
  children,
  id,
  className = "pt-16 pb-12 md:pt-24 md:pb-16",
  innerClassName = "",
  after,
  muro = false,
}: HeroGooeySectionProps) {
  return (
    <section id={id} className="relative overflow-hidden">
      <GooeyGradientBackground className={className}>
        {/* Il muro sta sopra il gradiente e sotto il contenuto: e' decorativo,
            quindi aria-hidden e senza eventi puntatore. */}
        {muro && <div className="muro-cantiere" aria-hidden />}
        <div className={`relative ${innerClassName}`}>{children}</div>
      </GooeyGradientBackground>
      {after}
    </section>
  );
}
