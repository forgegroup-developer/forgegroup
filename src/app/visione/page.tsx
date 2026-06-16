import type { Metadata } from "next";
import HeroGooeySection from "@/components/HeroGooeySection";
import VisionTeamGallery from "@/components/VisionTeamGallery";

export const metadata: Metadata = {
  title: "Visione",
  description:
    "La visione di Forge Group: perché entriamo nelle aziende, restiamo e costruiamo sistemi che reggono nel tempo. Lealtà, trasparenza e imprenditori con cui crescere.",
  alternates: { canonical: "/visione" },
  openGraph: {
    title: "Visione | Forge Group",
    description:
      "Manifesto Visione Forge Group: lavoro fianco a fianco con imprenditori B2B finché il sistema gira da solo.",
    url: "/visione",
    images: [{ url: "/logo.png", width: 1024, height: 1024, alt: "Forge Group" }],
  },
  twitter: {
    card: "summary",
    title: "Visione | Forge Group",
    description: "La visione e il team di Forge Group.",
  },
};

export default function VisionePage() {
  return (
    <>
      <HeroGooeySection innerClassName="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-6">
          ✦ Visione
        </p>
        <h1 className="heading-hero text-brand-nero mb-8">
          Forge Group nasce da una <span className="text-brand-corallo">domanda semplice</span>.
        </h1>
        <p className="text-xl md:text-2xl text-brand-grigio leading-relaxed">
          Perché tante aziende che hanno tutto per crescere, non crescono?
        </p>
      </HeroGooeySection>

      <section className="py-16 md:py-24 section-visione border-y">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none leading-relaxed space-y-4 text-brand-grigio">
            <p>
              La risposta, quasi sempre, è la stessa. Non manca il prodotto. Non mancano le persone.
              Manca qualcuno che entra dentro, capisce come funziona davvero quell&apos;azienda, e costruisce
              con loro qualcosa che regge nel tempo.
            </p>
            <p>
              Noi non consegniamo campagne e sparissimo. Entriamo, restiamo, lavoriamo fianco a fianco — sul
              marketing, sul processo commerciale, sulla struttura. Finché non gira da solo.
            </p>
            <p>
              Ma quello che ci interessa davvero non è solo il numero a fine mese. È quello che succede dentro
              quell&apos;azienda quando le cose iniziano ad andare bene. Come cambia l&apos;imprenditore. Come
              respira il suo team. Quanto tempo riesce finalmente a dedicare a quello che conta.
            </p>
            <p>Perché crediamo che un&apos;azienda sana costruisce persone sane.</p>
            <p>
              Chi lavora con noi — cliente o collaboratore — trova un ambiente preciso. Fatto di lealtà,
              trasparenza, lavoro vero e una bussola di valori che non cambia in base alla convenienza.
            </p>
            <p>Non cerchiamo clienti da gestire. Cerchiamo imprenditori con cui costruire.</p>
            <p>
              Se leggendo questo hai sentito qualcosa, il resto lo scopriamo davanti a un caffè.
            </p>
          </div>

          <VisionTeamGallery />
        </div>
      </section>
    </>
  );
}
