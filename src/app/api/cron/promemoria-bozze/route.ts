import { NextResponse } from "next/server";
import { promemoria } from "@/lib/redazione/telegram";

export const runtime = "nodejs";

/**
 * Chiamato da Vercel Cron alle 07:00 UTC: su Telegram le bozze di articolo ferme da più di
 * 2 giorni. Prende il posto di `telegram.mjs promemoria` sul Mac: gira solo quando
 * REDAZIONE_SU_VERCEL = "si", per non mandare il promemoria due volte nei giorni del passaggio.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (process.env.REDAZIONE_SU_VERCEL !== "si") return NextResponse.json({ saltato: "redazione ancora sul Mac" });
  return NextResponse.json({ bozzeFerme: await promemoria() });
}
