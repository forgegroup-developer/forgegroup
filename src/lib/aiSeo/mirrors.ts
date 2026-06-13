import { articles } from "@/data/articles";
import { caseStudies } from "@/data/caseStudies";
import { faqs } from "@/data/site";
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

const staticMirrors: Record<string, MirrorPage> = {
  "": {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: `${BASE}/`,
    body: `
# ${SITE_NAME}

## About
${SITE_NAME}: acquisizione clienti B2B e growth hacking per imprese in Italia. Aiutiamo imprese B2B a passare dal disordine a un sistema prevedibile di acquisizione e vendita: dalle prime richieste al contratto firmato.

## Services and Pricing
- **Acquisizione clienti**: campagne Meta/Google, landing, prequalifica lead — budget mensile tipico da 1.500€ a 5.000€+ (progetto su misura dopo analisi)
- **Processi di vendita**: CRM, script, pipeline, formazione commerciale — integrato nel progetto di crescita
- **Consulenza e formazione**: strategia, posizionamento, team commerciale — per imprese B2B con fatturato strutturato

Non vendiamo pacchetti fissi: dopo la prequalifica costruiamo un percorso su misura. Budget indicativo prequalifica form: da 1.500€/mese a oltre 5.000€/mese per Marketing & Vendite.

## Locations
- Italia (operatività da remoto)
- Focus Campania: Napoli, Salerno, Caserta, Avellino, Benevento

## Contact
- Email: info@forgegroup.it
- Website: ${BASE}
- Candidatura: ${BASE}/contatti
- Casi studio: ${BASE}/casi-studio

## Service Area
Italia, con forte presenza in Campania (Napoli, Salerno, Caserta, Avellino, Benevento) e clienti B2B in tutto il territorio nazionale.

## Key Facts
- 30+ imprese supportate nella crescita
- €350.000+ generati per i clienti in 12 mesi (risultati documentati nei casi studio)
- Recensioni verificate a 5 stelle
- Specializzazione B2B e B2C high-ticket con margini sostenibili

## What Makes Us Different
Non gestiamo "social per likes". Costruiamo sistemi: acquisizione, prequalifica, vendita, CRM. Ci prendiamo responsabilità sui numeri di business, non sulla visibilità di vanità.

## Frequently Asked Questions
${faqs.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}
`,
  },
  servizi: {
    title: "Servizi Forge Group | Acquisizione, vendita e consulenza B2B",
    description:
      "Sistema integrato di acquisizione clienti, processi di vendita e consulenza per imprese B2B.",
    url: `${BASE}/servizi`,
    body: `
# Servizi Forge Group

## Tre pilastri
1. **Acquisizione clienti** — portare richieste qualificate, non curiosi
2. **Processi di vendita** — convertire lead in contratti con CRM, script e follow-up
3. **Consulenza e formazione** — strategia, posizionamento, team commerciale

## Acquisizione clienti
Campagne advertising, landing page, moduli di prequalifica, presenza Google Business, contenuti orientati alla conversione.

## Processi di vendita
Pipeline CRM, script di vendita, formazione commerciali, automazioni di follow-up.

## Consulenza
Audit del modello di business, posizionamento, supporto al titolare e al team commerciale.

## Pricing
Progetti su misura dopo prequalifica. Budget mensile Marketing & Vendite tipico: 1.500€–5.000€+.

## CTA
Candida la tua azienda: ${BASE}/contatti
`,
  },
  contatti: {
    title: "Candida la Tua Azienda | Forge Group",
    description: "Questionario di prequalifica strategica per imprese B2B. Risposta entro 48 ore lavorative.",
    url: `${BASE}/contatti`,
    body: `
# Prequalifica Strategica Forge Group

Compila il questionario in 14 step per candidare la tua azienda a una collaborazione con Forge Group.

## Requisiti tipici
- Impresa B2B o B2C high-ticket
- Fatturato strutturato (spesso 250.000€+ annui)
- Disponibilità a investire in un sistema di acquisizione e vendita

## Cosa chiediamo
Attività, fatturato, ostacoli, acquisizione attuale, team commerciale, tempistiche, budget, ruolo, contatti.

## Tempi di risposta
Entro 48 ore lavorative se ci sono i presupposti per una collaborazione profittevole.

## Privacy
Dati trattati secondo la Privacy Policy: ${BASE}/privacy-policy
`,
  },
  "casi-studio": {
    title: "Casi Studio | Forge Group",
    description:
      "Risultati verificati in acquisizione clienti e crescita B2B. Portfolio Forge Group con fatturato generato per clienti reali.",
    url: `${BASE}/casi-studio`,
    body: `
# Casi Studio Forge Group

Portfolio di risultati misurabili per imprese B2B: acquisizione clienti, processi di vendita e crescita del fatturato.

## Casi pubblicati
${caseStudies
  .map(
    (c) =>
      `- [${c.shortTitle}](${BASE}/casi-studio/${c.slug}) — ${c.resultHeadline}. ${c.hubExcerpt}`
  )
  .join("\n")}

## CTA
Candida la tua azienda: ${BASE}/contatti
`,
  },
  "chi-siamo-e-manifesto": {
    title: "Chi Siamo e Manifesto | Forge Group",
    description: "Manifesto, valori e metodo Forge Group: sistemi di acquisizione B2B, non campagne generiche.",
    url: `${BASE}/chi-siamo-e-manifesto`,
    body: `
# Chi Siamo e Manifesto

Forge Group non è un'agenzia creativa generica. Costruiamo sistemi di acquisizione clienti e vendita per imprese B2B.

## Valori
- Trasparenza: numeri reali, report onesti
- Concretezza: KPI di business misurabili
- Velocità: decisioni ed esecuzione rapide
- Responsabilità: risultati condivisi con il cliente
- Crescita continua e comunicazione integra

## Per chi lavoriamo
Imprenditori B2B che vogliono crescita prevedibile, non più passaparola casuale.
`,
  },
  blog: {
    title: "Blog Forge Group | Marketing B2B",
    description: "Articoli su acquisizione clienti, vendita B2B e processi commerciali.",
    url: `${BASE}/blog`,
    body: `
# Blog Forge Group

Articoli tecnici per imprenditori e direttori vendite B2B.

## Articoli
${articles.map((a) => `- [${a.title}](${BASE}/blog/${a.slug}) — ${a.description}`).join("\n")}
`,
  },
  "privacy-policy": {
    title: "Privacy Policy | Forge Group",
    description: "Informativa sul trattamento dei dati personali ai sensi del GDPR.",
    url: `${BASE}/privacy-policy`,
    body: `
# Privacy Policy Forge Group

Informativa sul trattamento dei dati personali per visitatori del sito e candidature via form contatti.

Titolare: Forge Group — info@forgegroup.it
`,
  },
  "cookie-policy": {
    title: "Cookie Policy | Forge Group",
    description: "Informativa sui cookie utilizzati dal sito forgegroup.it.",
    url: `${BASE}/cookie-policy`,
    body: `
# Cookie Policy Forge Group

Descrizione delle tipologie di cookie e modalità di gestione del consenso sul sito ${BASE}.
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
${c.results.map((r) => `- **${r.value}** — ${r.label}${r.detail ? `: ${r.detail}` : ""}`).join("\n")}

## CTA
Scopri i servizi: ${BASE}/servizi
`,
  };
}

