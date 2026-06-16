"use client";

import Image from "next/image";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import Reveal from "@/components/Reveal";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-vision-name",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-vision-role",
  display: "swap",
});

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

const founders = [
  {
    name: "Marco Pio Cerbone",
    role: "Co-Founder · Direttore marketing & Consulenza aziendale",
  },
  {
    name: "Gianpio Uva",
    role: "Co-Founder · Direttore Commerciale & Sales Process",
  },
];

const editorialCards = [
  {
    photo: "/images/team/vision/marco-editorial.png",
    alt: "Marco Pio Cerbone al lavoro con Forge Group",
    offset: "down" as const,
  },
  {
    photo: "/images/team/vision/gianpio-editorial.png",
    alt: "Gianpio Uva al lavoro con Forge Group",
    offset: "up" as const,
  },
  {
    photo: "/images/team/vision/francesco-editorial.png",
    alt: "Francesco Chiumiento al lavoro con Forge Group",
    offset: "down" as const,
  },
];

function EditorialPhotoCard({
  src,
  alt,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-brand-bordo bg-brand-panna shadow-[0_16px_48px_-20px_rgba(17,17,17,0.18)]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center"
        sizes={sizes}
        quality={90}
        priority={priority}
      />
      <div className={`pointer-events-none absolute inset-0 ${CORAL_OVERLAY}`} aria-hidden />
    </div>
  );
}

function FoundersHeroPhoto({ priority }: { priority?: boolean }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl border border-brand-bordo bg-brand-panna shadow-[0_20px_56px_-24px_rgba(17,17,17,0.2)] sm:aspect-[21/9]">
      <Image
        src="/images/team/vision/founders-duo.png"
        alt="Marco Pio Cerbone e Gianpio Uva, co-founder di Forge Group"
        fill
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, 1152px"
        quality={90}
        priority={priority}
      />
      <div className={`pointer-events-none absolute inset-0 ${CORAL_OVERLAY}`} aria-hidden />
    </div>
  );
}

export default function VisionSection() {
  return (
    <section className="relative overflow-hidden border-y section-visione py-16 md:py-24 lg:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, color-mix(in srgb, var(--color-brand-pesca) 40%, transparent), transparent 45%), radial-gradient(circle at 80% 90%, color-mix(in srgb, var(--color-brand-corallo) 12%, transparent), transparent 50%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-brand-corallo) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className={`${bricolage.variable} ${hanken.variable} relative z-10`}>
        {/* Intestazione manifesto */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal y={28} duration={1}>
            <p className="eyebrow mb-6 text-center lg:text-left">✦ Visione</p>
            <h1 className="heading-hero text-brand-nero mb-8 text-center lg:text-left text-balance">
              Forge Group nasce da una <span className="text-brand-corallo">domanda semplice</span>.
            </h1>
            <p className="text-xl md:text-2xl text-brand-grigio leading-relaxed text-center lg:text-left text-balance">
              Perché tante aziende che hanno tutto per crescere, non crescono?
            </p>
          </Reveal>
        </div>

        {/* Corpo manifesto */}
        <div className="mx-auto mt-12 max-w-3xl px-4 sm:px-6 lg:px-8 md:mt-16">
          <div className="space-y-6 text-lg leading-relaxed text-brand-grigio md:space-y-8 md:text-xl md:leading-relaxed">
            {manifestoParagraphs.map((paragraph, index) => (
              <Reveal key={index} delay={index + 1} y={22} duration={0.95}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Galleria editoriale */}
        <div className="mx-auto mt-20 max-w-6xl px-4 sm:px-6 lg:mt-28 lg:px-8">
          <Reveal y={28} duration={1}>
            <FoundersHeroPhoto priority />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
              {founders.map((founder) => (
                <div key={founder.name} className="text-center sm:text-left">
                  <p
                    className="text-lg font-semibold text-brand-nero md:text-xl"
                    style={{ fontFamily: "var(--font-vision-name)" }}
                  >
                    {founder.name}
                  </p>
                  <p
                    className="mt-1 text-sm leading-snug text-brand-grigio md:text-base"
                    style={{ fontFamily: "var(--font-vision-role)" }}
                  >
                    {founder.role}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:mt-24 md:grid-cols-2 md:gap-8">
            {editorialCards.map((card, index) => (
              <Reveal
                key={card.photo}
                delay={index * 2}
                y={24}
                duration={0.95}
                className={
                  card.offset === "up"
                    ? "md:mt-16 lg:mt-24"
                    : index === editorialCards.length - 1
                      ? "md:col-span-2 md:mx-auto md:max-w-md"
                      : undefined
                }
              >
                <EditorialPhotoCard
                  src={card.photo}
                  alt={card.alt}
                  sizes={
                    index === editorialCards.length - 1
                      ? "(max-width: 768px) 100vw, 448px"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
