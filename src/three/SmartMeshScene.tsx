import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import ReactorCore from './ReactorCore';
import PCBSprawl from './PCBSprawl';
import DataStreams from './DataStreams';
import { useScrollCamera } from './useScrollCamera';
import { useMouseTilt } from './useMouseTilt';

function SceneContent() {
  useScrollCamera();
  const tiltRef = useMouseTilt(3);

  return (
    <>
      <group ref={tiltRef}>
        {/* Layer 1: The Reactor Core (center, deep Z) */}
        <ReactorCore />

        {/* Layer 2: The PCB Sprawl (fills edges) */}
        <PCBSprawl />

        {/* Layer 4: Kinetic data streams */}
        <DataStreams count={3000} />
      </group>

      {/* Post-processing: Bloom for the glow */}
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.0}
          luminanceThreshold={0.05}
          luminanceSmoothing={0.7}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export default function SmartMeshScene() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0.3, 4], fov: 60, near: 0.1, far: 100 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      {/* Vantablack void */}
      <color attach="background" args={['#000000']} />

      {/* Layer 3: Volumetric Plasma fog — deep indigo at edges */}
      <fog attach="fog" args={['#020818', 10, 40]} />

      <SceneContent />
    </Canvas>
  );
}
