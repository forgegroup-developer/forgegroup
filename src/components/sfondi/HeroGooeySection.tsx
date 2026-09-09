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
  /** Passa --foto-hero per mettere una fotografia sotto al velo. */
  style?: React.CSSProperties;
  /** Niente sfumatura e niente reticolo: solo il fondo panna. */
  pulita?: boolean;
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
  style,
  pulita = false,
}: HeroGooeySectionProps) {
  // Con "pulita" restano solo il testo e la fotografia: la sfumatura pesca e
  // il reticolo da disegno tecnico spariscono. Sul telefono, dove la hero e'
  // gia' testo su fotografia, erano un terzo strato che rubava attenzione.
  const fondale = pulita ? false : true;
  return (
    <section
      id={id}
      className={`relative overflow-hidden${pulita ? " bg-brand-panna" : ""}`}
    >
      <div
        style={style}
        className={`relative h-full w-full overflow-hidden ${scura ? "hero-scura " : ""}${className}`.trim()}
      >
        {!scura && fondale && (
          <div className="hero-fondale pointer-events-none absolute inset-0" aria-hidden />
        )}
        {/* Il muro sta sopra la sfumatura e sotto il contenuto: e' decorativo,
            quindi aria-hidden e senza eventi puntatore. */}
        {muro && !pulita && <div className="muro-cantiere" aria-hidden />}
        <div className={`relative ${innerClassName}`}>{children}</div>
      </div>
      {after}
    </section>
  );
}
