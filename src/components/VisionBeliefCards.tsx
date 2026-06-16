"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { loadGsapScrollTrigger } from "@/lib/loadGsap";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-vision-belief-title",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-vision-belief-body",
  display: "swap",
});

const beliefCards: {
  number: string;
  photo: string;
  alt: string;
  title: string;
  subtitle: string;
  variant: "coral" | "dark";
  rotateClass: string;
  wrapClass: string;
  icon: LucideIcon;
  iconClassName?: string;
}[] = [
  {
    number: "01",
    photo: "/images/team/vision/team-insieme.jpg",
    alt: "Il team Forge Group al lavoro",
    title: "Entriamo, restiamo, costruiamo.",
    subtitle:
      "Non consegniamo campagne e spariamo. Lavoriamo fianco a fianco finché non gira da solo.",
    variant: "coral",
    rotateClass: "-rotate-[2deg] md:-rotate-[4deg] md:hover:rotate-0",
    wrapClass: "",
    icon: Star,
  },
  {
    number: "02",
    photo: "/images/team/vision/team-lavoro.jpg",
    alt: "Il team Forge Group al lavoro",
    title: "Un'azienda sana costruisce persone sane.",
    subtitle:
      "Quello che ci interessa non è solo il numero a fine mese. È quello che succede dentro quando le cose iniziano ad andare bene.",
    variant: "dark",
    rotateClass: "rotate-[2deg] md:rotate-[4deg] md:hover:rotate-0",
    wrapClass: "max-md:ml-0 md:mt-10 md:-ml-6 lg:-ml-8",
    icon: ArrowUpRight,
    iconClassName: "-rotate-45",
  },
  {
    number: "03",
    photo: "/images/team/vision/marco-editorial.png",
    alt: "Marco Pio Cerbone al lavoro con Forge Group",
    title: "Entriamo dentro, capiamo davvero.",
    subtitle:
      "Manca qualcuno che capisce come funziona quell'azienda e costruisce con loro qualcosa che regge nel tempo.",
    variant: "coral",
    rotateClass: "-rotate-[2deg] md:-rotate-[4deg] md:hover:rotate-0",
    wrapClass: "md:mt-4",
    icon: Star,
  },
  {
    number: "04",
    photo: "/images/team/vision/francesco-editorial.png",
    alt: "Francesco Chiumiento al lavoro con Forge Group",
    title: "Non cerchiamo clienti da gestire.",
    subtitle:
      "Cerchiamo imprenditori con cui costruire. Lealtà, trasparenza e una bussola che non cambia.",
    variant: "dark",
    rotateClass: "rotate-[2deg] md:rotate-[4deg] md:hover:rotate-0",
    wrapClass: "max-md:ml-0 md:mt-14 md:-ml-6 lg:-ml-8",
    icon: ArrowUpRight,
    iconClassName: "-rotate-45",
  },
];

function BeliefCard({
  number,
  photo,
  alt,
  title,
  subtitle,
  variant,
  rotateClass,
  icon: Icon,
  iconClassName = "",
}: (typeof beliefCards)[number]) {
  const isCoral = variant === "coral";

  return (
    <article
      className={`vision-belief-card group w-full max-w-[380px] transition-transform duration-500 ease-out hover:-translate-y-2 md:w-[420px] md:max-w-[420px] ${rotateClass}`}
    >
      <div
        className={`flex aspect-[3/4] w-full flex-col rounded-[24px] p-7 ${
          isCoral ? "bg-[#C0471A]" : "bg-[#2A2A2A]"
        }`}
      >
        <div className="mb-5 flex items-start justify-between">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              isCoral ? "bg-[#1A1A1A]/15" : "bg-white/10"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${isCoral ? "text-[#1A1A1A]" : "text-white"} ${iconClassName}`}
              strokeWidth={1.75}
              aria-hidden
            />
          </div>
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${
              isCoral
                ? "bg-[#1A1A1A]/15 text-[#1A1A1A]"
                : "bg-white/10 text-white"
            }`}
          >
            {number}
          </span>
        </div>

        <div className="relative mb-5 h-[200px] w-full overflow-hidden rounded-2xl">
          <Image
            src={photo}
            alt={alt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 420px"
            quality={90}
          />
        </div>

        <div className="mt-auto">
          <h3
            className={`mb-3 text-balance leading-tight ${
              isCoral ? "text-[#1A1A1A]" : "text-white"
            }`}
            style={{
              fontFamily: "var(--font-vision-belief-title)",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 700,
            }}
          >
            {title}
          </h3>
          <p
            className={isCoral ? "text-[#1A1A1A]/85" : "text-white/70"}
            style={{
              fontFamily: "var(--font-vision-belief-body)",
              fontSize: "1rem",
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function VisionBeliefCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsWrap = cardsWrapRef.current;
    if (!section || !cardsWrap) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wraps = cardsWrap.querySelectorAll<HTMLElement>(".vision-belief-card-wrap");

    if (prefersReduced) return;

    let ctxCleanup: (() => void) | undefined;

    void loadGsapScrollTrigger().then(({ gsap, ScrollTrigger }) => {
      gsap.set(wraps, { opacity: 0, y: 60 });

      const tween = gsap.to(wraps, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      ctxCleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => ctxCleanup?.();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${bricolage.variable} ${hanken.variable} vision-belief-section overflow-hidden bg-[#1A1A1A] py-16 md:py-[120px]`}
      aria-labelledby="vision-belief-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <h2
          id="vision-belief-heading"
          className="mb-16 text-center text-white md:mb-20"
          style={{
            fontFamily: "var(--font-vision-belief-title)",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            lineHeight: 1.05,
            fontWeight: 700,
          }}
        >
          Quello in cui
          <br />
          <span className="italic text-brand-corallo">crediamo davvero</span>
        </h2>

        <div
          ref={cardsWrapRef}
          className="relative mx-auto grid max-w-[920px] grid-cols-1 place-items-center gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-12"
        >
          {beliefCards.map((card) => (
            <div
              key={card.number}
              className={`vision-belief-card-wrap flex shrink-0 justify-center ${card.wrapClass}`}
            >
              <BeliefCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
