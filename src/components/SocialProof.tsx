"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  {
    target: 50,
    suffix: "+",
    label: "Imprese aiutate",
    sublabel: "nel corso della nostra esperienza",
    icon: "users",
  },
  {
    target: 300,
    prefix: "€",
    suffix: "K+",
    label: "Fatturato generato",
    sublabel: "per singolo cliente",
    icon: "chart",
  },
  {
    target: 5,
    suffix: "/5",
    label: "Recensioni verificate",
    sublabel: "feedback dai nostri clienti",
    icon: "star",
  },
];

function CountUpNumber({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();
          const duration = 2000;

          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-corallo tracking-tight">
      {prefix}{value}{suffix}
    </div>
  );
}

function Icon({ type }: { type: string }) {
  const cls = "w-5 h-5 text-brand-corallo";
  if (type === "users") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
  if (type === "chart") return (
    <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3v18h18M7 16l4-4 4 4 5-5" />
    </svg>
  );
  return (
    <svg className={cls} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.518-4.674z" />
    </svg>
  );
}

export default function SocialProof() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const cards = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-stat-card]"));
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40, scale: 0.92 },
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
    <section className="py-16 md:py-20 bg-brand-corallo/25 backdrop-blur-md border-y border-brand-bordo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={containerRef} className="grid md:grid-cols-3 gap-5">
          {statsData.map((stat) => (
            <div
              key={stat.label}
              data-stat-card
              className="relative rounded-3xl bg-brand-bianco border border-brand-bordo p-8 md:p-10 flex flex-col items-center text-center overflow-hidden shadow-sm"
            >
              <CountUpNumber target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
              <p
                className="text-brand-grigio text-base md:text-lg mt-3 font-bold leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.label}
              </p>
              <p className="text-brand-grigio text-sm mt-1 font-medium leading-snug opacity-70 w-full max-w-full px-4">
                {stat.sublabel}
              </p>
              <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full border border-brand-bordo flex items-center justify-center">
                <Icon type={stat.icon} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
