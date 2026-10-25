import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import { finePointer, motion } from '../utils/motion'

// A floating screenshot that trails the cursor over the items in `areaRef` (mouse and trackpad only).
// srcFor(item) returns the image for a hovered item; keep it stable (define it outside the component).
const CursorPreview = ({ areaRef, itemSelector, srcFor }) => {
    const ref = useRef(null)
    const imgRef = useRef(null)

    useEffect(() => {
        const area = areaRef.current
        const preview = ref.current
        const img = imgRef.current
        if (!finePointer || !area || !preview) return

        let targetX = 0
        let targetY = 0
        let x = 0
        let y = 0
        let scale = 0.82
        let targetScale = 0.82
        let active = false
        let frame = 0

        const loop = () => {
            const ease = motion ? 0.16 : 1
            const dx = targetX - x
            x += dx * ease
            y += (targetY - y) * ease
            scale += (targetScale - scale) * (motion ? 0.18 : 1)
            // tilts toward the direction of travel
            const tilt = motion ? Math.max(-9, Math.min(9, dx * 0.06)) : 0
            preview.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${tilt.toFixed(2)}deg) scale(${scale.toFixed(3)})`
            frame = active || Math.abs(dx) > 0.3 || Math.abs(targetScale - scale) > 0.002 ? requestAnimationFrame(loop) : 0
        }
        const kick = () => {
            if (!frame) frame = requestAnimationFrame(loop)
        }
        // sits to the right of the cursor, kept inside the window
        const aim = (clientX, clientY) => {
            const width = preview.offsetWidth
            const height = preview.offsetHeight
            targetX = Math.min(window.innerWidth - width - 16, Math.max(16, clientX + 32))
            targetY = Math.min(window.innerHeight - height - 16, Math.max(16, clientY - height / 2))
        }

        const handleMove = (event) => {
            aim(event.clientX, event.clientY)
            kick()
        }
        const handleOver = (event) => {
            const item = event.target.closest(itemSelector)
            if (!item) return
            const src = srcFor(item)
            if (img.getAttribute('src') !== src) img.src = src
            if (!active) {
                aim(event.clientX, event.clientY)
                x = targetX
                y = targetY
            }
            active = true
            targetScale = 1
            preview.classList.add('is-on')
            kick()
        }
        const handleLeave = () => {
            active = false
            targetScale = 0.82
            preview.classList.remove('is-on')
            kick()
        }

        // warm the cache for the items on screen once the area is close
        const warm = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return
            warm.disconnect()
            area.querySelectorAll(itemSelector).forEach((item) => {
                const image = new Image()
                image.src = srcFor(item)
            })
        }, { rootMargin: '400px 0px' })
        warm.observe(area)

        area.addEventListener('pointermove', handleMove)
        area.addEventListener('pointerover', handleOver)
        area.addEventListener('pointerleave', handleLeave)
        return () => {
            warm.disconnect()
            cancelAnimationFrame(frame)
            area.removeEventListener('pointermove', handleMove)
            area.removeEventListener('pointerover', handleOver)
            area.removeEventListener('pointerleave', handleLeave)
        }
    }, [areaRef, itemSelector, srcFor])

    if (!finePointer) return null

    return createPortal(
        <div className="preview" ref={ref} aria-hidden="true">
            <img ref={imgRef} alt="" width="704" height="396" />
        </div>,
        document.body
    )
}

CursorPreview.propTypes = {
    areaRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
    itemSelector: PropTypes.string.isRequired,
    srcFor: PropTypes.func.isRequired
}

export default CursorPreview
