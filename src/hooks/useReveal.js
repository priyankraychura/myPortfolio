import { useEffect } from 'react'

/**
 * Swings `.rd-reveal` elements up into place in 3D as they scroll into view. Content stays
 * visible without JavaScript: the hidden starting pose only applies once `rd-js` is set.
 * When an element reveals, every element before it reveals too, so nothing above the
 * reader can stay hidden even if an observer callback is missed.
 */
export default function useReveal(scopeRef) {
    useEffect(() => {
        const scope = scopeRef.current;
        if (!scope || !('IntersectionObserver' in window)) return undefined;
        const items = [...scope.querySelectorAll('.rd-reveal')];
        scope.classList.add('rd-js');
        const revealUpTo = (index) => {
            for (let i = 0; i <= index; i++) {
                if (!items[i].classList.contains('is-in')) {
                    items[i].classList.add('is-in');
                    io.unobserve(items[i]);
                }
            }
        };
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) revealUpTo(items.indexOf(entry.target));
            });
        }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });
        items.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [scopeRef]);
}
