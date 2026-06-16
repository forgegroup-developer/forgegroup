"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { siteImages } from "@/data/images";

type VideoClickToPlayProps = {
  src: string;
  poster?: string;
  label: string;
  className?: string;
  priority?: boolean;
  roundedClassName?: string;
};

export default function VideoClickToPlay({
  src,
  poster = siteImages.videoPoster,
  label,
  className = "w-full block aspect-video object-cover",
  priority = false,
  roundedClassName = "rounded-3xl",
}: VideoClickToPlayProps) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => {
      void videoRef.current?.play();
    });
  };

  if (playing) {
    return (
      <video
        ref={videoRef}
        controls
        autoPlay
        preload="none"
        playsInline
        poster={poster}
        className={className}
      >
        <source src={src} type="video/mp4" />
        Il tuo browser non supporta il video.
      </video>
    );
  }

  return (
    <button
      type="button"
      onClick={handlePlay}
      className={`group relative block w-full overflow-hidden ${roundedClassName} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-corallo focus-visible:ring-offset-2`}
      aria-label={`Riproduci video: ${label}`}
    >
      <Image
        src={poster}
        alt={label}
        width={1280}
        height={720}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        className={className}
        sizes="(max-width: 1024px) 100vw, 574px"
      />
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center bg-brand-nero/20 transition-colors group-hover:bg-brand-nero/30"
        aria-hidden
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/90 bg-brand-corallo/95 shadow-lg transition-transform group-hover:scale-105">
          <svg className="ml-1 h-7 w-7 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
