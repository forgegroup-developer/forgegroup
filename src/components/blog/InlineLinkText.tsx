import Link from "next/link";
import { Fragment } from "react";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Renderizza testo semplice con supporto per link interni in sintassi
 * markdown minimale: `[etichetta](/percorso)`. Usato nei blocchi articolo
 * per creare internal link contestuali senza introdurre HTML grezzo.
 */
export default function InlineLinkText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<Fragment key={key++}>{text.slice(lastIndex, match.index)}</Fragment>);
    }
    const [, label, href] = match;
    const isInternal = href.startsWith("/");
    parts.push(
      <Link
        key={key++}
        href={href}
        className="font-semibold text-brand-corallo underline underline-offset-2 hover:opacity-80"
        {...(!isInternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(<Fragment key={key++}>{text.slice(lastIndex)}</Fragment>);
  }

  return <>{parts}</>;
}
