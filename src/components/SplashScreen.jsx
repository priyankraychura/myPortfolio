import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { LOGO_BLADES } from '../utils/logo';
import { markSplashDone } from '../utils/splash';

const SPLASH_DURATION = 1900; // ms to show splash

// Opening screen: the two blades of the mark slide together and lock, matching the 3D hero
export default function SplashScreen({ onFinish }) {
    const [fadingOut, setFadingOut] = useState(false);
    const finishRef = useRef(onFinish);
    finishRef.current = onFinish;

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadingOut(true);
            markSplashDone();
        }, SPLASH_DURATION);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!fadingOut) return undefined;
        const timer = setTimeout(() => finishRef.current?.(), 600);
        return () => clearTimeout(timer);
    }, [fadingOut]);

    return (
        <div className={'rd-splash' + (fadingOut ? ' is-leaving' : '')} role="status" aria-label="Loading">
            <div className="rd-splash-glow" aria-hidden="true"></div>
            <svg className="rd-splash-mark" viewBox="9.6 2.7 20.8 35.9" aria-hidden="true">
                <defs>
                    <linearGradient id="rd-splash-fill" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0" stopColor="#a8e5ff" />
                        <stop offset="0.55" stopColor="#38bdf8" />
                        <stop offset="1" stopColor="#1d8fc4" />
                    </linearGradient>
                </defs>
                <path className="rd-splash-blade is-top" fill="url(#rd-splash-fill)" d={LOGO_BLADES[0]} />
                <path className="rd-splash-blade is-bottom" fill="url(#rd-splash-fill)" d={LOGO_BLADES[1]} />
            </svg>
            <div className="rd-splash-ring" aria-hidden="true"></div>
            <p className="rd-splash-name">Priyank Raychura</p>
            <div className="rd-splash-bar" aria-hidden="true"><span></span></div>
        </div>
    );
}

SplashScreen.propTypes = { onFinish: PropTypes.func };
