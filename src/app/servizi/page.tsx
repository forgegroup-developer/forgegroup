import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import MetodoForge from "@/components/MetodoForge";
import Reveal from "@/components/Reveal";
import { heroShowcaseImages } from "@/data/images";

const leftShowcase = [
  { src: heroShowcaseImages.metaAds, alt: "Meta Ads" },
  { src: heroShowcaseImages.crmIntegrato, alt: "CRM Integrato" },
];
const rightShowcase = [
  { src: heroShowcaseImages.formazioneCommerciale, alt: "Formazione commerciale" },
  { src: heroShowcaseImages.consulenza, alt: "Consulenza" },
];
const allShowcase = [...leftShowcase, ...rightShowcase];

function ShowcaseTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-brand-nero border border-brand-bordo/80 shadow-sm">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 45vw, 300px"
        draggable={false}
      />
    </div>
  );
}

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
          {/* Desktop: 3 colonne simmetriche con doppio marquee verticale */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_2fr_1fr] gap-8 xl:gap-12 items-center">
            {/* Sinistra — card showcase, scorrono verso l'alto */}
            <div className="marquee-col h-[560px]">
              <div className="marquee-track-up">
                {[...leftShowcase, ...leftShowcase].map((c, idx) => (
                  <div key={`l-${idx}`} className="pb-5">
                    <ShowcaseTile src={c.src} alt={c.alt} />
                  </div>
                ))}
              </div>
            </div>

            {/* Centro — testo centrato */}
            <div className="flex flex-col items-center justify-center text-center px-2">
              <p className="inline-flex items-center gap-2 eyebrow mb-6 px-4 py-2 rounded-full border border-brand-bordo bg-brand-bianco">
                ✦ I Nostri Servizi
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

            {/* Destra — card showcase, scorrono verso il basso */}
            <div className="marquee-col h-[560px]">
              <div className="marquee-track-down">
                {[...rightShowcase, ...rightShowcase].map((c, idx) => (
                  <div key={`r-${idx}`} className="pb-5">
                    <ShowcaseTile src={c.src} alt={c.alt} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/tablet: testo in alto + griglia card showcase */}
          <div className="lg:hidden">
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <p className="inline-flex items-center gap-2 eyebrow mb-6 px-4 py-2 rounded-full border border-brand-bordo bg-brand-bianco">
                ✦ I Nostri Servizi
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
            <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-md mx-auto">
              {allShowcase.map((c, idx) => (
                <Reveal key={c.alt} delay={(idx % 3) as 0 | 1 | 2}>
                  <ShowcaseTile src={c.src} alt={c.alt} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-brand-panna border-y border-brand-bordo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20 md:space-y-28">

            {/* 01 — Acquisizione Clienti */}
            <Reveal>
              <div className="relative grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">
                <div className="hidden lg:block absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
                  <Image
                    src="/images/servizi/magnete.png"
                    alt=""
                    fill
                    className="object-contain object-left-bottom"
                    style={{ opacity: 0.15, mixBlendMode: "multiply" }}
                    sizes="600px"
                  />
                </div>
                <div className="lg:sticky lg:top-28 relative z-10">
                  <span className="text-brand-corallo font-bold text-sm uppercase tracking-widest">01</span>
                  <h2 className="heading-section text-brand-nero mt-2 mb-4">Acquisizione Clienti</h2>
                  <p className="body-lg text-brand-grigio mb-6">
                    I tuoi potenziali clienti esistono. Il problema è che non ti trovano.
                  </p>
                  <Link
                    href="/servizi/acquisizione-clienti"
                    className="inline-flex items-center gap-2 text-brand-corallo font-bold text-sm hover:gap-3 transition-all"
                  >
                    Scopri i servizi →
                  </Link>
                </div>
                <div className="space-y-6 relative z-10">
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
              <div className="relative grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">
                <div className="hidden lg:block absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
                  <Image
                    src="/images/servizi/bersaglio.png"
                    alt=""
                    fill
                    className="object-contain object-left-bottom"
                    style={{ opacity: 0.15, mixBlendMode: "multiply" }}
                    sizes="600px"
                  />
                </div>
                <div className="lg:sticky lg:top-28 relative z-10">
                  <span className="text-brand-corallo font-bold text-sm uppercase tracking-widest">02</span>
                  <h2 className="heading-section text-brand-nero mt-2 mb-4">Vendite &amp; Processi Commerciali</h2>
                  <p className="body-lg text-brand-grigio mb-6">
                    Avere richieste non basta. Il problema è quante ne stai davvero convertendo.
                  </p>
                  <Link
                    href="/servizi/vendite-processi-commerciali"
                    className="inline-flex items-center gap-2 text-brand-corallo font-bold text-sm hover:gap-3 transition-all"
                  >
                    Scopri i servizi →
                  </Link>
                </div>
                <div className="space-y-6 relative z-10">
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
              <div className="relative grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">
                <div className="hidden lg:block absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden>
                  <Image
                    src="/images/servizi/bussola.png"
                    alt=""
                    fill
                    className="object-contain object-left-bottom"
                    style={{ opacity: 0.15, mixBlendMode: "multiply" }}
                    sizes="600px"
                  />
                </div>
                <div className="lg:sticky lg:top-28 relative z-10">
                  <span className="text-brand-corallo font-bold text-sm uppercase tracking-widest">03</span>
                  <h2 className="heading-section text-brand-nero mt-2 mb-4">Consulenza &amp; Formazione</h2>
                  <p className="body-lg text-brand-grigio mb-6">
                    Stai crescendo, o stai solo lavorando di più?
                  </p>
                  <Link
                    href="/servizi/consulenza-formazione"
                    className="inline-flex items-center gap-2 text-brand-corallo font-bold text-sm hover:gap-3 transition-all"
                  >
                    Scopri i servizi →
                  </Link>
                </div>
                <div className="space-y-6 relative z-10">
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

      <MetodoForge />

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
