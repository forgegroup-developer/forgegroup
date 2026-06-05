import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import MetodoForge from "@/components/MetodoForge";
import Reveal from "@/components/Reveal";
import ClientiLogos from "@/components/ClientiLogos";
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

const painQuestions = [
  {
    question: "Ogni mese speri che arrivi qualcosa, come una referenza, un passaparola o un colpo di fortuna?",
    answer: "Non è una strategia. È sopravvivenza.",
  },
  {
    question: "Hai già provato i social o un po' di advertising, ma i risultati non sono continuativi?",
    answer: "Qualcosa è arrivato, ma non abbastanza. E soprattutto non con continuità.",
  },
  {
    question: "Il tuo commerciale, o tu stesso, passa ore a inseguire persone che non rispondono o chiedono lo sconto?",
    answer: "Stai perdendo tempo su opportunità che non si chiudono mai.",
  },
  {
    question: "Nel frattempo i tuoi competitor crescono e tu non capisci perché?",
    answer: "Perché loro hanno un sistema. Tu stai ancora improvvisando.",
  },
];

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

function CoralCta() {
  return (
    <Link
      href="/contatti"
      className="inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-white bg-transparent px-5 py-2.5 text-sm font-bold normal-case text-white shadow-sm transition-all duration-200 hover:gap-3 hover:bg-white/20"
    >
      Ottieni una consulenza gratuita
    </Link>
  );
}

export const metadata: Metadata = {
  title: "Servizi | Forge Group | Sistema di acquisizione e vendita B2B",
  description:
    "La tua azienda sta perdendo clienti ogni giorno. Costruiamo il sistema che in 90 giorni ha generato €126.500 di nuovo fatturato per un cliente B2B. Acquisizione, vendita e consulenza integrati.",
  alternates: { canonical: "/servizi" },
};

