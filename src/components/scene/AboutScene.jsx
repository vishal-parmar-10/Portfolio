import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Box, MeshTransmissionMaterial } from '@react-three/drei';

export default function AboutScene({ position }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group position={position} ref={groupRef}>
      {/* Minimal glass/transparent cubes to frame the HTML text visually */}
      <Float speed={1} rotationIntensity={1} floatIntensity={2}>
        <Box args={[2, 2, 2]} position={[-5, 2, -2]}>
          <MeshTransmissionMaterial 
            backside 
            thickness={0.5} 
            roughness={0.2} 
            transmission={1} 
            ior={1.5} 
            chromaticAberration={0.02} 
            color="#E8E8E8" 
          />
        </Box>
      </Float>

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Box args={[1.5, 1.5, 1.5]} position={[6, -3, -4]}>
          <MeshTransmissionMaterial 
            backside 
            thickness={0.5} 
            roughness={0.1} 
            transmission={0.9} 
            ior={1.2} 
            color="#1A1A1A" 
          />
        </Box>
      </Float>
    </group>
  );
}
