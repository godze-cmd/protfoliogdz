import { site } from '../data/site.js'
import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section id="about" className="section container about">
      <Reveal><p className="label">ABOUT</p></Reveal>
      <div className="about__grid">
        <Reveal as="h2" className="display">Clean code, <em>considered</em> interfaces.</Reveal>
        <div>
          {site.about.map((p, i) => <Reveal as="p" key={i} delay={0.1 * i} className="lead">{p}</Reveal>)}
          <Reveal delay={0.2}>
            <ul className="chips" aria-label="Approach">
              {site.principles.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
        </div>
        <Reveal className="orbit" aria-hidden="true"><span /><span /><span /></Reveal>
      </div>
    </section>
  )
}
