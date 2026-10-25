import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// Each word in its own mask, so a [data-split] heading can raise it into view (see useReveal)
export function SplitWords({ text }) {
    const words = text.split(' ')

    return words.map((word, key) => (
        <Fragment key={key}>
            <span className="w"><span>{word}</span></span>
            {key < words.length - 1 && ' '}
        </Fragment>
    ))
}

// Plain word spans for effects that light words up one by one
export function Words({ text }) {
    const words = text.split(' ')

    return words.map((word, key) => (
        <Fragment key={key}>
            <span className="sw">{word}</span>
            {key < words.length - 1 && ' '}
        </Fragment>
    ))
}

SplitWords.propTypes = { text: PropTypes.string.isRequired }
Words.propTypes = { text: PropTypes.string.isRequired }
