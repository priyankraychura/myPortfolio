import React from 'react'
import Button from '../components/Button'
import Cipher from '../components/Cipher'
import { ArrowRight } from '../components/icons'
import usePageMeta from '../hooks/usePageMeta'

const NotFound = () => {
  usePageMeta('Page not found | Priyank Raychura')

  return (
    <main id="main">
      <section className="section page-top">
        <div className="wrap not-found">
          <span className="eyebrow">Error 404</span>
          <h1 className="page-title">
            <span className="sr-only">This page is missing.</span>
            <span aria-hidden="true">This page is <Cipher text="missing" />.</span>
          </h1>
          <p className="page-lede">The link may be old or mistyped. Everything I&apos;ve built is one click away.</p>
          <div className="cta-row">
            <Button label="Back to home" to="/" variant="fill" iconAfter={<ArrowRight />} />
            <Button label="See all projects" to="/all-projects" />
          </div>
        </div>
      </section>
    </main>
  )
}

export default NotFound
