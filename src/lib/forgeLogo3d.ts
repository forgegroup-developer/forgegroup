/** Configurazione condivisa logo 3D Forge Group (intro + sfondo home). */

export const FORGE_LOGO_3D = {
  scale: 0.92,
  cameraFov: 45,
  cameraZ: 7.5,
  toneMappingExposure: 1.15,
  pixelRatioMax: 1.5,
  extrudeSettings: {
    depth: 0.42,
    bevelEnabled: true,
    bevelThickness: 0.12,
    bevelSize: 0.12,
    bevelOffset: 0,
    bevelSegments: 10,
    curveSegments: 24,
  },
  coralPoints: [
    [-3.23, -0.795],
    [-0.88, 2.25],
    [1.545, -2.04],
  ] as Array<[number, number]>,
  peachPoints: [
    [-1.68, -0.795],
    [0.67, 2.25],
    [3.095, -2.04],
  ] as Array<[number, number]>,
  strokeWidth: 0.57,
  peachZ: -0.5,
  coralZ: 0.35,
  material: {
    metalness: 0.6,
    roughness: 0.16,
    iridescence: 1.0,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [120, 680] as [number, number],
    clearcoat: 1.0,
    clearcoatRoughness: 0.15,
    envMapIntensity: 1.5,
  },
  colors: {
    peach: 0xe8b9a5,
    coral: 0xc8502a,
  },
  lights: {
    ambient: { color: 0xffffff, intensity: 0.45 },
    violet: { color: 0x8b5cf6, intensity: 3.2, position: [-6, 4, 5] as [number, number, number] },
    cyan: { color: 0x22d3ee, intensity: 3.0, position: [6, 2, 4] as [number, number, number] },
    warm: { color: 0xffb37a, intensity: 1.3, position: [0, -5, 3] as [number, number, number] },
  },
  roomEnvironmentIntensity: 0.04,
} as const;

/** Impostazioni più leggere per lo sfondo fisso (z-index -10). */
export const FORGE_LOGO_3D_BACKGROUND = {
  ...FORGE_LOGO_3D,
  pixelRatioMax: 1,
  extrudeSettings: {
    ...FORGE_LOGO_3D.extrudeSettings,
    bevelSegments: 5,
    curveSegments: 14,
  },
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ThreeModule = typeof import("three");

export function strokeToShape(
  THREE: ThreeModule,
  pts: Array<[number, number]>,
  strokeWidth: number
) {
  type V2 = InstanceType<typeof THREE.Vector2>;
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
      shape.lineTo(center.x + Math.cos(a) * w, center.y + Math.sin(a) * w);
    }
  };

  shape.moveTo(left[0].x, left[0].y);
  for (let i = 1; i < n; i++) shape.lineTo(left[i].x, left[i].y);
  arc(P[n - 1], P[n - 1].clone().sub(P[n - 2]).normalize());
  for (let i = n - 2; i >= 0; i--) shape.lineTo(right[i].x, right[i].y);
  arc(P[0], P[0].clone().sub(P[1]).normalize());
  shape.closePath();
  return shape;
}

export function createForgeLogoMaterial(THREE: ThreeModule, color: number) {
  const { material } = FORGE_LOGO_3D;
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: material.metalness,
    roughness: material.roughness,
    iridescence: material.iridescence,
    iridescenceIOR: material.iridescenceIOR,
    iridescenceThicknessRange: material.iridescenceThicknessRange,
    clearcoat: material.clearcoat,
    clearcoatRoughness: material.clearcoatRoughness,
    envMapIntensity: material.envMapIntensity,
  });
}

type ForgeLogoBuildConfig = {
  scale: number;
  coralPoints: Array<[number, number]>;
  peachPoints: Array<[number, number]>;
  strokeWidth: number;
  peachZ: number;
  coralZ: number;
  colors: { peach: number; coral: number };
  extrudeSettings: {
    depth: number;
    bevelEnabled: boolean;
    bevelThickness: number;
    bevelSize: number;
    bevelOffset: number;
    bevelSegments: number;
    curveSegments: number;
  };
};

export function buildForgeLogoGroup(
  THREE: ThreeModule,
  config: ForgeLogoBuildConfig = FORGE_LOGO_3D
) {
  const cfg = config;
  const coralShape = strokeToShape(THREE, cfg.coralPoints, cfg.strokeWidth);
  const peachShape = strokeToShape(THREE, cfg.peachPoints, cfg.strokeWidth);

  const peachMesh = new THREE.Mesh(
    new THREE.ExtrudeGeometry(peachShape, cfg.extrudeSettings),
    createForgeLogoMaterial(THREE, cfg.colors.peach)
  );
  const coralMesh = new THREE.Mesh(
    new THREE.ExtrudeGeometry(coralShape, cfg.extrudeSettings),
    createForgeLogoMaterial(THREE, cfg.colors.coral)
  );

  peachMesh.position.z = cfg.peachZ;
  coralMesh.position.z = cfg.coralZ;

  const logoGroup = new THREE.Group();
  logoGroup.add(peachMesh, coralMesh);

  const box = new THREE.Box3().setFromObject(logoGroup);
  const center = box.getCenter(new THREE.Vector3());
  logoGroup.children.forEach((child) => child.position.sub(center));
  logoGroup.scale.setScalar(cfg.scale);

  return logoGroup;
}

export function addForgeLogoLights(scene: InstanceType<ThreeModule["Scene"]>, THREE: ThreeModule) {
  const { lights } = FORGE_LOGO_3D;
  scene.add(new THREE.AmbientLight(lights.ambient.color, lights.ambient.intensity));

  const violet = new THREE.DirectionalLight(lights.violet.color, lights.violet.intensity);
  violet.position.set(...lights.violet.position);
  scene.add(violet);

  const cyan = new THREE.DirectionalLight(lights.cyan.color, lights.cyan.intensity);
  cyan.position.set(...lights.cyan.position);
  scene.add(cyan);

  const warm = new THREE.DirectionalLight(lights.warm.color, lights.warm.intensity);
  warm.position.set(...lights.warm.position);
  scene.add(warm);
}
