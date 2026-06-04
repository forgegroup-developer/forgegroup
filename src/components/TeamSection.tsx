"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Marco Pio Cerbone",
    forgeRole: "Co-Founder",
    role: "Imprenditore, Consulente Marketing e Consulente Aziendale",
    photo: "/images/team/foto-marco.png",
    objectPosition: "object-top",
    linkedin: "https://www.linkedin.com/in/marco-pio-cerbone-01520b2a6",
  },
  {
    name: "Gianpio Uva",
    forgeRole: "Co-Founder",
    role: "Imprenditore, Consulente Commerciale ed Esperto in Processi di Vendita",
    photo: "/images/team/foto-gianpio.png",
    objectPosition: "object-[50%_38%]",
    linkedin: "https://www.linkedin.com/in/gianpio-uva-9170432b9",
  },
];

// Rete di talenti del settore, ordinati per priorità. I loghi verranno aggiunti quando disponibili.
const collaborators = [
  "Consulenti Aziendali",
  "Commerciali Esperti",
  "Meta Ads Specialist",
  "Google Ads Specialist",
  "Posizionamento Google & IA",
  "Web Master",
  "Formatori & Imprenditori",
  "Videomaker & Fotografi Professionisti",
];

const chipOutlineClass =
  "inline-flex items-center rounded-full border-2 border-brand-corallo bg-transparent px-5 py-2.5 text-sm font-semibold text-brand-corallo shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-corallo/10";

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-team-card]"));
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        }
      );
    });
  }, []);

  return (
    <section className="py-20 md:py-28 bg-brand-bianco/70 backdrop-blur-sm border-t border-brand-bordo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="eyebrow mb-4">✦ Il Nostro Team</p>
        <h2 className="heading-section text-brand-nero max-w-2xl mx-auto mb-16">
          I founder di{" "}
          <span className="text-brand-corallo">Forge Group</span>
        </h2>

        {/* Founders */}
        <div
          ref={containerRef}
          className="flex flex-wrap justify-center items-start gap-12 md:gap-20"
        >
          {team.map((member) => (
            <div
              key={member.name}
              data-team-card
              className="group flex w-[280px] flex-col items-center text-center"
            >
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden relative shadow-[0_12px_40px_rgba(17,17,17,0.12)] transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_16px_48px_rgba(17,17,17,0.16)]">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className={`object-cover ${member.objectPosition}`}
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-1 text-brand-nero">{member.name}</h3>
              <p className="text-brand-corallo text-sm font-semibold leading-snug mb-1">
                {member.forgeRole}
              </p>
              <p className="text-brand-grigio text-sm leading-snug">{member.role}</p>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 gap-2 ${chipOutlineClass}`}
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>
          ))}
        </div>

        {/* Talenti del settore */}
        <div className="mt-20 md:mt-28 pt-16 border-t border-brand-bordo">
          <h3 className="heading-section text-brand-nero max-w-3xl mx-auto mb-12">
            Forge Group è una realtà formata dai{" "}
            <span className="text-brand-corallo">migliori talenti del settore</span>.
          </h3>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {collaborators.map((label) => (
              <span key={label} className={chipOutlineClass}>
                {label}
              </span>
            ))}
            <span className={chipOutlineClass}>e molti altri</span>
          </div>
        </div>
      </div>
    </section>
  );
}
