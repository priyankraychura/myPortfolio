import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import useTilt from '../hooks/useTilt'
import { ArrowUpRight, DownloadIcon } from './icons'

const CLOAK_REPO = 'https://github.com/priyankraychura/desktop_folder_locker';

const products = [
    {
        id: 'cloak',
        flagship: true,
        name: 'Cloak',
        tagline: 'Lock and encrypt folders on Windows',
        pill: 'Open source',
        icon: '/appIcons/folder-locker.png',
        glow: 'rgba(124, 92, 255, 0.26)',
        desc: <>Turns a folder or file into a single encrypted <code>.flk</code> vault, and opens it as a drive when you need it. No account, no cloud, no telemetry.</>,
        specs: [
            ['Encryption', 'XChaCha20-Poly1305'],
            ['Key derivation', 'Argon2id via libsodium'],
            ['Open as drive', <>Mounts as <code>V:</code>, decrypted in memory only</>],
            ['Built with', 'Flutter + Rust · Windows 10 / 11'],
        ],
        screenshot: { src: '/apps/folder-locker/11_items_dark.png', alt: "Cloak's protected items screen in dark mode, listing locked, unlocked and hidden folders" },
        primary: { label: 'Download for Windows', href: `${CLOAK_REPO}/releases/latest`, icon: true },
        links: [
            { label: 'Source on GitHub', href: CLOAK_REPO },
            { label: 'Product page', to: '/apps/cloak' },
        ],
    },
    {
        id: 'airkey',
        name: 'AirKey',
        tagline: 'Unlock your Windows PC with your fingerprint',
        pill: 'Windows + Android',
        icon: '/appIcons/airkey.png',
        glow: 'rgba(59, 130, 246, 0.24)',
        desc: 'Approve sign-ins on your PC from your phone. Your fingerprint stays on the phone and your Windows password stays on the PC.',
        specs: [
            ['Biometrics', 'Android Keystore, never leaves the phone'],
            ['Password', 'Encrypted on the PC with Windows DPAPI'],
            ['Connection', 'Wi-Fi, or an end-to-end encrypted relay'],
            ['Tracking', 'No ads, analytics or crash reports'],
            ['Built with', 'Flutter + Rust'],
        ],
        links: [{ label: 'Privacy policy', to: '/privacy-policy/airkey' }],
    },
    {
        id: 'pushtimarg',
        name: 'Pushtimarg',
        tagline: 'Aarti lyrics, Varta and Tithi in one app',
        pill: 'Google Play',
        icon: '/appIcons/pushtimarg.png',
        glow: 'rgba(234, 179, 8, 0.2)',
        desc: 'A content app for the Pushtimarg community that always shows the latest Aarti lyrics, Varta and Tithi, with no sign-up.',
        specs: [
            ['Account', 'None needed'],
            ['Content', 'Fetched fresh from the server'],
            ['On device', 'Bookmarks and font settings'],
            ['Built with', 'React Native'],
            ['Platform', 'Android'],
        ],
        primary: { label: 'Get it on Google Play', href: 'https://play.google.com/store/apps/details?id=com.priyank.pushtimarg' },
        links: [{ label: 'Privacy policy', to: '/privacy-policy/pushtimarg' }],
    },
];

function ProductLink({ label, href, to }) {
    if (to) return <Link className="rd-link" to={to}>{label} <ArrowUpRight /></Link>;
    return <a className="rd-link" href={href} target="_blank" rel="noreferrer">{label} <ArrowUpRight /></a>;
}

ProductLink.propTypes = { label: PropTypes.string.isRequired, href: PropTypes.string, to: PropTypes.string };

function ProductCard({ product }) {
    const tiltRef = useTilt(product.flagship ? 4 : 6);
    const { name, tagline, pill, icon, glow, desc, specs, screenshot, primary, links, flagship } = product;

    const main = (
        <>
            <div className="rd-product-top rd-z1">
                <img className="rd-app-icon rd-pop" src={icon} alt="" width="52" height="52" />
                <div className="rd-product-name">
                    <h3>{name}</h3>
                    <p className="rd-product-tag">{tagline}</p>
                </div>
                <span className="rd-pill">{pill}</span>
            </div>
            <p className="rd-product-desc">{desc}</p>
            <dl className="rd-specs">
                {specs.map(([term, value]) => (
                    <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
                ))}
            </dl>
            <div className="rd-product-links rd-z1">
                {primary && (
                    <a className="rd-btn rd-btn-primary rd-btn-sm" href={primary.href} target="_blank" rel="noreferrer">
                        {primary.label} {primary.icon && <DownloadIcon />}
                    </a>
                )}
                {links.map((link) => <ProductLink key={link.label} {...link} />)}
            </div>
        </>
    );

    return (
        <article
            ref={tiltRef}
            className={'rd-product rd-tilt' + (flagship ? ' rd-product--flagship' : '')}
            style={{ '--glow': glow }}
        >
            {flagship ? <div className="rd-product-main">{main}</div> : main}
            {screenshot && (
                <figure className="rd-product-shot rd-z3">
                    <img src={screenshot.src} alt={screenshot.alt} width="1280" height="800" loading="lazy" />
                </figure>
            )}
            <span className="rd-glare" aria-hidden="true"></span>
        </article>
    );
}

ProductCard.propTypes = { product: PropTypes.object.isRequired };

export default function Products() {
    return (
        <section id="products" className="rd-section" aria-labelledby="products-title">
            <div className="rd-wrap">
                <header className="rd-head rd-reveal">
                    <p className="rd-eyebrow">Products</p>
                    <h2 id="products-title">Apps I&apos;ve designed and built end to end.</h2>
                    <p className="rd-lede">Three apps for Windows and Android, from folder encryption to fingerprint unlock to a companion for the Pushtimarg community.</p>
                </header>
                <div className="rd-products rd-reveal">
                    {products.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
            </div>
        </section>
    )
}
