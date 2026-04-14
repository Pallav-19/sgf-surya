'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 3, suffix: '', label: 'Production Lines', sublabel: 'Operational' },
  { value: 22, suffix: 'K', label: 'Tonnes / Month', sublabel: 'At full capacity' },
  { value: 40, suffix: '-Acre', label: 'Integrated Campus', sublabel: 'Single location' },
  { value: 30, suffix: '+', label: 'Years Heritage', sublabel: 'Manufacturing excellence' },
]

function AnimatedNumber({ value, suffix, active }: { value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active) return

    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 2.2,
      ease: 'power2.out',
      onUpdate: () => setDisplay(Math.floor(obj.val)),
    })
  }, [active, value])

  return (
    <span className="stat-number">
      {display}
      <span className="stat-suffix">{suffix}</span>
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Stat cards slide in from alternating sides
      gsap.utils.toArray<HTMLElement>('.stat-card').forEach((card, i) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            x: i % 2 === 0 ? -50 : 50,
            scale: 0.92,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.7,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Subtle parallax on individual cards
      gsap.utils.toArray<HTMLElement>('.stat-card').forEach((card, i) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -15 : 15,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="scale" ref={sectionRef} className="stats-section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="label">Built for Scale</span>
          <h2 className="display-lg">
            Numbers that{' '}
            <span className="text-gradient">speak volumes</span>
          </h2>
        </motion.div>

        <div ref={ref} className="stats-grid">
          {stats.map((stat, i) => (
            <div key={stat.label} className="stat-card">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} active={inView} />
              <span className="stat-label">{stat.label}</span>
              <span className="stat-sublabel">{stat.sublabel}</span>
              <div className="stat-line" />
              <div className="stat-bg-number">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
