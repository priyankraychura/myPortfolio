import React, { useState, useEffect } from 'react';

const SPLASH_DURATION = 2000; // ms to show splash

export default function SplashScreen({ onFinish }) {
    const [fadingOut, setFadingOut] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setFadingOut(true);
        }, SPLASH_DURATION);

        return () => clearTimeout(timer);
    }, []);

    const handleAnimationEnd = () => {
        if (fadingOut) {
            onFinish?.();
        }
    };

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-900 gap-8 ${fadingOut ? 'animate-loader-fade-out' : ''
                }`}
            onAnimationEnd={handleAnimationEnd}
        >
            {/* Logo */}
            <div className="animate-loader-pulse">
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 40 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.0299 20.6068L20.0299 15.6876L20.0299 11.644C20.0299 11.07 19.8006 10.5197 19.3929 10.1155L17.5713 8.30986L13.8204 4.58053C12.4628 3.23077 10.1508 4.19237 10.1508 6.10676L10.1508 25.2632C10.1508 27.1783 12.4643 28.1396 13.8215 26.7883L20.0299 20.6068ZM20.0299 20.6068L20.0299 25.5517L20.0299 29.6364C20.0299 30.2088 20.258 30.7577 20.6636 31.1615L26.1786 36.6525C27.5358 38.0037 29.8493 37.0425 29.8493 35.1273V15.976C29.8493 14.0609 27.5358 13.0996 26.1786 14.4508L20.0299 20.5727L20.0299 20.6068Z"
                        fill="white"
                    />
                </svg>
            </div>

            {/* Spinner ring */}
            <div className="w-9 h-9 border-[3px] border-white/[0.08] border-t-sky-400 rounded-full animate-loader-spin" />

            {/* Name */}
            <p className="text-sm font-medium tracking-widest text-white/30 select-none">
                PRIYANK RAYCHURA
            </p>
        </div>
    );
}
