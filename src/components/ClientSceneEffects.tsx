"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Logo3DBackground = dynamic(() => import("@/components/Logo3DBackground"), { ssr: false });

function useEnable3d() {
  const [enable3d, setEnable3d] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

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

    const scheduleMount = () => {
      clearScheduled();
      const mount = () => {
        if (!cancelled) setEnable3d(true);
      };

      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(mount, { timeout: 3000 });
      } else {
        timeoutId = setTimeout(mount, 2000);
      }
    };

    const update = () => {
      clearScheduled();
      if (!desktopQuery.matches || motionQuery.matches) {
        setEnable3d(false);
        return;
      }
      scheduleMount();
    };

    update();
    desktopQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);

    return () => {
      cancelled = true;
      clearScheduled();
      desktopQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return enable3d;
}

export default function ClientSceneEffects() {
  const enable3d = useEnable3d();

  if (!enable3d) return null;

  return <Logo3DBackground />;
}
