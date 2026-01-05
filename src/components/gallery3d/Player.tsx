import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';
import Character from './Character';

const Player = () => {
  const { camera } = useThree();
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const [playerPosition, setPlayerPosition] = useState(new THREE.Vector3(0, 0, 8));
  
  const [, getKeys] = useKeyboardControls();
  
  // Player state
  const playerRef = useRef({
    position: new THREE.Vector3(0, 0, 8),
    rotation: 0,
  });

  // Mouse look state
  const mouseState = useRef({
    isLocked: false,
    rotationY: Math.PI, // Start facing the info panel
    rotationX: 0.1,
  });

  // Third person camera offset
  const cameraOffset = useRef(new THREE.Vector3(0, 3, 6));

  useEffect(() => {
    // Handle pointer lock
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

  useFrame((_, delta) => {
    const { forward, backward, left, right } = getKeys();
    
    const speed = 8;
    const friction = 0.85;
    
    // Calculate movement direction
    direction.current.set(0, 0, 0);
    
    if (forward) direction.current.z -= 1;
    if (backward) direction.current.z += 1;
    if (left) direction.current.x -= 1;
    if (right) direction.current.x += 1;
    
    direction.current.normalize();
    
    // Apply rotation to movement direction
    const rotatedDirection = direction.current.clone();
    rotatedDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), mouseState.current.rotationY);
    
    // Update velocity
    velocity.current.x += rotatedDirection.x * speed * delta;
    velocity.current.z += rotatedDirection.z * speed * delta;
    
    // Apply friction
    velocity.current.x *= friction;
    velocity.current.z *= friction;
    
    // Update position
    playerRef.current.position.x += velocity.current.x;
    playerRef.current.position.z += velocity.current.z;
    
    // Boundary constraints
    const bounds = { minX: -13, maxX: 13, minZ: -23, maxZ: 23 };
    playerRef.current.position.x = Math.max(bounds.minX, Math.min(bounds.maxX, playerRef.current.position.x));
    playerRef.current.position.z = Math.max(bounds.minZ, Math.min(bounds.maxZ, playerRef.current.position.z));
    
    // Update character position state
    setPlayerPosition(playerRef.current.position.clone());
    
    // Third person camera positioning
    const targetCameraPosition = new THREE.Vector3();
    const offset = cameraOffset.current.clone();
    
    // Rotate offset based on mouse rotation
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), mouseState.current.rotationY);
    
    targetCameraPosition.copy(playerRef.current.position);
    targetCameraPosition.y = 2;
    targetCameraPosition.add(offset);
    
    // Smooth camera follow
    camera.position.lerp(targetCameraPosition, 0.1);
    
    // Camera look at player
    const lookAtPosition = new THREE.Vector3(
      playerRef.current.position.x,
      1.5,
      playerRef.current.position.z
    );
    camera.lookAt(lookAtPosition);
    
    // Apply vertical tilt
    camera.rotation.x += mouseState.current.rotationX * 0.5;
  });

  return <Character position={playerPosition} />;
};

export default Player;
