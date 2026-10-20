import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { projects } from '../data/projects.js'
import Reveal from './Reveal.jsx'

function Project({ p, i }) {
  return (
    <Reveal as="article" delay={0.05 * i} className={`project project--${p.size}`}>
      <motion.div className="project__media" whileHover="hover" initial="rest">
        {p.image
          ? <motion.img src={p.image} alt={`${p.name} preview`} loading="lazy" variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }} transition={{ duration: 0.6 }} />
          : <motion.div className="project__ph" style={{ '--h': 245 + i * 25 }} variants={{ rest: { scale: 1 }, hover: { scale: 1.06 } }} transition={{ duration: 0.6 }}><span>{p.name}</span></motion.div>}
      </motion.div>
      <div className="project__body">
        <p className="label">{p.category}</p>
        <h3>{p.name}</h3>
        <p>{p.description}</p>
        <ul className="tags">{p.stack.map((t) => <li key={t}>{t}</li>)}</ul>
        <div className="project__links">
          {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="arrow-link">Live demo <ArrowUpRight size={16} /></a>}
          {p.code && <a href={p.code} target="_blank" rel="noreferrer" className="arrow-link"><Github size={16} /> Source</a>}
        </div>
      </div>
    </Reveal>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section container">
      <Reveal><p className="label">SELECTED WORK</p></Reveal>
      <Reveal as="h2" className="display">Projects</Reveal>
      <div className="projects">{projects.map((p, i) => <Project key={p.name} p={p} i={i} />)}</div>
    </section>
  )
}
