"use client";

import { useEffect, useState } from "react";

type ServiziHeroScrollCueProps = {
  heroId?: string;
  targetId?: string;
};

export default function ServiziHeroScrollCue({
  heroId = "servizi-hero",
  targetId = "servizi-contenuto",
}: ServiziHeroScrollCueProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  const scrollDown = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const hero = document.getElementById(heroId);
    if (hero) {
      window.scrollTo({
        top: hero.offsetTop + hero.offsetHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollDown}
      aria-label="Scorri verso il basso"
      className={`absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-brand-grigio transition-all duration-500 hover:text-brand-corallo focus-visible:text-brand-corallo ${
        visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scorri</span>
      <span className="servizi-hero-scroll-cue-icon flex h-11 w-11 items-center justify-center rounded-full border border-brand-bordo bg-brand-bianco/90 shadow-sm backdrop-blur-sm">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </button>
  );
}
