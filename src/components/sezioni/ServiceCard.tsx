import Link from "next/link";
import Image from "next/image";

export type ServiceLine = { text: string; highlights?: string[] };
export type Service = {
  label: string;
  lines: ServiceLine[];
  /** La risposta al problema del titolo: cosa facciamo, detto in pratica (Scheda dei fatti). */
  soluzione: string;
  href: string;
  image: string;
};

/**
 * I titoli dicono il problema, non il servizio: "Acquisizione clienti" e
 * "Processi di vendita" sono categorie da agenzia, e un imprenditore edile
 * non si racconta la giornata con quelle parole.
 */
export const services: Service[] = [
  {
    label: "01 · Le richieste",
    lines: [
      { text: "Il lavoro lo sai fare.", highlights: ["lavoro"] },
      { text: "Ma chi ti cerca, ti trova?", highlights: ["ti trova"] },
    ],
    soluzione:
      "Le campagne su Meta e Google le gestiamo noi, con i video girati nei tuoi cantieri. Ogni richiesta ti arriva già filtrata.",
    href: "/servizi#acquisizione",
    image: "/images/servizi/magnete.webp",
  },
  {
    label: "02 · La trattativa",
    lines: [
      {
        text: "Sopralluogo fatto, preventivo mandato.",
        highlights: ["preventivo mandato"],
      },
      {
        text: "E poi più nessuno che richiama.",
        highlights: ["nessuno che richiama"],
      },
    ],
    soluzione:
      "Scriviamo con te il processo di vendita, e ogni settimana guardiamo insieme le trattative una per una.",
    href: "/servizi#vendite",
    image: "/images/servizi/bersaglio.webp",
  },
  {
    label: "03 · I numeri",
    lines: [
      {
        text: "Stai crescendo, o stai solo lavorando di più?",
        highlights: ["crescendo", "lavorando di più"],
      },
    ],
    soluzione:
      "Nel gestionale vedi quante richieste arrivano, quante firmano e quanto ti rende ogni euro di pubblicità.",
    href: "/servizi#consulenza",
    image: "/images/servizi/bussola.webp",
  },
];

export const servicesReversed = [...services].reverse();

export function HighlightedText({
  text,
  highlights,
}: {
  text: string;
  highlights?: string[];
}) {
  if (!highlights?.length)
    return <span className="text-brand-nero">{text}</span>;

  const nodes: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    let matchIndex = -1;
    let matchedHighlight = "";

    for (const highlight of highlights) {
      const idx = remaining.indexOf(highlight);
      if (idx !== -1 && (matchIndex === -1 || idx < matchIndex)) {
        matchIndex = idx;
        matchedHighlight = highlight;
      }
    }

    if (matchIndex === -1) {
      nodes.push(
        <span key={key++} className="text-brand-nero">
          {remaining}
        </span>,
      );
      break;
    }

    if (matchIndex > 0) {
      nodes.push(
        <span key={key++} className="text-brand-nero">
          {remaining.slice(0, matchIndex)}
        </span>,
      );
    }

    let highlighted = matchedHighlight;
    remaining = remaining.slice(matchIndex + matchedHighlight.length);

    const trailingPunct = remaining.match(/^[.,!?;:]+/);
    if (trailingPunct) {
      highlighted += trailingPunct[0];
      remaining = remaining.slice(trailingPunct[0].length);
    }

    nodes.push(
      <span key={key++} className="text-brand-corallo">
        {highlighted}
      </span>,
    );
  }

  return <>{nodes}</>;
}

/**
 * La scheda: prima l'illustrazione, in uno spazio suo, poi il problema detto
 * come domanda e la risposta in una riga. Prima l'immagine stava sotto il
 * titolo a tutta altezza e le parole in corallo ci finivano sopra, e non si
 * leggevano (proprietà, 29/09).
 */
export default function ServiceCard({
  item,
}: {
  item: Service;
  compact?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className="superficie-chiara group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-bordo bg-brand-bianco shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-corallo/40 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] bg-brand-bianco">
        <Image
          src={item.image}
          alt=""
          fill
          className="object-contain object-bottom p-4 pb-0 transition-transform duration-[450ms] ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 360px"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-7">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-corallo-text">
          {item.label}
        </span>
        <h3 className="font-display text-2xl font-bold leading-tight text-brand-nero md:text-[1.7rem]">
          {item.lines.map((line) => (
            <span key={line.text} className="block">
              <HighlightedText text={line.text} highlights={line.highlights} />
            </span>
          ))}
        </h3>
        <p className="text-[0.98rem] leading-relaxed text-brand-grigio">
          {item.soluzione}
        </p>
        <div className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-brand-corallo bg-transparent px-5 py-2.5 text-sm font-bold text-[color:var(--color-brand-corallo-text)] transition-all duration-200 group-hover:gap-3 group-hover:bg-brand-corallo/10">
          → Scopri come
        </div>
      </div>
    </Link>
  );
}
