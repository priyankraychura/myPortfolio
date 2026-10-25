import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from './icons'

// Text link with an arrow and an underline that draws in on hover
const TextLink = ({ to, href, children, className = 'link' }) => {
    if (to) {
        return <Link to={to} className={className}>{children} <ArrowUpRight /></Link>
    }
    return (
        <a href={href} target="_blank" rel="noreferrer" className={className}>
            {children} <ArrowUpRight />
        </a>
    )
}

TextLink.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

export default TextLink
