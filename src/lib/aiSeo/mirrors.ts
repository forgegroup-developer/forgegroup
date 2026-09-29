import { articles, getPublishedArticles } from "@/data/articles";
import { caseStudies } from "@/data/caseStudies";
import { faqs } from "@/data/site";
import { IUBENDA, LEGAL, LEGAL_CONTROLLERS } from "@/data/legal";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL, STATIC_SEO_ROUTES, absoluteUrl } from "@/lib/seo/site";

export type MirrorPage = {
  title: string;
  description: string;
  url: string;
  body: string;
};

const BASE = SITE_URL;
const TODAY = new Date().toISOString().slice(0, 10);

function frontmatter(page: MirrorPage): string {
  return `---
title: ${page.title}
description: ${page.description}
url: ${page.url}
last_updated: ${TODAY}
---

`;
}

function toMarkdown(page: MirrorPage): string {
  return frontmatter(page) + page.body.trim() + "\n";
}

/**
 * Il testo che leggono le intelligenze artificiali (llms.txt e le versioni
 * /index.md delle pagine). Solo fatti della Scheda dei fatti Forge: niente
 * prezzi, niente numeri non verificati, niente geografia che restringe
 * ("in tutta Italia"), "richieste di lavoro" e non "lead", "gestionale" e
 * non "CRM" (decisioni della proprieta', 24-29/09/2026).
 */
const CHI_SIAMO = `Forge Group porta richieste di lavoro alle imprese edili e le segue con il titolare fino alla firma del contratto. Lavoriamo solo con imprese edili e della filiera: costruzioni e ristrutturazioni, coperture, serramenti, impianti, fotovoltaico, arredo. Fondatori: Marco Pio Cerbone e Gianpio Uva. Sede operativa a Fontanarosa (AV), clienti in tutta Italia: di persona dove abbiamo consulenti, altrimenti in videochiamata.`;

const COME_LAVORIAMO = `- Gestiamo noi la pubblicità su Meta e Google, con video girati nei cantieri del cliente.
- Ogni richiesta passa da un modulo che chiede tipo di lavoro, tempi, budget e zona.
- Le richieste le richiama l'impresa, con il metodo e le parole che scriviamo insieme. Forge non chiama i contatti del cliente.
- Ogni richiesta arriva nel gestionale costruito da Forge, dove il titolare vede ogni trattativa e quanto rende ogni euro di pubblicità.
- Una chiamata a settimana sulle trattative e una consulenza al mese.
- Dopo 60 giorni si rivedono le stime sui dati veri; dopo 90 giorni il primo report: contatti, appuntamenti, contratti, costo per contatto.
- Metodo F.O.R.G.E.: Fondamenta (audit commerciale), Organizzazione (social), Richieste (campagne), Gestione (gestionale), Evoluzione (processo di vendita e consulenza).`;

const STUDIO = `Prima di iniziare c'è lo studio di fattibilità: quanto lavoro produce la zona, da fonti ufficiali (ISTAT, GSE, ENEA), quanto lavoro regge oggi l'impresa, e se ha senso lavorare insieme. La risposta può essere no. Lavoriamo con poche imprese, una per territorio. Il contratto è annuale; una parte del compenso è legata al fatturato generato. I prezzi non sono pubblici: si definiscono dopo lo studio.`;

const PROVE = `- DISA (software per l'edilizia): 126.500 € di nuovi contratti in 90 giorni, solo dalle Meta Ads, a 1,48 € per contatto; circa 350.000 € in 12 mesi con circa 300 € al mese di pubblicità.
- Tetti Top (coperture e lattoneria): 4 clienti qualificati al mese senza pubblicità, preventivi fino a 175.000 €, sopralluogo diventato a pagamento.
- ROVI (arredamento negozi): 25.000 € chiusi in quattro mesi e oltre 200.000 € di trattative aperte.
- Google: 5,0 su 6 recensioni.`;

