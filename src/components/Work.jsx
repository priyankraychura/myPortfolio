import React from 'react'
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';

const works = [
    {
        imgSrc: '/images/project-1.png',
        title: 'Full stack music app',
        tags: ['API', 'MVC', 'Development'],
        projectLink: 'https://musify-5al0.onrender.com/'
    },
    {
        imgSrc: '/images/project-2.jpg',
        title: 'Free stock photo app',
        tags: ['API', 'SPA'],
        projectLink: 'https://pixstock-official.vercel.app/'
    },
    {
        imgSrc: '/images/project-3.jpg',
        title: 'Recipe app',
        tags: ['Development', 'API'],
        projectLink: ''
    },
    {
        imgSrc: '/images/project-4.jpg',
        title: 'Real state website',
        tags: ['Web-design', 'Development'],
        projectLink: 'https://github.com/codewithsadee-org/wealthome'
    },
    {
        imgSrc: '/images/project-5.jpg',
        title: 'eCommerce website',
        tags: ['eCommerce', 'Development'],
        projectLink: 'https://github.com/codewithsadee/anon-ecommerce-website'
    },
    {
        imgSrc: '/images/project-6.jpg',
        title: 'vCard Personal portfolio',
        tags: ['Web-design', 'Development'],
        projectLink: 'https://github.com/codewithsadee/vcard-personal-portfolio'
    },
    {
        imgSrc: '/images/project-6.jpg',
        title: 'vCard Personal portfolio',
        tags: ['Web-design', 'Development'],
        projectLink: 'https://github.com/codewithsadee/vcard-personal-portfolio'
    },
    {
        imgSrc: '/images/project-6.jpg',
        title: 'vCard Personal portfolio',
        tags: ['Web-design', 'Development'],
        projectLink: 'https://github.com/codewithsadee/vcard-personal-portfolio'
    },
];

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
                        works?.slice(0, 6)?.map(({ imgSrc, title, tags, projectLink }, key) => (
                            <ProjectCard
                                key={key}
                                imgSrc={imgSrc}
                                title={title}
                                tags={tags}
                                projectLink={projectLink}
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
