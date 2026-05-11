'use client'

import { useEffect } from 'react'

/**
 * ScrollAnimations
 *
 * Per-section orchestration. Each .section-grid is treated as one module:
 * its label, body content, and grid children reveal in a deliberate sequence
 * triggered when the section enters the viewport. Heavier easing curves give
 * a grounded, intentional feel rather than a bouncy or rushed one.
 *
 * Reveal sequence per section:
 *   0.00s  label slides in from left
 *   0.25s  content body fades up
 *   0.50s  grid children stagger up (0.14s apart)
 */
export default function ScrollAnimations() {
  useEffect(() => {
    let cleanup: (() => void) | undefined

    const init = async () => {
      const gsapModule = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const gsap = gsapModule.gsap
      gsap.registerPlugin(ScrollTrigger)

      const sections = document.querySelectorAll('.section-grid')

      sections.forEach((section) => {
        const label = section.querySelector('.gsap-section-label')
        const content = section.querySelector('.gsap-section-content')
        const children = content
          ? content.querySelectorAll('.gsap-stagger-child')
          : ([] as unknown as NodeListOf<Element>)

        // Initial hidden states — set explicitly so nothing flashes on load.
        if (label) gsap.set(label, { opacity: 0, x: -60 })
        if (content) gsap.set(content, { opacity: 0, y: 70 })
        if (children.length) gsap.set(children, { opacity: 0, y: 50 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            toggleActions: 'play none none none',
          },
        })

        // Label first — slides in from the left as a section anchor.
        if (label) {
          tl.to(
            label,
            {
              opacity: 1,
              x: 0,
              duration: 1.0,
              ease: 'power4.out',
            },
            0
          )
        }

        // Content body settles a beat later.
        if (content) {
          tl.to(
            content,
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              ease: 'power3.out',
            },
            0.25
          )
        }

        // Grid children land last — the discovery beat.
        if (children.length) {
          tl.to(
            children,
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.14,
              ease: 'power3.out',
            },
            0.5
          )
        }
      })

      cleanup = () => {
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    }

    init()

    return () => {
      cleanup?.()
    }
  }, [])

  return null
}
