"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import VisionBeliefCards from "@/components/VisionBeliefCards";
import VisionJoinSection from "@/components/VisionJoinSection";

export default function VisionSection() {
  return (
    <>
      {/* Hero atmosferica */}
      <section className="vision-hero-atmosphere relative flex min-h-[88dvh] items-center justify-center overflow-hidden border-b md:min-h-screen">
        <div className="pointer-events-none absolute inset-0 z-0 select-none" aria-hidden>
          <Image
            src="/images/team/vision/hero-atmosphere.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-pesca-light/25 via-transparent to-[#faece7]/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faece7]/80 via-transparent to-brand-pesca-light/20" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--color-brand-corallo) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-28 text-center sm:px-6 md:py-36">
          <Reveal y={32} duration={1.1}>
            <p className="eyebrow mb-6">✦ Visione</p>
            <h1 className="heading-hero heading-hero-home text-brand-nero mb-8 text-balance">
              <span className="text-brand-corallo">Forge Group</span> nasce da una domanda semplice.
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-bold leading-relaxed text-brand-nero md:text-2xl text-balance">
              Perché tante aziende che hanno tutto per crescere, non crescono?
            </p>
          </Reveal>
        </div>
      </section>

      {/* Manifesto narrato nelle card inclinate */}
      <VisionBeliefCards />

      {/* Entra a far parte — al posto del footer CTA su questa pagina */}
      <VisionJoinSection />
    </>
  );
}
