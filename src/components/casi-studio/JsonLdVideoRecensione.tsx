import { absoluteUrl } from "@/lib/seo/site";
import { siteImages } from "@/data/images";
import type { CaseStudy } from "@/data/caseStudies";

/**
 * Dati strutturati della videorecensione.
 *
 * Serve a dire a Google e agli assistenti che quel file non e' un video
 * qualsiasi ma la testimonianza di un cliente con nome e cognome. Senza
 * questo, un video in pagina resta un rettangolo nero di cui nessuno sa
 * niente: qui invece diventa citabile.
 *
 * Si emette solo dove c'e' davvero un video, ed e' il video stesso a
 * garantire che la frase citata sia del cliente e non nostra. Dichiarare
 * come Review un testo scritto da noi sarebbe un dato falso, non
 * un'ottimizzazione.
 */
type Props = {
  caso: CaseStudy;
  /** Durata in secondi, dal file. */
  durataSecondi: number;
  /** Data di pubblicazione sul sito, formato ISO. */
  dataPubblicazione: string;
};

function iso8601(secondi: number) {
  const m = Math.floor(secondi / 60);
  const s = Math.round(secondi % 60);
  return `PT${m > 0 ? `${m}M` : ""}${s}S`;
}

export default function JsonLdVideoRecensione({
  caso,
  durataSecondi,
  dataPubblicazione,
}: Props) {
  if (!caso.videoUrl) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: `Videorecensione ${caso.shortTitle}: ${caso.resultHeadline}`,
    description: caso.metaDescription,
    thumbnailUrl: [absoluteUrl(siteImages.videoPoster)],
    uploadDate: dataPubblicazione,
    duration: iso8601(durataSecondi),
    contentUrl: absoluteUrl(caso.videoUrl),
    embedUrl: absoluteUrl(`/casi-studio/${caso.slug}`),
    inLanguage: "it",
    isFamilyFriendly: true,
    publisher: {
      "@type": "Organization",
      name: "Forge Group Italia",
      url: absoluteUrl("/"),
    },
    ...(caso.quote?.text
      ? {
          /* La recensione sta dentro il video: e' quello che il titolare
             dice davanti alla telecamera, non un testo che abbiamo
             scritto noi. Per questo il blocco si emette solo dove c'e'
             un video: e' il video a dimostrare che la frase e' sua.
             Senza video non si dichiara nessuna recensione, perche' un
             testo scritto da noi e marcato come Review e' un dato
             falso. */
          review: {
            "@type": "Review",
            reviewBody: caso.quote.text,
            author: {
              "@type": "Person",
              name: caso.quote.author,
              ...(caso.quote.role ? { jobTitle: caso.quote.role } : {}),
            },
            itemReviewed: {
              "@type": "Organization",
              name: "Forge Group Italia",
              url: absoluteUrl("/"),
            },
          },
        }
      : {}),
  };

  return (
    <script id="ld-video-recensione" type="application/ld+json">
      {JSON.stringify(jsonLd)}
    </script>
  );
}
