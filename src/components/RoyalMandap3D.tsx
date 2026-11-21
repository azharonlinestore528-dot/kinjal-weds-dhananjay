import { ChevronDown, ChevronUp, Compass, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

type CameraPreset = 'overview' | 'mandap' | 'elephant' | 'fountain';
type LightingMood = 'sunset' | 'twilight';

interface PresetPose {
  pos: [number, number, number];
  target: [number, number, number];
  label: string;
}

const CAMERA_PRESETS: Record<CameraPreset, PresetPose> = {
  overview: { pos: [0, 7.2, 16.5], target: [0, 2.3, 0], label: 'Palace Courtyard' },
  mandap: { pos: [3.2, 4.1, 7.4], target: [0, 2.5, 0], label: 'Sacred Mandap' },
  elephant: { pos: [-6.8, 3.0, 8.8], target: [-4.8, 1.4, 3.2], label: 'Royal Elephant' },
  fountain: { pos: [4.8, 3.4, 9.6], target: [0, 0.9, 6.2], label: 'Lotus Fountain' },
};

// Reusable scratch math objects outside render loop (zero GC)
const _dummy = new THREE.Object3D();

function createMarbleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#f6efe2';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle inlaid Rajasthani marble diamond grid
  ctx.strokeStyle = 'rgba(196, 154, 69, 0.24)';
  ctx.lineWidth = 2;
  for (let i = -512; i < 1024; i += 64) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + 512, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(i, 512);
    ctx.lineTo(i + 512, 0);
    ctx.stroke();
  }

  // Soft stone grain
  for (let i = 0; i < 1400; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(165, 138, 100, 0.05)' : 'rgba(255, 255, 255, 0.16)';
    ctx.fillRect(Math.random() * 512, Math.random() * 512, 3, 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);
  return tex;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
  grad.addColorStop(0, 'rgba(20, 8, 10, 0.55)');
  grad.addColorStop(0.6, 'rgba(20, 8, 10, 0.22)');
  grad.addColorStop(1, 'rgba(20, 8, 10, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

/**
 * Composite 8+ Part Procedural Royal Indian Wedding Elephant (THREE.Group, bottom-center pivot)
 */
function buildRoyalElephant(
  goldMat: THREE.Material,
  crimsonClothMat: THREE.Material,
  ivoryMat: THREE.Material,
  shadowTex: THREE.Texture
): { group: THREE.Group; trunkMesh: THREE.Mesh } {
  const group = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({
    color: 0x7d7a77,
    roughness: 0.78,
    metalness: 0.05,
  });
  const pinkMat = new THREE.MeshStandardMaterial({
    color: 0xe8839b,
    roughness: 0.55,
    metalness: 0.1,
  });

  // Contact shadow disc grounded at y=0.01
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(3.2, 3.8),
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.55,
    })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = 0.015;
  group.add(shadowPlane);

  // 4 Grounded Legs + Gold Ankle Rings
  const legGeo = new THREE.CylinderGeometry(0.24, 0.27, 1.05, 14);
  const ankletGeo = new THREE.TorusGeometry(0.26, 0.04, 8, 18);
  const legOffsets: Array<[number, number]> = [
    [-0.42, 0.55],
    [0.42, 0.55],
    [-0.42, -0.58],
    [0.42, -0.58],
  ];
  for (const [lx, lz] of legOffsets) {
    const leg = new THREE.Mesh(legGeo, skinMat);
    leg.position.set(lx, 0.525, lz);
    leg.castShadow = true;
    leg.receiveShadow = true;
    group.add(leg);

    const anklet = new THREE.Mesh(ankletGeo, goldMat);
    anklet.rotation.x = Math.PI / 2;
    anklet.position.set(lx, 0.16, lz);
    group.add(anklet);
  }

  // Primary Body Torso
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.95, 24, 18), skinMat);
  body.scale.set(0.88, 0.92, 1.25);
  body.position.set(0, 1.48, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  // Embroidered Crimson & Gold Jhool Blanket
  const blanket = new THREE.Mesh(
    new THREE.CylinderGeometry(0.92, 0.98, 1.25, 20, 1, true, Math.PI * 0.2, Math.PI * 1.6),
    crimsonClothMat
  );
  blanket.rotation.x = Math.PI / 2;
  blanket.rotation.y = Math.PI / 2;
  blanket.position.set(0, 1.54, -0.05);
  blanket.castShadow = true;
  group.add(blanket);

  // Golden Kalash Saddle Cushion
  const cushion = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.5, 0.22, 16), goldMat);
  cushion.position.set(0, 2.38, -0.05);
  cushion.castShadow = true;
  group.add(cushion);

  // Head
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.58, 20, 16), skinMat);
  head.position.set(0, 1.88, 1.12);
  head.castShadow = true;
  group.add(head);

  // Royal Gold Forehead Crown
  const crown = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.44, 12), goldMat);
  crown.position.set(0, 2.48, 1.16);
  crown.castShadow = true;
  group.add(crown);

  // Ears
  const earGeo = new THREE.SphereGeometry(0.42, 14, 12);
  for (const side of [-1, 1]) {
    const ear = new THREE.Mesh(earGeo, skinMat);
    ear.scale.set(0.22, 1.0, 0.78);
    ear.position.set(side * 0.58, 1.92, 0.95);
    ear.rotation.y = side * 0.35;
    group.add(ear);
  }

  // Curved TubeGeometry Trunk (animated in loop)
  const trunkCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 1.72, 1.6),
    new THREE.Vector3(0, 1.25, 1.92),
    new THREE.Vector3(0, 0.88, 1.86),
    new THREE.Vector3(0, 1.05, 1.64),
  ]);
  const trunkGeo = new THREE.TubeGeometry(trunkCurve, 18, 0.14, 10, false);
  const trunkMesh = new THREE.Mesh(trunkGeo, skinMat);
  trunkMesh.castShadow = true;
  group.add(trunkMesh);

  // Lotus Blossom held near trunk tip
  const lotus = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 1), pinkMat);
  lotus.position.set(0, 1.12, 1.66);
  group.add(lotus);

  // Ivory Tusks
  const tuskCurveL = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.24, 1.56, 1.52),
    new THREE.Vector3(-0.32, 1.48, 1.86),
    new THREE.Vector3(-0.28, 1.64, 2.08),
  ]);
  const tuskCurveR = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.24, 1.56, 1.52),
    new THREE.Vector3(0.32, 1.48, 1.86),
    new THREE.Vector3(0.28, 1.64, 2.08),
  ]);
  group.add(new THREE.Mesh(new THREE.TubeGeometry(tuskCurveL, 12, 0.055, 8, false), ivoryMat));
  group.add(new THREE.Mesh(new THREE.TubeGeometry(tuskCurveR, 12, 0.055, 8, false), ivoryMat));

  return { group, trunkMesh };
}

