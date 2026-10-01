import React from 'react'
import TechGlobe from './TechGlobe'

const layers = [
  { name: 'Interface', tools: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap'] },
  { name: 'Server', tools: ['Node.js', 'Express', 'PHP', 'Python', 'Django', 'Java'] },
  { name: 'Data', tools: ['MongoDB', 'MySQL'] },
  { name: 'Native apps', tools: ['Flutter', 'Rust', 'React Native'] },
  { name: 'Workflow', tools: ['GitHub', 'Figma'] },
];

const icons = {
  'HTML': '/images/html5.svg',
  'CSS': '/images/css3.svg',
  'JavaScript': '/images/javascript.svg',
  'React': '/images/react.svg',
  'Tailwind CSS': '/images/tailwindcss.svg',
  'Bootstrap': '/images/bootstrap.svg',
  'Node.js': '/images/nodejs.svg',
  'Express': '/images/expressjs.svg',
  'PHP': '/images/php.svg',
  'Python': '/images/python.svg',
  'Django': '/images/django.svg',
  'Java': '/images/java.svg',
  'MongoDB': '/images/mongodb.svg',
  'MySQL': '/images/mysql.svg',
  'Flutter': '/images/flutter.svg',
  'React Native': '/images/react.svg',
  'GitHub': '/images/github.svg',
  'Figma': '/images/figma.svg',
};

const globeItems = layers.flatMap(({ tools }) => tools).map((label) => ({ label, icon: icons[label] }));

const Skill = () => {
  return (
    <section id="stack" className="rd-section" aria-labelledby="stack-title">
      <div className="rd-wrap rd-split">
        <header className="rd-head">
          <p className="rd-eyebrow">Stack</p>
          <h2 id="stack-title">Tools I build with</h2>
          <p className="rd-lede">The languages, frameworks and services behind my websites and apps, from the interface down to the data.</p>
          <TechGlobe items={globeItems} />
        </header>
        <div className="rd-stack">
          {layers.map(({ name, tools }) => (
            <div className="rd-layer" key={name}>
              <p className="rd-layer-name">{name}</p>
              <ul className="rd-chips">
                {tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skill
