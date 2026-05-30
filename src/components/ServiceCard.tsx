import Link from "next/link";
import Image from "next/image";

export type ServiceLine = { text: string; highlights?: string[] };
export type Service = {
  label: string;
  lines: ServiceLine[];
  href: string;
  image: string;
};

export const services: Service[] = [
  {
    label: "01 — Acquisizione Clienti",
    lines: [
      { text: "I tuoi potenziali clienti esistono.", highlights: ["potenziali clienti"] },
      { text: "Il problema è che non ti trovano.", highlights: ["non ti trovano"] },
    ],
    href: "/servizi/advertising-lead-generation",
    image: "/images/servizi/magnete.png",
  },
  {
    label: "02 — Vendite & Processi Commerciali",
    lines: [
      { text: "Avere richieste non basta.", highlights: ["richieste"] },
      {
        text: "Il problema è quante ne stai davvero convertendo.",
        highlights: ["davvero convertendo"],
      },
    ],
    href: "/servizi/vendite-crm",
    image: "/images/servizi/bersaglio.png",
  },
  {
    label: "03 — Consulenza & Formazione",
    lines: [
      {
        text: "Stai crescendo, o stai solo lavorando di più?",
        highlights: ["crescendo", "lavorando di più"],
      },
    ],
    href: "/servizi/strategia-crescita",
    image: "/images/servizi/bussola.png",
  },
];

export const servicesReversed = [...services].reverse();

export function HighlightedText({ text, highlights }: { text: string; highlights?: string[] }) {
  if (!highlights?.length) return <>{text}</>;

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
      nodes.push(<span key={key++}>{remaining}</span>);
      break;
    }

    if (matchIndex > 0) {
      nodes.push(<span key={key++}>{remaining.slice(0, matchIndex)}</span>);
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
      </span>
    );
  }

  return <>{nodes}</>;
}

export default function ServiceCard({ item, compact = false }: { item: Service; compact?: boolean }) {
  return (
    <Link
      href={item.href}
      className={`group relative flex h-full ${
        compact ? "min-h-[440px]" : "min-h-[500px]"
      } flex-col overflow-hidden rounded-3xl border border-brand-bordo shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-corallo/40 hover:shadow-xl`}
    >
      <div className="absolute inset-0 bg-brand-panna" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 top-[22%] z-0">
        <Image
          src={item.image}
          alt={item.lines.map((l) => l.text).join(" ")}
          fill
          className="object-contain object-bottom transition-transform duration-[450ms] ease-out group-hover:scale-[1.03] drop-shadow-sm"
          sizes="(max-width: 1024px) 100vw, 320px"
        />
      </div>
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.82) 22%, rgba(251, 245, 242, 0.12) 42%, rgba(251, 245, 242, 0.08) 58%, rgba(255, 255, 255, 0.55) 82%, rgba(255, 255, 255, 0.92) 100%)",
        }}
        aria-hidden
      />
      <div className="relative z-[2] flex flex-1 flex-col justify-between p-8">
        <div className="flex flex-col gap-3">
          <span className="text-brand-corallo text-xs font-bold uppercase tracking-widest">
            {item.label}
          </span>
          <h3
            className={`font-bold leading-[1.1] text-brand-nero ${
              compact
                ? "text-2xl md:text-3xl lg:text-[2rem]"
                : "text-3xl md:text-4xl lg:text-[2.65rem]"
            }`}
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item.lines.map((line, lineIdx) => (
              <span key={line.text} className={lineIdx > 0 ? "block font-semibold mt-1" : undefined}>
                <HighlightedText text={line.text} highlights={line.highlights} />
              </span>
            ))}
          </h3>
        </div>
        <span className="inline-flex w-fit self-start items-center gap-1.5 rounded-full border-2 border-brand-corallo bg-transparent px-5 py-2.5 text-sm font-bold normal-case text-brand-corallo shadow-sm transition-all duration-200 group-hover:gap-3 group-hover:bg-brand-corallo/10">
          → Scopri come
        </span>
      </div>
    </Link>
  );
}
