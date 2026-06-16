"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowUpRight, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "@/components/Reveal";

const CORAL_OVERLAY = "bg-[#C0471A]/[0.175]";

const manifestoParagraphs = [
  "La risposta, quasi sempre, è la stessa. Non manca il prodotto. Non mancano le persone. Manca qualcuno che entra dentro, capisce come funziona davvero quell'azienda, e costruisce con loro qualcosa che regge nel tempo.",
  "Noi non consegniamo campagne e sparissimo. Entriamo, restiamo, lavoriamo fianco a fianco — sul marketing, sul processo commerciale, sulla struttura. Finché non gira da solo.",
  "Ma quello che ci interessa davvero non è solo il numero a fine mese. È quello che succede dentro quell'azienda quando le cose iniziano ad andare bene. Come cambia l'imprenditore. Come respira il suo team. Quanto tempo riesce finalmente a dedicare a quello che conta.",
  "Perché crediamo che un'azienda sana costruisce persone sane.",
  "Chi lavora con noi — cliente o collaboratore — trova un ambiente preciso. Fatto di lealtà, trasparenza, lavoro vero e una bussola di valori che non cambia in base alla convenienza.",
  "Non cerchiamo clienti da gestire. Cerchiamo imprenditori con cui costruire.",
  "Se leggendo questo hai sentito qualcosa, il resto lo scopriamo davanti a un caffè.",
];

type CardVariant = "coral" | "dark";

const editorialCards: {
  number: string;
  photo: string;
  alt: string;
  variant: CardVariant;
  icon: LucideIcon;
  iconClassName?: string;
  iconWrapClassName?: string;
  parallaxClass: "vision-card-offset-down" | "vision-card-offset-up";
  stagger?: boolean;
}[] = [
  {
    number: "01",
    photo: "/images/team/vision/marco-editorial.png",
    alt: "Marco Pio Cerbone al lavoro con Forge Group",
    variant: "coral",
    icon: Star,
    parallaxClass: "vision-card-offset-down",
  },
  {
    number: "02",
    photo: "/images/team/vision/gianpio-editorial.png",
    alt: "Gianpio Uva al lavoro con Forge Group",
    variant: "dark",
    icon: ArrowUpRight,
    iconClassName: "-rotate-45",
    iconWrapClassName: "group-hover:scale-110",
    parallaxClass: "vision-card-offset-up",
    stagger: true,
  },
  {
    number: "03",
    photo: "/images/team/vision/francesco-editorial.png",
    alt: "Francesco Chiumiento al lavoro con Forge Group",
    variant: "coral",
    icon: Star,
    parallaxClass: "vision-card-offset-down",
  },
];

const cardVariantStyles: Record<
  CardVariant,
  {
    shell: string;
    badge: string;
    iconWrap: string;
    icon: string;
    divider: string;
  }
> = {
  coral: {
    shell:
      "bg-brand-corallo shadow-2xl hover:shadow-[0_20px_50px_rgba(200,80,42,0.35)]",
    badge: "border-black/20 text-brand-nero",
    iconWrap: "bg-black/10 group-hover:rotate-45",
    icon: "text-brand-nero",
    divider: "bg-black/10",
  },
  dark: {
    shell:
      "bg-brand-nero border border-white/10 shadow-2xl hover:border-brand-corallo/50",
    badge: "border-white/10 text-white/50",
    iconWrap: "bg-white/5",
    icon: "text-brand-bianco",
    divider: "bg-white/10",
  },
};

