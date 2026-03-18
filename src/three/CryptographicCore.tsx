import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMouseTilt } from './useMouseTilt';

export default function CryptographicCore() {
  const tiltRef = useMouseTilt(3);
  const coreRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.001;
      coreRef.current.rotation.x += 0.0005;
    }
    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        const speed = 0.002 * (i % 2 === 0 ? 1 : -1);
        ring.rotation.x += speed * 0.5;
        ring.rotation.y += speed;
        ring.rotation.z += speed * 0.3;
      });
    }
  });

  return (
    <group ref={tiltRef}>
      <ambientLight intensity={0.2} />
      
      {/* Cybernetic Green Light */}
      <pointLight position={[5, 5, 5]} color="#00FF66" intensity={60} distance={40} />
      <pointLight position={[-8, -5, -4]} color="#00FF66" intensity={40} distance={40} />
      
      {/* Sunset Amber Light */}
      <pointLight position={[-5, 5, 5]} color="#FFB000" intensity={60} distance={40} />
      <pointLight position={[8, -5, 8]} color="#FFB000" intensity={40} distance={40} />

      <group ref={coreRef}>
        {/* Core Sphere - Icosahedron */}
        <mesh>
          <icosahedronGeometry args={[3, 1]} />
          <meshStandardMaterial
            color="#03040A"
            emissive="#0A0514"
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.1}
            wireframe
          />
        </mesh>
        
        {/* Inner Solid Core */}
        <mesh>
          <octahedronGeometry args={[2, 0]} />
          <meshStandardMaterial
            color="#000000"
            metalness={1}
            roughness={0.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>

      {/* Interlocking Security Rings */}
      <group ref={ringsRef}>
        {[4.5, 5.5, 6.5, 7.5].map((radius, i) => (
          <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00FF66' : '#FFB000'}
              emissive={i % 2 === 0 ? '#00FF66' : '#FFB000'}
              emissiveIntensity={1.5}
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
