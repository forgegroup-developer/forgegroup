import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CaseStudyDetail from "@/components/CaseStudyDetail";
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
      title: `${c.title} | Forge Group`,
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
    twitter: {
      card: "summary_large_image",
      title: `${c.title} | Forge Group`,
      description: c.metaDescription,
      images: [getCaseStudyImage(c.slug)],
    },
  };
}

export default async function CasoStudioDetail({ params }: Props) {
  const { slug } = await params;
  const c = getCaseStudyBySlug(slug);
  if (!c) notFound();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Casi Studio", href: "/casi-studio" },
            { label: c.shortTitle },
          ]}
        />
      </div>
      <CaseStudyDetail c={c} showBackLink />
    </>
  );
}
