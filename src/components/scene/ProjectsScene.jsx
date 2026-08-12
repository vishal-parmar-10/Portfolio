import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Edges } from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '../../data/projects';
import { scrollStore } from '../../store/scrollStore';

// ─── Cinematic image animation constants ────────────────────────────────────
//
// The camera during Work sits around z = -30 to -40 (from CameraRig keyframe).
// We place each active image in 3D and animate it relative to its own origin.
//
// Local progress timeline per project:
//   0.00 – 0.15  ENTER  — image spawns far behind camera, small, right side
//   0.15 – 0.65  APPROACH — image travels toward camera, grows
//   0.65 – 0.85  HOLD   — image is prominent, middle-right viewport area
//   0.85 – 1.00  EXIT   — image moves past camera (high Z) and fades

// World-space positions for the image at each lifecycle phase
// These values work relative to camera sitting near z = -35 during Work.
const IMG_ENTER_Z   = -70;   // far behind camera (small, distant)
const IMG_HOLD_Z    = -38;   // slightly in front of camera centre
const IMG_EXIT_Z    = -28;   // just past camera — will be behind it

const IMG_ENTER_X   =  4;    // right side, partially off viewport
const IMG_HOLD_X    =  3.0;  // middle-right
const IMG_EXIT_X    =  3.5;

const IMG_ENTER_SCALE  = 0.6;
const IMG_HOLD_SCALE   = 2.8;  // 16:10 aspect → height = scale * 0.625
const IMG_EXIT_SCALE   = 3.2;  // slightly larger as it "passes"

// Smooth easing helper — cubic ease-in-out
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// Map t from [inStart, inEnd] → [0, 1], clamped
function rangeLerp(t, inStart, inEnd) {
  return Math.max(0, Math.min(1, (t - inStart) / (inEnd - inStart)));
}

/**
 * Derive (activeIndex, localProgress) from raw workProgress.
 * Same logic as Projects.jsx — keeps them always in sync.
 */
function deriveState(workProgress) {
  const n = projects.length;
  const scaled = workProgress * n;
  const index = Math.min(n - 1, Math.floor(scaled));
  const local = index === n - 1 && workProgress >= 1 ? 1 : scaled - index;
  return { index, local };
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function ProjectsScene({ position }) {
  // One ref per project image + frame
  const meshRefs = useRef(projects.map(() => null));
  const frameRefs = useRef(projects.map(() => null));

  useFrame(() => {
    // Imperative read — does NOT trigger any React render
    const workProgress = scrollStore.getWorkProgress();
    const { index: activeIndex, local } = deriveState(workProgress);

    projects.forEach((_, i) => {
      const mesh  = meshRefs.current[i];
      const frame = frameRefs.current[i];
      if (!mesh) return;

      if (i !== activeIndex) {
        // Hide all inactive images immediately — no wasted draw calls
        mesh.visible = false;
        if (frame) frame.visible = false;
        return;
      }

      mesh.visible = true;
      if (frame) frame.visible = true;

      // ── Derive target transforms from localProgress ──────────────────────

      let targetZ, targetX, targetY, targetScale, targetOpacity, targetRotY;

      if (local < 0.15) {
        // ENTER phase: image appears far away, small
        const t = easeInOut(rangeLerp(local, 0, 0.15));
        targetZ      = THREE.MathUtils.lerp(IMG_ENTER_Z, IMG_ENTER_Z + 5, t);
        targetX      = IMG_ENTER_X;
        targetY      = 0;
        targetScale  = THREE.MathUtils.lerp(0, IMG_ENTER_SCALE, t);
        targetOpacity = THREE.MathUtils.lerp(0, 0.4, t);
        targetRotY   = -0.1;

      } else if (local < 0.65) {
        // APPROACH phase: image travels toward camera and grows
        const t = easeInOut(rangeLerp(local, 0.15, 0.65));
        targetZ      = THREE.MathUtils.lerp(IMG_ENTER_Z, IMG_HOLD_Z, t);
        targetX      = THREE.MathUtils.lerp(IMG_ENTER_X, IMG_HOLD_X, t);
        targetY      = 0;
        targetScale  = THREE.MathUtils.lerp(IMG_ENTER_SCALE, IMG_HOLD_SCALE, t);
        targetOpacity = THREE.MathUtils.lerp(0.4, 1.0, t);
        targetRotY   = THREE.MathUtils.lerp(-0.1, -0.05, t);

      } else if (local < 0.85) {
        // HOLD phase: image is prominent and stable on middle-right
        targetZ      = IMG_HOLD_Z;
        targetX      = IMG_HOLD_X;
        targetY      = 0;
        targetScale  = IMG_HOLD_SCALE;
        targetOpacity = 1.0;
        targetRotY   = -0.05;

      } else {
        // EXIT phase: image passes camera and fades
        const t = easeInOut(rangeLerp(local, 0.85, 1.0));
        targetZ      = THREE.MathUtils.lerp(IMG_HOLD_Z, IMG_EXIT_Z, t);
        targetX      = THREE.MathUtils.lerp(IMG_HOLD_X, IMG_EXIT_X, t);
        targetY      = 0;
        targetScale  = THREE.MathUtils.lerp(IMG_HOLD_SCALE, IMG_EXIT_SCALE, t);
        targetOpacity = THREE.MathUtils.lerp(1.0, 0, t);
        targetRotY   = -0.05;
      }

      // ── Smooth interpolation toward targets (damped, not snapped) ─────────
      const DAMP = 0.08;

      mesh.position.x += (targetX - mesh.position.x) * DAMP;
      mesh.position.y += (targetY - mesh.position.y) * DAMP;
      mesh.position.z += (targetZ - mesh.position.z) * DAMP;
      mesh.rotation.y += (targetRotY - mesh.rotation.y) * DAMP;

      const newScale = mesh.scale.x + (targetScale - mesh.scale.x) * DAMP;
      mesh.scale.set(newScale, newScale * 0.625, 1); // 16:10 aspect

      if (mesh.material) {
        mesh.material.opacity += (targetOpacity - mesh.material.opacity) * DAMP;
      }

      // Frame mirrors the image
      if (frame) {
        frame.position.copy(mesh.position);
        frame.rotation.copy(mesh.rotation);
        frame.scale.copy(mesh.scale);
        frame.scale.multiplyScalar(1.02);
        if (frame.material) {
          frame.material.opacity = mesh.material ? mesh.material.opacity * 0.2 : 0;
        }
      }
    });
  });

  return (
    <group position={position}>
      {projects.map((project, i) => (
        <group key={project.id}>
          {/* Thin border frame */}
          <mesh
            ref={(el) => (frameRefs.current[i] = el)}
            position={[IMG_ENTER_X, 0, IMG_ENTER_Z]}
            visible={false}
          >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial color="#050505" transparent opacity={0} />
            <Edges color="#1A1A1A" />
          </mesh>

          {/* Project image — starts at ENTER position, invisible */}
          <Image
            ref={(el) => (meshRefs.current[i] = el)}
            position={[IMG_ENTER_X, 0, IMG_ENTER_Z]}
            url={project.coverImage}
            transparent
            opacity={0}
            toneMapped={false}
            visible={false}
          />
        </group>
      ))}
    </group>
  );
}
