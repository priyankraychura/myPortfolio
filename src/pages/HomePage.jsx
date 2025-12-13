import React, { useEffect, useState } from 'react'
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

const HomePage = () => {
    return (
        <main>
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
