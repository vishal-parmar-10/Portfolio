import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

export default function ContactScene({ position }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.5;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      {/* Almost complete darkness, just one subtle floating monolith */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.5}>
        <mesh position={[5, -2, -10]} rotation={[0.1, -0.2, 0]}>
          <boxGeometry args={[4, 16, 2]} />
          <meshStandardMaterial color="#030303" roughness={0.9} metalness={0.1} />
        </mesh>
      </Float>
    </group>
  );
}
