import { useEffect } from 'react';
import { gsap } from 'gsap';
import { finePointer, motion } from '../utils/motion';

// Pulls the element toward the cursor and feeds --bx/--by to the light inside .btn-fill
export default function useMagnetic(ref, enabled = true, strength = 0.28) {
    useEffect(() => {
        const el = ref.current;
        if (!el || !enabled || !motion || !finePointer) return;

        const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' });

        const handleMove = (event) => {
            const rect = el.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            el.style.setProperty('--bx', `${x}px`);
            el.style.setProperty('--by', `${y}px`);
            xTo((x - rect.width / 2) * strength);
            yTo((y - rect.height / 2) * strength * 1.25);
        };
        const handleLeave = () => {
            xTo(0);
            yTo(0);
        };

        el.addEventListener('pointermove', handleMove);
        el.addEventListener('pointerleave', handleLeave);
        return () => {
            el.removeEventListener('pointermove', handleMove);
            el.removeEventListener('pointerleave', handleLeave);
            gsap.killTweensOf(el);
            gsap.set(el, { clearProps: 'transform' });
        };
    }, [ref, enabled, strength]);
}
