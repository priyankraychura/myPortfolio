import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, Globe, Mail } from './icons';

const PrivacyPolicyTemplate = ({ data }) => {
  if (!data) return null;

  const { appName, lastUpdated, sections, contact } = data;

  return (
    <article className="section page-top">
      <div className="wrap">
        <div className="policy">

          {/* Header */}
          <header>
            <span className="eyebrow">Privacy policy</span>
            <h1 className="page-title">
              Privacy Policy for <span className="text-cobalt">{appName}</span>
            </h1>
            <p className="policy-date">
              <Calendar />
              <span>Last Updated: <b>{lastUpdated}</b></span>
            </p>
          </header>

          {/* Sections */}
          <div className="policy-body">
            {sections.map((section) => (
              <section key={section.id} className="policy-section">
                <h2>
                  <span className="policy-num">{section.id}.</span>
                  {section.title}
                </h2>

                {/* Main Description */}
                {section.description && <p>{section.description}</p>}

                {/* Bullet Points */}
                {section.points && section.points.length > 0 && (
                  <ul className="policy-points">
                    {section.points.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}

                {/* Sub-sections (e.g., Local Storage) */}
                {section.subSections && section.subSections.length > 0 && (
                  <div className="policy-subs">
                    {section.subSections.map((sub, index) => (
                      <div key={index} className="policy-sub">
                        <h3>{sub.title}:</h3>
                        <p>{sub.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Closing Description */}
                {section.closingDescription && <p>{section.closingDescription}</p>}
              </section>
            ))}

            {/* Contact Section */}
            {contact && (
              <section className="policy-section">
                <h2>
                  <span className="policy-num">{sections.length + 1}.</span>
                  Contact Us
                </h2>
                <p>{contact.text}</p>

                <div className="policy-contact">
                  {contact.email && (
                    <div className="contact-tile">
                      <Mail />
                      <div>
                        <span className="eyebrow">Email</span>
                        <a href={`mailto:${contact.email}`} className="inline-link">{contact.email}</a>
                      </div>
                    </div>
                  )}

                  {contact.website && (
                    <div className="contact-tile">
                      <Globe />
                      <div>
                        <span className="eyebrow">Website</span>
                        <a href={contact.website} target="_blank" rel="noopener noreferrer" className="inline-link">{contact.website}</a>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </article>
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
