import { useRef, useState, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

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

  if (isInfoPanel) {
    return (
      <group ref={groupRef} position={position} rotation={rotation}>
        {/* Info panel background */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[10, 7]} />
          <meshStandardMaterial color="#d8d8d8" roughness={0.9} />
        </mesh>
        
        {/* Name */}
        <Text
          position={[0, 2.5, 0.1]}
          fontSize={0.55}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          Thushan Ekanayaka
        </Text>
        
        {/* Roles */}
        <Text
          position={[0, 1.8, 0.1]}
          fontSize={0.18}
          color="#555555"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          Software Engineer • Photography • Creative Design
        </Text>
        
        {/* Decorative line */}
        <mesh position={[0, 1.3, 0.1]}>
          <planeGeometry args={[6, 0.008]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        
        {/* Education Section */}
        <Text
          position={[0, 0.8, 0.1]}
          fontSize={0.14}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          EDUCATION
        </Text>
        
        <Text
          position={[0, 0.35, 0.1]}
          fontSize={0.13}
          color="#444444"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
          lineHeight={1.4}
        >
          Bachelor of Information and Communication Tech. Honors
        </Text>
        
        <Text
          position={[0, 0.0, 0.1]}
          fontSize={0.11}
          color="#555555"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
        >
          (Specialized in Software)
        </Text>
        
        <Text
          position={[0, -0.4, 0.1]}
          fontSize={0.11}
          color="#666666"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
          lineHeight={1.3}
        >
          Faculty of Technology, University of Sri Jayewardenepura
        </Text>
        
        {/* Work Experience Section */}
        <Text
          position={[0, -1.0, 0.1]}
          fontSize={0.14}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          WORK EXPERIENCE
        </Text>
        
        <Text
          position={[0, -1.4, 0.1]}
          fontSize={0.13}
          color="#444444"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
        >
          Software Engineer
        </Text>
        
        <Text
          position={[0, -1.75, 0.1]}
          fontSize={0.11}
          color="#666666"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
          textAlign="center"
        >
          Payshia Software Solutions (Pvt) Ltd
        </Text>
        
        {/* Bottom decorative line */}
        <mesh position={[0, -2.5, 0.1]}>
          <planeGeometry args={[5, 0.008]} />
          <meshStandardMaterial color="#333333" />
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
