"use client";

import { useEffect, useRef } from "react";

/**
 * Sfondo globale 3D: il logo figurativo Forge Group estruso, con finitura
 * iridescente/olografica, che ruota e si sposta a zig-zag in base allo scroll.
 * Canvas WebGL fisso a tutto schermo, sotto ai contenuti (z-index -10),
 * pointer-events: none. Three.js viene importato dinamicamente lato client
 * per non appesantire il bundle iniziale.
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
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(W(), H());
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      const canvas = renderer.domElement;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      container.appendChild(canvas);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, W() / H(), 0.1, 100);
      camera.position.set(0, 0, 7.5);

      // Environment map per riflessi realistici (necessario per l'iridescenza)
      pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      // Luci colorate per gli highlight olografici neon
      scene.add(new THREE.AmbientLight(0xffffff, 0.45));
      const violet = new THREE.DirectionalLight(0x8b5cf6, 3.2);
      violet.position.set(-6, 4, 5);
      scene.add(violet);
      const cyan = new THREE.DirectionalLight(0x22d3ee, 3.0);
      cyan.position.set(6, 2, 4);
      scene.add(cyan);
      const warm = new THREE.DirectionalLight(0xffb37a, 1.3);
      warm.position.set(0, -5, 3);
      scene.add(warm);

      // --- Costruzione geometria del logo (due chevron estrusi) ---
      type V2 = InstanceType<typeof THREE.Vector2>;
      // polilinea spessa con cap arrotondati ai due estremi (piedi del chevron)
      const strokeToShape = (pts: Array<[number, number]>, strokeWidth: number) => {
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
        // cap arrotondato attorno a center, dall'angolo aFrom verso aTo bombando verso outward
        const arc = (center: V2, outward: V2) => {
          const aOut = Math.atan2(outward.y, outward.x);
          for (let k = 1; k <= segs; k++) {
            const a = aOut + Math.PI / 2 - (Math.PI * k) / segs;
            shape.lineTo(center.x + Math.cos(a) * w, center.y + Math.sin(a) * w);
          }
        };
        shape.moveTo(left[0].x, left[0].y);
        for (let i = 1; i < n; i++) shape.lineTo(left[i].x, left[i].y);
        // cap estremo finale (piede destro)
        arc(P[n - 1], P[n - 1].clone().sub(P[n - 2]).normalize());
        for (let i = n - 2; i >= 0; i--) shape.lineTo(right[i].x, right[i].y);
        // cap estremo iniziale (piede sinistro)
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

      // Coord ricavate dal PNG originale (2000px) → spazio 3D: X=(x-1011)/200, Y=(1132-y)/200.
      // Piedi asimmetrici: sinistro più alto, destro più basso. Peach = coral shiftato a destra.
      const coralShape = strokeToShape(
        [
          [-3.23, -0.795], // piede sinistro (alto)
          [-0.88, 2.25], // apice
          [1.545, -2.04], // piede destro (basso)
        ],
        0.57
      );
      const peachShape = strokeToShape(
        [
          [-1.68, -0.795],
          [0.67, 2.25],
          [3.095, -2.04],
        ],
        0.57
      );

      const coralGeo = new THREE.ExtrudeGeometry(coralShape, extrudeSettings);
      const peachGeo = new THREE.ExtrudeGeometry(peachShape, extrudeSettings);

      const makeMat = (color: number) =>
        new THREE.MeshPhysicalMaterial({
          color,
          metalness: 0.6,
          roughness: 0.16,
          iridescence: 1.0,
          iridescenceIOR: 1.3,
          iridescenceThicknessRange: [120, 680],
          clearcoat: 1.0,
          clearcoatRoughness: 0.15,
          envMapIntensity: 1.5,
        });

      const peachMesh = new THREE.Mesh(peachGeo, makeMat(0xe8b9a5));
      const coralMesh = new THREE.Mesh(coralGeo, makeMat(0xc8502a));
      peachMesh.position.z = -0.35;
      coralMesh.position.z = 0.15;

      const logoGroup = new THREE.Group();
      logoGroup.add(peachMesh, coralMesh);
      // centratura del gruppo sull'origine
      const box = new THREE.Box3().setFromObject(logoGroup);
      const center = box.getCenter(new THREE.Vector3());
      logoGroup.children.forEach((c) => c.position.sub(center));
      logoGroup.scale.setScalar(0.92);
      scene.add(logoGroup);

      // --- Stato animazione scroll-driven con damping ---
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

      const onScroll = () => {
        const p = (window.scrollY || 0) / maxScroll(); // 0..1
        // zig-zag orizzontale (layout-aware): destra → sinistra → destra ...
        s.tpx = Math.cos(p * Math.PI * 3) * 2.6;
        s.tpy = -Math.sin(p * Math.PI * 2) * 0.7;
        // rotazione continua mappata sullo scroll
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
        renderer.setSize(W(), H());
      };
      window.addEventListener("resize", onResize);
      cleanupFns.push(() => window.removeEventListener("resize", onResize));

      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      const startTime = performance.now();

      const draw = () => {
        const t = (performance.now() - startTime) / 1000;
        const d = 0.05;
        s.rx = lerp(s.rx, s.trx, d);
        s.ry = lerp(s.ry, s.try_ + t * 0.15, d); // spin lento continuo + scroll
        s.rz = lerp(s.rz, s.trz, d);
        s.px = lerp(s.px, s.tpx, d);
        s.py = lerp(s.py, s.tpy, d);
        logoGroup.rotation.set(s.rx, s.ry, s.rz);
        logoGroup.position.set(s.px, s.py, 0);
        renderer.render(scene, camera);
      };

      const animate = () => {
        if (disposed) return;
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
