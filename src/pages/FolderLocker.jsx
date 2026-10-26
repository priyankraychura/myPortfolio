import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useLenis } from 'lenis/react'
import Button from '../components/Button'
import CloakWindow from '../components/CloakWindow'
import { SplitWords } from '../components/SplitText'
import { Ban, Close, Code, Download, Drive, FolderOpen, Key, Lock, Shield } from '../components/icons'
import useReveal from '../hooks/useReveal'
import useHashScroll from '../hooks/useHashScroll'
import usePageMeta from '../hooks/usePageMeta'
import { CLOAK_RELEASES, CLOAK_REPO } from '../utils/works'

const CI_BUILDS_URL = `${CLOAK_REPO}/actions/workflows/ci.yml?query=is%3Asuccess`

const features = [
  {
    icon: Lock,
    title: 'Real encryption',
    text: 'Turns a folder or file into a single .flk vault using XChaCha20-Poly1305 and Argon2id from libsodium.',
  },
  {
    icon: Drive,
    title: 'Open as a drive',
    text: 'An encrypted folder can open as a drive such as V:. Files are decrypted in memory only, never written to disk.',
  },
  {
    icon: Ban,
    title: 'Block, read-only or hide',
    text: 'Instantly block access or make items read-only, even for huge folders, and hide them from Explorer.',
  },
  {
    icon: Key,
    title: 'Passwords & recovery key',
    text: 'One master password for everything or a password per item, plus a recovery key shown once at setup.',
  },
  {
    icon: FolderOpen,
    title: 'Explorer integration',
    text: 'Vaults get a lock icon, double-click asks for the password, and the right-click menu locks or unlocks items.',
  },
  {
    icon: Shield,
    title: 'Crash-safe & private',
    text: 'Every vault is verified before originals are deleted. No account, no cloud and no telemetry.',
  },
]

const screenshots = [
  { src: '/apps/folder-locker/05_items.webp', label: 'Protected items' },
  { src: '/apps/folder-locker/06_protect_dialog.webp', label: 'Protect dialog' },
  { src: '/apps/folder-locker/07_protect_dialog_drive.webp', label: 'Open as a drive' },
  { src: '/apps/folder-locker/08_unlock_dialog.webp', label: 'Unlock dialog' },
  { src: '/apps/folder-locker/09_settings.webp', label: 'Settings' },
  { src: '/apps/folder-locker/11_items_dark.webp', label: 'Dark mode' },
]

const steps = [
  'Click "Download for Windows" and download the setup .exe from the release.',
  'Run the installer. Install for all users, or choose "Install for me only" to skip the admin prompt.',
  'Windows SmartScreen may warn because the installer is not code-signed yet. Click "More info" → "Run anyway".',
  'On first start, create a master password and save your recovery key somewhere safe.',
]

