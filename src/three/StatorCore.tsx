import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Procedural copper coil toroid (stator) with emissive pulsing.
 * Creates a ring of "copper windings" using TorusKnotGeometry
 * and surrounding magnetic core using TorusGeometry.
 */
export default function StatorCore() {
  const coilRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const traceRefs = useRef<THREE.Mesh[]>([]);

  // Pulsing emissive material for the copper coils
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (coilRef.current) {
      const mat = coilRef.current.material as THREE.MeshPhysicalMaterial;
      const pulse = (Math.sin(time * 2) * 0.5 + 0.5) * 0.8 + 0.2;
      mat.emissiveIntensity = pulse;
      coilRef.current.rotation.z = time * 0.1;
    }

    if (coreRef.current) {
      coreRef.current.rotation.z = -time * 0.05;
    }

    // Animate circuit traces
    traceRefs.current.forEach((trace, i) => {
      if (trace) {
        const mat = trace.material as THREE.MeshPhysicalMaterial;
        const offset = i * 0.5;
        mat.emissiveIntensity = (Math.sin(time * 3 + offset) * 0.5 + 0.5) * 1.2;
      }
    });
  });

  // Circuit traces (thin rings representing data flow paths)
  const traces = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      const radius = 1.8 + i * 0.15;
      const angle = (i / 8) * Math.PI * 2;
      arr.push({
        radius,
        tube: 0.008,
        position: [0, 0, (i - 4) * 0.12] as [number, number, number],
        rotation: [0, 0, angle] as [number, number, number],
      });
    }
    return arr;
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {/* Main Copper Coils - TorusKnot for complex winding pattern */}
      <mesh ref={coilRef}>
        <torusKnotGeometry args={[1.5, 0.08, 256, 32, 3, 5]} />
        <meshPhysicalMaterial
          color="#8B4513"
          metalness={1}
          roughness={0.25}
          emissive="#FF6B00"
          emissiveIntensity={0.5}
          clearcoat={0.3}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Magnetic Core - Dark titanium torus */}
      <mesh ref={coreRef}>
        <torusGeometry args={[1.8, 0.35, 64, 128]} />
        <meshPhysicalMaterial
          color="#1a1a1a"
          metalness={0.95}
          roughness={0.15}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Inner Ring - Silicon Blue emissive */}
      <mesh>
        <torusGeometry args={[1.0, 0.02, 32, 128]} />
        <meshPhysicalMaterial
          color="#002244"
          metalness={0.8}
          roughness={0.2}
          emissive="#0066FF"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Circuit Trace Rings */}
      {traces.map((trace, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) traceRefs.current[i] = el; }}
          position={trace.position}
          rotation={trace.rotation}
        >
          <torusGeometry args={[trace.radius, trace.tube, 16, 128]} />
          <meshPhysicalMaterial
            color="#FF6B00"
            metalness={0.7}
            roughness={0.3}
            emissive={i % 2 === 0 ? '#FF6B00' : '#0066FF'}
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Center Energy Core */}
      <mesh>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={0}
          roughness={0}
          emissive="#0066FF"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Energy Halo around center */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.5, 64]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={0}
          roughness={0}
          emissive="#0066FF"
          emissiveIntensity={0.4}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
