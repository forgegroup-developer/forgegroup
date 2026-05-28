"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    name: "Marco",
    role: "Growth Strategy & Business Development",
    initials: "MP",
  },
  {
    name: "Gianpio",
    role: "Marketing & Advertising",
    initials: "GP",
  },
  {
    name: "Il tuo team",
    role: "Lavoriamo dentro alla tua azienda come un reparto interno",
    initials: "?",
    isCta: true,
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
    <section className="py-20 md:py-28 bg-brand-bianco border-t border-brand-bordo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="eyebrow mb-4">✦ Il Nostro Team</p>
        <h2 className="heading-section text-brand-nero max-w-2xl mx-auto mb-16">
          Le persone dietro ai{" "}
          <span className="text-brand-corallo">risultati</span>.
        </h2>

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-12 max-w-3xl mx-auto">
          {team.map((member) => (
            <div key={member.name} data-team-card className="flex flex-col items-center text-center">
              <div
                className={`w-32 h-32 md:w-40 md:h-40 rounded-full border-2 flex items-center justify-center mb-5 relative overflow-hidden group transition-all duration-300 hover:scale-105 ${
                  (member as { isCta?: boolean }).isCta
                    ? "bg-brand-panna border-brand-corallo/30 border-dashed"
                    : "bg-brand-pesca-light border-brand-bordo hover:border-brand-corallo/50"
                }`}
              >
                <span
                  className={`text-3xl md:text-4xl font-bold transition-colors ${
                    (member as { isCta?: boolean }).isCta
                      ? "text-brand-corallo/40"
                      : "text-brand-corallo"
                  }`}
                >
                  {member.initials}
                </span>
                <div className="absolute inset-0 bg-brand-corallo/0 group-hover:bg-brand-corallo/8 transition-colors duration-300" />
              </div>
              <h3 className={`text-xl font-semibold mb-1 ${(member as { isCta?: boolean }).isCta ? "text-brand-grigio" : "text-brand-nero"}`}>
                {member.name}
              </h3>
              <p className="text-brand-grigio text-sm max-w-[200px] leading-snug">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
