import React, { useId } from 'react'
import PropTypes from 'prop-types'

// The two blades of public/images/logo.svg, split so each can move on its own
const BLADE_A = 'M20.0299 20.6068L20.0299 15.6876L20.0299 11.644C20.0299 11.07 19.8006 10.5197 19.3929 10.1155L17.5713 8.30986L13.8204 4.58053C12.4628 3.23077 10.1508 4.19237 10.1508 6.10676L10.1508 25.2632C10.1508 27.1783 12.4643 28.1396 13.8215 26.7883L20.0299 20.6068Z'
const BLADE_B = 'M20.0299 20.6068L20.0299 25.5517L20.0299 29.6364C20.0299 30.2088 20.258 30.7577 20.6636 31.1615L26.1786 36.6525C27.5358 38.0037 29.8493 37.0425 29.8493 35.1273V15.976C29.8493 14.0609 27.5358 13.0996 26.1786 14.4508L20.0299 20.5727L20.0299 20.6068Z'

const LogoMark = ({ className = 'mark', gradient = true }) => {
    const gradientId = `mark${useId().replace(/[^a-zA-Z0-9]/g, '')}`
    const fill = gradient ? `url(#${gradientId})` : 'currentColor'

    return (
        <svg className={className} viewBox="9 2 22 37" aria-hidden="true" focusable="false">
            {gradient && (
                <defs>
                    <linearGradient id={gradientId} x1="10" y1="10" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                        <stop offset="0" stopColor="#9DB2FF" />
                        <stop offset="0.5" stopColor="#3D5AFE" />
                        <stop offset="1" stopColor="#9DB2FF" />
                    </linearGradient>
                </defs>
            )}
            <path className="blade-a" fill={fill} d={BLADE_A} />
            <path className="blade-b" fill={fill} d={BLADE_B} />
        </svg>
    )
}

LogoMark.propTypes = {
    className: PropTypes.string,
    gradient: PropTypes.bool
}

export default LogoMark
