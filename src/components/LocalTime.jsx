import React from 'react'
import PropTypes from 'prop-types'
import useIndiaTime from '../hooks/useIndiaTime'

// " · 14:32 IST" in Rajkot time; renders nothing if the browser can't tell the time there
const LocalTime = ({ separator = null }) => {
    const time = useIndiaTime()
    if (!time) return null

    return (
        <>
            {separator}
            <span><time>{time}</time> IST</span>
        </>
    )
}

LocalTime.propTypes = { separator: PropTypes.node }

export default LocalTime
