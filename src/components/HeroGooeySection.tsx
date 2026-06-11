import GooeyGradientBackground from "@/components/GooeyGradientBackground";

type HeroGooeySectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  innerClassName?: string;
  after?: React.ReactNode;
};

export default function HeroGooeySection({
  children,
  id,
  className = "pt-16 pb-12 md:pt-24 md:pb-16",
  innerClassName = "",
  after,
}: HeroGooeySectionProps) {
  return (
    <section id={id} className="relative overflow-hidden">
      <GooeyGradientBackground className={className}>
        <div className={innerClassName}>{children}</div>
      </GooeyGradientBackground>
      {after}
    </section>
  );
}
