import React, { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Button from './Button'
import Skill from './Skill'
import { SplitWords, Words } from './SplitText'
import { ArrowUpRight } from './icons'
import { CV_URL } from '../utils/profile'
import { motion } from '../utils/motion'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const statement = 'A full-stack developer from Rajkot, India. I started with HTML and CSS, grew into React, Node.js and Django, and now build Windows and Android apps with Flutter, Rust and React Native. Whatever I make should feel fast and keep your data private.';

const facts = [
    { label: 'Based in', value: 'Rajkot, Gujarat, India' },
    { label: 'Studying', value: 'MSc IT, Grace College, 2025–2027' },
    { label: 'Builds', value: 'Websites, web apps, Windows and Android apps' },
    { label: 'Status', value: 'Available for work' }
];

const About = () => {
    const ref = useRef(null)

    // the statement lights up word by word as it scrolls through the screen
    useGSAP(() => {
        if (!motion) return
        const text = ref.current.querySelector('.statement')
        gsap.fromTo(text.querySelectorAll('.sw'), { opacity: 0.16 }, {
            opacity: 1,
            ease: 'none',
            stagger: 0.12,
            scrollTrigger: { trigger: text, start: 'top 80%', end: 'bottom 48%', scrub: 0.6 }
        })
    }, { scope: ref })

    return (
        <section className="section" id="about" aria-labelledby="about-title" ref={ref}>
            <div className="wrap about-grid">
                <figure className="portrait" data-clip>
                    <img src="/images/avatar-1.webp" alt="Priyank Raychura sitting in the open door of a car at night" width="512" height="512" loading="lazy" />
                    <figcaption>
                        <span>Priyank Raychura</span>
                        <span>Rajkot, IN</span>
                    </figcaption>
                </figure>

                <div>
                    <div className="sec-label" data-reveal><span className="eyebrow">About</span></div>
                    <h2 className="about-title" id="about-title" data-split>
                        <SplitWords text="Hi, I'm Priyank." />
                    </h2>
                    <p className="statement"><Words text={statement} /></p>

                    <dl className="facts" data-reveal>
                        {facts.map(({ label, value }) => (
                            <div key={label}>
                                <dt>{label}</dt>
                                <dd>{value}</dd>
                            </div>
                        ))}
                    </dl>

                    <Skill />

                    <div className="about-cta" data-reveal>
                        <Button label="Download CV" href={CV_URL} iconAfter={<ArrowUpRight className="i-ne" />} magnetic />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
