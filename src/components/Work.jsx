import React from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from './ProjectCard'
import { ArrowUpRight } from './icons'
import { works } from '../utils/works'

const Work = () => {
    return (
        <section id="work" className="rd-section" aria-labelledby="work-title">
            <div className="rd-wrap">
                <header className="rd-head rd-head--row">
                    <div>
                        <p className="rd-eyebrow">Selected work</p>
                        <h2 id="work-title">Portfolio highlights</h2>
                        <p className="rd-lede">
                            Six of the {works.length} websites and web apps I&apos;ve built, from a React food-delivery site to JavaScript apps for weather and movies.
                        </p>
                    </div>
                    <Link className="rd-link" to="/all-projects">View all {works.length} projects <ArrowUpRight /></Link>
                </header>

                <div className="rd-work-grid">
                    {works.slice(0, 6).map(({ imgSrc, title, tags, projectLink, githubLink }) => (
                        <ProjectCard
                            key={title}
                            imgSrc={imgSrc}
                            title={title}
                            tags={tags.slice(0, 2)}
                            projectLink={projectLink}
                            githubLink={githubLink}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Work
