import React from 'react';
import TimelineItem from './TimelineItem';

const educationData = [
    {
        year: '2025 - 2027',
        title: 'Master of Science in Information Technology',
        institution: 'Grace College, Rajkot',
        university: 'Saurashtra University',
        percentage: 'Pursuing'
    },
    {
        year: '2022 - 2025',
        title: 'Bachelor of Computer Applications (BCA)',
        institution: 'Christ College, Rajkot',
        university: 'Saurashtra University',
        percentage: 'PR: 83.17%'
    },
    {
        year: '2019 - 2022',
        title: 'Bachelor of Commerce (B.Com)',
        institution: 'Sydenham College of Commerce & Economics',
        university: 'Dr. Homi Bhabha State University',
        percentage: 'CGPA: 8.39'
    },
    {
        year: '2018 - 2019',
        title: 'Higher Secondary (12th Grade)',
        institution: 'Shree L.D.P. Highschool',
        university: 'GHSEB, Gujarat',
        percentage: 'PR: 80.86'
    },
    {
        year: '2016 - 2017',
        title: 'Secondary (10th Grade)',
        institution: 'Shree L.N.P. Highschool',
        university: 'GSEB, Gujarat',
        percentage: 'PR: 74.67'
    }
];

const Education = () => {
    return (
        <section id="education" className="section">
            <div className="container">
                <h2 className="headline-2 reveal-up mb-8">
                    My Education
                </h2>

                <div className="relative">
                    {educationData.map((item, index) => (
                        <TimelineItem
                            key={index}
                            year={item.year}
                            title={item.title}
                            institution={item.institution}
                            university={item.university}
                            percentage={item.percentage}
                            isLast={index === educationData.length - 1}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;