import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;
