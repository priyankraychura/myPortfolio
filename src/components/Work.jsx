import React from 'react'
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';
import { works } from '../utils/works';

const Work = () => {
    return (
        <section
            id='work'
            className="section"
        >
            <div className="container">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="headline-2 reveal-up">
                        My portfolio highlights
                    </h2>

                    <h3 className="text-sky-400 font-semibold md:text-lg">
                        <Link to={'/all-projects'}>View all</Link>
                    </h3>
                </div>

                <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
                    {
                        works?.slice(0, 6)?.map(({ imgSrc, title, tags, projectLink, githubLink }, key) => (
                            <ProjectCard
                                key={key}
                                imgSrc={imgSrc}
                                title={title}
                                tags={tags}
                                projectLink={projectLink}
                                githubLink={githubLink}
                                classes="reveal-up"
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
export default Work
