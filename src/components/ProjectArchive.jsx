import React, { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button'
import CursorPreview from './CursorPreview'
import { ArrowUpRight } from './icons'
import useScrollTo from '../hooks/useScrollTo'
import { categories, works } from '../utils/works'
import { motion } from '../utils/motion'

const filters = [
    { id: 'all', label: 'All' },
    { id: 'landing', label: 'Landing pages' },
    { id: 'tool', label: 'Tools' },
    { id: 'portfolio', label: 'Portfolios' },
    { id: 'app', label: 'Web apps' }
];

const counts = works.reduce((total, work) => ({ ...total, [work.category]: (total[work.category] || 0) + 1 }), { all: works.length })

const thumbFor = (row) => `/projects/thumbs/project-${works[row.dataset.index].img}.webp`

// Every web project as a filterable list. With `limit`, "All" starts collapsed to that many rows.
const ProjectArchive = ({ id, title = 'Every project', limit, className }) => {
    const [filter, setFilter] = useState('all')
    const [expanded, setExpanded] = useState(false)
    const listRef = useRef(null)
    const changed = useRef(false)
    const scrollTo = useScrollTo()

    const matching = works
        .map((work, index) => ({ ...work, index }))
        .filter((work) => filter === 'all' || work.category === filter)
    const collapsible = Boolean(limit) && filter === 'all' && matching.length > limit
    const rows = collapsible && !expanded ? matching.slice(0, limit) : matching

    // the page got taller or shorter: let ScrollTrigger re-measure (not needed on the first render)
    useEffect(() => {
        if (!changed.current) {
            changed.current = true
            return
        }
        ScrollTrigger.refresh()
    }, [filter, expanded])

    // rows that stay slide to their new place, new ones fade in (View Transitions where supported)
    const transition = (update) => {
        const list = listRef.current
        if (!motion || !document.startViewTransition || !list) {
            update()
            return
        }
        const name = () => list.querySelectorAll('.row').forEach((row) => {
            row.style.viewTransitionName = `pr-row-${row.dataset.index}`
        })
        name()
        const vt = document.startViewTransition(() => {
            flushSync(update)
            name()
        })
        vt.finished.finally(() => {
            listRef.current?.querySelectorAll('.row').forEach((row) => {
                row.style.viewTransitionName = ''
            })
        })
    }

    const chooseFilter = (next) => {
        if (next !== filter) transition(() => setFilter(next))
    }

    const toggleExpanded = () => {
        transition(() => setExpanded((open) => !open))
        // collapsing from far below: bring the list back into view
        if (expanded) scrollTo(id)
    }

    return (
        <div className={clsx('wrap archive', className)} id={id}>
            <div className="archive-head">
                <div>
                    {title && <h3 className="archive-title">{title}</h3>}
                    <p className="archive-sub">
                        Each one links to its live site and source code. <span className="hover-only">Hover a row to preview it.</span>
                    </p>
                </div>
                <div className="chips" role="group" aria-label="Filter projects">
                    {filters.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            className="chip"
                            aria-pressed={filter === option.id}
                            onClick={() => chooseFilter(option.id)}
                        >
                            {option.label} <span className="n">{counts[option.id]}</span>
                        </button>
                    ))}
                </div>
            </div>

            <div className="rows-head" aria-hidden="true">
                <span>Project</span>
                <span>Type</span>
                <span>Built with</span>
                <span></span>
            </div>

            <ul className="rows" ref={listRef}>
                {rows.map(({ title: name, category, tech, live, code, index }) => (
                    <li className="row" key={index} data-index={index}>
                        <a className="row-title" href={live || code} target="_blank" rel="noreferrer">{name}</a>
                        <span className="row-sub">{categories[category]} · {tech}</span>
                        <span className="row-type">{categories[category]}</span>
                        <span className="row-tech">{tech}</span>
                        <span className="row-links">
                            {live && (
                                <a href={live} target="_blank" rel="noreferrer" aria-label={`${name}, live site`}>
                                    Live <ArrowUpRight />
                                </a>
                            )}
                            <a href={code} target="_blank" rel="noreferrer" aria-label={`${name}, source code`}>
                                Code <ArrowUpRight />
                            </a>
                        </span>
                    </li>
                ))}
            </ul>

            {collapsible && (
                <div className="archive-more">
                    <Button label={expanded ? 'Show fewer' : `Show all ${works.length} projects`} onClick={toggleExpanded} />
                </div>
            )}

            <CursorPreview areaRef={listRef} itemSelector=".row" srcFor={thumbFor} />
        </div>
    )
}

ProjectArchive.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    limit: PropTypes.number,
    className: PropTypes.string
}

export default ProjectArchive
