import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/servizi/advertising-lead-generation",
        destination: "/servizi/acquisizione-clienti",
        permanent: true,
      },
      {
        source: "/servizi/social-media-contenuti",
        destination: "/servizi/acquisizione-clienti",
        permanent: true,
      },
      {
        source: "/servizi/presenza-digitale",
        destination: "/servizi/acquisizione-clienti",
        permanent: true,
      },
      {
        source: "/servizi/vendite-crm",
        destination: "/servizi/vendite-processi-commerciali",
        permanent: true,
      },
      {
        source: "/servizi/strategia-crescita",
        destination: "/servizi/consulenza-formazione",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