const staticMirrors: Record<string, MirrorPage> = {
  "": {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: `${BASE}/`,
    body: `
# ${SITE_NAME}

## Chi siamo
${CHI_SIAMO}

## Come lavoriamo
${COME_LAVORIAMO}

## Prima di iniziare
${STUDIO}

## Risultati
${PROVE}

## Contatti
- Email: info@forgegroup.it
- Sito: ${BASE}
- Candidatura: ${BASE}/contatti
- Casi studio: ${BASE}/casi-studio

## Domande frequenti
${faqs.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}
`,
  },
  servizi: {
    title: "Come lavoriamo | Forge Group",
    description:
      "Come lavora Forge Group con un'impresa edile: pubblicità gestita, richieste filtrate, gestionale, chiamata settimanale sulle trattative.",
    url: `${BASE}/servizi`,
    body: `
# Come lavoriamo con un'impresa edile

${COME_LAVORIAMO}

## Cosa c'è nel servizio
Pubblicità su Meta e Google gestita da noi, consulenza di marketing e commerciale, materiale commerciale, processi di vendita, il gestionale, i social, il sito, i video. È un percorso unico: non sono servizi venduti a parte.

## Prima di iniziare
${STUDIO}

## Candidatura
${BASE}/contatti
`,
  },
  contatti: {
    title: "Candida la tua impresa | Forge Group",
    description: "Candidatura per lo studio di fattibilità. Gianpio ti chiama entro 48 ore lavorative.",
    url: `${BASE}/contatti`,
    body: `
# Candida la tua impresa

Il modulo chiede alcune informazioni sull'impresa: attività, zona, come arrivano oggi i clienti, tempi.

## Cosa succede dopo
1. Guardiamo la tua impresa e la tua zona prima di sentirti.
2. Ti chiama Gianpio entro 48 ore lavorative, per capire se ci sono i presupposti.
3. Se ci sono, si fissa un appuntamento: di persona se sei vicino ai nostri consulenti, altrimenti in videochiamata.
4. Lo studio di fattibilità dice se ha senso lavorare insieme. La risposta può essere no.

## Privacy
Dati trattati secondo la Privacy Policy: ${BASE}/privacy-policy
`,
  },
  "casi-studio": {
    title: "Casi Studio | Forge Group",
    description:
      "Tre imprese edili, con i numeri e il nome sotto: DISA, Tetti Top, ROVI.",
    url: `${BASE}/casi-studio`,
    body: `
# Casi Studio Forge Group

${PROVE}

## Casi pubblicati
${caseStudies
  .map(
    (c) =>
      `- [${c.shortTitle}](${BASE}/casi-studio/${c.slug}): ${c.resultHeadline}. ${c.hubExcerpt}`
  )
  .join("\n")}

## CTA
Candida la tua azienda: ${BASE}/contatti
`,
  },
  visione: {
    title: "Visione | Forge Group",
    description:
      "La visione di Forge Group: entriamo nelle aziende, restiamo e costruiamo sistemi che reggono. Lealtà, trasparenza, imprenditori con cui crescere.",
    url: `${BASE}/visione`,
    body: `
# Visione Forge Group

Forge Group nasce da una domanda semplice: perché tante aziende che hanno tutto per crescere, non crescono?

Non consegniamo campagne per poi sparire. Entriamo, restiamo, lavoriamo fianco a fianco sul marketing, sul processo di vendita e sulla struttura.

Cerchiamo imprenditori con cui costruire, non clienti da gestire.

Contatto: ${BASE}/contatti
`,
  },
  blog: {
    title: "Blog Forge Group | Clienti, preventivi e margini per imprese edili",
    description: "Articoli per i titolari di imprese edili: come arrivano i clienti, perché i preventivi restano senza risposta, dove si perdono i margini.",
    url: `${BASE}/blog`,
    body: `
# Blog Forge Group

Articoli per chi un'impresa edile la porta avanti.

## Articoli
${getPublishedArticles().map((a) => `- [${a.title}](${BASE}/blog/${a.slug}): ${a.description}`).join("\n")}
`,
  },
  "privacy-policy": {
    title: "Privacy Policy | Forge Group",
    description: "Informativa sul trattamento dei dati personali ai sensi del GDPR.",
    url: `${BASE}/privacy-policy`,
    body: `
# Privacy Policy Forge Group

Informativa GDPR gestita su iubenda: ${IUBENDA.privacyPolicyUrl}

Contitolari del trattamento (Forge Group Italia):
${LEGAL_CONTROLLERS.map((c) => `- ${c.name}, P.IVA ${c.vat}, ${c.address}`).join("\n")}

Email: ${LEGAL.controllerEmail}
`,
  },
  "cookie-policy": {
    title: "Cookie Policy | Forge Group",
    description: "Informativa sui cookie utilizzati dal sito forgegroup.it.",
    url: `${BASE}/cookie-policy`,
    body: `
# Cookie Policy Forge Group

Informativa cookie gestita su iubenda: ${IUBENDA.cookiePolicyUrl}

Il sito usa Google Analytics 4 solo dopo il consenso dato dal banner cookie
(Google Consent Mode v2). Le preferenze si cambiano in ogni momento dal
pulsante privacy in basso nella pagina.
`,
  },
};

