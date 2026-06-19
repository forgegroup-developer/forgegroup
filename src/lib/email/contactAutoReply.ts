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

export function buildContactAutoReplyText(nomeCognome: string): string {
  const nome = firstName(nomeCognome);

  return `Ciao ${nome},

abbiamo ricevuto le tue informazioni e nelle prossime 48 ore lavorative ti contatteremo per una prima chiamata conoscitiva.
Nel frattempo, vogliamo essere diretti con te.

Tutti dicono: ti facciamo aumentare il fatturato.
È vero. Lo diciamo anche noi.
Ma la differenza sta in quello che c'è dietro quella frase, e che quasi nessuno ti dice.

Dietro "aumentare le vendite" c'è: come si gestisce una chiamata con un potenziale cliente. Come si costruisce fiducia prima ancora che ti chieda il prezzo. Come si struttura un processo di vendita che non dipende dall'umore del giorno. Che materiale mostrare, quando e come. Come si differenzia la tua impresa dalle altre, e soprattutto come farlo capire a chi non ti conosce ancora. Come si finalizza un cliente senza sembrare un venditore.

Sono dettagli. Ma sono quei dettagli che separano un'impresa che cresce da una che si affanna.

Prima di sentirti, ti chiediamo di fermarti cinque minuti.
Non per noi. Per te.

Pensa alla tua impresa oggi: su quali canali sei presente? Come sei percepito online: dal sito, dalle pagine social, da chi non ti conosce ancora? Quando un potenziale cliente ti trova, cosa vede? Cosa lo convince a contattarti, o ad andarsene?

E poi la domanda che conta davvero: se il tuo fatturato non cresce come vorresti, dove si rompe il processo? Arrivano pochi contatti? Arrivano ma non si convertono? Si convertono ma non restano?

Non devi risponderci adesso. Ma tienile in testa quando ci sentiremo.

Il tipo di lavoro che ci piace fare.

Non lavoriamo con tutti. Non perché siamo selettivi per partito preso, ma perché il lavoro che facciamo richiede impegno da entrambe le parti.

Entriamo dentro l'impresa. Guardiamo com'è strutturata, dove perde opportunità, cosa funziona e cosa no. E poi costruiamo, o ricostruiamo, un sistema che porta clienti con continuità e li converte in modo prevedibile.

Questo significa rimettersi in gioco. Significa avere l'umiltà di guardare la propria impresa con occhi nuovi, a prescindere che tu fatturi 100.000€ o 1 milione. È quella disponibilità che fa la differenza, non il budget.

L'obiettivo non è solo fatturare di più. È farlo in modo sano: con meno caos, più chiarezza, un team che sa cosa fare e un imprenditore che può finalmente lavorare sull'impresa invece che dentro l'impresa.

Video testimonianza: DISA SRL, Software B2B, €126.500 in 90 giorni:
${VIDEO_URL}

Ci vediamo in chiamata.
Gianpio & Marco

Forge Group
www.forgegroup.it`;
}

export function buildContactAutoReplyHtml(nomeCognome: string): string {
  const nome = firstName(nomeCognome);

  const body = [
    paragraph(`Ciao <strong>${nome}</strong>,`),
    paragraph(
      "abbiamo ricevuto le tue informazioni e nelle prossime <strong>48 ore lavorative</strong> ti contatteremo per una prima chiamata conoscitiva.<br />Nel frattempo, vogliamo essere diretti con te."
    ),
    paragraph(
      "Tutti dicono: <em>ti facciamo aumentare il fatturato</em>.<br />È vero. Lo diciamo anche noi.<br />Ma la differenza sta in quello che c'è dietro quella frase, e che quasi nessuno ti dice."
    ),
    paragraph(
      'Dietro "aumentare le vendite" c\'è: come si gestisce una chiamata con un potenziale cliente. Come si costruisce fiducia prima ancora che ti chieda il prezzo. Come si struttura un processo di vendita che non dipende dall\'umore del giorno. Che materiale mostrare, quando e come. Come si differenzia la tua impresa dalle altre, e soprattutto come farlo capire a chi non ti conosce ancora. Come si finalizza un cliente senza sembrare un venditore.'
    ),
    paragraph(
      "Sono dettagli. Ma sono quei dettagli che separano un'impresa che <strong>cresce</strong> da una che si <strong>affanna</strong>."
    ),
    heading("Prima di sentirti, ti chiediamo di fermarti cinque minuti."),
    paragraph("Non per noi. <strong>Per te.</strong>"),
    paragraph(
      "Pensa alla tua impresa oggi: su quali canali sei presente? Come sei percepito online: dal sito, dalle pagine social, da chi non ti conosce ancora? Quando un potenziale cliente ti trova, cosa vede? Cosa lo convince a contattarti, o ad andarsene?"
    ),
    paragraph(
      "E poi la domanda che conta davvero: se il tuo fatturato non cresce come vorresti, <strong>dove si rompe il processo?</strong> Arrivano pochi contatti? Arrivano ma non si convertono? Si convertono ma non restano?"
    ),
    paragraph("Non devi risponderci adesso. Ma tienile in testa quando ci sentiremo."),
    heading("Il tipo di lavoro che ci piace fare."),
    paragraph(
      "Non lavoriamo con tutti. Non perché siamo selettivi per partito preso, ma perché il lavoro che facciamo richiede impegno da entrambe le parti."
    ),
    paragraph(
      "Entriamo dentro l'impresa. Guardiamo com'è strutturata, dove perde opportunità, cosa funziona e cosa no. E poi costruiamo, o ricostruiamo, un sistema che porta clienti con continuità e li converte in modo prevedibile."
    ),
    paragraph(
      "Questo significa rimettersi in gioco. Significa avere l'umiltà di guardare la propria impresa con occhi nuovi, a prescindere che tu fatturi 100.000€ o 1 milione. È quella disponibilità che fa la differenza, non il budget."
    ),
    paragraph(
      "L'obiettivo non è solo fatturare di più. È farlo in modo sano: con meno caos, più chiarezza, un team che sa cosa fare e un imprenditore che può finalmente lavorare <strong>sull'impresa</strong> invece che <strong>dentro l'impresa</strong>."
    ),
    `<div style="margin:32px 0;padding:24px;background:#fbf5f2;border:1px solid #e8d5cc;border-radius:12px;">
      <p style="margin:0 0 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#c8502a;">✦ Video testimonianza</p>
      <a href="${VIDEO_URL}" style="display:block;text-decoration:none;">
        <img src="${VIDEO_POSTER}" alt="Guarda la testimonianza di DISA SRL" width="560" style="display:block;width:100%;max-width:560px;height:auto;border-radius:10px;border:1px solid #e8d5cc;" />
      </a>
      <p style="margin:16px 0 8px;font-size:16px;font-weight:700;color:#111111;">DISA SRL</p>
      <p style="margin:0 0 12px;font-size:14px;color:#555555;">Software B2B, <strong style="color:#c8502a;">€126.500 in 90 giorni</strong></p>
      <a href="${VIDEO_URL}" style="display:inline-block;font-size:14px;font-weight:700;color:#c8502a;text-decoration:none;">▶ Guarda la videorecensione</a>
    </div>`,
    paragraph("Ci vediamo in chiamata.<br /><strong>Gianpio &amp; Marco</strong>"),
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
