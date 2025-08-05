import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Skill from '../components/Skill'
import Work from '../components/Work'
import Review from '../components/Review'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const HomePage = () => {
    return (
        <main>
            <Hero />
            <About />
            <Skill />
            <Work />
            <Review />
            <Contact />
            <Footer />
        </main>
    )
}

export default HomePage
