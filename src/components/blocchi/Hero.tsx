import type { ReactNode } from "react";
import Image from "next/image";
import HeroGooeySection from "@/components/sfondi/HeroGooeySection";
import { CONTENITORE, Stelle } from "@/components/blocchi/ui";
import { fondatori } from "@/data/blocchi";
import { casi, recensioniGoogle } from "@/data/prove";
import { iniziaImages } from "@/data/images";

type Pulsante = { testo: string; href: string };

/**
 * L'apertura delle pagine di vendita (landing e home): le facce dei
 * fondatori, l'occhiello, il titolo con la parola chiave, i tre numeri, le
 * recensioni, due pulsanti (il primo corallo pieno, l'unico della hero).
 * Da computer la scena fa da sfondo: il testo sta sul cielo a sinistra, la
 * stretta di mano a destra, e un velo panna regge la lettura. Da telefono
 * la scena scende sotto il testo, che sopra la foto non si leggerebbe.
 * I pulsanti portano più giù nella pagina (freccia in basso).
 */
export default function Hero({
  occhiello,
  titolo,
  sottotitolo,
  principale,
  secondario,
  dopo,
}: {
  occhiello: string;
  titolo: ReactNode;
  sottotitolo: ReactNode;
  principale: Pulsante;
  secondario: Pulsante;
  /** Una riga in più in fondo alla hero (in home: i mestieri). */
  dopo?: ReactNode;
}) {
  return (
    <HeroGooeySection
      pulita
      className=""
      innerClassName={CONTENITORE}
      before={
        <div className="absolute inset-0 hidden lg:block">
          <Image
            src={iniziaImages.hero}
            alt="Un imprenditore edile stringe la mano a una coppia di clienti davanti al cantiere, con il contratto firmato sul cofano del furgone"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-brand-panna from-35% via-brand-panna/75 via-50% to-transparent to-70%"
            aria-hidden
          />
          <span className="absolute bottom-3 right-4 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] text-white">
            Immagine generata con AI
          </span>
        </div>
      }
    >
      <div className="flex flex-col gap-5 pb-20 pt-14 sm:gap-6 md:pb-28 md:pt-20 lg:max-w-[42rem]">
        {/* Le facce di chi ha chiamato, prima di tutto il resto. */}
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
            {fondatori.map((f) => (
              <div
                key={f.nome}
                className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-brand-bianco bg-brand-panna shadow-sm"
              >
                <Image
                  src={f.foto}
                  alt={`Foto di ${f.nome}`}
                  fill
                  sizes="56px"
                  className="object-cover object-top"
                />
              </div>
            ))}
          </div>
          <p className="text-sm leading-snug text-brand-grigio">
            <strong className="chiave">
              Marco Pio Cerbone e Gianpio Uva
            </strong>
            <br />
            fondatori di Forge Group
          </p>
        </div>
        <p className="eyebrow eyebrow-mark pillola-occhiello-corallo self-start rounded-full border px-5 py-2.5 text-xs sm:text-sm">
          {occhiello}
        </p>
        <h1 className="heading-section-xl text-balance">{titolo}</h1>
        <p className="text-pretty text-lg leading-relaxed text-brand-grigio sm:text-xl">
          {sottotitolo}
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {casi.map((c) => (
            <div
              key={c.chi}
              className="rounded-2xl border border-brand-bordo bg-brand-bianco p-4"
            >
              <p className="font-display text-2xl font-bold leading-none text-brand-corallo-text">
                {c.numero}
              </p>
              <p className="mt-2 text-xs font-semibold leading-snug text-brand-nero">
                {c.numeroDetto}
              </p>
              <p className="mt-1.5 text-xs text-brand-grigio">{c.chi}</p>
            </div>
          ))}
        </div>
        <p className="flex items-center gap-2 text-sm text-brand-grigio">
          <Stelle />
          <span>
            <strong className="chiave">
              {recensioniGoogle.voto} su Google
            </strong>
            , {recensioniGoogle.totale} recensioni
          </span>
        </p>
        <div className="mt-1 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href={principale.href}
            className="btn-hero btn-hero-compatto btn-hero-caldo text-base"
          >
            <span>{principale.testo}</span>
            <span className="btn-hero-freccia" aria-hidden>
              ↓
            </span>
          </a>
          <a
            href={secondario.href}
            className="btn-hero btn-hero-compatto btn-hero-freddo text-base"
          >
            <span>{secondario.testo}</span>
            <span className="btn-hero-freccia" aria-hidden>
              ↓
            </span>
          </a>
        </div>
        <figure className="relative mt-2 aspect-[16/9] overflow-hidden rounded-2xl lg:hidden">
          <Image
            src={iniziaImages.hero}
            alt="Un imprenditore edile stringe la mano a una coppia di clienti davanti al cantiere, con il contratto firmato sul cofano del furgone"
            fill
            sizes="100vw"
            className="object-cover object-right"
          />
          <figcaption className="absolute bottom-2 right-2 rounded-full bg-black/55 px-2.5 py-1 text-[0.7rem] text-white">
            Immagine generata con AI
          </figcaption>
        </figure>
        {dopo}
      </div>
    </HeroGooeySection>
  );
}
