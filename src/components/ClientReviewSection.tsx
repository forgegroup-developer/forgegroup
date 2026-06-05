import Link from "next/link";
import CaseStudyClientLogo from "@/components/CaseStudyClientLogo";
import HighlightedText, { type TextSegment } from "@/components/HighlightedText";
import Reveal from "@/components/Reveal";

type Cta = { label: string; href: string };

type Props = {
  quoteSegments: TextSegment[];
  author: string;
  role: string;
  logoSrc: string;
  logoAlt: string;
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

export default function ClientReviewSection({
  quoteSegments,
  author,
  role,
  logoSrc,
  logoAlt,
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <section className="py-20 md:py-28 section-bianco">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="flex justify-center gap-1 mb-8">
            {[0, 1, 2, 3, 4].map((i) => (
              <svg key={i} className="w-6 h-6 text-brand-corallo" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.518-4.674z" />
              </svg>
            ))}
          </div>

          <blockquote
            className="text-2xl md:text-3xl lg:text-4xl font-semibold text-brand-nero leading-tight max-w-3xl mx-auto mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;
            <HighlightedText segments={quoteSegments} />
            &rdquo;
          </blockquote>

          <div className="flex items-center justify-center gap-4 mb-10">
            <CaseStudyClientLogo src={logoSrc} alt={logoAlt} variant="inline" size="lg" />
            <div className="text-left">
              <p className="text-brand-nero font-semibold text-sm">{author}</p>
              <p className="text-brand-grigio text-xs">{role}</p>
            </div>
          </div>

          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {primaryCta && (
                <Link href={primaryCta.href} className="btn-corallo">
                  {primaryCta.label}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="btn-ghost">
                  {secondaryCta.label}
                </Link>
              )}
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
