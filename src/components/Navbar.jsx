import { ArrowUpRight } from "lucide-react";
import MagneticButton from "./ui/MagneticButton";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full h-24 z-50 flex items-center justify-between px-6 md:px-12 border-b border-white/5 pointer-events-none mix-blend-difference text-white">
      {/* Left: Name */}
      <div className="font-display font-bold text-sm md:text-base tracking-tight uppercase pointer-events-auto">
        VISHAL PARMAR
      </div>
      
      {/* Center: Links */}
      <div className="flex items-center gap-8 md:gap-12 pointer-events-auto">
        <a href="#about" className="hidden md:block font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] hover:text-[#F4F4F0] transition-colors">About</a>
        <a href="#work" className="hidden md:block font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] hover:text-[#F4F4F0] transition-colors">Work</a>
        <a href="#contact" className="hidden md:block font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#888888] hover:text-[#F4F4F0] transition-colors">Contact</a>
        
        <MagneticButton>
          <a href="#contact" className="group flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4F4F0] hover:text-[#4DA3FF] transition-colors">
            <span>Let's Talk</span>
            <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </MagneticButton>
      </div>
    </header>
  );
}