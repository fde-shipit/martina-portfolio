import { ticker } from '@/content/data'

export default function Ticker() {
  const items = [...ticker, ...ticker] // duplicate for seamless loop

  return (
    <div
      style={{
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
        overflow: 'hidden',
        padding: '0.75rem 0',
        background: 'var(--cream)',
      }}
    >
      <div className="ticker-track">
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0',
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.68rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: item.accent ? 'var(--rust)' : 'var(--warm)',
              whiteSpace: 'nowrap',
              paddingRight: '3rem',
            }}
          >
            {item.text}
            <span style={{ color: 'var(--rule)', marginLeft: '3rem', marginRight: 0 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
