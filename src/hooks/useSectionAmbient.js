import { useEffect } from 'react';

// Ambient light colors per section id or app sheet: [main glow, secondary glow]
const colors = {
    top: ['#6C8CFF', '#FFB547'],
    apps: ['#7B61FF', '#2FA8FF'],
    work: ['#6C8CFF', '#3DDC97'],
    about: ['#FFB547', '#6C8CFF'],
    recognition: ['#FFB547', '#7B61FF'],
    contact: ['#6C8CFF', '#FFB547'],
    cloak: ['#7B61FF', '#6C8CFF'],
    airkey: ['#2FA8FF', '#6C8CFF'],
    pushtimarg: ['#E5A93C', '#2F5BD8']
};

// Tints the page's ambient light to match the section, or app sheet, in the middle of the screen
export default function useSectionAmbient(scope) {
    useEffect(() => {
        const root = document.documentElement;
        const targets = Array.from(scope.current.querySelectorAll('section[id], [data-sheet]'));
        const inView = new Set();

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) inView.add(entry.target);
                else inView.delete(entry.target);
            });
            const visible = targets.filter((el) => inView.has(el));
            const pick = visible.filter((el) => el.dataset.sheet).pop() || visible.pop();
            const pair = pick && colors[pick.dataset.sheet || pick.id];
            if (pair) {
                root.style.setProperty('--amb', pair[0]);
                root.style.setProperty('--amb-2', pair[1]);
            }
        }, { rootMargin: '-48% 0px -48% 0px' });

        targets.forEach((el) => observer.observe(el));
        return () => {
            observer.disconnect();
            root.style.removeProperty('--amb');
            root.style.removeProperty('--amb-2');
        };
    }, [scope]);
}
