import React, { lazy, Suspense } from 'react';
import Hero from './Hero';
import { projects } from '../data/projects';

// Lazy load below-the-fold components
const About = lazy(() => import('./About'));
const Skills = lazy(() => import('./Skills'));
const Projects = lazy(() => import('./Projects'));
const Contact = lazy(() => import('./Contact'));
const DevSpace = lazy(() => import('./DevSpace'));

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
      
      <Suspense fallback={<div className="min-h-screen" />}>
      
      {/* ABOUT */}
      <div className="min-h-[250vh] relative pointer-events-none">
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
      </Suspense>
    </main>
  );
}
