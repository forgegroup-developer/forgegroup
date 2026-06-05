import Link from "next/link";
import type { Metadata } from "next";
import CaseStudyCarousel from "@/components/CaseStudyCarousel";
import CaseStudyClientLogo from "@/components/CaseStudyClientLogo";
import SectionHeader from "@/components/SectionHeader";
import { caseStudies } from "@/data/caseStudies";

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

      <section className="py-20 md:py-28 section-bianco overflow-hidden border-t border-brand-bordo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Casi Studio"
            maxWidth="4xl"
            title={
              <>
                Risultati <span className="text-brand-corallo">verificati</span>. Sei pronto a diventare il{" "}
                <span className="text-brand-corallo">nostro prossimo caso studio</span>?
              </>
            }
          />
        </div>
        <CaseStudyCarousel />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mt-10 md:mt-12">
            <Link href="/contatti" className="btn-corallo">
              Sono pronto per iniziare
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
