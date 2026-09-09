import Link from "next/link";
import type { Metadata } from "next";
import ForgeGradientBackground from "@/components/sfondi/ForgeGradientBackground";
import MetodoForge from "@/components/sezioni/MetodoForge";
import SectionHeader from "@/components/ui/SectionHeader";
import ClientiLogos from "@/components/sezioni/ClientiLogos";
import ServiziTabCard, { type ServiziTabPoint } from "@/components/sezioni/ServiziTabCard";
import HeroGooeySection from "@/components/sfondi/HeroGooeySection";
import ServiziHeroScrollCue from "@/components/ui/ServiziHeroScrollCue";
import RelatedBlogLinks from "@/components/blog/RelatedBlogLinks";
import { serviziSidebarImages } from "@/data/images";

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
        I tuoi potenziali clienti <span>ci sono</span>.
        <br />
        Li stai intercettando?
      </>
    ),
    points: [
      {
        title: (
          <>
            Vuoi <span>scegliere i contatti</span> invece di rincorrerli?
          </>
        ),
        body: "Costruiamo con te un sistema che porta ogni mese contatti qualificati, mentre ti concentri sul lavoro che sai fare meglio.",
      },
      {
        title: (
          <>
            Progettiamo campagne per generare richieste che il commerciale{" "}
            <span>può convertire</span>.
          </>
        ),
        body: "Con costi per contatto misurabili, non click casuali.",
      },
      {
        title: (
          <>
            Comunicazione che <span>scalda il contatto</span> e prepara il commerciale.
          </>
        ),
        body: "Costruiamo contenuti che fanno capire il valore dei tuoi prodotti e servizi prima ancora del primo appuntamento.",
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
        Il tuo commerciale chiude quando arrivano <span>contatti giusti</span>?
      </>
    ),
    points: [
      {
        title: (
          <>
            Quando i contatti sono qualificati, il commerciale{" "}
            <span>lavora meglio</span>.
          </>
        ),
        body: "Prequalifichiamo ogni richiesta così il team non perde tempo su chi non è pronto ad acquistare.",
      },
      {
        title: (
          <>
            Un team che vende con <span>processo chiaro</span>, anche quando non sei in sala.
          </>
        ),
        body: "Selezioniamo o formiamo con te le persone giuste per costruire un reparto che lavora con metodo, ogni giorno.",
      },
      {
        title: (
          <>
            I tuoi commerciali <span>convertono di più</span>, mese dopo mese.
          </>
        ),
        body: "Costruiamo un percorso di formazione su misura per far crescere le chiusure del team, con costanza nel tempo.",
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
        Mettiamo nero su bianco dove vuoi <span>arrivare</span>
        <br />
        nei prossimi 12 mesi.
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
            Decisioni basate sui <span>dati che contano</span> per il tuo settore.
          </>
        ),
        body: "Ti diamo chiarezza sui numeri utili e costruiamo insieme la strategia di crescita per la tua azienda.",
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
        Prenota una consulenza
      </Link>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Servizi | Il Metodo FORGE, dal contatto alla firma",
  description:
    "Cosa facciamo per un'impresa edile: ti portiamo richieste da chi il lavoro può pagarlo, filtriamo chi non comprerà mai e restiamo in trattativa con te fino alla firma. Caso DISA: 126.500 € di nuovo fatturato in 90 giorni.",
  alternates: { canonical: "/servizi" },
  openGraph: {
    title: "Servizi Forge Group | Il Metodo FORGE per le imprese edili",
    description:
      "Richieste qualificate, trattativa seguita fino alla firma e il CRM gestionale dove vedi a che punto sta ognuna.",
    url: "/servizi",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group Servizi" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servizi Forge Group",
    description: "Dal contatto alla firma: il Metodo FORGE per le imprese edili.",
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
        <ServiziHeroCopy className="mx-auto flex max-w-2xl flex-col items-center text-center" />
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

      <RelatedBlogLinks
        slugs={[
          "come-acquisire-clienti-b2b-campania",
          "sistema-vendita-b2b-dalla-lead-al-contratto",
          "quanto-costa-lead-generation-b2b",
        ]}
      />
    </>
  );
}
