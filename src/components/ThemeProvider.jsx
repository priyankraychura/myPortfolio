import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import PropTypes from 'prop-types'
import { ThemeContext } from '../hooks/useTheme'
import { motion } from '../utils/motion'

const root = document.documentElement
const prefersLight = window.matchMedia('(prefers-color-scheme: light)')

// data-theme is set when the visitor picked a theme (index.html restores it); otherwise follow the system
const readTheme = () => root.getAttribute('data-theme') || (prefersLight.matches ? 'light' : 'dark')

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(readTheme)

    useEffect(() => {
        const sync = () => setTheme(readTheme())
        prefersLight.addEventListener('change', sync)
        return () => prefersLight.removeEventListener('change', sync)
    }, [])

    // origin: the point the new theme grows from, usually the toggle button's center
    const toggle = useCallback((origin) => {
        const next = readTheme() === 'dark' ? 'light' : 'dark'
        const apply = () => {
            root.setAttribute('data-theme', next)
            try {
                localStorage.setItem('pr-theme', next)
            } catch {
                // storage can be blocked; the choice then lasts for this visit only
            }
            flushSync(() => setTheme(next))
        }

        if (!motion || !document.startViewTransition || !origin) {
            apply()
            return
        }

        const { x, y } = origin
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
        const transition = document.startViewTransition(apply)
        transition.ready.then(() => {
            root.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 760, easing: 'cubic-bezier(0.65, 0, 0.35, 1)', pseudoElement: '::view-transition-new(root)' }
            )
        }).catch(() => {})
    }, [])

    const value = useMemo(() => ({ theme, toggle }), [theme, toggle])

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

ThemeProvider.propTypes = { children: PropTypes.node }

export default ThemeProvider
