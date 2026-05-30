import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

const fasi = [
  {
    n: "01",
    title: "Analisi & Audit Commerciale",
    desc: "Fotografia completa della situazione attuale: mercato, processo di vendita, canali di acquisizione e KPI chiave.",
  },
  {
    n: "02",
    title: "Strategia & Piano d'Azione",
    desc: "Definiamo priorità, budget e sequenza operativa. Nessuna mossa senza un perché misurabile.",
  },
  {
    n: "03",
    title: "Acquisizione & Lead Generation",
    desc: "Attiviamo i canali: campagne ads, funnel, SEO e LinkedIn per portare contatti qualificati in modo costante.",
  },
  {
    n: "04",
    title: "Vendite & Processo Commerciale",
    desc: "Ottimizziamo CRM, script di vendita e pipeline per convertire più opportunità in contratti firmati.",
  },
  {
    n: "05",
    title: "Monitoraggio & Scala",
    desc: "Report trimestrali, revisione KPI e affiancamento strategico per crescere con metodo, non per fortuna.",
  },
];

export default function MetodoForge({ className = "bg-brand-bianco" }: { className?: string }) {
  return (
    <section className={`py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Il Metodo Forge"
          title={
            <>
              Il <span className="text-brand-corallo">Metodo FORGE</span> in 5 Fasi
            </>
          }
          subtitle="Un percorso strutturato per portare la tua azienda dall'acquisizione alla crescita sostenibile."
        />

        <div className="max-w-3xl mx-auto space-y-6">
          {fasi.map((item, i) => (
            <Reveal key={item.n} delay={(i % 3) as 0 | 1 | 2}>
              <div className="flex items-start gap-6 bg-brand-panna border border-brand-bordo rounded-xl p-6 hover:border-brand-corallo transition-colors">
                <div className="font-display text-5xl font-semibold text-brand-corallo shrink-0">
                  {item.n}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-brand-nero mb-2">{item.title}</h3>
                  <p className="text-brand-grigio">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
