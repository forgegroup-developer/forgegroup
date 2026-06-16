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
  photoObjectPosition?: string;
}[] = [
  {
    number: "01",
    photo: "/images/team/vision/team-insieme.jpg",
    alt: "Il team Forge Group al lavoro",
    title: "La risposta, quasi sempre, è la stessa.",
    subtitle:
      "Non manca il prodotto. Non mancano le persone. Manca qualcuno che entra dentro, capisce come funziona davvero quell'azienda, e costruisce con loro qualcosa che regge nel tempo.",
    variant: "coral",
    rotateClass: "-rotate-[2deg] md:-rotate-[4deg] md:hover:rotate-0",
    wrapClass: "",
    icon: Star,
    photoObjectPosition: "center 30%",
  },
  {
    number: "02",
    photo: "/images/team/vision/team-lavoro.jpg",
    alt: "Il team Forge Group al lavoro",
    title: "Entriamo, restiamo, costruiamo.",
    subtitle:
      "Noi non consegniamo campagne e sparissimo. Lavoriamo fianco a fianco sul marketing, sul processo commerciale, sulla struttura. Finché non gira da solo.",
    variant: "dark",
    rotateClass: "rotate-[2deg] md:rotate-[4deg] md:hover:rotate-0",
    wrapClass: "max-md:mt-0 md:mt-10 md:-ml-6 lg:-ml-8",
    icon: ArrowUpRight,
    iconClassName: "-rotate-45",
  },
  {
    number: "03",
    photo: "/images/team/vision/marco-editorial.png",
    alt: "Marco Pio Cerbone al lavoro con Forge Group",
    title: "Un'azienda sana costruisce persone sane.",
    subtitle:
      "Ma quello che ci interessa davvero non è solo il numero a fine mese. È quello che succede dentro quell'azienda quando le cose iniziano ad andare bene. Come cambia l'imprenditore. Come respira il suo team. Quanto tempo riesce finalmente a dedicare a quello che conta.",
    variant: "coral",
    rotateClass: "-rotate-[2deg] md:-rotate-[4deg] md:hover:rotate-0",
    wrapClass: "md:mt-4",
    icon: Star,
  },
  {
    number: "04",
    photo: "/images/team/vision/francesco-editorial.png",
    alt: "Francesco Chiumiento al lavoro con Forge Group",
    title: "Cerchiamo imprenditori con cui costruire.",
    subtitle:
      "Chi lavora con noi, cliente o collaboratore, trova un ambiente preciso. Fatto di lealtà, trasparenza, lavoro vero e una bussola di valori che non cambia in base alla convenienza. Non cerchiamo clienti da gestire. Se leggendo questo hai sentito qualcosa, il resto lo scopriamo davanti a un caffè.",
    variant: "dark",
    rotateClass: "rotate-[2deg] md:rotate-[4deg] md:hover:rotate-0",
    wrapClass: "max-md:mt-0 md:mt-14 md:-ml-6 lg:-ml-8",
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
  photoObjectPosition = "center",
}: (typeof beliefCards)[number]) {
  const isCoral = variant === "coral";

  return (
    <article
      className={`vision-belief-card group h-full w-full max-w-[380px] transition-transform duration-500 ease-out hover:-translate-y-2 md:w-[420px] md:max-w-[420px] ${rotateClass}`}
    >
      <div
        className={`flex h-full w-full flex-col overflow-hidden rounded-[24px] ${
          isCoral ? "bg-[#C0471A]" : "bg-[#2A2A2A]"
        }`}
      >
        <div className="relative h-[240px] w-full shrink-0 overflow-hidden rounded-t-[24px] md:h-[300px]">
          <Image
            src={photo}
            alt={alt}
            fill
            className="object-cover"
            style={{ objectPosition: photoObjectPosition }}
            sizes="(max-width: 768px) 100vw, 420px"
            quality={90}
          />

          <div className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md">
            <Icon className={`h-5 w-5 ${iconClassName}`} strokeWidth={1.75} aria-hidden />
          </div>
          <span className="absolute right-4 top-4 z-10 rounded-full bg-black/35 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-md">
            {number}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-8">
          <h3
            className={`text-balance leading-[1.1] ${isCoral ? "text-[#1A1A1A]" : "text-white"}`}
            style={{
              fontFamily: "var(--font-vision-belief-title)",
              fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
              fontWeight: 700,
            }}
          >
            {title}
          </h3>
          <p
            className={`mt-4 text-pretty ${isCoral ? "text-[#1A1A1A]/85" : "text-white/70"}`}
            style={{
              fontFamily: "var(--font-vision-belief-body)",
              fontSize: "1rem",
              lineHeight: 1.45,
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

    void loadGsapScrollTrigger().then(({ gsap }) => {
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
          className="relative mx-auto grid max-w-[920px] grid-cols-1 items-stretch justify-items-center gap-8 md:grid-cols-2 md:gap-8"
        >
          {beliefCards.map((card) => (
            <div
              key={card.number}
              className={`vision-belief-card-wrap flex h-full w-full justify-center ${card.wrapClass}`}
            >
              <BeliefCard {...card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
