import React, { useCallback, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { motion, onReady, sinceReady } from '../utils/motion'

const HEX = '0123456789abcdef'
const randomHex = () => HEX[(Math.random() * 16) | 0]

// A word that "decrypts": hex characters scramble, then lock into place left to right.
// Plays with the hero intro and again on hover or tap.
const Cipher = ({ text }) => {
    const ref = useRef(null)
    const frame = useRef(0)

    const scramble = useCallback((duration, delay = 0) => {
        const el = ref.current
        if (!el) return
        const letters = Array.from(el.children)
        const count = letters.length
        const start = performance.now() + delay
        const lockAt = letters.map((_, i) => start + duration * (0.3 + 0.7 * (i / Math.max(1, count - 1))) + Math.random() * 70)
        let lastSwap = 0

        cancelAnimationFrame(frame.current)
        el.classList.add('is-scrambling')
        // write to the text node React created, so React keeps tracking it
        letters.forEach((letter) => {
            letter.classList.remove('ok')
            letter.firstChild.nodeValue = randomHex()
        })

        const tick = (now) => {
            let pending = 0
            const swap = now - lastSwap > 50
            if (swap) lastSwap = now
            letters.forEach((letter, i) => {
                if (now >= lockAt[i]) {
                    if (!letter.classList.contains('ok')) {
                        letter.firstChild.nodeValue = text[i]
                        letter.classList.add('ok')
                    }
                } else {
                    pending++
                    if (swap) letter.firstChild.nodeValue = randomHex()
                }
            })
            if (pending) frame.current = requestAnimationFrame(tick)
            else el.classList.remove('is-scrambling')
        }
        frame.current = requestAnimationFrame(tick)
    }, [text])

    useEffect(() => {
        if (!motion) return
        const cancelWait = onReady(() => scramble(1100, sinceReady(620)))
        return () => {
            cancelWait()
            cancelAnimationFrame(frame.current)
        }
    }, [scramble])

    const replay = () => {
        if (motion && !ref.current.classList.contains('is-scrambling')) scramble(700)
    }

    return (
        <span className="cipher" ref={ref} onPointerEnter={replay} onClick={replay}>
            {Array.from(text, (letter, key) => <span className="ch" key={key}>{letter}</span>)}
        </span>
    )
}

Cipher.propTypes = { text: PropTypes.string.isRequired }

export default Cipher
