import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export function useMouseTilt(maxDegrees = 5) {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, []);

  // Attach listener
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', onMouseMove);
  }

  useFrame(() => {
    if (!groupRef.current) return;
    const maxRad = THREE.MathUtils.degToRad(maxDegrees);

    target.current.x = mouse.current.y * maxRad;
    target.current.y = mouse.current.x * maxRad;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      target.current.x,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      target.current.y,
      0.05
    );
  });

  return groupRef;
}
