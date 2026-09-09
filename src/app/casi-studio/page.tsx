import Link from "next/link";
import type { Metadata } from "next";
import HeroGooeySection from "@/components/sfondi/HeroGooeySection";
import CasiStudioCarousel from "@/components/casi-studio/CasiStudioCarousel";
import ServiziHeroScrollCue from "@/components/ui/ServiziHeroScrollCue";
import RelatedBlogLinks from "@/components/blog/RelatedBlogLinks";

export const metadata: Metadata = {
  title: "Casi Studio | Risultati verificati B2B",
  description:
    "Casi studio Forge Group: risultati misurabili in acquisizione clienti, vendita e crescita per imprese B2B. Scopri come abbiamo generato nuovo fatturato per i nostri clienti.",
  alternates: { canonical: "/casi-studio" },
  openGraph: {
    title: "Casi Studio | Forge Group",
    description:
      "Risultati verificati in acquisizione clienti e crescita B2B. Vuoi capire se un approccio simile ha senso anche per la tua azienda?",
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
        <span className="text-brand-corallo">Vuoi capire se un approccio simile ha senso anche per la tua azienda?</span>
      </h1>
      <Link href="/contatti" className="btn-corallo px-8 py-4 text-sm md:text-base">
        Prenota una consulenza
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
        <CasiStudioHeroCopy className="mx-auto flex max-w-2xl flex-col items-center text-center" />
      </HeroGooeySection>

      <section id="casi-studio-contenuto" className="scroll-mt-24 py-20 md:py-28 section-bianco">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        </div>
        <CasiStudioCarousel />
      </section>

      <RelatedBlogLinks
        slugs={[
          "agenzia-marketing-b2b-napoli",
          "agenzia-marketing-b2b-campania-checklist",
          "sistema-vendita-b2b-dalla-lead-al-contratto",
        ]}
      />
    </>
  );
}
