import type { Metadata } from "next";
import CaseStudyCarousel from "@/components/CaseStudyCarousel";
import SectionHeader from "@/components/SectionHeader";

export const metadata: Metadata = {
  title: "Casi Studio",
  description:
    "Risultati dimostrabili: software B2B, edilizia B2C, edilizia B2B, hospitality. Casi studio reali con numeri verificati e progetti attivi.",
  alternates: { canonical: "/casi-studio" },
};

export default function CasiStudioHub() {
  return (
    <>
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 section-bianco overflow-hidden">
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
      </section>
    </>
  );
}
