import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { damp3 } from 'maath/easing';
import { getSectionProgress } from '../../utils/scroll';

// Camera Keyframes Timeline (Synchronized with new HTML heights and cinematic holds)
// Total Scroll Height ~ 1800vh (maxScroll = 1700vh)
const cameraKeyframes = [
  { progress: 0.00, position: new THREE.Vector3(0, 0, 5) },
  { progress: 0.06, position: new THREE.Vector3(0, 0, 5) }, // End of Hero
  { progress: 0.12, position: new THREE.Vector3(2, 0, -5) }, // Through transition frame
  
  // ABOUT - Extended Presence (Hold/Drift)
  { progress: 0.16, position: new THREE.Vector3(0, 0, -20) }, // Arrive at About early
  { progress: 0.26, position: new THREE.Vector3(0, 0, -21) }, // Drift slowly through About
  
  // DEV SPACE
  { progress: 0.32, position: new THREE.Vector3(-2, 1, -30) }, // Dev Space
  
  // WORK (Continuous gallery movement)
  { progress: 0.79, position: new THREE.Vector3(0, 0, -140) }, // End of Work gallery
  
  // SKILLS / EXPERIENCE - Extended Presence (Hold/Drift)
  { progress: 0.84, position: new THREE.Vector3(0, -2, -180) }, // Arrive at Skills early
  { progress: 0.97, position: new THREE.Vector3(0, -2, -182) }, // Drift slowly through Skills
  
  // CONTACT
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
