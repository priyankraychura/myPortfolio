import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import clsx from 'clsx'
import LogoMark from './LogoMark'
import HashLink from './HashLink'
import Button from './Button'
import ThemeToggle from './ThemeToggle'
import useHashNav from '../hooks/useHashNav'
import { EMAIL, socials } from '../utils/profile'

const navItems = [
    { label: 'Apps', id: 'apps' },
    { label: 'Work', id: 'work' },
    { label: 'About', id: 'about' },
    { label: 'Awards', id: 'recognition' },
    { label: 'Contact', id: 'contact' }
];

export default function Header() {
    const { pathname } = useLocation()
    const lenis = useLenis()
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const [activeId, setActiveId] = useState(null)
    const activeRef = useRef(null)
    const pillRef = useRef(null)
    const linkRefs = useRef({})
    const menuBtnRef = useRef(null)

    const closeMenu = useCallback(() => setMenuOpen(false), [])
    const go = useHashNav(closeMenu)

    // glass once the page moves; hide while scrolling down, come back on the way up
    useEffect(() => {
        let lastY = window.scrollY
        let travel = 0
        const handleScroll = () => {
            const y = window.scrollY
            const delta = y - lastY
            lastY = y
            travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta
            setScrolled(y > 10)
            if (y < 160 || travel < -24) setHidden(false)
            else if (travel > 40) setHidden(true)
        }
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // highlight the section in the middle of the screen
    useEffect(() => {
        setActiveId(null)
        const sections = document.querySelectorAll('main section[id]')
        if (!sections.length) return
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActiveId(entry.target.id)
            })
        }, { rootMargin: '-45% 0px -50% 0px' })
        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
    }, [pathname])

    // the pill behind the links follows the hovered link, then settles on the active one
    const movePill = useCallback((id) => {
        const pill = pillRef.current
        const link = id && linkRefs.current[id]
        if (!pill) return
        if (!link) {
            pill.style.setProperty('--po', '0')
            return
        }
        pill.style.setProperty('--px', `${link.offsetLeft}px`)
        pill.style.setProperty('--pw', `${link.offsetWidth}px`)
        pill.style.setProperty('--po', '1')
    }, [])

    useEffect(() => {
        activeRef.current = activeId
        movePill(activeId)
    }, [activeId, movePill])

    useEffect(() => {
        const reset = () => movePill(activeRef.current)
        window.addEventListener('resize', reset)
        document.fonts?.ready.then(reset)
        return () => window.removeEventListener('resize', reset)
    }, [movePill])

    // mobile menu: freeze the page behind it, close on Escape, on navigation and on wide screens
    useEffect(() => {
        document.documentElement.classList.toggle('menu-open', menuOpen)
        if (menuOpen) lenis?.stop()
        else lenis?.start()
    }, [menuOpen, lenis])

    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    useEffect(() => {
        if (!menuOpen) return
        const handleKey = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false)
                menuBtnRef.current?.focus()
            }
        }
        const wide = window.matchMedia('(min-width: 900px)')
        const handleWide = (event) => {
            if (event.matches) setMenuOpen(false)
        }
        window.addEventListener('keydown', handleKey)
        wide.addEventListener('change', handleWide)
        return () => {
            window.removeEventListener('keydown', handleKey)
            wide.removeEventListener('change', handleWide)
        }
    }, [menuOpen])

    return (
        <>
            <header
                id="nav"
                className={clsx('nav', scrolled && 'is-scrolled', hidden && !menuOpen && 'is-hidden')}
                onFocus={() => setHidden(false)}
            >
                <div className="wrap nav-in">
                    <HashLink to="top" className="brand" aria-label="Priyank Raychura, home" onNavigate={closeMenu}>
                        <LogoMark />
                        <span className="brand-name">Priyank Raychura</span>
                    </HashLink>

                    <nav className="nav-links" aria-label="Sections" onPointerLeave={() => movePill(activeRef.current)}>
                        <span className="nav-pill" ref={pillRef} aria-hidden="true"></span>
                        {navItems.map(({ label, id }) => (
                            <a
                                key={id}
                                href={`/#${id}`}
                                ref={(el) => { linkRefs.current[id] = el }}
                                className={clsx(activeId === id && 'is-active')}
                                aria-current={activeId === id ? 'true' : undefined}
                                onClick={go(id)}
                                onPointerEnter={() => movePill(id)}
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    <div className="nav-actions">
                        <ThemeToggle />
                        <Button label="Let's talk" hash="contact" variant="fill" size="sm" className="btn-talk" magnetic />
                        <button
                            ref={menuBtnRef}
                            type="button"
                            className="icon-btn menu-btn"
                            aria-expanded={menuOpen}
                            aria-controls="menu"
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            onClick={() => setMenuOpen((open) => !open)}
                        >
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </header>

            <div className={clsx('menu', menuOpen && 'is-open')} id="menu" inert={!menuOpen} aria-hidden={!menuOpen}>
                <ul className="menu-links">
                    {navItems.map(({ label, id }, key) => (
                        <li key={id}>
                            <a href={`/#${id}`} style={{ '--i': key }} onClick={go(id)}>
                                <span>{label}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className="menu-foot">
                    <span className="eyebrow">Say hello</span>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    <div className="menu-socials">
                        {socials.slice(0, 4).map(({ label, href }) => (
                            <a key={label} href={href} target="_blank" rel="noreferrer">{label}</a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
