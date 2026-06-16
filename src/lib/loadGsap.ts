type GsapBundle = {
  gsap: typeof import("gsap").default;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let bundlePromise: Promise<GsapBundle> | null = null;

/** Carica GSAP + ScrollTrigger una sola volta, on demand. */
export function loadGsapScrollTrigger(): Promise<GsapBundle> {
  if (!bundlePromise) {
    bundlePromise = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gsapMod, scrollTriggerMod]) => {
        gsapMod.default.registerPlugin(scrollTriggerMod.ScrollTrigger);
        return { gsap: gsapMod.default, ScrollTrigger: scrollTriggerMod.ScrollTrigger };
      }
    );
  }
  return bundlePromise;
}