export default function ServiziHub() {
  return (
    <>
      {/* HERO — layout originale, copy LP */}
      <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 section-bianco">
        <div aria-hidden="true" className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-corallo/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-corallo/15 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:grid lg:grid-cols-[1fr_2fr_1fr] gap-8 xl:gap-12 items-center">
            <div className="marquee-col h-[560px]">
              <div className="marquee-track-up">
                {[...leftShowcase, ...leftShowcase].map((c, idx) => (
                  <div key={`l-${idx}`} className="pb-5">
                    <ShowcaseTile src={c.src} alt={c.alt} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-2">
              <p className="inline-flex items-center gap-2 eyebrow mb-6 px-4 py-2 rounded-full border border-brand-bordo bg-brand-bianco">
                ✦ I Nostri Servizi
              </p>
              <h1 className="heading-hero text-brand-nero mb-6">
                La tua azienda sta{" "}
                <span className="text-brand-corallo">perdendo clienti</span> ogni giorno. Il problema
                non è il <span className="text-brand-corallo">mercato</span>.
              </h1>
              <p className="body-lg text-brand-grigio max-w-xl mb-8">
                Il problema è che non hai un{" "}
                <span className="text-brand-corallo font-semibold">sistema</span>. Noi ne abbiamo
                costruito uno che in{" "}
                <span className="text-brand-corallo font-semibold">90 giorni</span> ha generato{" "}
                <span className="text-brand-corallo font-semibold">126.500€</span> di nuovo fatturato
                per un cliente nel settore <span className="text-brand-corallo font-semibold">B2B</span>.
                Lo stesso sistema può lavorare per te.
              </p>
              <Link href="/contatti" className="btn-corallo px-8 py-4 text-sm md:text-base">
                Ottieni una consulenza gratuita
              </Link>
              <p className="mt-4 text-sm text-brand-grigio">Solo 3 posti disponibili questo mese.</p>
            </div>

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

          <div className="lg:hidden">
            <div className="flex flex-col items-center justify-center text-center mb-12">
              <p className="inline-flex items-center gap-2 eyebrow mb-6 px-4 py-2 rounded-full border border-brand-bordo bg-brand-bianco">
                ✦ I Nostri Servizi
              </p>
              <h1 className="heading-hero text-brand-nero mb-6">
                La tua azienda sta{" "}
                <span className="text-brand-corallo">perdendo clienti</span> ogni giorno. Il problema
                non è il <span className="text-brand-corallo">mercato</span>.
              </h1>
              <p className="body-lg text-brand-grigio max-w-xl mb-8">
                Il problema è che non hai un{" "}
                <span className="text-brand-corallo font-semibold">sistema</span>. Noi ne abbiamo
                costruito uno che in{" "}
                <span className="text-brand-corallo font-semibold">90 giorni</span> ha generato{" "}
                <span className="text-brand-corallo font-semibold">126.500€</span> di nuovo fatturato
                per un cliente nel settore <span className="text-brand-corallo font-semibold">B2B</span>.
                Lo stesso sistema può lavorare per te.
              </p>
              <Link href="/contatti" className="btn-corallo px-8 py-4 text-sm md:text-base">
                Ottieni una consulenza gratuita
              </Link>
              <p className="mt-4 text-sm text-brand-grigio">Solo 3 posti disponibili questo mese.</p>
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

      {/* AGITAZIONE DEL DOLORE */}
      <section className="py-16 md:py-24 section-bianco">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="heading-section font-semibold text-brand-nero leading-tight mb-12">
              Fermati un secondo. Riconosci questa{" "}
              <span className="text-brand-corallo">situazione</span>?
            </h2>
          </Reveal>
          <div className="space-y-5">
            {painQuestions.map((item, idx) => (
              <Reveal key={idx} delay={(idx % 3) as 0 | 1 | 2}>
                <div className="rounded-2xl border border-brand-bordo bg-brand-panna p-6 md:p-8">
                  <p className="text-lg md:text-xl font-semibold text-brand-nero leading-snug mb-3">
                    {item.question}
                  </p>
                  <p className="text-base md:text-lg text-brand-grigio leading-relaxed pl-4 border-l-4 border-brand-corallo">
                    {item.answer}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12 rounded-2xl border-l-4 border-brand-corallo bg-brand-pesca-light px-6 py-6 md:px-9 md:py-8">
              <p className="text-xl md:text-2xl font-semibold text-brand-nero leading-relaxed">
                Non è colpa tua. Nessuno ti ha mai costruito un{" "}
                <span className="text-brand-corallo">sistema vero</span>. Noi lo facciamo.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRE SERVIZI — layout originale, copy LP */}
      <section className="py-16 md:py-24 section-coral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 copy-on-coral">
            <h2 className="heading-section font-semibold leading-tight mb-4">
              Un <span>sistema</span> unico. Tre <span>ingranaggi</span> che lavorano insieme.
            </h2>
            <p className="body-lg text-white/90">
              Ogni pezzo serve. Nessuno funziona da solo. Insieme portano risultati che si misurano in{" "}
              <span className="text-brand-pesca-light font-semibold">euro</span>, non in like.
            </p>
          </div>

          <div className="space-y-20 md:space-y-28">
            {/* 01 — Acquisizione Clienti */}
            <Reveal>
              <div id="acquisizione" className="relative grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">
                <div className="lg:sticky lg:top-28 relative z-10">
                  <span className="text-white/70 font-bold text-sm uppercase tracking-widest">01</span>
                  <h2 className="heading-section text-white mt-2 mb-4">Acquisizione Clienti</h2>
                  <p className="body-lg text-white mb-6">
                    Se i clienti giusti non ti trovano, stai lasciando soldi sul tavolo ogni giorno.
                  </p>
                  <CoralCta />
                </div>
                <div className="space-y-6 relative z-10">
                  <div className="bg-white/15 border border-white/25 rounded-2xl p-7 backdrop-blur-sm">
                    <p className="font-semibold text-white mb-2">
                      Ogni euro in advertising deve portare contatti già qualificati.
                    </p>
                    <p className="text-white/75 leading-relaxed">
                      Campagne Meta e Google ottimizzate alla conversione. Persone con un problema reale,
                      che cercano una soluzione e sono disposte a pagare per averla.
                    </p>
                  </div>
                  <div className="bg-white/15 border border-white/25 rounded-2xl p-7 backdrop-blur-sm">
                    <p className="font-semibold text-white mb-2">
                      Funnel e lead generation profilati sul tuo cliente ideale.
                    </p>
                    <p className="text-white/75 leading-relaxed">
                      Non visibilità generica. Non follower. Richieste reali da persone reali, filtrate
                      prima ancora che parlino col tuo commerciale.
                    </p>
                  </div>
                  <div className="bg-white/15 border border-white/25 rounded-2xl p-7 backdrop-blur-sm">
                    <p className="font-semibold text-white mb-2">
                      I tuoi contenuti vendono, o fanno solo brand?
                    </p>
                    <p className="text-white/75 leading-relaxed">
                      Social media e contenuti orientati alla conversione, non alla visibilità fine a
                      se stessa.
                    </p>
                  </div>
                  <div className="bg-white/15 border border-white/25 rounded-2xl p-7 backdrop-blur-sm">
                    <p className="font-semibold text-white mb-2">
                      Quando un cliente cerca il tuo prodotto online, esci tu o il competitor?
                    </p>
                    <p className="text-white/75 leading-relaxed">
                      Sito, SEO e LinkedIn costruiti per farti trovare da chi vuole già comprare.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="border-t border-white/20" />

            {/* 02 — Processi di Vendita */}
            <Reveal>
              <div id="vendite" className="relative grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">
                <div className="lg:sticky lg:top-28 relative z-10">
                  <span className="text-white/70 font-bold text-sm uppercase tracking-widest">02</span>
                  <h2 className="heading-section text-white mt-2 mb-4">Processi di Vendita</h2>
                  <p className="body-lg text-white mb-6">
                    Avere richieste non basta. Il problema è quante ne stai perdendo dopo il primo contatto.
                  </p>
                  <CoralCta />
                </div>
                <div className="space-y-6 relative z-10">
                  <div className="bg-white/15 border border-white/25 rounded-2xl p-7 backdrop-blur-sm">
                    <p className="font-semibold text-white mb-2">
                      Quante opportunità stai perdendo per mancanza di processo?
                    </p>
                    <p className="text-white/75 leading-relaxed">
                      La maggior parte delle aziende perde il 60% delle opportunità non per il prodotto,
                      ma per assenza di follow-up, script e CRM. Solo improvvisazione.
                    </p>
                  </div>
                  <div className="bg-white/15 border border-white/25 rounded-2xl p-7 backdrop-blur-sm">
                    <p className="font-semibold text-white mb-2">
                      Il tuo commerciale sa esattamente cosa dire e come chiudere?
                    </p>
                    <p className="text-white/75 leading-relaxed">
                      Audit commerciale, script di vendita, gestione obiezioni e CRM personalizzato per
                      chiudere più contratti con le stesse richieste che già ricevi.
                    </p>
                  </div>
                  <div className="bg-white/15 border border-white/25 rounded-2xl p-7 backdrop-blur-sm">
                    <p className="font-semibold text-white mb-2">
                      Ogni lead riceve un follow-up strutturato fino alla firma?
                    </p>
                    <p className="text-white/75 leading-relaxed">
                      Follow-up strutturato, affiancamento e formazione al reparto commerciale: non un
                      corso e via, ma un processo che resta.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="border-t border-white/20" />

            {/* 03 — Consulenza & Formazione */}
            <Reveal>
              <div id="consulenza" className="relative grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20 items-start">
                <div className="lg:sticky lg:top-28 relative z-10">
                  <span className="text-white/70 font-bold text-sm uppercase tracking-widest">03</span>
                  <h2 className="heading-section text-white mt-2 mb-4">Consulenza &amp; Formazione</h2>
                  <p className="body-lg text-white mb-6">
                    Lavorare di più non è una strategia. È esaurimento con un altro nome.
                  </p>
                  <CoralCta />
                </div>
                <div className="space-y-6 relative z-10">
                  <div className="bg-white/15 border border-white/25 rounded-2xl p-7 backdrop-blur-sm">
                    <p className="font-semibold text-white mb-2">
                      Stai crescendo, o stai solo lavorando di più?
                    </p>
                    <p className="text-white/75 leading-relaxed">
                      Se cresci senza sapere perché, o lavori tanto senza crescere, hai bisogno di
                      metodo, non di motivazione. Strategia di marketing e acquisizione su misura.
                    </p>
                  </div>
                  <div className="bg-white/15 border border-white/25 rounded-2xl p-7 backdrop-blur-sm">
                    <p className="font-semibold text-white mb-2">
                      Sai quali numeri guardare per capire se stai andando nella direzione giusta?
                    </p>
                    <p className="text-white/75 leading-relaxed">
                      Report e analisi dati mensili, pianificazione della crescita aziendale. Smetti di
                      decidere a sensazione, inizia a decidere con i dati.
                    </p>
                  </div>
                  <div className="bg-white/15 border border-white/25 rounded-2xl p-7 backdrop-blur-sm">
                    <p className="font-semibold text-white mb-2">
                      Il tuo team ha una direzione chiara per i prossimi mesi?
                    </p>
                    <p className="text-white/75 leading-relaxed">
                      Formazione continua su vendita, marketing e gestione. Restiamo al tuo fianco mentre
                      percorri la direzione che costruiamo insieme.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ClientiLogos />

      <MetodoForge />
    </>
  );
}
