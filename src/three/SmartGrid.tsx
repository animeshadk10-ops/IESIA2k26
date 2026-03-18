import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Sprawling smart-grid network mesh that stretches into the horizon.
 * Positioned behind the stator core and revealed during Phase 3 scroll.
 */
export default function SmartGrid() {
  const gridRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const time = useRef(0);

  // Generate grid node positions
  const { positions, count } = useMemo(() => {
    const pts: THREE.Matrix4[] = [];
    const spread = 60;
    const density = 18;

    for (let x = -density; x <= density; x++) {
      for (let z = -density; z <= density; z++) {
        const px = (x / density) * spread + (Math.random() - 0.5) * 1.5;
        const pz = (z / density) * spread - 20 + (Math.random() - 0.5) * 1.5;
        const py = (Math.random() - 0.5) * 0.5;

        const mat = new THREE.Matrix4();
        const scale = 0.03 + Math.random() * 0.04;
        mat.compose(
          new THREE.Vector3(px, py, pz),
          new THREE.Quaternion(),
          new THREE.Vector3(scale, scale, scale)
        );
        pts.push(mat);
      }
    }
    return { positions: pts, count: pts.length };
  }, []);

  // Generate connection lines
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices: number[] = [];
    const spread = 60;
    const density = 12;

    for (let x = -density; x <= density; x++) {
      for (let z = -density; z <= density; z++) {
        const px = (x / density) * spread;
        const pz = (z / density) * spread - 20;
        const py = (Math.random() - 0.5) * 0.3;

        // Connect to right neighbor
        if (x < density) {
          const nx = ((x + 1) / density) * spread;
          vertices.push(px, py, pz, nx, (Math.random() - 0.5) * 0.3, pz);
        }
        // Connect to forward neighbor
        if (z < density) {
          const nz = ((z + 1) / density) * spread - 20;
          vertices.push(px, py, pz, px, (Math.random() - 0.5) * 0.3, nz);
        }
      }
    }

    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    return geo;
  }, []);

  useFrame((state) => {
    time.current = state.clock.elapsedTime;

    if (gridRef.current) {
      // Very slow rotation for living feel
      gridRef.current.rotation.y = Math.sin(time.current * 0.02) * 0.02;
    }
  });

  return (
    <group ref={gridRef} position={[0, -1, -10]}>
      {/* Grid nodes (instanced for performance) */}
      <instancedMesh
        ref={nodesRef}
        args={[undefined, undefined, count]}
        frustumCulled
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshPhysicalMaterial
          color="#0066FF"
          metalness={0.5}
          roughness={0.3}
          emissive="#0066FF"
          emissiveIntensity={1.5}
        />
        {/* Set instance matrices */}
        {positions.map((mat, i) => {
          if (nodesRef.current) {
            nodesRef.current.setMatrixAt(i, mat);
          }
          return null;
        })}
      </instancedMesh>

      {/* Connection lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#0066FF"
          transparent
          opacity={0.08}
        />
      </lineSegments>

      {/* Horizon glow plane */}
      <mesh position={[0, -0.5, -25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 80]} />
        <meshPhysicalMaterial
          color="#000000"
          metalness={0}
          roughness={1}
          emissive="#0066FF"
          emissiveIntensity={0.02}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
