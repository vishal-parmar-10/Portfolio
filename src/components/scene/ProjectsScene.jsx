import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Image, Edges } from '@react-three/drei';
import { projects } from '../../data/projects';

export default function ProjectsScene({ position }) {
  const groupRef = useRef();
  const { camera } = useThree();

  // Architectural positioning for a varied spatial gallery
  const projectTransforms = [
    { x: 3, y: 0.5, rotY: -0.15 },
    { x: -3, y: -0.5, rotY: 0.15 },
    { x: 4, y: 1, rotY: -0.1 },
    { x: -2, y: 0.5, rotY: 0.2 },
    { x: 3, y: -1, rotY: -0.2 },
    { x: -4, y: 0, rotY: 0.1 },
  ];

  return (
    <group position={position} ref={groupRef}>
      {projects.map((project, i) => {
        const transform = projectTransforms[i];
        const zPos = -50 - (i * 18); // Space them out evenly along Z
        
        return (
          <ProjectItem 
            key={project.id}
            project={project}
            transform={transform}
            zPos={zPos}
            camera={camera}
          />
        );
      })}
    </group>
  );
}

function ProjectItem({ project, transform, zPos, camera }) {
  const meshRef = useRef();
  const frameRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    
    // Calculate distance from the camera on the Z axis
    const distZ = meshRef.current.position.z - camera.position.z;
    
    // Culling for performance - hide if far behind or very far ahead
    if (distZ > 5 || distZ < -40) {
      meshRef.current.visible = false;
      if (frameRef.current) frameRef.current.visible = false;
      return;
    }
    
    meshRef.current.visible = true;
    if (frameRef.current) frameRef.current.visible = true;

    // Active zone: When the camera approaches the object
    const isActive = distZ < -8 && distZ > -15;
    const progress = Math.max(0, Math.min(1, (distZ + 40) / 30));

    // When active, the project moves to the right side to leave room for the DOM text on the left
    const targetX = isActive ? 2.5 : transform.x;
    const targetY = isActive ? 0 : transform.y;
    // Add tilt on hover
    const targetRot = isActive ? (hovered ? 0.05 : 0) : transform.rotY;
    // Scale up on hover
    const baseScale = isActive ? 2.5 : 1.5;
    const targetScale = hovered && isActive ? baseScale * 1.05 : baseScale;
    
    // Fade out as camera passes right through it
    const targetOpacity = distZ > -5 ? 0 : (isActive ? 1 : progress);

    // Smooth interpolation
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    
    // Add small depth movement on hover
    const targetZPos = zPos + (hovered && isActive ? 1 : 0);
    meshRef.current.position.z += (targetZPos - meshRef.current.position.z) * 0.1;

    meshRef.current.rotation.y += (targetRot - meshRef.current.rotation.y) * 0.05;
    
    const currentScale = meshRef.current.scale.x;
    const newScale = currentScale + (targetScale - currentScale) * 0.1;
    
    // 16:10 approximate aspect ratio
    meshRef.current.scale.set(newScale, newScale * 0.625, 1);
    
    if (meshRef.current.material) {
      meshRef.current.material.opacity += (targetOpacity - meshRef.current.material.opacity) * 0.1;
    }
    
    if (frameRef.current) {
      frameRef.current.position.copy(meshRef.current.position);
      frameRef.current.rotation.copy(meshRef.current.rotation);
      frameRef.current.scale.copy(meshRef.current.scale);
      frameRef.current.scale.multiplyScalar(1.02); // Slightly larger frame
      frameRef.current.material.opacity = meshRef.current.material.opacity * 0.3;
    }
  });

  return (
    <group 
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'none'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'none'; }}
    >
      <mesh ref={frameRef} position={[transform.x, transform.y, zPos]} rotation={[0, transform.rotY, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#050505" transparent />
        <Edges color="#1A1A1A" />
      </mesh>
      
      <Image
        ref={meshRef}
        position={[transform.x, transform.y, zPos]}
        rotation={[0, transform.rotY, 0]}
        url={project.coverImage}
        transparent
        opacity={0}
        toneMapped={false}
      />
    </group>
  );
}
