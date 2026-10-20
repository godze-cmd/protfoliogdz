import { skills } from '../data/site.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'

export default function Skills() {
  return (
    <section id="skills" className="section section--alt">
      <div className="container">
        <Reveal><p className="label">SKILLS</p></Reveal>
        <Reveal as="h2" className="display">Tools of the <em>craft</em>.</Reveal>
        <div className="skills">
          {skills.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05} className="skill">
              <Icon name={s.icon} />
              <h3>{s.title}</h3>
              <ul className="tags">{s.items.map((t) => <li key={t}>{t}</li>)}</ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
