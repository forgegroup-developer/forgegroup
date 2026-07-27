/**
 * Host esterni autorizzati per next/image.
 * ForgeFlow serve le copertine degli articoli da qui: se un host non è in questa
 * lista l'Image Optimization API risponde 400 e l'immagine appare rotta.
 * Tenere allineato con `images.remotePatterns` in next.config.ts.
 */
export const allowedImageHosts = ["forge-flow-steel.vercel.app"] as const;

/** true se `url` è un'immagine remota che next/image è autorizzato a ottimizzare. */
export function isAllowedRemoteImage(url: string): boolean {
  try {
    const { protocol, hostname } = new URL(url);
    return protocol === "https:" && (allowedImageHosts as readonly string[]).includes(hostname);
  } catch {
    return false;
  }
}
