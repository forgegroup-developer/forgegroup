"use client";

import { useEffect, useId, useRef, useState } from "react";

type GooeyGradientBackgroundProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function GooeyGradientBackground({
  children,
  className = "",
}: GooeyGradientBackgroundProps) {
  const filterId = useId().replace(/:/g, "");
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const interactive = interactiveRef.current;
    if (!interactive) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;

    // HW debole → fondale statico (blob fermi, niente rAF): il livello filtrato
    // pesante (goo + blur) viene dipinto una sola volta e non ricalcolato a ogni
    // frame. Soglie: ≤4 core logici o ≤4 GB RAM. I browser che non espongono
    // questi dati (Safari/Firefox) restituiscono 0 → nessuna riduzione.
    const nav = navigator as Navigator & { deviceMemory?: number };
    const cores = nav.hardwareConcurrency ?? 0;
    const memory = nav.deviceMemory ?? 0;
    const weakHardware = (cores > 0 && cores <= 4) || (memory > 0 && memory <= 4);

    if (reducedMotion || !desktop || weakHardware) {
      if (weakHardware) setReduced(true);
      return;
    }

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    let frame = 0;

    const handlePointerMove = (event: PointerEvent) => {
      tgX = event.clientX;
      tgY = event.clientY;
    };

    const animate = () => {
      // Con un video della hero in riproduzione, non scrivere trasformazioni:
      // il blob interattivo resta fermo, il livello filtrato (goo + blur) resta
      // statico e il compositor lo mette in cache invece di rifiltrarlo a ogni
      // frame. Così il decode video non compete con la GPU (fix stutter).
      if (document.documentElement.dataset.videoPlaying !== "true") {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interactive.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`forge-gooey-wrapper relative h-full w-full overflow-hidden ${reduced ? "forge-gooey-reduced " : ""}${className}`.trim()}>
      <div className="forge-gooey-bg pointer-events-none absolute inset-0" aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" className="absolute h-0 w-0" aria-hidden="true">
          <defs>
            <filter id={filterId}>
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="forge-gooey-gradients" style={{ filter: `url(#${filterId}) blur(40px)` }}>
          <div className="forge-gooey-blob forge-gooey-blob-1" />
          <div className="forge-gooey-blob forge-gooey-blob-2" />
          <div className="forge-gooey-blob forge-gooey-blob-3" />
          <div className="forge-gooey-blob forge-gooey-blob-4" />
          <div className="forge-gooey-blob forge-gooey-blob-5" />
          <div ref={interactiveRef} className="forge-gooey-blob forge-gooey-blob-interactive" />
        </div>
        <div className="forge-gooey-veil absolute inset-0" aria-hidden="true" />
      </div>

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
