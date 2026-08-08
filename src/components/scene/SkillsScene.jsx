import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Edges } from '@react-three/drei';

export default function SkillsScene({ position }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      {/* Technical Wireframe Structures */}
      
      {/* Main Core */}
      <mesh position={[4, 0, 0]} rotation={[0.5, 0.5, 0]}>
        <icosahedronGeometry args={[4, 1]} />
        <meshBasicMaterial color="#050505" />
        <Edges color="#4DA3FF" scale={1} />
      </mesh>

      {/* Orbiting structure */}
      <mesh position={[-2, -3, -5]} rotation={[0.2, 0.8, 0.1]}>
        <boxGeometry args={[6, 6, 6]} />
        <meshBasicMaterial color="#050505" />
        <Edges color="#1A1A1A" scale={1.05} />
      </mesh>
      
      {/* Structural columns */}
      <mesh position={[8, 0, -10]}>
        <boxGeometry args={[1, 20, 1]} />
        <meshBasicMaterial color="#080808" />
        <Edges color="#1A1A1A" />
      </mesh>
    </group>
  );
}
