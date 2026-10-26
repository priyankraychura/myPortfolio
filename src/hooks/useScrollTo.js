import { useCallback } from 'react';
import { useLenis } from 'lenis/react';
import { motion } from '../utils/motion';

// keeps the section heading clear of the fixed nav
const navOffset = () => -((document.getElementById('nav')?.offsetHeight ?? 68) + 12);

// Returns scrollTo(target): target is a section id, an element, or 'top'. Uses Lenis when it is running.
export default function useScrollTo() {
    const lenis = useLenis();

    return useCallback((target, { immediate = false } = {}) => {
        const toTop = target === 'top' || target === 0;
        const el = toTop ? null : typeof target === 'string' ? document.getElementById(target) : target;
        if (!toTop && !el) return;

        if (lenis) {
            // Lenis re-measures the page on a delay; a page that just loaded would cut the jump short
            lenis.resize();
            lenis.scrollTo(toTop ? 0 : el, { offset: toTop ? 0 : navOffset(), immediate, duration: 1.5, force: true });
            return;
        }

        const top = toTop ? 0 : el.getBoundingClientRect().top + window.scrollY + navOffset();
        window.scrollTo({ top, behavior: immediate || !motion ? 'auto' : 'smooth' });
    }, [lenis]);
}
