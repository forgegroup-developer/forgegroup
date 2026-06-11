import Image from "next/image";

const team = [
  {
    name: "Marco Pio Cerbone",
    forgeRole: "Co-Founder",
    role: "Direttore marketing & Consulenza aziendale",
    roleNoWrap: true,
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
    instagram: "https://www.instagram.com/chiums_films?igsh=MTl0ZWJsM2x4ZXh4Yw==",
  },
  {
    name: "Nicandro Grande",
    forgeRole: "Partner",
    role: "Consulente Crescita Digitale & Business Systems Expert",
    photo: "/images/team/foto-nicandro.png",
    linkedin:
      "https://www.linkedin.com/in/nicandrogrande?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
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

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 1.8c-3.15 0-3.5.01-4.74.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.04-.9-.19-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32-1.24-.06-1.59-.07-4.74-.07zm0 3.06a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96zm0 8.21a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46zm6.34-8.41a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0z" />
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
              <p
                className={`text-brand-grigio text-sm leading-snug ${
                  "roleNoWrap" in member && member.roleNoWrap ? "whitespace-nowrap" : ""
                }`}
              >
                {member.role}
              </p>
              {member.linkedin || member.instagram ? (
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`gap-2 ${chipOutlineClass}`}
                    >
                      <LinkedInIcon />
                      LinkedIn
                    </a>
                  ) : null}
                  {member.instagram ? (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`gap-2 ${chipOutlineClass}`}
                    >
                      <InstagramIcon />
                      Instagram
                    </a>
                  ) : null}
                </div>
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
