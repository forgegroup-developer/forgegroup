import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import MetodoForge from "@/components/MetodoForge";
import Reveal from "@/components/Reveal";
import ClientiLogos from "@/components/ClientiLogos";
import ServiziTabCard, { type ServiziTabPoint } from "@/components/ServiziTabCard";
import { heroShowcaseImages } from "@/data/images";

type ServiziTab = {
  id: string;
  number: string;
  title: string;
  intro: string;
  points: ServiziTabPoint[];
};

const serviziTabs: ServiziTab[] = [
  {
    id: "acquisizione",
    number: "01",
    title: "Acquisizione Clienti",
    intro: "Se i clienti giusti non ti trovano, stai lasciando soldi sul tavolo ogni giorno.",
    points: [
      {
        title: "Ogni euro in advertising deve portare contatti già qualificati.",
        body: "Campagne Meta e Google ottimizzate alla conversione. Persone con un problema reale, che cercano una soluzione e sono disposte a pagare per averla.",
      },
      {
        title: "Funnel e lead generation profilati sul tuo cliente ideale.",
        body: "Non visibilità generica. Non follower. Richieste reali da persone reali, filtrate prima ancora che parlino col tuo commerciale.",
      },
      {
        title: "I tuoi contenuti vendono, o fanno solo brand?",
        body: "Social media e contenuti orientati alla conversione, non alla visibilità fine a se stessa.",
      },
    ],
  },
  {
    id: "vendite",
    number: "02",
    title: "Processi di Vendita",
    intro: "Avere richieste non basta. Il problema è quante ne stai perdendo dopo il primo contatto.",
    points: [
      {
        title: "Quante opportunità stai perdendo per mancanza di processo?",
        body: "La maggior parte delle aziende perde il 60% delle opportunità non per il prodotto, ma per assenza di follow-up, script e CRM. Solo improvvisazione.",
      },
      {
        title: "Il tuo commerciale sa esattamente cosa dire e come chiudere?",
        body: "Audit commerciale, script di vendita, gestione obiezioni e CRM personalizzato per chiudere più contratti con le stesse richieste che già ricevi.",
      },
      {
        title: "Ogni lead riceve un follow-up strutturato fino alla firma?",
        body: "Follow-up strutturato, affiancamento e formazione al reparto commerciale: non un corso e via, ma un processo che resta.",
      },
    ],
  },
  {
    id: "consulenza",
    number: "03",
    title: "Consulenza & Formazione",
    intro: "Lavorare di più non è una strategia. È esaurimento con un altro nome.",
    points: [
      {
        title: "Stai crescendo, o stai solo lavorando di più?",
        body: "Se cresci senza sapere perché, o lavori tanto senza crescere, hai bisogno di metodo, non di motivazione. Strategia di marketing e acquisizione su misura.",
      },
      {
        title: "Sai quali numeri guardare per capire se stai andando nella direzione giusta?",
        body: "Report e analisi dati mensili, pianificazione della crescita aziendale. Smetti di decidere a sensazione, inizia a decidere con i dati.",
      },
      {
        title: "Il tuo team ha una direzione chiara per i prossimi mesi?",
        body: "Formazione continua su vendita, marketing e gestione. Restiamo al tuo fianco mentre percorri la direzione che costruiamo insieme.",
      },
    ],
  },
];

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
                <span className="text-brand-corallo">perdendo clienti</span> ogni giorno e il problema
                non è il <span className="text-brand-corallo">mercato</span>.
              </h1>
              <Link href="/contatti" className="btn-corallo px-8 py-4 text-sm md:text-base mt-2">
                Ottieni una consulenza gratuita
              </Link>
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
                <span className="text-brand-corallo">perdendo clienti</span> ogni giorno e il problema
                non è il <span className="text-brand-corallo">mercato</span>.
              </h1>
              <Link href="/contatti" className="btn-corallo px-8 py-4 text-sm md:text-base mt-2">
                Ottieni una consulenza gratuita
              </Link>
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

      {/* TRE SERVIZI — layout originale, copy LP */}
      <section className="py-16 md:py-24 section-coral">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 copy-on-coral">
            <h2 className="heading-section font-semibold leading-tight">
              Un <span>sistema</span> unico. Tre <span>ingranaggi</span> che lavorano insieme.
            </h2>
          </div>

          <div className="space-y-8 md:space-y-10">
            {serviziTabs.map((tab) => (
              <ServiziTabCard key={tab.id} {...tab} />
            ))}
          </div>
        </div>
      </section>

      <ClientiLogos />

      <MetodoForge />
    </>
  );
}
