import Link from "next/link";
import type { Metadata } from "next";
import HeroBento from "@/components/HeroBento";
import SectionHeader from "@/components/SectionHeader";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Servizi — Forge Group | Acquisizione, Vendite, Crescita B2B",
  description:
    "Dal lead all'acquisto: advertising, social, sito web, SEO, CRM, processi di vendita e consulenza strategica. Scopri come costruiamo il sistema di crescita per la tua azienda.",
  alternates: { canonical: "/servizi" },
};

export default function ServiziHub() {
  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 bg-brand-bianco">
        <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pesca-light/60 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-pesca/20 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="inline-flex items-center gap-2 eyebrow mb-6 px-4 py-2 rounded-full border border-brand-bordo bg-brand-bianco">
                ✦ Come Lavoriamo
              </p>
              <h1 className="heading-hero text-brand-nero mb-6">
                Dal primo contatto{" "}
                <span className="text-brand-corallo">al contratto firmato</span>
              </h1>
              <p className="body-lg text-brand-grigio max-w-xl">
                Non vendiamo servizi isolati. Costruiamo un sistema integrato di acquisizione clienti,
                vendita e crescita aziendale su misura della tua impresa.
              </p>
            </div>
            <div className="w-full">
              <HeroBento />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-panna border-y border-brand-bordo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 md:space-y-28">

            {/* 01 — Acquisizione Clienti */}
            <Reveal>
              <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">
                <div className="lg:sticky lg:top-28">
                  <span className="text-brand-corallo font-bold text-sm uppercase tracking-widest">01</span>
                  <h2 className="heading-section text-brand-nero mt-2 mb-4">Acquisizione Clienti</h2>
                  <p className="body-lg text-brand-grigio mb-6">
                    I tuoi potenziali clienti esistono. Il problema è che non ti trovano.
                  </p>
                  <Link
                    href="/servizi/advertising-lead-generation"
                    className="inline-flex items-center gap-2 text-brand-corallo font-bold text-sm hover:gap-3 transition-all"
                  >
                    Scopri i servizi →
                  </Link>
                </div>
                <div className="space-y-6">
                  <div className="bg-brand-bianco border border-brand-bordo rounded-2xl p-7">
                    <p className="font-semibold text-brand-nero mb-2">Ogni mese hai bisogno di nuove richieste qualificate. Le portiamo noi.</p>
                    <p className="text-brand-grigio leading-relaxed">
                      Campagne Meta e Google, funnel e lead generation per portare contatti già filtrati, prima ancora che parlino col tuo commerciale.
                    </p>
                  </div>
                  <div className="bg-brand-bianco border border-brand-bordo rounded-2xl p-7">
                    <p className="font-semibold text-brand-nero mb-2">Quando un cliente cerca il tuo prodotto online, esci tu o il tuo competitor?</p>
                    <p className="text-brand-grigio leading-relaxed">
                      Sito, SEO e LinkedIn costruiti per farti trovare da chi ha già intenzione di acquistare.
                    </p>
                  </div>
                  <div className="bg-brand-bianco border border-brand-bordo rounded-2xl p-7">
                    <p className="font-semibold text-brand-nero mb-2">Chi ti segue sui social dovrebbe voler comprare da te.</p>
                    <p className="text-brand-grigio leading-relaxed">
                      Contenuti, video e posizionamento orientati alla conversione, non alla visibilità fine a se stessa.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="border-t border-brand-bordo" />

            {/* 02 — Vendite & Processi Commerciali */}
            <Reveal>
              <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">
                <div className="lg:sticky lg:top-28">
                  <span className="text-brand-corallo font-bold text-sm uppercase tracking-widest">02</span>
                  <h2 className="heading-section text-brand-nero mt-2 mb-4">Vendite &amp; Processi Commerciali</h2>
                  <p className="body-lg text-brand-grigio mb-6">
                    Avere richieste non basta. Il problema è quante ne stai davvero convertendo.
                  </p>
                  <Link
                    href="/servizi/vendite-crm"
                    className="inline-flex items-center gap-2 text-brand-corallo font-bold text-sm hover:gap-3 transition-all"
                  >
                    Scopri i servizi →
                  </Link>
                </div>
                <div className="space-y-6">
                  <div className="bg-brand-bianco border border-brand-bordo rounded-2xl p-7">
                    <p className="font-semibold text-brand-nero mb-2">Quante opportunità stai perdendo dopo il primo contatto?</p>
                    <p className="text-brand-grigio leading-relaxed">
                      Implementiamo il tuo processo di vendita: dal CRM, alla prima chiamata, all&apos;appuntamento conoscitivo fino alla firma del contratto.
                    </p>
                  </div>
                  <div className="bg-brand-bianco border border-brand-bordo rounded-2xl p-7">
                    <p className="font-semibold text-brand-nero mb-2">Il tuo commerciale sa esattamente cosa dire, quando dirlo e come chiudere?</p>
                    <p className="text-brand-grigio leading-relaxed">
                      Script di vendita, materiale commerciale e supporto diretto al reparto vendite per aumentare il tasso di chiusura.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="border-t border-brand-bordo" />

            {/* 03 — Consulenza & Formazione */}
            <Reveal>
              <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">
                <div className="lg:sticky lg:top-28">
                  <span className="text-brand-corallo font-bold text-sm uppercase tracking-widest">03</span>
                  <h2 className="heading-section text-brand-nero mt-2 mb-4">Consulenza &amp; Formazione</h2>
                  <p className="body-lg text-brand-grigio mb-6">
                    Stai crescendo, o stai solo lavorando di più?
                  </p>
                  <Link
                    href="/servizi/strategia-crescita"
                    className="inline-flex items-center gap-2 text-brand-corallo font-bold text-sm hover:gap-3 transition-all"
                  >
                    Scopri i servizi →
                  </Link>
                </div>
                <div className="space-y-6">
                  <div className="bg-brand-bianco border border-brand-bordo rounded-2xl p-7">
                    <p className="font-semibold text-brand-nero mb-2">Sai quali numeri guardare per capire se stai andando nella direzione giusta?</p>
                    <p className="text-brand-grigio leading-relaxed">
                      Analisi KPI, report trimestrali e monitoraggio costante per smettere di decidere a sensazione e iniziare a decidere con i dati.
                    </p>
                  </div>
                  <div className="bg-brand-bianco border border-brand-bordo rounded-2xl p-7">
                    <p className="font-semibold text-brand-nero mb-2">Hai una direzione chiara per i prossimi mesi, o stai reagendo agli eventi?</p>
                    <p className="text-brand-grigio leading-relaxed">
                      Affiancamento strategico periodico per definire priorità, allocare budget e non disperdere energie su ciò che non porta risultati concreti.
                    </p>
                  </div>
                  <div className="bg-brand-bianco border border-brand-bordo rounded-2xl p-7">
                    <p className="font-semibold text-brand-nero mb-2">Il tuo reparto commerciale sta chiudendo al massimo delle sue possibilità?</p>
                    <p className="text-brand-grigio leading-relaxed">
                      Formiamo e seguiamo nel tempo il tuo team di vendita — non un corso e via, ma un percorso continuo per aumentare le conversioni reali.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-bianco">
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
            {[
              { n: "01", title: "Analisi & Audit Commerciale", desc: "Fotografia completa della situazione attuale: mercato, processo di vendita, canali di acquisizione e KPI chiave." },
              { n: "02", title: "Strategia & Piano d'Azione", desc: "Definiamo priorità, budget e sequenza operativa. Nessuna mossa senza un perché misurabile." },
              { n: "03", title: "Acquisizione & Lead Generation", desc: "Attiviamo i canali: campagne ads, funnel, SEO e LinkedIn per portare contatti qualificati in modo costante." },
              { n: "04", title: "Vendite & Processo Commerciale", desc: "Ottimizziamo CRM, script di vendita e pipeline per convertire più opportunità in contratti firmati." },
              { n: "05", title: "Monitoraggio & Scala", desc: "Report trimestrali, revisione KPI e affiancamento strategico per crescere con metodo, non per fortuna." },
            ].map((item, i) => (
              <Reveal key={item.n} delay={(i % 3) as 0 | 1 | 2}>
                <div className="flex items-start gap-6 bg-brand-panna border border-brand-bordo rounded-xl p-6 hover:border-brand-corallo transition-colors">
                  <div className="font-display text-5xl font-semibold text-brand-corallo shrink-0">{item.n}</div>
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

      <CTASection
        title={
          <>
            Vuoi capire <span className="text-brand-corallo">quale combinazione</span> serve alla tua azienda?
          </>
        }
        description="Compila la prequalifica: in base alle tue risposte ti diciamo da dove partire e con quale priorità."
        primary={{ label: "HAI UN MINUTO?", href: "/contatti" }}
      />
    </>
  );
}
