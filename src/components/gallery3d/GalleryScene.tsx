import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GalleryRoom from './GalleryRoom';
import Player, { setGlobalNavigate, handleEnterKey } from './Player';
import GalleryUI from './GalleryUI';

const GalleryScene = () => {
  const navigate = useNavigate();

  // Set up global navigate function for Player
  useEffect(() => {
    setGlobalNavigate(navigate);
  }, [navigate]);

  // Handle Enter key for artwork navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleEnterKey();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full h-screen bg-background relative">
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
    </div>
  );
};

export default GalleryScene;
