import React from 'react'

// invert: logos drawn in white, flipped to dark on the light theme
const stack = [
  {
    group: 'Web front end',
    tools: [
      { label: 'HTML', icon: '/images/html5.svg' },
      { label: 'CSS', icon: '/images/css3.svg' },
      { label: 'JavaScript', icon: '/images/javascript.svg' },
      { label: 'React', icon: '/images/react.svg' },
      { label: 'Tailwind CSS', icon: '/images/tailwindcss.svg' },
      { label: 'Bootstrap', icon: '/images/bootstrap.svg' }
    ]
  },
  {
    group: 'Back end & data',
    tools: [
      { label: 'Node.js', icon: '/images/nodejs.svg' },
      { label: 'Express', icon: '/images/expressjs.svg', invert: true },
      { label: 'Django', icon: '/images/django.svg' },
      { label: 'Python', icon: '/images/python.svg' },
      { label: 'PHP', icon: '/images/php.svg' },
      { label: 'Java', icon: '/images/java.svg' },
      { label: 'MongoDB', icon: '/images/mongodb.svg' },
      { label: 'MySQL', icon: '/images/mysql.svg' }
    ]
  },
  {
    group: 'Apps',
    tools: [
      { label: 'Flutter', icon: '/images/flutter.svg' },
      { label: 'Dart', icon: '/images/dart.png' },
      { label: 'Rust', monogram: 'Rs' },
      { label: 'React Native', icon: '/images/react.svg' }
    ]
  },
  {
    group: 'Workflow',
    tools: [
      { label: 'GitHub', icon: '/images/github.svg' },
      { label: 'Figma', icon: '/images/figma.svg' }
    ]
  }
];

const Skill = () => {
  return (
    <div className="stack">
      {stack.map(({ group, tools }) => (
        <div key={group} data-reveal>
          <h3>{group}</h3>
          <ul className="tools">
            {tools.map(({ label, icon, invert, monogram }) => (
              <li className="tool" key={label}>
                {icon
                  ? <img className={invert ? 'inv' : undefined} src={icon} alt="" width="22" height="22" loading="lazy" />
                  : <span className="mono" aria-hidden="true">{monogram}</span>}
                {label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Skill
