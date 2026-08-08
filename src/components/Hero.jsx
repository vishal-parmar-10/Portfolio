import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pin the hero and scale it down into the background as we scroll
      gsap.to(textRef.current, {
        scale: 0.7,
        opacity: 0,
        filter: 'blur(10px)',
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          pinSpacing: false,
        }
      });
    }, containerRef);
    
    const handleMouseMove = (e) => {
      if (!textRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(textRef.current, { x, y, duration: 1, ease: "power2.out" });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen pt-24 pb-12 px-6 md:px-12 flex flex-col justify-end z-20 pointer-events-none">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-end h-full">
        
        {/* Left/Center Text */}
        <div ref={textRef} className="col-span-1 md:col-span-9 flex flex-col justify-end h-full pointer-events-auto origin-left">
          <p className="font-sans text-xs md:text-sm uppercase tracking-widest text-[#888888] mb-4 md:mb-6">
            CREATIVE DEVELOPER & WEB DESIGNER
          </p>
          
          <h1 className="font-display font-bold leading-[0.85] tracking-tighter text-[#F4F4F0] uppercase -ml-1 md:-ml-2 mb-8 md:mb-12" style={{ fontSize: "clamp(5rem, 12vw, 15rem)" }}>
            VISHAL<br/>
            PARMAR
          </h1>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
            <p className="font-sans text-sm md:text-base text-[#888888] max-w-sm leading-relaxed">
              I craft high-impact digital experiences, bridging visual design and modern web engineering.
            </p>
            
            <MagneticButton>
              <a href="#work" className="group flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#F4F4F0] hover:text-[#4DA3FF] transition-colors">
                <span>View My Work</span>
                <span className="w-8 h-[1px] bg-white group-hover:bg-[#4DA3FF] group-hover:w-12 transition-all duration-300"></span>
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Right side is intentionally empty for the 3D architecture to dominate */}
        <div className="col-span-1 md:col-span-2"></div>

        {/* Scroll Indicator at bottom right */}
        <div className="col-span-1 flex justify-end md:justify-center items-end pb-4 pointer-events-auto">
          <span className="font-sans text-[10px] uppercase tracking-widest text-[#888888] animate-bounce" style={{ writingMode: "vertical-rl" }}>
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
}