import React from 'react';
import clsx from 'clsx';
import SectionHead from './SectionHead';
import Education from './Education';

const awards = [
    {
        img: '/images/awards/technospark.webp',
        size: 99,
        alt: 'TechnoSpark 2025 prize ceremony',
        date: 'Feb 2025',
        title: '1st Prize, Web Design (W3 Arts)',
        issuer: 'TechnoSpark 2025, State IT Fest',
        description: 'For creativity, technical skill and design in web development.',
        badge: '1st prize'
    },
    {
        img: '/images/awards/techarena.webp',
        size: 176,
        alt: 'TechArena 2025 prize ceremony at Christ College, Rajkot',
        date: 'Feb 2025',
        title: '1st Prize, Quiz Competition',
        issuer: 'TechArena 2025, 5th National IT Fest',
        description: 'For problem-solving, technical knowledge and quick thinking.',
        badge: '1st prize'
    },
    {
        img: '/images/awards/mastermind.webp',
        size: 120,
        alt: 'Computer Mastermind of the Year ceremony',
        date: 'Feb 2025',
        title: 'Computer Mastermind of the Year',
        issuer: 'Christ College, Rajkot',
        description: 'For programming skills and results across tech competitions.',
        badge: 'College award'
    },
    {
        img: '/images/awards/sublato.webp',
        size: 176,
        alt: 'Receiving the Sublato award at Christ College, Rajkot',
        date: 'Mar 2025',
        title: 'Sublato Christ Pinnacle Performance Award',
        issuer: 'Christ College, Rajkot',
        description: 'For outstanding achievements and contributions to the college community.',
        badge: 'College award'
    }
];

const HonorsAndAwards = () => {
    return (
        <section id="recognition" className="section" aria-labelledby="recognition-title">
            <div className="wrap">
                <SectionHead
                    id="recognition-title"
                    label="Recognition"
                    count="2025"
                    title="Four awards in one year."
                    lede="Two first prizes at state and national IT fests, and two awards from Christ College, Rajkot."
                />

                <ul className="awards">
                    {awards.map(({ img, size, alt, date, title, issuer, description, badge }) => (
                        <li className="award" key={title} data-reveal>
                            <img className="aw-thumb" src={img} alt={alt} width={size} height={size} loading="lazy" />
                            <span className="aw-date">{date}</span>
                            <div className="aw-main">
                                <h3 className="aw-title">{title}</h3>
                                <p className="aw-issuer">{issuer}</p>
                                <p className="aw-desc">{description}</p>
                            </div>
                            <span className={clsx('badge', badge === '1st prize' && 'gold')}>{badge}</span>
                        </li>
                    ))}
                </ul>

                <Education />
            </div>
        </section>
    );
};

export default HonorsAndAwards;
