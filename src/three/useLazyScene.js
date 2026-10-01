import { useEffect } from 'react'
import { splashDone } from '../utils/splash'

/**
 * Loads a three.js scene module once the opening splash screen is done, so the splash animates
 * smoothly, the text and layout show up first and three.js arrives in its own chunk. `load` returns the module's import promise;
 * `start(module)` builds the scene and returns its cleanup.
 */
export default function useLazyScene(load, start) {
    useEffect(() => {
        let cleanup = null;
        let cancelled = false;
        splashDone
            .then(load)
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
