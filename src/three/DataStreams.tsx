import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * High-speed data particles flowing along circuit pathways.
 * Thousands of microscopic particles streaming through the PCB sprawl.
 */
export default function DataStreams({ count = 3000 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const velocities = useRef<Float32Array>(new Float32Array(count * 3));

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const vel = velocities.current;

    const copper = new THREE.Color('#FF6B00');
    const cyan = new THREE.Color('#00F0FF');
    const blue = new THREE.Color('#0066FF');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Scatter across the entire scene volume
      const angle = Math.random() * Math.PI * 2;
      const dist = 1 + Math.random() * 18;
      positions[i3] = Math.cos(angle) * dist;
      positions[i3 + 1] = (Math.random() - 0.5) * 3;
      positions[i3 + 2] = Math.sin(angle) * dist - 3;

      // Velocity along circuit-like directions (mostly radial + some tangential)
      const speed = 0.005 + Math.random() * 0.02;
      const radial = Math.random() > 0.5;
      if (radial) {
        vel[i3] = Math.cos(angle) * speed;
        vel[i3 + 1] = (Math.random() - 0.5) * 0.002;
        vel[i3 + 2] = Math.sin(angle) * speed;
      } else {
        // Tangential (perpendicular to radial)
        vel[i3] = -Math.sin(angle) * speed;
        vel[i3 + 1] = (Math.random() - 0.5) * 0.001;
        vel[i3 + 2] = Math.cos(angle) * speed;
      }

      // Color distribution
      const c = i % 5 === 0 ? copper : i % 3 === 0 ? cyan : blue;
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count]);

  useFrame(() => {
    if (!ref.current) return;
    const positions = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = positions.array as Float32Array;
    const vel = velocities.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] += vel[i3];
      arr[i3 + 1] += vel[i3 + 1];
      arr[i3 + 2] += vel[i3 + 2];

      // Wrap around when particles go too far
      const dist = Math.sqrt(arr[i3] * arr[i3] + arr[i3 + 2] * arr[i3 + 2]);
      if (dist > 20) {
        const angle = Math.random() * Math.PI * 2;
        const newDist = 1 + Math.random() * 3;
        arr[i3] = Math.cos(angle) * newDist;
        arr[i3 + 2] = Math.sin(angle) * newDist - 3;
      }
    }
    positions.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.025}
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        vertexColors
      />
    </points>
  );
}
