import React, { useRef } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Skill from '../components/Skill'
import Work from '../components/Work'
import Review from '../components/Review'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Education from '../components/Education'
import HonorsAndAwards from '../components/HonorsAndAwards'
import Apps from '../components/Apps'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HomePage = () => {
    const container = useRef(null);

    useGSAP(() => {
        const elements = gsap.utils.toArray('.reveal-up', container.current);

        elements.forEach(element => {
            gsap.fromTo(element,
                {
                    y: 80,
                    opacity: 0,
                },
                {
                    scrollTrigger: {
                        trigger: element,
                        start: '-200 bottom',
                        end: 'bottom 80%',
                        scrub: true,
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power2.out'
                }
            );
        });

        // Refresh ScrollTrigger after a short delay to ensure
        // Lenis and scroll positions are properly settled
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => clearTimeout(refreshTimer);
    }, { scope: container });

    return (
        <main ref={container}>
            <Hero />
            <About />
            <Skill />
            <Work />
            <Apps />
            <Education />
            <HonorsAndAwards />
            <Review />
            <Contact />
            <Footer />
        </main>
    )
}

export default HomePage
