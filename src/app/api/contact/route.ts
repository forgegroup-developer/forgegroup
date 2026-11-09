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
import { SORGENTI_RIQUADRO } from "@/data/candidatura";

export const runtime = "nodejs";

// Modulo in due schermate dal 09/11/2026: impresa e zona, poi nome e telefono.
// L'email non serve per partire (la chiamata la facciamo noi); ostacolo e fonte
// arrivano dopo l'invio, facoltativi, da /api/contact/dettagli.
const CAMPI_MODULO = ["nome_attivita", "zona", "nome_cognome", "telefono"] as const;
// Il riquadro "ti chiamiamo noi" chiede solo nome e telefono (impresa e zona facoltativi).
const CAMPI_RIQUADRO = ["nome_cognome", "telefono"] as const;

const EMAIL_VALIDA = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Solo il percorso della pagina, corto: è un dato tecnico, non personale. */
function pulisciPagina(v: unknown): string {
  const s = String(v ?? "").trim();
  return /^\/[\w\-/]{0,120}$/.test(s) ? s : "";
}

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

  const sorgente = String(data.sorgente ?? "").trim().slice(0, 40) || "contatti";
  const daRiquadro = (SORGENTI_RIQUADRO as readonly string[]).includes(sorgente);
  const richiesti = daRiquadro ? CAMPI_RIQUADRO : CAMPI_MODULO;
  data.sorgente = sorgente;
  data.pagina = pulisciPagina(data.pagina);

  if (String(data.telefono ?? "").replace(/\D/g, "").length < 8) {
    return NextResponse.json(
      { success: false, message: "Controlla il numero di telefono: sembra incompleto." },
      { status: 400 }
    );
  }

  const missing = richiesti.filter((f) => !data[f] || String(data[f]).trim() === "");
  if (missing.length) {
    return NextResponse.json(
      { success: false, message: `Campi obbligatori mancanti: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const fromEmail = process.env.RESEND_FROM || "Forge Group <onboarding@resend.dev>";
  const toEmail = process.env.RESEND_TO || "info@forgegroup.it";
  const candidateEmail = String(data.email ?? "").trim();
  const emailValida = EMAIL_VALIDA.test(candidateEmail);

  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === "development") {
      console.log("\n=== [DEV] NUOVA CANDIDATURA (Resend non configurato) ===");
      console.log(JSON.stringify(data, null, 2));
      console.log("=== Mittente:", fromEmail, "Destinatario:", toEmail, "===");
      console.log("=== Auto-reply a:", emailValida ? candidateEmail : "(nessuna email)", "===\n");
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
      ...(emailValida ? { replyTo: candidateEmail } : {}),
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

    // La conferma per email parte solo se l'email c'è: dal 09/11 è facoltativa.
    const autoReplyResult = !emailValida
      ? null
      : await resend.emails.send({
      from: fromEmail,
      to: [candidateEmail],
      replyTo: toEmail,
      subject: buildContactAutoReplySubject(),
      html: buildContactAutoReplyHtml(data.nome_cognome),
      text: buildContactAutoReplyText(data.nome_cognome),
    });

    if (autoReplyResult?.error) {
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
