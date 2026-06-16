/** Destinatario interno per form contatti, candidature e newsletter. */
export const FORGE_INTERNAL_EMAIL = "info@forgegroup.it";

export function getInternalNotificationEmail(): string {
  const configured = process.env.RESEND_TO?.trim();
  return configured || FORGE_INTERNAL_EMAIL;
}

export function getResendFromEmail(): string {
  const configured = process.env.RESEND_FROM?.trim();
  return configured || "Forge Group <onboarding@resend.dev>";
}
