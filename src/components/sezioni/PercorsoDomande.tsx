"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Il corpo della lettera di vendita: quattro tappe, in ordine cronologico,
 * di come si perde un lavoro. Ogni tappa apre con una domanda su una scena
 * che l'imprenditore edile ha vissuto — il sabato del sopralluogo, la sera
 * del preventivo, la telefonata che non arriva — perche' la conclusione la
 * tiri lui. Se gliela affermiamo noi, si difende.
 *
 * Le tappe sono legate da un filo che si disegna mentre si scorre: rende
 * visibile che è un percorso unico, non quattro problemi separati.
 */

type Tappa = {
  n: string;
  domanda: React.ReactNode;
  testo: string;
  /** Illustrazione della scena. Finche' e' undefined si mostra il
      segnaposto con il nome del file atteso. */
  img?: string;
  /** Nome del file da mettere in /public/images/percorso/ */
  imgAttesa: string;
  alt: string;
};

const tappe: Tappa[] = [
  {
    n: "01",
    domanda: (
      <>
        Quante volte hai fatto quaranta chilometri per un sopralluogo che{" "}
        <span className="text-brand-corallo-text">non è diventato niente</span>?
      </>
    ),
    testo:
      "Ci vai il sabato mattina, perché durante la settimana sei in cantiere. Prendi le misure, ascolti quello che il cliente ha in mente, gli spieghi come si potrebbe fare. Lui ti dice che ci pensa e che ti fa sapere. Quel sopralluogo però l'hai pagato tu, in gasolio e in ore, e non c'è nessuna riga in fattura che lo copra.",
    imgAttesa: "01-sopralluogo.webp",
    alt: "Titolare durante un sopralluogo dal cliente",
  },
  {
    n: "02",
    domanda: (
      <>
        Quanti preventivi hai mandato questo mese, e quanti{" "}
        <span className="text-brand-corallo-text">ti hanno richiamato</span>?
      </>
    ),
    testo:
      "Il preventivo lo prepari la sera, quando finalmente hai un'ora di calma. Lo controlli, lo mandi, e poi cominci ad aspettare. Nella maggior parte dei casi non arriva nemmeno un no, che almeno ti direbbe se il problema era il prezzo, i tempi o qualcosa che non sei riuscito a spiegare bene.",
    imgAttesa: "02-preventivo.webp",
    alt: "Preventivo preparato la sera sul tavolo di casa",
  },
  {
    n: "03",
    domanda: (
      <>
        Ti è capitato di scoprire che il lavoro l'ha preso un altro{" "}
        <span className="text-brand-corallo-text">per duemila euro in meno</span>?
      </>
    ),
    testo:
      "Quasi mai succede perché l'altro fosse più bravo di te. Succede perché ha richiamato mentre tu stavi aspettando, ha avuto modo di spiegare meglio quello che offriva, ed è rimasto l'unico ancora in gioco nel momento in cui il cliente ha deciso.",
    imgAttesa: "03-concorrente.webp",
    alt: "Il lavoro affidato a un concorrente",
  },
  {
    n: "04",
    domanda: (
      <>
        A fine anno hai fatturato di più, ma in tasca{" "}
        <span className="text-brand-corallo-text">è rimasto uguale</span>?
      </>
    ),
    testo:
      "È il paradosso di quasi tutte le imprese che crescono senza un sistema dietro: più contratti vuol dire più persone da coordinare, più fornitori da rincorrere e più telefonate a cui rispondere. E intanto il margine si assottiglia, perché per portare a casa il lavoro il prezzo l'hai limato tu.",
    imgAttesa: "04-margine.webp",
    alt: "Titolare che controlla i conti dell'azienda a fine anno",
  },
];

