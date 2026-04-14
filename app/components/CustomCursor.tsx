'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: MouseEvent) => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
    gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    window.addEventListener('mousemove', onMouseMove)

    const addHoverListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .hover-target').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          dotRef.current?.classList.add('hover')
          ringRef.current?.classList.add('hover')
        })
        el.addEventListener('mouseleave', () => {
          dotRef.current?.classList.remove('hover')
          ringRef.current?.classList.remove('hover')
        })
      })
    }

    addHoverListeners()
    const observer = new MutationObserver(addHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      observer.disconnect()
    }
  }, [onMouseMove])

  return (
    <>
      <div ref={dotRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
