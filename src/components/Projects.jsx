import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const containerRef = useRef(null);
  const metadataRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a scrubbed animation for each metadata block
      metadataRefs.current.forEach((ref, i) => {
        
        // We divide the total scroll height into segments for each project
        const segmentStart = (i / projects.length) * 100;
        const segmentEnd = ((i + 0.8) / projects.length) * 100;
        
        gsap.fromTo(
          ref,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: `${segmentStart}% center`,
              end: `${segmentEnd}% center`,
              toggleActions: "play reverse play reverse",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="w-full h-full relative pointer-events-none">
      {/* Sticky container that stays on screen while we scroll through the Work section */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center px-6 md:px-12 z-20">
        
        {projects.map((project, i) => (
          <div 
            key={project.id} 
            ref={(el) => (metadataRefs.current[i] = el)}
            className="absolute top-1/2 left-6 md:left-12 -translate-y-1/2 pointer-events-auto max-w-sm lg:max-w-md opacity-0"
          >
            <div className="font-sans text-xs uppercase tracking-[0.2em] text-[#888888] mb-4 flex items-center gap-4">
              <span className="text-[#4DA3FF]">0{i + 1}</span>
              <span className="w-8 h-[1px] bg-[#1A1A1A]"></span>
              <span>{project.category}</span>
            </div>
            
            <h2 className="font-display font-bold text-4xl md:text-6xl text-[#F4F4F0] uppercase tracking-tighter mb-6 leading-[0.9]">
              {project.title}
            </h2>
            
            <p className="font-sans text-sm text-[#888888] mb-8 line-clamp-3 leading-relaxed">
              {project.overview}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tools.slice(0, 4).map(tool => (
                <span key={tool} className="text-[10px] font-mono px-3 py-1.5 border border-white/5 bg-white/5 text-[#E8E8E8] uppercase rounded-sm backdrop-blur-md">
                  {tool}
                </span>
              ))}
            </div>
            
            <MagneticButton>
              <a href={`#project-${project.id}`} data-cursor="project" className="group flex items-center gap-3 font-display text-xs font-bold uppercase tracking-widest text-[#F4F4F0] hover:text-[#4DA3FF] transition-colors">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#4DA3FF]/20 transition-colors pointer-events-none">
                  <ArrowUpRight size={12} className="text-white group-hover:text-[#4DA3FF]" />
                </span>
                <span>View Project</span>
              </a>
            </MagneticButton>
          </div>
        ))}

      </div>
    </section>
  );
}