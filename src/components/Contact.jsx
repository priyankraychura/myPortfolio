import axios from 'axios';
import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Lottie from 'lottie-react';
import successAnimation from '../assets/success-animation.json'
import { ArrowUpRight, LogoMark } from './icons'

const EMAIL = 'priyankraychura@gmail.com';

const socialLinks = [
    { label: 'GitHub', href: 'https://www.github.com/priyankraychura' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/priyankraychura' },
    { label: 'X', href: 'https://x.com/priyankraychura' },
    { label: 'Instagram', href: 'https://www.instagram.com/priyankraychura' },
    { label: 'CodePen', href: 'https://codepen.io/priyankraychura' },
];

const SuccessView = ({ onReset }) => (
    <div className="rd-success">
        <Lottie animationData={successAnimation} loop={false} style={{ width: 150, height: 125 }} />
        <h3>Message sent</h3>
        <p>Thanks for reaching out. I&apos;ll get back to you as soon as I can.</p>
        <button type="button" onClick={onReset} className="rd-btn rd-btn-ghost">Send another message</button>
    </div>
);

SuccessView.propTypes = { onReset: PropTypes.func.isRequired };

function CopyEmail() {
    const [label, setLabel] = useState('Copy address');
    const valueRef = useRef(null);
    const timer = useRef(0);

    const flash = (text) => {
        setLabel(text);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setLabel('Copy address'), 2000);
    };
    const selectText = () => {
        const range = document.createRange();
        range.selectNodeContents(valueRef.current);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
        flash('Selected, press copy');
    };
    const copy = () => {
        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(EMAIL).then(() => flash('Copied'), selectText);
        } else {
            selectText();
        }
    };

    return (
        <div className="rd-email-card">
            <span className="rd-email-label">Email</span>
            <span className="rd-email-value" ref={valueRef}>{EMAIL}</span>
            <button type="button" onClick={copy} className={'rd-btn rd-btn-primary rd-btn-sm' + (label === 'Copied' ? ' is-done' : '')}>
                {label}
            </button>
        </div>
    );
}

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');

        const apiUrl = import.meta.env.VITE_API_URL;
        const apiKey = import.meta.env.VITE_API_SECRET_KEY;

        axios.post(`${apiUrl}/contact`, formData, { headers: { 'X-API-Key': apiKey } })
            .then(() => {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            })
            .catch(err => {
                console.error(err);
                setStatus('error');
            });
    };

    const submitting = status === 'submitting';

    return (
        <section id="contact" className="rd-section" aria-labelledby="contact-title">
            <div className="rd-wrap">
                <div className="rd-cta-panel">
                    <LogoMark className="rd-cta-mark" stroke="currentColor" strokeWidth={0.12} />
                    <div>
                        <p className="rd-eyebrow">Contact</p>
                        <h2 id="contact-title">Let&apos;s work together.</h2>
                        <p className="rd-lede">Have a website or app in mind? Send me a note about what you&apos;re building and when you need it.</p>
                        <CopyEmail />
                        <ul className="rd-socials">
                            {socialLinks.map(({ label, href }) => (
                                <li key={label}><a href={href} target="_blank" rel="noreferrer">{label} <ArrowUpRight /></a></li>
                            ))}
                        </ul>
                    </div>

                    {status === 'success' ? <SuccessView onReset={() => setStatus('idle')} /> : (
                        <form className="rd-form" onSubmit={handleSubmit}>
                            {status === 'error' && (
                                <p className="rd-form-error" role="alert">Your message didn&apos;t send. Check your connection and try again, or email me directly.</p>
                            )}
                            <div className="rd-form-row">
                                <div className="rd-field">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" name="name" id="name" autoComplete="name" required placeholder="Your name"
                                        onChange={handleChange} value={formData.name} disabled={submitting} />
                                </div>
                                <div className="rd-field">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" id="email" autoComplete="email" required placeholder="yourname@example.com"
                                        onChange={handleChange} value={formData.email} disabled={submitting} />
                                </div>
                            </div>
                            <div className="rd-field">
                                <label htmlFor="message">Message</label>
                                <textarea name="message" id="message" required placeholder="Tell me about your project"
                                    onChange={handleChange} value={formData.message} disabled={submitting}></textarea>
                            </div>
                            <button type="submit" disabled={submitting} className="rd-btn rd-btn-primary">
                                {submitting ? 'Sending…' : 'Send message'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Contact
