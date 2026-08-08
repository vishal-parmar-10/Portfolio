
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { useLenisGSAP } from "./hooks/useLenisGSAP";
import CustomCursor from "./components/ui/CustomCursor";
import Navbar from "./components/Navbar";
import HTMLContent from "./components/HTMLContent";
import Experience from "./components/Experience";

function App() {
  useLenisGSAP();

  return (
    <>
      <Loader 
        containerStyles={{ background: '#050505', zIndex: 99999 }} 
        innerStyles={{ width: '300px' }} 
        barStyles={{ background: '#E8E8E8', height: '2px' }} 
        dataInterpolation={(p) => `LOADING EXPERIENCE\n\nVISHAL PARMAR\n${p.toFixed(0)}%`}
        dataStyles={{ color: '#F4F4F0', fontFamily: 'Space Grotesk, sans-serif', fontSize: '12px', letterSpacing: '0.2em', whiteSpace: 'pre-line' }}
      />
      
      <div className="relative w-full">
        <CustomCursor />

        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10001] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-xs">
          Skip to content
        </a>

        {/* Fixed WebGL Background */}
        <div className="fixed inset-0 z-0 bg-[#050505]">
          <Canvas dpr={[1, 1.5]} gl={{ antialias: true }}>
             <Experience />
          </Canvas>
        </div>

        {/* Scrollable DOM Content on top */}
        <div className="relative z-10 w-full">
          <Navbar />
          <HTMLContent />
        </div>
      </div>
    </>
  );
}

export default App;