"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import VideoPlayGlassButton from "@/components/VideoPlayGlassButton";

/**
 * Segnala globalmente se un video è in riproduzione, così il fondale gooey
 * della hero (CSS + rAF) può congelarsi ed evitare lo stutter su GPU deboli.
 * Contatore: più video contemporanei non si annullano a vicenda.
 */
let playingCount = 0;
function setVideoPlaying(active: boolean) {
  if (typeof document === "undefined") return;
  playingCount = Math.max(0, playingCount + (active ? 1 : -1));
  if (playingCount > 0) {
    document.documentElement.dataset.videoPlaying = "true";
  } else {
    delete document.documentElement.dataset.videoPlaying;
  }
}

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
  const signaledRef = useRef(false);

  const signal = (active: boolean) => {
    if (signaledRef.current === active) return;
    signaledRef.current = active;
    setVideoPlaying(active);
  };

  // Sicurezza: se il componente si smonta mentre il video è in play,
  // rilascia comunque il flag globale.
  useEffect(() => () => signal(false), []);

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
          onPlay={() => signal(true)}
          onPlaying={() => signal(true)}
          onPause={() => signal(false)}
          onEnded={() => signal(false)}
          onWaiting={() => signal(false)}
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
