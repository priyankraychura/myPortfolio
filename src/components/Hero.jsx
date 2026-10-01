import React, { useEffect, useRef, useState } from 'react'
import { createHeroScene } from '../three/heroScene'
import { ArrowRight, DownloadIcon } from './icons'
import { LOGO_BLADES } from '../utils/logo'

const CV_URL = 'https://drive.google.com/file/d/1vYR9LJQmxvr5v9_7WwG5JWlYT5mx5nWI/preview';

const stats = [
    { label: 'Projects shipped', value: '35', plus: true },
    { label: 'Years building', value: '4', plus: true },
    { label: 'Apps built', value: '3' },
    { label: 'Awards in 2025', value: '4' },
];

function useIndiaTime() {
    const [time, setTime] = useState('');
    useEffect(() => {
        let fmt;
        try {
            fmt = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: false });
        } catch {
            return undefined;
        }
        const tick = () => setTime(fmt.format(new Date()));
        tick();
        const id = setInterval(tick, 20000);
        return () => clearInterval(id);
    }, []);
    return time;
}

export default function Hero() {
    const heroRef = useRef(null);
    const visualRef = useRef(null);
    const canvasRef = useRef(null);
    const [sceneState, setSceneState] = useState('');
    const time = useIndiaTime();
    const coarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

    useEffect(() => createHeroScene({
        container: visualRef.current,
        canvas: canvasRef.current,
        hero: heroRef.current,
        onLive: () => setSceneState('is-live'),
        onFallback: () => setSceneState('is-fallback'),
    }), []);

    return (
        <section id="home" className="rd-hero" ref={heroRef} aria-labelledby="hero-title">
            <div className={'rd-hero-visual ' + sceneState} ref={visualRef} aria-hidden="true">
                <canvas ref={canvasRef}></canvas>
                <div className="rd-hero-poster">
                    <svg viewBox="9.6 2.7 20.8 35.9">
                        <defs>
                            <linearGradient id="rd-mark-fill" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0" stopColor="#a8e5ff" />
                                <stop offset="0.55" stopColor="#1d8fc4" />
                                <stop offset="1" stopColor="#a8e5ff" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#rd-mark-fill)" fillRule="evenodd" d={LOGO_BLADES.join('')} />
                    </svg>
                </div>
                <p className="rd-hero-hint">Drag to rotate · {coarse ? 'Tap' : 'Click'} to relock</p>
            </div>

            <div className="rd-wrap rd-hero-copy-wrap">
                <div className="rd-hero-copy">
                    <p className="rd-status">
                        <img src="/images/avatar-1.jpg" alt="" width="26" height="26" />
                        <span className="rd-status-dot"></span>
                        <span>Available for work</span>
                        {time && <>
                            <span className="rd-status-sep">·</span>
                            <span><time>{time}</time> IST</span>
                        </>}
                    </p>
                    <h1 id="hero-title">
                        Building modern software <span className="rd-soft">for the web, Windows and Android.</span>
                    </h1>
                    <p className="rd-lead">
                        I&apos;m <strong>Priyank Raychura</strong>, a full-stack developer in Rajkot, India. I build fast,
                        responsive websites with React and Node.js, and private, secure apps with Flutter, Rust and React Native.
                    </p>
                    <div className="rd-cta-row">
                        <a className="rd-btn rd-btn-primary" href="#products">Explore my apps <ArrowRight /></a>
                        <a className="rd-btn rd-btn-ghost" href={CV_URL} target="_blank" rel="noreferrer">Download CV <DownloadIcon /></a>
                    </div>
                </div>
            </div>

            <div className="rd-wrap rd-hero-stats-wrap">
                <dl className="rd-hero-stats">
                    {stats.map(({ label, value, plus }) => (
                        <div key={label}>
                            <dt>{label}</dt>
                            <dd>{value}{plus && <span className="rd-plus">+</span>}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
