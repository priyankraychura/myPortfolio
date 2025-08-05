import React from 'react'
import SkillCard from './SkillCard';

const skillItem = [
  {
    imgSrc: '/images/html5.svg',
    label: 'HTML',
    desc: 'Web Structure'
  },
  {
    imgSrc: '/images/css3.svg',
    label: 'CSS',
    desc: 'User Interface'
  },
  {
    imgSrc: '/images/javascript.svg',
    label: 'JavaScript',
    desc: 'Interaction'
  },
  {
    imgSrc: '/images/bootstrap.svg',
    label: 'Bootstrap',
    desc: 'CSS Framework'
  },
  {
    imgSrc: '/images/react.svg',
    label: 'React',
    desc: 'Framework'
  },
  {
    imgSrc: '/images/nodejs.svg',
    label: 'NodeJS',
    desc: 'Web Server'
  },
  {
    imgSrc: '/images/expressjs.svg',
    label: 'ExpressJS',
    desc: 'Node Framework'
  },
  {
    imgSrc: '/images/mongodb.svg',
    label: 'MongoDB',
    desc: 'Document Database'
  },
  {
    imgSrc: '/images/php.svg',
    label: 'PHP',
    desc: 'Server-side scripting'
  },
  {
    imgSrc: '/images/mysql.svg',
    label: 'MySQL',
    desc: 'Relational Database'
  },
  {
    imgSrc: '/images/python.svg',
    label: 'python',
    desc: 'Programming Language'
  },
  {
    imgSrc: '/images/django.svg',
    label: 'Django',
    desc: 'Python Framework'
  },
  {
    imgSrc: '/images/java.svg',
    label: 'Java',
    desc: 'Programming Language'
  },
  {
    imgSrc: '/images/tailwindcss.svg',
    label: 'TailwindCSS',
    desc: 'User Interface'
  },
  {
    imgSrc: '/images/github.svg',
    label: 'GitHub',
    desc: 'Version Control'
  },
  {
    imgSrc: '/images/figma.svg',
    label: 'Figma',
    desc: 'Design tool'
  },
];

const Skill = () => {
  return (
    <section className="section">
      <div className="container">
        <h2 className="headline-2 reveal-up">
          Essential Tools I use
        </h2>

        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch] reveal-up">
          Discover the powerful tools and technologies I use to create exceptional, high-performing websites & applications.
        </p>

        <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
          {
            skillItem.map(({ imgSrc, label, desc }, key) => (
              <SkillCard
                key={key}
                imgSrc={imgSrc}
                label={label}
                desc={desc}
                classes="reveal-up"
              />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Skill
