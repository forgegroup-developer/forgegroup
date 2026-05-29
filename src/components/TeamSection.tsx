"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Marco Cerbone",
    role: "Strategia commerciale & Marketing",
    photo: "/images/team/foto-marco.jpg",
  },
  {
    name: "Gianpio Uva",
    role: "Business Development & Relazioni",
    photo: "/images/team/foto-gianpio.jpg",
  },
];

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

        <div
          ref={containerRef}
          className="flex flex-wrap justify-center items-start gap-10 md:gap-16 max-w-2xl mx-auto"
        >
          {team.map((member) => (
            <div key={member.name} data-team-card className="flex flex-col items-center text-center">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-brand-bordo bg-brand-pesca-light overflow-hidden mb-5 relative group transition-all duration-300 hover:scale-105 hover:border-brand-corallo/50">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 128px, 160px"
                />
                <div className="absolute inset-0 bg-brand-corallo/0 group-hover:bg-brand-corallo/8 transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-brand-nero">{member.name}</h3>
              <p className="text-brand-grigio text-sm max-w-[220px] leading-snug">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
