import { process } from '../data/site.js'
import Reveal from './Reveal.jsx'

export default function Process() {
  return (
    <section id="process" className="section container">
      <Reveal><p className="label">PROCESS</p></Reveal>
      <Reveal as="h2" className="display">How we&rsquo;ll <em>work</em> together.</Reveal>
      <ol className="steps">
        {process.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.1} className="step">
            <span className="step__n">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
