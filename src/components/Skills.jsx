import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories as skills } from '../data/skills';
import { scrollStore } from '../store/scrollStore';

gsap.registerPlugin(ScrollTrigger);

const PER_SKILL_VH = 150;
const N = skills.length;
const INTRO_OFFSET = 1.2;
const OUTRO_OFFSET = 1.2;
const TOTAL_UNITS = (N - 1) + INTRO_OFFSET + OUTRO_OFFSET;
const SECTION_HEIGHT = `${(N + 1.5) * PER_SKILL_VH}vh`;

export default function Skills() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const cardsRef = useRef([]);
  
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const cards = cardsRef.current;
    
    if (!section || !stage || cards.length === 0) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        
        // 1. Update the store (for the 3D scene)
        scrollStore.setSkillsProgress(progress);
        
        // 2. Control visibility containment (avoiding global visibility bugs)
        if (self.isActive) {
          if (stage.style.opacity !== '1') {
            stage.style.opacity = '1';
            stage.style.pointerEvents = 'auto';
          }
        } else {
          if (stage.style.opacity !== '0') {
            stage.style.opacity = '0';
            stage.style.pointerEvents = 'none';
          }
        }
        
        // 3. Update the orbital carousel cards
        // progress goes 0 -> 1.
        // We use offsets to allow the first item to enter from the right, and the last item to exit to the left.
        const activeIndexFloat = -INTRO_OFFSET + progress * TOTAL_UNITS;
        
        for (let i = 0; i < N; i++) {
          const card = cards[i];
          if (!card) continue;
          
          // distance from the active center
          // d = 0 (center)
          // d > 0 (past, leaving left)
          // d < 0 (future, entering from right)
          const d = activeIndexFloat - i;
          const absD = Math.abs(d);
          
          // We only visually process cards within a reasonable range to save performance
          if (absD > 1.5) {
            if (card.style.visibility !== 'hidden') {
              card.style.visibility = 'hidden';
            }
            continue;
          }
          
          if (card.style.visibility === 'hidden') {
            card.style.visibility = 'visible';
          }
          
          // Curve mathematics
          // x: move left/right (-d moves past items left, future items right)
          const x = -d * 45; // 45vw
          
          // y: curve downward at the edges
          const y = (absD ** 1.5) * 100; // 100px dip
          
          // scale: largest at center
          const scale = 1 - Math.min(absD, 1) * 0.25;
          
          // rotation: turn inwards
          const rotateY = d * 25; // degrees
          
          // opacity: fade out at edges
          const opacity = 1 - Math.min(absD, 1.2) * 0.83; // reaches 0 at absD = 1.2
          
          // z-index: center card is always on top
          const zIndex = Math.round(100 - absD * 10);
          
          // Apply transforms imperatively
          card.style.transform = `translate(-50%, -50%) translate3d(${x}vw, ${y}px, 0) scale(${scale}) rotateY(${rotateY}deg)`;
          card.style.opacity = opacity.toFixed(3);
          card.style.zIndex = zIndex;
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-label="Skills / Experience"
      style={{ height: SECTION_HEIGHT, position: 'relative' }}
    >
      {/* 
        Sticky Viewport 
        Contains the orbital carousel while scrolling through the section's height.
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center perspective-[1000px]">
        
        {/* 
          Card Stage 
          Starts invisible to prevent rendering over Hero on initial load.
          Visibility is toggled by ScrollTrigger's isActive state.
        */}
        <div
          ref={stageRef}
          className="relative w-full h-full max-w-[100vw]"
          style={{ opacity: 0, pointerEvents: 'none', willChange: 'opacity' }}
        >
          {skills.map((skill, i) => (
            <div
              key={skill.title}
              ref={(el) => (cardsRef.current[i] = el)}
              className="absolute top-1/2 left-1/2 w-[min(90vw,600px)] p-10 md:p-14 flex flex-col justify-center"
              style={{
                transform: 'translate(-50%, -50%)',
                willChange: 'transform, opacity',
                background: 'rgba(10, 10, 10, 0.4)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '2rem', // Pill-like rounded corners
                boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* EXPERTISE label */}
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.68rem',
                textTransform: 'uppercase', letterSpacing: '0.3em', color: '#888',
                marginBottom: '1.5rem'
              }}>
                EXPERTISE
              </div>

              {/* Index */}
              <div style={{
                fontFamily: 'var(--font-sans)', fontSize: '0.7rem',
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: '#4DA3FF', marginBottom: '0.5rem',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Title */}
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700,
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                color: '#F4F4F0', textTransform: 'uppercase',
                letterSpacing: '-0.03em', lineHeight: 1,
                margin: '0 0 2rem 0',
              }}>
                {skill.title}
              </h2>

              {/* Skills list */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem 1.5rem' }}>
                {skill.skills.map(item => (
                  <span key={item.name} style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)',
                    fontWeight: 300, color: '#E8E8E8',
                  }}>
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}