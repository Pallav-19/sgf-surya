'use client'

import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <a className="navbar-logo" href="#">
          <span className="navbar-logo-text">SGF</span>
        </a>

        <div className={`navbar-links ${mobileOpen ? 'navbar-links-open' : ''}`}>
          <button onClick={() => scrollTo('products')}>Products</button>
          <button onClick={() => scrollTo('scale')}>Scale</button>
          <button onClick={() => scrollTo('sustainability')}>Sustainability</button>
          <button onClick={() => scrollTo('contact')} className="navbar-links-cta-mobile">
            Contact Us
          </button>
        </div>

        <button className="navbar-cta" onClick={() => scrollTo('contact')}>
          Contact Us
        </button>

        <button
          className="navbar-hamburger"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${mobileOpen ? 'open' : ''}`} />
        </button>
      </div>
    </nav>
  )
}