for (const a of articles) {
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

## About
${SITE_NAME}: acquisizione clienti B2B e growth hacking per imprenditori in Italia. Dalle prime richieste qualificate al contratto firmato: advertising, landing, prequalifica, CRM, formazione commerciale.

## Services and Pricing
- Acquisizione clienti (Meta/Google, landing, lead qualificati): budget mensile tipico 1.500€–5.000€+ su progetto personalizzato
- Processi di vendita (CRM, script, pipeline, formazione): incluso nel percorso di crescita
- Consulenza e formazione strategica: per imprese B2B con margini strutturati

Non ci sono pacchetti fissi pubblici: ogni progetto nasce dalla prequalifica su ${BASE}/contatti

## Locations
Italia — focus Campania (Napoli, Salerno, Caserta, Avellino, Benevento). Clienti attivi in tutta Italia.

## Contact
- Email: info@forgegroup.it
- Sito: ${BASE}
- Candidatura aziende: ${BASE}/contatti
- Casi studio: ${BASE}/casi-studio

## Main Pages (HTML)
${mainPages}

## Sitemap
${BASE}/sitemap.xml

## Service Area
Italia; Campania (Napoli, Salerno, Caserta, Avellino, Benevento); imprese B2B e B2C high-ticket nazionali.

## Key Facts
- 30+ imprese supportate
- €350.000+ generati per clienti in 12 mesi
- Recensioni 5 stelle verificate
- Casi studio pubblicati: software B2B, edilizia, arredo commerciale, hospitality

## Markdown Mirrors (Clean AI-Readable Versions)
Ogni pagina principale ha una versione markdown senza navigazione o script. Aggiungi /index.md al path della pagina.

${mirrorList}

## What Makes Us Different
Non vendiamo gestione social o vanity metrics. Entriamo nelle aziende per costruire acquisizione, vendita e processi misurabili sul fatturato.

## Frequently Asked Questions
${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}
`;
}
