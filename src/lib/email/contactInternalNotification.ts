const FIELD_LABELS: Record<string, string> = {
  nome_attivita: "Nome attività",
  zona: "Zona",
  ostacolo: "Ostacolo principale",
  fonte: "Come ci ha conosciuto",
  nome_cognome: "Nome e Cognome",
  telefono: "Telefono",
  email: "Email",
  sorgente: "Da dove",
  pagina: "Pagina",
};

/** Come si legge la sorgente nella mail: il nome tecnico resta per GA4. */
const SORGENTI_LEGGIBILI: Record<string, string> = {
  contatti: "Modulo della pagina Contatti",
  inizia: "Modulo della landing /inizia",
  "riquadro-ritorno": "Riquadro \"ti chiamiamo noi\" dopo il tocco su WhatsApp",
  "riquadro-uscita": "Riquadro \"ti chiamiamo noi\" all'uscita dal sito",
};

function valore(data: Record<string, string>, key: string): string {
  const v = String(data[key] ?? "").trim();
  if (key === "sorgente") return SORGENTI_LEGGIBILI[v] ?? (v || "n.d.");
  return v || "n.d.";
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildContactInternalHtml(data: Record<string, string>): string {
  const rows = Object.entries(FIELD_LABELS)
    .map(([key, label]) => {
      const value = escapeHtml(valore(data, key));
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
      <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:2px;opacity:0.85;">✦ Forge Group: Nuova candidatura</p>
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

export function buildContactInternalSubject(data: Record<string, string>): string {
  const impresa = String(data.nome_attivita ?? "").trim() || "impresa da chiedere";
  return `Nuova candidatura: ${impresa} (${data.nome_cognome})`;
}

/**
 * Le risposte facoltative date dopo l'invio (ostacolo, come ci ha
 * conosciuto). Arrivano in una seconda mail, con lo stesso nome e
 * telefono, così si affiancano alla candidatura nella casella.
 */
export function buildContactDetailsSubject(data: Record<string, string>): string {
  const impresa = String(data.nome_attivita ?? "").trim() || "impresa da chiedere";
  return `Dettagli candidatura: ${impresa} (${data.nome_cognome})`;
}

export function buildContactDetailsHtml(data: Record<string, string>): string {
  const righe: [string, string][] = [
    ["Nome e Cognome", valore(data, "nome_cognome")],
    ["Telefono", valore(data, "telefono")],
    ["Nome attività", valore(data, "nome_attivita")],
    ["Ostacolo principale", valore(data, "ostacolo")],
    ["Come ci ha conosciuto", valore(data, "fonte")],
  ];
  const rows = righe
    .map(
      ([label, v]) => `
        <tr>
          <td style="padding:12px 16px;background:#fbf5f2;font-weight:600;color:#111;border-bottom:1px solid #e8d5cc;width:35%;vertical-align:top;">${label}</td>
          <td style="padding:12px 16px;color:#111;border-bottom:1px solid #e8d5cc;vertical-align:top;">${escapeHtml(v)}</td>
        </tr>`,
    )
    .join("");
  return `<!DOCTYPE html>
<html lang="it">
<body style="font-family:Arial,sans-serif;background:#ffffff;margin:0;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #e8d5cc;border-radius:12px;overflow:hidden;">
    <div style="background:#c8502a;color:#fff;padding:24px 28px;">
      <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:2px;opacity:0.85;">✦ Forge Group: dettagli candidatura</p>
      <h1 style="margin:0;font-size:22px;font-weight:800;">Risposte date dopo l'invio</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      ${rows}
    </table>
  </div>
</body>
</html>`;
}
