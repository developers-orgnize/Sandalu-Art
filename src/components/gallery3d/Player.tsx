import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import Character from './Character';

// Floor circle positions with artwork IDs for navigation
const FLOOR_POSITIONS = [
  { pos: new THREE.Vector3(0, 0, 20), artworkPos: null, artworkId: null }, // Entrance
  // Left wall artworks
  { pos: new THREE.Vector3(-11, 0, 15), artworkPos: new THREE.Vector3(-14.9, 3, 15), artworkId: 'composition' },
  { pos: new THREE.Vector3(-11, 0, 5), artworkPos: new THREE.Vector3(-14.9, 3, 5), artworkId: 'nature-morte' },
  { pos: new THREE.Vector3(-11, 0, -5), artworkPos: new THREE.Vector3(-14.9, 3, -5), artworkId: 'portrait' },
  { pos: new THREE.Vector3(-11, 0, -15), artworkPos: new THREE.Vector3(-14.9, 3, -15), artworkId: 'etude-i' },
  // Right wall artworks
  { pos: new THREE.Vector3(11, 0, 15), artworkPos: new THREE.Vector3(14.9, 3, 15), artworkId: 'reverie' },
  { pos: new THREE.Vector3(11, 0, 5), artworkPos: new THREE.Vector3(14.9, 3, 5), artworkId: 'melancolie' },
  { pos: new THREE.Vector3(11, 0, -5), artworkPos: new THREE.Vector3(14.9, 3, -5), artworkId: 'abstraction' },
  { pos: new THREE.Vector3(11, 0, -15), artworkPos: new THREE.Vector3(14.9, 3, -15), artworkId: 'etude-ii' },
  // Back wall
  { pos: new THREE.Vector3(0, 0, -21), artworkPos: new THREE.Vector3(0, 3.5, -24.9), artworkId: 'info' },
];

// Create a hook to handle Enter key navigation
export const useArtworkNavigation = () => {
  const [currentArtworkId, setCurrentArtworkId] = useState<string | null>(null);
  return { currentArtworkId, setCurrentArtworkId };
};

// Global state for current artwork (simple approach)
let globalCurrentArtworkId: string | null = null;
let globalNavigate: ((path: string) => void) | null = null;

export const setGlobalNavigate = (navigate: (path: string) => void) => {
  globalNavigate = navigate;
};

export const handleEnterKey = () => {
  if (globalCurrentArtworkId && globalNavigate) {
    globalNavigate(`/artwork/${globalCurrentArtworkId}`);
  }
};

const Player = () => {
  const { camera } = useThree();
  const [playerPosition, setPlayerPosition] = useState(new THREE.Vector3(0, 0, 20));
  const currentPosition = useRef(new THREE.Vector3(0, 0, 20));
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const isViewingArtwork = useRef(false);
  const targetArtwork = useRef<THREE.Vector3 | null>(null);
  const viewingTransition = useRef(0);
  const currentArtworkId = useRef<string | null>(null);
  
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
    rotationY: 0,
    rotationX: 0.1,
  });

  // Third person camera offset
  const cameraOffset = new THREE.Vector3(0, 3, 6);
  
  // Movement settings
  const moveSpeed = 0.03;
  const friction = 0.88;
  
  // Circle detection radius
  const circleRadius = 1.2;

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
    // Check if player is on a circle
    let onCircle = false;
    let nearestArtwork: THREE.Vector3 | null = null;
    let nearestArtworkId: string | null = null;
    
    for (const floorPos of FLOOR_POSITIONS) {
      const dist = currentPosition.current.distanceTo(floorPos.pos);
      if (dist < circleRadius && floorPos.artworkPos) {
        onCircle = true;
        nearestArtwork = floorPos.artworkPos;
        nearestArtworkId = floorPos.artworkId;
        break;
      }
    }
    
    // Update global artwork ID for Enter key navigation
    globalCurrentArtworkId = nearestArtworkId;
    currentArtworkId.current = nearestArtworkId;
    
    // Handle viewing transition
    if (onCircle && nearestArtwork && !keys.current.forward && !keys.current.backward && !keys.current.left && !keys.current.right) {
      isViewingArtwork.current = true;
      targetArtwork.current = nearestArtwork;
      viewingTransition.current = Math.min(1, viewingTransition.current + 0.02);
    } else {
      isViewingArtwork.current = false;
      viewingTransition.current = Math.max(0, viewingTransition.current - 0.04);
    }
    
    // Calculate movement direction based on camera orientation
    const direction = new THREE.Vector3();
    
    // Get forward/backward direction (based on camera Y rotation)
    // Negated so UP arrow moves toward negative Z (into gallery)
    const forward = new THREE.Vector3(
      -Math.sin(mouseState.current.rotationY),
      0,
      -Math.cos(mouseState.current.rotationY)
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
    if (keys.current.left) direction.sub(right);
    if (keys.current.right) direction.add(right);
    
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
    
    // Boundary constraints (keep player inside gallery, allow reaching wall circles)
    currentPosition.current.x = Math.max(-13, Math.min(13, currentPosition.current.x));
    currentPosition.current.z = Math.max(-23, Math.min(22, currentPosition.current.z));
    currentPosition.current.y = 0; // Keep on ground
    
    // Update character position state
    setPlayerPosition(currentPosition.current.clone());
    
    // Calculate camera positions
    const t = viewingTransition.current;
    
    if (t > 0 && targetArtwork.current) {
      // Viewing artwork mode - camera zooms to artwork
      const artworkPos = targetArtwork.current;
      
      // Calculate viewing position (in front of artwork)
      const viewDistance = 4;
      const viewOffset = new THREE.Vector3();
      
      // Determine which wall the artwork is on and position camera accordingly
      if (Math.abs(artworkPos.x) > 10) {
        // Left or right wall
        viewOffset.x = artworkPos.x > 0 ? -viewDistance : viewDistance;
        viewOffset.z = artworkPos.z;
      } else {
        // Back wall
        viewOffset.x = artworkPos.x;
        viewOffset.z = artworkPos.z + viewDistance;
      }
      
      const viewCameraPos = new THREE.Vector3(
        viewOffset.x,
        artworkPos.y,
        viewOffset.z
      );
      
      // Third person camera position
      const normalCameraPos = new THREE.Vector3();
      const offset = cameraOffset.clone();
      offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), mouseState.current.rotationY);
      normalCameraPos.copy(currentPosition.current);
      normalCameraPos.y = 2;
      normalCameraPos.add(offset);
      
      // Lerp between normal and viewing positions
      const lerpedCameraPos = normalCameraPos.clone().lerp(viewCameraPos, t);
      camera.position.lerp(lerpedCameraPos, 0.08);
      
      // Look at artwork when viewing
      const normalLookAt = new THREE.Vector3(currentPosition.current.x, 1.5, currentPosition.current.z);
      const artworkLookAt = new THREE.Vector3(artworkPos.x, artworkPos.y, artworkPos.z);
      const lerpedLookAt = normalLookAt.clone().lerp(artworkLookAt, t);
      camera.lookAt(lerpedLookAt);
    } else {
      // Normal third person camera
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
    }
  });

  return <Character position={playerPosition} />;
};

export default Player;
