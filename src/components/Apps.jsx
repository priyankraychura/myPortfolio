import React from 'react'
import AppCard from './AppCard';
import { apps } from '../utils/works'

const Apps = () => {
    return (
        <section
            id='apps'
            className="section"
        >
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="headline-2 reveal-up">
                        My App Developments
                    </h2>
                </div>

                <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {
                        apps.map(({ imgSrc, title, tags, playStoreLink, plolicyLink }, key) => (
                            <AppCard
                                key={key}
                                imgSrc={imgSrc}
                                title={title}
                                tags={tags}
                                playStoreLink={playStoreLink}
                                plolicyLink={plolicyLink}
                                classes="reveal-up"
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Apps