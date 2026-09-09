/**
 * Le righe del CRM gestionale, usate sia dal blocco corto in home sia
 * dalla pagina /crm-gestionale-edilizia.
 *
 * ⚠️ Dati ANONIMIZZATI: nessun nome, nessun recapito, nessun riferimento a
 * persone reali. Le note riproducono la forma di quelle vere, non il
 * contenuto.
 */
export type RigaCrm = {
  richiesta: string;
  zona: string;
  fase: string;
  tono: "avanti" | "attesa" | "fermo" | "scartato" | "chiuso";
  nota: string;
  quando: string;
};

export const righeCrm: RigaCrm[] = [
  {
    richiesta: "Ristrutturazione attività esistente",
    zona: "Provincia di Napoli",
    fase: "1° APP. DI REVISIONE",
    tono: "avanti",
    nota: "Locale 50 mq, ristrutturazione completa. Ha già altri tre preventivi: 22, 28 e 33 mila. Non ha ancora un tecnico.",
    quando: "Giovedì 20 · 9:30",
  },
  {
    richiesta: "Nuova attività, arredo e progettazione",
    zona: "Provincia di Avellino",
    fase: "DA RICHIAMARE",
    tono: "attesa",
    nota: "Budget indicativo confermato in chiamata. Deve parlare con la proprietà del locale prima di decidere.",
    quando: "1 settembre",
  },
  {
    richiesta: "Ha un progetto e cerca chi lo realizzi",
    zona: "Provincia di Caserta",
    fase: "NON RISPONDE",
    tono: "fermo",
    nota: "Due chiamate, mattina e pomeriggio. Mandato messaggio su WhatsApp.",
    quando: "Richiamo a 48h",
  },
  {
    richiesta: "Solo informazioni, nessun budget",
    zona: "Fuori zona",
    fase: "SQUALIFICATO",
    tono: "scartato",
    nota: "Chiedeva un prezzo al metro quadro. Nessun lavoro in programma. Chiuso prima del sopralluogo.",
    quando: "—",
  },
  {
    richiesta: "Ristrutturazione attività esistente",
    zona: "Provincia di Salerno",
    fase: "CONTRATTO",
    tono: "chiuso",
    nota: "Progetto approvato in sede. Piano dei lavori firmato.",
    quando: "Chiuso",
  },
];

export const stileFase: Record<RigaCrm["tono"], string> = {
  avanti: "bg-amber-50 text-amber-900 border-amber-200",
  attesa: "bg-sky-50 text-sky-900 border-sky-200",
  fermo: "bg-neutral-100 text-neutral-700 border-neutral-300",
  scartato: "bg-red-50 text-red-800 border-red-200",
  chiuso: "bg-emerald-50 text-emerald-900 border-emerald-200",
};
