import React, { useEffect, useState } from 'react'

const REPO_URL = 'https://github.com/priyankraychura/desktop_folder_locker'
const RELEASES_URL = `${REPO_URL}/releases/latest`
const CI_BUILDS_URL = `${REPO_URL}/actions/workflows/ci.yml?query=branch%3Amain+is%3Asuccess`

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
  'Click "Download for Windows" and get FolderLocker-Setup-<version>.exe.',
  'Run the installer. Install for all users, or choose "Install for me only" to skip the admin prompt.',
  'Windows SmartScreen may warn because the installer is not code-signed yet. Click "More info" → "Run anyway".',
  'On first start, create a master password and save your recovery key somewhere safe.',
]

const FolderLocker = () => {
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    document.title = 'Folder Locker for Windows | Priyank Raychura'
  }, [])

  return (
    <section className="section pb-20">
      <div className="container">
        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-5 mb-16 pt-6">
          <img
            src="/appIcons/folder-locker.png"
            alt="Folder Locker icon"
            width={96}
            height={96}
            className="w-24 h-24"
          />
          <h1 className="headline-1 mx-auto">Folder Locker</h1>
          <p className="text-zinc-400 max-w-xl text-lg">
            Lock, encrypt and hide folders on Windows. Free, open source and private,
            built with Flutter and Rust.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            {['Windows 10 / 11', 'Flutter', 'Rust', 'libsodium', 'GPL-3.0'].map((tag) => (
              <span key={tag} className="text-xs text-zinc-400 bg-zinc-50/10 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <a href={RELEASES_URL} target="_blank" rel="noreferrer" className="btn btn-primary">
              Download for Windows
              <span className="material-symbols-rounded" aria-hidden="true">download</span>
            </a>
            <a href={REPO_URL} target="_blank" rel="noreferrer" className="btn btn-outline">
              View on GitHub
              <span className="material-symbols-rounded" aria-hidden="true">code</span>
            </a>
          </div>

          <p className="text-sm text-zinc-500">
            No release yet? Grab the <strong className="text-zinc-400">folder-locker-setup</strong> artifact
            from the{' '}
            <a href={CI_BUILDS_URL} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
              latest successful CI build
            </a>.
          </p>
        </div>

        {/* Features */}
        <h2 className="headline-2 mb-8">Features</h2>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {features.map(({ icon, title, text }) => (
            <div key={title} className="p-5 rounded-xl bg-zinc-800 ring-1 ring-inset ring-zinc-50/5">
              <span className="material-symbols-rounded text-sky-400 text-3xl mb-3 block">{icon}</span>
              <h3 className="text-base font-medium text-zinc-200 mb-1">{title}</h3>
              <p className="text-sm text-zinc-400">{text}</p>
            </div>
          ))}
        </div>

        {/* Screenshots */}
        <h2 className="headline-2 mb-8">Screenshots</h2>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          {screenshots.map(({ src, label }) => (
            <button
              key={src}
              onClick={() => setPreview({ src, label })}
              className="text-left rounded-xl bg-zinc-800 p-2 ring-1 ring-inset ring-zinc-50/5 hover:bg-zinc-700/50 transition-colors"
            >
              <figure className="img-box rounded-lg aspect-[16/10]">
                <img src={src} alt={label} loading="lazy" className="img-cover" />
              </figure>
              <p className="text-sm text-zinc-400 mt-2 px-1">{label}</p>
            </button>
          ))}
        </div>

        {/* Install */}
        <h2 className="headline-2 mb-8">How to install</h2>
        <ol className="space-y-3 mb-16">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4 p-4 rounded-xl bg-zinc-800 ring-1 ring-inset ring-zinc-50/5">
              <span className="w-8 h-8 shrink-0 rounded-lg grid place-items-center bg-sky-400/10 text-sky-400 font-semibold">
                {i + 1}
              </span>
              <p className="text-zinc-300 self-center">{step}</p>
            </li>
          ))}
        </ol>

        {/* Notes */}
        <div className="p-5 rounded-xl bg-amber-400/5 ring-1 ring-inset ring-amber-400/20 text-sm text-zinc-300 space-y-2">
          <p className="font-medium text-amber-300">Good to know</p>
          <p>There is no back door: if you forget your password and lose your recovery key, nobody can recover the data.</p>
          <p>
            Opening vaults as drives needs the free{' '}
            <a href="https://github.com/dokan-dev/dokany" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">
              Dokany
            </a>{' '}
            driver. The installer can install it for you.
          </p>
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm grid place-items-center p-4"
          onClick={() => setPreview(null)}
        >
          <img src={preview.src} alt={preview.label} className="max-w-full max-h-[90vh] rounded-lg" />
        </div>
      )}
    </section>
  )
}

export default FolderLocker
