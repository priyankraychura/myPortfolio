import React from 'react'
import useTheme from '../hooks/useTheme'
import { Moon, Sun } from './icons'

export default function ThemeToggle() {
    const { theme, toggle } = useTheme()

    const handleClick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        toggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
    }

    return (
        <button
            type="button"
            className="icon-btn theme-btn"
            data-mode={theme}
            onClick={handleClick}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
            <Moon className="i-moon" />
            <Sun className="i-sun" />
        </button>
    )
}
