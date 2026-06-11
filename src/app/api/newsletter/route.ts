import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`newsletter:${ip}`, 8, 60_000)) {
    return NextResponse.json(
      { success: false, message: "Troppe richieste. Riprova tra un minuto." },
      { status: 429 }
    );
  }

  let body: { email?: string; website?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Payload JSON non valido." }, { status: 400 });
  }

  if (body.website?.trim()) {
    return NextResponse.json({ success: true, message: "Iscrizione ricevuta." });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { success: false, message: "Inserisci un indirizzo email valido." },
      { status: 400 }
    );
  }

  const fromEmail = process.env.RESEND_FROM || "Forge Group <onboarding@resend.dev>";
  const toEmail = process.env.RESEND_TO || "info@forgegroup.it";
  const safeEmail = escapeHtml(email);

  const html = `<!DOCTYPE html>
<html lang="it">
<body style="font-family:Arial,sans-serif;background:#ffffff;margin:0;padding:24px;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #e8d5cc;border-radius:12px;overflow:hidden;">
    <div style="background:#c8502a;color:#fff;padding:20px 24px;">
      <p style="margin:0;font-size:18px;font-weight:700;">Nuova iscrizione newsletter</p>
    </div>
    <div style="padding:24px;font-size:15px;color:#111;">
      <p style="margin:0 0 8px;"><strong>Email:</strong> ${safeEmail}</p>
      <p style="margin:0;color:#4a4a4a;font-size:13px;">Iscrizione dal footer di www.forgegroup.it</p>
    </div>
  </div>
</body>
</html>`;

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.log("\n=== [DEV] NUOVA ISCRIZIONE NEWSLETTER ===");
      console.log(email);
      console.log("=========================================\n");
      return NextResponse.json({
        success: true,
        message: "Iscrizione ricevuta (modalità dev: email non inviata).",
      });
    }
    return NextResponse.json(
      { success: false, message: "Servizio non disponibile. Riprova più tardi." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Newsletter: nuova iscrizione (${email})`,
      html,
    });

    if (result.error) {
      console.error("Resend newsletter error:", result.error);
      return NextResponse.json(
        { success: false, message: "Errore durante l'iscrizione. Riprova." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Iscrizione ricevuta.",
    });
  } catch (err) {
    console.error("API newsletter error:", err);
    return NextResponse.json(
      { success: false, message: "Errore durante l'iscrizione. Riprova." },
      { status: 500 }
    );
  }
}
