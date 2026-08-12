/**
 * Single source of truth for section-level scroll progress.
 *
 * DOM: subscribe selectively so only index changes trigger React re-renders.
 * 3D (useFrame): call getState() imperatively — zero React render overhead.
 */
let _workProgress = 0;
let _skillsProgress = 0;

const workListeners = new Set();
const skillsListeners = new Set();

export const scrollStore = {
  // --- Work / Projects ---
  getWorkProgress: () => _workProgress,
  setWorkProgress: (v) => {
    _workProgress = v;
    workListeners.forEach((fn) => fn(v));
  },
  subscribeWork: (fn) => {
    workListeners.add(fn);
    return () => workListeners.delete(fn);
  },

  // --- Skills / Experience ---
  getSkillsProgress: () => _skillsProgress,
  setSkillsProgress: (v) => {
    _skillsProgress = v;
    skillsListeners.forEach((fn) => fn(v));
  },
  subscribeSkills: (fn) => {
    skillsListeners.add(fn);
    return () => skillsListeners.delete(fn);
  },
};
