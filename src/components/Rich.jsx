import React from 'react'
import PropTypes from 'prop-types'

// Renders `backticked` parts of a string as <code>
const Rich = ({ text }) => text.split(/(`[^`]+`)/).map((part, key) => (
    part.startsWith('`') ? <code key={key}>{part.slice(1, -1)}</code> : part
))

Rich.propTypes = { text: PropTypes.string.isRequired }

export default Rich
