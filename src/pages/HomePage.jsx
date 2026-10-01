import React, { useRef } from 'react'
import SceneBackground from '../components/SceneBackground'
import Hero from '../components/Hero'
import TechMarquee from '../components/TechMarquee'
import Products from '../components/Products'
import Work from '../components/Work'
import Skill from '../components/Skill'
import Education from '../components/Education'
import HonorsAndAwards from '../components/HonorsAndAwards'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import useReveal from '../hooks/useReveal'

const HomePage = () => {
    const pageRef = useRef(null);
    useReveal(pageRef);

    return (
        <div className="rd-page" ref={pageRef}>
            <SceneBackground />
            <main>
                <Hero />
                <TechMarquee />
                <Products />
                <Work />
                <Skill />
                <Education />
                <HonorsAndAwards />
                <Contact />
            </main>
            <Footer />
        </div>
    )
}

export default HomePage
