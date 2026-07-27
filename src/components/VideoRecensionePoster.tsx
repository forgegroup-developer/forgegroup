import Image from "next/image";
import VideoPosterWithPlay from "@/components/VideoPosterWithPlay";
import { siteImages } from "@/data/images";

type VideoRecensionePosterProps = {
  src: string;
  label: string;
  priority?: boolean;
  videoClassName?: string;
};

export default function VideoRecensionePoster({
  src,
  label,
  priority = false,
  videoClassName = "w-full block aspect-video object-cover rounded-none",
}: VideoRecensionePosterProps) {
  return (
    <VideoPosterWithPlay
      src={src}
      poster={siteImages.videoPoster}
      label={label}
      className="relative w-full"
      videoClassName={videoClassName}
    >
      {/* Solo next/image: il <picture> con il JPG grezzo faceva scaricare due
          volte l'LCP (155 KB non ottimizzati in più su desktop) e su mobile
          bypassava del tutto AVIF/WebP. Con priority Next emette da sé il
          preload della variante ottimizzata. */}
      <Image
        src={siteImages.videoPoster}
        alt={label}
        width={1280}
        height={720}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        className="w-full block aspect-video object-cover"
        sizes="(max-width: 1023px) 100vw, 574px"
      />
    </VideoPosterWithPlay>
  );
}
