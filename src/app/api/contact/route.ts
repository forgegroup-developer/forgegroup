import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  buildContactAutoReplyHtml,
  buildContactAutoReplySubject,
  buildContactAutoReplyText,
} from "@/lib/email/contactAutoReply";
import {
  buildContactInternalHtml,
  buildContactInternalSubject,
} from "@/lib/email/contactInternalNotification";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

const REQUIRED_FIELDS = [
  "nome_attivita",
  "occupazione",
  "ostacolo",
  "acquisizione_attuale",
  "nome_cognome",
  "telefono",
  "email",
] as const;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`contact:${ip}`, 5, 60_000)) {
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

  const missing = REQUIRED_FIELDS.filter((f) => !data[f] || String(data[f]).trim() === "");
  if (missing.length) {
    return NextResponse.json(
      { success: false, message: `Campi obbligatori mancanti: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const fromEmail = process.env.RESEND_FROM || "Forge Group <onboarding@resend.dev>";
  const toEmail = process.env.RESEND_TO || "info@forgegroup.it";
  const candidateEmail = String(data.email).trim();

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.log("\n=== [DEV] NUOVA CANDIDATURA (Resend non configurato) ===");
      console.log(JSON.stringify(data, null, 2));
      console.log("=== Mittente:", fromEmail, "Destinatario:", toEmail, "===");
      console.log("=== Auto-reply a:", candidateEmail, "===\n");
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

    const internalResult = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: candidateEmail,
      subject: buildContactInternalSubject(data),
      html: buildContactInternalHtml(data),
    });

    if (internalResult.error) {
      console.error("Resend internal notification error:", internalResult.error);
      return NextResponse.json(
        { success: false, message: "Errore durante l'invio dell'email." },
        { status: 500 }
      );
    }

    const autoReplyResult = await resend.emails.send({
      from: fromEmail,
      to: [candidateEmail],
      replyTo: toEmail,
      subject: buildContactAutoReplySubject(),
      html: buildContactAutoReplyHtml(data.nome_cognome),
      text: buildContactAutoReplyText(data.nome_cognome),
    });

    if (autoReplyResult.error) {
      console.error("Resend auto-reply error:", autoReplyResult.error);
    }

    return NextResponse.json({
      success: true,
      message: "Candidatura inviata con successo.",
    });
  } catch (err) {
    console.error("API contact error:", err);
    return NextResponse.json(
      { success: false, message: "Errore durante l'elaborazione della richiesta." },
      { status: 500 }
    );
  }
}
