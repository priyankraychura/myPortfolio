import { useEffect } from 'react'

/**
 * Loads a three.js scene module only after the page has rendered, so the text and layout show
 * up first and three.js arrives in its own chunk. `load` returns the module's import promise;
 * `start(module)` builds the scene and returns its cleanup.
 */
export default function useLazyScene(load, start) {
    useEffect(() => {
        let cleanup = null;
        let cancelled = false;
        load()
            .then((mod) => { if (!cancelled) cleanup = start(mod); })
            .catch((err) => console.error('3D scene failed to load', err));
        return () => {
            cancelled = true;
            if (cleanup) cleanup();
        };
        // The scene is built once per mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
