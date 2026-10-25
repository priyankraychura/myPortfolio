import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { motion, onReady, sinceReady } from '../utils/motion'

// Counts from 0 to value during the hero intro; shows the final value straight away without motion
const CountUp = ({ value, delay = 0 }) => {
    const ref = useRef(null)

    useEffect(() => {
        if (!motion) return
        const node = ref.current.firstChild
        const duration = 1500
        let frame = 0

        const run = () => {
            const start = performance.now() + sinceReady(900 + delay)
            node.nodeValue = '0'
            const tick = (now) => {
                const progress = Math.min(1, Math.max(0, (now - start) / duration))
                node.nodeValue = String(Math.round(value * (1 - Math.pow(1 - progress, 4))))
                if (progress < 1) frame = requestAnimationFrame(tick)
            }
            frame = requestAnimationFrame(tick)
        }

        const cancelWait = onReady(run)
        return () => {
            cancelWait()
            cancelAnimationFrame(frame)
            node.nodeValue = String(value)
        }
    }, [value, delay])

    return <span ref={ref}>{value}</span>
}

CountUp.propTypes = {
    value: PropTypes.number.isRequired,
    delay: PropTypes.number
}

export default CountUp
