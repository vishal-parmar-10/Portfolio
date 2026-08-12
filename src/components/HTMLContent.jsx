import React, { lazy, Suspense } from 'react';
import Hero from './Hero';

// Lazy load below-the-fold components
const About    = lazy(() => import('./About'));
const Skills   = lazy(() => import('./Skills'));
const Projects = lazy(() => import('./Projects'));
const Contact  = lazy(() => import('./Contact'));
const DevSpace = lazy(() => import('./DevSpace'));

export default function HTMLContent() {
  return (
    <main id="main-content" className="w-full flex flex-col relative z-10">

      {/* HERO */}
      <div className="h-screen relative pointer-events-none">
        <Hero />
      </div>

      {/* HERO → ABOUT transition space */}
      <div className="h-screen relative pointer-events-none" />

      <Suspense fallback={<div className="min-h-screen" />}>

        {/* ABOUT — height is controlled internally by About.jsx wrapper */}
        <div className="relative pointer-events-none" style={{ height: '200vh' }}>
          <About />
        </div>

        {/* DESIGN x CODE x INTERACTION */}
        <div className="h-screen relative pointer-events-none flex flex-col items-center justify-center">
          <DevSpace />
        </div>

        {/* WORK — Projects.jsx renders a fixed panel + a scroll-space <section> */}
        <Projects />

        {/* WORK → EXPERIENCE GAP (cinematic breathing space) */}
        <div className="h-[60vh] relative pointer-events-none" />

        {/* SKILLS — same pattern: fixed panel + scroll-space section */}
        <Skills />

        {/* CONTACT */}
        <div className="min-h-[150vh] relative pointer-events-none flex flex-col justify-end pb-24">
          <Contact />
        </div>

      </Suspense>
    </main>
  );
}
