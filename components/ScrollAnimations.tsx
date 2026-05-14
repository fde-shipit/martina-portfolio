'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      // .gsap-section-label — fade in from y 20, triggered at 90% from bottom
      document.querySelectorAll<HTMLElement>('.gsap-section-label').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // .gsap-section-content — fade in from y 30, triggered at 85% from bottom
      document.querySelectorAll<HTMLElement>('.gsap-section-content').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // .gsap-stagger-child — staggered fade in, triggered when the parent enters viewport
      document.querySelectorAll<HTMLElement>('.gsap-section-content').forEach((parent) => {
        const children = parent.querySelectorAll<HTMLElement>('.gsap-stagger-child')
        if (!children.length) return

        gsap.fromTo(
          children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: parent,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }

    init()
  }, [])

  return null
}