/**
 * Composite 10+ Part Procedural Royal Rajasthani Wedding Mandap Pavilion
 */
function buildMandapPavilion(
  marbleMat: THREE.Material,
  goldMat: THREE.Material,
  crimsonMat: THREE.Material,
  pinkFlowerMat: THREE.Material,
  marigoldMat: THREE.Material
): { group: THREE.Group; fireGlowMesh: THREE.Mesh } {
  const group = new THREE.Group();

  // Stepped Plinth Base
  const tier1 = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.28, 6.8), marbleMat);
  tier1.position.y = 0.14;
  tier1.receiveShadow = true;
  tier1.castShadow = true;
  group.add(tier1);

  const tier2 = new THREE.Mesh(new THREE.BoxGeometry(5.9, 0.24, 5.9), marbleMat);
  tier2.position.y = 0.4;
  tier2.receiveShadow = true;
  tier2.castShadow = true;
  group.add(tier2);

  // Central Silk Carpet
  const carpet = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.05, 4.8), crimsonMat);
  carpet.position.y = 0.545;
  carpet.receiveShadow = true;
  group.add(carpet);

  // 4 LatheGeometry Rajasthani Carved Pillars
  const pillarProfile = [
    new THREE.Vector2(0.01, 0),
    new THREE.Vector2(0.32, 0),
    new THREE.Vector2(0.32, 0.25),
    new THREE.Vector2(0.2, 0.4),
    new THREE.Vector2(0.17, 2.8),
    new THREE.Vector2(0.27, 3.15),
    new THREE.Vector2(0.34, 3.35),
    new THREE.Vector2(0.01, 3.35),
  ];
  const pillarGeo = new THREE.LatheGeometry(pillarProfile, 18);
  const corners: Array<[number, number]> = [
    [-2.35, -2.35],
    [2.35, -2.35],
    [-2.35, 2.35],
    [2.35, 2.35],
  ];

  for (const [cx, cz] of corners) {
    const pillar = new THREE.Mesh(pillarGeo, marbleMat);
    pillar.position.set(cx, 0.52, cz);
    pillar.castShadow = true;
    pillar.receiveShadow = true;
    group.add(pillar);

    // Golden base collar
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.04, 8, 18), goldMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(cx, 0.78, cz);
    group.add(collar);
  }

  // Cusped Arch Lintels + Floral Marigold & Rose Garlands on all 4 sides
  const beamGeo = new THREE.BoxGeometry(5.1, 0.26, 0.34);
  const sideConfigs: Array<{ x: number; z: number; ry: number }> = [
    { x: 0, z: 2.35, ry: 0 },
    { x: 0, z: -2.35, ry: Math.PI },
    { x: 2.35, z: 0, ry: Math.PI / 2 },
    { x: -2.35, z: 0, ry: -Math.PI / 2 },
  ];

  for (const s of sideConfigs) {
    const beam = new THREE.Mesh(beamGeo, goldMat);
    beam.position.set(s.x, 3.96, s.z);
    beam.rotation.y = s.ry;
    beam.castShadow = true;
    group.add(beam);

    // Hanging floral catenary garland
    const garlandCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.1, 3.84, 0),
      new THREE.Vector3(-1.05, 3.35, 0),
      new THREE.Vector3(0, 3.22, 0),
      new THREE.Vector3(1.05, 3.35, 0),
      new THREE.Vector3(2.1, 3.84, 0),
    ]);
    const garland = new THREE.Mesh(
      new THREE.TubeGeometry(garlandCurve, 22, 0.1, 8, false),
      s.ry === 0 || s.ry === Math.PI ? pinkFlowerMat : marigoldMat
    );
    garland.position.set(s.x, 0, s.z);
    garland.rotation.y = s.ry;
    garland.castShadow = true;
    group.add(garland);
  }

  // Grand Chhatri Dome Canopy + Golden Kalash Finial
  const roofBase = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.24, 5.4), crimsonMat);
  roofBase.position.y = 4.2;
  roofBase.castShadow = true;
  group.add(roofBase);

  const domeProfile = [
    new THREE.Vector2(2.35, 0),
    new THREE.Vector2(2.25, 0.45),
    new THREE.Vector2(1.72, 1.05),
    new THREE.Vector2(0.85, 1.55),
    new THREE.Vector2(0.22, 1.8),
    new THREE.Vector2(0.01, 1.85),
  ];
  const dome = new THREE.Mesh(new THREE.LatheGeometry(domeProfile, 28), crimsonMat);
  dome.position.y = 4.32;
  dome.castShadow = true;
  group.add(dome);

  const kalash = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.72, 14), goldMat);
  kalash.position.y = 6.45;
  group.add(kalash);

  // Sacred Havan Kund Fire Altar in Center
  const kund = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.38, 0.36, 4), goldMat);
  kund.rotation.y = Math.PI / 4;
  kund.position.set(0, 0.72, 0.2);
  kund.castShadow = true;
  group.add(kund);

  const fireGlowMesh = new THREE.Mesh(
    new THREE.ConeGeometry(0.22, 0.45, 10),
    new THREE.MeshStandardMaterial({
      color: 0xffa030,
      emissive: 0xff6a00,
      emissiveIntensity: 2.1,
      roughness: 0.3,
    })
  );
  fireGlowMesh.position.set(0, 1.06, 0.2);
  group.add(fireGlowMesh);

  // Twin Ceremonial Thrones behind the Sacred Fire
  for (const sx of [-0.82, 0.82]) {
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.42, 0.78), crimsonMat);
    seat.position.set(sx, 0.76, -1.15);
    seat.castShadow = true;
    group.add(seat);

    const backrest = new THREE.Mesh(new THREE.BoxGeometry(0.88, 1.1, 0.14), goldMat);
    backrest.position.set(sx, 1.32, -1.48);
    backrest.castShadow = true;
    group.add(backrest);
  }

  return { group, fireGlowMesh };
}

