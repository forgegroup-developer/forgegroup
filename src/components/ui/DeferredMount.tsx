"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type DeferredMountProps = {
  children: ReactNode;
  minHeight?: string;
  rootMargin?: string;
  className?: string;
};

export default function DeferredMount({
  children,
  minHeight = "240px",
  rootMargin = "280px 0px",
  className = "",
}: DeferredMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMounted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={mounted ? undefined : { minHeight }}
    >
      {mounted ? children : null}
    </div>
  );
}
