import React from 'react'
import SectionHead from './SectionHead'
import Gallery from './Gallery'
import ProjectArchive from './ProjectArchive'
import { works } from '../utils/works'

const Work = () => {
    return (
        <section className="section" id="work" aria-labelledby="work-title">
            <div className="wrap">
                <SectionHead
                    id="work-title"
                    label="Web"
                    count={`${works.length} projects`}
                    title="Websites, from landing pages to full-stack apps."
                    lede="Built with React, Django, JavaScript, Bootstrap and plain CSS. Six favourites first, then everything else."
                />
            </div>

            <Gallery />
            <ProjectArchive id="archive" limit={10} />
        </section>
    )
}

export default Work
