import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { site } from '../data/site.js'

const links = [['about', 'About'], ['services', 'Services'], ['projects', 'Projects'], ['skills', 'Skills'], ['process', 'Process']]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#top" className="nav__logo">{site.name}<span>.</span></a>
        <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
          {links.map(([id, label]) => (
            <motion.a key={id} href={`#${id}`} whileHover={{ y: -2 }} onClick={() => setOpen(false)}>{label}</motion.a>
          ))}
          <a href="#contact" className="btn btn--sm" onClick={() => setOpen(false)}>Let&rsquo;s Talk</a>
        </nav>
        <button className="nav__toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
