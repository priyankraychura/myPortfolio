import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { ReactLenis, useLenis } from 'lenis/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

// keeps ScrollTrigger in step with Lenis' smoothed scroll position
function ScrollTriggerSync() {
    useLenis(ScrollTrigger.update)
    return null
}

// Lenis smooth scrolling driven by GSAP's ticker. Left off for reduced motion.
const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null)

    useEffect(() => {
        if (!motion) return
        const update = (time) => lenisRef.current?.lenis?.raf(time * 1000)
        gsap.ticker.add(update)
        gsap.ticker.lagSmoothing(0)
        return () => gsap.ticker.remove(update)
    }, [])

    // fonts and images change the page height after the first layout
    useEffect(() => {
        const refresh = () => ScrollTrigger.refresh()
        document.fonts?.ready.then(refresh)
        window.addEventListener('load', refresh)
        return () => window.removeEventListener('load', refresh)
    }, [])

    if (!motion) return children

    return (
        <ReactLenis root ref={lenisRef} options={{ autoRaf: false, lerp: 0.095 }}>
            <ScrollTriggerSync />
            {children}
        </ReactLenis>
    )
}

SmoothScroll.propTypes = { children: PropTypes.node }

export default SmoothScroll
