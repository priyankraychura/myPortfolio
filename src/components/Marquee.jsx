import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import LogoMark from './LogoMark'
import { motion } from '../utils/motion'

const items = ['React', 'Flutter', 'Rust', 'Node.js', 'React Native', 'Django', 'MongoDB', 'Tailwind CSS', 'JavaScript', 'Dart', 'Figma'];

// Endless strip of the stack. Drifts on its own, speeds up with the scroll and follows its direction.
export default function Marquee() {
    const ref = useRef(null)
    const trackRef = useRef(null)
    const lenis = useLenis()
    const lenisRef = useRef(lenis)
    const [copies, setCopies] = useState(2)

    useEffect(() => {
        lenisRef.current = lenis
    }, [lenis])

    // enough copies of the list to cover wide screens while one copy scrolls away
    useLayoutEffect(() => {
        const fill = () => {
            const group = trackRef.current?.firstElementChild
            if (!group || !group.offsetWidth) return
            const needed = Math.max(2, Math.ceil((window.innerWidth * 2.2) / group.offsetWidth))
            setCopies((current) => Math.max(current, needed))
        }
        fill()
        window.addEventListener('resize', fill)
        document.fonts?.ready.then(fill)
        return () => window.removeEventListener('resize', fill)
    }, [])

    useEffect(() => {
        if (!motion) return
        const track = trackRef.current
        let x = 0
        let last = 0
        let direction = 1
        let velocity = 0
        let previousY = window.scrollY
        let running = false
        let frame = 0

        const step = (now) => {
            if (!running) return
            const dt = last ? Math.min(50, now - last) : 16
            last = now
            const scrollVelocity = lenisRef.current ? lenisRef.current.velocity : window.scrollY - previousY
            previousY = window.scrollY
            velocity += (scrollVelocity - velocity) * 0.1
            if (Math.abs(velocity) > 0.3) direction = velocity > 0 ? 1 : -1

            const speed = 0.045 + Math.min(Math.abs(velocity) * 0.012, 0.5)
            const width = track.firstElementChild.offsetWidth
            x -= speed * dt * direction
            if (x <= -width) x += width
            else if (x > 0) x -= width
            track.style.transform = `translate3d(${x}px, 0, 0)`
            frame = requestAnimationFrame(step)
        }

        // only animate while the strip is on screen
        const observer = new IntersectionObserver(([entry]) => {
            const wasRunning = running
            running = entry.isIntersecting
            if (running && !wasRunning) {
                last = 0
                frame = requestAnimationFrame(step)
            }
        })
        observer.observe(ref.current)
        return () => {
            observer.disconnect()
            cancelAnimationFrame(frame)
        }
    }, [])

    return (
        <div className="marquee" ref={ref} aria-hidden="true">
            <div className="marquee-track" ref={trackRef}>
                {Array.from({ length: copies }, (_, copy) => (
                    <div className="mq-group" key={copy}>
                        {items.map((item) => (
                            <span className="mq-item" key={item}>
                                {item}
                                <LogoMark className="mq-mark" gradient={false} />
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}
