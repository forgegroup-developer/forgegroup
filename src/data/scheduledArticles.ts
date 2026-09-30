import type { Article } from "@/data/articles";

/**
 * Articoli programmati — pubblicazione automatica via publishAt + Vercel Cron.
 * Orari: 09:00 ora di Roma (07:00 UTC, luglio = CEST).
 */
export const scheduledArticles: Article[] = [
  // Vuoto dal 30/09/2026: le quattro rimaste sono state riscritte come file in
  // content/articoli/ (riscrittura), le altre ritirate con redirect (next.config.ts).
];
