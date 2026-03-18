import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * NEURAL ROUTING MATRIX — A massive, interlocking geometric data core.
 * Nested icosahedron + torus knots + quantum rings.
 * Reactively changes emissive color based on activeTrack prop.
 * 0 = Cyan, 1 = Copper, 2 = Magenta
 */

const TRACK_COLORS = [
  new THREE.Color('#00F0FF'), // Track 1 — Cyan
  new THREE.Color('#FF6B00'), // Track 2 — Copper
  new THREE.Color('#FF007F'), // Track 3 — Magenta
];

export default function NeuralCore({ activeTrack = 0 }: { activeTrack?: number }) {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);
  const materialsRef = useRef<THREE.LineBasicMaterial[]>([]);
  const pointMatRef = useRef<THREE.PointsMaterial>(null);
  const currentColor = useRef(new THREE.Color('#00F0FF'));

  // Icosahedron edges at different detail levels
  const edgeGeos = useMemo(() => {
    return [2, 1, 0].map((detail) => {
      const ico = new THREE.IcosahedronGeometry(detail === 2 ? 2.5 : detail === 1 ? 3.5 : 4.5, detail);
      return new THREE.EdgesGeometry(ico);
    });
  }, []);

  // Torus knot wireframes
  const knotGeos = useMemo(() => {
    return [
      { p: 2, q: 3, r: 1.8, tube: 0.01 },
      { p: 3, q: 5, r: 1.4, tube: 0.008 },
      { p: 5, q: 7, r: 1.0, tube: 0.006 },
    ].map((k) => new THREE.TorusKnotGeometry(k.r, k.tube, 200, 6, k.p, k.q));
  }, []);

  // Node positions on the icosahedron vertices
  const nodeGeo = useMemo(() => {
    const ico = new THREE.IcosahedronGeometry(4.5, 1);
    const pos = ico.attributes.position;
    const pts = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      pts[i * 3] = pos.getX(i);
      pts[i * 3 + 1] = pos.getY(i);
      pts[i * 3 + 2] = pos.getZ(i);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    return geo;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Smoothly interpolate to target color
    const target = TRACK_COLORS[activeTrack] || TRACK_COLORS[0];
    currentColor.current.lerp(target, 0.03);

    // Update all material colors
    materialsRef.current.forEach((mat) => {
      if (mat) mat.color.copy(currentColor.current);
    });
    if (pointMatRef.current) {
      pointMatRef.current.color.copy(currentColor.current);
    }

    // Rotate groups
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.04;
      outerRef.current.rotation.x = Math.sin(t * 0.03) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.08;
      innerRef.current.rotation.z = t * 0.03;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = t * 0.02;
      ringsRef.current.rotation.x = Math.cos(t * 0.04) * 0.15;
    }

    // Pulse on track change — slight scale breathing
    const pulse = 1 + Math.sin(t * 1.5) * 0.02;
    if (outerRef.current) outerRef.current.scale.setScalar(pulse);
  });

  return (
    <group position={[0, 0, -6]}>
      {/* OUTER — Nested icosahedral wireframes */}
      <group ref={outerRef}>
        {edgeGeos.map((geo, i) => (
          <lineSegments key={`ico-${i}`} geometry={geo}>
            <lineBasicMaterial
              ref={(el: THREE.LineBasicMaterial | null) => { if (el) materialsRef.current[i] = el; }}
              transparent
              opacity={0.2 - i * 0.05}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
        ))}
      </group>

      {/* INNER — Torus knot wireframes */}
      <group ref={innerRef}>
        {knotGeos.map((geo, i) => (
          <mesh key={`knot-${i}`} geometry={geo}>
            <meshBasicMaterial
              ref={(el: THREE.MeshBasicMaterial | null) => { if (el) materialsRef.current[3 + i] = (el as unknown as THREE.LineBasicMaterial); }}
              transparent
              opacity={0.15 - i * 0.03}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              wireframe
            />
          </mesh>
        ))}
      </group>

      {/* RINGS — Quantum orbital rings */}
      <group ref={ringsRef}>
        {[3.0, 4.0, 5.2].map((r, i) => (
          <mesh key={`ring-${i}`} rotation={[Math.PI / 2 + i * 0.2, i * 0.4, 0]}>
            <torusGeometry args={[r, 0.008, 4, 128]} />
            <meshBasicMaterial
              ref={(el: THREE.MeshBasicMaterial | null) => { if (el) materialsRef.current[6 + i] = (el as unknown as THREE.LineBasicMaterial); }}
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* NODE DOTS — on icosahedron vertices */}
      <points geometry={nodeGeo}>
        <pointsMaterial
          ref={pointMatRef}
          size={0.08}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Central energy sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          ref={(el: THREE.MeshBasicMaterial | null) => { if (el) materialsRef.current[9] = (el as unknown as THREE.LineBasicMaterial); }}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
