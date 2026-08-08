import { Environment } from '@react-three/drei';
import CameraRig from './scene/CameraRig';
import HeroScene from './scene/HeroScene';
import TransitionFrame from './scene/TransitionFrame';
import AboutScene from './scene/AboutScene';
import ProjectsScene from './scene/ProjectsScene';
import SkillsScene from './scene/SkillsScene';
import ContactScene from './scene/ContactScene';

export default function Experience() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 5, 25]} />
      
      {/* High-contrast cinematic lighting */}
      <ambientLight intensity={0.2} color="#ffffff" />
      <directionalLight position={[10, 20, 10]} intensity={2} color="#ffffff" />
      <spotLight position={[-10, 5, 10]} angle={0.4} penumbra={1} intensity={5} color="#4DA3FF" distance={30} />
      
      <Environment preset="city" />

      <CameraRig />

      <group>
        <HeroScene />
        {/* Transition Frame sits between Hero and About */}
        <TransitionFrame position={[2, 0, -8]} />
        
        {/* About space at Z=-20 */}
        <AboutScene position={[0, 0, -20]} />
        
        {/* Work / Project Gallery starting at Z=-40 to -140 */}
        <ProjectsScene position={[0, 0, 0]} />
        
        {/* Skills space at Z=-180 */}
        <SkillsScene position={[0, 0, -180]} />
        
        {/* Contact space at Z=-240 */}
        <ContactScene position={[0, 0, -240]} />
      </group>
    </>
  );
}
