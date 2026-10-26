import React, { useCallback, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowUpRight } from './icons'
import { featuredWorks } from '../utils/works'
import { motion } from '../utils/motion'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const GalleryCard = ({ work }) => {
    const { title, img, alt, desc, tags, live, code } = work
    const main = live || code

    return (
        <li className="g-card" data-reveal>
            <a className="g-media" href={main} target="_blank" rel="noreferrer" aria-label={`${title}, ${live ? 'live site' : 'source code'}`}>
                <span className="g-par">
                    <img src={`/projects/featured/project-${img}.webp`} alt={alt} width="1200" height="676" loading="lazy" />
                </span>
            </a>
            <div className="g-meta">
                <div>
                    <h3 className="g-title">{title}</h3>
                    <p className="g-desc">{desc}</p>
                </div>
                <a className="round-link" href={main} target="_blank" rel="noreferrer" aria-label={`Open ${title}`}>
                    <ArrowUpRight />
                </a>
            </div>
            <div className="g-foot">
                <div className="tags">
                    {tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                </div>
                <a className="link" href={code} target="_blank" rel="noreferrer">Code <ArrowUpRight /></a>
            </div>
        </li>
    )
}

GalleryCard.propTypes = {
    work: PropTypes.shape({
        title: PropTypes.string.isRequired,
        img: PropTypes.number.isRequired,
        alt: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        live: PropTypes.string,
        code: PropTypes.string.isRequired
    }).isRequired
}

// Featured sites. On wide screens the row pins and moves sideways as you scroll; on phones you swipe it.
const Gallery = () => {
    const ref = useRef(null)
    const trackRef = useRef(null)
    const countRef = useRef(null)
    const barRef = useRef(null)
    const [pinned, setPinned] = useState(false)
    const total = featuredWorks.length

    const setProgress = useCallback((progress) => {
        if (!barRef.current || !countRef.current) return
        barRef.current.style.transform = `scaleX(${(1 / total + progress * (1 - 1 / total)).toFixed(4)})`
        countRef.current.firstChild.nodeValue = `${Math.min(total, Math.round(progress * (total - 1)) + 1)} / ${total}`
    }, [total])

    useGSAP(() => {
        if (!motion) return
        const mm = gsap.matchMedia()
        mm.add('(min-width: 960px)', () => {
            const track = trackRef.current
            const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth)
            setPinned(true)

            const slide = gsap.to(track, {
                x: () => -distance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'center center',
                    end: () => `+=${distance()}`,
                    pin: true,
                    scrub: 0.7,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    onUpdate: (self) => setProgress(self.progress)
                }
            })

            // screenshots drift a little inside their frames as the row moves
            gsap.utils.toArray('.g-par', track).forEach((layer) => {
                gsap.fromTo(layer, { xPercent: -4 }, {
                    xPercent: 4,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: layer.closest('.g-card'),
                        containerAnimation: slide,
                        start: 'left right',
                        end: 'right left',
                        scrub: true
                    }
                })
            })

            // Tabbing to a card: the browser would scroll the pinned frame sideways by itself and knock the row
            // out of step with the page. Undo that, and scroll the page to where the card is in view instead.
            const frame = ref.current
            const undoSideScroll = () => { frame.scrollLeft = 0 }
            const handleFocus = (event) => {
                undoSideScroll()
                const card = event.target.closest('.g-card')
                const max = distance()
                if (!card || !max) return
                const { start, end } = slide.scrollTrigger
                const offset = card.offsetLeft - (document.documentElement.clientWidth - card.offsetWidth) / 2
                window.scrollTo(0, start + gsap.utils.clamp(0, 1, offset / max) * (end - start))
            }
            frame.addEventListener('scroll', undoSideScroll)
            frame.addEventListener('focusin', handleFocus)

            return () => {
                frame.removeEventListener('scroll', undoSideScroll)
                frame.removeEventListener('focusin', handleFocus)
                setPinned(false)
                setProgress(0)
            }
        })
    }, { scope: ref })

    const handleSwipe = (event) => {
        if (pinned) return
        const viewport = event.currentTarget
        const max = viewport.scrollWidth - viewport.clientWidth
        setProgress(max > 0 ? viewport.scrollLeft / max : 0)
    }

    return (
        <div className={clsx('gallery', pinned && 'is-pinned')} ref={ref}>
            <div className="gallery-viewport" onScroll={handleSwipe}>
                <ul className="gallery-track" ref={trackRef}>
                    {featuredWorks.map((work) => <GalleryCard key={work.img} work={work} />)}
                </ul>
            </div>
            <div className="wrap gallery-ui" aria-hidden="true">
                <span className="g-count" ref={countRef}>{`1 / ${total}`}</span>
                <span className="g-progress"><i ref={barRef}></i></span>
                <span className="g-hint">{pinned ? 'Keep scrolling' : 'Swipe to browse'}</span>
            </div>
        </div>
    )
}

export default Gallery
