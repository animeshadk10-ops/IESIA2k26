import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Colossal wireframe Tokamak reactor core.
 * Multiple concentric toroidal wireframes + icosahedral containment cage
 * + rotating magnetic field lines. All MeshBasicMaterial + additive blending.
 */
export default function ReactorCore() {
  const outerRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Group>(null);
  const cageRef = useRef<THREE.Group>(null);
  const fieldRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (outerRef.current) {
      outerRef.current.rotation.y = t * 0.08;
      outerRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.12;
      innerRef.current.rotation.z = t * 0.06;
    }
    if (cageRef.current) {
      cageRef.current.rotation.y = t * 0.03;
      cageRef.current.rotation.x = t * 0.02;
    }
    if (fieldRef.current) {
      fieldRef.current.rotation.z = t * 0.15;
    }
  });

  // Magnetic field lines — spiraling curves around the core
  const fieldLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    for (let i = 0; i < 24; i++) {
      const pts: THREE.Vector3[] = [];
      const baseAngle = (i / 24) * Math.PI * 2;
      for (let j = 0; j <= 120; j++) {
        const t = (j / 120) * Math.PI * 2;
        const r = 2.2 + Math.sin(t * 3 + baseAngle) * 0.3;
        pts.push(new THREE.Vector3(
          Math.cos(t + baseAngle) * r,
          Math.sin(t * 2 + baseAngle) * 0.8,
          Math.sin(t + baseAngle) * r
        ));
      }
      const curve = new THREE.CatmullRomCurve3(pts, true);
      lines.push(new THREE.BufferGeometry().setFromPoints(curve.getPoints(120)));
    }
    return lines;
  }, []);

  return (
    <group position={[0, 0, -5]}>
      {/* === OUTER TOROIDAL SHELLS (3 nested) === */}
      <group ref={outerRef}>
        {[2.8, 2.4, 2.0].map((radius, i) => (
          <mesh key={`torus-outer-${i}`} rotation={[Math.PI / 2 + i * 0.15, 0, i * 0.3]}>
            <torusGeometry args={[radius, 0.01 + i * 0.005, 4, 128]} />
            <meshBasicMaterial
              color="#0066FF"
              transparent
              opacity={0.35 - i * 0.08}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* === INNER WIREFRAME TORUS KNOTS (interlocking) === */}
      <group ref={innerRef}>
        {[
          { p: 2, q: 3, radius: 1.6, tube: 0.008, color: '#0088FF', opacity: 0.4 },
          { p: 3, q: 5, radius: 1.3, tube: 0.006, color: '#0066FF', opacity: 0.3 },
          { p: 5, q: 7, radius: 1.0, tube: 0.005, color: '#00AAFF', opacity: 0.25 },
          { p: 7, q: 11, radius: 0.7, tube: 0.004, color: '#00F0FF', opacity: 0.2 },
        ].map((knot, i) => (
          <mesh key={`knot-${i}`}>
            <torusKnotGeometry args={[knot.radius, knot.tube, 256, 8, knot.p, knot.q]} />
            <meshBasicMaterial
              color={knot.color}
              transparent
              opacity={knot.opacity}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        ))}
      </group>

      {/* === ICOSAHEDRAL CONTAINMENT CAGE === */}
      <group ref={cageRef}>
        {[3.5, 4.2].map((radius, i) => {
          const geo = new THREE.IcosahedronGeometry(radius, i === 0 ? 1 : 2);
          const edges = new THREE.EdgesGeometry(geo);
          return (
            <lineSegments key={`cage-${i}`} geometry={edges}>
              <lineBasicMaterial
                color={i === 0 ? '#0066FF' : '#0044AA'}
                transparent
                opacity={0.12 - i * 0.04}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </lineSegments>
          );
        })}
      </group>

      {/* === MAGNETIC FIELD LINES === */}
      <group ref={fieldRef}>
        {fieldLines.map((geo, i) => (
          <lineSegments key={`field-${i}`} geometry={geo}>
            <lineBasicMaterial
              color={i % 3 === 0 ? '#FF6B00' : '#0055CC'}
              transparent
              opacity={0.1 + (i % 4) * 0.02}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </lineSegments>
        ))}
      </group>

      {/* === CORE ENERGY SPHERE === */}
      <mesh>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial
          color="#00F0FF"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color="#0066FF"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
