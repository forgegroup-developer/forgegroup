"use client";

import { useState } from "react";
import Image from "next/image";
import { videoDisa } from "@/data/video";

/**
 * La videorecensione da YouTube, caricata solo al clic.
 *
 * Fino al clic c'è solo la copertina (la stessa di YouTube, servita da noi):
 * niente script né cookie di YouTube, niente peso sulla pagina. Al clic parte
 * il player di youtube-nocookie, già in riproduzione. I sottotitoli sono
 * impressi nel video, quindi si leggono anche senza audio.
 *
 * Va dentro un contenitore `.cornice-video` (16:9, globals.css).
 */
type Props = {
  /** Testo per chi non vede la copertina. */
  label: string;
  sizes?: string;
  priority?: boolean;
};

export default function VideoYouTube({
  label,
  sizes = "(min-width: 1024px) 52vw, 100vw",
  priority = false,
}: Props) {
  const [attivo, setAttivo] = useState(false);

  if (attivo) {
    return (
      <iframe
        src={`${videoDisa.embedUrl}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
        title={videoDisa.titolo}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" onClick={() => setAttivo(true)} className="avvia-video">
      <Image src={videoDisa.copertina} alt={label} fill sizes={sizes} priority={priority} />
      <span className="avvia-video-tasto" aria-hidden>
        ▶
      </span>
      <span className="sr-only">Guarda la videorecensione: {label}</span>
    </button>
  );
}
