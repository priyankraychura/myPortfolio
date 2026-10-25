import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import useMagnetic from '../hooks/useMagnetic'
import useHashNav from '../hooks/useHashNav'

// Pill button whose label rolls on hover.
// Renders a router Link (to), an in-page section link (hash), a plain link (href) or a <button>.
const Button = ({
    label,
    to,
    hash,
    href,
    variant,
    size,
    icon,
    iconAfter,
    magnetic = false,
    className,
    ...rest
}) => {
    const ref = useRef(null)
    const go = useHashNav()
    useMagnetic(ref, magnetic)

    const classes = clsx('btn', variant === 'fill' && 'btn-fill', size === 'sm' && 'btn-sm', className)
    const content = (
        <>
            {icon}
            <span className="btn-label" data-label={label}><span>{label}</span></span>
            {iconAfter}
        </>
    )

    if (to) {
        return <Link ref={ref} to={to} className={classes} {...rest}>{content}</Link>
    }
    if (hash) {
        return <a ref={ref} href={`/#${hash}`} onClick={go(hash)} className={classes} {...rest}>{content}</a>
    }
    if (href) {
        const external = /^https?:/.test(href)
        return (
            <a ref={ref} href={href} className={classes} {...(external && { target: '_blank', rel: 'noreferrer' })} {...rest}>
                {content}
            </a>
        )
    }
    return <button ref={ref} type="button" className={classes} {...rest}>{content}</button>
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    to: PropTypes.string,
    hash: PropTypes.string,
    href: PropTypes.string,
    variant: PropTypes.oneOf(['fill']),
    size: PropTypes.oneOf(['sm']),
    icon: PropTypes.node,
    iconAfter: PropTypes.node,
    magnetic: PropTypes.bool,
    className: PropTypes.string
}

export default Button
