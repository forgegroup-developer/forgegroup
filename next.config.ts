import type { NextConfig } from "next";
import { allowedImageHosts } from "./src/data/imageHosts";
import { IUBENDA } from "./src/data/legal";

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
      // Privacy e cookie policy stanno su iubenda dal 18 settembre 2026:
      // i vecchi indirizzi restano validi per i link già sparsi nel sito.
      {
        source: "/privacy-policy",
        destination: IUBENDA.privacyPolicyUrl,
        permanent: false,
      },
      {
        source: "/cookie-policy",
        destination: IUBENDA.cookiePolicyUrl,
        permanent: false,
      },
      // Gli indirizzi che il playbook delle chiamate detta al telefono e
      // che si mandano su WhatsApp: corti, puliti, facili da scrivere a
      // mano. Temporanei apposta: la piattaforma di copy prevede che
      // diventino pagine vere, e un 308 resterebbe in cache per sempre.
      {
        source: "/tetti-top",
        destination: "/casi-studio/edilizia",
        permanent: false,
      },
      {
        source: "/disa",
        destination: "/casi-studio/software-b2b",
        permanent: false,
      },
      // La pagina del CRM ha cambiato nome il 9 settembre 2026: era
      // /il-tuo-registro, "registro" e' stato scartato perche' in edilizia
      // evoca il giornale dei lavori e nessuno lo cerca.
      {
        source: "/il-tuo-registro",
        destination: "/crm-gestionale-edilizia",
        permanent: true,
      },
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
