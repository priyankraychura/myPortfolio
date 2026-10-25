import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import useScrollTo from '../hooks/useScrollTo'
import { ArrowUp } from './icons'

// Floating button with a ring that fills as you scroll
const BackToTop = () => {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)
    const scrollTo = useScrollTo()

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY
            const max = document.documentElement.scrollHeight - window.innerHeight
            ref.current?.style.setProperty('--sp', max > 0 ? Math.min(1, y / max).toFixed(4) : '0')
            setVisible(y > 640)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <button
            ref={ref}
            type="button"
            className={clsx('to-top', visible && 'is-on')}
            aria-label="Back to top"
            tabIndex={visible ? 0 : -1}
            onClick={() => scrollTo('top')}
        >
            <svg className="to-top-ring" viewBox="0 0 52 52" aria-hidden="true">
                <circle className="track" cx="26" cy="26" r="24" />
                <circle className="bar" cx="26" cy="26" r="24" />
            </svg>
            <ArrowUp className="arr" />
        </button>
    )
}

export default BackToTop
