import Link from "next/link";
import { absoluteUrl } from "@/lib/seo/site";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "light" | "dark";
};

export default function Breadcrumbs({ items, className = "", variant = "dark" }: Props) {
  const textClass = variant === "light" ? "text-white/80" : "text-brand-grigio";
  const linkClass =
    variant === "light"
      ? "text-white/90 hover:text-white hover:underline"
      : "text-brand-grigio hover:text-brand-corallo hover:underline";
  const currentClass = variant === "light" ? "text-white" : "text-brand-nero";

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };

  return (
    <>
      <script id="ld-breadcrumb" type="application/ld+json">
        {JSON.stringify(breadcrumbJsonLd)}
      </script>
      <nav aria-label="Breadcrumb" className={className}>
        <ol className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-sm ${textClass}`}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden className="opacity-50">//</span>}
                {item.href && !isLast ? (
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? currentClass : textClass} aria-current={isLast ? "page" : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
