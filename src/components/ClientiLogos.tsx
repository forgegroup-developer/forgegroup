import Image from "next/image";

const clienti = [
  { name: "Rovi Arredo Negozi", src: "/images/clienti/rovi.png" },
  { name: "EVA Consulting", src: "/images/clienti/eva-consulting.png" },
  { name: "Tettitop", src: "/images/clienti/tettitop.png" },
  { name: "DISA Appalti & Servizi", src: "/images/clienti/disa.png" },
  { name: "SOS Appalti", src: "/images/clienti/sos-appalti.png" },
];

export default function ClientiLogos() {
  return (
    <section className="py-12 md:py-16 bg-brand-bianco border-b border-brand-bordo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase tracking-widest text-brand-grigio font-semibold mb-10">
          ✦ Alcuni dei nostri clienti
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {clienti.map((c) => (
            <div
              key={c.name}
              className="relative h-10 w-32 md:h-12 md:w-36 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={c.src}
                alt={c.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 144px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
