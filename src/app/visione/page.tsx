import type { Metadata } from "next";
import VisionSection from "@/components/sezioni/VisionSection";

export const metadata: Metadata = {
  title: "Lavora con noi",
  description:
    "La visione di Forge Group: entriamo nelle imprese, restiamo e costruiamo sistemi che reggono nel tempo. Lealtà, trasparenza, imprenditori con cui crescere.",
  alternates: { canonical: "/visione" },
  openGraph: {
    title: "Lavora con noi | Forge Group",
    description:
      "Lavora con noi | Forge Group: lavoriamo fianco a fianco con imprenditori edili finché il sistema gira da solo.",
    url: "/visione",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group" }],
  },
  twitter: {
    card: "summary",
    title: "Lavora con noi | Forge Group",
    description: "La visione e il team di Forge Group.",
  },
};

export default function VisionePage() {
  return <VisionSection />;
}
