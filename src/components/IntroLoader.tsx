"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(SIZE, SIZE);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;

      canvasWrapRef.current.style.width = SIZE + "px";
      canvasWrapRef.current.style.height = SIZE + "px";
      canvasWrapRef.current.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.set(0, 0, 8.5);

      pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      scene.add(new THREE.AmbientLight(0xffffff, 0.45));
      const violet = new THREE.DirectionalLight(0x8b5cf6, 4.5);
      violet.position.set(-6, 4, 5);
      scene.add(violet);
      const cyan = new THREE.DirectionalLight(0x22d3ee, 3.8);
      cyan.position.set(6, 2, 4);
      scene.add(cyan);
      const warm = new THREE.DirectionalLight(0xffb37a, 1.8);
      warm.position.set(0, -5, 3);
      scene.add(warm);

      // ── Logo geometry (stessa logica di Logo3DBackground) ──────────────
      type V2 = InstanceType<typeof THREE.Vector2>;

      const strokeToShape = (
        pts: Array<[number, number]>,
        strokeWidth: number
      ) => {
        const w = strokeWidth / 2;
        const P = pts.map(([x, y]) => new THREE.Vector2(x, y));
        const n = P.length;
        const left: V2[] = [];
        const right: V2[] = [];
        for (let i = 0; i < n; i++) {
          const prev = P[i - 1];
          const cur = P[i];
          const next = P[i + 1];
          let normal: V2;
          if (!prev) {
            const dir = next.clone().sub(cur).normalize();
            normal = new THREE.Vector2(-dir.y, dir.x);
          } else if (!next) {
            const dir = cur.clone().sub(prev).normalize();
            normal = new THREE.Vector2(-dir.y, dir.x);
          } else {
            const d1 = cur.clone().sub(prev).normalize();
            const d2 = next.clone().sub(cur).normalize();
            const a = new THREE.Vector2(-d1.y, d1.x);
            const b = new THREE.Vector2(-d2.y, d2.x);
            const miter = a.clone().add(b).normalize();
            const denom = miter.dot(a) || 1;
            normal = miter.multiplyScalar(1 / denom);
          }
          left.push(cur.clone().add(normal.clone().multiplyScalar(w)));
          right.push(cur.clone().add(normal.clone().multiplyScalar(-w)));
        }
        const shape = new THREE.Shape();
        const segs = 12;
        const arc = (center: V2, outward: V2) => {
          const aOut = Math.atan2(outward.y, outward.x);
          for (let k = 1; k <= segs; k++) {
            const a = aOut + Math.PI / 2 - (Math.PI * k) / segs;
            shape.lineTo(
              center.x + Math.cos(a) * w,
              center.y + Math.sin(a) * w
            );
          }
        };
        shape.moveTo(left[0].x, left[0].y);
        for (let i = 1; i < n; i++) shape.lineTo(left[i].x, left[i].y);
        arc(P[n - 1], P[n - 1].clone().sub(P[n - 2]).normalize());
        for (let i = n - 2; i >= 0; i--) shape.lineTo(right[i].x, right[i].y);
        arc(P[0], P[0].clone().sub(P[1]).normalize());
        shape.closePath();
        return shape;
      };

      const extrudeSettings = {
        depth: 0.42,
        bevelEnabled: true,
        bevelThickness: 0.12,
        bevelSize: 0.12,
        bevelOffset: 0,
        bevelSegments: 10,
        curveSegments: 24,
      };

      const coralShape = strokeToShape(
        [[-3.23, -0.795], [-0.88, 2.25], [1.545, -2.04]],
        0.57
      );
      const peachShape = strokeToShape(
        [[-1.68, -0.795], [0.67, 2.25], [3.095, -2.04]],
        0.57
      );

      const makeMat = (color: number) =>
        new THREE.MeshPhysicalMaterial({
          color,
          metalness: 0.65,
          roughness: 0.14,
          iridescence: 1.0,
          iridescenceIOR: 1.3,
          iridescenceThicknessRange: [120, 680],
          clearcoat: 1.0,
          clearcoatRoughness: 0.12,
          envMapIntensity: 1.8,
        });

      const peachMesh = new THREE.Mesh(
        new THREE.ExtrudeGeometry(peachShape, extrudeSettings),
        makeMat(0xe8b9a5)
      );
      const coralMesh = new THREE.Mesh(
        new THREE.ExtrudeGeometry(coralShape, extrudeSettings),
        makeMat(0xc8502a)
      );
      // distanza in z > spessore lamina (~0.66) per evitare la compenetrazione: restano staccate
      peachMesh.position.z = -0.5;
      coralMesh.position.z = 0.35;

      const logoGroup = new THREE.Group();
      logoGroup.add(peachMesh, coralMesh);
      const box = new THREE.Box3().setFromObject(logoGroup);
      const center = box.getCenter(new THREE.Vector3());
      logoGroup.children.forEach((c) => c.position.sub(center));
      logoGroup.scale.setScalar(0.9);
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
