"use client";

import dynamic from "next/dynamic";

const Logo3DBackground = dynamic(() => import("@/components/Logo3DBackground"), { ssr: false });

export default function ClientSceneEffects() {
  return <Logo3DBackground />;
}
