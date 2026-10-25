import React, { Fragment, useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import HashLink from './HashLink'
import LocalTime from './LocalTime'
import { ArrowUp } from './icons'
import { motion } from '../utils/motion'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const wordmark = ['Priyank', 'Raychura'];

const pages = [
    { label: 'All projects', to: '/all-projects' },
    { label: 'Cloak for Windows', to: '/apps/cloak' }
];

const policies = [
    { label: 'Pushtimarg', to: '/privacy-policy/pushtimarg' },
    { label: 'Cloak', to: '/privacy-policy/cloak' },
    { label: 'AirKey', to: '/privacy-policy/airkey' }
];

const Footer = () => {
    const footerRef = useRef(null)
    const boxRef = useRef(null)
    const markRef = useRef(null)
    const innerRef = useRef(null)

    // fit the wordmark to the full width; two lines on narrow screens
    useLayoutEffect(() => {
        const fit = () => {
            const box = boxRef.current
            const mark = markRef.current
            if (!box || !mark) return
            const available = box.clientWidth
            const twoLines = available < 640
            mark.classList.toggle('wm-two', twoLines)
            mark.style.fontSize = '100px'
            const widest = twoLines
                ? Math.max(...Array.from(mark.querySelectorAll('.wm-line'), (line) => line.offsetWidth))
                : innerRef.current.offsetWidth
            if (widest > 0) mark.style.fontSize = `${Math.floor((100 * available) / widest * 0.99)}px`
        }
        fit()
        window.addEventListener('resize', fit)
        document.fonts?.ready.then(fit)
        return () => window.removeEventListener('resize', fit)
    }, [])

    // letters rise as the footer comes into view
    useGSAP(() => {
        if (!motion) return
        const letters = markRef.current.querySelectorAll('.ch')
        gsap.set(letters, { yPercent: 115 })
        ScrollTrigger.create({
            trigger: markRef.current,
            start: 'top 95%',
            once: true,
            onEnter: () => gsap.to(letters, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.035 })
        })
    }, { scope: footerRef })

    return (
        <footer className="footer" ref={footerRef}>
            <div className="wrap">
                <div className="foot-top">
                    <p className="foot-note">
                        <span className="dot-live" aria-hidden="true"></span>
                        <span>
                            Available for work · Rajkot, India
                            <LocalTime separator=" · " />
                        </span>
                    </p>
                    <HashLink to="top" className="link">Back to top <ArrowUp /></HashLink>
                </div>

                <div className="wm-box" ref={boxRef}>
                    <p className="wordmark" ref={markRef} aria-hidden="true">
                        <span className="wm-in" ref={innerRef}>
                            {wordmark.map((word, key) => (
                                <Fragment key={word}>
                                    {key > 0 && ' '}
                                    <span className="wm-line">
                                        {Array.from(word, (letter, index) => <span className="ch" key={index}>{letter}</span>)}
                                    </span>
                                </Fragment>
                            ))}
                        </span>
                    </p>
                </div>

                <div className="foot-bottom">
                    <span>&copy; {new Date().getFullYear()} Priyank Raychura</span>
                    <nav className="foot-links" aria-label="More pages">
                        {pages.map(({ label, to }) => (
                            <Link key={to} to={to}>{label}</Link>
                        ))}
                        <span>
                            Privacy:{' '}
                            {policies.map(({ label, to }, key) => (
                                <Fragment key={to}>
                                    {key > 0 && ' · '}
                                    <Link to={to}>{label}</Link>
                                </Fragment>
                            ))}
                        </span>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer
