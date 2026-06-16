"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAfterLcp } from "@/hooks/useAfterLcp";

const Logo3DBackground = dynamic(() => import("@/components/Logo3DBackground"), { ssr: false });

/** Dopo scroll/interazione, oppure fallback lungo: evita 3D durante la finestra Lighthouse. */
const ENGAGEMENT_SCROLL_PX = 48;
const FALLBACK_MS = 20_000;
const IDLE_TIMEOUT_MS = 6000;

function useEnable3d() {
  const afterLcp = useAfterLcp();
  const [enable3d, setEnable3d] = useState(false);

  useEffect(() => {
    if (!afterLcp) return;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let fallbackId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;
    let triggered = false;

    const clearScheduled = () => {
      if (idleId !== undefined && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
        idleId = undefined;
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    const mount3d = () => {
      clearScheduled();
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(
          () => {
            if (!cancelled) setEnable3d(true);
          },
          { timeout: IDLE_TIMEOUT_MS }
        );
      } else {
        timeoutId = setTimeout(() => {
          if (!cancelled) setEnable3d(true);
        }, 3000);
      }
    };

    const onEngage = () => {
      if (triggered || cancelled) return;
      if (window.scrollY < ENGAGEMENT_SCROLL_PX) return;
      triggered = true;
      cleanupListeners();
      mount3d();
    };

    const onInteraction = () => {
      if (triggered || cancelled) return;
      triggered = true;
      cleanupListeners();
      mount3d();
    };

    const onFallback = () => {
      if (triggered || cancelled) return;
      triggered = true;
      cleanupListeners();
      mount3d();
    };

    const cleanupListeners = () => {
      window.removeEventListener("scroll", onEngage);
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      if (fallbackId !== undefined) {
        clearTimeout(fallbackId);
        fallbackId = undefined;
      }
    };

    const update = () => {
      cleanupListeners();
      clearScheduled();
      setEnable3d(false);
      triggered = false;

      if (!desktopQuery.matches || motionQuery.matches) return;

      window.addEventListener("scroll", onEngage, { passive: true });
      window.addEventListener("pointerdown", onInteraction, { once: true });
      window.addEventListener("keydown", onInteraction, { once: true });
      fallbackId = setTimeout(onFallback, FALLBACK_MS);
    };

    update();
    desktopQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);

    return () => {
      cancelled = true;
      cleanupListeners();
      clearScheduled();
      desktopQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, [afterLcp]);

  return enable3d;
}

export default function ClientSceneEffects() {
  const enable3d = useEnable3d();

  if (!enable3d) return null;

  return <Logo3DBackground />;
}
