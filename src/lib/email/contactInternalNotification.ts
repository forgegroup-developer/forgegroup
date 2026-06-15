const FIELD_LABELS: Record<string, string> = {
  nome_attivita: "Nome attività",
  occupazione: "Di cosa si occupa",
  ostacolo: "Ostacolo principale",
  acquisizione_attuale: "Come acquisisce clienti oggi",
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

export function buildContactInternalHtml(data: Record<string, string>): string {
  const rows = Object.entries(FIELD_LABELS)
    .map(([key, label]) => {
      const value = escapeHtml(String(data[key] ?? "n.d."));
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
  return `Nuova candidatura: ${data.nome_attivita} (${data.nome_cognome})`;
}
