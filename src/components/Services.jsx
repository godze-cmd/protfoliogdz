import { motion } from 'framer-motion'
import { services } from '../data/site.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'

export default function Services() {
  return (
    <section id="services" className="section container">
      <Reveal><p className="label">SERVICES</p></Reveal>
      <Reveal as="h2" className="display">What I can <em>build</em> for you.</Reveal>
      <ul className="services">
        {services.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 0.06} className={`service ${i % 4 === 0 ? 'service--wide' : ''}`}>
            <motion.div whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <span className="service__num">0{i + 1}</span>
              <span className="service__icon"><Icon name={s.icon} /></span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </motion.div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
