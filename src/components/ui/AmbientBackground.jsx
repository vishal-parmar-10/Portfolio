import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Top Left Subtle Ambient Glow */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="ambient-glow w-[550px] h-[550px] top-[-10%] left-[-10%] bg-gradient-to-br from-zinc-700/20 via-zinc-800/10 to-transparent"
      />

      {/* Center Right Ambient Glow */}
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="ambient-glow w-[650px] h-[650px] top-[40%] right-[-15%] bg-gradient-to-tl from-zinc-600/15 via-zinc-800/10 to-transparent"
      />

      {/* Bottom Ambient Glow */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="ambient-glow w-[600px] h-[600px] bottom-[-15%] left-[20%] bg-gradient-to-t from-zinc-700/15 via-zinc-900/10 to-transparent"
      />

      {/* SVG Grain / Noise Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] mix-blend-overlay">
        <filter id="ambient-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ambient-grain)" />
      </svg>
    </div>
  );
}
