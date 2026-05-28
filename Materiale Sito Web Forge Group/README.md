# Materiale Sito Web — Forge Group

Cartella sorgente per tutti gli asset del sito. I file definitivi vanno poi in `public/` (immagini e video pubblicati).

## Struttura

| Cartella | Contenuto | Stato |
|----------|-----------|--------|
| `01-brand/` | Logo e palette ufficiali | Parziale |
| `02-hero/` | Video hero + poster | **Da completare** (video hero) |
| `03-video-recensione/` | Video DISA + poster + avatar | Video ok, avatar da aggiungere |
| `04-casi-studio/` | 3 immagini casi studio | Presenti (verificare se sostituire con foto reali) |
| `05-blog/` | 3 immagini articoli blog | Presenti |
| `06-team/` | Foto Marco e Gianpio | **Da completare** |
| `07-loghi-clienti/` | Loghi clienti (PNG/SVG) | **Da completare** |
| `08-loghi-partners/` | Loghi partner (PNG/SVG) | **Da completare** |
| `09-servizi/` | Immagini card servizi homepage | Solo riferimenti provvisori |

## Regole nomi file

- Minuscolo, trattini al posto degli spazi
- Esempio: `disa-software.png`, `marco.jpg`
- Formato foto: JPG (qualità 80–85%)
- Formato loghi: PNG trasparente o SVG

## Dove finiscono sul sito

Dopo approvazione, gli asset vanno copiati in:

```
public/logo.png
public/images/hero/
public/images/casi-studio/
public/images/blog/
public/images/team/
public/images/loghi-clienti/
public/images/loghi-partners/
public/video-recensione.mov (o .mp4)
```

Vedi `src/data/images.ts` per i nomi file attesi dal codice.
