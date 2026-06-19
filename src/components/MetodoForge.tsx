import dynamic from "next/dynamic";

const Reveal = dynamic(() => import("@/components/Reveal"));

const fasi = [
  {
    letter: "F",
    verticalLabel: "FORMAZIONE",
    title: "Formazione",
    description:
      "Partiamo da un percorso di consulenza e formazione per inquadrare il tuo modello di business, gli obiettivi reali e dove si rompe oggi la tua acquisizione clienti. Prima di agire, capiamo insieme. Partiamo dal tuo modello, non da un copia-incolla.",
    takeaway: "una strategia su misura, non un copia-incolla",
  },
  {
    letter: "O",
    verticalLabel: "ORGANIZZAZIONE",
    title: "Organizzazione",
    description:
      "Sistemiamo le fondamenta: piattaforme, sito, contenuti, presenza online e processi interni. Mettiamo ordine dove i processi non sono ancora allineati, così la macchina è pronta a vendere prima ancora di accenderla.",
    takeaway: "basi solide, niente più caos",
  },
  {
    letter: "R",
    verticalLabel: "REPUTAZIONE",
    title: "Reputazione",
    description:
      "Costruiamo posizionamento e riprova sociale: Google My Business, recensioni raccolte in modo continuo, presenza digitale coerente su tutte le piattaforme. È la fiducia che fa scattare il contatto, e lavoriamo con te per costruirla con continuità.",
    takeaway: "i clienti ti scelgono prima ancora di chiamarti",
  },
  {
    letter: "G",
    verticalLabel: "GESTIONE",
    title: "Gestione",
    description:
      "Gestiamo il flusso: pre-qualifica dei contatti, follow-up, supporto alla vendita e CRM. I potenziali clienti non si limitano ad arrivare: li accompagniamo fino a diventare prenotazioni, appuntamenti, contratti.",
    takeaway: "contatti che si trasformano in incassi",
  },
  {
    letter: "E",
    verticalLabel: "ECONOMIA",
    title: "Economia",
    description:
      "Misuriamo tutto in termini economici: più clienti, più margine, crescita prevedibile e scalabile. L'obiettivo non è \"fare marketing\": è far crescere il tuo fatturato in modo concreto e sostenibile nel tempo.",
    takeaway: "metriche che contano sul fatturato",
  },
] as const;

type MetodoForgeProps = {
  className?: string;
  onCoral?: boolean;
};

export default function MetodoForge({
  className = "section-bianco",
  onCoral = false,
}: MetodoForgeProps) {
  const coral = onCoral || className.includes("section-coral");

  return (
    <section className={`relative overflow-hidden py-20 md:py-24 lg:py-28 ${className}`}>
      {!coral && (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_85%_-5%,rgba(200,80,42,0.06),transparent_60%)]"
          aria-hidden
        />
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2
              className={`heading-section leading-tight ${coral ? "text-white [&_span]:text-brand-pesca-light" : "text-brand-nero"}`}
            >
              Il metodo <span className="text-brand-corallo">FORGE</span> in 5 step
            </h2>
          </div>
        </Reveal>

        <div>
          {fasi.map((fase, idx) => (
            <Reveal key={fase.letter} delay={(idx % 4) as 0 | 1 | 2 | 3}>
              <article
                className={`grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 sm:gap-9 items-center py-8 md:py-9 border-t ${
                  coral ? "border-white/15" : "border-brand-bordo"
                } ${idx === fasi.length - 1 ? (coral ? "border-b border-white/15" : "border-b border-brand-bordo") : ""} group`}
              >
                <div className="flex items-baseline gap-1 sm:gap-1.5">
                  <span
                    className={`font-display font-extrabold text-[clamp(4.2rem,9vw,7rem)] leading-[0.8] transition-colors duration-300 group-hover:text-brand-corallo-dark ${
                      coral ? "text-brand-pesca-light group-hover:text-white" : "text-brand-corallo"
                    }`}
                  >
                    {fase.letter}
                  </span>
                  <span className="hidden sm:inline font-display font-bold text-[clamp(0.85rem,1vw,1rem)] tracking-[0.14em] uppercase self-center [writing-mode:vertical-rl] rotate-180 text-brand-nero">
                    {fase.verticalLabel}
                  </span>
                </div>

                <div>
                  <h3 className="font-display font-bold text-[clamp(1.35rem,2.4vw,1.9rem)] tracking-tight mb-2.5 !text-brand-corallo">
                    {fase.title}
                  </h3>
                  <p className={`text-base leading-relaxed max-w-2xl ${coral ? "text-white/80" : "text-brand-grigio"}`}>
                    {fase.description}
                  </p>
                  <span
                    className={`inline-flex w-fit items-center gap-1.5 mt-4 rounded-full border-2 bg-transparent px-5 py-2.5 text-sm font-bold normal-case shadow-sm transition-all duration-200 hover:bg-brand-corallo/10 ${
                      coral
                        ? "border-white text-white hover:bg-white/10"
                        : "border-brand-corallo text-brand-corallo"
                    }`}
                  >
                    Per te: {fase.takeaway}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
