'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: '9M+', label: 'Renewable electricity units annually' },
  { value: '72L', label: 'Litres in-house water storage' },
  { value: '10K+', label: 'Tonnes agricultural waste utilized' },
  { value: '~16K', label: 'Tonnes CO\u2082 avoided annually' },
]

export default function SustainabilitySection() {
  const ref = useRef(null)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Cards reveal with clip-path wipe + scale
      gsap.utils.toArray<HTMLElement>('.sustainability-card').forEach((card, i) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            scale: 0.9,
            y: 40,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Progress bar animation on each card
      gsap.utils.toArray<HTMLElement>('.sustainability-bar-fill').forEach((bar) => {
        gsap.fromTo(bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="sustainability" ref={sectionRef} className="sustainability-section">
      <div className="section-inner">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="label" style={{ color: '#059669' }}>
            Sustainability
          </span>
          <h2 className="display-lg">
            Responsibility at{' '}
            <span className="text-gradient">every layer</span>
          </h2>
        </motion.div>

        <div className="sustainability-grid">
          {metrics.map((metric) => (
            <div key={metric.label} className="sustainability-card">
              <span className="sustainability-value">{metric.value}</span>
              <span className="sustainability-label">{metric.label}</span>
              <div className="sustainability-bar">
                <div className="sustainability-bar-fill" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
