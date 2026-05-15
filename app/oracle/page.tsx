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
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
            lineHeight: 1.1,
            color: 'var(--ink)',
          }}
        >
          Consult the Oracle.
        </h1>
      </div>

      <div style={{
        border: '1px solid var(--rule)',
        padding: '3rem',
        background: 'rgba(28, 32, 36, 0.02)',
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        overflow: 'hidden',
      }}>
        <Ball />
      </div>

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
