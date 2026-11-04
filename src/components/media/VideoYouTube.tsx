import { videoDisa } from "@/data/video";

/**
 * La videorecensione: il player di YouTube, così com'è.
 *
 * Fino al 04/11/2026 c'era una copertina nostra con il tasto corallo e un
 * velo scuro sopra: la scritta della copertina ("+300.000 €…") non si
 * leggeva bene (proprietà, 04/11). Ora si vede il player di YouTube con la
 * sua copertina e il suo tasto. youtube-nocookie: niente cookie di YouTube
 * finché il video non parte; loading="lazy": il player si carica solo
 * quando la sezione si avvicina allo schermo. I sottotitoli sono impressi
 * nel video.
 *
 * Va dentro un contenitore `.cornice-video` (16:9, globals.css).
 */
type Props = {
  /** Testo per chi usa un lettore di schermo. */
  label: string;
};

export default function VideoYouTube({ label }: Props) {
  return (
    <iframe
      src={`${videoDisa.embedUrl}?rel=0&modestbranding=1&playsinline=1`}
      title={`${videoDisa.titolo} · ${label}`}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}
