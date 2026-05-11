'use client'

import { useEffect, useRef } from 'react'

/**
 * PullQuote — featured editorial moment between sections.
 *
 * A single line of italic serif, with a teal accent rule that draws in from
 * left, and a mono-label attribution underneath. Reveals slowly on scroll —
 * the deliberate pacing is the point: this is the page's thesis statement.
 */
export default function PullQuote() {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const init = async () => {
      const gsapModule = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      const gsap = gsapModule.gsap
      gsap.registerPlugin(ScrollTrigger)

      if (!ref.current) return
      const quote = ref.current.querySelector('[data-quote]')
      const attribution = ref.current.querySelector('[data-attribution]')
      const rule = ref.current.querySelector('[data-rule]')

      if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' })
      if (quote) gsap.set(quote, { opacity: 0, y: 30 })
      if (attribution) gsap.set(attribution, { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })

      if (rule) tl.to(rule, { scaleX: 1, duration: 1.2, ease: 'power3.out' }, 0)
      if (quote) tl.to(quote, { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }, 0.2)
      if (attribution) tl.to(attribution, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' }, 0.8)
    }
    init()
  }, [])

  return (
    <section
      ref={ref}
      id="thesis"
      style={{
        padding: '7rem 3rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '880px' }}>
        <div
          data-rule
          style={{
            height: '1px',
            width: '80px',
            background: 'var(--teal)',
            marginBottom: '2.5rem',
          }}
        />
        <blockquote
          data-quote
          style={{
            margin: 0,
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: 'var(--ink)',
          }}
        >
          The intelligence is only as reliable as what it runs on.
        </blockquote>
        <div
          data-attribution
          className="font-mono-label"
          style={{
            marginTop: '2rem',
            color: 'var(--warm)',
            fontSize: '0.7rem',
          }}
        >
          From &ldquo;Networks&rdquo;, Redefined by AI, Field Note 10
        </div>
      </div>
    </section>
  )
}
