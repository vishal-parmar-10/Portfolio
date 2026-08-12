import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { projects } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';
import { scrollStore } from '../store/scrollStore';

const PER_PROJECT_VH = 150;
const N = projects.length;
const SECTION_HEIGHT = `${N * PER_PROJECT_VH}vh`;

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function getIndex(p) { return Math.min(N - 1, Math.floor(clamp(p, 0, 1) * N)); }

export default function Projects() {
  const sectionRef  = useRef(null);
  const panelRef    = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs used imperatively inside the ticker — avoids stale-closure issues
  const indexRef    = useRef(0);
  const visibleRef  = useRef(false);   // true only while Work section is active
  const enteredRef  = useRef(false);   // tracks first-entry to fire initial fade-in
  const prevIdxRef  = useRef(-1);      // tracks last animated index

  // ── GSAP ticker: runs every RAF frame, synced with Lenis ──────────────────
  useEffect(() => {
    const tick = () => {
      const section = sectionRef.current;
      const panel   = panelRef.current;
      if (!section || !panel) return;

      const rect     = section.getBoundingClientRect();
      const sectionH = section.offsetHeight;
      const vh       = window.innerHeight;

      // "entered" = section top has scrolled past viewport top
      // AND section has not fully scrolled past the viewport bottom
      const entered = rect.top <= 0 && rect.bottom >= 0;

      if (!entered) {
        // Work section is not active — ensure panel is invisible
        if (visibleRef.current) {
          gsap.killTweensOf(panel);
          panel.style.opacity = '0';
          panel.style.pointerEvents = 'none';
          visibleRef.current = false;
          enteredRef.current = false;   // reset so re-entry fires the animation again
          prevIdxRef.current = -1;      // reset so first project animates on re-entry
          // Also reset store so 3D scene knows work is inactive
          scrollStore.setWorkProgress(0);
        }
        return;
      }

      // ── Work section is active ─────────────────────────────────────────────

      if (!visibleRef.current) {
        visibleRef.current = true;
        panel.style.pointerEvents = 'auto';
      }

      // Fire the initial entry fade-in exactly once per visit to this section
      if (!enteredRef.current) {
        enteredRef.current = true;
        gsap.killTweensOf(panel);
        gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      }

      // Scroll progress (0→1) through the Work section
      const scrolled = -rect.top;
      const total    = sectionH - vh;
      if (total <= 0) return;

      const progress = clamp(scrolled / total, 0, 1);
      scrollStore.setWorkProgress(progress);

      const idx = getIndex(progress);
      if (idx !== indexRef.current) {
        indexRef.current = idx;
        setActiveIndex(idx);  // triggers useEffect below for per-project fade
      }
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  // ── Per-project fade-in: only while Work is active ────────────────────────
  useEffect(() => {
    const panel = panelRef.current;
    // Guard: do NOT animate if the Work section is not currently active.
    // This prevents the panel from fading in on initial page load.
    if (!panel || !visibleRef.current) return;
    if (prevIdxRef.current === activeIndex) return;
    prevIdxRef.current = activeIndex;

    gsap.killTweensOf(panel);
    gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: 'power2.out' });
  }, [activeIndex]);

  const project = projects[activeIndex];

  return (
    <>
      {/*
        ── Fixed detail panel ─────────────────────────────────────────────────
        Starts completely invisible (opacity:0, pointerEvents:none).
        The GSAP ticker above controls when it becomes visible — only while
        the Work section is scrolled into view. At page load it is invisible.
      */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed',
          top: '50%',
          left: 'clamp(1.5rem, 5vw, 4rem)',
          transform: 'translateY(-50%)',
          maxWidth: 'min(400px, 42vw)',
          opacity: 0,            // starts invisible — ticker controls this
          pointerEvents: 'none', // starts non-interactive
          zIndex: 20,
          willChange: 'opacity',
        }}
      >
        {/* Number + category */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem',
          marginBottom: '1rem',
          fontFamily: 'var(--font-sans)', fontSize: '0.7rem',
          textTransform: 'uppercase', letterSpacing: '0.2em', color: '#888',
        }}>
          <span style={{ color: '#4DA3FF', fontWeight: 600 }}>
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span style={{ width: '2rem', height: '1px', background: '#1A1A1A', display: 'inline-block', flexShrink: 0 }} />
          <span>{project.category}</span>
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display)', fontWeight: 700,
          fontSize: 'clamp(1.8rem, 4.5vw, 3.8rem)',
          color: '#F4F4F0', textTransform: 'uppercase',
          letterSpacing: '-0.03em', lineHeight: 0.9,
          margin: '0 0 1.25rem 0',
        }}>
          {project.title}
        </h2>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.82rem', color: '#888',
          lineHeight: 1.75, marginBottom: '1.5rem',
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {project.overview}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.tools.slice(0, 4).map(tool => (
            <span key={tool} style={{
              fontFamily: 'monospace', fontSize: '0.6rem',
              padding: '0.3rem 0.7rem',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.05)',
              color: '#E8E8E8', textTransform: 'uppercase',
              borderRadius: '2px', letterSpacing: '0.05em',
            }}>
              {tool}
            </span>
          ))}
        </div>

        {/* CTA */}
        <MagneticButton>
          <a href={`#project-${project.id}`} data-cursor="project" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            fontFamily: 'var(--font-display)', fontSize: '0.68rem', fontWeight: 700,
            textTransform: 'uppercase', letterSpacing: '0.14em',
            color: '#F4F4F0', textDecoration: 'none',
          }}>
            <span style={{
              width: '1.4rem', height: '1.4rem', borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <ArrowUpRight size={11} color="white" />
            </span>
            View Project
          </a>
        </MagneticButton>
      </div>

      {/*
        ── Scroll space ────────────────────────────────────────────────────────
        Provides the physical scroll height. Contains no visible content.
      */}
      <section
        id="work"
        ref={sectionRef}
        aria-label="Work / Projects"
        style={{ height: SECTION_HEIGHT, position: 'relative', display: 'block' }}
      />
    </>
  );
}