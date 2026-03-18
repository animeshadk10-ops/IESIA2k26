import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Fluid Plasma Neural Mesh — thousands of glowing data nodes
 * floating and undulating like a neural network.
 * Colors: Electric Cyan, Neon Magenta, Thermal Copper.
 * All additive blending, zero lights needed.
 */

const PARTICLE_COUNT = 4000;
const CONNECT_LINES = 300; // Neural connection lines

export default function PlasmaField({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // --- Particle positions + velocities ---
  const { positions, velocities, colors } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);

    const cyan = new THREE.Color('#00F0FF');
    const magenta = new THREE.Color('#FF007F');
    const copper = new THREE.Color('#FF6B00');
    const blue = new THREE.Color('#0066FF');
    const palette = [cyan, magenta, copper, blue, cyan, blue];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Spread across a large volume
      pos[i3]     = (Math.random() - 0.5) * 40;
      pos[i3 + 1] = (Math.random() - 0.5) * 60;
      pos[i3 + 2] = (Math.random() - 0.5) * 30 - 5;

      // Slow drift velocities
      vel[i3]     = (Math.random() - 0.5) * 0.003;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.002;

      // Color from palette
      const c = palette[i % palette.length];
      col[i3]     = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return { positions: pos, velocities: vel, colors: col };
  }, []);

  // --- Neural connection lines ---
  const lineGeo = useMemo(() => {
    const linePositions = new Float32Array(CONNECT_LINES * 6); // 2 points per line
    const lineColors = new Float32Array(CONNECT_LINES * 6);
    const cyan = new THREE.Color('#00F0FF');
    const magenta = new THREE.Color('#FF007F');

    for (let i = 0; i < CONNECT_LINES; i++) {
      const i6 = i * 6;
      const angle1 = Math.random() * Math.PI * 2;
      const angle2 = angle1 + (Math.random() - 0.5) * 1.5;
      const r1 = 2 + Math.random() * 15;
      const r2 = r1 + (Math.random() - 0.5) * 5;
      const y = (Math.random() - 0.5) * 40;

      linePositions[i6]     = Math.cos(angle1) * r1;
      linePositions[i6 + 1] = y;
      linePositions[i6 + 2] = Math.sin(angle1) * r1 - 5;
      linePositions[i6 + 3] = Math.cos(angle2) * r2;
      linePositions[i6 + 4] = y + (Math.random() - 0.5) * 4;
      linePositions[i6 + 5] = Math.sin(angle2) * r2 - 5;

      const c = i % 3 === 0 ? magenta : cyan;
      lineColors[i6] = lineColors[i6 + 3] = c.r;
      lineColors[i6 + 1] = lineColors[i6 + 4] = c.g;
      lineColors[i6 + 2] = lineColors[i6 + 5] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    return geo;
  }, []);

  // --- Animation loop ---
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Animate particles
    if (pointsRef.current) {
      const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        // Drift + gentle sine undulation
        arr[i3]     += velocities[i3]     + Math.sin(t * 0.3 + i * 0.01) * 0.001;
        arr[i3 + 1] += velocities[i3 + 1] + Math.cos(t * 0.2 + i * 0.02) * 0.001;
        arr[i3 + 2] += velocities[i3 + 2];

        // Wrap around boundaries
        if (Math.abs(arr[i3]) > 22) arr[i3] *= -0.9;
        if (Math.abs(arr[i3 + 1]) > 35) arr[i3 + 1] *= -0.9;
        if (Math.abs(arr[i3 + 2] + 5) > 18) arr[i3 + 2] = (Math.random() - 0.5) * 20 - 5;
      }
      posAttr.needsUpdate = true;

      // Slow global rotation
      pointsRef.current.rotation.y = t * 0.01;
    }

    // Rotate connection mesh
    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.008;
      linesRef.current.rotation.x = Math.sin(t * 0.05) * 0.05;
    }

    // Scroll-driven camera shift (parallax depth)
    state.camera.position.y = -scrollProgress * 20;
    state.camera.position.z = 4 + scrollProgress * 3;
    state.camera.lookAt(0, -scrollProgress * 12, -5);
  });

  return (
    <>
      {/* Main particle field */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLE_COUNT}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
          vertexColors
        />
      </points>

      {/* Neural connection lines */}
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          vertexColors
        />
      </lineSegments>

      {/* Large dim aurora spheres — emitting color into the void */}
      <mesh position={[-8, -5, -15]}>
        <sphereGeometry args={[4, 16, 16]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.015} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[10, 5, -18]}>
        <sphereGeometry args={[5, 16, 16]} />
        <meshBasicMaterial color="#FF007F" transparent opacity={0.01} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[0, -15, -12]}>
        <sphereGeometry args={[6, 16, 16]} />
        <meshBasicMaterial color="#FF6B00" transparent opacity={0.012} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[-5, 15, -16]}>
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial color="#0066FF" transparent opacity={0.02} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}
