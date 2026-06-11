"use client";

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";

type GlowingEdgeCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  mode?: "light" | "dark";
  intro?: boolean;
  as?: "div" | "article" | "section";
} & HTMLAttributes<HTMLElement>;

const round = (value: number, precision = 3) => parseFloat(value.toFixed(precision));
const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);

function centerOfElement(rect: DOMRect) {
  return [rect.width / 2, rect.height / 2] as const;
}

function getPointerPosition(rect: DOMRect, e: { clientX: number; clientY: number }) {
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  return {
    pixels: [x, y] as const,
    percent: [clamp((100 / rect.width) * x), clamp((100 / rect.height) * y)] as const,
  };
}

function angleFromPointer(dx: number, dy: number) {
  if (dx === 0 && dy === 0) return 0;
  let angleDegrees = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
  if (angleDegrees < 0) angleDegrees += 360;
  return angleDegrees;
}

function closenessToEdge(rect: DOMRect, x: number, y: number) {
  const [cx, cy] = centerOfElement(rect);
  const dx = x - cx;
  const dy = y - cy;
  let k_x = Infinity;
  let k_y = Infinity;
  if (dx !== 0) k_x = cx / Math.abs(dx);
  if (dy !== 0) k_y = cy / Math.abs(dy);
  return clamp(1 / Math.min(k_x, k_y), 0, 1);
}

export default function GlowingEdgeCard({
  children,
  className = "",
  innerClassName = "",
  mode = "light",
  intro = false,
  as: Component = "div",
  ...props
}: GlowingEdgeCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const position = getPointerPosition(rect, e);
    const [px, py] = position.pixels;
    const [perx, pery] = position.percent;
    const [cx, cy] = centerOfElement(rect);
    const edge = closenessToEdge(rect, px, py);
    const angle = angleFromPointer(px - cx, py - cy);

    el.style.setProperty("--pointer-x", `${round(perx)}%`);
    el.style.setProperty("--pointer-y", `${round(pery)}%`);
    el.style.setProperty("--pointer-deg", `${round(angle)}deg`);
    el.style.setProperty("--pointer-d", `${round(edge * 100)}`);

    if (isAnimating) {
      setIsAnimating(false);
      el.classList.remove("animating");
    }
  };

  useEffect(() => {
    if (!intro || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const playAnimation = () => {
      const el = cardRef.current;
      if (!el) return;

      setIsAnimating(true);
      el.classList.add("animating");

      const angleStart = 110;
      const angleEnd = 465;
      el.style.setProperty("--pointer-deg", `${angleStart}deg`);
      const startTime = performance.now();

      const animate = (now: number) => {
        if (!el.classList.contains("animating")) return;

        const elapsed = now - startTime;

        if (elapsed > 500 && elapsed < 1000) {
          const t = (elapsed - 500) / 500;
          const ease = 1 - Math.pow(1 - t, 3);
          el.style.setProperty("--pointer-d", `${ease * 100}`);
        }

        if (elapsed > 500 && elapsed < 2000) {
          const t = (elapsed - 500) / 1500;
          const ease = t * t * t;
          el.style.setProperty(
            "--pointer-deg",
            `${(angleEnd - angleStart) * (ease * 0.5) + angleStart}deg`
          );
        }

        if (elapsed >= 2000 && elapsed < 4250) {
          const t = (elapsed - 2000) / 2250;
          const ease = 1 - Math.pow(1 - t, 3);
          el.style.setProperty(
            "--pointer-deg",
            `${(angleEnd - angleStart) * (0.5 + ease * 0.5) + angleStart}deg`
          );
        }

        if (elapsed > 3000 && elapsed < 4500) {
          const t = (elapsed - 3000) / 1500;
          const ease = t * t * t;
          el.style.setProperty("--pointer-d", `${(1 - ease) * 100}`);
        }

        if (elapsed < 4500) {
          requestAnimationFrame(animate);
        } else {
          setIsAnimating(false);
          el.classList.remove("animating");
        }
      };

      requestAnimationFrame(animate);
    };

    const timer = window.setTimeout(playAnimation, 500);
    return () => window.clearTimeout(timer);
  }, [intro]);

  const modeClass = mode === "dark" ? "glowing-edge-card--dark" : "glowing-edge-card--light";

  return (
    <Component
      ref={cardRef as never}
      className={`glowing-edge-card group ${modeClass}${isAnimating ? " animating" : ""} ${className}`.trim()}
      onPointerMove={handlePointerMove}
      {...props}
    >
      <span className="glowing-edge-card__mesh-border" aria-hidden />
      <span className="glowing-edge-card__mesh-bg" aria-hidden />
      <span className="glowing-edge-card__glow" aria-hidden />
      <div className={`glowing-edge-card__content ${innerClassName}`.trim()}>{children}</div>
    </Component>
  );
}
