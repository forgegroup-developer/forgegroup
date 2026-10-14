import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ArticleList from "@/components/blog/ArticleList";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import HeroGooeySection from "@/components/sfondi/HeroGooeySection";
import { AUTORI, AUTORE_IDS, autoreDaSlug, autorePath } from "@/data/autori";
import { getPublishedArticles } from "@/lib/blog/articlesAsync";
import { SITE_URL, absoluteUrl } from "@/lib/seo/site";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return AUTORE_IDS.map((id) => ({ slug: AUTORI[id].slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const id = autoreDaSlug(slug);
  if (!id) return {};
  const a = AUTORI[id];
  return {
    title: `${a.nome}, fondatore`,
    description: a.descrizione,
    alternates: { canonical: autorePath(id) },
    openGraph: {
      type: "profile",
      title: `${a.nome} | Forge Group Italia`,
      description: a.descrizione,
      url: autorePath(id),
      images: [{ url: a.foto, alt: a.nome }],
    },
  };
}

export default async function AutorePage({ params }: Props) {
  const { slug } = await params;
  const id = autoreDaSlug(slug);
  if (!id) notFound();
  const a = AUTORI[id];
  const url = absoluteUrl(autorePath(id));

  const articoli = (await getPublishedArticles()).filter((x) => x.autore === id);

  // ProfilePage + Person: lega la persona a Forge Group (stesso @id dell'Organization nel layout)
  // e al suo LinkedIn. È quello che le AI usano per capire chi scrive.
  const profileJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    mainEntity: {
      "@type": "Person",
      "@id": `${url}#persona`,
      name: a.nome,
      jobTitle: a.ruolo,
      description: a.bio,
      image: absoluteUrl(a.foto),
      url,
      sameAs: [a.linkedin],
      worksFor: { "@id": `${SITE_URL}#organization` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <HeroGooeySection innerClassName="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto mb-6 h-32 w-32 overflow-hidden rounded-full border-4 border-brand-bianco shadow-md">
          <Image
            src={a.foto}
            alt={a.nome}
            width={256}
            height={256}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <p className="eyebrow mb-4">✦ {a.ruolo}</p>
        <h1 className="heading-hero font-semibold text-brand-nero leading-tight mb-6">
          {a.nome}
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-brand-grigio md:text-lg">
          {a.bio}
        </p>
        <p className="mt-6">
          <a
            href={a.linkedin}
            target="_blank"
            rel="noopener noreferrer me"
            className="font-semibold text-brand-corallo-text hover:underline"
          >
            Il profilo LinkedIn di {a.nome.split(" ")[0]}
          </a>
        </p>
        <div className="mt-8 flex justify-center">
          <Breadcrumbs
            variant="dark"
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: a.nome },
            ]}
          />
        </div>
      </HeroGooeySection>

      <section className="py-16 md:py-20 section-bianco">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-section-xl font-semibold text-brand-nero mb-10">
            Gli articoli di {a.nome.split(" ")[0]}
          </h2>
          <ArticleList
            articles={articoli}
            emptyMessage="Il primo articolo arriva a breve."
          />
        </div>
      </section>
    </>
  );
}
