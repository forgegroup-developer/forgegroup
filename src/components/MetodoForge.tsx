import SectionHeader from "@/components/SectionHeader";

const fasi = [
  { n: "01", title: "Analisi & Audit" },
  { n: "02", title: "Strategia & Piano" },
  { n: "03", title: "Acquisizione Clienti" },
  { n: "04", title: "Vendita & Chiusura" },
  { n: "05", title: "Crescita & Scala" },
];

type MetodoForgeProps = {
  className?: string;
  onCoral?: boolean;
};

export default function MetodoForge({
  className = "section-bianco",
  onCoral = false,
}: MetodoForgeProps) {
  const coral = onCoral || className.includes("section-coral");

  const dotBg = coral ? "bg-white" : "bg-brand-corallo";
  const dotText = coral ? "text-brand-corallo" : "text-white";
  const lineColor = coral ? "bg-white/30" : "bg-brand-bordo";
  const titleText = coral ? "text-white" : "text-brand-nero";
  const numText = coral ? "text-white/50" : "text-brand-grigio";

  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          onCoral={coral}
          eyebrow="Il Metodo Forge"
          title={
            <>
              Il <span className={coral ? "text-white underline decoration-white/40 underline-offset-4" : "text-brand-corallo"}>Metodo FORGE</span> in 5 fasi
            </>
          }
          subtitle="Un percorso operativo e misurabile per portare la tua azienda dall'acquisizione alla crescita prevedibile."
        />

        {/* Desktop: riga orizzontale */}
        <div className="hidden md:block relative">
          {/* linea di connessione */}
          <div
            className={`absolute top-[26px] left-[calc(10%+20px)] right-[calc(10%+20px)] h-px ${lineColor}`}
            aria-hidden
          />
          <ol className="grid grid-cols-5 gap-4 relative z-10">
            {fasi.map((fase) => (
              <li key={fase.n} className="flex flex-col items-center text-center gap-4">
                {/* pallino */}
                <div
                  className={`w-[52px] h-[52px] rounded-full ${dotBg} flex items-center justify-center shrink-0 shadow-sm ring-2 ${coral ? "ring-white/20" : "ring-brand-bordo"}`}
                >
                  <span className={`text-sm font-bold tabular-nums ${dotText}`}>{fase.n}</span>
                </div>
                <span className={`text-sm font-semibold leading-snug ${titleText}`}>
                  {fase.title}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile: colonna verticale con linea */}
        <ol className="md:hidden flex flex-col gap-0">
          {fasi.map((fase, i) => (
            <li key={fase.n} className="flex items-start gap-5">
              <div className="flex flex-col items-center">
                <div
                  className={`w-11 h-11 rounded-full ${dotBg} flex items-center justify-center shrink-0 shadow-sm ring-2 ${coral ? "ring-white/20" : "ring-brand-bordo"}`}
                >
                  <span className={`text-sm font-bold tabular-nums ${dotText}`}>{fase.n}</span>
                </div>
                {i < fasi.length - 1 && (
                  <div className={`w-px flex-1 min-h-[40px] my-1 ${lineColor}`} aria-hidden />
                )}
              </div>
              <div className="pb-8 pt-2">
                <span className={`text-xs font-semibold uppercase tracking-widest ${numText}`}>Fase {fase.n}</span>
                <p className={`text-base font-semibold leading-snug mt-1 ${titleText}`}>{fase.title}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
