import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Rich from './Rich'
import TextLink from './TextLink'
import { Download, Play } from './icons'
import useSpotlight from '../hooks/useSpotlight'

const primaryIcons = { download: <Download />, play: <Play /> };

// One app: details and links on the left, its visual on the right (on top on phones)
const ProductSheet = ({ app, index, children }) => {
    const ref = useRef(null)
    useSpotlight(ref)
    const { id, name, sub, pill, icon, glow, desc, specs, primary, links } = app

    return (
        <article className="sheet spot" id={id} data-sheet={id} ref={ref} style={{ '--i': index, '--glow': glow }}>
            <div className="sheet-info">
                <div className="app-id" data-reveal>
                    <img className="app-icon" src={icon} alt="" width="60" height="60" loading="lazy" />
                    <div>
                        <h3 className="app-name">{name}</h3>
                        <p className="app-sub">{sub}</p>
                    </div>
                    <span className="pill">{pill}</span>
                </div>

                <p className="app-desc" data-reveal><Rich text={desc} /></p>

                <dl className="specs" data-reveal>
                    {specs.map(([term, value]) => (
                        <div key={term}>
                            <dt>{term}</dt>
                            <dd><Rich text={value} /></dd>
                        </div>
                    ))}
                </dl>

                <div className="actions" data-reveal>
                    {primary && (
                        <Button label={primary.label} href={primary.href} variant="fill" icon={primaryIcons[primary.icon]} magnetic />
                    )}
                    {links.map(({ label, href, to }) => (
                        <TextLink key={label} href={href} to={to}>{label}</TextLink>
                    ))}
                </div>
            </div>

            <div className="sheet-visual">{children}</div>
        </article>
    )
}

ProductSheet.propTypes = {
    app: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        sub: PropTypes.string.isRequired,
        pill: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        glow: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        specs: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
        primary: PropTypes.shape({ label: PropTypes.string, href: PropTypes.string, icon: PropTypes.string }),
        links: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, href: PropTypes.string, to: PropTypes.string })).isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    children: PropTypes.node
}

export default ProductSheet
