type HeroGooeySectionProps = {
  children: React.ReactNode;
  id?: string;
  className?: string;
  innerClassName?: string;
  after?: React.ReactNode;
  /** Fondale "muro in costruzione". Attivo di default su tutte le hero. */
  muro?: boolean;
  /** Fondo scuro con velo: serve quando sotto c'e' una fotografia. */
  scura?: boolean;
};

/**
 * Fondale comune a tutte le hero: sfumatura statica + muro di cantiere.
 *
 * Sostituisce GooeyGradientBackground, che per ogni hero montava un filtro SVG
 * con feGaussianBlur, un blur(40px) a tutta area, un loop requestAnimationFrame
 * e un listener pointermove. Era il singolo costo di rendering piu' alto del
 * sito e ripagava poco: la stessa aria si ottiene con due gradienti radiali.
 * Il componente animato resta nel repo, non collegato, se lo si vuole indietro.
 */
export default function HeroGooeySection({
  children,
  id,
  className = "pt-16 pb-12 md:pt-24 md:pb-16",
  innerClassName = "",
  after,
  muro = true,
  scura = false,
}: HeroGooeySectionProps) {
  return (
    <section id={id} className="relative overflow-hidden">
      <div
        className={`relative h-full w-full overflow-hidden ${scura ? "hero-scura " : ""}${className}`.trim()}
      >
        {!scura && <div className="hero-fondale pointer-events-none absolute inset-0" aria-hidden />}
        {/* Il muro sta sopra la sfumatura e sotto il contenuto: e' decorativo,
            quindi aria-hidden e senza eventi puntatore. */}
        {muro && <div className="muro-cantiere" aria-hidden />}
        <div className={`relative ${innerClassName}`}>{children}</div>
      </div>
      {after}
    </section>
  );
}
