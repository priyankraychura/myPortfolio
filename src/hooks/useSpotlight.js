import { useEffect } from 'react';
import { finePointer } from '../utils/motion';

// Feeds the cursor position to a .spot card so its border lights up under the pointer
export default function useSpotlight(ref) {
    useEffect(() => {
        const el = ref.current;
        if (!el || !finePointer) return;

        const handleMove = (event) => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty('--sx', `${event.clientX - rect.left}px`);
            el.style.setProperty('--sy', `${event.clientY - rect.top}px`);
        };

        el.addEventListener('pointermove', handleMove);
        return () => el.removeEventListener('pointermove', handleMove);
    }, [ref]);
}
