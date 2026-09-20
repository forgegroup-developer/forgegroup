/**
 * Dati legali del sito. Privacy e cookie policy vivono su iubenda
 * (progetto www.forgegroup.it, account info@forgegroup.it): i testi si
 * aggiornano lì, qui restano solo i dati che il sito mostra da sé.
 */

/** Le due ditte che usano il sito, contitolari del trattamento (art. 26 GDPR). */
export const LEGAL_CONTROLLERS = [
  {
    name: "Marco Pio Cerbone",
    vat: "03247960648",
    address: "Via Calore 97, 83036 Mirabella Eclano (AV), Italia",
  },
  {
    name: "Gianpio Uva",
    vat: "03215850649",
    address: "Contrada Fosso Cavallo 38, 83040 Fontanarosa (AV), Italia",
  },
] as const;

export const LEGAL = {
  /** P.IVA mostrata nel footer (art. 35 DPR 633/72): quella di Marco, senza nome. */
  siteVat: LEGAL_CONTROLLERS[0].vat,
  controllerEmail: "info@forgegroup.it",
  /** Denominazione commerciale del network */
  controllerTradeName: "Forge Group Italia",
} as const;

export const IUBENDA = {
  /** Widget unico: banner cookie, Google Consent Mode v2 e pulsante preferenze. */
  widgetSrc: "https://embeds.iubenda.com/widgets/af3f75e3-fc09-4603-b4ca-7976ac49c5c5.js",
  privacyPolicyUrl: "https://www.iubenda.com/privacy-policy/44776503",
  cookiePolicyUrl: "https://www.iubenda.com/privacy-policy/44776503/cookie-policy",
} as const;
