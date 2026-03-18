import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Dense PCB circuit trace sprawl covering ALL edges of the viewport.
 * Right-angled traces, pads, and pathways radiating outward from center.
 * Pulsing with Thermal Copper and Electric Cyan light.
 */
export default function PCBSprawl() {
  const groupRef = useRef<THREE.Group>(null);
  const pulseRefs = useRef<THREE.LineBasicMaterial[]>([]);

  // Generate dense PCB trace paths
  const traces = useMemo(() => {
    const geos: { geo: THREE.BufferGeometry; color: string; layer: number }[] = [];

    // Generate right-angled circuit pathways radiating from center
    for (let quadrant = 0; quadrant < 4; quadrant++) {
      const xSign = quadrant < 2 ? 1 : -1;
      const zSign = quadrant % 2 === 0 ? 1 : -1;

      for (let t = 0; t < 18; t++) {
        const pts: THREE.Vector3[] = [];
        const startX = (Math.random() * 2 + 1) * xSign;
        const startZ = (Math.random() * 2 + 1) * zSign;
        let cx = startX;
        let cz = startZ;
        const cy = (Math.random() - 0.5) * 0.6;

        pts.push(new THREE.Vector3(cx, cy, cz));

        // Right-angled segments
        for (let seg = 0; seg < 6 + Math.floor(Math.random() * 8); seg++) {
          if (seg % 2 === 0) {
            cx += (Math.random() * 2 + 0.5) * xSign;
          } else {
            cz += (Math.random() * 2 + 0.5) * zSign;
          }
          pts.push(new THREE.Vector3(cx, cy + (Math.random() - 0.5) * 0.1, cz));
        }

        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const color = t % 5 === 0 ? '#FF6B00' : t % 3 === 0 ? '#00F0FF' : '#003388';
        geos.push({ geo, color, layer: quadrant });
      }
    }
    return geos;
  }, []);

  // Generate pad/node positions along edges
  const pads = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < 400; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 3 + Math.random() * 15;
      positions.push(
        Math.cos(angle) * dist,
        (Math.random() - 0.5) * 1.0,
        Math.sin(angle) * dist
      );
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  // Generate via holes (small rings at junctions)
  const vias = useMemo(() => {
    const arr: { pos: [number, number, number]; size: number }[] = [];
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 4 + Math.random() * 10;
      arr.push({
        pos: [
          Math.cos(angle) * dist,
          (Math.random() - 0.5) * 0.4,
          Math.sin(angle) * dist,
        ],
        size: 0.05 + Math.random() * 0.1,
      });
    }
    return arr;
  }, []);

  // Pulse materials
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    pulseRefs.current.forEach((mat, i) => {
      if (mat) {
        mat.opacity = 0.15 + Math.sin(t * 2 + i * 0.3) * 0.08;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, -0.5, -3]} rotation={[Math.PI / 2.5, 0, 0]}>
      {/* Circuit traces */}
      {traces.map((trace, i) => (
        <lineSegments key={`trace-${i}`} geometry={trace.geo}>
          <lineBasicMaterial
            ref={(el: THREE.LineBasicMaterial | null) => { if (el) pulseRefs.current[i] = el; }}
            color={trace.color}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
      ))}

      {/* PCB pads / nodes */}
      <points geometry={pads}>
        <pointsMaterial
          color="#FF6B00"
          size={0.05}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Via holes */}
      {vias.map((via, i) => (
        <mesh key={`via-${i}`} position={via.pos} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[via.size, via.size + 0.02, 16]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#00F0FF' : '#FF6B00'}
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Ground plane traces — large grid substrate */}
      {[-8, -4, 0, 4, 8].map((offset) => (
        <group key={`hgrid-${offset}`}>
          <mesh position={[offset, 0, 0]}>
            <boxGeometry args={[0.003, 0.003, 30]} />
            <meshBasicMaterial color="#002244" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          <mesh position={[0, 0, offset]}>
            <boxGeometry args={[30, 0.003, 0.003]} />
            <meshBasicMaterial color="#002244" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
