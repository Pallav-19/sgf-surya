'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'

const products = [
  {
    name: 'BOPP',
    full: 'Biaxially Oriented Polypropylene',
    description: 'High-clarity, high-barrier films for flexible packaging.',
    color: '#10B981',
    accent: '#ECFDF5',
  },
  {
    name: 'BOPET',
    full: 'Biaxially Oriented Polyethylene Terephthalate',
    description: 'Superior tensile strength and thermal stability.',
    color: '#059669',
    accent: '#D1FAE5',
  },
  {
    name: 'BOPE',
    full: 'Biaxially Oriented Polyethylene',
    description: 'Next-gen sustainable films with mono-material recyclability.',
    color: '#14B8A6',
    accent: '#CCFBF1',
  },
]

function ProductCard({ product }: { product: typeof products[number] }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    gsap.to(card, {
      rotateY: (x - 0.5) * 14,
      rotateX: (0.5 - y) * 14,
      duration: 0.4,
      ease: 'power2.out',
    })

    card.style.setProperty('--glow-x', `${x * 100}%`)
    card.style.setProperty('--glow-y', `${y * 100}%`)
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  return (
    <div
      ref={cardRef}
      className="product-card card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-card-glow" />
      <div className="product-icon-wrapper" style={{ background: product.accent }}>
        <span className="product-icon-letter" style={{ color: product.color }}>
          {product.name.charAt(0)}
        </span>
      </div>
      <h3 className="product-name">{product.name}</h3>
      <p className="product-full">{product.full}</p>
      <p className="product-desc">{product.description}</p>
      <div className="product-arrow" style={{ color: product.color }}>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  )
}

export default function ProductsSection() {
  const ref = useRef(null)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Staggered card reveal with rotation
      gsap.utils.toArray<HTMLElement>('.product-card').forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, rotateX: 8 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section id="products" ref={sectionRef} className="products-section">
      <div className="section-inner">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <span className="label">What We Make</span>
          <h2 className="display-lg">
            Multi-polymer{' '}
            <span className="text-gradient">film platform</span>
          </h2>
        </motion.div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
