"use client";

import { useEffect, useState } from "react";

export function useAfterLcp(fallbackMs = 4000) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let done = false;

    const finish = () => {
      if (!done) {
        done = true;
        setReady(true);
      }
    };

    const fallback = window.setTimeout(finish, fallbackMs);

    if ("PerformanceObserver" in window) {
      try {
        const existing = performance.getEntriesByType("largest-contentful-paint");
        if (existing.length > 0) {
          finish();
          return () => window.clearTimeout(fallback);
        }

        const observer = new PerformanceObserver((list) => {
          if (list.getEntries().length > 0) {
            finish();
            observer.disconnect();
          }
        });
        observer.observe({ type: "largest-contentful-paint", buffered: true });

        return () => {
          window.clearTimeout(fallback);
          observer.disconnect();
        };
      } catch {
        // PerformanceObserver non supportato per LCP
      }
    }

    return () => window.clearTimeout(fallback);
  }, [fallbackMs]);

  return ready;
}
