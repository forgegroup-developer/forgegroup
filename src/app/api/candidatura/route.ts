import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildCandidaturaInternalHtml,
  buildCandidaturaInternalSubject,
} from "@/lib/email/candidaturaInternalNotification";
import {
  FORGE_INTERNAL_EMAIL,
  getInternalNotificationEmail,
  getResendFromEmail,
} from "@/lib/email/resendConfig";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

const REQUIRED_FIELDS = ["nome_cognome", "email", "telefono", "occupazione", "racconto"] as const;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`candidatura:${ip}`, 5, 60_000)) {
    return NextResponse.json(
      { success: false, message: "Troppe richieste. Riprova tra un minuto." },
      { status: 429 }
    );
  }

  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Payload JSON non valido." }, { status: 400 });
  }

  if (data.website?.trim()) {
    return NextResponse.json({ success: true, message: "Candidatura inviata con successo." });
  }

  if (String(data.privacy) !== "true") {
    return NextResponse.json(
      { success: false, message: "Devi accettare la privacy policy per inviare la candidatura." },
      { status: 400 }
    );
  }

  const missing = REQUIRED_FIELDS.filter((f) => !data[f] || String(data[f]).trim() === "");
  if (missing.length) {
    return NextResponse.json(
      { success: false, message: "Compila tutti i campi obbligatori." },
      { status: 400 }
    );
  }

  const email = String(data.email).trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, message: "Inserisci un indirizzo email valido." },
      { status: 400 }
    );
  }

  const fromEmail = getResendFromEmail();
  const toEmail = getInternalNotificationEmail();

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.log("\n=== [DEV] CANDIDATURA TEAM (Resend non configurato) ===");
      console.log(JSON.stringify(data, null, 2));
      console.log("=== Destinatario:", toEmail, `(default: ${FORGE_INTERNAL_EMAIL})`, "===\n");
      return NextResponse.json({
        success: true,
        message: "Candidatura ricevuta (modalità dev: email non inviata).",
      });
    }
    return NextResponse.json(
      { success: false, message: "Servizio email non configurato. Riprova più tardi." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: buildCandidaturaInternalSubject(data),
      html: buildCandidaturaInternalHtml(data),
    });

    if (result.error) {
      console.error("Resend candidatura error:", result.error);
      return NextResponse.json(
        { success: false, message: "Errore durante l'invio. Riprova più tardi." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Grazie. Ti risponderemo presto.",
    });
  } catch (err) {
    console.error("API candidatura error:", err);
    return NextResponse.json(
      { success: false, message: "Errore durante l'elaborazione della richiesta." },
      { status: 500 }
    );
  }
}
