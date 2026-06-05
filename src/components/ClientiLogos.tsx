import Image from "next/image";
import { clientLogos } from "@/data/clientLogos";

const clienti = [
  clientLogos.rovi,
  clientLogos.evaConsulting,
  clientLogos.tettitop,
  clientLogos.hotelDream,
  clientLogos.disa,
  clientLogos.sosAppalti,
];

function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="relative mx-7 h-16 w-40 shrink-0 md:mx-12 md:h-24 md:w-56">
      <Image
        src={src}
        alt={name}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 160px, 224px"
        draggable={false}
      />
    </div>
  );
}

export default function ClientiLogos() {
  return (
    <section className="py-14 md:py-20 section-bianco-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center eyebrow mb-3">✦ Alcuni dei nostri clienti</p>
        <h2 className="text-center heading-section text-brand-nero mb-10 md:mb-14">
          Imprese che hanno scelto di <span className="text-brand-corallo">crescere con noi</span>
        </h2>

        <div className="logo-marquee relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 md:w-32 bg-gradient-to-r from-brand-bianco to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 md:w-32 bg-gradient-to-l from-brand-bianco to-transparent" />

          <div className="logo-marquee-track flex items-center">
            {[...clienti, ...clienti, ...clienti].map((c, i) => (
              <LogoItem key={`${c.alt}-${i}`} name={c.alt} src={c.src} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
