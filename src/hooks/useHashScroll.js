import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useScrollTo from './useScrollTo';

// Jumps to the section named in the URL hash once the page has rendered (e.g. /#contact or /apps/cloak#code-signing)
export default function useHashScroll() {
    const { hash } = useLocation();
    const scrollTo = useScrollTo();

    useEffect(() => {
        if (!hash) return;
        const id = decodeURIComponent(hash.slice(1));
        // wait a frame or two so pinned sections have added their spacing
        const timer = setTimeout(() => scrollTo(id, { immediate: true }), 80);
        return () => clearTimeout(timer);
    }, [hash, scrollTo]);
}
