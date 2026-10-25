import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Lock, Shield } from './icons'
import useTheme from '../hooks/useTheme'

// Cloak's main screen in a Windows-style frame. Shows the site's theme until the visitor picks one.
const CloakWindow = ({ chips = true }) => {
    const { theme } = useTheme()
    const [picked, setPicked] = useState(null)
    const mode = picked ?? theme

    return (
        <div className="cloak-stage" data-reveal>
            <figure className="win" data-mode={mode}>
                <div className="win-bar">
                    <img src="/appIcons/cloak.webp" alt="" width="14" height="14" />
                    <span>Cloak</span>
                    <span className="win-ctrl" aria-hidden="true"><i className="min"></i><i className="max"></i><i className="cls"></i></span>
                </div>
                <div className="win-body">
                    <img className="shot-dark" src="/apps/folder-locker/11_items_dark.webp" alt="Cloak's protected items screen in dark mode, listing locked, unlocked and hidden folders" width="1280" height="800" loading="lazy" />
                    <img className="shot-light" src="/apps/folder-locker/05_items.webp" alt="The same protected items screen in light mode" width="1280" height="800" loading="lazy" />
                </div>
            </figure>

            {chips && (
                <>
                    <span className="float-chip fc-a"><Lock />XChaCha20-Poly1305</span>
                    <span className="float-chip fc-b"><Shield />No account, cloud or telemetry</span>
                </>
            )}

            <div className="seg" role="group" aria-label="Screenshot theme">
                {['dark', 'light'].map((option) => (
                    <button key={option} type="button" aria-pressed={mode === option} onClick={() => setPicked(option)}>
                        {option === 'dark' ? 'Dark' : 'Light'}
                    </button>
                ))}
            </div>
        </div>
    )
}

CloakWindow.propTypes = { chips: PropTypes.bool }

export default CloakWindow
