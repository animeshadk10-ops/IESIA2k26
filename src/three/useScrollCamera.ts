import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Lightweight scroll-linked camera.
 * Reads scroll position directly (no Framer Motion re-renders).
 * Updates camera position in the animation loop for 60fps.
 */
export function useScrollCamera() {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight * 2; // Hero is ~200vh worth of scroll
      targetRef.current = Math.min(scrollY / heroHeight, 1);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame(() => {
    // Smooth interpolation — buttery at 60fps
    scrollRef.current += (targetRef.current - scrollRef.current) * 0.06;
    const t = scrollRef.current;

    // Camera path: close-up → pull back + rise
    camera.position.x = 0;
    camera.position.y = THREE.MathUtils.lerp(0.3, 3, t);
    camera.position.z = THREE.MathUtils.lerp(4, -8, t);

    // Look target moves with camera
    const lookZ = camera.position.z - 8;
    camera.lookAt(0, t * 0.5, lookZ);
  });
}
