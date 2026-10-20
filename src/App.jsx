import Background3D from './components/Background3D.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Projects from './components/Projects.jsx'
import Skills from './components/Skills.jsx'
import Process from './components/Process.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <>
      <Background3D />
      <Nav />
      <main>
        <Hero /><About /><Services /><Projects /><Skills /><Process /><Contact />
      </main>
    </>
  )
}
