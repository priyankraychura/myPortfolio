import React from 'react';
import AwardCard from './AwardCard';

const awards = [
    {
        imgSrc: '/images/Mastermind.jpg',
        title: 'Computer Mastermind of the Year',
        date: 'February 2025',
        issuer: 'Christ College, Rajkot',
        description: 'Acknowledged for programming skills and achievements in various tech competitions.',
    },
    {
        imgSrc: '/images/Sublato.jpg',
        // Title is now cleaner
        title: 'Sublato Christ Pinnacle Performance Award',
        date: 'March 2025',
        issuer: 'Christ College, Rajkot',
        description: 'Honored for outstanding achievements and contributions to the college community.',
    },
    {
        imgSrc: '/images/TechArena.jpg',
        title: '1st Prize – Quiz Competition',
        date: 'February 2025',
        issuer: 'TechArena National IT Fest 2025',
        description: 'Awarded for excellence in problem-solving, technical knowledge, and quick thinking.',
    },
    {
        imgSrc: '/images/TechnoSpark.jpg',
        title: '1st Prize – Web Design (W3 Arts)',
        date: 'February 2025',
        issuer: 'TechnoSpark State IT Fest 2025',
        description: 'Recognized for creativity, technical skills, and design expertise in web development.',
    },
];

const HonorsAndAwards = () => {
    return (
        <section id="awards" className="section">
            <div className="container">
                <h2 className="headline-2 text-center mb-12 reveal-up">Honors & Awards</h2>

                {/* <-- Use a responsive grid with spacing (gap) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {awards.map(({ imgSrc, title, date, issuer, description }, key) => (
                        <AwardCard
                            key={key}
                            imgSrc={imgSrc}
                            title={title}
                            date={date}
                            issuer={issuer}
                            description={description}
                        //   classes="reveal-up"
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default HonorsAndAwards;