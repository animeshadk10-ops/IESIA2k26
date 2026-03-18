import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CYBERNETIC TOPOGRAPHY — a massive undulating wireframe mountain
 * range that stretches across the bottom half into the horizon.
 * Completely different visual from the Hero's reactor/particles.
 * Glows in Thermal Copper + Silicon Blue. Undulates like a digital ocean.
 */

const GRID_W = 120;
const GRID_H = 80;
const CELL = 0.35;

export default function CyberTerrain({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const meshRef = useRef<THREE.LineSegments>(null);

  const { geometry } = useMemo(() => {
    // Generate terrain grid vertices
    const vertices: number[] = [];
    const cols: number[] = [];

    const copper = new THREE.Color('#FF6B00');
    const blue = new THREE.Color('#0066FF');
    const cyan = new THREE.Color('#00F0FF');

    for (let z = 0; z < GRID_H; z++) {
      for (let x = 0; x < GRID_W; x++) {
        const wx = (x - GRID_W / 2) * CELL;
        const wz = (z - GRID_H / 2) * CELL;

        // Mountain terrain height function
        const h =
          Math.sin(wx * 0.3) * Math.cos(wz * 0.2) * 1.5 +
          Math.sin(wx * 0.7 + wz * 0.5) * 0.6 +
          Math.cos(wz * 0.4) * Math.sin(wx * 0.15) * 2.0 +
          (Math.random() - 0.5) * 0.15; // noise

        // Horizontal line to next X
        if (x < GRID_W - 1) {
          const nx = (x + 1 - GRID_W / 2) * CELL;
          const nh =
            Math.sin(nx * 0.3) * Math.cos(wz * 0.2) * 1.5 +
            Math.sin(nx * 0.7 + wz * 0.5) * 0.6 +
            Math.cos(wz * 0.4) * Math.sin(nx * 0.15) * 2.0 +
            (Math.random() - 0.5) * 0.15;

          vertices.push(wx, h, wz, nx, nh, wz);

          // Color based on height + depth
          const t = Math.abs(h) / 3;
          const distFade = 1 - (z / GRID_H) * 0.7;
          const c = t > 0.4 ? copper : z % 5 === 0 ? cyan : blue;
          cols.push(c.r * distFade, c.g * distFade, c.b * distFade);
          cols.push(c.r * distFade, c.g * distFade, c.b * distFade);
        }

        // Vertical line to next Z
        if (z < GRID_H - 1) {
          const nwz = (z + 1 - GRID_H / 2) * CELL;
          const nh =
            Math.sin(wx * 0.3) * Math.cos(nwz * 0.2) * 1.5 +
            Math.sin(wx * 0.7 + nwz * 0.5) * 0.6 +
            Math.cos(nwz * 0.4) * Math.sin(wx * 0.15) * 2.0 +
            (Math.random() - 0.5) * 0.15;

          vertices.push(wx, h, wz, wx, nh, nwz);

          const t = Math.abs(h) / 3;
          const distFade = 1 - (z / GRID_H) * 0.7;
          const c = t > 0.4 ? copper : z % 3 === 0 ? cyan : blue;
          cols.push(c.r * distFade, c.g * distFade, c.b * distFade);
          cols.push(c.r * distFade, c.g * distFade, c.b * distFade);
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
    return { geometry: geo, colors: cols };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;

    // Undulate the terrain like a digital ocean
    const posAttr = meshRef.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i];
      const z = arr[i + 2];
      arr[i + 1] =
        Math.sin(x * 0.3 + t * 0.3) * Math.cos(z * 0.2 + t * 0.2) * 1.5 +
        Math.sin(x * 0.7 + z * 0.5 + t * 0.15) * 0.6 +
        Math.cos(z * 0.4 + t * 0.1) * Math.sin(x * 0.15) * 2.0;
    }
    posAttr.needsUpdate = true;

    // Scroll-driven camera: move forward through terrain
    state.camera.position.set(0, 3 + scrollProgress * 2, 8 - scrollProgress * 5);
    state.camera.lookAt(0, 0, -5);
  });

  return (
    <lineSegments ref={meshRef} geometry={geometry} position={[0, -3, -8]} rotation={[-0.15, 0, 0]}>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  );
}
