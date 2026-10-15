import { timingSafeEqual } from "node:crypto";
import { after, NextResponse } from "next/server";
import { gestisci } from "@/lib/redazione/telegram";

export const runtime = "nodejs";
export const maxDuration = 300;

/**
 * Webhook del bot Telegram del Redattore: i tasti (Vai, Correggi, Scarta, Ritira, copertine)
 * e le correzioni scritte. Telegram firma ogni chiamata con l'header
 * X-Telegram-Bot-Api-Secret-Token = TELEGRAM_WEBHOOK_SECRET; senza, 401.
 * Si risponde subito a Telegram e il lavoro continua dopo (`after`), così Telegram non ripete
 * la chiamata mentre GitHub sta ancora unendo la PR.
 */
function stessoSegreto(a: string | null, b: string | undefined) {
  if (!a || !b) return false;
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export async function POST(request: Request) {
  if (!stessoSegreto(request.headers.get("x-telegram-bot-api-secret-token"), process.env.TELEGRAM_WEBHOOK_SECRET?.trim())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const aggiornamento = await request.json().catch(() => null);
  if (aggiornamento) {
    after(async () => {
      try {
        await gestisci(aggiornamento);
      } catch (e) {
        console.error("telegram:", e instanceof Error ? e.message : e);
      }
    });
  }
  return NextResponse.json({ ok: true });
}
