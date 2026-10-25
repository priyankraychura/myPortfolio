import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import Button from './Button'
import ContactForm from './ContactForm'
import { SplitWords } from './SplitText'
import { ArrowUpRight, Check, CodePen, Copy, GitHub, Instagram, LinkedIn, XLogo } from './icons'
import useSpotlight from '../hooks/useSpotlight'
import { EMAIL, socials } from '../utils/profile'

const socialIcons = {
    GitHub,
    LinkedIn,
    X: XLogo,
    Instagram,
    CodePen
};

const Contact = () => {
    const cardRef = useRef(null)
    const mailRef = useRef(null)
    const [copyState, setCopyState] = useState('idle')
    useSpotlight(cardRef)

    useEffect(() => {
        if (copyState === 'idle') return
        const timer = setTimeout(() => setCopyState('idle'), 2200)
        return () => clearTimeout(timer)
    }, [copyState])

    // copy the address; if the clipboard is blocked, select it so it can be copied by hand
    const copyEmail = () => {
        const selectAddress = () => {
            const range = document.createRange()
            range.selectNodeContents(mailRef.current)
            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)
            setCopyState('selected')
        }
        try {
            navigator.clipboard.writeText(EMAIL).then(() => setCopyState('copied'), selectAddress)
        } catch {
            selectAddress()
        }
    }

    const copyLabel = { idle: 'Copy email', copied: 'Copied', selected: 'Email selected' }[copyState]

    return (
        <section id="contact" className="section" aria-labelledby="contact-title">
            <div className="wrap">
                <div className="sec-label" data-reveal>
                    <span className="eyebrow">Contact</span>
                    <span className="sec-count"><span className="dot-live" aria-hidden="true"></span>Available for work</span>
                </div>
                <h2 className="contact-title" id="contact-title" data-split>
                    <SplitWords text="Have a project in mind?" />{' '}
                    <span className="soft"><SplitWords text="Let's build it." /></span>
                </h2>
                <p className="sec-lede" data-reveal>Tell me what you&apos;re making and I&apos;ll get back to you by email.</p>

                <div className="card mail-card spot" ref={cardRef} data-reveal>
                    <span className="eyebrow">Email</span>
                    <p className="mail" ref={mailRef}>{EMAIL}</p>
                    <div className="mail-actions">
                        <Button
                            label={copyLabel}
                            variant="fill"
                            icon={copyState === 'idle' ? <Copy /> : <Check />}
                            onClick={copyEmail}
                            className={clsx(copyState !== 'idle' && 'is-done')}
                            magnetic
                        />
                        <Button label="Open mail app" href={`mailto:${EMAIL}`} iconAfter={<ArrowUpRight className="i-ne" />} />
                    </div>
                    <span className="sr-only" role="status" aria-live="polite">{copyState === 'idle' ? '' : copyLabel}</span>
                </div>

                <div className="contact-grid">
                    <ContactForm />

                    <div className="elsewhere" data-reveal>
                        <span className="eyebrow">Elsewhere</span>
                        <ul className="socials">
                            {socials.map(({ label, handle, href }) => {
                                const Icon = socialIcons[label]
                                return (
                                    <li key={label}>
                                        <a href={href} target="_blank" rel="noreferrer">
                                            <span className="s-ico"><Icon /></span>
                                            <span>
                                                <span className="s-name">{label}</span>
                                                <span className="s-handle">{handle}</span>
                                            </span>
                                            <ArrowUpRight className="s-arrow" />
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
