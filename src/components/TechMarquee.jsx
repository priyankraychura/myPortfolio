import React from 'react'

const rows = [
    ['React', 'Node.js', 'Flutter', 'Rust', 'Three.js', 'Tailwind CSS', 'MongoDB', 'Express', 'React Native', 'Django'],
    ['Cloak', 'XChaCha20-Poly1305', 'AirKey', 'Argon2id', 'Pushtimarg', 'Windows DPAPI', 'Android Keystore', 'libsodium', 'Vite', 'Figma'],
];

// Two counter-scrolling bands, tilted back in 3D like a road sign seen from below
export default function TechMarquee() {
    return (
        <div className="rd-marquee" aria-hidden="true">
            <div className="rd-marquee-stage">
                {rows.map((items, r) => (
                    <div key={r} className={'rd-marquee-row' + (r ? ' is-reverse' : '')}>
                        <div className="rd-marquee-track">
                            {[...items, ...items].map((item, i) => (
                                <span key={i} className="rd-marquee-item">{item}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
