import { absoluteUrl } from "@/lib/seo/site";
import { videoDisa } from "@/data/video";
import type { CaseStudy } from "@/data/caseStudies";

/**
 * Dati strutturati della videorecensione (YouTube).
 *
 * Serve a dire a Google e agli assistenti che quel video non è un video
 * qualsiasi ma la testimonianza di un cliente con nome e numeri. Con i
 * capitoli (Clip) Google può mostrare i "momenti chiave" nei risultati, e
 * le AI possono citare il punto preciso ("Il fatturato in 12 mesi").
 *
 * Si emette solo dove c'è davvero il video, ed è il video stesso a
 * garantire che la frase citata sia del cliente e non nostra. Dichiarare
 * come Review un testo scritto da noi sarebbe un dato falso, non
 * un'ottimizzazione.
 */
type Props = {
  caso: CaseStudy;
};

function iso8601(secondi: number) {
  const m = Math.floor(secondi / 60);
  const s = Math.round(secondi % 60);
  return `PT${m > 0 ? `${m}M` : ""}${s}S`;
}

export default function JsonLdVideoRecensione({ caso }: Props) {
  if (!caso.videoUrl) return null;

  const v = videoDisa;
  const capitoli = v.capitoli.map((c, i) => ({
    "@type": "Clip",
    name: c.titolo,
    startOffset: c.inizio,
    endOffset: v.capitoli[i + 1]?.inizio ?? v.durataSecondi,
    url: `${v.url}&t=${c.inizio}s`,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "@id": absoluteUrl(`/casi-studio/${caso.slug}#videorecensione`),
    name: v.titolo,
    description: v.descrizione,
    thumbnailUrl: [
      absoluteUrl(v.copertina),
      `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
    ],
    uploadDate: v.dataPubblicazione,
    duration: iso8601(v.durataSecondi),
    embedUrl: v.embedUrl,
    url: v.url,
    inLanguage: "it",
    isFamilyFriendly: true,
    keywords:
      "Meta Ads edilizia, marketing per imprese edili, videorecensione, Forge Group, DISA, SOS Appalti",
    about: {
      "@type": "Organization",
      name: "DISA SRL",
      description: "Software per l'edilizia: SOS Appalti, software per le gare d'appalto",
    },
    publisher: {
      "@type": "Organization",
      name: "Forge Group Italia",
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png") },
    },
    hasPart: capitoli,
    ...(caso.quote?.text
      ? {
          /* La recensione sta dentro il video: è quello che il titolare
             dice davanti alla telecamera, non un testo che abbiamo
             scritto noi. */
          review: {
            "@type": "Review",
            reviewBody: caso.quote.text,
            author: {
              "@type": "Organization",
              name: caso.quote.author,
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
