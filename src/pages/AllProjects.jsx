import React, { useEffect, useMemo, useRef, useState } from 'react'
import ProjectCard from '../components/ProjectCard';
import SceneBackground from '../components/SceneBackground';
import Footer from '../components/Footer';
import useReveal from '../hooks/useReveal';
import { works } from '../utils/works';

const allTags = ['All', ...new Set(works.flatMap(work => work.tags))];

const AllProjects = () => {
  const pageRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('All');
  useReveal(pageRef);

  useEffect(() => {
    document.title = 'All projects | Priyank Raychura';
    return () => { document.title = 'Priyank Raychura - Portfolio'; };
  }, []);

  const filteredWorks = useMemo(
    () => (activeFilter === 'All' ? works : works.filter(work => work.tags.includes(activeFilter))),
    [activeFilter]
  );
  const countFor = (tag) => (tag === 'All' ? works.length : works.filter(work => work.tags.includes(tag)).length);

  return (
    <div className="rd-page" ref={pageRef}>
      <SceneBackground />
      <main>
        <section id="work" className="rd-section rd-section--page" aria-labelledby="projects-title">
          <div className="rd-wrap">
            <header className="rd-head rd-reveal">
              <p className="rd-eyebrow">All projects</p>
              <h1 id="projects-title" className="rd-page-title">My development journey</h1>
              <p className="rd-lede">
                {works.length} websites and web apps, from CSS landing pages to JavaScript tools and React projects. Filter by technology or type.
              </p>
            </header>

            <div className="rd-filters" role="group" aria-label="Filter projects">
              {allTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveFilter(tag)}
                  className={'rd-filter' + (activeFilter === tag ? ' is-active' : '')}
                  aria-pressed={activeFilter === tag}
                >
                  {tag} <span className="rd-filter-count">{countFor(tag)}</span>
                </button>
              ))}
            </div>

            <p className="rd-results" aria-live="polite">
              Showing {filteredWorks.length} {filteredWorks.length === 1 ? 'project' : 'projects'}
              {activeFilter !== 'All' && <> tagged <strong>{activeFilter}</strong></>}
            </p>

            <div className="rd-work-grid">
              {filteredWorks.map(({ imgSrc, title, tags, projectLink, githubLink }) => (
                <ProjectCard
                  key={imgSrc}
                  imgSrc={imgSrc}
                  title={title}
                  tags={tags}
                  projectLink={projectLink}
                  githubLink={githubLink}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default AllProjects
