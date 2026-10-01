import { useEffect, useRef } from 'react'

/**
 * Tilts an element in 3D toward the pointer. Pair it with the `rd-tilt` class; children with
 * `rd-z1`..`rd-z3` float above the card for depth. Does nothing on touch or with reduced motion.
 */
export default function useTilt(maxDeg = 8) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!finePointer || reduced) return undefined;

        let raf = 0;
        const onMove = (e) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width;
            const py = (e.clientY - r.top) / r.height;
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                el.style.setProperty('--rx', ((0.5 - py) * maxDeg).toFixed(2) + 'deg');
                el.style.setProperty('--ry', ((px - 0.5) * maxDeg).toFixed(2) + 'deg');
                el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
                el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
                el.classList.add('is-tilting');
            });
        };
        const onLeave = () => {
            cancelAnimationFrame(raf);
            el.style.setProperty('--rx', '0deg');
            el.style.setProperty('--ry', '0deg');
            el.classList.remove('is-tilting');
        };
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        return () => {
            cancelAnimationFrame(raf);
            el.removeEventListener('pointermove', onMove);
            el.removeEventListener('pointerleave', onLeave);
        };
    }, [maxDeg]);

    return ref;
}
