import { useRef, useState, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import profileImage from '@/assets/thushan-profile.jpg';

interface ArtworkFrameProps {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  image: string;
  isInfoPanel?: boolean;
}

const ArtworkFrame = ({ position, rotation, title, image, isInfoPanel }: ArtworkFrameProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Load texture properly using useLoader
  const texture = useMemo(() => {
    if (!image || isInfoPanel) return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load(image);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [image, isInfoPanel]);

  // Load profile image texture
  const profileTexture = useMemo(() => {
    if (!isInfoPanel) return null;
    const loader = new THREE.TextureLoader();
    const tex = loader.load(profileImage);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [isInfoPanel]);

  if (isInfoPanel) {
    return (
      <group ref={groupRef} position={position} rotation={rotation}>
        {/* Info panel background */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[10, 6]} />
          <meshStandardMaterial color="#d8d8d8" roughness={0.9} />
        </mesh>
        
        {/* Profile Image */}
        <mesh position={[-3, 0.3, 0.1]}>
          <planeGeometry args={[2.5, 3.2]} />
          {profileTexture ? (
            <meshStandardMaterial map={profileTexture} roughness={0.5} />
          ) : (
            <meshStandardMaterial color="#cccccc" roughness={0.5} />
          )}
        </mesh>
        
        {/* Title */}
        <Text
          position={[1.5, 1.8, 0.1]}
          fontSize={0.45}
          color="#000000"
          anchorX="center"
          anchorY="middle"
        >
          Thushan Ekanayaka
        </Text>
        
        {/* Subtitle */}
        <Text
          position={[1.5, 1.1, 0.1]}
          fontSize={0.16}
          color="#666666"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          Software Engineer & Photographer
        </Text>
        
        {/* Description */}
        <Text
          position={[1.5, -0.2, 0.1]}
          fontSize={0.11}
          color="#444444"
          anchorX="center"
          anchorY="middle"
          maxWidth={4.5}
          textAlign="center"
          lineHeight={1.5}
        >
          {`I am Thushan Ekanayaka, a dedicated and innovative design and creativity ICT graduate at the Faculty of Technology, University of Sri Jayewardenepura.`}
        </Text>
        
        {/* Decorative line */}
        <mesh position={[1.5, -1.8, 0.1]}>
          <planeGeometry args={[4, 0.01]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>
    );
  }

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[3.4, 4.4, 0.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Inner frame mat */}
      <mesh position={[0, 0, 0.08]}>
        <planeGeometry args={[3, 4]} />
        <meshStandardMaterial color="#f8f8f8" roughness={0.9} />
      </mesh>

      {/* Artwork image */}
      <mesh position={[0, 0, 0.11]}>
        <planeGeometry args={[2.6, 3.6]} />
        {texture ? (
          <meshStandardMaterial map={texture} roughness={0.5} />
        ) : (
          <meshStandardMaterial color="#cccccc" roughness={0.5} />
        )}
      </mesh>

      {/* Title label */}
      <Text
        position={[0, -2.5, 0.15]}
        fontSize={0.15}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        {title}
      </Text>

      {/* Spotlight effect */}
      <pointLight
        position={[0, 2, 1]}
        intensity={hovered ? 0.5 : 0.2}
        distance={5}
        color="#ffffff"
      />
    </group>
  );
};

export default ArtworkFrame;
