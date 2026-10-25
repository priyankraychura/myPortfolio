import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import SectionHead from './SectionHead'
import ProductSheet from './ProductSheet'
import CloakWindow from './CloakWindow'
import AirKeyFlow from './AirKeyFlow'
import PushtimargOrbit from './PushtimargOrbit'
import { apps } from '../utils/works'
import { motion } from '../utils/motion'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const visuals = {
    cloak: <CloakWindow />,
    airkey: <AirKeyFlow />,
    pushtimarg: <PushtimargOrbit />
};

const Apps = () => {
    const ref = useRef(null)

    // the sheets stick as they reach the top; each one shrinks and dims as the next slides over it
    useGSAP(() => {
        if (!motion) return
        const mm = gsap.matchMedia()
        mm.add('(min-width: 960px) and (min-height: 720px)', () => {
            const sheets = gsap.utils.toArray('.sheet', ref.current)
            sheets.forEach((sheet, i) => {
                const next = sheets[i + 1]
                if (!next) return
                gsap.to(sheet, {
                    scale: 0.93,
                    '--dim': 0.6,
                    ease: 'none',
                    scrollTrigger: { trigger: next, start: 'top 95%', end: 'top 30%', scrub: true }
                })
            })
        })
    }, { scope: ref })

    return (
        <section className="section" id="apps" aria-labelledby="apps-title" ref={ref}>
            <div className="wrap">
                <SectionHead
                    id="apps-title"
                    label="Apps"
                    count={`${apps.length} built`}
                    title="Apps I designed, built and shipped end to end."
                    lede="Two Flutter and Rust apps that protect your files and your PC, and a React Native app for the Pushtimarg community."
                />

                <div className="sheets">
                    {apps.map((app, index) => (
                        <ProductSheet key={app.id} app={app} index={index}>
                            {visuals[app.id]}
                        </ProductSheet>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Apps
