import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMouseTilt } from './useMouseTilt';

export default function TemporalDataRings() {
  const tiltRef = useMouseTilt(5);
  const ringsRef = useRef<THREE.Group>(null);
  
  // Vibrant colors for the rings
  const colors = useMemo(() => ['#00F0FF', '#FF007F', '#FFB000', '#00F0FF', '#FF007F'], []);
  const ringGeoArgsList = useMemo(() => [
    [5, 0.05, 64, 100],
    [7, 0.08, 64, 100],
    [9, 0.03, 64, 100],
    [11, 0.1, 64, 100],
    [14, 0.02, 64, 100]
  ], []);

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        const speed = 0.0005 * (i + 1);
        ring.rotation.x += i % 2 === 0 ? speed : -speed;
        ring.rotation.y += i % 3 === 0 ? speed : -speed;
        ring.rotation.z += i % 2 !== 0 ? speed : -speed;
        
        // Add a subtle hover pulsing effect
        const material = (ring as THREE.Mesh).material as THREE.MeshStandardMaterial;
        if (material && material.emissiveIntensity !== undefined) {
          material.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime + i) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={tiltRef}>
      <ambientLight intensity={0.4} />
      {/* Intense colored lights sweeping through */}
      <pointLight position={[0, 0, 0]} color="#FF007F" intensity={50} distance={30} />
      <pointLight position={[5, 10, -5]} color="#00F0FF" intensity={60} distance={40} />
      <pointLight position={[-10, 5, 5]} color="#FFB000" intensity={40} distance={30} />
      
      <group ref={ringsRef}>
        {ringGeoArgsList.map((args, i) => (
          <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <torusGeometry args={args as [number, number, number, number]} />
            <meshStandardMaterial
              color={colors[i]}
              emissive={colors[i]}
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.7}
              wireframe={i === 2 || i === 4}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
