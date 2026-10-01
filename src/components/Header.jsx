import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'
import { PuffLoader } from 'react-spinners'
import { CloseIcon, LogoMark, MenuIcon } from './icons'

const navItems = [
    { label: 'Products', id: 'products' },
    { label: 'Work', id: 'work' },
    { label: 'Stack', id: 'stack' },
    { label: 'Education', id: 'education' },
    { label: 'Awards', id: 'awards' },
];

export default function Header({ onLoginRegisterClick, userData, onLogout, isLoading }) {
    const [navOpen, setNavOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeId, setActiveId] = useState('');
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Highlight the home-page section in view
    useEffect(() => {
        setActiveId('');
        if (pathname !== '/') return undefined;
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); });
        }, { rootMargin: '-45% 0px -50% 0px' });
        document.querySelectorAll('main section[id]').forEach((section) => spy.observe(section));
        return () => spy.disconnect();
    }, [pathname]);

    useEffect(() => {
        if (!navOpen) return undefined;
        const onKey = (e) => { if (e.key === 'Escape') setNavOpen(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [navOpen]);

    const closeNav = () => setNavOpen(false);

    let account;
    if (isLoading) {
        account = (
            <div className="rd-header-login" style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                <PuffLoader color="white" size={32} aria-label="Loading account" />
            </div>
        );
    } else if (userData?.profileImg) {
        account = (
            <div className="rd-header-login" style={{ position: 'relative' }}>
                <button
                    type="button"
                    className="rd-avatar-btn"
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                    aria-expanded={isProfileMenuOpen}
                    aria-label="Account menu"
                >
                    <img src={userData.profileImg} alt="" referrerPolicy="no-referrer" />
                </button>
                {isProfileMenuOpen && (
                    <div className="rd-profile-menu">
                        <p>{userData.name}</p>
                        <p className="rd-profile-email">{userData.email}</p>
                        <button type="button" onClick={() => { setIsProfileMenuOpen(false); onLogout(); }}>Log out</button>
                    </div>
                )}
            </div>
        );
    } else {
        account = (
            <button type="button" className="rd-btn rd-btn-ghost rd-btn-sm rd-header-login" onClick={onLoginRegisterClick}>
                Log in
            </button>
        );
    }

    return (
        <header className={'rd-header' + (scrolled ? ' is-scrolled' : '') + (navOpen ? ' is-open' : '')}>
            <div className="rd-wrap rd-header-inner">
                <Link className="rd-brand" to="/" aria-label="Priyank Raychura, home">
                    <LogoMark />
                    <span>Priyank Raychura</span>
                </Link>

                <nav className="rd-nav" aria-label="Primary">
                    {navItems.map(({ label, id }) => (
                        <a key={id} href={`/#${id}`} className={activeId === id ? 'is-active' : ''}>{label}</a>
                    ))}
                </nav>

                <div className="rd-header-actions">
                    {account}
                    <a className="rd-btn rd-btn-primary rd-btn-sm rd-header-cta" href="/#contact">Start a project</a>
                    <button
                        type="button"
                        className="rd-menu-btn"
                        onClick={() => setNavOpen((prev) => !prev)}
                        aria-expanded={navOpen}
                        aria-controls="rd-mobile-nav"
                        aria-label={navOpen ? 'Close menu' : 'Open menu'}
                    >
                        {navOpen ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            {navOpen && (
                <nav className="rd-mobile-nav" id="rd-mobile-nav" aria-label="Mobile">
                    {navItems.map(({ label, id }) => (
                        <a key={id} href={`/#${id}`} onClick={closeNav}>{label}</a>
                    ))}
                    <a href="/#contact" onClick={closeNav}>Contact</a>
                    <hr />
                    {userData?.profileImg ? (
                        <button type="button" onClick={() => { closeNav(); onLogout(); }}>Log out ({userData.name})</button>
                    ) : (
                        <button type="button" onClick={() => { closeNav(); onLoginRegisterClick(); }}>Log in</button>
                    )}
                </nav>
            )}
        </header>
    )
}

Header.propTypes = {
    onLoginRegisterClick: PropTypes.func.isRequired,
    userData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    onLogout: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
}
