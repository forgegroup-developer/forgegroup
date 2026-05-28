import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const FIELD_LABELS: Record<string, string> = {
  nome_attivita: "Nome attività",
  occupazione: "Di cosa si occupa",
  fatturato: "Fatturato annuo",
  ostacolo: "Ostacolo principale",
  acquisizione_attuale: "Come acquisisce clienti oggi",
  reparto_commerciale: "Reparto commerciale",
  dipendenti: "Numero dipendenti/collaboratori",
  tempistiche: "Quando vuole iniziare",
  budget: "Budget mensile Marketing & Vendite",
  ruolo: "Ruolo in azienda",
  provenienza: "Come ci ha conosciuti",
  nome_cognome: "Nome e Cognome",
  telefono: "Telefono",
  email: "Email",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtml(data: Record<string, string>): string {
  const rows = Object.entries(FIELD_LABELS)
    .map(([key, label]) => {
      const value = escapeHtml(String(data[key] ?? "—"));
      return `
        <tr>
          <td style="padding:12px 16px;background:#fbf5f2;font-weight:600;color:#111;border-bottom:1px solid #e8d5cc;width:35%;vertical-align:top;">${label}</td>
          <td style="padding:12px 16px;color:#111;border-bottom:1px solid #e8d5cc;vertical-align:top;white-space:pre-wrap;">${value}</td>
        </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="it">
<body style="font-family:Arial,sans-serif;background:#ffffff;margin:0;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e8d5cc;border-radius:12px;overflow:hidden;">
    <div style="background:#c8502a;color:#fff;padding:24px 28px;">
      <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:2px;opacity:0.85;">✦ Forge Group — Nuova candidatura</p>
      <h1 style="margin:0;font-size:24px;font-weight:800;">Nuovo lead di prequalifica</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${rows}
    </table>
    <div style="padding:20px 28px;background:#fbf5f2;font-size:12px;color:#4a4a4a;">
      Lead generato dal form di candidatura su <strong>www.forgegroup.it</strong>.
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: Request) {
  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: "Payload JSON non valido." }, { status: 400 });
  }

  const requiredFields: (keyof typeof FIELD_LABELS)[] = [
    "nome_attivita",
    "occupazione",
    "fatturato",
    "ostacolo",
    "acquisizione_attuale",
    "reparto_commerciale",
    "dipendenti",
    "tempistiche",
    "budget",
    "ruolo",
    "provenienza",
    "nome_cognome",
    "telefono",
    "email",
  ];

  const missing = requiredFields.filter((f) => !data[f] || String(data[f]).trim() === "");
  if (missing.length) {
    return NextResponse.json(
      { success: false, message: `Campi obbligatori mancanti: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const html = buildHtml(data);
  const subject = `Nuova candidatura: ${data.nome_attivita} (${data.fatturato})`;
  const fromEmail = process.env.RESEND_FROM || "Forge Group <onboarding@resend.dev>";
  const toEmail = process.env.RESEND_TO || "info@forgegroup.it";

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.log("\n=== [DEV] NUOVA CANDIDATURA (Resend non configurato) ===");
      console.log(JSON.stringify(data, null, 2));
      console.log("=== Mittente:", fromEmail, "Destinatario:", toEmail, "===\n");
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
      replyTo: data.email,
      subject,
      html,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        { success: false, message: "Errore durante l'invio dell'email." },
        { status: 500 }
      );
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
