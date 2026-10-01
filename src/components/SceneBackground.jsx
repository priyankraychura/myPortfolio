import React, { useRef } from 'react'
import useLazyScene from '../three/useLazyScene'

// The fixed 3D layer behind the redesigned pages
export default function SceneBackground() {
    const canvasRef = useRef(null);
    useLazyScene(() => import('../three/backgroundScene'), ({ createBackgroundScene }) => createBackgroundScene({ canvas: canvasRef.current }));
    return <canvas className="rd-scene-bg" ref={canvasRef} aria-hidden="true"></canvas>;
}
