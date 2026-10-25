import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { motion } from '../utils/motion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* Scroll reveals for everything inside `scope`:
   [data-split]  heading words rise out of their masks (render the words with <SplitWords>)
   [data-reveal] blocks fade up, in batches as they enter
   [data-clip]   a framed image opens from a tighter clip and settles */
export default function useReveal(scope) {
    useGSAP(() => {
        if (!motion) return;
        const q = gsap.utils.selector(scope);

        q('[data-split]').forEach((heading) => {
            const words = heading.querySelectorAll('.w > span');
            gsap.set(words, { yPercent: 118 });
            ScrollTrigger.create({
                trigger: heading,
                start: 'top 88%',
                once: true,
                onEnter: () => gsap.to(words, { yPercent: 0, duration: 1.15, ease: 'expo.out', stagger: 0.045 })
            });
        });

        const blocks = q('[data-reveal]');
        if (blocks.length) {
            gsap.set(blocks, { opacity: 0, y: 44 });
            ScrollTrigger.batch(blocks, {
                start: 'top 90%',
                once: true,
                onEnter: (batch) => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    duration: 1.1,
                    ease: 'expo.out',
                    stagger: 0.09,
                    overwrite: true,
                    clearProps: 'transform,opacity'
                })
            });
        }

        q('[data-clip]').forEach((frame) => {
            const img = frame.querySelector('img');
            gsap.set(frame, { clipPath: 'inset(14% 12% 14% 12% round 28px)' });
            if (img) gsap.set(img, { scale: 1.3 });
            ScrollTrigger.create({
                trigger: frame,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.to(frame, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.5, ease: 'expo.out', clearProps: 'clipPath' });
                    if (img) gsap.to(img, { scale: 1, duration: 1.8, ease: 'expo.out', clearProps: 'transform' });
                }
            });
        });

        // keyboard users who tab into a block before it has revealed see it right away
        const container = scope.current;
        const handleFocus = (event) => {
            const block = event.target.closest('[data-reveal]');
            if (block && Number(gsap.getProperty(block, 'opacity')) < 1) {
                gsap.to(block, { opacity: 1, y: 0, duration: 0.4, overwrite: true, clearProps: 'transform,opacity' });
            }
        };
        container.addEventListener('focusin', handleFocus);
        return () => container.removeEventListener('focusin', handleFocus);
    }, { scope });
}
