const FIELD_LABELS: Record<string, string> = {
  nome_cognome: "Nome e cognome",
  email: "Email",
  telefono: "Telefono",
  occupazione: "Di cosa ti occupi",
  racconto: "Chi sei e cosa porti",
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildCandidaturaInternalSubject(data: Record<string, string>): string {
  const name = String(data.nome_cognome ?? "").trim() || "Nuova candidatura";
  return `Forge Group | Entra a far parte — ${name}`;
}

export function buildCandidaturaInternalHtml(data: Record<string, string>): string {
  const rows = Object.entries(FIELD_LABELS)
    .map(([key, label]) => {
      const raw = String(data[key] ?? "").trim();
      const value = escapeHtml(raw || "n.d.");
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
      <p style="margin:0 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:2px;opacity:0.85;">✦ Forge Group: Entra a far parte</p>
      <h1 style="margin:0;font-size:24px;font-weight:800;">Nuova candidatura team / community</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tbody>${rows}</tbody>
    </table>
  </div>
</body>
</html>`;
}
