import React from 'react'
import { LOGO_BLADES } from '../utils/logo'

// Crops the viewBox to the mark itself
const MARK_VIEWBOX = '9.6 2.7 20.8 35.9';

export function LogoMark({ className, fill = 'currentColor', stroke, strokeWidth }) {
    return (
        <svg className={className} viewBox={MARK_VIEWBOX} aria-hidden="true">
            <path
                fill={stroke ? 'none' : fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
                fillRule="evenodd"
                d={LOGO_BLADES.join('')}
            />
        </svg>
    )
}

const strokeProps = {
    viewBox: '0 0 16 16',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
};

export const ArrowRight = () => <svg {...strokeProps}><path d="M3 8h10M9 4l4 4-4 4" /></svg>;
export const ArrowUpRight = () => <svg {...strokeProps}><path d="M5 11L11 5M6 5h5v5" /></svg>;
export const DownloadIcon = () => <svg {...strokeProps}><path d="M8 2.5v8M4.5 7L8 10.5 11.5 7M3 13.5h10" /></svg>;

export const MenuIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <path d="M3 6h14M3 10h14M3 14h14" />
    </svg>
);

export const CloseIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <path d="M5 5l10 10M15 5L5 15" />
    </svg>
);

export const MedalIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="9" r="5.5" />
        <path d="M8.6 13.4L7 21l5-2.6 5 2.6-1.6-7.6" />
    </svg>
);

export const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
);