for (const c of caseStudies) {
  staticMirrors[`casi-studio/${c.slug}`] = {
    title: `${c.title} | Caso Studio Forge Group`,
    description: c.metaDescription,
    url: `${BASE}/casi-studio/${c.slug}`,
    body: `
# ${c.shortTitle}

**Settore:** ${c.sector}

## Risultato
${c.resultHeadline}

## Sintesi
${c.excerpt}

## Sfida
${c.challenge}

## Risultati chiave
${c.results.map((r) => `- **${r.value}**: ${r.label}${r.detail ? `: ${r.detail}` : ""}`).join("\n")}

## CTA
Scopri i servizi: ${BASE}/servizi
`,
  };
}

for (const a of getPublishedArticles()) {
  const contentMd = a.content
    .map((block) => {
      if (block.type === "h2") return `## ${block.text}`;
      if (block.type === "h3") return `### ${block.text}`;
      if (block.type === "p") return block.text ?? "";
      if (block.type === "ul" && block.items) return block.items.map((i) => `- ${i}`).join("\n");
      if (block.type === "quote") return `> ${block.text}`;
      return "";
    })
    .filter(Boolean)
    .join("\n\n");

  staticMirrors[`blog/${a.slug}`] = {
    title: a.title,
    description: a.description,
    url: `${BASE}/blog/${a.slug}`,
    body: `
# ${a.title}

**Categoria:** ${a.category}  
**Data:** ${a.date}

${a.description}

${contentMd}
`,
  };
}

/** Whitelist of paths — prevents path traversal in mirror API */
export function getMirrorPath(pathSegments: string[] | undefined): string | null {
  const path = (pathSegments ?? []).join("/");
  if (path.includes("..") || path.includes("\\")) return null;
  if (!(path in staticMirrors)) return null;
  return path;
}

export function getMirrorMarkdown(path: string): string | null {
  const page = staticMirrors[path];
  if (!page) return null;
  return toMarkdown(page);
}

export function listMirrorUrls(): string[] {
  return Object.keys(staticMirrors)
    .sort()
    .map((p) => (p === "" ? `${BASE}/index.md` : `${BASE}/${p}/index.md`));
}

export function buildLlmsTxt(): string {
  const mirrorList = listMirrorUrls().map((u) => `- ${u}`).join("\n");
  const mainPages = STATIC_SEO_ROUTES.filter((r) => r.inLlmsMainPages)
    .map((r) => `- ${absoluteUrl(r.path)}`)
    .join("\n");

  return `# ${SITE_NAME}

## Chi siamo
${CHI_SIAMO}

## Come lavoriamo
${COME_LAVORIAMO}

## Prima di iniziare
${STUDIO}

## Risultati
${PROVE}

## Contatti
- Email: info@forgegroup.it
- Sito: ${BASE}
- Candidatura: ${BASE}/contatti
- Casi studio: ${BASE}/casi-studio

## Main Pages (HTML)
${mainPages}

## Sitemap
${BASE}/sitemap.xml

## Markdown Mirrors (Clean AI-Readable Versions)
Ogni pagina principale ha una versione markdown senza navigazione o script. Aggiungi /index.md al path della pagina.

${mirrorList}

## Cosa ci distingue
Il gestionale costruito da noi sul processo di vendita edile, dove il titolare vede ogni trattativa e quanto rende ogni euro. Lo studio di fattibilità che conta il mercato da fonti ufficiali e può dire di no. Un'impresa per territorio. Di persona dove abbiamo consulenti.

## Frequently Asked Questions
${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
}
