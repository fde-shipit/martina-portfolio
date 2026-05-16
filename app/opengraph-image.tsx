import { ImageResponse } from 'next/og'

export const alt = 'Martina Edwards — AI Acceleration'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#EFF0F2',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#308695', display: 'flex' }} />
          <span style={{ fontFamily: 'monospace', fontSize: '14px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#308695' }}>
            martina-edwards.vercel.app
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ fontSize: '56px', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.1, display: 'flex' }}>
            AI didn't replace my experience. It handed me the tools to finally use all of it.
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '16px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#666', display: 'flex' }}>
            Martina Edwards · Manager, AI Acceleration · Melbourne
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
