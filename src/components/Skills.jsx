import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories as skills } from '../data/skills';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // dynamically space categories over the container
      sectionsRef.current.forEach((ref, i) => {
        const total = skills.length;
        const start = (i / total) * 100;
        const end = ((i + 0.8) / total) * 100;
        
        gsap.fromTo(
          ref,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${start}% center`,
              end: `${end}% center`,
              toggleActions: "play reverse play reverse",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="w-full h-full relative pointer-events-none">
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center px-6 md:px-12 z-20">
        
        <div className="absolute top-1/4 left-6 md:left-12 pointer-events-auto">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#888888]">
            EXPERTISE
          </span>
        </div>

        {skills.map((skillGroup, i) => (
          <div 
            key={skillGroup.id} 
            ref={(el) => (sectionsRef.current[i] = el)}
            className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 pointer-events-auto max-w-2xl opacity-0"
          >
            <div className="font-sans text-xs uppercase tracking-[0.2em] text-[#4DA3FF] mb-4">
              0{i + 1}
            </div>
            <h2 className="font-display font-bold text-5xl md:text-8xl text-[#F4F4F0] uppercase tracking-tighter mb-8 leading-none">
              {skillGroup.title}
            </h2>
            <div className="flex flex-wrap gap-4">
              {skillGroup.skills.map(item => (
                <span key={item.name} className="font-sans text-lg md:text-xl font-light text-[#E8E8E8]">
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        ))}
        
      </div>
    </section>
  );
}