import Link from "next/link";
import type { Metadata } from "next";
import HeroGooeySection from "@/components/sfondi/HeroGooeySection";
import CasiStudioCarousel from "@/components/casi-studio/CasiStudioCarousel";
import ServiziHeroScrollCue from "@/components/ui/ServiziHeroScrollCue";
import RelatedBlogLinks from "@/components/blog/RelatedBlogLinks";

export const metadata: Metadata = {
  title: "Casi Studio | Risultati verificati B2B",
  description:
    "Tre imprese, tre mestieri: coperture, arredamento negozi, software per l'edilizia. Da dove siamo partiti, cosa abbiamo fatto e quanto è entrato, con i numeri veri.",
  alternates: { canonical: "/casi-studio" },
  openGraph: {
    title: "Casi Studio | Forge Group",
    description:
      "Coperture, arredamento negozi, software per l'edilizia: tre casi con i numeri veri e il nome sotto.",
    url: "/casi-studio",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group Casi Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casi Studio | Forge Group",
    description: "Tre imprese, tre mestieri, numeri veri.",
    images: ["/logo.png"],
  },
};

function CasiStudioHeroCopy({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <p className="inline-flex items-center gap-2 eyebrow mb-6 px-4 py-2 rounded-full border border-brand-bordo bg-brand-bianco">
        ✦ Casi Studio
      </p>
      <h1 className="heading-hero text-brand-nero mb-6 text-balance">
        Cerca l&apos;impresa che fa il tuo mestiere.{" "}
        <span className="text-brand-corallo">I numeri sono veri, con il nome sotto.</span>
      </h1>
      <p className="body-lg mb-8 text-pretty">
        Coperture, arredamento negozi, software per l&apos;edilizia. Per ognuna
        trovi da dove siamo partiti, cosa abbiamo fatto e quanto è entrato.
      </p>
      <Link href="/contatti" className="btn-corallo px-8 py-4 text-sm md:text-base">
        Richiedi lo studio di fattibilità
      </Link>
    </div>
  );
}

export default function CasiStudioHub() {
  return (
    <>
      <HeroGooeySection
        pulita
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
