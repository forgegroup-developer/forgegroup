import type { NextConfig } from "next";
import { allowedImageHosts } from "./src/data/imageHosts";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Copertine articoli generate da ForgeFlow: senza questo next/image torna 400.
    remotePatterns: allowedImageHosts.map((hostname) => ({
      protocol: "https" as const,
      hostname,
      pathname: "/api/media/**",
    })),
  },
  async headers() {
    return [
      {
        source: "/:path*.md",
        headers: [
          { key: "Content-Type", value: "text/plain; charset=utf-8" },
          { key: "Cache-Control", value: "public, max-age=3600" },
          { key: "X-Robots-Tag", value: "index, follow" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/index.md", destination: "/api/ai-mirror" },
      { source: "/:path+/index.md", destination: "/api/ai-mirror/:path+" },
    ];
  },
  async redirects() {
    return [
      // La ricerca del blog è passata da /blog?q= alla rotta dedicata.
      {
        source: "/blog",
        has: [{ type: "query", key: "q", value: "(?<q>.*)" }],
        destination: "/blog/cerca?q=:q",
        permanent: true,
      },
      // Legacy service URLs → landing servizi
      {
        source: "/servizi/advertising-lead-generation",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/servizi/social-media-contenuti",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/servizi/presenza-digitale",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/servizi/vendite-crm",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/servizi/strategia-crescita",
        destination: "/servizi",
        permanent: true,
      },
      // Service detail pages → landing servizi
      {
        source: "/servizi/acquisizione-clienti",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/servizi/vendite-processi-commerciali",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/servizi/consulenza-formazione",
        destination: "/servizi",
        permanent: true,
      },
      {
        source: "/chi-siamo-e-manifesto",
        destination: "/visione",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
