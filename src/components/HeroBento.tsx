"use client";

import { useState } from "react";
import Image from "next/image";
import { heroShowcaseImages } from "@/data/images";

type ShowcaseCard = {
  id: string;
  imageSrc: string;
  alt: string;
  aspect: "3/4" | "4/5";
  priority?: boolean;
};

/** Sinistra — 2 grafiche esclusive (nessuna compare a destra) */
const LEFT_CARDS: ShowcaseCard[] = [
  { id: "l1", imageSrc: heroShowcaseImages.metaAds, alt: "Meta Ads", aspect: "3/4", priority: true },
  { id: "l2", imageSrc: heroShowcaseImages.crmIntegrato, alt: "CRM Integrato", aspect: "3/4", priority: true },
];

/** Destra — altre 2 grafiche, set disgiunto dalla sinistra */
const RIGHT_CARDS: ShowcaseCard[] = [
  { id: "r1", imageSrc: heroShowcaseImages.formazioneCommerciale, alt: "Formazione commerciale", aspect: "3/4", priority: true },
  { id: "r2", imageSrc: heroShowcaseImages.consulenza, alt: "Consulenza", aspect: "3/4" },
];

const aspectClass = {
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
} as const;

function ShowcaseTile({ card }: { card: ShowcaseCard }) {
  return (
    <div
      className={`relative w-full shrink-0 rounded-2xl overflow-hidden bg-brand-nero border border-brand-bordo/80 ${aspectClass[card.aspect]}`}
    >
      <Image
        src={card.imageSrc}
        alt={card.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 45vw, (max-width: 1280px) 24vw, 300px"
        draggable={false}
        priority={card.priority}
      />
    </div>
  );
}

function MarqueeColumn({
  cards,
  direction,
  offsetClass,
}: {
  cards: ShowcaseCard[];
  direction: "up" | "down";
  offsetClass?: string;
}) {
  const trackClass =
    direction === "up" ? "hero-dual-marquee-track-up" : "hero-dual-marquee-track-down";

  return (
    <div className={`h-full overflow-hidden ${offsetClass ?? ""}`}>
      <div className={`${trackClass} flex flex-col gap-4 will-change-transform`}>
        {cards.map((c) => (
          <ShowcaseTile key={`a-${c.id}`} card={c} />
        ))}
        {cards.map((c) => (
          <ShowcaseTile key={`b-${c.id}`} card={c} />
        ))}
      </div>
    </div>
  );
}

export default function HeroBento() {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`hero-dual-marquee w-full h-[300px] sm:h-[400px] md:h-[440px] lg:h-[520px]${paused ? " is-paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      <div className="grid grid-cols-2 gap-4 sm:gap-6 h-full">
        <MarqueeColumn cards={LEFT_CARDS} direction="up" />
        <MarqueeColumn cards={RIGHT_CARDS} direction="down" offsetClass="-mt-10 sm:-mt-14" />
      </div>
    </div>
  );
}
