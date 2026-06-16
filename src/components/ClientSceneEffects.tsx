"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Logo3DBackground = dynamic(() => import("@/components/Logo3DBackground"), { ssr: false });

function useEnable3d() {
  const [enable3d, setEnable3d] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setEnable3d(desktopQuery.matches && !motionQuery.matches);
    };

    update();
    desktopQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);

    return () => {
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
