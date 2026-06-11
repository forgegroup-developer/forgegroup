"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  FORGE_LOGO_3D,
  addForgeLogoLights,
  buildForgeLogoGroup,
} from "@/lib/forgeLogo3d";

const INTRO_SEEN_KEY = "fg_intro_seen";

/**
 * Splash iniziale: logo Forge Group a schermo intero.
 * L'utente entra nel sito con un click (o Invio); mostrata una volta per sessione.
 */
export default function IntroLoader() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dismissing, setDismissing] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  const staticLogoRef = useRef<HTMLDivElement>(null);

  const cleanupRef = useRef<{
    disposed: boolean;
    rafId: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderer: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pmrem: any;
  }>({ disposed: false, rafId: 0, renderer: null, pmrem: null });

  const finishIntro = useCallback(() => {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
    document.body.style.overflow = "";
    setVisible(false);
  }, []);

  const dismissIntro = useCallback(() => {
    if (dismissing) return;
    setDismissing(true);

    const cleanup = cleanupRef.current;
    cleanup.disposed = true;
    cancelAnimationFrame(cleanup.rafId);
    if (cleanup.pmrem) cleanup.pmrem.dispose();
    if (cleanup.renderer) {
      cleanup.renderer.dispose();
      const el = cleanup.renderer.domElement;
      if (el?.parentNode) el.parentNode.removeChild(el);
    }

    const targets = reducedMotion
      ? [staticLogoRef.current, textRef.current, taglineRef.current, enterRef.current]
      : [canvasWrapRef.current, textRef.current, taglineRef.current, enterRef.current];

    gsap
      .timeline({ onComplete: finishIntro })
      .to(targets, { opacity: 0, y: -30, duration: 0.45, ease: "power2.in" })
      .to(
        overlayRef.current,
        { yPercent: -105, duration: 0.7, ease: "expo.inOut" },
        "-=0.05"
      );
  }, [dismissing, finishIntro, reducedMotion]);

  useEffect(() => {
    if (sessionStorage.getItem(INTRO_SEEN_KEY)) {
      setVisible(false);
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);
    setVisible(true);
    document.body.style.overflow = "hidden";

    if (prefersReduced) {
      gsap.set([staticLogoRef.current, textRef.current, taglineRef.current, enterRef.current], {
        opacity: 0,
        y: 12,
      });
      gsap
        .timeline()
        .to(staticLogoRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0)
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0.15)
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.3)
        .to(enterRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 0.45);
      return () => {
        document.body.style.overflow = "";
      };
    }

    const cleanup = cleanupRef.current;
    cleanup.disposed = false;
    const startTime = performance.now();

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import(
        "three/examples/jsm/environments/RoomEnvironment.js"
      );
      if (cleanup.disposed || !canvasWrapRef.current) return;

      const SIZE = Math.round(Math.min(window.innerWidth * 0.55, 320));

      cleanup.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      cleanup.renderer.setPixelRatio(Math.min(window.devicePixelRatio, FORGE_LOGO_3D.pixelRatioMax));
      cleanup.renderer.setSize(SIZE, SIZE);
      cleanup.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      cleanup.renderer.toneMappingExposure = FORGE_LOGO_3D.toneMappingExposure;

      canvasWrapRef.current.style.width = SIZE + "px";
      canvasWrapRef.current.style.height = SIZE + "px";
      canvasWrapRef.current.appendChild(cleanup.renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(FORGE_LOGO_3D.cameraFov, 1, 0.1, 100);
      camera.position.set(0, 0, FORGE_LOGO_3D.cameraZ);

      cleanup.pmrem = new THREE.PMREMGenerator(cleanup.renderer);
      scene.environment = cleanup.pmrem
        .fromScene(new RoomEnvironment(), FORGE_LOGO_3D.roomEnvironmentIntensity)
        .texture;

      addForgeLogoLights(scene, THREE);
      const logoGroup = buildForgeLogoGroup(THREE);
      scene.add(logoGroup);

      const animate = () => {
        if (cleanup.disposed) return;
        const t = (performance.now() - startTime) / 1000;
        logoGroup.rotation.y = t * 0.55;
        logoGroup.rotation.x = Math.sin(t * 0.6) * 0.2;
        cleanup.renderer.render(scene, camera);
        cleanup.rafId = requestAnimationFrame(animate);
      };
      cleanup.rafId = requestAnimationFrame(animate);

      gsap.set(canvasWrapRef.current, { opacity: 0, scale: 0.72, y: 20 });
      gsap.set([textRef.current, taglineRef.current, enterRef.current], { opacity: 0, y: 14 });

      gsap
        .timeline()
        .to(canvasWrapRef.current, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "expo.out" }, 0.1)
        .to(textRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }, 0.55)
        .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, 0.8)
        .to(enterRef.current, { opacity: 1, y: 0, duration: 0.55, ease: "expo.out" }, 1.05);
    })();

    return () => {
      cleanup.disposed = true;
      cancelAnimationFrame(cleanup.rafId);
      if (cleanup.pmrem) cleanup.pmrem.dispose();
      if (cleanup.renderer) {
        cleanup.renderer.dispose();
        const el = cleanup.renderer.domElement;
        if (el?.parentNode) el.parentNode.removeChild(el);
      }
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!visible || dismissing) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        dismissIntro();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, dismissing, dismissIntro]);

  if (visible === null || visible === false) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intro-brand"
      aria-describedby="intro-tagline"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#111111",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "24px",
      }}
    >
      {reducedMotion ? (
        <div ref={staticLogoRef} className="relative h-28 w-28 sm:h-32 sm:w-32">
          <Image src="/logo.png" alt="Forge Group" fill className="object-contain" priority />
        </div>
      ) : (
        <div ref={canvasWrapRef} style={{ lineHeight: 0 }} aria-hidden="true" />
      )}

      <div
        ref={textRef}
        id="intro-brand"
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "6px",
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "clamp(22px, 5vw, 30px)",
          fontWeight: 700,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "#ffffff",
        }}
      >
        <span style={{ color: "#c8502a" }}>FORGE</span>
        <span>GROUP</span>
      </div>

      <div
        ref={taglineRef}
        id="intro-tagline"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: "clamp(9px, 2vw, 11px)",
          fontWeight: 500,
          letterSpacing: "0.5em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        Growth Hacking · Italia
      </div>

      <button
        ref={enterRef}
        type="button"
        className="btn-corallo mt-4 px-8 py-4 text-sm md:text-base opacity-0"
        onClick={dismissIntro}
        disabled={dismissing}
      >
        Entra nel sito
      </button>
    </div>
  );
}
