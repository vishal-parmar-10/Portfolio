import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import DevSpace from './DevSpace';
import { projects } from '../data/projects';

export default function HTMLContent() {
  // We allocate height based on content to ensure a real semantic scroll journey.
  const workHeight = `${(projects.length * 100) + 200}vh`;

  return (
    <main id="main-content" className="w-full flex flex-col relative z-10">
      
      {/* HERO: The beginning of the journey */}
      <div className="h-screen relative pointer-events-none">
        <Hero />
      </div>
      
      {/* HERO -> ABOUT TRANSITION */}
      <div className="h-screen relative pointer-events-none" />
      
      {/* ABOUT */}
      <div className="min-h-[120vh] relative pointer-events-none">
        <About />
      </div>

      {/* DESIGN x CODE x INTERACTION (Dev Space) */}
      <div className="h-screen relative pointer-events-none flex flex-col items-center justify-center">
        <DevSpace />
      </div>
      
      {/* WORK / PROJECT GALLERY */}
      <div className="relative pointer-events-none" style={{ minHeight: workHeight }}>
        <Projects />
      </div>
      
      {/* SKILLS */}
      <div className="min-h-[300vh] relative pointer-events-none">
        <Skills />
      </div>
      
      {/* CONTACT */}
      <div className="min-h-[150vh] relative pointer-events-none flex flex-col justify-end pb-24">
        <Contact />
      </div>
      
    </main>
  );
}
