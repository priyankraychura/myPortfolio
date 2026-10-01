import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

/**
 * Counts a number up from zero once it is on screen. `delay` is measured from page load. Shows the final value straight away
 * with reduced motion, and never leaves the number blank.
 */
export default function CountUp({ value, delay = 0, duration = 1300 }) {
    const [shown, setShown] = useState(value);
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined;
        let raf = 0;
        let timer = 0;
        const io = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            io.disconnect();
            setShown(0);
            timer = setTimeout(() => {
                const start = performance.now();
                const step = (now) => {
                    const k = Math.min((now - start) / duration, 1);
                    setShown(Math.round(value * (1 - Math.pow(1 - k, 3))));
                    if (k < 1) raf = requestAnimationFrame(step);
                };
                raf = requestAnimationFrame(step);
            }, Math.max(0, delay - performance.now()));   // the delay only covers the opening splash screen
        });
        io.observe(el);
        return () => { io.disconnect(); clearTimeout(timer); cancelAnimationFrame(raf); };
    }, [value, delay, duration]);

    return <span ref={ref}>{shown}</span>;
}

CountUp.propTypes = { value: PropTypes.number.isRequired, delay: PropTypes.number, duration: PropTypes.number };
