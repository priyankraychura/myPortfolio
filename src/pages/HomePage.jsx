import React from 'react'
import Hero from '../components/Hero'
import Products from '../components/Products'
import Work from '../components/Work'
import Skill from '../components/Skill'
import Education from '../components/Education'
import HonorsAndAwards from '../components/HonorsAndAwards'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

const HomePage = () => {
    return (
        <div className="rd-page">
            <main>
                <Hero />
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
