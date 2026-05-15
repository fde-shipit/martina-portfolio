'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { person } from '@/content/data'

/**
 * Nav — desktop nav unchanged + a new mobile bottom bar.
 *
 * Previously: at ≤768px the nav links were `display:none` with no
 * replacement, hiding the Oracle (the site's hook) on the most common
 * viewport. Now there's a fixed bottom bar with the four highest-value
 * destinations.
 */

const desktopLinks = [
  { href: '/#work',    label: 'Work' },
  { href: '/work/after-hours', label: 'After Hours' },
  { href: '/#career',  label: 'Career' },
  { href: '/#writing', label: 'Writing' },
  { href: '/#skills',  label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
  { href: '/oracle',   label: 'Oracle', accent: true },
]

const mobileLinks = [
  { href: '/#work',    label: 'Work' },
  { href: '/oracle',   label: 'Oracle', accent: true },
  { href: '/#writing', label: 'Writing' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.add('nav-scrolled')
      } else {
        nav.classList.remove('nav-scrolled')
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '60px',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 3rem',
          background: 'transparent',
          borderBottom: 'none',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: 'var(--ink)',
            textDecoration: 'none',
            letterSpacing: '0.01em',
          }}
        >
          {person.name}
        </Link>

        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
          }}
          className="nav-links"
        >
          {desktopLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-dm-mono)',
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: link.accent ? 'var(--accent-rare)' : 'var(--warm)',
                textDecoration: 'none',
                opacity: 0,
                animation: `fadeDown 0.4s ease forwards ${0.4 + i * 0.08}s`,
              }}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <style>{`
          @keyframes fadeDown {
            from { opacity: 0; transform: translateY(-8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @media (max-width: 768px) {
            .nav-links { display: none; }
          }
          @media (prefers-reduced-motion: reduce) {
            .nav-link { opacity: 1 !important; animation: none !important; }
          }
        `}</style>
      </nav>

      {/* Mobile bottom bar — styling lives in globals.css (.mobile-nav) */}
      <nav className="mobile-nav" aria-label="Mobile">
        {mobileLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={link.accent ? 'oracle' : ''}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  )
}
