import type { Metadata } from 'next'
import Ball from '@/components/Ball'
import { person } from '@/content/data'

export const metadata: Metadata = {
  title: 'The Oracle — Martina Edwards',
  description: 'Ask the oracle whether to hire Martina Edwards. Spoiler: yes.',
}

export default function OraclePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 2rem 4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '560px' }}>
        <span
          className="font-mono-label"
          style={{ color: 'var(--rust)', display: 'block', marginBottom: '1rem' }}
        >
          The Oracle
        </span>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            color: 'var(--ink)',
            marginBottom: '1.25rem',
          }}
        >
          Ask whether to hire{' '}
          <em style={{ color: 'var(--rust)' }}>{person.name.split(' ')[0]}</em>
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--warm)', lineHeight: 1.6 }}>
          The oracle knows. The oracle always answers. The oracle is never wrong.
        </p>
      </div>

      <Ball />

      <div style={{ marginTop: '5rem', borderTop: '1px solid var(--rule)', paddingTop: '2rem', textAlign: 'center' }}>
        <a
          href="/"
          className="font-mono-label"
          style={{ color: 'var(--warm)', textDecoration: 'none', fontSize: '0.62rem' }}
        >
          ← Back to portfolio
        </a>
      </div>
    </main>
  )
}
