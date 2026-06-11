"use client";

import { type ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function HandDrawnUnderline({ children, className = "" }: Props) {
  const { ref, visible } = useScrollReveal<HTMLSpanElement>(0.35);

  return (
    <span
      ref={ref}
      className={`hand-drawn-underline relative inline text-brand-corallo ${className}`.trim()}
    >
      {children}
      <svg
        className="hand-drawn-underline-svg"
        viewBox="0 0 240 14"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          className={
            visible
              ? "hand-drawn-underline-path is-visible"
              : "hand-drawn-underline-path"
          }
          d="M3 9 C28 3, 52 11, 78 7 S128 4, 168 8 S210 5, 237 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
