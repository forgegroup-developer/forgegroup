import Image from "next/image";

const clienti = [
  { name: "Rovi Arredo Negozi", src: "/images/clienti/rovi.png" },
  { name: "EVA Consulting", src: "/images/clienti/eva-consulting.png" },
  { name: "Tettitop", src: "/images/clienti/tettitop.png" },
  { name: "DISA Appalti & Servizi", src: "/images/clienti/disa.png" },
  { name: "SOS Appalti", src: "/images/clienti/sos-appalti.png" },
];

function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div className="relative mx-6 h-20 w-36 shrink-0 md:mx-10 md:h-24 md:w-44">
      <Image
        src={src}
        alt={name}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 144px, 176px"
        draggable={false}
      />
    </div>
  );
}

export default function ClientiLogos() {
  return (
    <section className="py-14 md:py-20 bg-brand-bianco border-y border-brand-bordo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center eyebrow mb-3">✦ Alcuni dei nostri clienti</p>
        <h2 className="text-center heading-section text-brand-nero mb-12">
          Imprese che hanno scelto di <span className="text-brand-corallo">crescere con noi</span>
        </h2>

        <div className="logo-marquee relative overflow-hidden">
          {/* sfumature laterali */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-32 bg-gradient-to-r from-brand-bianco to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-32 bg-gradient-to-l from-brand-bianco to-transparent" />

          <div className="logo-marquee-track">
            {[...clienti, ...clienti].map((c, i) => (
              <LogoItem key={`${c.name}-${i}`} name={c.name} src={c.src} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
