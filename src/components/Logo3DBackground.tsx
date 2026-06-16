"use client";

import { useEffect, useRef } from "react";
import {
  FORGE_LOGO_3D,
  FORGE_LOGO_3D_BACKGROUND,
  addForgeLogoLights,
  buildForgeLogoGroup,
} from "@/lib/forgeLogo3d";

/**
 * Sfondo globale 3D: il logo figurativo Forge Group estruso, con finitura
 * iridescente/olografica, che ruota e si sposta a zig-zag in base allo scroll.
 */
export default function Logo3DBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let disposed = false;
    let rafId = 0;
    const cleanupFns: Array<() => void> = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let renderer: any, pmrem: any;

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import(
        "three/examples/jsm/environments/RoomEnvironment.js"
      );
      if (disposed || !container) return;

      const W = () => window.innerWidth;
      const H = () => window.innerHeight;

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      const getPixelCap = () =>
        W() < 768 ? 1 : FORGE_LOGO_3D_BACKGROUND.pixelRatioMax;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, getPixelCap()));
      renderer.setSize(W(), H());
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = FORGE_LOGO_3D.toneMappingExposure;

      const canvas = renderer.domElement;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      container.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        FORGE_LOGO_3D.cameraFov,
        W() / H(),
        0.1,
        100
      );
      camera.position.set(0, 0, FORGE_LOGO_3D.cameraZ);

      pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem
        .fromScene(new RoomEnvironment(), FORGE_LOGO_3D.roomEnvironmentIntensity)
        .texture;

      addForgeLogoLights(scene, THREE);
      const logoGroup = buildForgeLogoGroup(THREE, FORGE_LOGO_3D_BACKGROUND);
      scene.add(logoGroup);

      const s = {
        rx: 0,
        ry: 0,
        rz: 0,
        px: 2.4,
        py: 0,
        trx: 0,
        try_: 0,
        trz: 0,
        tpx: 2.4,
        tpy: 0,
      };

      const maxScroll = () =>
        Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

      const startTime = performance.now();
      let lastActivity = startTime;
      let frameSkip = 0;
      const idleMs = 2500;

      const onScroll = () => {
        lastActivity = performance.now();
        const p = (window.scrollY || 0) / maxScroll();
        s.tpx = Math.cos(p * Math.PI * 3) * 2.6;
        s.tpy = -Math.sin(p * Math.PI * 2) * 0.7;
        s.try_ = p * Math.PI * 4;
        s.trx = Math.sin(p * Math.PI * 2) * 0.5;
        s.trz = p * Math.PI * 0.6;
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanupFns.push(() => window.removeEventListener("scroll", onScroll));

      const onResize = () => {
        camera.aspect = W() / H();
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, getPixelCap()));
        renderer.setSize(W(), H());
      };
      window.addEventListener("resize", onResize);
      cleanupFns.push(() => window.removeEventListener("resize", onResize));

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      const draw = () => {
        const t = (performance.now() - startTime) / 1000;
        const d = 0.05;
        s.rx = lerp(s.rx, s.trx, d);
        s.ry = lerp(s.ry, s.try_ + t * 0.15, d);
        s.rz = lerp(s.rz, s.trz, d);
        s.px = lerp(s.px, s.tpx, d);
        s.py = lerp(s.py, s.tpy, d);
        logoGroup.rotation.set(s.rx, s.ry, s.rz);
        logoGroup.position.set(s.px, s.py, 0);
        renderer.render(scene, camera);
      };

      const animate = () => {
        if (disposed) return;
        const idle = performance.now() - lastActivity > idleMs;
        if (idle) {
          frameSkip += 1;
          if (frameSkip % 4 !== 0) {
            rafId = requestAnimationFrame(animate);
            return;
          }
        } else {
          frameSkip = 0;
        }
        draw();
        if (!document.hidden) rafId = requestAnimationFrame(animate);
      };

      const onVisibility = () => {
        if (document.hidden) {
          cancelAnimationFrame(rafId);
        } else if (!reduceMotion && !disposed) {
          rafId = requestAnimationFrame(animate);
        }
      };
      document.addEventListener("visibilitychange", onVisibility);
      cleanupFns.push(() =>
        document.removeEventListener("visibilitychange", onVisibility)
      );

      if (reduceMotion) {
        draw();
      } else {
        rafId = requestAnimationFrame(animate);
      }
    })();

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      cleanupFns.forEach((fn) => fn());
      if (pmrem) pmrem.dispose();
      if (renderer) {
        renderer.dispose();
        const el = renderer.domElement;
        if (el && el.parentNode) el.parentNode.removeChild(el);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -10,
        pointerEvents: "none",
      }}
    />
  );
}
