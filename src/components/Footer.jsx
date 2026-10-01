import React from 'react'
import { LogoMark } from './icons'

const sitemap = [
    { label: 'Products', href: '/#products' },
    { label: 'Work', href: '/#work' },
    { label: 'Stack', href: '/#stack' },
    { label: 'Education', href: '/#education' },
    { label: 'Awards', href: '/#awards' },
    { label: 'Contact', href: '/#contact' },
];

const Footer = () => {
    return (
        <footer className="rd-footer">
            <div className="rd-wrap rd-footer-inner">
                <a className="rd-brand" href="/#home" aria-label="Priyank Raychura, back to top">
                    <LogoMark />
                    <span>Priyank Raychura</span>
                </a>
                <nav className="rd-footer-nav" aria-label="Footer">
                    {sitemap.map(({ label, href }) => <a key={label} href={href}>{label}</a>)}
                </nav>
                <p className="rd-footer-note">&copy; {new Date().getFullYear()} Priyank Raychura</p>
            </div>
        </footer>
    )
}

export default Footer
