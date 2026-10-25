import React from 'react'
import PropTypes from 'prop-types'
import useHashNav from '../hooks/useHashNav'

// Link to a home page section ('top' for the very top) that scrolls smoothly
const HashLink = ({ to, onNavigate, children, ...rest }) => {
    const go = useHashNav(onNavigate)

    return (
        <a href={to === 'top' ? '/' : `/#${to}`} onClick={go(to)} {...rest}>
            {children}
        </a>
    )
}

HashLink.propTypes = {
    to: PropTypes.string.isRequired,
    onNavigate: PropTypes.func,
    children: PropTypes.node.isRequired
}

export default HashLink
