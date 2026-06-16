import type { Metadata } from "next";
import VisionSection from "@/components/VisionSection";

export const metadata: Metadata = {
  title: "Visione",
  description:
    "La visione di Forge Group: perché entriamo nelle aziende, restiamo e costruiamo sistemi che reggono nel tempo. Lealtà, trasparenza e imprenditori con cui crescere.",
  alternates: { canonical: "/visione" },
  openGraph: {
    title: "Visione | Forge Group",
    description:
      "Manifesto Visione Forge Group: lavoro fianco a fianco con imprenditori B2B finché il sistema gira da solo.",
    url: "/visione",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group" }],
  },
  twitter: {
    card: "summary",
    title: "Visione | Forge Group",
    description: "La visione e il team di Forge Group.",
  },
};

export default function VisionePage() {
  return <VisionSection />;
};
