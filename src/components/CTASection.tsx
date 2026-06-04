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
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Card corallo */}
        <div className="bg-brand-corallo rounded-3xl px-8 py-12 md:px-16 md:py-16 text-center shadow-xl">
          {eyebrow && (
            <p className="text-xs uppercase tracking-widest text-white/75 font-bold mb-5">
              ✦ {eyebrow}
            </p>
          )}
          {/* Titolo: bianco con keyword in nero per contrasto massimo */}
          <h2 className="heading-section text-white max-w-2xl mx-auto [&_span]:text-brand-nero [&_span]:font-extrabold">
            {title}
          </h2>
          {description && (
            <p className="mt-6 text-base md:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primary.href}
              className="inline-flex items-center justify-center rounded-full bg-brand-nero px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-sm transition-all duration-200 hover:bg-brand-nero/85 hover:-translate-y-0.5"
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
      </div>
    </section>
  );
}
