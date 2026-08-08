import { Edges } from '@react-three/drei';

export default function TransitionFrame({ position }) {
  const thickness = 1.5;
  const width = 20;
  const height = 16;
  const depth = 6;
  
  return (
    <group position={position}>
      {/* Top */}
      <mesh position={[0, height/2, 0]}>
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.7} metalness={0.2} />
        <Edges color="#1A1A1A" />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -height/2, 0]}>
        <boxGeometry args={[width, thickness, depth]} />
        <meshStandardMaterial color="#0A0A0A" />
        <Edges color="#1A1A1A" />
      </mesh>
      {/* Left */}
      <mesh position={[-width/2, 0, 0]}>
        <boxGeometry args={[thickness, height, depth]} />
        <meshStandardMaterial color="#0A0A0A" />
        <Edges color="#1A1A1A" />
      </mesh>
      {/* Right - Accent side */}
      <mesh position={[width/2, 0, 0]}>
        <boxGeometry args={[thickness, height, depth]} />
        <meshStandardMaterial color="#0A0A0A" />
        <Edges color="#4DA3FF" />
      </mesh>
    </group>
  );
}
