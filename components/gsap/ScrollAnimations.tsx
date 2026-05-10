'use client'

import { useEffect } from 'react'

export default function ScrollAnimations() {
  useEffect(() => {
    const init = async () => {
      const gsapModule = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const gsap = gsapModule.gsap
      gsap.registerPlugin(ScrollTrigger)

      // Section labels — slide in from left
      const labels = document.querySelectorAll('.gsap-section-label')
      labels.forEach(label => {
        gsap.fromTo(
          label,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 80%',
            },
          }
        )
      })

      // Section content — fade up
      const contents = document.querySelectorAll('.gsap-section-content')
      contents.forEach(content => {
        gsap.fromTo(
          content,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: content,
              start: 'top 90%',
            },
          }
        )
      })

      // Staggered grid children
      const grids = document.querySelectorAll('.gsap-section-content')
      grids.forEach(grid => {
        const children = grid.querySelectorAll('.gsap-stagger-child')
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              stagger: 0.08,
              scrollTrigger: {
                trigger: grid,
                start: 'top 85%',
              },
            }
          )
        }
      })
    }

    init()

    return () => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach(t => t.kill())
      })
    }
  }, [])

  return null
}
