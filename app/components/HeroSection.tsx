'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import dynamic from 'next/dynamic'

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const decorLeft = useRef<HTMLDivElement>(null)
  const decorRight = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // ── Phase 1: Entrance animations ──
      const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      entranceTl
        .fromTo(pillRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.3
        )
        .fromTo(headingRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1 },
          0.5
        )
        .fromTo(subtitleRef.current,
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.8
        )
        .fromTo(ctaRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7 },
          1.0
        )
        .fromTo(indicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1 },
          1.5
        )

      // ── Phase 2: Scroll parallax (fromTo with explicit start values) ──
      gsap.fromTo(headingRef.current,
        { y: 0, opacity: 1 },
        {
          y: -220, opacity: 0, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 1.2 },
        }
      )

      gsap.fromTo(subtitleRef.current,
        { y: 0, opacity: 1 },
        {
          y: -160, opacity: 0, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top top', end: '80% top', scrub: 1.2 },
        }
      )

      gsap.fromTo(ctaRef.current,
        { y: 0, opacity: 1 },
        {
          y: -110, opacity: 0, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top top', end: '70% top', scrub: 1.2 },
        }
      )

      gsap.fromTo(pillRef.current,
        { y: 0, opacity: 1 },
        {
          y: -80, opacity: 0, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top top', end: '60% top', scrub: 1.2 },
        }
      )

      // 3D scene drifts DOWN (opposite = depth)
      gsap.fromTo(sceneRef.current,
        { y: 0 },
        {
          y: 180, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.8 },
        }
      )

      // Decorative elements at different rates
      gsap.to(decorLeft.current, {
        y: -90, x: -50, rotation: 20,
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 1.5 },
      })
      gsap.to(decorRight.current, {
        y: 70, x: 40, rotation: -12,
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 1 },
      })

      // Overlay darkens
      gsap.fromTo(overlayRef.current,
        { opacity: 0.3 },
        {
          opacity: 0.8, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: section, start: '30% top', end: 'bottom top', scrub: 1 },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="hero-section">
      {/* 3D Scene Background */}
      <div ref={sceneRef} className="hero-scene-wrapper">
        <HeroScene />
      </div>

      {/* Gradient overlay */}
      <div ref={overlayRef} className="hero-overlay" />

      {/* Atmospheric glow */}
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      {/* Grid lines */}
      <div className="hero-grid" />

      {/* Decorative parallax shapes */}
      <div ref={decorLeft} className="hero-decor hero-decor-left">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="58" stroke="rgba(16,185,129,0.15)" strokeWidth="1" />
          <circle cx="60" cy="60" r="40" stroke="rgba(16,185,129,0.1)" strokeWidth="1" />
          <circle cx="60" cy="60" r="20" stroke="rgba(16,185,129,0.08)" strokeWidth="1" />
        </svg>
      </div>
      <div ref={decorRight} className="hero-decor hero-decor-right">
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          <rect x="10" y="10" width="140" height="140" rx="20" stroke="rgba(5,150,105,0.12)" strokeWidth="1" transform="rotate(15 80 80)" />
          <rect x="30" y="30" width="100" height="100" rx="14" stroke="rgba(5,150,105,0.08)" strokeWidth="1" transform="rotate(15 80 80)" />
        </svg>
      </div>

      {/* Content — NO framer-motion, GSAP controls everything */}
      <div className="hero-content">
        <div ref={pillRef} style={{ opacity: 0 }}>
          <span className="pill pill-green">Next-Gen Specialty Films</span>
        </div>

        <h1 ref={headingRef} className="hero-heading" style={{ opacity: 0 }}>
          Built to Scale.
          <br />
          <span className="text-gradient">Built to Lead.</span>
        </h1>

        <p ref={subtitleRef} className="hero-subtitle" style={{ opacity: 0 }}>
          India&apos;s emerging multi-polymer film platform
        </p>

        <div ref={ctaRef} className="hero-cta" style={{ opacity: 0 }}>
          <a href="#products" className="btn-primary">
            Explore Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#scale" className="btn-outline hero-btn-outline">
            Our Scale
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={indicatorRef} className="hero-scroll-indicator" style={{ opacity: 0 }}>
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
