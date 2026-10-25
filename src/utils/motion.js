// Flags set by the inline script in index.html before React loads
const root = document.documentElement;

// false when the visitor asked for reduced motion (or the page runs under automation)
export const motion = root.classList.contains('motion');

// a mouse or trackpad that can hover; touch screens get no cursor effects
export const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Milliseconds left until `ms` after the intro started (the moment fonts were ready)
export function sinceReady(ms) {
    return Math.max(0, (window.prReadyAt ?? performance.now()) + ms - performance.now());
}

// Runs fn once the intro may start. Returns a function that cancels the wait.
export function onReady(fn) {
    if (root.classList.contains('ready')) {
        fn();
        return () => {};
    }
    document.addEventListener('pr:ready', fn, { once: true });
    return () => document.removeEventListener('pr:ready', fn);
}
