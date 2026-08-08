import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { damp3 } from 'maath/easing';
import { getSectionProgress } from '../../utils/scroll';

// Camera Keyframes Timeline (Based on approved ranges)
// 0.00 -> 0.10 : Hero
// 0.10 -> 0.20 : Transition
// 0.20 -> 0.35 : About
// 0.35 -> 0.40 : Dev Space
// 0.40 -> 0.75 : Work / Projects
// 0.75 -> 0.88 : Skills
// 0.88 -> 1.00 : Contact
const cameraKeyframes = [
  { progress: 0.00, position: new THREE.Vector3(0, 0, 5) },
  { progress: 0.10, position: new THREE.Vector3(0, 0, 5) }, // End of Hero
  { progress: 0.20, position: new THREE.Vector3(2, 0, -5) }, // Through frame
  { progress: 0.35, position: new THREE.Vector3(0, 0, -20) }, // End of About
  { progress: 0.40, position: new THREE.Vector3(-2, 1, -30) }, // Dev Space
  { progress: 0.75, position: new THREE.Vector3(0, 0, -140) }, // End of Work
  { progress: 0.88, position: new THREE.Vector3(0, -2, -180) }, // End of Skills
  { progress: 1.00, position: new THREE.Vector3(0, 0, -240) } // End of Contact
];

export default function CameraRig() {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 5));
  const mousePos = useRef({ x: 0, y: 0 });
  
  // Track scroll velocity safely
  const scrollY = useRef(0);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    // 1. Calculate global scroll progress (0 to 1) safely
    const currentScroll = window.scrollY || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const globalProgress = Math.max(0, Math.min(1, currentScroll / maxScroll)) || 0;
    
    // Calculate velocity
    const v = (currentScroll - scrollY.current) / (delta * 1000 || 16);
    scrollVelocity.current = THREE.MathUtils.lerp(scrollVelocity.current, v, 0.1);
    scrollY.current = currentScroll;

    // 2. Interpolate camera position based on keyframes
    let currentPos = new THREE.Vector3();
    
    // Find which segment we are in
    let startIndex = 0;
    for (let i = 0; i < cameraKeyframes.length - 1; i++) {
      if (globalProgress >= cameraKeyframes[i].progress && globalProgress <= cameraKeyframes[i + 1].progress) {
        startIndex = i;
        break;
      }
    }
    
    // If we're at or past the end, clamp to the last keyframe
    if (globalProgress >= cameraKeyframes[cameraKeyframes.length - 1].progress) {
      currentPos.copy(cameraKeyframes[cameraKeyframes.length - 1].position);
    } else {
      const startFrame = cameraKeyframes[startIndex];
      const endFrame = cameraKeyframes[startIndex + 1];
      
      // Calculate local progress between these two keyframes
      const segmentProgress = getSectionProgress(globalProgress, startFrame.progress, endFrame.progress);
      
      // Lerp position safely
      if (startFrame && endFrame) {
        currentPos.lerpVectors(startFrame.position, endFrame.position, segmentProgress);
      }
    }

    // 3. Add subtle mouse reaction & velocity impact
    const velocityOffset = Math.min(Math.max(scrollVelocity.current * 0.05, -2), 2) || 0;
    currentPos.x += mousePos.current.x * 0.5;
    currentPos.y += mousePos.current.y * 0.5;
    currentPos.z -= velocityOffset; // Move back slightly when scrolling fast

    targetPosition.current.copy(currentPos);
    
    // 4. Smoothly damp the camera position towards the target
    damp3(camera.position, targetPosition.current, 0.25, delta);
    
    // Look straight ahead with a slight offset, responding to mouse slightly
    camera.lookAt(
      camera.position.x * 0.1 + mousePos.current.x * 0.2, 
      camera.position.y * 0.1 + mousePos.current.y * 0.2, 
      camera.position.z - 10
    );
  });

  return null;
}
