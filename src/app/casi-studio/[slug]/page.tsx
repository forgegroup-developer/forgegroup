import { notFound } from "next/navigation";
import type { Metadata } from "next";
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
  };
}

export default async function CasoStudioDetail({ params }: Props) {
  const { slug } = await params;
  const c = getCaseStudyBySlug(slug);
  if (!c) notFound();

  return <CaseStudyDetail c={c} showBackLink />;
}
