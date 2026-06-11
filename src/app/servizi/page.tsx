import Link from "next/link";
import type { Metadata } from "next";
import ForgeGradientBackground from "@/components/ForgeGradientBackground";
import MetodoForge from "@/components/MetodoForge";
import SectionHeader from "@/components/SectionHeader";
import ClientiLogos from "@/components/ClientiLogos";
import ServiziTabCard, { type ServiziTabPoint } from "@/components/ServiziTabCard";
import HeroGooeySection from "@/components/HeroGooeySection";
import ReelHeroVideo from "@/components/ReelHeroVideo";
import ServiziHeroScrollCue from "@/components/ServiziHeroScrollCue";
import { serviziSidebarImages, siteImages } from "@/data/images";

type ServiziTab = {
  id: string;
  number: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  points: ServiziTabPoint[];
  sidebarImage: string;
  sidebarImageAlt: string;
};

const serviziTabs: ServiziTab[] = [
  {
    id: "acquisizione",
    number: "01",
    sidebarImage: serviziSidebarImages.acquisizione,
    sidebarImageAlt: "Illustrazione acquisizione clienti",
    title: "Acquisizione Clienti",
    intro: (
      <>
        Il tuo telefono squilla.
        <br />
        Sono clienti pronti a <span>comprare</span>.
      </>
    ),
    points: [
      {
        title: (
          <>
            Smetti di rincorrere. <span>Inizia a scegliere</span>.
          </>
        ),
        body: "Costruiamo un sistema che porta ogni mese contatti qualificati, mentre tu ti concentri sul lavoro che sai fare meglio.",
      },
      {
        title: (
          <>
            Ogni euro investito in pubblicità <span>torna indietro moltiplicato</span>.
          </>
        ),
        body: "Campagne progettate per generare richieste reali da persone con budget, non click casuali.",
      },
      {
        title: (
          <>
            I tuoi contenuti diventano <span>appuntamenti in agenda</span>.
          </>
        ),
        body: "Costruiamo una comunicazione che scalda il contatto e lo consegna già convinto al tuo commerciale.",
      },
    ],
  },
  {
    id: "vendite",
    number: "02",
    sidebarImage: serviziSidebarImages.vendite,
    sidebarImageAlt: "Illustrazione processi di vendita",
    title: "Processi di Vendita",
    intro: (
      <>
        Il tuo commerciale <span>chiude</span>.
        <br />
        Sempre.
      </>
    ),
    points: [
      {
        title: (
          <>
            Al telefono arrivano solo <span>persone pronte a firmare</span>.
          </>
        ),
        body: "Prequalifichiamo ogni contatto con materiale mirato, così il tuo team non perde un minuto con chi non è pronto ad acquistare.",
      },
      {
        title: (
          <>
            Hai un reparto commerciale che <span>funziona anche senza di te</span>.
          </>
        ),
        body: "Selezioniamo o formiamo le persone giuste per costruire un team che vende in autonomia, ogni giorno.",
      },
      {
        title: (
          <>
            I tuoi commerciali <span>convertono di più</span>, ogni mese.
          </>
        ),
        body: "Costruiamo un percorso di formazione su misura che trasforma il tuo team in una macchina da chiusura.",
      },
    ],
  },
  {
    id: "consulenza",
    number: "03",
    sidebarImage: serviziSidebarImages.consulenza,
    sidebarImageAlt: "Illustrazione consulenza e formazione",
    title: (
      <>
        Consulenza <span className="whitespace-nowrap">e Formazione</span>
      </>
    ),
    intro: (
      <>
        Finalmente <span>sai</span>
        <br />
        dove stai andando.
      </>
    ),
    points: [
      {
        title: (
          <>
            Lavori meno ore e <span>l&apos;azienda cresce lo stesso</span>.
          </>
        ),
        body: "Ottimizziamo i processi interni così recuperi tempo reale da reinvestire dove conta davvero per la tua crescita.",
      },
      {
        title: (
          <>
            Hai una mappa chiara per i <span>prossimi 12 mesi</span>.
          </>
        ),
        body: "Niente più decisioni a sensazione, solo priorità, numeri e un piano concreto che puoi seguire ogni settimana.",
      },
      {
        title: (
          <>
            Prendi decisioni come un imprenditore che <span>sa cosa guardare</span>.
          </>
        ),
        body: "Ti diamo chiarezza sui dati che contano e costruiamo insieme la strategia di crescita per il tuo settore.",
      },
    ],
  },
];

function ServiziHeroCopy({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="inline-flex items-center gap-2 eyebrow mb-6 px-4 py-2 rounded-full border border-brand-bordo bg-brand-bianco/85 backdrop-blur-sm shadow-sm">
        ✦ I Nostri Servizi
      </p>
      <h1 className="heading-hero text-brand-nero mb-6">
        Scopri come aumentiamo il{" "}
        <span className="text-brand-corallo">fatturato</span> della tua azienda.
      </h1>
      <Link href="/contatti" className="btn-corallo px-8 py-4 text-sm md:text-base mt-2">
        Ottieni una consulenza gratuita
      </Link>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Servizi | Sistema di acquisizione e vendita B2B",
  description:
    "La tua azienda sta perdendo clienti ogni giorno. Costruiamo il sistema che in 90 giorni ha generato €126.500 di nuovo fatturato per un cliente B2B. Acquisizione, vendita e consulenza integrati.",
  alternates: { canonical: "/servizi" },
  openGraph: {
    title: "Servizi Forge Group | Acquisizione, vendita e consulenza B2B",
    description:
      "Sistema integrato di acquisizione clienti, processi di vendita e consulenza per imprese B2B.",
    url: "/servizi",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group Servizi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servizi Forge Group",
    description: "Acquisizione clienti, vendita e consulenza B2B integrati.",
    images: ["/logo.png"],
  },
};

export default function ServiziHub() {
  return (
    <>
      {/* HERO — layout originale, copy LP */}
      <HeroGooeySection
        id="servizi-hero"
        className="pt-16 pb-24 md:pt-24 md:pb-32"
        innerClassName="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        after={<ServiziHeroScrollCue />}
      >
        <div className="hidden lg:flex lg:items-center lg:gap-10 xl:gap-12">
          <ServiziHeroCopy className="flex flex-col items-start text-left max-w-xl lg:max-w-lg" />
          <ReelHeroVideo
            src={siteImages.gianpioReel}
            poster={siteImages.gianpioReelPoster}
            label="Video reel Gianpio Forge Group"
          />
        </div>

        <div className="lg:hidden flex flex-col gap-10">
          <ServiziHeroCopy className="flex flex-col items-center justify-center text-center" />
          <ReelHeroVideo
            src={siteImages.gianpioReel}
            poster={siteImages.gianpioReelPoster}
            label="Video reel Gianpio Forge Group"
          />
        </div>
      </HeroGooeySection>

      {/* TRE SERVIZI — layout originale, copy LP */}
      <ForgeGradientBackground
        as="section"
        id="servizi-contenuto"
        className="scroll-mt-24 py-16 md:py-24 section-coral section-coral-gradient"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            onCoral
            eyebrow="Come lavoriamo"
            title={
              <>
                Le <span>3 macroaree</span>
              </>
            }
            maxWidth="4xl"
          />

          <div className="space-y-6 md:space-y-8">
            {serviziTabs.map((tab) => (
              <ServiziTabCard key={tab.id} {...tab} />
            ))}
          </div>
        </div>
      </ForgeGradientBackground>

      <ClientiLogos />

      <MetodoForge />
    </>
  );
}
