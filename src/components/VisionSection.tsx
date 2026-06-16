"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import VisionBeliefCards from "@/components/VisionBeliefCards";

const CORAL_OVERLAY = "bg-[#C0471A]/[0.175]";

const manifestoParagraphs = [
  "La risposta, quasi sempre, è la stessa. Non manca il prodotto. Non mancano le persone. Manca qualcuno che entra dentro, capisce come funziona davvero quell'azienda, e costruisce con loro qualcosa che regge nel tempo.",
  "Noi non consegniamo campagne e sparissimo. Entriamo, restiamo, lavoriamo fianco a fianco — sul marketing, sul processo commerciale, sulla struttura. Finché non gira da solo.",
  "Ma quello che ci interessa davvero non è solo il numero a fine mese. È quello che succede dentro quell'azienda quando le cose iniziano ad andare bene. Come cambia l'imprenditore. Come respira il suo team. Quanto tempo riesce finalmente a dedicare a quello che conta.",
  "Perché crediamo che un'azienda sana costruisce persone sane.",
  "Chi lavora con noi — cliente o collaboratore — trova un ambiente preciso. Fatto di lealtà, trasparenza, lavoro vero e una bussola di valori che non cambia in base alla convenienza.",
  "Non cerchiamo clienti da gestire. Cerchiamo imprenditori con cui costruire.",
  "Se leggendo questo hai sentito qualcosa, il resto lo scopriamo davanti a un caffè.",
];

function FoundersHeroPhoto() {
  return (
    <div className="relative min-h-[340px] w-full overflow-hidden rounded-3xl border border-brand-bordo bg-brand-panna shadow-[0_24px_64px_-24px_rgba(17,17,17,0.24)] sm:min-h-[420px] md:min-h-[520px] lg:min-h-[620px] xl:min-h-[720px]">
      <Image
        src="/images/team/vision/founders-duo.png"
        alt="Marco Pio Cerbone e Gianpio Uva, co-founder di Forge Group"
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 1400px"
        quality={90}
      />
      <div className={`pointer-events-none absolute inset-0 ${CORAL_OVERLAY}`} aria-hidden />
    </div>
  );
}

export default function VisionSection() {
  return (
    <>
      {/* Hero atmosferica */}
      <section className="vision-hero-atmosphere relative flex min-h-[88dvh] items-center justify-center overflow-hidden border-b md:min-h-screen">
        <div className="pointer-events-none absolute inset-0 z-0 select-none" aria-hidden>
          <Image
            src="/images/team/vision/hero-atmosphere.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-pesca-light/25 via-transparent to-[#faece7]/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#faece7]/80 via-transparent to-brand-pesca-light/20" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--color-brand-corallo) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-28 text-center sm:px-6 md:py-36">
          <Reveal y={32} duration={1.1}>
            <p className="eyebrow mb-6">✦ Visione</p>
            <h1 className="heading-hero heading-hero-home text-brand-nero mb-8 text-balance">
              Forge Group nasce da una <span className="text-brand-corallo">domanda semplice</span>.
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-brand-grigio md:text-2xl text-balance">
              Perché tante aziende che hanno tutto per crescere, non crescono?
            </p>
          </Reveal>
        </div>
      </section>

      {/* Manifesto */}
      <section className="section-visione border-b py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:max-w-4xl">
          <div className="space-y-6 text-lg leading-relaxed text-brand-grigio md:space-y-8 md:text-xl md:leading-relaxed">
            {manifestoParagraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index + 1} y={22} duration={0.95}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Card inclinate — blocco scuro full-width */}
      <VisionBeliefCards />

      {/* Founders duo */}
      <section className="section-visione border-b py-16 md:py-24 lg:py-28">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal y={28} duration={1}>
            <FoundersHeroPhoto />
          </Reveal>
        </div>
      </section>
    </>
  );
}
