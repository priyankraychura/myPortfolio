import React, { useEffect, useRef } from 'react'
import { createBackgroundScene } from '../three/backgroundScene'

// The fixed 3D layer behind every home-page section
export default function SceneBackground() {
    const canvasRef = useRef(null);
    useEffect(() => createBackgroundScene({ canvas: canvasRef.current }), []);
    return <canvas className="rd-scene-bg" ref={canvasRef} aria-hidden="true"></canvas>;
}
