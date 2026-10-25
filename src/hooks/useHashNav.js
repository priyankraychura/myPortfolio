import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useScrollTo from './useScrollTo';

// go(id) returns a click handler for an in-page link: it scrolls on the home page,
// and from any other page it goes home first (useHashScroll then finds the section)
export default function useHashNav(onNavigate) {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const scrollTo = useScrollTo();

    return useCallback((id) => (event) => {
        // let ctrl/cmd-click open a new tab as usual
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1) return;
        event.preventDefault();
        onNavigate?.();

        if (pathname === '/') scrollTo(id);
        else navigate(id === 'top' ? '/' : `/#${id}`);
    }, [pathname, navigate, scrollTo, onNavigate]);
}
