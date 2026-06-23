import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import SeoHubNav from "@/components/SeoHubNav";
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.forgegroup.it/" },
      { "@type": "ListItem", position: 2, name: "Casi Studio", item: "https://www.forgegroup.it/casi-studio" },
      {
        "@type": "ListItem",
        position: 3,
        name: c.shortTitle,
        item: `https://www.forgegroup.it/casi-studio/${c.slug}`,
      },
    ],
  };

  return (
    <>
      <script id={`ld-breadcrumb-${c.slug}`} type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
      <CaseStudyDetail c={c} showBackLink />
      <SeoHubNav currentPath={`/casi-studio/${c.slug}`} showCaseStudies showArticles />
    </>
  );
}