export function RoyalMandap3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [activePreset, setActivePreset] = useState<CameraPreset>('overview');
  const [mood, setMood] = useState<LightingMood>('sunset');
  const [dockOpen, setDockOpen] = useState(true);
  const [webglError, setWebglError] = useState<string | null>(null);

  const presetTargetRef = useRef<PresetPose | null>(null);
  const moodRef = useRef<LightingMood>('sunset');

  useEffect(() => {
    presetTargetRef.current = CAMERA_PRESETS[activePreset];
  }, [activePreset]);

  useEffect(() => {
    moodRef.current = mood;
  }, [mood]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const isSoftwareGl = (() => {
      const probe = document.createElement('canvas').getContext('webgl2');
      if (!probe) return true;
      const ext = probe.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probe.RENDERER;
      const gpu = String(probe.getParameter(param));
      probe.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglError('3D palace courtyard rendering requires WebGL support in your browser.');
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 560;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglError('3D viewport context paused. Scroll or refresh to restore.');
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x2a1419);
    scene.fog = new THREE.FogExp2(0x2a1419, 0.022);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 140);
    camera.position.set(...CAMERA_PRESETS.overview.pos);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(...CAMERA_PRESETS.overview.target);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.07;
    controls.maxPolarAngle = Math.PI * 0.47;
    controls.minDistance = 5;
    controls.maxDistance = 28;
    controls.enablePan = false;

    const cancelPreset = () => {
      presetTargetRef.current = null;
    };
    controls.addEventListener('start', cancelPreset);

    // Warm Key Light + Cool Hemisphere Fill + Sacred Havan Diya Light
    const keyLight = new THREE.DirectionalLight(0xffdfb0, 2.1);
    keyLight.position.set(11, 16, 10);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 2;
    keyLight.shadow.camera.far = 42;
    keyLight.shadow.camera.left = -12;
    keyLight.shadow.camera.right = 12;
    keyLight.shadow.camera.top = 12;
    keyLight.shadow.camera.bottom = -12;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x9bb8d4, 0x3b2219, 0.85);
    scene.add(hemiLight);

    const diyaLight = new THREE.PointLight(0xff9b38, 3.2, 12, 1.8);
    diyaLight.position.set(0, 1.8, 0.2);
    scene.add(diyaLight);

    // Materials with varied roughness/metalness
    const marbleTex = createMarbleTexture();
    marbleTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    const shadowTex = createContactShadowTexture();

    const marbleMat = new THREE.MeshStandardMaterial({
      map: marbleTex,
      color: 0xf7efe0,
      roughness: 0.42,
      metalness: 0.06,
    });
    const goldMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4aa4f,
      roughness: 0.2,
      metalness: 0.92,
      clearcoat: 0.4,
    });
    const crimsonMat = new THREE.MeshStandardMaterial({
      color: 0x7a1b2e,
      roughness: 0.78,
      metalness: 0.04,
    });
    const pinkFlowerMat = new THREE.MeshStandardMaterial({
      color: 0xe8839b,
      roughness: 0.65,
      metalness: 0.02,
    });
    const marigoldMat = new THREE.MeshStandardMaterial({
      color: 0xeb9b2d,
      roughness: 0.7,
      metalness: 0.02,
    });
    const ivoryMat = new THREE.MeshStandardMaterial({
      color: 0xfaf4e6,
      roughness: 0.32,
      metalness: 0.05,
    });

    // Courtyard Marble Terrace Ground extending into horizon fog
    const courtyardFloor = new THREE.Mesh(
      new THREE.CylinderGeometry(36, 36, 0.4, 48),
      marbleMat
    );
    courtyardFloor.position.y = -0.2;
    courtyardFloor.receiveShadow = true;
    scene.add(courtyardFloor);

    // Decorative Emerald Garden Perimeter Rings
    const gardenRing = new THREE.Mesh(
      new THREE.RingGeometry(11.5, 34, 48),
      new THREE.MeshStandardMaterial({ color: 0x16423a, roughness: 0.9, metalness: 0 })
    );
    gardenRing.rotation.x = -Math.PI / 2;
    gardenRing.position.y = 0.02;
    gardenRing.receiveShadow = true;
    scene.add(gardenRing);

    // Mandap Hero Structure
    const { group: mandapGroup, fireGlowMesh } = buildMandapPavilion(
      marbleMat,
      goldMat,
      crimsonMat,
      pinkFlowerMat,
      marigoldMat
    );
    scene.add(mandapGroup);

    // Twin Royal Courtyard Elephants flanking the pathway
    const leftElephant = buildRoyalElephant(goldMat, crimsonMat, ivoryMat, shadowTex);
    leftElephant.group.position.set(-4.8, 0, 3.4);
    leftElephant.group.rotation.y = 0.48;
    scene.add(leftElephant.group);

    const rightElephant = buildRoyalElephant(goldMat, crimsonMat, ivoryMat, shadowTex);
    rightElephant.group.position.set(4.8, 0, 3.4);
    rightElephant.group.rotation.y = -0.48;
    scene.add(rightElephant.group);

    // Foreground Lotus Courtyard Fountain (Composite 4-part Group)
    const fountainGroup = new THREE.Group();
    fountainGroup.position.set(0, 0, 6.2);
    const basin = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.75, 0.36, 8), marbleMat);
    basin.position.y = 0.18;
    basin.receiveShadow = true;
    basin.castShadow = true;
    fountainGroup.add(basin);

    const waterDisc = new THREE.Mesh(
      new THREE.CylinderGeometry(1.38, 1.38, 0.06, 24),
      new THREE.MeshPhysicalMaterial({
        color: 0x3b8e84,
        roughness: 0.08,
        metalness: 0.15,
        clearcoat: 1.0,
      })
    );
    waterDisc.position.y = 0.34;
    fountainGroup.add(waterDisc);

    const spout = new THREE.Mesh(
      new THREE.LatheGeometry(
        [
          new THREE.Vector2(0.01, 0),
          new THREE.Vector2(0.24, 0),
          new THREE.Vector2(0.14, 0.55),
          new THREE.Vector2(0.46, 0.72),
          new THREE.Vector2(0.12, 0.85),
          new THREE.Vector2(0.01, 1.1),
        ],
        16
      ),
      goldMat
    );
    spout.position.y = 0.25;
    fountainGroup.add(spout);
    scene.add(fountainGroup);

    // InstancedMesh Floating Marigold & Lotus Petals in 3D Courtyard
    const petalCount = 48;
    const petalGeo = new THREE.PlaneGeometry(0.16, 0.22);
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.65,
      side: THREE.DoubleSide,
    });
    const petalsMesh = new THREE.InstancedMesh(petalGeo, petalMat, petalCount);
    petalsMesh.frustumCulled = false;

    const petalData = Array.from({ length: petalCount }, (_, i) => ({
      x: (Math.random() - 0.5) * 14,
      y: 0.5 + Math.random() * 6.5,
      z: (Math.random() - 0.5) * 14,
      speed: 0.35 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      color: i % 3 === 0 ? 0xf2a341 : i % 2 === 0 ? 0xe8839b : 0xf7d0d8,
    }));
    const _col = new THREE.Color();
    for (let i = 0; i < petalCount; i++) {
      _col.setHex(petalData[i].color);
      petalsMesh.setColorAt(i, _col);
    }
    if (petalsMesh.instanceColor) petalsMesh.instanceColor.needsUpdate = true;
    scene.add(petalsMesh);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let frameId = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const _targetPosVec = new THREE.Vector3();
    const _targetLookVec = new THREE.Vector3();

    const tick = () => {
      const dt = Math.min(clock.getDelta(), 0.08);
      const elapsed = clock.getElapsedTime();

      // Mood transition (Sunset vs Diya Twilight)
      const isTwilight = moodRef.current === 'twilight';
      const targetBg = isTwilight ? 0x160b14 : 0x381d22;
      const targetKeyInt = isTwilight ? 0.85 : 2.1;
      const targetDiyaInt = isTwilight ? 5.2 : 3.0;
      _col.setHex(targetBg);
      (scene.background as THREE.Color).lerp(_col, 1 - Math.exp(-3 * dt));
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.copy(scene.background as THREE.Color);
      }
      keyLight.intensity = THREE.MathUtils.damp(keyLight.intensity, targetKeyInt, 3, dt);
      diyaLight.intensity =
        THREE.MathUtils.damp(diyaLight.intensity, targetDiyaInt, 3, dt) +
        Math.sin(elapsed * 7) * 0.18;

      if (!prefersReducedMotion) {
        fireGlowMesh.scale.y = 1 + Math.sin(elapsed * 8) * 0.12;
        leftElephant.trunkMesh.rotation.x = Math.sin(elapsed * 1.4) * 0.08;
        rightElephant.trunkMesh.rotation.x = Math.sin(elapsed * 1.4 + 1.2) * 0.08;

        for (let i = 0; i < petalCount; i++) {
          const p = petalData[i];
          p.y -= p.speed * dt;
          if (p.y < 0.08) p.y = 6.5;
          _dummy.position.set(
            p.x + Math.sin(elapsed + p.phase) * 0.35,
            p.y,
            p.z + Math.cos(elapsed * 0.8 + p.phase) * 0.35
          );
          _dummy.rotation.set(elapsed + p.phase, elapsed * 0.7, p.phase);
          _dummy.updateMatrix();
          petalsMesh.setMatrixAt(i, _dummy.matrix);
        }
        petalsMesh.instanceMatrix.needsUpdate = true;
      }

      // Smooth damped camera preset transitions
      const pose = presetTargetRef.current;
      if (pose) {
        _targetPosVec.set(...pose.pos);
        _targetLookVec.set(...pose.target);
        const alpha = 1 - Math.exp(-4.2 * dt);
        camera.position.lerp(_targetPosVec, alpha);
        controls.target.lerp(_targetLookVec, alpha);
        if (camera.position.distanceTo(_targetPosVec) < 0.05) {
          presetTargetRef.current = null;
        }
      }

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    };

    if (isSoftwareGl) {
      renderer.render(scene, camera);
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('resize', onResize);
      controls.removeEventListener('start', cancelPreset);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      controls.dispose();
      marbleTex.dispose();
      shadowTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="royal-mandap-3d"
      aria-label="Interactive 3D Royal Palace and Wedding Mandap"
      className="relative w-full h-[85vh] min-h-[560px] max-h-[860px] bg-[#2A1419] overflow-hidden border-y border-[#C49A45]/40"
    >
      {/* Isolated WebGL Canvas Mount */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Top-Left Minimal Spec Header (solid/rgba surface, no backdrop-filter over WebGL) */}
      <div className="absolute top-5 left-5 z-10 max-w-sm rounded-xl bg-[#1D0C10]/90 border border-[#C49A45]/45 px-4 py-3 text-[#FAF5EB] pointer-events-none">
        <p className="text-[11px] tracking-[0.26em] uppercase text-[#DFBA66] font-semibold">
          3D Interactive Palace Mandap
        </p>
        <h2 className="font-calligraphy text-3xl text-[#FAF5EB] mt-0.5">
          The Sacred Courtyard
        </h2>
        <p className="text-xs text-[#F3E9D4]/80 mt-0.5">
          Drag to orbit · Scroll to zoom · Select a royal vantage point below
        </p>
      </div>

      {webglError && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#2A1419]/95 p-6 text-center text-[#FAF5EB]">
          <div className="max-w-md rounded-xl border border-[#C49A45]/50 p-6">
            <p className="text-lg font-medium">{webglError}</p>
          </div>
        </div>
      )}

      {/* Single Collapsible Bottom Control Dock (no backdrop-filter over WebGL, no side panels) */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-[94vw] max-w-[740px] flex flex-col items-center"
      >
        <button
          type="button"
          onClick={() => setDockOpen((v) => !v)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-t-lg bg-[#1D0C10]/95 border border-b-0 border-[#C49A45]/50 text-xs tracking-wider uppercase text-[#DFBA66] cursor-pointer"
        >
          {dockOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          <span>{dockOpen ? 'Hide Controls' : 'Show 3D Controls'}</span>
        </button>

        {dockOpen && (
          <div className="w-full rounded-xl bg-[#1D0C10]/95 border border-[#C49A45]/55 px-3 py-2.5 shadow-2xl flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] tracking-wider uppercase text-[#DFBA66] mr-1">
                <Compass className="w-3.5 h-3.5" />
                View
              </span>
              {(Object.keys(CAMERA_PRESETS) as CameraPreset[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActivePreset(key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap min-h-[36px] ${
                    activePreset === key
                      ? 'bg-[#C49A45] text-[#1D0C10] font-semibold'
                      : 'bg-[#FAF5EB]/10 text-[#FAF5EB] hover:bg-[#FAF5EB]/20'
                  }`}
                >
                  {CAMERA_PRESETS[key].label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 border-t sm:border-t-0 sm:border-l border-[#C49A45]/30 pt-2 sm:pt-0 sm:pl-3">
              <Sun className="w-3.5 h-3.5 text-[#DFBA66]" />
              <button
                type="button"
                onClick={() => setMood('sunset')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer min-h-[36px] ${
                  mood === 'sunset'
                    ? 'bg-[#7A1B2E] text-[#FAF5EB] border border-[#DFBA66]/60'
                    : 'bg-[#FAF5EB]/10 text-[#FAF5EB]/80 hover:bg-[#FAF5EB]/20'
                }`}
              >
                Golden Sunset
              </button>
              <button
                type="button"
                onClick={() => setMood('twilight')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer min-h-[36px] ${
                  mood === 'twilight'
                    ? 'bg-[#7A1B2E] text-[#FAF5EB] border border-[#DFBA66]/60'
                    : 'bg-[#FAF5EB]/10 text-[#FAF5EB]/80 hover:bg-[#FAF5EB]/20'
                }`}
              >
                Diya Twilight
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
