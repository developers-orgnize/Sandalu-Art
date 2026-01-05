import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, KeyboardControls } from '@react-three/drei';
import GalleryRoom from './GalleryRoom';
import Player from './Player';
import GalleryUI from './GalleryUI';

// Define keyboard controls mapping
const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'interact', keys: ['Enter'] },
];

const GalleryScene = () => {
  return (
    <div className="w-full h-screen bg-background relative">
      <KeyboardControls map={keyboardMap}>
        <Canvas
          shadows
          camera={{ fov: 60, near: 0.1, far: 1000, position: [0, 2, 10] }}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[10, 20, 10]}
              intensity={1}
              castShadow
              shadow-mapSize={[2048, 2048]}
            />
            <pointLight position={[0, 8, 0]} intensity={0.5} />
            
            {/* Environment */}
            <fog attach="fog" args={['#e8e8e8', 20, 80]} />
            
            {/* Gallery Room */}
            <GalleryRoom />
            
            {/* Player with camera */}
            <Player />
          </Suspense>
        </Canvas>
        
        {/* UI Overlay */}
        <GalleryUI />
      </KeyboardControls>
    </div>
  );
};

export default GalleryScene;
