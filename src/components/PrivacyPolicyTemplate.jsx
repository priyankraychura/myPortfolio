import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SceneBackground from './SceneBackground';
import Footer from './Footer';
import useReveal from '../hooks/useReveal';
import { ArrowUpRight } from './icons';

const appIcons = {
  pushtimarg: '/appIcons/pushtimarg.png',
  cloak: '/appIcons/folder-locker.png',
  airkey: '/appIcons/airkey.png',
};

const sectionId = (id) => `section-${id}`;

const PrivacyPolicyTemplate = ({ data }) => {
  const pageRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  useReveal(pageRef);

  const { appName, lastUpdated, sections, contact } = data || {};

  useEffect(() => {
    if (!appName) return undefined;
    document.title = `Privacy Policy for ${appName} | Priyank Raychura`;
    return () => { document.title = 'Priyank Raychura - Portfolio'; };
  }, [appName]);

  // Highlight the section being read in the contents list
  useEffect(() => {
    if (!sections) return undefined;
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActiveId(entry.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    pageRef.current?.querySelectorAll('.rd-policy-section').forEach((el) => spy.observe(el));
    return () => spy.disconnect();
  }, [sections]);

  if (!data) return null;

  const icon = appIcons[appName.toLowerCase()];
  const toc = [
    ...sections.map((s) => ({ id: sectionId(s.id), label: s.title, n: s.id })),
    ...(contact ? [{ id: 'section-contact', label: 'Contact Us', n: sections.length + 1 }] : []),
  ];

  return (
    <div className="rd-page" ref={pageRef}>
      <SceneBackground />
      <main>
        <section className="rd-section rd-section--page">
          <div className="rd-wrap">
            <header className="rd-policy-head rd-reveal">
              {icon && <img className="rd-app-icon" src={icon} alt="" width="64" height="64" />}
              <div>
                <p className="rd-eyebrow">Privacy policy</p>
                <h1 className="rd-page-title">Privacy Policy for <span className="rd-grad">{appName}</span></h1>
                <p className="rd-policy-date">Last Updated: <time>{lastUpdated}</time></p>
              </div>
            </header>

            <div className="rd-policy-layout">
              <nav className="rd-policy-toc" aria-label="On this page">
                <p className="rd-policy-toc-title">On this page</p>
                <ol>
                  {toc.map(({ id, label, n }) => (
                    <li key={id}>
                      <a href={`#${id}`} className={activeId === id ? 'is-active' : ''}>
                        <span>{String(n).padStart(2, '0')}</span>{label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="rd-policy-body">
                {sections.map((section) => (
                  <section key={section.id} id={sectionId(section.id)} className="rd-policy-section rd-reveal">
                    <h2><span className="rd-policy-num">{String(section.id).padStart(2, '0')}</span>{section.title}</h2>

                    {section.description && <p className="rd-policy-text">{section.description}</p>}

                    {section.points?.length > 0 && (
                      <ul className="rd-policy-points">
                        {section.points.map((point, index) => <li key={index}>{point}</li>)}
                      </ul>
                    )}

                    {section.subSections?.length > 0 && (
                      <div className="rd-policy-subs">
                        {section.subSections.map((sub, index) => (
                          <div key={index} className="rd-policy-sub">
                            <h3>{sub.title}</h3>
                            <p>{sub.content}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {section.closingDescription && <p className="rd-policy-text">{section.closingDescription}</p>}
                  </section>
                ))}

                {contact && (
                  <section id="section-contact" className="rd-policy-section rd-reveal">
                    <h2><span className="rd-policy-num">{String(sections.length + 1).padStart(2, '0')}</span>Contact Us</h2>
                    <p className="rd-policy-text">{contact.text}</p>
                    <div className="rd-policy-contact">
                      {contact.email && (
                        <div>
                          <span className="rd-email-label">Email</span>
                          <a href={`mailto:${contact.email}`} className="rd-inline-link">{contact.email}</a>
                        </div>
                      )}
                      {contact.website && (
                        <div>
                          <span className="rd-email-label">Website</span>
                          <a href={contact.website} target="_blank" rel="noopener noreferrer" className="rd-inline-link">{contact.website}</a>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                <Link to="/#products" className="rd-link rd-policy-back">Back to all apps <ArrowUpRight /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

PrivacyPolicyTemplate.propTypes = {
  data: PropTypes.shape({
    appName: PropTypes.string.isRequired,
    lastUpdated: PropTypes.string.isRequired,
    sections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        points: PropTypes.arrayOf(PropTypes.string),
        subSections: PropTypes.arrayOf(
          PropTypes.shape({
            title: PropTypes.string,
            content: PropTypes.string,
          })
        ),
        closingDescription: PropTypes.string,
      })
    ).isRequired,
    contact: PropTypes.shape({
      text: PropTypes.string,
      email: PropTypes.string,
      website: PropTypes.string,
    }),
  }).isRequired,
};

export default PrivacyPolicyTemplate;
