import React, { useEffect, useRef } from 'react'
import Button from './Button'
import Cipher from './Cipher'
import CountUp from './CountUp'
import HashLink from './HashLink'
import LocalTime from './LocalTime'
import { ArrowDown, ArrowRight, ArrowUpRight } from './icons'
import { apps, works } from '../utils/works'
import { CV_URL } from '../utils/profile'
import { finePointer, motion } from '../utils/motion'

// headline words, each with its own delay in the intro (ms)
const lineOne = ['Websites', 'that', 'feel', 'fast.'];
const lineTwo = ['Apps', 'that', 'keep'];

const stats = [
    { label: 'Web projects', value: works.length },
    { label: 'Apps built', value: apps.length },
    { label: 'Awards in 2025', value: 4 },
    { label: 'Years of coding', value: 4, plus: true }
];

export default function Hero() {
    const heroRef = useRef(null)
    const gridRef = useRef(null)

    // brighter dots follow the cursor across the grid
    useEffect(() => {
        if (!motion || !finePointer) return
        const hero = heroRef.current
        const grid = gridRef.current
        let frame = 0
        let x = 0
        let y = 0
        const handleMove = (event) => {
            const rect = hero.getBoundingClientRect()
            x = event.clientX - rect.left
            y = event.clientY - rect.top
            if (!frame) {
                frame = requestAnimationFrame(() => {
                    grid.style.setProperty('--mx', `${x}px`)
                    grid.style.setProperty('--my', `${y}px`)
                    frame = 0
                })
            }
        }
        const handleLeave = () => {
            grid.style.setProperty('--mx', '-999px')
            grid.style.setProperty('--my', '-999px')
        }
        hero.addEventListener('pointermove', handleMove)
        hero.addEventListener('pointerleave', handleLeave)
        return () => {
            cancelAnimationFrame(frame)
            hero.removeEventListener('pointermove', handleMove)
            hero.removeEventListener('pointerleave', handleLeave)
        }
    }, [])

    return (
        <section className="hero" id="top" aria-label="Introduction" ref={heroRef}>
            <div className="hero-bg" ref={gridRef} aria-hidden="true"></div>

            <div className="wrap">
                <div className="hero-top">
                    <p className="status" data-intro style={{ '--d': 60 }}>
                        <img src="/images/avatar-1-sm.webp" alt="" width="30" height="30" />
                        <span className="dot-live" aria-hidden="true"></span>
                        <b>Available for work</b>
                        <span className="sep where" aria-hidden="true">·</span>
                        <span className="where">Rajkot, India</span>
                        <LocalTime separator={<span className="sep" aria-hidden="true">·</span>} />
                    </p>

                    <HashLink to="airkey" className="latest" data-intro style={{ '--d': 140 }}>
                        <span className="badge now">Latest</span>
                        AirKey for Windows and Android
                        <ArrowRight />
                    </HashLink>
                </div>

                <h1 className="hero-title">
                    <span className="sr-only">Websites that feel fast. Apps that keep secrets.</span>
                    <span aria-hidden="true">
                        <span className="ht-line">
                            {lineOne.map((word, key) => (
                                <React.Fragment key={word}>
                                    <span className="w"><span style={{ '--d': 140 + key * 50 }}>{word}</span></span>{' '}
                                </React.Fragment>
                            ))}
                        </span>
                        <span className="ht-line">
                            {lineTwo.map((word, key) => (
                                <React.Fragment key={word}>
                                    <span className="w"><span style={{ '--d': 380 + key * 50 }}>{word}</span></span>{' '}
                                </React.Fragment>
                            ))}
                            <span className="w"><span style={{ '--d': 530 }}><Cipher text="secrets" />.</span></span>
                        </span>
                    </span>
                </h1>

                <div className="hero-foot">
                    <div>
                        <p className="lede" data-intro style={{ '--d': 620 }}>
                            I&apos;m <strong>Priyank Raychura</strong>, a full-stack developer from Rajkot, India. I build websites with React and Node.js, and private, secure apps for Windows and Android with Flutter, Rust and React Native.
                        </p>
                        <div className="cta-row" data-intro style={{ '--d': 720 }}>
                            <Button label="See my work" hash="apps" variant="fill" iconAfter={<ArrowDown className="i-down" />} magnetic />
                            <Button label="Download CV" href={CV_URL} iconAfter={<ArrowUpRight className="i-ne" />} magnetic />
                        </div>
                    </div>

                    <dl className="stats" data-intro style={{ '--d': 820 }}>
                        {stats.map(({ label, value, plus }, key) => (
                            <div className="stat" key={label}>
                                <dt>{label}</dt>
                                <dd>
                                    <CountUp value={value} delay={key * 90} />
                                    {plus && <span className="plus">+</span>}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}
