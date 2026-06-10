import Image from "next/image";

const team = [
  {
    name: "Marco Pio Cerbone",
    forgeRole: "Co-Founder",
    role: "Direttore marketing & Consulenza aziendale",
    photo: "/images/team/foto-marco.png",
    linkedin: "https://www.linkedin.com/in/marco-pio-cerbone-01520b2a6",
  },
  {
    name: "Gianpio Uva",
    forgeRole: "Co-Founder",
    role: "Direttore Commerciale & Sales Process",
    photo: "/images/team/foto-gianpio.png",
    linkedin: "https://www.linkedin.com/in/gianpio-uva-9170432b9",
  },
  {
    name: "Francesco Chiumiento",
    forgeRole: "Partner",
    role: "Direttore Creative & Video Producer",
    photo: "/images/team/foto-francesco.png",
  },
  {
    name: "Nicandro Grande",
    forgeRole: "Partner",
    role: "Consulente Crescita Digitale & Business Systems Expert",
    photo: "/images/team/foto-nicandro.png",
  },
];

const collaborators = [
  "Consulenti Aziendali",
  "Commerciali Esperti",
  "Meta Ads Specialist",
  "Google Ads Specialist",
  "Posizionamento Google & IA",
  "Web Master",
  "Formatori & Imprenditori",
  "Videomaker & Fotografi Professionisti",
];

const chipOutlineClass =
  "inline-flex items-center rounded-full border-2 border-brand-corallo bg-transparent px-5 py-2.5 text-sm font-semibold text-brand-corallo shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-corallo/10";

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

export default function TeamSection() {
  return (
    <section className="py-20 md:py-28 section-bianco">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="eyebrow mb-4">✦ Il Nostro Team</p>
        <h2 className="heading-section text-brand-nero max-w-2xl mx-auto mb-16">
          Le persone dietro <span className="text-brand-corallo">Forge Group</span>
        </h2>

        <div className="flex flex-wrap justify-center items-start gap-10 md:gap-12">
          {team.map((member) => (
            <div
              key={member.name}
              className="group flex w-[min(100%,260px)] flex-col items-center text-center sm:w-[280px]"
            >
              <div className="relative w-full aspect-[2/3] overflow-hidden rounded-2xl border border-brand-bordo bg-brand-panna shadow-[0_12px_40px_rgba(17,17,17,0.1)] transition-shadow duration-300 group-hover:shadow-[0_16px_48px_rgba(17,17,17,0.14)]">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={640}
                    height={960}
                    className="h-full w-full object-cover object-center"
                    sizes="(max-width: 640px) 260px, 280px"
                    quality={95}
                    unoptimized
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center font-display text-4xl font-bold text-brand-corallo md:text-5xl"
                    aria-hidden
                  >
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-1 text-brand-nero">{member.name}</h3>
              <p className="text-brand-corallo text-sm font-semibold leading-snug mb-1">
                {member.forgeRole}
              </p>
              <p className="text-brand-grigio text-sm leading-snug">{member.role}</p>
              {member.linkedin ? (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 gap-2 ${chipOutlineClass}`}
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-28 pt-16 border-t border-brand-bordo">
          <h3 className="heading-section text-brand-nero max-w-3xl mx-auto mb-12">
            Forge Group è una realtà formata dai{" "}
            <span className="text-brand-corallo">migliori talenti del settore</span>.
          </h3>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {collaborators.map((label) => (
              <span key={label} className={chipOutlineClass}>
                {label}
              </span>
            ))}
            <span className={chipOutlineClass}>e molti altri</span>
          </div>
        </div>
      </div>
    </section>
  );
}