function VisionEditorialCard({
  src,
  alt,
  number,
  variant,
  icon: Icon,
  iconClassName = "",
  iconWrapClassName = "",
  sizes,
}: {
  src: string;
  alt: string;
  number: string;
  variant: CardVariant;
  icon: LucideIcon;
  iconClassName?: string;
  iconWrapClassName?: string;
  sizes: string;
}) {
  const styles = cardVariantStyles[variant];

  return (
    <div
      className={`group flex aspect-[4/5] w-full cursor-pointer flex-col justify-between rounded-3xl p-8 transition-all duration-500 md:p-10 lg:p-12 ${styles.shell}`}
    >
      <div className="flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-full transition-transform duration-500 ${styles.iconWrap} ${iconWrapClassName}`}
        >
          <Icon className={`h-6 w-6 ${styles.icon} ${iconClassName}`} aria-hidden />
        </div>
        <span
          className={`rounded-full border px-3 py-1 text-sm font-medium ${styles.badge}`}
          aria-hidden
        >
          {number}
        </span>
      </div>

      <div className="relative my-5 min-h-0 flex-1 overflow-hidden rounded-2xl bg-brand-panna md:my-6">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
          sizes={sizes}
          quality={90}
        />
        <div className={`pointer-events-none absolute inset-0 ${CORAL_OVERLAY}`} aria-hidden />
      </div>

      <div className={`h-px w-full shrink-0 ${styles.divider}`} aria-hidden />
    </div>
  );
}

function FoundersHeroPhoto() {
  return (
    <div className="relative min-h-[340px] w-full overflow-hidden rounded-3xl border border-brand-bordo bg-brand-panna shadow-[0_24px_64px_-24px_rgba(17,17,17,0.24)] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[620px] xl:min-h-[720px]">
      <Image
        src="/images/team/vision/founders-duo.png"
        alt="Marco Pio Cerbone e Gianpio Uva, co-founder di Forge Group"
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 1400px"
        quality={90}
      />
      <div className={`pointer-events-none absolute inset-0 ${CORAL_OVERLAY}`} aria-hidden />
    </div>
  );
}

export default function VisionSection() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const onScroll = () => {
      const y = window.scrollY;
      document.querySelectorAll<HTMLElement>(".vision-card-offset-up").forEach((el) => {
        el.style.setProperty("--vision-parallax-up", `${y * -0.05}px`);
      });
      document.querySelectorAll<HTMLElement>(".vision-card-offset-down").forEach((el) => {
        el.style.setProperty("--vision-parallax-down", `${y * 0.05}px`);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
              Forge Group nasce da una <span className="text-brand-corallo">domanda semplice</span>.
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-brand-grigio md:text-2xl text-balance">
              Perché tante aziende che hanno tutto per crescere, non crescono?
            </p>
          </Reveal>
        </div>
      </section>

      {/* Manifesto + card editoriali Superdesign */}
      <section className="section-visione relative overflow-hidden border-b py-16 md:py-24 lg:py-32 xl:py-40">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-brand-corallo) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal y={28} duration={1}>
            <h2 className="heading-section mx-auto mb-16 max-w-4xl text-center text-brand-nero md:mb-24 lg:mb-32">
              Costruiamo con chi ha il coraggio di <br />
              <span className="italic text-brand-corallo">crescere sul serio</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
            {/* Colonna sinistra — manifesto */}
            <div className="min-w-0 space-y-6 text-lg leading-relaxed text-brand-grigio md:space-y-8 md:text-xl md:leading-relaxed lg:sticky lg:top-28 lg:max-h-[calc(100dvh-8rem)] lg:overflow-y-auto lg:pr-2">
              {manifestoParagraphs.map((paragraph, index) => (
                <Reveal key={index} delay={index + 1} y={22} duration={0.95}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            {/* Colonna destra — card Superdesign */}
            <div className="relative min-w-0">
              <div className="relative mx-auto flex max-w-md flex-col gap-6 md:gap-8 lg:max-w-none">
                {editorialCards.map((card, index) => (
                  <div
                    key={card.photo}
                    className={`${card.parallaxClass}${card.stagger ? " md:mt-16 lg:mt-24" : ""}`}
                  >
                    <Reveal delay={index * 2} y={28} duration={1}>
                      <VisionEditorialCard
                        src={card.photo}
                        alt={card.alt}
                        number={card.number}
                        variant={card.variant}
                        icon={card.icon}
                        iconClassName={card.iconClassName}
                        iconWrapClassName={card.iconWrapClassName}
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                    </Reveal>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Founders duo */}
          <div className="mt-20 lg:mt-28">
            <Reveal y={28} duration={1}>
              <FoundersHeroPhoto />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
