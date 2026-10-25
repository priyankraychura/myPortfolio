import React from 'react'

// The Pushtimarg icon with the three things the app holds orbiting around it
export default function PushtimargOrbit() {
    return (
        <div className="pm-stage" data-reveal>
            <span className="pm-ring" aria-hidden="true"></span>
            <span className="pm-ring pm-ring-2" aria-hidden="true"></span>
            <img
                className="pm-icon"
                src="/appIcons/pushtimarg.webp"
                alt="Pushtimarg app icon: a golden lotus and a peacock feather on deep blue"
                width="360"
                height="360"
                loading="lazy"
            />
            <span className="pm-chip c1">Aarti lyrics</span>
            <span className="pm-chip c2">Varta</span>
            <span className="pm-chip c3">Tithi</span>
        </div>
    )
}