const FolderLocker = () => {
  const container = useRef(null)
  const closeRef = useRef(null)
  const [preview, setPreview] = useState(null)
  const lenis = useLenis()

  useReveal(container)
  useHashScroll()
  usePageMeta(
    'Cloak - Lock & Encrypt Folders | Priyank Raychura',
    'Cloak locks, encrypts and hides folders on Windows 10 and 11. Free, open source and private, built with Flutter and Rust. No account, no cloud and no telemetry.'
  )

  // the page glows in Cloak's violet
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--amb', '#7B61FF')
    root.style.setProperty('--amb-2', '#6C8CFF')
    return () => {
      root.style.removeProperty('--amb')
      root.style.removeProperty('--amb-2')
    }
  }, [])

  // screenshot viewer: freeze the page, keep focus inside, close on Escape, then return focus to the screenshot
  useEffect(() => {
    if (!preview) return
    const opener = document.activeElement
    lenis?.stop()
    closeRef.current?.focus()
    const handleKey = (event) => {
      if (event.key === 'Escape') setPreview(null)
      // the close button is the only control, so Tab stays on it
      if (event.key === 'Tab') {
        event.preventDefault()
        closeRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      lenis?.start()
      window.removeEventListener('keydown', handleKey)
      opener?.focus?.({ preventScroll: true })
    }
  }, [preview, lenis])

  return (
    <main id="main" ref={container}>
      <section className="section page-top" aria-labelledby="cloak-title">
        <div className="wrap">
          {/* Hero */}
          <div className="cloak-hero">
            <div>
              <img className="app-icon" src="/appIcons/cloak.webp" alt="Cloak icon" width="76" height="76" data-reveal />
              <h1 className="page-title" id="cloak-title" data-split><SplitWords text="Cloak" /></h1>
              <p className="app-sub" data-reveal>Lock &amp; Encrypt Folders</p>
              <p className="page-lede" data-reveal>
                Lock, encrypt and hide folders on Windows. Free, open source and private,
                built with Flutter and Rust.
              </p>

              <div className="tags" data-reveal>
                {['Windows 10 / 11', 'Flutter', 'Rust', 'libsodium', 'GPL-3.0'].map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <div className="cta-row" data-reveal>
                <Button label="Download for Windows" href={CLOAK_RELEASES} variant="fill" icon={<Download />} magnetic />
                <Button label="View on GitHub" href={CLOAK_REPO} icon={<Code />} magnetic />
              </div>

              <p className="cloak-note" data-reveal>
                No release yet? Grab the <strong>folder-locker-setup</strong> artifact
                from the{' '}
                <a href={CI_BUILDS_URL} target="_blank" rel="noreferrer" className="inline-link">
                  latest successful CI build
                </a>.
              </p>
            </div>

            <div className="cloak-visual">
              <CloakWindow />
            </div>
          </div>

          {/* Features */}
          <section className="block" aria-labelledby="features-title">
            <span className="eyebrow" data-reveal>What it does</span>
            <h2 className="block-title" id="features-title" data-split><SplitWords text="Features" /></h2>
            <div className="features">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div key={feature.title} className="feature" data-reveal>
                    <span className="feature-ico"><Icon /></span>
                    <h3>{feature.title}</h3>
                    <p>{feature.text}</p>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Screenshots */}
          <section className="block" aria-labelledby="screenshots-title">
            <span className="eyebrow" data-reveal>A look inside</span>
            <h2 className="block-title" id="screenshots-title" data-split><SplitWords text="Screenshots" /></h2>
            <div className="shots">
              {screenshots.map(({ src, label }) => (
                <button key={src} type="button" className="shot" onClick={() => setPreview({ src, label })} data-reveal>
                  <span className="shot-img">
                    <img src={src} alt="" loading="lazy" width="1280" height="800" />
                  </span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Install */}
          <section className="block" aria-labelledby="install-title">
            <span className="eyebrow" data-reveal>Get started</span>
            <h2 className="block-title" id="install-title" data-split><SplitWords text="How to install" /></h2>
            <ol className="steps">
              {steps.map((step) => (
                <li key={step} className="step" data-reveal>
                  <p>{step}</p>
                </li>
              ))}
            </ol>

            {/* Notes */}
            <div className="note" data-reveal>
              <p className="note-title">Good to know</p>
              <p>There is no back door: if you forget your password and lose your recovery key, nobody can recover the data.</p>
              <p>
                Opening vaults as drives needs the free{' '}
                <a href="https://github.com/dokan-dev/dokany" target="_blank" rel="noreferrer" className="inline-link">
                  Dokany
                </a>{' '}
                driver. The installer can install it for you.
              </p>
            </div>
          </section>

          {/* Code signing policy */}
          <section className="block" id="code-signing" aria-labelledby="code-signing-title">
            <span className="eyebrow" data-reveal>Releases</span>
            <h2 className="block-title" id="code-signing-title" data-split><SplitWords text="Code signing policy" /></h2>
            <div className="prose-card" data-reveal>
              <p>
                Free code signing provided by{' '}
                <a href="https://about.signpath.io" target="_blank" rel="noreferrer" className="inline-link">SignPath.io</a>,
                certificate by{' '}
                <a href="https://signpath.org" target="_blank" rel="noreferrer" className="inline-link">SignPath Foundation</a>.
              </p>
              <p>
                Only files built from the public{' '}
                <a href={CLOAK_REPO} target="_blank" rel="noreferrer" className="inline-link">source code</a>{' '}
                by GitHub Actions are signed.
              </p>
              <p>
                <strong>Committers and reviewers:</strong>{' '}
                <a href="https://github.com/priyankraychura" target="_blank" rel="noreferrer" className="inline-link">Priyank Raychura</a>
                <br />
                <strong>Approvers:</strong>{' '}
                <a href="https://github.com/priyankraychura" target="_blank" rel="noreferrer" className="inline-link">Priyank Raychura</a>
              </p>
            </div>
          </section>

          {/* Privacy policy */}
          <section className="block" id="privacy" aria-labelledby="privacy-title">
            <span className="eyebrow" data-reveal>Your data</span>
            <h2 className="block-title" id="privacy-title" data-split><SplitWords text="Privacy policy" /></h2>
            <div className="prose-card" data-reveal>
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
                <Link to="/privacy-policy/cloak" className="inline-link">
                  Read the full privacy policy
                </Link>
              </p>
            </div>
          </section>
        </div>
      </section>

      {/* in <body> so it covers the fixed nav and back-to-top button */}
      {preview && createPortal(
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={preview.label} onClick={() => setPreview(null)}>
          <button ref={closeRef} type="button" className="icon-btn" aria-label="Close screenshot" onClick={() => setPreview(null)}>
            <Close />
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={preview.src} alt={preview.label} />
            <figcaption>{preview.label}</figcaption>
          </figure>
        </div>,
        document.body
      )}
    </main>
  )
}

export default FolderLocker
