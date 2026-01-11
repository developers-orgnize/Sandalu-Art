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
          <planeGeometry args={[10, 8]} />
          <meshStandardMaterial color="#d8d8d8" roughness={0.9} />
        </mesh>
        
        {/* Title */}
        <Text
          position={[0, 3.2, 0.1]}
          fontSize={0.5}
          color="#000000"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          Thushan Ekanayaka
        </Text>
        
        {/* Subtitle */}
        <Text
          position={[0, 2.6, 0.1]}
          fontSize={0.18}
          color="#666666"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          Software Engineer & Photographer
        </Text>
        
        {/* Decorative line */}
        <mesh position={[0, 2.2, 0.1]}>
          <planeGeometry args={[6, 0.01]} />
          <meshStandardMaterial color="#888888" />
        </mesh>

        {/* Education Section */}
        <Text
          position={[-3.5, 1.6, 0.1]}
          fontSize={0.2}
          color="#000000"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.1}
        >
          Education
        </Text>
        
        {/* Education 1 */}
        <Text
          position={[-3.5, 1.1, 0.1]}
          fontSize={0.14}
          color="#333333"
          anchorX="left"
          anchorY="middle"
        >
          BSc in ICT Honors (Specialized in Software)
        </Text>
        <Text
          position={[-3.5, 0.8, 0.1]}
          fontSize={0.11}
          color="#666666"
          anchorX="left"
          anchorY="middle"
        >
          Faculty of Technology, University of Sri Jayewardenepura
        </Text>
        <Text
          position={[-3.5, 0.55, 0.1]}
          fontSize={0.1}
          color="#888888"
          anchorX="left"
          anchorY="middle"
        >
          2021 - 2025
        </Text>

        {/* Education 2 */}
        <Text
          position={[-3.5, 0.1, 0.1]}
          fontSize={0.14}
          color="#333333"
          anchorX="left"
          anchorY="middle"
        >
          Master Programme Diploma
        </Text>
        <Text
          position={[-3.5, -0.15, 0.1]}
          fontSize={0.11}
          color="#666666"
          anchorX="left"
          anchorY="middle"
        >
          Developer Stack Academy
        </Text>
        <Text
          position={[-3.5, -0.4, 0.1]}
          fontSize={0.1}
          color="#888888"
          anchorX="left"
          anchorY="middle"
        >
          2023 - 2024
        </Text>

        {/* Work Experience Section */}
        <Text
          position={[-3.5, -0.9, 0.1]}
          fontSize={0.2}
          color="#000000"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.1}
        >
          Work Experience
        </Text>

        {/* Work 1 */}
        <Text
          position={[-3.5, -1.4, 0.1]}
          fontSize={0.14}
          color="#333333"
          anchorX="left"
          anchorY="middle"
        >
          Software Engineer
        </Text>
        <Text
          position={[-3.5, -1.65, 0.1]}
          fontSize={0.11}
          color="#666666"
          anchorX="left"
          anchorY="middle"
        >
          Payshia Software Solutions (Pvt) Ltd
        </Text>
        <Text
          position={[-3.5, -1.9, 0.1]}
          fontSize={0.09}
          color="#444444"
          anchorX="left"
          anchorY="middle"
          maxWidth={8}
        >
          Building innovative software solutions and contributing to cutting-edge development projects.
        </Text>
        <Text
          position={[-3.5, -2.2, 0.1]}
          fontSize={0.1}
          color="#22c55e"
          anchorX="left"
          anchorY="middle"
        >
          Currently Working
        </Text>

        {/* Work 2 */}
        <Text
          position={[-3.5, -2.7, 0.1]}
          fontSize={0.14}
          color="#333333"
          anchorX="left"
          anchorY="middle"
        >
          Software Developer
        </Text>
        <Text
          position={[-3.5, -2.95, 0.1]}
          fontSize={0.11}
          color="#666666"
          anchorX="left"
          anchorY="middle"
        >
          Cortana Devs
        </Text>
        <Text
          position={[-3.5, -3.2, 0.1]}
          fontSize={0.09}
          color="#444444"
          anchorX="left"
          anchorY="middle"
          maxWidth={8}
        >
          Developed web applications and contributed to software development projects.
        </Text>

        {/* Bottom decorative line */}
        <mesh position={[0, -3.6, 0.1]}>
          <planeGeometry args={[6, 0.01]} />
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
