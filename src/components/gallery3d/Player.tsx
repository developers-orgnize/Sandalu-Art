import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Character from './Character';

// Floor circle positions - path through the gallery
const FLOOR_POSITIONS = [
  new THREE.Vector3(0, 0, 20),    // Start position
  new THREE.Vector3(0, 0, 12),    // Position 1
  new THREE.Vector3(-6, 0, 5),    // Left side
  new THREE.Vector3(6, 0, 5),     // Right side
  new THREE.Vector3(0, 0, 0),     // Center
  new THREE.Vector3(-6, 0, -5),   // Left forward
  new THREE.Vector3(6, 0, -5),    // Right forward
  new THREE.Vector3(0, 0, -10),   // Near back
  new THREE.Vector3(-6, 0, -15),  // Left back
  new THREE.Vector3(6, 0, -15),   // Right back
  new THREE.Vector3(0, 0, -18),   // Back center (info panel view)
];

interface PlayerProps {
  currentPositionIndex?: number;
  onPositionChange?: (index: number) => void;
}

const Player = ({ currentPositionIndex = 0, onPositionChange }: PlayerProps) => {
  const { camera } = useThree();
  const [targetIndex, setTargetIndex] = useState(currentPositionIndex);
  const [playerPosition, setPlayerPosition] = useState(FLOOR_POSITIONS[currentPositionIndex].clone());
  const currentPosition = useRef(FLOOR_POSITIONS[currentPositionIndex].clone());
  const isTransitioning = useRef(false);
  
  // Mouse look state
  const mouseState = useRef({
    isLocked: false,
    rotationY: Math.PI, // Start facing forward into gallery
    rotationX: 0.1,
  });

  // Third person camera offset
  const cameraOffset = new THREE.Vector3(0, 3, 6);

  // Handle keyboard and scroll to move between positions
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const movePlayer = (direction: number) => {
      if (isTransitioning.current) return;
      
      setTargetIndex(prev => {
        const newIndex = Math.max(0, Math.min(FLOOR_POSITIONS.length - 1, prev + direction));
        if (newIndex !== prev) {
          isTransitioning.current = true;
          onPositionChange?.(newIndex);
        }
        return newIndex;
      });
    };
    
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const direction = event.deltaY > 0 ? 1 : -1;
        movePlayer(direction);
      }, 50);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          event.preventDefault();
          movePlayer(1); // Forward
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          event.preventDefault();
          movePlayer(-1); // Backward
          break;
      }
    };

    const canvas = document.querySelector('canvas');
    canvas?.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      canvas?.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(scrollTimeout);
    };
  }, [onPositionChange]);

  // Handle pointer lock for mouse look
  useEffect(() => {
    const canvas = document.querySelector('canvas');
    
    const handleClick = () => {
      if (canvas) {
        canvas.requestPointerLock();
      }
    };

    const handleLockChange = () => {
      mouseState.current.isLocked = document.pointerLockElement === canvas;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!mouseState.current.isLocked) return;
      
      const sensitivity = 0.002;
      mouseState.current.rotationY -= event.movementX * sensitivity;
      mouseState.current.rotationX -= event.movementY * sensitivity;
      
      // Clamp vertical rotation
      mouseState.current.rotationX = Math.max(
        -Math.PI / 4,
        Math.min(Math.PI / 4, mouseState.current.rotationX)
      );
    };

    canvas?.addEventListener('click', handleClick);
    document.addEventListener('pointerlockchange', handleLockChange);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas?.removeEventListener('click', handleClick);
      document.removeEventListener('pointerlockchange', handleLockChange);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const targetPosition = FLOOR_POSITIONS[targetIndex];
    
    // Smooth interpolation to target position
    const lerpFactor = 0.03; // Slow, smooth movement
    currentPosition.current.lerp(targetPosition, lerpFactor);
    
    // Check if we've arrived at the target
    const distance = currentPosition.current.distanceTo(targetPosition);
    if (distance < 0.05) {
      currentPosition.current.copy(targetPosition);
      isTransitioning.current = false;
    }
    
    // Update character position state
    setPlayerPosition(currentPosition.current.clone());
    
    // Third person camera positioning
    const targetCameraPosition = new THREE.Vector3();
    const offset = cameraOffset.clone();
    
    // Rotate offset based on mouse rotation
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), mouseState.current.rotationY);
    
    targetCameraPosition.copy(currentPosition.current);
    targetCameraPosition.y = 2;
    targetCameraPosition.add(offset);
    
    // Smooth camera follow
    camera.position.lerp(targetCameraPosition, 0.08);
    
    // Camera look at player
    const lookAtPosition = new THREE.Vector3(
      currentPosition.current.x,
      1.5,
      currentPosition.current.z
    );
    camera.lookAt(lookAtPosition);
    
    // Apply vertical tilt
    camera.rotation.x += mouseState.current.rotationX * 0.5;
  });

  return <Character position={playerPosition} />;
};

export default Player;
export { FLOOR_POSITIONS };
