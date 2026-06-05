# 07 — Loghi clienti

Inserire un file per ogni cliente.

## Formato

- **PNG** con sfondo trasparente (preferito) o **SVG**
- Altezza sorgente: **200–400 px**
- Nome file: `nome-azienda.png` (minuscolo, trattini)

## File attivi sul sito (`public/images/clienti/`)

| File | Azienda |
|------|---------|
| `cliente-disa.png` | DISA Appalti & Servizi |
| `cliente-tettitop.png` | Tetti Top |
| `cliente-rovi.png` | ROVI Arredo Negozi |
| `cliente-eva-consulting.png` | EVA Consulting |
| `cliente-sos-appalti.png` | SOS Appalti (software DISA) |

Mappa codice: `src/data/clientLogos.ts`

**Importante:** il nome file deve corrispondere all'azienda nel logo. PNG con **sfondo trasparente** (no rettangolo bianco).

Scontorno sfondo bianco: `scripts/remove-logo-background.py` (flood-fill dai bordi).

Sezione sul sito: `ClientiLogos` (marquee homepage) + `clientLogo` nei casi studio.
