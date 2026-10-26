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

    // fonts, images and route changes all move things after the first layout, so
    // re-measure the scroll animations whenever the page settles at a new height
    // (the footer persists across pages and would otherwise keep the old page's positions)
    useEffect(() => {
        const refresh = () => ScrollTrigger.refresh()
        document.fonts?.ready.then(refresh)
        window.addEventListener('load', refresh)

        let height = document.body.offsetHeight
        let timer = 0
        const observer = new ResizeObserver(() => {
            const next = document.body.offsetHeight
            if (Math.abs(next - height) < 2) return
            height = next
            clearTimeout(timer)
            timer = setTimeout(refresh, 150)
        })
        observer.observe(document.body)

        return () => {
            window.removeEventListener('load', refresh)
            observer.disconnect()
            clearTimeout(timer)
        }
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
