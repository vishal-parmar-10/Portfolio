import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { damp3 } from 'maath/easing';
import { getSectionProgress } from '../../utils/scroll';

// Camera Keyframes
// New total height: 2screen(hero+transition) + 200vh(about) + 1screen(devspace)
//                  + 900vh(work=6×150) + 650vh(skills=5×130) + 150vh(contact)
// ≈ 2200–2300vh total. Progress values tuned to match.
const cameraKeyframes = [
  // Hero
  { progress: 0.00, position: new THREE.Vector3(0,  0,  5) },
  { progress: 0.07, position: new THREE.Vector3(0,  0,  5) },   // end of Hero
  // Transition → About
  { progress: 0.12, position: new THREE.Vector3(2,  0, -5) },   // through frame
  { progress: 0.18, position: new THREE.Vector3(0,  0, -20) },  // About arrives
  // DevSpace
  { progress: 0.24, position: new THREE.Vector3(-2, 1, -30) },
  // WORK — camera holds near z=-35 for the entire Work section (≈0.27→0.68)
  // The project images animate toward the camera, not the camera toward them.
  { progress: 0.27, position: new THREE.Vector3(0,  0, -35) },  // Work start
  { progress: 0.68, position: new THREE.Vector3(0,  0, -36) },  // Work end (tiny drift)
  // SKILLS / EXPERIENCE — hold near z=-180 (≈0.70→0.92)
  { progress: 0.70, position: new THREE.Vector3(0, -2, -180) }, // Skills start
  { progress: 0.92, position: new THREE.Vector3(0, -2, -181) }, // Skills end (tiny drift)
  // Contact
  { progress: 1.00, position: new THREE.Vector3(0,  0, -240) },
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

  // Pre-allocate vector to avoid garbage collection spikes in useFrame
  const currentPos = useRef(new THREE.Vector3());

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
    currentPos.current.set(0, 0, 0);
    
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
      currentPos.current.copy(cameraKeyframes[cameraKeyframes.length - 1].position);
    } else {
      const startFrame = cameraKeyframes[startIndex];
      const endFrame = cameraKeyframes[startIndex + 1];
      
      // Calculate local progress between these two keyframes
      const segmentProgress = getSectionProgress(globalProgress, startFrame.progress, endFrame.progress);
      
      // Lerp position safely
      if (startFrame && endFrame) {
        currentPos.current.lerpVectors(startFrame.position, endFrame.position, segmentProgress);
      }
    }

    // 3. Add subtle mouse reaction & velocity impact
    const velocityOffset = Math.min(Math.max(scrollVelocity.current * 0.05, -2), 2) || 0;
    currentPos.current.x += mousePos.current.x * 0.5;
    currentPos.current.y += mousePos.current.y * 0.5;
    currentPos.current.z -= velocityOffset; // Move back slightly when scrolling fast

    targetPosition.current.copy(currentPos.current);
    
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
