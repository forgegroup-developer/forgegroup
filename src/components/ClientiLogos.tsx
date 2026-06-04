const clienti = [
  { name: "Rovi Arredo Negozi", src: "/images/clienti/rovi.png" },
  { name: "EVA Consulting", src: "/images/clienti/eva-consulting.png" },
  { name: "Tettitop", src: "/images/clienti/tettitop.png" },
  { name: "DISA Appalti & Servizi", src: "/images/clienti/disa.png" },
  { name: "SOS Appalti", src: "/images/clienti/sos-appalti.png" },
];

function LogoItem({ name, src }: { name: string; src: string }) {
  return (
    <div
      role="img"
      aria-label={name}
      title={name}
      className="logo-corallo mx-8 h-12 w-32 shrink-0 md:mx-12 md:h-14 md:w-40"
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
      }}
    />
  );
}

export default function ClientiLogos() {
  return (
    <div className="mt-16 md:mt-20">
      <p className="text-center text-xs uppercase tracking-widest text-white/80 font-semibold mb-8">
        ✦ Alcuni dei nostri clienti
      </p>
      <div className="logo-marquee relative overflow-hidden rounded-3xl bg-brand-bianco py-8 md:py-10">
        {/* sfumature laterali */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28 bg-gradient-to-r from-brand-bianco to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28 bg-gradient-to-l from-brand-bianco to-transparent" />

        <div className="logo-marquee-track">
          {[...clienti, ...clienti].map((c, i) => (
            <LogoItem key={`${c.name}-${i}`} name={c.name} src={c.src} />
          ))}
        </div>
      </div>
    </div>
  );
}
