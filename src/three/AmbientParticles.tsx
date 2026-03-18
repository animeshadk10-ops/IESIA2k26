import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Ambient particle system filling the entire viewport.
 * Thousands of small glowing dots drifting slowly for atmospheric depth.
 */
export default function AmbientParticles({ count = 2000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 50;     // x
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;  // y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 50;  // z
    }
    return arr;
  }, [count]);



  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.005;
    ref.current.rotation.x = Math.sin(t * 0.003) * 0.02;
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#0088FF"
        size={0.04}
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
