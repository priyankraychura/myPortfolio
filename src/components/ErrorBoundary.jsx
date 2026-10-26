import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

// A page's code that failed to download: a dropped connection, or a tab left open across a deploy
const isChunkError = (error) => /dynamically imported module|module script failed|Failed to fetch/i.test(error?.message ?? '')

// Catches a page that fails to load or render, so the header and footer stay usable.
// Changing `resetKey` (the route) clears the error.
class ErrorBoundary extends React.Component {
    state = { failed: false }

    static getDerivedStateFromError() {
        return { failed: true }
    }

    componentDidUpdate(prevProps) {
        if (this.state.failed && prevProps.resetKey !== this.props.resetKey) this.setState({ failed: false })
    }

    componentDidCatch(error) {
        console.error(error)
        if (!isChunkError(error)) return
        // after a deploy the old files are gone: one reload picks up the new build
        try {
            const last = Number(sessionStorage.getItem('pr-reloaded-at'))
            if (Date.now() - last < 10000) return
            sessionStorage.setItem('pr-reloaded-at', String(Date.now()))
        } catch {
            return
        }
        window.location.reload()
    }

    render() {
        if (!this.state.failed) return this.props.children

        return (
            <main id="main">
                <section className="section page-top">
                    <div className="wrap not-found">
                        <span className="eyebrow">Something went wrong</span>
                        <h1 className="page-title">This page didn&rsquo;t load.</h1>
                        <p className="page-lede">Check your connection and try again.</p>
                        <Button label="Reload the page" variant="fill" onClick={() => window.location.reload()} />
                    </div>
                </section>
            </main>
        )
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.node,
    resetKey: PropTypes.string
}

export default ErrorBoundary
