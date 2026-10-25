import React, { useEffect, useRef } from 'react'
import { motion } from '../utils/motion'

// How AirKey works, as a looping diagram: the PC asks, the phone checks a fingerprint,
// an encrypted approval travels across, and the PC unlocks. The loop pauses off screen.
export default function AirKeyFlow() {
    const ref = useRef(null)

    useEffect(() => {
        if (!motion) return
        const svg = ref.current
        const observer = new IntersectionObserver(([entry]) => {
            svg.classList.toggle('is-playing', entry.isIntersecting)
        }, { threshold: 0.2 })
        observer.observe(svg)
        return () => observer.disconnect()
    }, [])

    return (
        <svg className="ak" ref={ref} viewBox="0 0 560 330" role="img" aria-labelledby="ak-title" data-reveal>
            <title id="ak-title">How AirKey works: your PC asks to unlock, you approve with your fingerprint on the phone, and the PC unlocks over an encrypted connection.</title>
            <defs>
                <clipPath id="ak-clip"><circle cx="99" cy="222" r="30" /></clipPath>
                <filter id="ak-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" /></filter>
            </defs>

            <text className="ak-label" x="273" y="150" textAnchor="middle">END-TO-END ENCRYPTED</text>
            <path className="ak-wire" d="M178 166 H368" />

            {/* phone */}
            <g>
                <rect className="ak-body" x="24" y="16" width="150" height="298" rx="28" />
                <rect className="ak-screen" x="34" y="26" width="130" height="278" rx="20" />
                <rect className="ak-notch" x="79" y="34" width="40" height="8" rx="4" />
                <g className="ak-note">
                    <rect className="ak-card" x="44" y="60" width="110" height="54" rx="12" />
                    <image href="/appIcons/airkey.webp" x="52" y="68" width="16" height="16" />
                    <text className="ak-strong" x="74" y="80">AirKey</text>
                    <g className="ak-ask"><text className="ak-t" x="52" y="102">Unlock this PC?</text></g>
                    <g className="ak-ok"><text x="52" y="102">Approved</text></g>
                </g>
                <circle className="ak-fp-bg" cx="99" cy="222" r="30" />
                <g className="ak-fp" transform="translate(79.8 202.8) scale(1.6)">
                    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
                    <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
                    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
                    <path d="M2 12a10 10 0 0 1 18-6" />
                    <path d="M2 16h.01" />
                    <path d="M21.8 16c.2-2 .131-5.354 0-6" />
                    <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
                    <path d="M8.65 22c.21-.66.45-1.32.57-2" />
                    <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
                </g>
                <g clipPath="url(#ak-clip)"><rect className="ak-scan" x="69" y="221" width="60" height="2" rx="1" /></g>
                <text className="ak-t" x="99" y="282" textAnchor="middle">Touch to approve</text>
            </g>

            {/* encrypted approval on its way */}
            <g className="ak-packet">
                <rect className="ak-pk" x="182" y="155" width="76" height="22" rx="11" />
                <text className="ak-mono" x="220" y="170" textAnchor="middle">e2e · 7f3a</text>
            </g>

            {/* PC */}
            <g>
                <rect className="ak-body" x="372" y="62" width="168" height="124" rx="14" />
                <rect className="ak-screen" x="382" y="72" width="148" height="104" rx="8" />
                <circle className="ak-glow" cx="456" cy="112" r="26" filter="url(#ak-blur)" />
                <path className="ak-shackle" d="M446 110 v-8 a10 10 0 0 1 20 0 v8" />
                <rect className="ak-lock-body" x="440" y="108" width="32" height="24" rx="6" />
                <text className="ak-t ak-locked" x="456" y="158" textAnchor="middle">Locked</text>
                <text className="ak-open" x="456" y="158" textAnchor="middle">Welcome back</text>
                <rect className="ak-stand" x="444" y="186" width="24" height="22" />
                <rect className="ak-stand" x="420" y="206" width="72" height="8" rx="4" />
            </g>
        </svg>
    )
}
