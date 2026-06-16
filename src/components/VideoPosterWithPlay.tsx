"use client";

import { type ReactNode, useRef, useState } from "react";
import VideoPlayGlassButton from "@/components/VideoPlayGlassButton";

/**
 * Click-to-play unico per tutti i video del sito.
 * Usato da: HeroVideoRecensione, VideoRecensionePoster, ReelHeroVideo (home, servizi, casi studio).
 */
type VideoPosterWithPlayProps = {
  src: string;
  poster: string;
  label: string;
  children: ReactNode;
  className?: string;
  videoClassName?: string;
};

export default function VideoPosterWithPlay({
  src,
  poster,
  label,
  children,
  className = "relative w-full",
  videoClassName = "w-full block aspect-video object-cover",
}: VideoPosterWithPlayProps) {
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
      <div className={className}>
        <video
          ref={videoRef}
          controls
          autoPlay
          preload="none"
          playsInline
          poster={poster}
          className={videoClassName}
        >
          <source src={src} type="video/mp4" />
          Il tuo browser non supporta il video.
        </video>
      </div>
    );
  }

  return (
    <div className={className}>
      {children}
      <button
        type="button"
        onClick={handlePlay}
        className="group absolute inset-0 flex items-center justify-center bg-brand-nero/20 transition-colors hover:bg-brand-nero/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-corallo focus-visible:ring-offset-2"
        aria-label={`Riproduci video: ${label}`}
      >
        <VideoPlayGlassButton />
      </button>
    </div>
  );
}
