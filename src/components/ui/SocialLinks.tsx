import { SOCIAL_PROFILES } from "@/lib/seo/site";

/**
 * I profili social di Forge Group, in un posto solo (proprietà, 09/11/2026:
 * "devi mettere i link di tutti i social"). Li usano il footer e /contatti;
 * gli stessi indirizzi finiscono nel `sameAs` dei dati strutturati.
 */
const SOCIAL = [
  { nome: "Instagram", href: SOCIAL_PROFILES.instagram, d: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.59-.07-4.74-.07zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96zm0 8.21a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46zm6.34-8.41a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0z" },
  { nome: "Facebook", href: SOCIAL_PROFILES.facebook, d: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.02 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.09 24 12.07z" },
  { nome: "LinkedIn", href: SOCIAL_PROFILES.linkedin, d: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" },
  { nome: "YouTube", href: SOCIAL_PROFILES.youtube, d: "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" },
] as const;

type Props = {
  /** "scuro": solo icone tonde, sul mattone del footer. "chiaro": icona e nome, su sfondo bianco. */
  variante?: "scuro" | "chiaro";
  className?: string;
};

export default function SocialLinks({ variante = "scuro", className = "" }: Props) {
  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`}>
      {SOCIAL.map((s) => (
        <li key={s.nome}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={variante === "scuro" ? `${s.nome} Forge Group` : undefined}
            className={
              variante === "scuro"
                ? "flex h-9 w-9 items-center justify-center rounded-full border border-white/60 text-white transition-colors hover:bg-white/15"
                : "inline-flex min-h-11 items-center gap-2 rounded-full border border-brand-bordo bg-brand-bianco px-4 py-2 text-sm font-semibold text-brand-nero transition-colors hover:border-brand-corallo"
            }
          >
            <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d={s.d} />
            </svg>
            {variante === "chiaro" && <span>{s.nome}</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}
