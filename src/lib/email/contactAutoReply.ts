import { absoluteUrl } from "@/lib/seo/site";

const VIDEO_URL = absoluteUrl("/video-recensione.mp4");
const VIDEO_POSTER = absoluteUrl("/images/video-recensione-poster.jpg");

function firstName(nomeCognome: string): string {
  const trimmed = nomeCognome.trim();
  if (!trimmed) return "imprenditore";
  return trimmed.split(/\s+/)[0] ?? trimmed;
}

function paragraph(text: string): string {
  return `<p style="margin:0 0 20px;font-size:16px;line-height:1.7;color:#333333;">${text}</p>`;
}

function heading(text: string): string {
  return `<h2 style="margin:32px 0 16px;font-size:20px;font-weight:800;color:#111111;line-height:1.35;">${text}</h2>`;
}

export function buildContactAutoReplySubject(): string {
  return "Abbiamo ricevuto la tua candidatura | Forge Group";
}

/*
 * La mail che parte a chi compila il modulo. Riscritta il 29/09/2026 sul
 * messaggio della landing /inizia: chi chiama (Gianpio) e quando, cosa
 * succede dopo, una domanda da portarsi alla chiamata. Niente promesse sul
 * fatturato, niente "B2B": solo i fatti della Scheda.
 */
const INIZIA_URL = absoluteUrl("/inizia");

export function buildContactAutoReplyText(nomeCognome: string): string {
  const nome = firstName(nomeCognome);

  return `Ciao ${nome},

abbiamo ricevuto la tua candidatura. Entro 48 ore lavorative ti chiama Gianpio. Prima di sentirti guardiamo la tua impresa e la tua zona, così non ti facciamo perdere tempo a raccontarci quello che hai già scritto.

Nella chiamata capiamo se ci sono i presupposti per lavorare insieme. Se ci sono, fissiamo un appuntamento: di persona se sei vicino ai nostri consulenti, altrimenti in videochiamata. Lì parte lo studio di fattibilità, che risponde a una domanda sola: ha senso lavorare insieme? La risposta può essere no, e te la diamo prima che tu spenda un euro in pubblicità.

Intanto, una cosa da portarti alla chiamata.
Prendi gli ultimi dieci preventivi che hai mandato. Quanti sono diventati contratti? E quelli che non hanno firmato, li avete richiamati, o sono rimasti lì?

Se vuoi vedere cosa abbiamo fatto per altre imprese edili, e come lavoriamo, è tutto qui:
${INIZIA_URL}

DISA, software per l'edilizia: 126.500 € di nuovi contratti in 90 giorni, solo dalle Meta Ads. Il titolare lo racconta qui:
${VIDEO_URL}

A presto,
Marco e Gianpio

Forge Group
www.forgegroup.it`;
}

export function buildContactAutoReplyHtml(nomeCognome: string): string {
  const nome = firstName(nomeCognome);

  const body = [
    paragraph(`Ciao <strong>${nome}</strong>,`),
    paragraph(
      "abbiamo ricevuto la tua candidatura. Entro <strong>48 ore lavorative</strong> ti chiama Gianpio. Prima di sentirti guardiamo la tua impresa e la tua zona, così non ti facciamo perdere tempo a raccontarci quello che hai già scritto."
    ),
    paragraph(
      "Nella chiamata capiamo se ci sono i presupposti per lavorare insieme. Se ci sono, fissiamo un appuntamento: di persona se sei vicino ai nostri consulenti, altrimenti in videochiamata. Lì parte lo <strong>studio di fattibilità</strong>, che risponde a una domanda sola: ha senso lavorare insieme? La risposta può essere no, e te la diamo prima che tu spenda un euro in pubblicità."
    ),
    heading("Una cosa da portarti alla chiamata"),
    paragraph(
      "Prendi gli ultimi dieci preventivi che hai mandato. Quanti sono diventati contratti? E quelli che non hanno firmato, <strong>li avete richiamati, o sono rimasti lì?</strong>"
    ),
    paragraph(
      `Se vuoi vedere cosa abbiamo fatto per altre imprese edili, e come lavoriamo, <a href="${INIZIA_URL}" style="color:#c8502a;font-weight:700;">è tutto qui</a>.`
    ),
    `<div style="margin:32px 0;padding:24px;background:#fbf5f2;border:1px solid #e8d5cc;border-radius:12px;">
      <p style="margin:0 0 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#c8502a;">✦ La parola a un cliente</p>
      <a href="${VIDEO_URL}" style="display:block;text-decoration:none;">
        <img src="${VIDEO_POSTER}" alt="Il titolare di DISA racconta il lavoro con Forge Group" width="560" style="display:block;width:100%;max-width:560px;height:auto;border-radius:10px;border:1px solid #e8d5cc;" />
      </a>
      <p style="margin:16px 0 8px;font-size:16px;font-weight:700;color:#111111;">DISA, software per l'edilizia</p>
      <p style="margin:0 0 12px;font-size:14px;color:#555555;"><strong style="color:#c8502a;">126.500 € di nuovi contratti in 90 giorni</strong>, solo dalle Meta Ads</p>
      <a href="${VIDEO_URL}" style="display:inline-block;font-size:14px;font-weight:700;color:#c8502a;text-decoration:none;">▶ Guarda la videorecensione</a>
    </div>`,
    paragraph("A presto,<br /><strong>Marco e Gianpio</strong>"),
    `<p style="margin:0;font-size:14px;font-weight:700;color:#c8502a;letter-spacing:0.5px;">Forge Group</p>`,
  ].join("\n");

  return `<!DOCTYPE html>
<html lang="it">
<body style="font-family:Arial,Helvetica,sans-serif;background:#ffffff;margin:0;padding:24px;">
  <div style="max-width:640px;margin:0 auto;">
    <div style="padding-bottom:24px;border-bottom:3px solid #c8502a;margin-bottom:28px;">
      <p style="margin:0;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#c8502a;">✦ Forge Group</p>
    </div>
    ${body}
    <div style="margin-top:40px;padding-top:20px;border-top:1px solid #e8d5cc;font-size:12px;color:#888888;line-height:1.6;">
      Hai compilato il form di candidatura su <a href="${absoluteUrl("/contatti")}" style="color:#c8502a;">forgegroup.it</a>.
    </div>
  </div>
</body>
</html>`;
}
