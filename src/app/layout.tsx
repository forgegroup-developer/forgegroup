import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forge Group | Sistemi di Vendita e Acquisizione B2B",
  description: "Trasformiamo aziende B2B disorganizzate in macchine di acquisizione clienti high-ticket. Creiamo ecosistemi di vendita prevedibili, CRM e strategie di chiusura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-brand-nero text-brand-bianco">
        {children}
      </body>
    </html>
  );
}