function TappaBlocco({ tappa, ultima }: { tappa: Tappa; ultima: boolean }) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.25);
  const stato = visible ? " is-visible" : "";

  return (
    <div ref={ref} className="grid grid-cols-[2.25rem_1fr] gap-x-5 sm:grid-cols-[3rem_1fr] sm:gap-x-8">
      {/* Colonna del filo: nodo numerato e segmento verso la tappa dopo */}
      <div className="flex flex-col items-center" aria-hidden>
        <span className={`percorso-nodo${stato}`}>{tappa.n}</span>
        {!ultima && <span className={`percorso-filo${stato}`} />}
      </div>

      <div className={ultima ? "pb-2" : "pb-16 md:pb-24"}>
        <h3 className="heading-domanda text-balance">{tappa.domanda}</h3>
        <p className="body-lg mt-5 max-w-2xl">{tappa.testo}</p>

        <figure className="mt-8 overflow-hidden rounded-2xl border border-brand-bordo bg-brand-bianco">
          {tappa.img ? (
            <Image
              src={tappa.img}
              alt={tappa.alt ?? ""}
              width={1200}
              height={675}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          ) : (
            /* Segnaposto finche' non arrivano gli scatti: mostra il muro di
               cantiere invece di un rettangolo grigio. */
            <div className="percorso-segnaposto relative aspect-[16/9] w-full">
              <span className="muro-cantiere" />
              <span className="relative z-10 flex h-full flex-col items-center justify-center gap-1 px-4 text-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-grigio">
                  Illustrazione in arrivo
                </span>
                <code className="text-[0.7rem] text-brand-grigio-light">
                  /images/percorso/{tappa.imgAttesa}
                </code>
              </span>
            </div>
          )}
        </figure>
      </div>
    </div>
  );
}

export default function PercorsoDomande() {
  return (
    <section className="section-sabbia border-y py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <p className="eyebrow eyebrow-mark mb-4 flex">Dove si perde un lavoro</p>
        <h2 className="heading-section-xl mb-14 text-balance md:mb-20">
          Il contratto non lo perdi sul lavoro.{" "}
          <span className="text-brand-corallo-text">
            Lo perdi prima, quattro volte.
          </span>
        </h2>

        {tappe.map((tappa, i) => (
          <TappaBlocco key={tappa.n} tappa={tappa} ultima={i === tappe.length - 1} />
        ))}

        {/* Chiusura del percorso: qui la lettera passa dal problema a noi. */}
        <div className="card-xl mt-14 border-l-4 border-l-brand-corallo bg-brand-bianco p-7 sm:p-9 md:mt-20 md:p-10">
          <h3 className="heading-section-xl text-balance">
            In quel vuoto <span className="text-brand-corallo-text">ci mettiamo noi</span>.
          </h3>
          <p className="body-lg mt-6">
            Costruiamo il sistema che ti porta le richieste, perché la
            pubblicità per le aziende dell&apos;edilizia è quello che sappiamo
            fare. Poi però non ce ne andiamo: restiamo dentro il processo di
            vendita insieme a te, fino al momento in cui il cliente firma.{" "}
            <strong className="font-semibold text-brand-nero">
              Lo chiamiamo Metodo FORGE — dal contatto alla firma, ed è
              esattamente il perimetro che copre.
            </strong>
          </p>
          <p className="body-lg mt-4">
            Le agenzie invece ti consegnano il contatto e da lì in poi sei da
            solo. È proprio il punto in cui il lavoro si perde.
          </p>

          <div className="mt-8 rounded-2xl border border-brand-bordo bg-brand-panna/70 p-6 sm:p-7">
            <p className="eyebrow eyebrow-mark mb-3 flex">Come si comincia</p>
            <p className="text-base font-semibold leading-snug text-brand-nero md:text-lg">
              Con uno studio di fattibilità.
            </p>
            <p className="body-lg mt-3">
              Prima di progetti e preventivi guardiamo i tuoi numeri e il tuo
              modo di lavorare, e ti diciamo se un sistema di acquisizione ha
              senso per la tua impresa. A volte la risposta è no, e te lo
              diciamo lo stesso.
            </p>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contatti"
                className="btn-corallo px-8 py-4 text-center text-sm sm:whitespace-nowrap md:text-base"
              >
                Richiedi lo studio di fattibilità
              </Link>
              <Link href="#metodo" className="arrow-link text-sm md:text-base">
                Guarda prima come lavoriamo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
