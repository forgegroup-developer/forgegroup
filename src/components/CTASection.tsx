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
    <section className="py-16 md:py-24 bg-brand-corallo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs uppercase tracking-widest text-white/80 font-bold mb-4">
          ✦ {eyebrow}
        </p>
        <h2 className="heading-section text-white max-w-3xl mx-auto [&_span]:text-brand-pesca-light">
          {title}
        </h2>
        {description && (
          <p className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={primary.href}
            className="inline-flex items-center justify-center rounded-full border-2 border-white bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-brand-corallo shadow-sm transition-all duration-200 hover:bg-white/90 hover:-translate-y-0.5"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:bg-white/15 hover:-translate-y-0.5"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
