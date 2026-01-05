import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CharacterProps {
  position: THREE.Vector3;
}

const Character = ({ position }: CharacterProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const hairParticles = useMemo(() => {
    const particles: { x: number; y: number; z: number; scale: number }[] = [];
    const count = 60;
    
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.6;
      const radius = 0.3 + Math.random() * 0.15;
      
      particles.push({
        x: Math.sin(phi) * Math.cos(theta) * radius,
        y: Math.cos(phi) * radius + 0.6,
        z: Math.sin(phi) * Math.sin(theta) * radius,
        scale: 0.08 + Math.random() * 0.06,
      });
    }
    return particles;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle idle animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[position.x, 0, position.z]}>
      {/* Body */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Head base */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Curly hair particles */}
      {hairParticles.map((particle, idx) => (
        <mesh key={idx} position={[particle.x, particle.y, particle.z]} castShadow>
          <sphereGeometry args={[particle.scale, 8, 8]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>
      ))}

      {/* Legs */}
      <mesh position={[-0.08, 0.1, 0]} castShadow>
        <capsuleGeometry args={[0.06, 0.15, 4, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
      <mesh position={[0.08, 0.1, 0]} castShadow>
        <capsuleGeometry args={[0.06, 0.15, 4, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Shadow on floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
    </group>
  );
};

export default Character;
