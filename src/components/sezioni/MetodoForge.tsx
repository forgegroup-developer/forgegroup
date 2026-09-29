import { CONTENITORE, SEZIONE, Chiave, Titolo } from "@/components/blocchi/ui";

/* Niente animazione d'entrata, per scelta della proprieta' (21 settembre
   2026). Reveal faceva sparire i passi appena partiva JavaScript per poi
   farli riapparire in dissolvenza, dopo un secondo e mezzo li mostrava
   comunque anche fuori schermo, e il ritardo fra un passo e l'altro valeva
   solo quando sparivano: chi arrivava lento non vedeva niente, chi arrivava
   veloce vedeva un lampo. Il Metodo e' la sezione da leggere con calma:
   sta ferma. */
/* Nomi e contenuti dalla Scheda dei fatti (confermati dalla proprieta' il
   28/09/2026). I vecchi nomi (Formazione, Reputazione, Economia) non si
   usano piu'. */
const fasi = [
  {
    letter: "F",
    verticalLabel: "FONDAMENTA",
    title: "Fondamenta",
    description:
      "Si parte dall'audit commerciale: chi è la tua impresa, come è organizzata, a chi vende, come arrivano e come si gestiscono oggi le richieste, i tuoi numeri e gli obiettivi a dodici mesi.",
    takeaway: "la base su cui si costruisce tutto, partendo dalla tua impresa",
  },
  {
    letter: "O",
    verticalLabel: "ORGANIZZAZIONE",
    title: "Organizzazione",
    description:
      "Rifacciamo Facebook e Instagram sulle tue linee di lavoro, partendo da quello che è uscito dall'audit. Chi ti trova vede subito cosa fai e per chi.",
    takeaway: "social coerenti con quello che vendi",
  },
  {
    letter: "R",
    verticalLabel: "RICHIESTE",
    title: "Richieste",
    description:
      "Le campagne su Meta e Google le gestiamo noi, sulle linee scelte nell'audit, con un video girato nei tuoi cantieri per ognuna. Ogni richiesta passa dal modulo che chiede tipo di lavoro, tempi, budget e zona.",
    takeaway: "richieste di lavoro già filtrate",
  },
  {
    letter: "G",
    verticalLabel: "GESTIONE",
    title: "Gestione",
    description:
      "Ogni richiesta arriva nel gestionale con nome, telefono, zona e interesse, prima della prima telefonata. Lì segui anche sopralluogo, preventivo, piano di stima e piano dei lavori.",
    takeaway: "il controllo su ogni trattativa, anche dal cantiere",
  },
  {
    letter: "E",
    verticalLabel: "EVOLUZIONE",
    title: "Evoluzione",
    description:
      "Scriviamo con te il processo di vendita: il materiale commerciale, le parole per richiamare, tutti i passaggi fino al contratto. Poi una consulenza al mese e una chiamata a settimana sulle trattative.",
    takeaway: "un modo di vendere scritto, che resta in azienda",
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
  // Vale per corallo e per notte: cambia solo il fondo, la logica dei
  // colori del testo e' la stessa — chiaro su scuro.
  const coral =
    onCoral ||
    className.includes("section-coral") ||
    className.includes("section-mattone") ||
    className.includes("section-notte");

  return (
    <section
      id="metodo"
      className={`relative overflow-hidden scroll-mt-24 ${SEZIONE} ${className}`}
    >
      {!coral && (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_400px_at_85%_-5%,rgba(200,80,42,0.06),transparent_60%)]"
          aria-hidden
        />
      )}

      <div className={`relative z-10 ${CONTENITORE}`}>
        <Titolo occhiello="Il metodo">
          Il <Chiave>Metodo FORGE</Chiave>: dal contatto alla firma, in cinque
          fasi
        </Titolo>

        <div className="mx-auto max-w-5xl">
          {fasi.map((fase, idx) => (
            <article
              key={fase.letter}
              className={`grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-2 sm:gap-9 items-center py-8 md:py-9 border-t ${
                coral ? "border-white/15" : "border-brand-bordo"
              } ${idx === fasi.length - 1 ? (coral ? "border-b border-white/15" : "border-b border-brand-bordo") : ""} group`}
            >
              <div className="flex items-baseline gap-1 sm:gap-1.5">
                <span
                  className={`font-display font-extrabold text-[clamp(4.2rem,9vw,7rem)] leading-[0.8] transition-colors duration-300 ${
                    coral
                      ? "text-white/45 group-hover:text-white"
                      : "text-brand-corallo group-hover:text-brand-corallo-dark"
                  }`}
                >
                  {fase.letter}
                </span>
                <span className={`hidden sm:inline font-display font-bold text-[clamp(0.85rem,1vw,1rem)] tracking-[0.14em] uppercase self-center [writing-mode:vertical-rl] rotate-180 ${
                    coral ? "text-white/90" : "text-brand-nero"
                  }`}>
                  {fase.verticalLabel}
                </span>
              </div>

              <div>
                <h3
                  className={`font-display font-bold text-[clamp(1.35rem,2.4vw,1.9rem)] tracking-tight mb-2.5 ${
                    coral ? "!text-white" : "!text-brand-corallo"
                  }`}
                >
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
          ))}
        </div>
      </div>
    </section>
  );
}
