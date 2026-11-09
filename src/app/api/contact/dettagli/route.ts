import { NextResponse } from "next/server";
import { Resend } from "resend";
import { OPZIONI_FONTE, OPZIONI_OSTACOLO } from "@/data/candidatura";
import {
  buildContactDetailsHtml,
  buildContactDetailsSubject,
} from "@/lib/email/contactInternalNotification";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

/**
 * Le due domande facoltative dopo l'invio della candidatura (09/11/2026).
 * Non c'è un database: le risposte partono in una seconda mail interna,
 * con nome e telefono per affiancarle alla candidatura.
 */
export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`contact-dettagli:${ip}`, 5, 60_000)) {
    return NextResponse.json({ success: false }, { status: 429 });
  }

  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const ostacolo = (OPZIONI_OSTACOLO as readonly string[]).includes(data.ostacolo) ? data.ostacolo : "";
  const fonte = (OPZIONI_FONTE as readonly string[]).includes(data.fonte) ? data.fonte : "";
  const nome = String(data.nome_cognome ?? "").trim().slice(0, 120);
  const telefono = String(data.telefono ?? "").trim().slice(0, 40);
  if ((!ostacolo && !fonte) || !nome || !telefono) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const pulito = {
    nome_cognome: nome,
    telefono,
    nome_attivita: String(data.nome_attivita ?? "").trim().slice(0, 160),
    ostacolo,
    fonte,
  };

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.log("\n=== [DEV] DETTAGLI CANDIDATURA ===\n", JSON.stringify(pulito, null, 2));
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ success: false }, { status: 500 });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const r = await resend.emails.send({
      from: process.env.RESEND_FROM || "Forge Group <onboarding@resend.dev>",
      to: [process.env.RESEND_TO || "info@forgegroup.it"],
      subject: buildContactDetailsSubject(pulito),
      html: buildContactDetailsHtml(pulito),
    });
    if (r.error) {
      console.error("Resend dettagli error:", r.error);
      return NextResponse.json({ success: false }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API contact/dettagli error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
