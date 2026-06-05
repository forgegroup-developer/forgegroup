import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import CaseStudyClientLogo from "@/components/CaseStudyClientLogo";
import { caseStudies } from "@/data/caseStudies";
import { getCaseStudyImage } from "@/data/images";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Casi Studio",
  description:
    "Risultati dimostrabili: software B2B, edilizia B2C, edilizia B2B, hospitality. Casi studio reali con numeri verificati e progetti attivi.",
  alternates: { canonical: "/casi-studio" },
};

export default function CasiStudioHub() {
  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ Casi Studio</p>
          <h1 className="heading-hero font-semibold text-brand-nero leading-tight mb-8 md:mb-10">
            Risultati <span className="text-brand-corallo">Dimostrabili</span>.
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {caseStudies
              .filter((c) => c.clientLogo)
              .map((c) => (
                <CaseStudyClientLogo
                  key={c.slug}
                  src={c.clientLogo!}
                  alt={c.clientLogoAlt ?? c.shortTitle}
                  variant="inline"
                  size="lg"
                />
              ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 section-coral border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={
              caseStudies.length === 1
                ? "max-w-xl mx-auto"
                : "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            }
          >
            {caseStudies.map((c, idx) => (
              <Reveal key={c.slug} delay={(idx % 3) as 0 | 1 | 2 | 3}>
                <article className="group bg-brand-bianco border border-brand-bordo rounded-3xl overflow-hidden hover:border-brand-corallo hover:shadow-xl transition-all flex flex-col h-full">
                  <Link
                    href={`/casi-studio/${c.slug}`}
                    className="block relative aspect-video overflow-hidden bg-brand-panna"
                  >
                    <Image
                      src={getCaseStudyImage(c.slug)}
                      alt={c.shortTitle}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-nero/70 via-brand-nero/20 to-transparent" />
                    <span className="absolute top-3 left-3 text-xs uppercase tracking-widest text-white font-bold bg-brand-corallo px-3 py-1 rounded-full">
                      {c.sector}
                    </span>
                    {c.clientLogo && (
                      <div className="absolute top-3 right-3">
                        <CaseStudyClientLogo src={c.clientLogo} alt={c.clientLogoAlt ?? c.shortTitle} />
                      </div>
                    )}
                    <h2 className="absolute bottom-4 left-4 right-20 text-brand-bianco font-semibold text-lg leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                      {c.shortTitle}
                    </h2>
                  </Link>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="text-2xl font-semibold text-brand-corallo mb-3">{c.resultHeadline}</div>
                    <p className="text-sm text-brand-grigio mb-6 flex-grow leading-relaxed">{c.hubExcerpt}</p>
                    <Link
                      href={`/casi-studio/${c.slug}`}
                      className="btn-corallo w-full text-center text-sm py-3.5 mt-auto group-hover:translate-y-[-2px]"
                    >
                      Leggi il caso studio
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
