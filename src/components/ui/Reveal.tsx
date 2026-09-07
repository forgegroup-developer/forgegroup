"use client";

import { type ReactNode, useRef, useEffect } from "react";
import { loadGsapScrollTrigger } from "@/lib/loadGsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 40,
  duration = 1.2,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    let tweenKill: (() => void) | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        void loadGsapScrollTrigger().then(({ gsap }) => {
          gsap.set(el, { opacity: 0, y, scale: 0.985 });

          const tween = gsap.to(el, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration,
            delay: delay * 0.1,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              once: true,
            },
          });

          tweenKill = () => tween.kill();
        });
      },
      { rootMargin: "120px 0px", threshold: 0 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      tweenKill?.();
    };
  }, [delay, y, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
