import Image from "next/image";
import Link from "next/link";
import CaseStudyBeforeAfter from "@/components/casi-studio/CaseStudyBeforeAfter";
import CaseStudyClientLogo from "@/components/casi-studio/CaseStudyClientLogo";
import HighlightedText from "@/components/ui/HighlightedText";
import PhoneScreenshotMockup from "@/components/media/PhoneScreenshotMockup";
import VideoRecensionePoster from "@/components/media/VideoRecensionePoster";
import DeferredMount from "@/components/ui/DeferredMount";
import {
  CONTENITORE,
  SEZIONE,
  STRETTO,
  Chiave,
  Titolo,
} from "@/components/blocchi/ui";
import type { CaseStudy } from "@/data/caseStudies";
import { getCaseStudyImage, getCaseStudyImagePosition } from "@/data/images";

/*
 * La pagina di un caso studio (rifatta il 29/09/2026).
 *
 * Stesse sezioni di prima, nello stesso ordine; cambiano impaginazione e
 * parole, secondo le REGOLE DEL SITO e lo studio sulla pagina di vendita
 * del concorrente A:
 * - due soli sfondi, alternati: hero mattone, contesto bianco, sfida
 *   mattone, soluzione bianco, risultati mattone, prima e dopo bianco, a
 *   chi serve mattone (poi la fascia finale del footer, bianca);
 * - tutti i titoli con <Titolo>, centrati, stessa misura;
 * - i problemi numerati ("Problema #1"), ognuno con il suo titoletto;
 * - i passi della soluzione uniti da una freccia, come un conto disegnato;
 * - un pulsante dopo i blocchi che contano. Il corallo pieno qui non c'è:
 *   lo usa una volta sola la fascia finale del footer.
 */

