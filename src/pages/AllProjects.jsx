import React, { useEffect, useRef } from 'react'
import ProjectArchive from '../components/ProjectArchive'
import { SplitWords } from '../components/SplitText'
import useReveal from '../hooks/useReveal'
import { works } from '../utils/works'

const AllProjects = () => {
  const container = useRef(null)
  useReveal(container)

  useEffect(() => {
    document.title = 'All projects | Priyank Raychura'
  }, [])

  return (
    <main id="main" ref={container}>
      <section id="work" className="section page-top" aria-labelledby="all-projects-title">
        <div className="wrap">
          <div className="sec-label" data-reveal>
            <span className="eyebrow">Web</span>
            <span className="sec-count">{works.length} projects</span>
          </div>
          <h1 className="page-title" id="all-projects-title" data-split>
            <SplitWords text="Everything I've built for the web." />
          </h1>
          <p className="page-lede" data-reveal>
            Landing pages, portfolios, JavaScript tools and full-stack apps, built with React, Django, JavaScript, Bootstrap and CSS.
          </p>
        </div>

        <ProjectArchive id="projects" title={null} className="archive-page" />
      </section>
    </main>
  )
}

export default AllProjects
