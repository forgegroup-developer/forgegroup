"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "view";

const LERP_SPEED = 0.14;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Site-wide custom cursor.
 * - default : small dot that follows mouse
 * - hover   : ring that expands on links / buttons
 * - view    : large lens "Scopri" on images and cards
 *
 * Hidden automatically on touch-only devices.
 */
export default function GlobalCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const pos = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });
  const [state, setState] = useState<CursorState>("default");
  const [mounted, setMounted] = useState(false);

  /* ── Tick (lerp position) ── */
  const tick = useCallback(() => {
    pos.current.x = lerp(pos.current.x, target.current.x, LERP_SPEED);
    pos.current.y = lerp(pos.current.y, target.current.y, LERP_SPEED);

    const { x, y } = pos.current;
    const translate = `translate3d(${x}px,${y}px,0)`;

    if (dotRef.current) dotRef.current.style.transform = translate;
    if (ringRef.current) ringRef.current.style.transform = translate;

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  /* ── Mouse tracking + state detection ── */
  useEffect(() => {
    // Skip on touch-only (SSR safe)
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    setMounted(true);
    // hide native cursor globally
    document.documentElement.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a, button, [role='button'], [data-cursor='view'], img, video, .group"
      ) as HTMLElement | null;

      if (!el) {
        setState("default");
        return;
      }

      // explicit override
      if (el.dataset.cursor === "view") {
        setState("view");
        return;
      }

      // images and cards with image children
      const isImageContext =
        el.tagName === "IMG" ||
        el.tagName === "VIDEO" ||
        el.closest("[data-cursor='view']") !== null ||
        (el.classList.contains("group") && el.querySelector("img") !== null);

      setState(isImageContext ? "view" : "hover");
    };

    const onOut = () => setState("default");
    const onDown = () => setState((s) => (s === "view" ? "view" : "hover"));
    const onUp = () => setState("default");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mouseout", onOut, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  if (!mounted) return null;

  return (
    <>
      {/* ── Dot (center, instantaneous) ── */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="global-cursor-dot"
        data-state={state}
      />

      {/* ── Ring (lags behind via lerp) ── */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="global-cursor-ring"
        data-state={state}
      >
        {state === "view" && <span>Scopri</span>}
      </div>
    </>
  );
}
