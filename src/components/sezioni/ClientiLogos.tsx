import Image from "next/image";
import Link from "next/link";
import { clientLogos } from "@/data/clientLogos";

/**
 * Barra prova. Ogni numero e' attribuito al cliente da cui viene e proviene
 * dai `results` del suo caso studio: niente totali aggregati, che sarebbero
 * un dato che nessuno ha misurato, e niente contatori vuoti.
 */
const prove = [
  {
    valore: "+350K€",
    etichetta: "Fatturato generato",
    cliente: "DISA · SOS Appalti",
    href: "/casi-studio/software-b2b",
  },
  {
    valore: "175K€",
    etichetta: "Il preventivo più alto",
    cliente: "Tetti Top",
    href: "/casi-studio/edilizia",
  },
  {
    valore: "25K€",
    etichetta: "Chiusi in quattro mesi",
    cliente: "ROVI Arredo Negozi",
    href: "/casi-studio/arredo-commerciale",
  },
];

const clienti = [
  clientLogos.rovi,
  clientLogos.evaConsulting,
  clientLogos.tettitop,
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
        <p className="flex justify-center eyebrow eyebrow-mark mb-3">
          Alcuni dei nostri clienti
        </p>
        <h2 className="text-center heading-section-xl text-balance mb-10 md:mb-12">
          Imprese che hanno scelto di{" "}
          <span className="text-brand-corallo-text">crescere con noi</span>
        </h2>

        <div className="mb-12 grid gap-8 sm:grid-cols-3 sm:gap-6 md:mb-16">
          {prove.map((p) => (
            <Link
              key={`${p.cliente}-${p.etichetta}`}
              href={p.href}
              className="stat-rule group block text-center sm:text-left"
            >
              <p className="stat-number stat-number-col">{p.valore}</p>
              <p className="mt-3 text-sm font-semibold leading-snug text-brand-nero md:text-base">
                {p.etichetta}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-brand-grigio group-hover:text-brand-corallo-text">
                {p.cliente}
              </p>
            </Link>
          ))}
        </div>

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
