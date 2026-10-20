import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { site } from '../data/site.js'
import Reveal from './Reveal.jsx'

const empty = { name: '', email: '', subject: '', message: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Please enter a valid email address.'
  if (!v.subject.trim()) e.subject = 'Please add a subject.'
  if (v.message.trim().length < 10) e.message = 'Message should be at least 10 characters.'
  return e
}

export default function Contact() {
  const [v, setV] = useState(empty)
  const [err, setErr] = useState({})
  const [done, setDone] = useState(false)
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    const found = validate(v)
    setErr(found)
    if (Object.keys(found).length) { document.getElementById(Object.keys(found)[0])?.focus(); return }
    const body = encodeURIComponent(`Hello Mostafa!\n\nName: ${v.name}\nEmail: ${v.email}\nProject: ${v.subject}\n\nMessage:\n${v.message}`)
    window.open(`https://wa.me/${site.whatsapp}?text=${body}`, '_blank', 'noopener,noreferrer')
    setDone(true)
  }

  const field = (id, label, props = {}) => (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {props.area
        ? <textarea id={id} rows={5} value={v[id]} onChange={set(id)} aria-invalid={!!err[id]} aria-describedby={err[id] ? `${id}-e` : undefined} />
        : <input id={id} type={props.type || 'text'} value={v[id]} onChange={set(id)} aria-invalid={!!err[id]} aria-describedby={err[id] ? `${id}-e` : undefined} />}
      {err[id] && <p className="field__err" id={`${id}-e`} role="alert">{err[id]}</p>}
    </div>
  )

  return (
    <section id="contact" className="section section--alt">
      <div className="container contact">
        <div>
          <Reveal><p className="label">CONTACT</p></Reveal>
          <Reveal as="h2" className="display">Have a project in mind? <em>Let&rsquo;s talk.</em></Reveal>
          <Reveal as="ul" className="contact__links">
            <li><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp: 01119450633</a></li>
          </Reveal>
        </div>
        <Reveal as="form" className="form" onSubmit={submit} noValidate>
          {field('name', 'Name')}
          {field('email', 'Email', { type: 'email' })}
          {field('subject', 'Subject')}
          {field('message', 'Message', { area: true })}
          <button className="btn" type="submit"><MessageCircle size={18} /> Continue on WhatsApp</button>
          <p className="form__note" role="status">
            {done
              ? 'WhatsApp should open with your project details ready to send.'
              : 'This form prepares your message in WhatsApp; no message is sent until you press Send.'}
          </p>
        </Reveal>
      </div>
      <footer className="footer container">&copy; {new Date().getFullYear()} {site.name}</footer>
    </section>
  )
}
