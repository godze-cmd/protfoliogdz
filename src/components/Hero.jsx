import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, MessageCircle, ChevronDown } from 'lucide-react'
import { site } from '../data/site.js'

const line = { hidden: { y: '110%' }, show: { y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } }
const wrap = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }
const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }

export default function Hero() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 600], [0, 80])
  const o = useTransform(scrollY, [0, 500], [1, 0])
  return (
    <section id="top" className="hero">
      <motion.div className="hero__content container" style={{ y, opacity: o }} variants={wrap} initial="hidden" animate="show">
        <motion.img className="hero__portrait" src="/images/profile.png" alt="Portrait of Mostafa Mohamed Khalil" variants={fade} />
        <motion.p className="label" variants={fade}>{site.role.toUpperCase()}</motion.p>
        <h1 className="hero__title" aria-label={site.heroTitle.join(' ')}>
          {site.heroTitle.map((t, i) => (
            <span className="mask" key={t} aria-hidden="true">
              <motion.span variants={line} className={i === 2 ? 'accent' : ''}>{t}</motion.span>
            </span>
          ))}
        </h1>
        <motion.p className="hero__intro" variants={fade}>{site.heroIntro}</motion.p>
        <motion.div className="hero__cta" variants={fade}>
          <motion.a href="#projects" className="btn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            View My Projects <ArrowRight size={18} />
          </motion.a>
          <motion.a href="#contact" className="btn btn--ghost" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            Let&rsquo;s Talk
          </motion.a>
        </motion.div>
        <motion.div className="hero__meta" variants={fade}>
          <span className="avail"><i /> {site.availabilityText}</span>
          <span className="socials">
            <a href={`https://wa.me/${site.whatsapp}`} aria-label="Contact on WhatsApp" target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
          </span>
        </motion.div>
      </motion.div>
      <a href="#about" className="scrollcue" aria-label="Scroll to about section">
        <span>Scroll</span><motion.i animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}><ChevronDown size={16} /></motion.i>
      </a>
    </section>
  )
}
