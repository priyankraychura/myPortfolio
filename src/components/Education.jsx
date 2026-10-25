import React, { useRef } from 'react';
import clsx from 'clsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SplitWords } from './SplitText';
import { motion } from '../utils/motion';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const educationData = [
    {
        year: '2025 – 2027',
        title: 'MSc Information Technology',
        place: 'Grace College, Rajkot · Saurashtra University',
        result: 'In progress',
        current: true
    },
    {
        year: '2022 – 2025',
        title: 'Bachelor of Computer Applications',
        place: 'Christ College, Rajkot · Saurashtra University',
        result: 'PR 83.17'
    },
    {
        year: '2019 – 2022',
        title: 'Bachelor of Commerce',
        place: 'Sydenham College of Commerce & Economics · Dr. Homi Bhabha State University',
        result: 'CGPA 8.39'
    },
    {
        year: '2018 – 2019',
        title: 'Higher Secondary (12th)',
        place: 'Shree L.D.P. Highschool · GHSEB, Gujarat',
        result: 'PR 80.86'
    },
    {
        year: '2016 – 2017',
        title: 'Secondary (10th)',
        place: 'Shree L.N.P. Highschool · GSEB, Gujarat',
        result: 'PR 74.67'
    }
];

const Education = () => {
    const ref = useRef(null);

    // the line fills as you scroll, and each dot lights up as the line reaches it
    useGSAP(() => {
        if (!motion) return;
        const timeline = ref.current.querySelector('.timeline');
        gsap.fromTo(timeline, { '--tp': 0 }, {
            '--tp': 1,
            ease: 'none',
            scrollTrigger: { trigger: timeline, start: 'top 72%', end: 'bottom 62%', scrub: 0.5 }
        });
        gsap.utils.toArray('.tl-item', timeline).forEach((item) => {
            ScrollTrigger.create({
                trigger: item,
                start: 'top 72%',
                onEnter: () => item.classList.add('is-lit'),
                onLeaveBack: () => item.classList.remove('is-lit')
            });
        });
    }, { scope: ref });

    return (
        <div className="edu" ref={ref}>
            <div>
                <h3 className="edu-title" data-split><SplitWords text="Education" /></h3>
                <p className="edu-sub" data-reveal>Now studying for an MSc in Information Technology at Grace College, Rajkot.</p>
            </div>

            <ol className={clsx('timeline', motion && 'tl-anim')}>
                {educationData.map(({ year, title, place, result, current }) => (
                    <li className={clsx('tl-item', current && 'is-current')} key={year} data-reveal>
                        <span className="tl-dot" aria-hidden="true"></span>
                        <span className="tl-years">{year}</span>
                        <h4 className="tl-title">{title}</h4>
                        <p className="tl-place">{place}</p>
                        <span className={clsx('badge', current && 'now')}>{result}</span>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Education;
