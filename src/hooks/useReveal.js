import { useEffect } from 'react'

/**
 * Swings `.rd-reveal` elements up into place in 3D as they scroll into view. Content stays
 * visible without JavaScript: the hidden starting pose only applies once `rd-js` is set.
 */
export default function useReveal(scopeRef) {
    useEffect(() => {
        const scope = scopeRef.current;
        if (!scope || !('IntersectionObserver' in window)) return undefined;
        const items = scope.querySelectorAll('.rd-reveal');
        scope.classList.add('rd-js');
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in');
                io.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        items.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [scopeRef]);
}
