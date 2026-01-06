import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Character from './Character';

const Player = () => {
  const { camera } = useThree();
  const [playerPosition, setPlayerPosition] = useState(new THREE.Vector3(0, 0, 20));
  const currentPosition = useRef(new THREE.Vector3(0, 0, 20));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  
  // Movement keys state
  const keys = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });
  
  // Mouse look state
  const mouseState = useRef({
    isLocked: false,
    rotationY: Math.PI, // Start facing forward into gallery
    rotationX: 0.1,
  });

  // Third person camera offset
  const cameraOffset = new THREE.Vector3(0, 3, 6);
  
  // Movement settings
  const moveSpeed = 0.08;
  const friction = 0.92;

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          keys.current.forward = true;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          keys.current.backward = true;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          keys.current.left = true;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          keys.current.right = true;
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          keys.current.forward = false;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          keys.current.backward = false;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          keys.current.left = false;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          keys.current.right = false;
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

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
    // Calculate movement direction based on camera orientation
    const direction = new THREE.Vector3();
    
    // Get forward/backward direction (based on camera Y rotation)
    const forward = new THREE.Vector3(
      Math.sin(mouseState.current.rotationY),
      0,
      Math.cos(mouseState.current.rotationY)
    );
    
    // Get left/right direction (perpendicular to forward)
    const right = new THREE.Vector3(
      Math.sin(mouseState.current.rotationY + Math.PI / 2),
      0,
      Math.cos(mouseState.current.rotationY + Math.PI / 2)
    );
    
    // Apply movement based on keys
    if (keys.current.forward) direction.add(forward);
    if (keys.current.backward) direction.sub(forward);
    if (keys.current.left) direction.add(right);
    if (keys.current.right) direction.sub(right);
    
    // Normalize and apply speed
    if (direction.length() > 0) {
      direction.normalize().multiplyScalar(moveSpeed);
    }
    
    // Add to velocity
    velocity.current.add(direction);
    
    // Apply friction
    velocity.current.multiplyScalar(friction);
    
    // Update position
    currentPosition.current.add(velocity.current);
    
    // Boundary constraints (keep player inside gallery)
    currentPosition.current.x = Math.max(-8, Math.min(8, currentPosition.current.x));
    currentPosition.current.z = Math.max(-20, Math.min(22, currentPosition.current.z));
    currentPosition.current.y = 0; // Keep on ground
    
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
