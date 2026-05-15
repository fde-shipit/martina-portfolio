'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { person } from '@/content/data'

const links = [
  { href: '/#work', label: 'Work' },
  { href: '/work/built-in-one-day', label: 'Built in 2 Days' },
  { href: '/#career', label: 'Career' },
  { href: '/#writing', label: 'Writing' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
  { href: '/oracle', label: 'Oracle', accent: true },
]

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

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
          fontWeight: 300,
          fontSize: '1.1rem',
          color: 'var(--ink)',
          textDecoration: 'none',
          letterSpacing: '0.02em',
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
        {links.map((link, i) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: link.accent ? 'var(--rust)' : 'var(--warm)',
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
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
        }
      `}</style>
    </nav>
  )
}
