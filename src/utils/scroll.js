/**
 * Normalizes a global scroll progress (0 to 1) into a section-specific progress (0 to 1).
 * If the global progress is before the section starts, it returns 0.
 * If the global progress is after the section ends, it returns 1.
 * 
 * @param {number} globalProgress - Current scroll progress between 0 and 1
 * @param {number} start - The global progress where this section begins
 * @param {number} end - The global progress where this section ends
 * @returns {number} - Section progress between 0 and 1
 */
export function getSectionProgress(globalProgress, start, end) {
    if (globalProgress <= start) return 0;
    if (globalProgress >= end) return 1;
    return (globalProgress - start) / (end - start);
}
