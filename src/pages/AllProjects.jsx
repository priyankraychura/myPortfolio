import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard';

const works = [
  {
    imgSrc: '/images/project-1.png',
    title: 'Web designer portfolio',
    tags: ['HTML & CSS', 'Portfilio'],
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
];

const AllProjects = () => {
  const allTags = ['All', ...new Set(works.flatMap(work => work.tags))];

  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredWorks, setFilteredWorks] = useState(works);

  useEffect(() => {
    if (activeFilter === 'All') {
      setFilteredWorks(works);
    } else {
      const newFilteredWorks = works.filter(work =>
        work.tags.includes(activeFilter)
      );
      setFilteredWorks(newFilteredWorks);
    }
  }, [activeFilter]);

  return (
    <section
      id='work'
      className="section"
    >
      <div className="container-wide">
        {/* <div className="flex items-center justify-between mb-8"> */}
          <h2 className="headline-2 mb-8">
            My Development Journey
          </h2>
        {/* </div> */}

        <div className="flex flex-wrap items-center gap-2 mb-8">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`
                px-4 py-2 text-sm rounded-lg transition-colors
                ${activeFilter === tag
                  ? 'bg-blue-500  text-white border-blue-500'
                  : 'bg-zinc-50/5 text-zinc-400 border-gray-300 hover:bg-blue-400/20 hover:text-white hover:border-blue-400/20'
                }
              `}
            >
              {tag}
            </button>
          ))}
        </div>


        <div className="grid mb-8 gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
          {
            filteredWorks.map(({ imgSrc, title, tags, projectLink }, key) => (
              <ProjectCard
                key={key}
                imgSrc={imgSrc}
                title={title}
                tags={tags}
                projectLink={projectLink}
                classes=""
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default AllProjects
