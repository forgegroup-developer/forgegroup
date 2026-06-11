"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  FORGE_LOGO_3D,
  addForgeLogoLights,
  buildForgeLogoGroup,
} from "@/lib/forgeLogo3d";

/**
 * Intro animation: fullscreen dark overlay con logo 3D Forge Group al centro.
 * Logo ruota lentamente, poi overlay fa curtain-wipe verso l'alto.
 * Mostrato solo una volta per sessione (sessionStorage).
 * Rispetta prefers-reduced-motion.
 */
export default function IntroLoader() {
  const [visible, setVisible] = useState<boolean | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("fg_intro_seen")) {
      setVisible(false);
      return;
    }

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      sessionStorage.setItem("fg_intro_seen", "1");
      setVisible(false);
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    let disposed = false;
    let rafId = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any, pmrem: any;
    const startTime = performance.now();

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import(
        "three/examples/jsm/environments/RoomEnvironment.js"
      );
      if (disposed || !canvasWrapRef.current) return;

      const SIZE = Math.round(Math.min(window.innerWidth * 0.55, 320));

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, FORGE_LOGO_3D.pixelRatioMax));
      renderer.setSize(SIZE, SIZE);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = FORGE_LOGO_3D.toneMappingExposure;

      canvasWrapRef.current.style.width = SIZE + "px";
      canvasWrapRef.current.style.height = SIZE + "px";
      canvasWrapRef.current.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        FORGE_LOGO_3D.cameraFov,
        1,
        0.1,
        100
      );
      camera.position.set(0, 0, FORGE_LOGO_3D.cameraZ);

      pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem
        .fromScene(new RoomEnvironment(), FORGE_LOGO_3D.roomEnvironmentIntensity)
        .texture;

      addForgeLogoLights(scene, THREE);
      const logoGroup = buildForgeLogoGroup(THREE);
      scene.add(logoGroup);

      // ── Render loop: slow gentle rotation ───────────────────────────────
      const animate = () => {
        if (disposed) return;
        const t = (performance.now() - startTime) / 1000;
        logoGroup.rotation.y = t * 0.55;
        logoGroup.rotation.x = Math.sin(t * 0.6) * 0.2;
        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      rafId = requestAnimationFrame(animate);

      // ── GSAP timeline ────────────────────────────────────────────────────
      // Initial hidden state
      gsap.set(canvasWrapRef.current, { opacity: 0, scale: 0.72, y: 20 });
      gsap.set(textRef.current, { opacity: 0, y: 14 });
      gsap.set(taglineRef.current, { opacity: 0, y: 8 });

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("fg_intro_seen", "1");
          document.body.style.overflow = "";
          setVisible(false);
        },
      });

      tl
        // Logo entra
        .to(canvasWrapRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: "expo.out",
        }, 0.1)
        // Nome "FORGE GROUP" appare
        .to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "expo.out",
        }, 0.55)
        // Tagline appare
        .to(taglineRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "expo.out",
        }, 0.8)
        // Pausa + logo + testo svaniscono verso l'alto
        .to(
          [canvasWrapRef.current, textRef.current, taglineRef.current],
          { opacity: 0, y: -40, duration: 0.5, ease: "power2.in" },
          "+=0.95"
        )
        // Curtain wipe: overlay sale verso l'alto
        .to(overlayRef.current, {
          yPercent: -105,
          duration: 0.75,
          ease: "expo.inOut",
        }, "-=0.1");
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      if (pmrem) pmrem.dispose();
      if (renderer) {
        renderer.dispose();
        const el = renderer.domElement;
        if (el?.parentNode) el.parentNode.removeChild(el);
      }
      document.body.style.overflow = "";
    };
  }, []);

  // null = SSR / non ancora determinato: non renderizzare nulla
  if (visible === null || visible === false) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
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
      }}
    >
      {/* Canvas Three.js */}
      <div ref={canvasWrapRef} style={{ lineHeight: 0 }} />

      {/* Nome brand */}
      <div
        ref={textRef}
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

      {/* Tagline */}
      <div
        ref={taglineRef}
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
    </div>
  );
}
