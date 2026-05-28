"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Wraps children in a container that shows a circular magnetic cursor lens
 * when the user hovers over the area on non-touch devices.
 */
export default function MagneticCursor({
  children,
  label = "Scopri",
  className = "",
}: {
  children: React.ReactNode;
  label?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.15);
    posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.15);

    if (cursorRef.current) {
      cursorRef.current.style.left = `${posRef.current.x}px`;
      cursorRef.current.style.top = `${posRef.current.y}px`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    targetRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseEnter = useCallback(() => {
    setVisible(true);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const handleMouseLeave = useCallback(() => {
    setVisible(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      {/* Cursor element — fixed, follows mouse via JS */}
      <div
        ref={cursorRef}
        className={`magnetic-cursor${visible ? " visible" : ""}`}
        aria-hidden="true"
      >
        {label}
      </div>

      <div
        ref={containerRef}
        className={`services-magnetic-area ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{}}

      >
        {children}
      </div>
    </>
  );
}
