import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { caseStudies, getCaseStudyBySlug } from "@/data/caseStudies";
import { getCaseStudyImage } from "@/data/images";
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudyBySlug(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.metaDescription,
    alternates: { canonical: `/casi-studio/${c.slug}` },
    openGraph: {
      title: `${c.title} — Forge Group`,
      description: c.metaDescription,
      url: `/casi-studio/${c.slug}`,
      images: [
        {
          url: getCaseStudyImage(c.slug),
          width: 1200,
          height: 630,
          alt: c.title,
        },
      ],
    },
  };
}

export default async function CasoStudioDetail({ params }: Props) {
  const { slug } = await params;
  const c = getCaseStudyBySlug(slug);
  if (!c) notFound();


  return (
    <>
      {/* HERO */}
      <section className="pt-16 pb-0 md:pt-24 section-coral border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 copy-on-coral">
          <Link href="/casi-studio" className="inline-flex items-center gap-2 text-sm link-coral mb-6 hover:underline">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Tutti i casi studio
          </Link>
          <p className="eyebrow-coral mb-6">✦ {c.sector}</p>
          <h1 className="heading-hero font-semibold leading-tight mb-6">
            {c.resultHeadline}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">{c.excerpt}</p>
        </div>
        {/* Video testimonianza */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
          <div className="rounded-3xl overflow-hidden border border-white/20 shadow-lg bg-brand-nero">
            <video
              controls
              preload="metadata"
              playsInline
              poster={getCaseStudyImage(c.slug)}
              className="w-full block aspect-video object-cover"
            >
              <source src={c.videoUrl ?? "/video-recensione.mp4"} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="py-16 md:py-20 bg-brand-bianco">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ Il Contesto</p>
          <h2 className="text-2xl font-semibold md:text-4xl font-semibold text-brand-nero leading-tight mb-8">
            Chi era il cliente.
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {c.context.map((ctx, i) => (
              <div key={i} className="bg-brand-panna border border-brand-bordo rounded-lg p-5">
                <div className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-1">
                  {ctx.label}
                </div>
                <div className="text-brand-nero font-medium">{ctx.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="py-16 md:py-20 section-coral border-y">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="copy-on-coral mb-8">
            <p className="eyebrow-coral mb-4">✦ La Sfida</p>
            <h2 className="heading-section leading-tight mb-6">
              Da dove <span>siamo partiti</span>.
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">{c.challenge}</p>
          </div>

          <div className="bg-brand-bianco border border-brand-bordo rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-semibold font-bold text-brand-nero mb-4">
              La diagnosi Forge:
            </h3>
            <ul className="space-y-3">
              {c.diagnosis.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    ✕
                  </span>
                  <span className="text-brand-nero">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SISTEMA */}
      <section className="py-16 md:py-24 bg-brand-bianco">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ La Soluzione</p>
            <h2 className="heading-section font-semibold text-brand-nero leading-tight">
              Il sistema che <span className="text-brand-corallo">abbiamo implementato</span>.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {c.system.map((step) => (
              <div
                key={step.step}
                className="bg-brand-panna border border-brand-bordo rounded-2xl p-7 hover:border-brand-corallo transition-colors"
              >
                <div className="font-display text-5xl font-semibold text-brand-corallo mb-4">{step.step}</div>
                <h3 className="text-lg font-semibold font-bold text-brand-nero mb-3">{step.title}</h3>
                <p className="text-brand-grigio leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RISULTATI */}
      <section className="py-16 md:py-24 section-coral border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 copy-on-coral">
            <p className="eyebrow-coral mb-4">✦ I Risultati</p>
            <h2 className="heading-section font-semibold text-brand-nero leading-tight">
              I numeri <span className="text-brand-corallo">reali</span>.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {c.results.map((r, i) => (
              <div
                key={i}
                className="bg-brand-bianco border border-brand-bordo rounded-2xl p-6 md:p-8 text-center hover:border-brand-corallo transition-colors"
              >
                <div className="text-4xl md:text-5xl font-semibold text-brand-corallo mb-2">
                  {r.value}
                </div>
                <p className="text-brand-nero font-semibold text-sm md:text-base mb-1">{r.label}</p>
                {r.detail && <p className="text-xs md:text-sm text-brand-grigio">{r.detail}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVOLUZIONE — Cosa è successo dopo */}
      {c.evolution && (
        <section className="py-16 md:py-24 bg-brand-bianco">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs uppercase tracking-widest text-brand-corallo font-bold mb-4">✦ Cosa è successo dopo</p>
            <h2 className="heading-section font-semibold text-brand-nero leading-tight mb-8">
              Da progetto a <span className="text-brand-corallo">sistema scalabile</span>.
            </h2>
            <div className="rounded-2xl border-l-4 border-brand-corallo bg-brand-pesca-light px-6 py-6 md:px-9 md:py-8">
              <p className="text-lg md:text-xl text-brand-nero leading-relaxed">{c.evolution}</p>
            </div>
          </div>
        </section>
      )}

      {/* QUOTE */}
      <section className="py-16 md:py-24 bg-brand-bianco">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-pesca-light border-2 border-brand-corallo rounded-2xl p-8 md:p-14 text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} className="w-6 h-6 text-brand-corallo" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.539 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.075 9.101c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.518-4.674z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-xl font-semibold md:text-3xl font-bold text-brand-nero leading-snug mb-6">
              &ldquo;{c.quote.text}&rdquo;
            </blockquote>
            <div>
              <div className="font-semibold text-brand-nero">{c.quote.author}</div>
              <div className="text-sm text-brand-corallo mt-1">{c.quote.role}</div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
