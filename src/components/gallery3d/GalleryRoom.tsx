import { useRef } from 'react';
import * as THREE from 'three';
import ArtworkFrame from './ArtworkFrame';

// Floor circle positions - path through the gallery
const FLOOR_POSITIONS = [
  new THREE.Vector3(0, 0, 18),    // Start position
  new THREE.Vector3(-6, 0, 10),   // Left front
  new THREE.Vector3(6, 0, 10),    // Right front
  new THREE.Vector3(0, 0, 5),     // Center
  new THREE.Vector3(-6, 0, 0),    // Left middle
  new THREE.Vector3(6, 0, 0),     // Right middle
  new THREE.Vector3(0, 0, -5),    // Center back
  new THREE.Vector3(-6, 0, -12),  // Left back
  new THREE.Vector3(6, 0, -12),   // Right back
  new THREE.Vector3(0, 0, -18),   // Back center (info panel view)
];

const GalleryRoom = () => {
  const floorRef = useRef<THREE.Mesh>(null);

  // Artwork data
  const artworks = [
    // Left wall artworks
    { position: [-14.9, 3, -15] as [number, number, number], rotation: [0, Math.PI / 2, 0] as [number, number, number], title: 'étude I', image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=500&fit=crop&q=80' },
    { position: [-14.9, 3, -5] as [number, number, number], rotation: [0, Math.PI / 2, 0] as [number, number, number], title: 'portrait', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=500&fit=crop&q=80' },
    { position: [-14.9, 3, 5] as [number, number, number], rotation: [0, Math.PI / 2, 0] as [number, number, number], title: 'nature morte', image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=500&fit=crop&q=80' },
    { position: [-14.9, 3, 15] as [number, number, number], rotation: [0, Math.PI / 2, 0] as [number, number, number], title: 'composition', image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400&h=500&fit=crop&q=80' },
    
    // Right wall artworks
    { position: [14.9, 3, -15] as [number, number, number], rotation: [0, -Math.PI / 2, 0] as [number, number, number], title: 'étude II', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&q=80' },
    { position: [14.9, 3, -5] as [number, number, number], rotation: [0, -Math.PI / 2, 0] as [number, number, number], title: 'abstraction', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop&q=80' },
    { position: [14.9, 3, 5] as [number, number, number], rotation: [0, -Math.PI / 2, 0] as [number, number, number], title: 'mélancolie', image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=400&h=500&fit=crop&q=80' },
    { position: [14.9, 3, 15] as [number, number, number], rotation: [0, -Math.PI / 2, 0] as [number, number, number], title: 'rêverie', image: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?w=400&h=500&fit=crop&q=80' },
    
    // Back wall - main piece with info
    { position: [0, 3.5, -24.9] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], title: 'TheVertMenthe', image: '', isInfoPanel: true },
  ];

  return (
    <group>
      {/* Floor */}
      <mesh
        ref={floorRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[30, 60]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.8} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 8, 0]}>
        <planeGeometry args={[30, 60]} />
        <meshStandardMaterial color="#ffffff" roughness={0.9} />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-15, 4, 0]} receiveShadow>
        <boxGeometry args={[0.2, 8, 60]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.7} />
      </mesh>

      {/* Right Wall */}
      <mesh position={[15, 4, 0]} receiveShadow>
        <boxGeometry args={[0.2, 8, 60]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.7} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 4, -25]} receiveShadow>
        <boxGeometry args={[30, 8, 0.2]} />
        <meshStandardMaterial color="#d0d0d0" roughness={0.7} />
      </mesh>

      {/* Front Wall (with opening) */}
      <mesh position={[-10, 4, 25]} receiveShadow>
        <boxGeometry args={[10, 8, 0.2]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.7} />
      </mesh>
      <mesh position={[10, 4, 25]} receiveShadow>
        <boxGeometry args={[10, 8, 0.2]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.7} />
      </mesh>

      {/* Barrier rails on each side */}
      {[-10, 0, 10].map((zOffset, idx) => (
        <group key={idx}>
          {/* Left barrier */}
          <mesh position={[-12, 1, zOffset]} castShadow>
            <boxGeometry args={[0.1, 1, 8]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[-12, 0.5, zOffset - 4]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[-12, 0.5, zOffset + 4]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
          </mesh>

          {/* Right barrier */}
          <mesh position={[12, 1, zOffset]} castShadow>
            <boxGeometry args={[0.1, 1, 8]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[12, 0.5, zOffset - 4]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
          </mesh>
          <mesh position={[12, 0.5, zOffset + 4]} castShadow>
            <cylinderGeometry args={[0.08, 0.08, 1, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Floor markers (circles) - positioned at key viewing spots */}
      {FLOOR_POSITIONS.map((pos, idx) => (
        <mesh key={`floor-${idx}`} rotation={[-Math.PI / 2, 0, 0]} position={[pos.x, 0.01, pos.z]}>
          <ringGeometry args={[0.8, 1, 48]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.9} transparent opacity={0.4} />
        </mesh>
      ))}

      {/* Artworks */}
      {artworks.map((artwork, idx) => (
        <ArtworkFrame key={idx} {...artwork} />
      ))}

      {/* Ceiling lights */}
      {[-15, -5, 5, 15].map((z, idx) => (
        <group key={idx} position={[0, 7.9, z]}>
          <mesh>
            <boxGeometry args={[2, 0.1, 0.5]} />
            <meshStandardMaterial color="#333333" />
          </mesh>
          <pointLight position={[0, -0.5, 0]} intensity={0.3} distance={10} color="#ffffff" />
        </group>
      ))}
    </group>
  );
};

export default GalleryRoom;
