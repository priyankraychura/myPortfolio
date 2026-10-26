import React, { Suspense, lazy, useState } from 'react'
import Button from './Button'
import { ArrowRight, Send } from './icons'

// axios and the Lottie success animation download on the first send, not with the page.
// The animation is decorative: if it can't download, its space just stays empty.
const AnimationSpace = () => <div style={{ width: 150, height: 125 }}></div>;
const loadSuccessAnimation = () => import('./SuccessAnimation');
const SuccessAnimation = lazy(() => loadSuccessAnimation().catch(() => ({ default: AnimationSpace })));

const emptyForm = { name: '', email: '', message: '' };

// Sends the message to the contact API (VITE_API_URL). Keeps what was typed if sending fails.
const ContactForm = () => {
    const [formData, setFormData] = useState(emptyForm);
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('submitting');
        loadSuccessAnimation().catch(() => {});

        const apiUrl = import.meta.env.VITE_API_URL;
        const apiKey = import.meta.env.VITE_API_SECRET_KEY;

        const config = {
            headers: {
                'X-API-Key': apiKey
            }
        };

        import('axios')
            .then(({ default: axios }) => axios.post(`${apiUrl}/contact`, formData, config))
            .then(() => {
                setStatus('success');
                setFormData(emptyForm);
            })
            .catch(err => {
                console.error(err);
                setStatus('error');
            });
    };

    if (status === 'success') {
        return (
            <div className="card form-card" data-reveal>
                <div className="form-done" role="status">
                    <Suspense fallback={<AnimationSpace />}>
                        <SuccessAnimation />
                    </Suspense>
                    <h3>Message sent</h3>
                    <p>Thanks for reaching out. I&apos;ll get back to you by email as soon as I can.</p>
                    <Button label="Send another message" onClick={() => setStatus('idle')} iconAfter={<ArrowRight />} />
                </div>
            </div>
        );
    }

    const busy = status === 'submitting';

    return (
        <div className="card form-card" data-reveal>
            <h3>Send a message</h3>
            <p className="form-sub">Prefer a form? Write here and I&apos;ll reply by email.</p>

            <form className="contact-form" onSubmit={handleSubmit}>
                {status === 'error' && (
                    <p className="form-error" role="alert">
                        Your message didn&apos;t go through. Check your connection and try again, or email me directly.
                    </p>
                )}

                <div className="form-row">
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text" name="name" id="name" autoComplete="name" required
                            placeholder="Your name" className="input"
                            onChange={handleChange} value={formData.name}
                            disabled={busy}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email" name="email" id="email" autoComplete="email" required
                            placeholder="you@example.com" className="input"
                            onChange={handleChange} value={formData.email}
                            disabled={busy}
                        />
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="message">Message</label>
                    <textarea
                        name="message" id="message" required
                        placeholder="What are you building?" className="input"
                        onChange={handleChange} value={formData.message}
                        disabled={busy}
                    ></textarea>
                </div>

                <div>
                    <Button
                        type="submit"
                        label={busy ? 'Sending…' : 'Send message'}
                        variant="fill"
                        iconAfter={<Send />}
                        disabled={busy}
                        magnetic
                    />
                </div>
            </form>
        </div>
    );
};

export default ContactForm
