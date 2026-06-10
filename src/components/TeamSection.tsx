"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TeamMember = {
  name: string;
  forgeRole: string;
  role: string;
  photo?: string;
  objectPosition?: string;
  linkedin?: string;
};

const team: TeamMember[] = [
  {
    name: "Marco Pio Cerbone",
    forgeRole: "Co-Founder",
    role: "Direttore marketing & Consulenza aziendale",
    photo: "/images/team/foto-marco.png",
    objectPosition: "object-top",
    linkedin: "https://www.linkedin.com/in/marco-pio-cerbone-01520b2a6",
  },
  {
    name: "Gianpio Uva",
    forgeRole: "Co-Founder",
    role: "Direttore Commerciale & Sales Process",
    photo: "/images/team/foto-gianpio.png",
    objectPosition: "object-[50%_38%]",
    linkedin: "https://www.linkedin.com/in/gianpio-uva-9170432b9",
  },
  {
    name: "Francesco Chiumiento",
    forgeRole: "Partner",
    role: "Direttore Creative - Video Producer",
  },
  {
    name: "Nicandro Grande",
    forgeRole: "Partner",
    role: "Direttore Commerciale & Sales Process",
  },
];

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

const separatorGaps = ["mx-10 md:mx-16", "mx-14 md:mx-24", "mx-8 md:mx-20", "mx-12 md:mx-28"];

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function FlowSeparator({ gapClass }: { gapClass: string }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center ${gapClass}`}
      aria-hidden
    >
      <svg
        width="56"
        height="28"
        viewBox="0 0 56 28"
        fill="none"
        className="text-brand-corallo/70"
      >
        <path
          d="M2 14C14 4 28 24 42 14C48 10 52 12 54 14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="28" cy="14" r="3" fill="currentColor" />
      </svg>
    </span>
  );
}

function MemberAvatar({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <span className="relative inline-flex h-16 w-16 shrink-0 overflow-hidden rounded-full align-middle shadow-[0_8px_24px_rgba(17,17,17,0.12)] md:h-24 md:w-24">
      {member.photo ? (
        <Image
          src={member.photo}
          alt=""
          fill
          className={`object-cover ${member.objectPosition ?? "object-center"}`}
          sizes="96px"
          aria-hidden
        />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center bg-brand-panna font-display text-lg font-bold text-brand-corallo md:text-2xl"
          aria-hidden
        >
          {initials}
        </span>
      )}
    </span>
  );
}

function TeamMemberFlow({ member, gapAfter }: { member: TeamMember; gapAfter: string }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-4 md:gap-6">
      <MemberAvatar member={member} />
      <span className="inline-flex flex-col items-start leading-none">
        <span className="font-display text-[clamp(1.75rem,4vw,3.25rem)] font-semibold tracking-tight text-brand-nero">
          {member.name}
        </span>
        <span className="mt-2 font-display text-[clamp(1rem,2vw,1.5rem)] font-semibold text-brand-corallo">
          {member.forgeRole}
        </span>
        <span className="mt-1 max-w-[28ch] text-left text-[clamp(0.95rem,1.6vw,1.25rem)] leading-snug text-brand-grigio">
          {member.role}
        </span>
        {member.linkedin ? (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-corallo transition-colors hover:text-brand-corallo-dark"
            aria-label={`LinkedIn di ${member.name}`}
          >
            <LinkedInIcon className="h-4 w-4" />
            LinkedIn
          </a>
        ) : null}
      </span>
      <FlowSeparator gapClass={gapAfter} />
    </span>
  );
}

function TeamGridFallback() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-12 md:gap-20">
      {team.map((member) => (
        <div key={member.name} className="flex w-[280px] flex-col items-center text-center">
          <div className="relative h-64 w-64 overflow-hidden rounded-full shadow-[0_12px_40px_rgba(17,17,17,0.12)] md:h-80 md:w-80">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className={`object-cover ${member.objectPosition ?? "object-center"}`}
                sizes="(max-width: 768px) 256px, 320px"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-brand-panna font-display text-4xl font-bold text-brand-corallo md:text-5xl">
                {member.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")}
              </div>
            )}
          </div>
          <h3 className="mt-6 mb-1 text-xl font-semibold text-brand-nero">{member.name}</h3>
          <p className="mb-1 text-sm font-semibold leading-snug text-brand-corallo">{member.forgeRole}</p>
          <p className="text-sm leading-snug text-brand-grigio">{member.role}</p>
          {member.linkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-4 gap-2 ${chipOutlineClass}`}
            >
              <LinkedInIcon />
              LinkedIn
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!section || !pin || !track) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(track, { clearProps: "transform" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const getScrollDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-bianco">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center motion-reduce:py-20 motion-reduce:md:py-28">
        <p className="eyebrow mb-4 motion-reduce:mb-4">✦ Il Nostro Team</p>
        <h2 className="heading-section text-brand-nero max-w-2xl mx-auto mb-16 motion-reduce:mb-16">
          Le persone dietro <span className="text-brand-corallo">Forge Group</span>
        </h2>

        <div className="motion-reduce:hidden">
          <div
            ref={pinRef}
            className="relative -mx-4 h-[min(88vh,720px)] overflow-hidden sm:-mx-6 lg:-mx-8"
          >
            <div
              ref={trackRef}
              className="absolute top-1/2 left-0 flex w-max -translate-y-1/2 items-center pl-[8vw] pr-[30vw]"
            >
              <span className="inline-flex shrink-0 items-baseline gap-3 pr-6 md:gap-5 md:pr-10">
                <span className="font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold tracking-tight text-brand-nero">
                  Le persone dietro
                </span>
                <span className="font-display text-[clamp(2rem,5vw,4.5rem)] font-semibold tracking-tight text-brand-corallo">
                  Forge Group
                </span>
                <span className="mx-4 inline-flex text-brand-corallo md:mx-8" aria-hidden>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M16 2l2.2 6.8H25l-5.5 4 2.1 6.8L16 15.6 10.4 19.6l2.1-6.8-5.5-4h6.8L16 2z" />
                  </svg>
                </span>
              </span>

              {team.map((member, index) => (
                <TeamMemberFlow
                  key={member.name}
                  member={member}
                  gapAfter={separatorGaps[index % separatorGaps.length]}
                />
              ))}

              <span className="inline-flex shrink-0 items-center pl-4 font-display text-[clamp(1.5rem,3vw,2.5rem)] font-semibold text-brand-grigio">
                e molti altri talenti
              </span>
            </div>
          </div>
        </div>

        <div className="hidden motion-reduce:block">
          <TeamGridFallback />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-20 md:pb-28">
        <div className="pt-16 border-t border-brand-bordo">
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
