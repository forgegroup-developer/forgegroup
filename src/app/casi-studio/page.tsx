import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies } from "@/data/caseStudies";
import { getCaseStudyImage } from "@/data/images";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Casi Studio B2B",
  description:
    "Risultati dimostrabili: €126.500 di fatturato in 90 giorni per un'azienda Software B2B. Casi studio reali con numeri verificati.",
  alternates: { canonical: "/casi-studio" },
};

export default function CasiStudioHub() {
  return (
    <>
      <section className="pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">✦ Casi Studio</p>
          <h1 className="heading-hero font-semibold text-brand-nero leading-tight mb-6">
            Risultati <span className="text-brand-corallo">Dimostrabili</span>.
          </h1>
          <p className="text-xl text-brand-grigio leading-relaxed">
            Zero teorie. Solo numeri. Come abbiamo trasformato l&apos;infrastruttura di acquisizione di DISA SRL in 90 giorni.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-brand-corallo/12 backdrop-blur-md border-y border-brand-bordo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            {caseStudies.map((c, idx) => (
              <Reveal key={c.slug} delay={(idx % 3) as 0 | 1 | 2 | 3}>
                <Link
                  href={`/casi-studio/${c.slug}`}
                  className="group bg-brand-bianco border border-brand-bordo rounded-3xl overflow-hidden hover:border-brand-corallo hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={getCaseStudyImage(c.slug)}
                      alt={c.shortTitle}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-nero/70 via-brand-nero/20 to-transparent" />
                    <span className="absolute top-3 left-3 text-xs uppercase tracking-widest text-white font-bold bg-brand-corallo px-3 py-1 rounded-full">
                      {c.sector}
                    </span>
                    <h2 className="absolute bottom-4 left-4 right-4 text-white font-semibold text-lg leading-tight drop-shadow-lg">
                      {c.shortTitle}
                    </h2>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="text-2xl font-semibold text-brand-corallo mb-3">
                      {c.resultHeadline}
                    </div>
                    <p className="text-sm text-brand-grigio mb-6 flex-grow">{c.excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-brand-corallo font-bold text-sm group-hover:gap-3 transition-all">
                      Leggi il caso studio
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={
          <>
            Vuoi <span className="text-brand-corallo">risultati come questi</span>?
          </>
        }
        description="I casi studio non sono fortuna: sono il risultato di un sistema replicabile. Compila la prequalifica e vediamo se ha senso costruire il tuo."
        primary={{ label: "HAI UN MINUTO?", href: "/contatti" }}
        secondary={{ label: "Vedi i servizi", href: "/servizi" }}
      />
    </>
  );
}
