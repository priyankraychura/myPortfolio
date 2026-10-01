import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SceneBackground from '../components/SceneBackground'
import Footer from '../components/Footer'
import useReveal from '../hooks/useReveal'
import useTilt from '../hooks/useTilt'
import { ArrowUpRight, CloseIcon, DownloadIcon, GitHubIcon } from '../components/icons'

const REPO_URL = 'https://github.com/priyankraychura/desktop_folder_locker'
const RELEASES_URL = `${REPO_URL}/releases/latest`
const CI_BUILDS_URL = `${REPO_URL}/actions/workflows/ci.yml?query=is%3Asuccess`

const features = [
  {
    icon: 'lock',
    title: 'Real encryption',
    text: 'Turns a folder or file into a single .flk vault using XChaCha20-Poly1305 and Argon2id from libsodium.',
  },
  {
    icon: 'hard_drive',
    title: 'Open as a drive',
    text: 'An encrypted folder can open as a drive such as V:. Files are decrypted in memory only, never written to disk.',
  },
  {
    icon: 'block',
    title: 'Block, read-only or hide',
    text: 'Instantly block access or make items read-only, even for huge folders, and hide them from Explorer.',
  },
  {
    icon: 'key',
    title: 'Passwords & recovery key',
    text: 'One master password for everything or a password per item, plus a recovery key shown once at setup.',
  },
  {
    icon: 'folder_open',
    title: 'Explorer integration',
    text: 'Vaults get a lock icon, double-click asks for the password, and the right-click menu locks or unlocks items.',
  },
  {
    icon: 'shield',
    title: 'Crash-safe & private',
    text: 'Every vault is verified before originals are deleted. No account, no cloud and no telemetry.',
  },
]

const screenshots = [
  { src: '/apps/folder-locker/05_items.png', label: 'Protected items' },
  { src: '/apps/folder-locker/06_protect_dialog.png', label: 'Protect dialog' },
  { src: '/apps/folder-locker/07_protect_dialog_drive.png', label: 'Open as a drive' },
  { src: '/apps/folder-locker/08_unlock_dialog.png', label: 'Unlock dialog' },
  { src: '/apps/folder-locker/09_settings.png', label: 'Settings' },
  { src: '/apps/folder-locker/11_items_dark.png', label: 'Dark mode' },
]

const steps = [
  'Click "Download for Windows" and download the setup .exe from the release.',
  'Run the installer. Install for all users, or choose "Install for me only" to skip the admin prompt.',
  'Windows SmartScreen may warn because the installer is not code-signed yet. Click "More info" → "Run anyway".',
  'On first start, create a master password and save your recovery key somewhere safe.',
]

// Feature icons, drawn inline so they never depend on an icon font loading
const featureIcons = {
  lock: <path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1zM12 15v2" />,
  hard_drive: <path d="M4 13l2.2-7.3A1 1 0 0 1 7.2 5h9.6a1 1 0 0 1 1 .7L20 13M4 13h16v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-5zM16 16h.01M13 16h.01" />,
  block: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM5.6 5.6l12.8 12.8" />,
  key: <path d="M14.5 9.5a4 4 0 1 0-1.3 2.9L20 19.2M17 16.2l2-2M15 14.2l1.5-1.5" />,
  folder_open: <path d="M3 7a1 1 0 0 1 1-1h5l2 2h8a1 1 0 0 1 1 1v2M3 7v11a1 1 0 0 0 1 1h13.5a1 1 0 0 0 1-.8L20.8 12a1 1 0 0 0-1-1.2H7.4a1 1 0 0 0-1 .7L3 19" />,
  shield: <path d="M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6l7-3zM9 12l2 2 4-4" />,
}

function Shot({ src, label, onOpen }) {
  const tiltRef = useTilt(8);
  return (
    <button ref={tiltRef} type="button" onClick={onOpen} className="rd-shot rd-tilt rd-glassy">
      <figure className="rd-shot-media rd-z2">
        <img src={src} alt={label} loading="lazy" width="1280" height="800" />
      </figure>
      <span className="rd-shot-label rd-z1">{label}</span>
      <span className="rd-glare" aria-hidden="true"></span>
    </button>
  )
}

const ExternalLink = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer" className="rd-inline-link">{children}</a>
)

