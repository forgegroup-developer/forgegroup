import Image from "next/image";
import { videoDisa } from "@/data/video";

/**
 * La videorecensione: il player di YouTube, così com'è.
 *
 * Fino al 04/11/2026 c'era una copertina nostra con il tasto corallo e un
 * velo scuro sopra: la scritta della copertina ("+300.000 €…") non si
 * leggeva bene (proprietà, 04/11). Ora si vede il player di YouTube con la
 * sua copertina e il suo tasto. youtube-nocookie, loading="lazy". I
 * sottotitoli sono impressi nel video.
 *
 * iubenda blocca l'iframe di YouTube finché il visitatore non accetta i
 * cookie: gli mette src="about:blank" e restava un riquadro nero. Sotto il
 * player c'è quindi la copertina, senza velo, che porta al video su YouTube:
 * chi non ha accettato vede quella; chi accetta vede il player sopra.
 * La regola CSS sta in globals.css (.cornice-video iframe[src="about:blank"]).
 *
 * Va dentro un contenitore `.cornice-video` (16:9, globals.css).
 */
type Props = {
  /** Testo per chi usa un lettore di schermo. */
  label: string;
  sizes?: string;
};

export default function VideoYouTube({
  label,
  sizes = "(min-width: 1024px) 52vw, 100vw",
}: Props) {
  return (
    <>
      <a
        href={videoDisa.url}
        target="_blank"
        rel="noopener"
        className="video-ripiego"
        aria-label={`Guarda su YouTube: ${label}`}
      >
        <Image src={videoDisa.copertina} alt={label} fill sizes={sizes} />
        <span className="video-ripiego-etichetta" aria-hidden>
          ▶ Guarda su YouTube
        </span>
      </a>
      <iframe
        src={`${videoDisa.embedUrl}?rel=0&modestbranding=1&playsinline=1`}
        title={`${videoDisa.titolo} · ${label}`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </>
  );
}
