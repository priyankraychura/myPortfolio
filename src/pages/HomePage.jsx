import React, { useEffect, useRef } from 'react'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Apps from '../components/Apps'
import Work from '../components/Work'
import About from '../components/About'
import HonorsAndAwards from '../components/HonorsAndAwards'
import Contact from '../components/Contact'
import useReveal from '../hooks/useReveal'
import useSectionAmbient from '../hooks/useSectionAmbient'
import useHashScroll from '../hooks/useHashScroll'

const HomePage = () => {
    const container = useRef(null);

    useReveal(container);
    useSectionAmbient(container);
    useHashScroll();

    useEffect(() => {
        document.title = 'Priyank Raychura | Full-stack developer'
    }, [])

    return (
        <main id="main" ref={container}>
            <Hero />
            <Marquee />
            <Apps />
            <Work />
            <About />
            <HonorsAndAwards />
            <Contact />
        </main>
    )
}

export default HomePage
