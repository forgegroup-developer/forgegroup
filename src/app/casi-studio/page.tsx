import Link from "next/link";
import type { Metadata } from "next";
import HeroGooeySection from "@/components/HeroGooeySection";
import LazyCaseStudyStack from "@/components/LazyCaseStudyStack";
import ReelHeroVideo from "@/components/ReelHeroVideo";
import SectionHeader from "@/components/SectionHeader";
import ServiziHeroScrollCue from "@/components/ServiziHeroScrollCue";
import { siteImages } from "@/data/images";

export const metadata: Metadata = {
  title: "Casi Studio | Risultati verificati B2B",
  description:
    "Casi studio Forge Group: risultati misurabili in acquisizione clienti, vendita e crescita per imprese B2B. Scopri come abbiamo generato nuovo fatturato per i nostri clienti.",
  alternates: { canonical: "/casi-studio" },
  openGraph: {
    title: "Casi Studio | Forge Group",
    description:
      "Risultati verificati in acquisizione clienti e crescita B2B. Vuoi capire se un approccio simibile ha senso anche per la tua azienda?",
    url: "/casi-studio",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group Casi Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casi Studio | Forge Group",
    description: "Risultati verificati per imprese B2B in Campania e in Italia.",
    images: ["/logo.png"],
  },
};

function CasiStudioHeroCopy({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="inline-flex items-center gap-2 eyebrow mb-6 px-4 py-2 rounded-full border border-brand-bordo bg-brand-bianco">
        ✦ Casi Studio
      </p>
      <h1 className="heading-hero text-brand-nero mb-6">
        Risultati{" "}
        <span className="text-brand-corallo">verificati</span> in casi reali.{" "}
        <span className="text-brand-corallo">Vuoi capire se un approccio simibile ha senso anche per la tua azienda?</span>
      </h1>
      <Link href="/contatti" className="btn-corallo px-8 py-4 text-sm md:text-base">
        Ottieni una consulenza gratuita
      </Link>
    </div>
  );
}

export default function CasiStudioHub() {
  return (
    <>
      <HeroGooeySection
        id="casi-studio-hero"
        className="pt-16 pb-24 md:pt-24 md:pb-32"
        innerClassName="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        after={
          <ServiziHeroScrollCue heroId="casi-studio-hero" targetId="casi-studio-contenuto" />
        }
      >
        <div className="hidden lg:flex lg:items-center lg:gap-10 xl:gap-12">
          <CasiStudioHeroCopy className="flex flex-col items-start text-left max-w-xl lg:max-w-lg" />
          <ReelHeroVideo
            src={siteImages.marcoReel}
            poster={siteImages.marcoReelPoster}
            label="Video reel Marco Forge Group"
          />
        </div>

        <div className="lg:hidden flex flex-col gap-10">
          <CasiStudioHeroCopy className="flex flex-col items-center justify-center text-center" />
          <ReelHeroVideo
            src={siteImages.marcoReel}
            poster={siteImages.marcoReelPoster}
            label="Video reel Marco Forge Group"
          />
        </div>
      </HeroGooeySection>

      <section id="casi-studio-contenuto" className="scroll-mt-24 py-20 md:py-28 section-bianco">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Portfolio"
            maxWidth="4xl"
            title={
              <>
                Storie di crescita{" "}
                <span className="text-brand-corallo">concrete</span> per imprese B2B
              </>
            }
          />
        </div>
        <LazyCaseStudyStack />
      </section>
    </>
  );
}
