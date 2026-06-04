import Link from "next/link";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Chi Siamo e Manifesto",
  description:
    "Il manifesto di Forge Group: valori, metodo e chi siamo davvero. Un'agenzia che costruisce sistemi di acquisizione, non campagne generiche.",
  alternates: { canonical: "/chi-siamo-e-manifesto" },
};

const values = [
  {
    title: "Trasparenza",
    desc: "Numeri reali, report onesti. Se qualcosa non funziona, lo diciamo subito. Niente metriche di vanità per coprire risultati scarsi.",
  },
  {
    title: "Concretezza",
    desc: "Lavoriamo per il fatturato che generiamo ai nostri partner. Tutto il resto è teoria. Ogni progetto ha KPI di business misurabili.",
  },
  {
    title: "Velocità",
    desc: "Decidiamo in fretta, eseguiamo in fretta. Risolviamo problemi prima che diventino bug nel processo di crescita.",
  },
  {
    title: "Responsabilità",
    desc: "Ci prendiamo i risultati del cliente come fossero nostri. Se non porti i numeri, è anche colpa nostra. Senza scuse.",
  },
  {
    title: "Crescita Continua",
    desc: "Investiamo ogni mese nella nostra formazione e nei nostri processi. Quello che ti vendiamo lo applichiamo per primi.",
  },
  {
    title: "Comunicazione Integra",
    desc: "Diretta, faccia a faccia, senza compromessi. La verità prima della convenienza, anche quando è scomoda.",
  },
];

export default function ChiSiamoManifesto() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">
            ✦ Il Nostro Manifesto
          </p>
          <h1 className="heading-hero text-brand-nero mb-8">
            Non siamo l&apos;ennesima <span className="text-brand-corallo">agenzia creativa</span>.
          </h1>
          <p className="text-xl md:text-2xl text-brand-grigio leading-relaxed">
            Siamo un&apos;infrastruttura di acquisizione e vendita per aziende B2B che vogliono dominare il loro mercato — non
            essere &ldquo;visibili&rdquo; su Instagram.
          </p>
        </div>
      </section>

      {/* CHI SIAMO */}
      <section className="py-16 md:py-24 section-coral border-y">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 copy-on-coral">
          <p className="eyebrow-coral mb-4">✦ Chi siamo</p>
          <h2 className="heading-section font-semibold leading-tight mb-8">
            Due imprenditori, una visione comune.
          </h2>
          <div className="prose prose-lg max-w-none leading-relaxed space-y-4">
            <p>
              Forge Group nasce dall&apos;incrocio di due visioni: quella di chi ha già costruito un&apos;agenzia di
              marketing e quella di chi viene dal lato cliente, dal contatto quotidiano con le imprese. Da questo incrocio
              nasce un&apos;agenzia diversa.
            </p>
            <p>
              Non vendiamo &ldquo;visibilità&rdquo;, &ldquo;awareness&rdquo;, &ldquo;like&rdquo;. Vendiamo sistemi che
              portano clienti che pagano, che ritornano e che parlano bene di te. Lavoriamo sull&apos;intero processo: dal
              primo touch in pubblicità al contratto firmato, fino alla retention.
            </p>
            <p>
              Crediamo che il marketing serio nel B2B sia un mestiere artigianale, basato su dati reali, processi solidi e
              decisioni prese con la testa. Non è un&apos;arte. È ingegneria di business.
            </p>
          </div>
        </div>
      </section>

      {/* VALORI */}
      <section className="py-16 md:py-24 bg-brand-bianco">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">
              ✦ Valori Innegoziabili
            </p>
            <h2 className="heading-section font-semibold text-brand-nero leading-tight">
              I principi su cui costruiamo l&apos;agenzia, ogni giorno.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-brand-panna border border-brand-bordo rounded-2xl p-7 hover:border-brand-corallo transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-brand-corallo text-2xl">✦</span>
                  <h3 className="text-lg font-semibold font-bold text-brand-nero">{v.title}</h3>
                </div>
                <p className="text-brand-grigio leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHI NON ACCETTIAMO */}
      <section className="py-16 md:py-24 section-coral border-y">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 copy-on-coral">
          <p className="eyebrow-coral mb-4">
            ✦ I Nostri Confini
          </p>
          <h2 className="heading-section font-semibold leading-tight mb-6">
            Chi <span>NON</span> accettiamo.
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-10">
            Per mantenere standard alti e portare risultati veri, rifiutiamo categoricamente di lavorare con queste
            tipologie di clienti.
          </p>

          <ul className="space-y-3">
            {[
              "Aziende che vogliono la Ferrari al prezzo della Panda",
              "Imprenditori che cercano la 'bacchetta magica' in 30 giorni",
              "Realtà che vendono prodotti o servizi di scarsa qualità",
              "Aziende con fatturato annuo inferiore a 250.000€",
              "Clienti arroganti che 'sanno già tutto'",
              "Chi non è disposto a investire sul proprio business",
              "Lavori che possono compromettere i nostri valori",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 bg-brand-bianco border border-brand-bordo rounded-lg p-4"
              >
                <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  ✕
                </span>
                <span className="text-brand-nero">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        eyebrow="Sei in target?"
        title={
          <>
            Se condividi i nostri valori, <span className="text-brand-corallo">parliamone</span>.
          </>
        }
        description="Il primo passo è il questionario di prequalifica. Bastano 5 minuti. Se siamo allineati, ti contattiamo entro 48 ore."
        primary={{ label: "HAI UN MINUTO?", href: "/contatti" }}
        secondary={{ label: "Scopri i servizi", href: "/servizi" }}
      />
    </>
  );
}
