"use client";

import Image from "next/image";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import Reveal from "@/components/Reveal";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-vision-name",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-vision-role",
  display: "swap",
});

const CORAL_OVERLAY = "bg-[#C0471A]/[0.175]";

const founders = [
  {
    name: "Marco Pio Cerbone",
    role: "Co-Founder · Direttore marketing & Consulenza aziendale",
  },
  {
    name: "Gianpio Uva",
    role: "Co-Founder · Direttore Commerciale & Sales Process",
  },
];

const teamGrid = [
  {
    name: "Marco Pio Cerbone",
    role: "Direttore marketing & Consulenza aziendale",
    photo: "/images/team/vision/marco-editorial.png",
  },
  {
    name: "Gianpio Uva",
    role: "Direttore Commerciale & Sales Process",
    photo: "/images/team/vision/gianpio-editorial.png",
  },
  {
    name: "Francesco Chiumiento",
    role: "Direttore Creative & Video Producer",
    photo: "/images/team/vision/francesco-editorial.png",
  },
];

type EditorialPhotoProps = {
  src: string;
  alt: string;
  aspectClass: string;
  sizes: string;
  priority?: boolean;
};

function EditorialPhoto({ src, alt, aspectClass, sizes, priority }: EditorialPhotoProps) {
  return (
    <div className={`relative overflow-hidden rounded-2xl md:rounded-3xl ${aspectClass}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes={sizes}
        quality={90}
        priority={priority}
      />
      <div className={`pointer-events-none absolute inset-0 ${CORAL_OVERLAY}`} aria-hidden />
    </div>
  );
}

export default function VisionTeamGallery() {
  return (
    <div className={`${bricolage.variable} ${hanken.variable} mt-14 md:mt-20`}>
      <Reveal y={28} duration={1}>
        <div className="mx-auto max-w-6xl">
          <EditorialPhoto
            src="/images/team/vision/founders-duo.png"
            alt="Marco Pio Cerbone e Gianpio Uva, co-founder di Forge Group"
            aspectClass="aspect-[16/10] sm:aspect-[21/9] w-full"
            sizes="(max-width: 768px) 100vw, 1152px"
            priority
          />

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:mt-8">
            {founders.map((founder) => (
              <div key={founder.name} className="text-center sm:text-left">
                <p
                  className="text-lg font-semibold text-brand-nero md:text-xl"
                  style={{ fontFamily: "var(--font-vision-name)" }}
                >
                  {founder.name}
                </p>
                <p
                  className="mt-1 text-sm leading-snug text-brand-grigio md:text-base"
                  style={{ fontFamily: "var(--font-vision-role)" }}
                >
                  {founder.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 md:mt-16 md:grid-cols-3 md:gap-6 lg:gap-8">
        {teamGrid.map((member, index) => (
          <Reveal key={member.name} delay={index * 2} y={24} duration={0.95}>
            <article className="flex flex-col">
              <EditorialPhoto
                src={member.photo}
                alt={member.name}
                aspectClass="aspect-[3/4] w-full"
                sizes="(max-width: 768px) 45vw, 260px"
              />
              <h3
                className="mt-4 text-base font-semibold text-brand-nero md:text-lg"
                style={{ fontFamily: "var(--font-vision-name)" }}
              >
                {member.name}
              </h3>
              <p
                className="mt-1 text-xs leading-snug text-brand-grigio md:text-sm"
                style={{ fontFamily: "var(--font-vision-role)" }}
              >
                {member.role}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
