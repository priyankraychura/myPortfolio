import React from 'react'
import PropTypes from 'prop-types'
import { SplitWords } from './SplitText'

// Label on the left, big heading and lede on the right (stacked on phones)
const SectionHead = ({ id, label, count, title, lede }) => {
    return (
        <header className="sec-head">
            <div className="sec-label" data-reveal>
                <span className="eyebrow">{label}</span>
                {count && <span className="sec-count">{count}</span>}
            </div>

            <div>
                <h2 className="sec-title" id={id} data-split>
                    <SplitWords text={title} />
                </h2>
                {lede && <p className="sec-lede" data-reveal>{lede}</p>}
            </div>
        </header>
    )
}

SectionHead.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    count: PropTypes.string,
    title: PropTypes.string.isRequired,
    lede: PropTypes.string
}

export default SectionHead
