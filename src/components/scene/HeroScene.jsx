import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, Float, Edges } from '@react-three/drei';

export default function HeroScene() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Very slow, massive architectural breathing
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* Foreground: Massive Glass Slab cutting through the right side */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh position={[2.5, 0, 1]} rotation={[0.1, -0.3, 0.05]}>
          <boxGeometry args={[3, 12, 0.4]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={1}
            roughness={0.1}
            transmission={0.95}
            ior={1.5}
            chromaticAberration={0.03}
            anisotropy={0.3}
            color="#ffffff"
          />
        </mesh>
      </Float>

      {/* Midground: Wireframe Architecture intersecting the glass */}
      <mesh position={[1, -1, -3]} rotation={[0, -Math.PI / 6, 0]}>
        <boxGeometry args={[6, 12, 6]} />
        <meshBasicMaterial color="#050505" />
        <Edges scale={1} color="#1A1A1A" />
      </mesh>

      {/* Background: Monolithic Portal */}
      <mesh position={[4, 1, -8]} rotation={[0, -0.4, 0]}>
        <boxGeometry args={[8, 14, 1]} />
        <meshStandardMaterial color="#0A0A0A" metalness={0.9} roughness={0.4} />
        {/* Electric Blue subtle rim light */}
        <Edges scale={1} color="#4DA3FF" />
      </mesh>

      {/* Accent floating digital fragment */}
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-2, 2, -2]} rotation={[1, 1, 1]}>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#4DA3FF" emissive="#4DA3FF" emissiveIntensity={0.8} />
        </mesh>
      </Float>
      
      {/* Distant background slab */}
      <mesh position={[-4, 0, -10]} rotation={[0, 0.5, 0]}>
        <boxGeometry args={[6, 15, 1]} />
        <meshStandardMaterial color="#080808" metalness={0.5} roughness={0.8} />
      </mesh>

    </group>
  );
}
