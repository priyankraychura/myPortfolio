import React from 'react';
import PropTypes from 'prop-types';

const PrivacyPolicyTemplate = ({ data }) => {
  if (!data) return null;

  const { appName, lastUpdated, sections, contact } = data;

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-300 font-sans selection:bg-sky-400/20 pt-20 lg:pt-32">
      <div className="container max-w-4xl mx-auto px-4 pb-20">
        
        {/* Header */}
        <header className="mb-8 border-b border-zinc-800 pb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-50 mb-4">
            Privacy Policy for <span className="text-sky-400">{appName}</span>
          </h1>
          <div className="flex items-center gap-2 text-sm md:text-base text-zinc-400">
            <span className="material-symbols-rounded text-sky-400" aria-hidden="true">calendar_month</span>
            <p>Last Updated: <span className="text-zinc-200 font-medium">{lastUpdated}</span></p>
          </div>
        </header>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.id}>
              <h2 className="text-xl md:text-2xl font-semibold text-zinc-100 mb-4 flex items-baseline gap-3">
                <span className="text-sky-400/50 font-mono text-lg">{section.id}.</span>
                {section.title}
              </h2>
              
              {/* Main Description */}
              {section.description && (
                <div className="text-zinc-400 leading-relaxed whitespace-pre-wrap mb-4">
                  {section.description}
                </div>
              )}

              {/* Bullet Points */}
              {section.points && section.points.length > 0 && (
                <ul className="list-disc list-outside ml-6 space-y-2 mb-4 text-zinc-400 marker:text-sky-400">
                  {section.points.map((point, index) => (
                    <li key={index} className="pl-1">
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {/* Sub-sections (e.g., Local Storage) */}
              {section.subSections && section.subSections.length > 0 && (
                <div className="space-y-4 mt-6 pl-4 md:pl-6 border-l-2 border-zinc-800">
                  {section.subSections.map((sub, index) => (
                    <div key={index}>
                      <h3 className="text-zinc-200 font-semibold mb-1">
                        {sub.title}:
                      </h3>
                      <p className="text-zinc-400 leading-relaxed">
                        {sub.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Closing Description */}
              {section.closingDescription && (
                <p className="text-zinc-400 leading-relaxed mt-4">
                  {section.closingDescription}
                </p>
              )}
            </section>
          ))}

          {/* Contact Section */}
          {contact && (
            <section className="pt-8 border-t border-zinc-800">
              <h2 className="text-xl md:text-2xl font-semibold text-zinc-100 mb-4 flex items-baseline gap-3">
                <span className="text-sky-400/50 font-mono text-lg">{sections.length + 1}.</span>
                Contact Us
              </h2>
              <p className="text-zinc-400 mb-6">{contact.text}</p>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {contact.email && (
                  <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex items-center gap-3">
                    <span className="material-symbols-rounded text-zinc-400">mail</span>
                    <div>
                      <span className="block text-xs text-zinc-500 uppercase tracking-wider font-semibold">Email</span>
                      <a href={`mailto:${contact.email}`} className="text-sky-400 hover:text-sky-300 transition-colors">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}
                
                {contact.website && (
                  <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 flex items-center gap-3">
                    <span className="material-symbols-rounded text-zinc-400">language</span>
                    <div>
                      <span className="block text-xs text-zinc-500 uppercase tracking-wider font-semibold">Website</span>
                      <a href={contact.website} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 transition-colors">
                        {contact.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
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