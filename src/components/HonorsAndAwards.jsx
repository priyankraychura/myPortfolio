import React from 'react';
import PropTypes from 'prop-types';
import { MedalIcon } from './icons';
import useTilt from '../hooks/useTilt';

const awards = [
    {
        date: 'Mar 2025',
        title: 'Sublato Christ Pinnacle Performance Award',
        issuer: 'Christ College, Rajkot',
        description: 'Honored for outstanding achievements and contributions to the college community.',
    },
    {
        date: 'Feb 2025',
        title: 'Computer Mastermind of the Year',
        issuer: 'Christ College, Rajkot',
        description: 'Acknowledged for programming skills and achievements in various tech competitions.',
    },
    {
        date: 'Feb 2025',
        title: '1st Prize, Quiz Competition',
        issuer: 'TechArena National IT Fest 2025',
        description: 'Awarded for excellence in problem-solving, technical knowledge and quick thinking.',
    },
    {
        date: 'Feb 2025',
        title: '1st Prize, Web Design (W3 Arts)',
        issuer: 'TechnoSpark State IT Fest 2025',
        description: 'Recognized for creativity, technical skills and design expertise in web development.',
    },
];

function AwardCard({ date, title, issuer, description }) {
    const tiltRef = useTilt(10);
    return (
        <div ref={tiltRef} className="rd-award rd-tilt">
            <div className="rd-award-top"><span className="rd-award-date">{date}</span><MedalIcon /></div>
            <h3>{title}</h3>
            <p className="rd-award-issuer">{issuer}</p>
            <p className="rd-award-desc">{description}</p>
            <span className="rd-glare" aria-hidden="true"></span>
        </div>
    );
}

AwardCard.propTypes = {
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    issuer: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

const HonorsAndAwards = () => {
    return (
        <section id="awards" className="rd-section" aria-labelledby="awards-title">
            <div className="rd-wrap">
                <header className="rd-head rd-reveal">
                    <p className="rd-eyebrow">Recognition</p>
                    <h2 id="awards-title">Honors &amp; awards</h2>
                    <p className="rd-lede">Four recognitions in 2025, from college honors to first prizes at state and national IT fests.</p>
                </header>
                <ul className="rd-awards">
                    {awards.map((award, i) => (
                        <li key={award.title} className="rd-reveal" style={{ '--d': `${i * 90}ms` }}>
                            <AwardCard {...award} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default HonorsAndAwards;
