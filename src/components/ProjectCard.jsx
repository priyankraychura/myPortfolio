import React from 'react'
import PropTypes from 'prop-types'
import useTilt from '../hooks/useTilt'
import { ArrowUpRight, GitHubIcon } from './icons'

const ProjectCard = ({
    imgSrc,
    title,
    tags,
    projectLink,
    githubLink,
    classes = ''
}) => {
    const tiltRef = useTilt(9);

    return (
        <article ref={tiltRef} className={'rd-work-card rd-tilt ' + classes}>
            <a
                className="rd-work-media rd-z2"
                href={projectLink || githubLink}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${title}`}
            >
                <img src={imgSrc} alt="" width="1616" height="1010" loading="lazy" />
            </a>
            <div className="rd-work-meta rd-z1">
                <h3>{title}</h3>
                <ul className="rd-tags">
                    {tags.map((label) => <li key={label}>{label}</li>)}
                </ul>
                <div className="rd-work-links">
                    {projectLink && (
                        <a className="rd-icon-link" href={projectLink} target="_blank" rel="noreferrer" aria-label={`Live site: ${title}`} title="Live site">
                            <ArrowUpRight />
                        </a>
                    )}
                    {githubLink && (
                        <a className="rd-icon-link" href={githubLink} target="_blank" rel="noreferrer" aria-label={`Source code: ${title}`} title="Source code">
                            <GitHubIcon />
                        </a>
                    )}
                </div>
            </div>
            <span className="rd-glare" aria-hidden="true"></span>
        </article>
    )
}

ProjectCard.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    projectLink: PropTypes.string,
    githubLink: PropTypes.string,
    classes: PropTypes.string
}

export default ProjectCard
