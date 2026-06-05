import Reveal from "@/components/Reveal";

const fasi = [
  {
    letter: "F",
    rest: "ormazione",
    title: "Formazione",
    description:
      "Partiamo da un percorso di consulenza e formazione per inquadrare il tuo modello di business, gli obiettivi reali e dove si rompe oggi la tua acquisizione clienti. Prima di agire, capiamo. Nessuna soluzione preconfezionata.",
    takeaway: "una strategia su misura, non un copia-incolla",
  },
  {
    letter: "O",
    rest: "rganizzazione",
    title: "Organizzazione",
    description:
      "Sistemiamo le fondamenta: piattaforme, sito, contenuti, presenza online e processi interni. Mettiamo ordine dove oggi c'è improvvisazione, così la macchina è pronta a vendere prima ancora di accenderla.",
    takeaway: "basi solide, niente più caos",
  },
  {
    letter: "R",
    rest: "eputazione",
    title: "Reputazione",
    description:
      "Costruiamo posizionamento e riprova sociale: Google My Business, recensioni raccolte in modo continuo, presenza digitale coerente su tutte le piattaforme. È la fiducia che fa scattare il contatto, e di questa fiducia ci prendiamo la piena responsabilità.",
    takeaway: "i clienti ti scelgono prima ancora di chiamarti",
  },
  {
    letter: "G",
    rest: "estione",
    title: "Gestione",
    description:
      "Gestiamo il flusso: pre-qualifica dei contatti, follow-up, supporto alla vendita e CRM. I potenziali clienti non si limitano ad arrivare: li accompagniamo fino a diventare prenotazioni, appuntamenti, contratti.",
    takeaway: "contatti che si trasformano in incassi",
  },
  {
    letter: "E",
    rest: "conomia",
    title: "Economia",
    description:
      "Misuriamo tutto in termini economici: più clienti, più margine, crescita prevedibile e scalabile. L'obiettivo non è \"fare marketing\": è far crescere il tuo fatturato in modo concreto e sostenibile nel tempo.",
    takeaway: "numeri reali, non vanity metrics",
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
              Il Metodo <span className="text-brand-corallo">FORGE</span>
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
                  <span
                    className={`hidden sm:inline font-display font-bold text-[clamp(0.85rem,1vw,1rem)] tracking-[0.14em] uppercase opacity-55 self-center [writing-mode:vertical-rl] rotate-180 ${
                      coral ? "text-white/70" : "text-brand-grigio"
                    }`}
                  >
                    {fase.rest}
                  </span>
                </div>

                <div>
                  <h3
                    className={`font-display font-bold text-[clamp(1.35rem,2.4vw,1.9rem)] tracking-tight mb-2.5 ${
                      coral ? "text-white" : "text-brand-nero"
                    }`}
                  >
                    {fase.title}
                  </h3>
                  <p className={`text-base leading-relaxed max-w-2xl ${coral ? "text-white/80" : "text-brand-grigio"}`}>
                    {fase.description}
                  </p>
                  <span
                    className={`inline-flex items-center gap-2 mt-4 text-[13.5px] font-semibold px-4 py-1.5 rounded-full ${
                      coral
                        ? "text-white bg-white/10"
                        : "text-brand-corallo-dark bg-brand-pesca-light"
                    }`}
                  >
                    Per te:{" "}
                    <strong className={coral ? "text-white" : "text-brand-nero"}>{fase.takeaway}</strong>
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={1}>
          <p
            className={`text-center font-display font-bold text-[clamp(1.2rem,2vw,1.6rem)] leading-snug max-w-2xl mx-auto mt-14 md:mt-16 ${
              coral ? "text-white [&_span]:text-brand-pesca-light" : "text-brand-nero"
            }`}
          >
            Cinque fasi, un solo obiettivo: trasformarti da azienda che{" "}
            <span className="text-brand-corallo">rincorre</span> i clienti ad azienda che li{" "}
            <span className="text-brand-corallo">sceglie</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
