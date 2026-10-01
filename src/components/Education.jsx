import React from 'react';

const educationData = [
    {
        year: '2025 – 2027',
        title: 'M.Sc. Information Technology',
        institution: 'Grace College, Rajkot',
        university: 'Saurashtra University',
        result: 'Pursuing',
        current: true
    },
    {
        year: '2022 – 2025',
        title: 'Bachelor of Computer Applications',
        institution: 'Christ College, Rajkot',
        university: 'Saurashtra University',
        result: 'PR 83.17%'
    },
    {
        year: '2019 – 2022',
        title: 'Bachelor of Commerce',
        institution: 'Sydenham College of Commerce & Economics',
        university: 'Dr. Homi Bhabha State University',
        result: 'CGPA 8.39'
    },
    {
        year: '2018 – 2019',
        title: 'Higher Secondary (12th)',
        institution: 'Shree L.D.P. Highschool',
        university: 'GHSEB, Gujarat',
        result: 'PR 80.86'
    },
    {
        year: '2016 – 2017',
        title: 'Secondary (10th)',
        institution: 'Shree L.N.P. Highschool',
        university: 'GSEB, Gujarat',
        result: 'PR 74.67'
    }
];

const Education = () => {
    return (
        <section id="education" className="rd-section" aria-labelledby="education-title">
            <div className="rd-wrap rd-split">
                <header className="rd-head rd-reveal">
                    <p className="rd-eyebrow">Education</p>
                    <h2 id="education-title">Commerce first, then code</h2>
                    <p className="rd-lede">A commerce degree, then computer applications. Now completing a master&apos;s in IT at Saurashtra University.</p>
                </header>
                <ol className="rd-timeline">
                    {educationData.map(({ year, title, institution, university, result, current }, i) => (
                        <li key={year} className={'rd-tl-item rd-reveal' + (current ? ' is-current' : '')} style={{ '--d': `${i * 70}ms` }}>
                            <span className="rd-tl-year">{year}</span>
                            <div className="rd-tl-body">
                                <h3>{title}</h3>
                                <p>{institution} · {university}</p>
                            </div>
                            <span className={'rd-result' + (current ? ' rd-result--live' : '')}>{result}</span>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default Education;
