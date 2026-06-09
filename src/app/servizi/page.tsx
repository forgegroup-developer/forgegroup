import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import MetodoForge from "@/components/MetodoForge";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
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
    intro: "La tua azienda dipende ancora solo dal passaparola?",
    points: [
      {
        title: "Hai solo contatti poco interessati che cliccano per sbaglio sulle tue inserzioni?",
        body: "Pensiamo noi a migliorare la tua comunicazione e a creare campagne di lead generation altamente performanti.",
      },
      {
        title: "Stai pagando pubblicità senza sapere quante richieste serie ti porta?",
        body: "Creiamo sistemi per acquisire nuovi clienti — non click, non curiosi.",
      },
      {
        title: "I tuoi contenuti portano visibilità, ma non appuntamenti in agenda?",
        body: "Costruiamo comunicazione che genera contatti pronti a parlare col tuo commerciale.",
      },
    ],
  },
  {
    id: "vendite",
    number: "02",
    title: "Processi di Vendita",
    intro: "Ricevi richieste, ma quante diventano davvero contratti?",
    points: [
      {
        title: "Il tuo commerciale perde tempo con persone che non hanno budget o non sono in target?",
        body: "Prequalifichiamo i contatti con materiale commerciale mirato, così al telefono arrivano solo persone allineate.",
      },
      {
        title: "Fai fatica a trovare commerciali?",
        body: "Li troviamo noi per te.",
      },
      {
        title: "O quelli che hai non performano?",
        body: "Li formiamo noi per te.",
      },
    ],
  },
  {
    id: "consulenza",
    number: "03",
    title: "Consulenza & Formazione",
    intro: "Stai crescendo — o stai solo lavorando di più?",
    points: [
      {
        title: "Stai facendo tutto da solo, sei stanco e non hai tempo per il troppo lavoro?",
        body: "Lavoriamo sui processi per liberare ore lavorative che puoi investire in altro.",
      },
      {
        title: "Hai bisogno di indicazioni su che strada deve prendere il tuo modello di business?",
        body: "Te la diamo noi.",
      },
      {
        title: "Decidi a sensazione perché non sai quali numeri guardare?",
        body: "Ti diamo chiarezza su dati, priorità e piano di crescita.",
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
          <SectionHeader
            onCoral
            eyebrow="Come lavoriamo"
            title={
              <>
                Riconosci qualcuno di questi <span>problemi</span>?
              </>
            }
            subtitle="Ogni domanda nasconde un'opportunità di crescita. Noi costruiamo il sistema che la trasforma in fatturato."
            maxWidth="4xl"
            subtitleMaxWidth="3xl"
          />

          <div className="space-y-6 md:space-y-8">
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
