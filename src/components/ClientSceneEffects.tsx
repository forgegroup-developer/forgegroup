"use client";

import dynamic from "next/dynamic";

const IntroLoader = dynamic(() => import("@/components/IntroLoader"), { ssr: false });
const Logo3DBackground = dynamic(() => import("@/components/Logo3DBackground"), { ssr: false });

export default function ClientSceneEffects() {
  return (
    <>
      <IntroLoader />
      <Logo3DBackground />
    </>
  );
}