type Props = {
  c: CaseStudy;
  showBackLink?: boolean;
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Il testo con le sue frasi chiave in corallo grassetto (REGOLE §5 bis). */
function ConChiavi({ text, highlights }: { text: string; highlights?: string[] }) {
  if (!highlights?.length) return <>{text}</>;
  const pattern = highlights.map(escapeRegExp).join("|");
  const parts = text.split(new RegExp(`(${pattern})`, "g")).filter((p) => p.length > 0);
  return (
    <>
      {parts.map((part, i) =>
        highlights.includes(part) ? (
          <strong key={i} className="chiave">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/** "Titolo: spiegazione" diventa titoletto e testo. */
function dividi(frase: string) {
  const i = frase.indexOf(":");
  if (i < 0) return { titolo: frase, testo: "" };
  const testo = frase.slice(i + 1).trim();
  return {
    titolo: frase.slice(0, i).trim(),
    testo: testo.charAt(0).toUpperCase() + testo.slice(1) + ".",
  };
}

/** La cifra non si separa dal suo simbolo a fine riga. */
const unito = (t: string) => t.replace(/ €/g, "\u00a0€");

function getClientDisplayName(c: CaseStudy): string {
  const azienda = c.context.find((ctx) => ctx.label === "Azienda")?.value;
  if (azienda) return azienda.split(",")[0].trim();
  if (c.clientLogoAlt) return c.clientLogoAlt;
  return c.shortTitle;
}

/** Il pulsante secondario verso lo studio di fattibilità. */
function VersoLoStudio({ testo = "Richiedi lo studio di fattibilità" }: { testo?: string }) {
  return (
    <div className="mt-12 flex justify-center">
      <Link href="/contatti" className="btn-ghost text-center">
        {testo} ↗
      </Link>
    </div>
  );
}

export default function CaseStudyDetail({ c, showBackLink = false }: Props) {
  const clientName = getClientDisplayName(c);
  const contesto = c.context.filter((ctx) => ctx.label !== "Azienda");

  return (
    <>
      {/* HERO · mattone */}
      <section className="relative z-0 overflow-hidden section-mattone">
        <div className="absolute inset-0" aria-hidden>
          <Image
            src={getCaseStudyImage(c.slug)}
            alt=""
            fill
            className="object-cover object-center"
            style={{ objectPosition: getCaseStudyImagePosition(c.slug) }}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-mattone/95 via-brand-mattone/85 to-brand-mattone/60" />
        </div>

        <div className={`relative z-10 ${CONTENITORE} pb-20 pt-14 md:pb-28 md:pt-20`}>
          {showBackLink && (
            <Link
              href="/casi-studio"
              className="mb-8 inline-flex items-center gap-2 text-sm text-white/85 hover:text-white hover:underline"
            >
              <span aria-hidden>←</span>
              Tutti i casi studio
            </Link>
          )}

          <div className="max-w-3xl">
            <p className="mb-6">
              <span className="eyebrow-rule">{c.sector}</span>
            </p>
            <h1 className="heading-hero text-balance font-semibold leading-tight text-white">
              {unito(c.resultHeadline)}
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed">
              <ConChiavi text={unito(c.excerpt)} highlights={c.excerptHighlights?.map(unito)} />
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="#risultati" className="btn-hero btn-hero-compatto btn-hero-chiaro text-base">
                Guarda i numeri
                <span className="btn-hero-freccia" aria-hidden>
                  ↓
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTESTO · bianco */}
      <section className={`section-bianco ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo occhiello="Il contesto">
            Chi è <Chiave>{clientName}</Chiave>.
          </Titolo>

          {c.clientLogo && (
            <div className="mb-12 flex justify-center">
              <CaseStudyClientLogo
                src={c.clientLogo}
                alt={c.clientLogoAlt ?? clientName}
                variant="card"
                size="3xl"
                className="max-w-full"
              />
            </div>
          )}

          <div
            className={`${STRETTO} grid grid-cols-1 gap-4 ${
              contesto.length >= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
            }`}
          >
            {contesto.map((ctx) => (
              <div key={ctx.label} className="rounded-2xl border border-brand-bordo bg-brand-bianco p-6">
                <p className="eyebrow mb-2">{ctx.label}</p>
                <p className="font-medium leading-snug text-brand-nero">{ctx.value}</p>
              </div>
            ))}
          </div>

          {c.scena && (
            <figure className={`${STRETTO} mt-12 rounded-2xl border-l-4 border-brand-corallo bg-brand-bianco px-6 py-6 shadow-sm md:px-8`}>
              <p className="eyebrow mb-2">Una scena vera</p>
              <h3 className="mb-3 font-display text-xl font-bold text-brand-nero">
                {c.scena.titolo}
              </h3>
              <p className="text-pretty text-[1.02rem] leading-relaxed text-brand-grigio">
                {c.scena.testo}
              </p>
            </figure>
          )}
        </div>
      </section>

      {/* LA SFIDA · mattone: i problemi numerati */}
      <section className={`section-mattone ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo occhiello="La sfida">
            Da dove <Chiave>siamo partiti</Chiave>.
          </Titolo>

          <div
            className={`grid items-start gap-12 ${
              c.contextPhoneScreenshot ? "lg:grid-cols-[minmax(0,1fr)_300px]" : ""
            }`}
          >
            <div className={c.contextPhoneScreenshot ? "min-w-0" : STRETTO}>
              <p className="mb-10 text-pretty text-lg leading-relaxed">{c.challenge}</p>

              <ol className="grid gap-5 md:grid-cols-2">
                {c.diagnosis.map((d, i) => {
                  const { titolo, testo } = dividi(d);
                  return (
                    <li key={d} className="card-xl superficie-chiara rounded-2xl border p-6">
                      <p className="eyebrow mb-2">Problema #{i + 1}</p>
                      <h3 className="mb-2 font-display text-xl font-bold leading-snug text-brand-nero">
                        {titolo}
                      </h3>
                      {testo && <p className="leading-relaxed">{testo}</p>}
                    </li>
                  );
                })}
              </ol>
            </div>

            {c.contextPhoneScreenshot && (
              <div className="flex w-full justify-center lg:sticky lg:top-24">
                <PhoneScreenshotMockup
                  src={c.contextPhoneScreenshot.src}
                  alt={c.contextPhoneScreenshot.alt}
                  imageObjectPosition={c.contextPhoneScreenshot.imageObjectPosition}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LA SOLUZIONE · bianco: i passi uniti dalla freccia */}
      <section className={`section-bianco ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo
            occhiello="La soluzione"
            sottotitolo={`Ogni problema ha il suo passo, costruito insieme a ${clientName}. Oggi il sistema resta in mano loro.`}
          >
            Il sistema che abbiamo <Chiave>costruito insieme</Chiave>.
          </Titolo>

          <ol className={STRETTO}>
            {c.system.map((step, i) => (
              <li key={step.step}>
                <div className="flex items-start gap-5 rounded-2xl border border-brand-bordo bg-brand-bianco p-6 md:gap-6 md:p-7">
                  <span className="font-display text-4xl font-bold leading-none text-brand-corallo-text md:text-5xl">
                    {step.step}
                  </span>
                  <div className="min-w-0">
                    <h3 className="mb-2 font-display text-xl font-bold text-brand-nero">
                      {step.title}
                    </h3>
                    <p className="text-pretty leading-relaxed text-brand-grigio">
                      {step.description}
                    </p>
                  </div>
                </div>
                {i < c.system.length - 1 && (
                  <p className="py-2 text-center text-2xl font-bold text-brand-corallo-text" aria-hidden>
                    ↓
                  </p>
                )}
              </li>
            ))}
          </ol>

          <VersoLoStudio testo="Scopri se si può fare anche da te" />
        </div>
      </section>

      {/* RISULTATI · mattone (con la videorecensione, dove c'è) */}
      <section id="risultati" className={`section-mattone scroll-mt-24 ${SEZIONE}`}>
        <div className={CONTENITORE}>
          <Titolo occhiello={c.resultsEyebrow ?? "I risultati"}>
            {c.resultsHeading ?? "I numeri"}{" "}
            <Chiave>{c.resultsHeadingHighlight ?? "veri"}</Chiave>.
          </Titolo>

          {/* Le colonne seguono il numero dei risultati: con tre, niente
              casella vuota da computer e niente casella sola da telefono. */}
          <div
            className={`grid gap-4 md:gap-6 ${
              c.results.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {c.results.map((r) => {
              const compactValue =
                r.value.length > 6 || /[A-Za-zÀ-ÿ]{3,}/.test(r.value.replace(/^[+~€]/, ""));
              return (
                <div
                  key={r.label}
                  className="card-xl superficie-chiara rounded-2xl border p-6 text-center md:p-8"
                >
                  <p
                    className={`mb-2 font-display font-bold text-brand-corallo-text ${
                      compactValue ? "text-2xl leading-snug md:text-3xl" : "text-4xl md:text-5xl"
                    }`}
                  >
                    {r.value}
                  </p>
                  <h3 className="mb-1 text-sm font-semibold text-brand-nero md:text-base">{r.label}</h3>
                  {r.detail && <p className="text-xs md:text-sm">{r.detail}</p>}
                </div>
              );
            })}
          </div>

          {c.resultNote && (
            <p className={`${STRETTO} mt-10 text-pretty text-center text-base leading-relaxed md:text-lg`}>
              {c.resultNote}
            </p>
          )}

          {c.videoUrl && (
            <DeferredMount minHeight="360px" rootMargin="320px 0px">
              <div className="mt-16 grid items-start gap-6 sm:gap-8 md:mt-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
                <div className="min-w-0 overflow-hidden rounded-2xl border border-white/15 bg-black sm:rounded-3xl">
                  <VideoRecensionePoster src={c.videoUrl} label={`Videorecensione ${clientName}`} />
                </div>

                <div className="card-xl superficie-chiara min-w-0 rounded-2xl border p-6 md:p-8">
                  <p className="eyebrow mb-3">La videorecensione</p>
                  <blockquote className="mb-6 text-balance font-display text-lg font-semibold leading-relaxed text-brand-nero md:text-xl">
                    &ldquo;
                    {c.quoteSegments ? <HighlightedText segments={c.quoteSegments} /> : c.quote.text}
                    &rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3 border-t border-brand-bordo pt-4">
                    {c.clientLogo && (
                      <CaseStudyClientLogo
                        src={c.clientLogo}
                        alt={c.clientLogoAlt ?? c.quote.author}
                        variant="inline"
                        size="md"
                      />
                    )}
                    <div className="min-w-0">
                      <p className="font-display text-sm font-bold text-brand-nero">{c.quote.author}</p>
                      <p className="text-xs font-medium uppercase tracking-wide">{c.quote.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </DeferredMount>
          )}

          <VersoLoStudio />
        </div>
      </section>

      {/* PRIMA E DOPO · bianco */}
      {c.beforeAfter.length > 0 && (
        <section className={`section-bianco ${SEZIONE}`}>
          <div className={CONTENITORE}>
            <Titolo occhiello={c.evolutionEyebrow ?? "Prima e dopo"}>
              {c.evolutionHeading ?? "Cosa è cambiato"}{" "}
              <Chiave>{c.evolutionHeadingHighlight ?? `per ${clientName}`}</Chiave>.
            </Titolo>
            <div className={STRETTO}>
              <CaseStudyBeforeAfter rows={c.beforeAfter} />
            </div>
            {c.statusBadge && (
              <p className="mt-10 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-corallo-text">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-corallo" aria-hidden />
                {c.statusBadge}
              </p>
            )}
          </div>
        </section>
      )}

      {/* A CHI SERVE · mattone */}
      {c.forWhom && c.forWhom.length > 0 && (
        <section className={`section-mattone ${SEZIONE}`}>
          <div className={CONTENITORE}>
            <Titolo occhiello="A chi serve">
              Per imprese che fanno bene il lavoro e vogliono <Chiave>richieste tutto l&apos;anno</Chiave>.
            </Titolo>
            <ul className={`${STRETTO} space-y-4`}>
              {c.forWhom.map((item) => (
                <li
                  key={item}
                  className="card-xl superficie-chiara flex items-start gap-3.5 rounded-2xl border p-5"
                >
                  <span className="segno-si mt-0.5" aria-hidden>
                    ✓
                  </span>
                  <span className="leading-relaxed text-brand-nero">{item}</span>
                </li>
              ))}
            </ul>
            <VersoLoStudio testo="Ti riconosci? Richiedi lo studio di fattibilità" />
          </div>
        </section>
      )}
    </>
  );
}
