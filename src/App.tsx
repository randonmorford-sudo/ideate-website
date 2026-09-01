import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Problem } from './components/Problem'
import { HowItWorks } from './components/HowItWorks'
import { Inquiry } from './components/Inquiry'
import { Workspace } from './components/Workspace'
import { WhyIdeate } from './components/WhyIdeate'
import { Builder } from './components/Builder'
import { BetaSignup } from './components/BetaSignup'
import { Footer } from './components/Footer'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((open) => !open)}
        onNavigate={closeMenu}
      />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <Inquiry />
        <Workspace />
        <WhyIdeate />
        <Builder />
        <BetaSignup />
      </main>
      <Footer />
    </div>
  )
}

export default App
