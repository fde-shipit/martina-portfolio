'use client'

import { useState } from 'react'

const EMAIL = 'martina.edwards.p@gmail.com'
const DEFAULT_LABEL = 'martina.edwards.p@gmail.com →'

export default function SkillsCta() {
  const [label, setLabel] = useState(DEFAULT_LABEL)
  const [disabled, setDisabled] = useState(false)

  function handleClick() {
    if (disabled) return
    setDisabled(true)

    setLabel('are they worthy...')

    setTimeout(() => {
      setLabel('...')
    }, 700)

    setTimeout(() => {
      setLabel('yes.')
    }, 1400)

    setTimeout(() => {
      window.location.href = `mailto:${EMAIL}`
    }, 2000)

    setTimeout(() => {
      setLabel(DEFAULT_LABEL)
      setDisabled(false)
    }, 3000)
  }

  return (
    <div
      className="gsap-stagger-child"
      style={{
        background: 'var(--cream)',
        padding: '1.75rem',
        flex: '1 1 220px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Pulsing dot */}
      <div style={{ position: 'relative', width: '8px', height: '8px', marginBottom: '1.5rem', flexShrink: 0 }}>
        <div className="skills-cta-pulse" />
        <div style={{ position: 'relative', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }} />
      </div>

      <div
        className="font-mono-label"
        style={{ color: 'var(--rust)', marginBottom: '1rem', lineHeight: 1.4 }}
      >
        Always interested in the right conversation.
      </div>

      <button
        onClick={handleClick}
        disabled={disabled}
        style={{
          fontFamily: 'var(--font-dm-mono)',
          fontSize: '0.62rem',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--accent)',
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          cursor: disabled ? 'default' : 'pointer',
          textAlign: 'left',
        }}
      >
        {label}
      </button>

      <style>{`
        .skills-cta-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: var(--accent);
          animation: skills-pulse 2s ease-out infinite;
        }
        @keyframes skills-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(3.5); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
