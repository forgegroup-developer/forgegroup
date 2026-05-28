import Link from "next/link";

type CTAProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export default function CTASection({
  eyebrow = "Pronto a iniziare?",
  title,
  description,
  primary = { label: "HAI UN MINUTO?", href: "/contatti" },
  secondary,
}: CTAProps) {
  return (
    <section className="py-16 md:py-24 bg-brand-bianco">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-glow-bg relative overflow-hidden rounded-3xl bg-brand-panna border border-brand-bordo p-8 md:p-16 text-center">
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-brand-pesca rounded-full blur-[80px] opacity-40" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-corallo/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <p className="eyebrow mb-4">✦ {eyebrow}</p>
            <h2 className="heading-section text-brand-nero max-w-3xl mx-auto">
              {title}
            </h2>
            {description && (
              <p className="mt-6 text-lg md:text-xl text-brand-grigio max-w-2xl mx-auto leading-relaxed">
                {description}
              </p>
            )}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={primary.href} className="btn-corallo">
                {primary.label}
              </Link>
              {secondary && (
                <Link href={secondary.href} className="btn-ghost">
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
