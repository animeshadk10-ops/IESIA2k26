import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Ethereal Smart Grid — lightweight glowing wireframe network.
 * Uses MeshBasicMaterial with additive blending for zero lighting cost.
 * Fills the entire viewport depth with an intricate web of data lines.
 */
export default function EtherealGrid() {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef(0);

  // --- Concentric rings (Smart Grid backbone) ---
  const rings = useMemo(() => {
    const arr: { radius: number; segments: number; color: string; speed: number; yOffset: number }[] = [];
    for (let i = 0; i < 12; i++) {
      arr.push({
        radius: 1.5 + i * 1.2,
        segments: 64 + i * 16,
        color: i % 3 === 0 ? '#FF6B00' : '#0066FF',
        speed: 0.02 + Math.random() * 0.01,
        yOffset: (Math.random() - 0.5) * 2,
      });
    }
    return arr;
  }, []);

  // --- Radial spline connections ---
  const splines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    const count = 36;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const pts: THREE.Vector3[] = [];
      for (let r = 1; r < 16; r += 0.3) {
        const wobble = Math.sin(r * 2 + i) * 0.15;
        pts.push(
          new THREE.Vector3(
            Math.cos(angle + wobble * 0.1) * r,
            wobble + (Math.random() - 0.5) * 0.1,
            Math.sin(angle + wobble * 0.1) * r
          )
        );
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(80));
      lines.push(geo);
    }
    return lines;
  }, []);

  // --- Node positions (intersection points) ---
  const nodeGeo = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 14;
      positions.push(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 1.5,
        Math.sin(angle) * radius
      );
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    pulseRef.current = t;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Concentric wireframe rings */}
      {rings.map((ring, i) => (
        <mesh
          key={`ring-${i}`}
          position={[0, ring.yOffset, 0]}
          rotation={[Math.PI / 2 + (i % 2 === 0 ? 0.1 : -0.05), 0, i * 0.15]}
        >
          <ringGeometry args={[ring.radius, ring.radius + 0.015, ring.segments]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.25 - i * 0.015}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Radial spline connections */}
      {splines.map((geo, i) => (
        <lineSegments key={`spline-${i}`} geometry={geo}>
          <lineBasicMaterial
            color={i % 4 === 0 ? '#FF6B00' : '#0044CC'}
            transparent
            opacity={0.12}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      ))}

      {/* Node dots */}
      <points geometry={nodeGeo}>
        <pointsMaterial
          color="#0088FF"
          size={0.06}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Central energy core — very subtle */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#0066FF"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