const FolderLocker = () => {
  const pageRef = useRef(null)
  const [preview, setPreview] = useState(null)
  useReveal(pageRef)

  useEffect(() => {
    document.title = 'Cloak - Lock & Encrypt Folders | Priyank Raychura'
    return () => { document.title = 'Priyank Raychura - Portfolio' }
  }, [])

  useEffect(() => {
    if (!preview) return undefined
    const onKey = (e) => { if (e.key === 'Escape') setPreview(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [preview])

  return (
    <div className="rd-page" ref={pageRef}>
      <SceneBackground />
      <main>
        {/* Hero */}
        <section className="rd-section rd-section--page rd-app-hero" style={{ '--glow': 'rgba(124, 92, 255, 0.35)' }}>
          <div className="rd-wrap rd-app-hero-inner">
            <div className="rd-app-hero-copy rd-reveal">
              <p className="rd-eyebrow">Windows app</p>
              <h1 className="rd-page-title">Cloak</h1>
              <p className="rd-app-subtitle">Lock &amp; Encrypt Folders</p>
              <p className="rd-lede">
                Lock, encrypt and hide folders on Windows. Free, open source and private,
                built with Flutter and Rust.
              </p>
              <ul className="rd-tags rd-app-tags">
                {['Windows 10 / 11', 'Flutter', 'Rust', 'libsodium', 'GPL-3.0'].map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
              <div className="rd-cta-row">
                <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="rd-btn rd-btn-primary">
                  Download for Windows <DownloadIcon />
                </a>
                <a href={REPO_URL} target="_blank" rel="noreferrer" className="rd-btn rd-btn-ghost">
                  View on GitHub <GitHubIcon />
                </a>
              </div>
              <p className="rd-app-note">
                No release yet? Grab the <strong>folder-locker-setup</strong> artifact from the{' '}
                <ExternalLink href={CI_BUILDS_URL}>latest successful CI build</ExternalLink>.
              </p>
            </div>
            <div className="rd-app-icon-stage rd-reveal" aria-hidden="true">
              <img className="rd-app-icon-xl" src="/appIcons/folder-locker.png" alt="" width="512" height="512" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="rd-section" aria-labelledby="features-title">
          <div className="rd-wrap">
            <header className="rd-head rd-reveal">
              <p className="rd-eyebrow">Features</p>
              <h2 id="features-title">Real encryption, built into Explorer</h2>
            </header>
            <div className="rd-feature-grid">
              {features.map(({ icon, title, text }, i) => (
                <div key={title} className="rd-feature rd-reveal" style={{ '--d': `${(i % 3) * 80}ms` }}>
                  <span className="rd-feature-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{featureIcons[icon]}</svg>
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section className="rd-section" aria-labelledby="screens-title">
          <div className="rd-wrap">
            <header className="rd-head rd-reveal">
              <p className="rd-eyebrow">Screenshots</p>
              <h2 id="screens-title">See it in action</h2>
            </header>
            <div className="rd-shot-grid">
              {screenshots.map(({ src, label }, i) => (
                <div key={src} className="rd-reveal" style={{ '--d': `${(i % 3) * 80}ms` }}>
                  <Shot src={src} label={label} onOpen={() => setPreview({ src, label })} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Install */}
        <section className="rd-section" aria-labelledby="install-title">
          <div className="rd-wrap rd-split">
            <header className="rd-head rd-reveal">
              <p className="rd-eyebrow">Install</p>
              <h2 id="install-title">How to install</h2>
            </header>
            <div>
              <ol className="rd-steps">
                {steps.map((step, i) => (
                  <li key={i} className="rd-step rd-reveal" style={{ '--d': `${i * 70}ms` }}>
                    <span className="rd-step-num">{i + 1}</span>
                    <p>{step}</p>
                  </li>
                ))}
              </ol>
              <div className="rd-callout rd-reveal">
                <p className="rd-callout-title">Good to know</p>
                <p>There is no back door: if you forget your password and lose your recovery key, nobody can recover the data.</p>
                <p>
                  Opening vaults as drives needs the free{' '}
                  <ExternalLink href="https://github.com/dokan-dev/dokany">Dokany</ExternalLink>{' '}
                  driver. The installer can install it for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Code signing policy */}
        <section id="code-signing" className="rd-section" aria-labelledby="signing-title">
          <div className="rd-wrap rd-split">
            <header className="rd-head rd-reveal">
              <p className="rd-eyebrow">Trust</p>
              <h2 id="signing-title">Code signing policy</h2>
            </header>
            <div className="rd-prose-card rd-reveal">
              <p>
                Free code signing provided by{' '}
                <ExternalLink href="https://about.signpath.io">SignPath.io</ExternalLink>,
                certificate by{' '}
                <ExternalLink href="https://signpath.org">SignPath Foundation</ExternalLink>.
              </p>
              <p>
                Only files built from the public{' '}
                <ExternalLink href={REPO_URL}>source code</ExternalLink>{' '}
                by GitHub Actions are signed.
              </p>
              <dl className="rd-specs">
                <div><dt>Committers and reviewers</dt><dd><ExternalLink href="https://github.com/priyankraychura">Priyank Raychura</ExternalLink></dd></div>
                <div><dt>Approvers</dt><dd><ExternalLink href="https://github.com/priyankraychura">Priyank Raychura</ExternalLink></dd></div>
              </dl>
            </div>
          </div>
        </section>

        {/* Privacy policy */}
        <section id="privacy" className="rd-section" aria-labelledby="privacy-title">
          <div className="rd-wrap rd-split">
            <header className="rd-head rd-reveal">
              <p className="rd-eyebrow">Privacy</p>
              <h2 id="privacy-title">Privacy policy</h2>
            </header>
            <div className="rd-prose-card rd-reveal">
              <p>
                This program will not transfer any information to other networked systems unless
                specifically requested by the user or the person installing or operating it.
              </p>
              <p>
                Cloak has no account, no cloud and no telemetry. Your passwords, recovery key and files
                stay on your PC. It never connects to the internet by itself: links, such as the Dokany
                download page, open in your browser only when you click them.
              </p>
              <p>
                <Link to="/privacy-policy/cloak" className="rd-link">Read the full privacy policy <ArrowUpRight /></Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {preview && (
        <div className="rd-lightbox" role="dialog" aria-modal="true" aria-label={preview.label} onClick={() => setPreview(null)}>
          <button type="button" className="rd-lightbox-close" aria-label="Close preview" onClick={() => setPreview(null)}><CloseIcon /></button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={preview.src} alt={preview.label} />
            <figcaption>{preview.label}</figcaption>
          </figure>
        </div>
      )}
    </div>
  )
}

export default FolderLocker
