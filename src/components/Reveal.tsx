"use client";

import { type ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0, scale: 1 });
      return;
    }

    gsap.set(el, { opacity: 0, y, scale: 0.985, filter: "blur(6px)" });

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration,
      delay: delay * 0.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });

    return () => {
      tween.kill();
    };
  }, [delay, y, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
