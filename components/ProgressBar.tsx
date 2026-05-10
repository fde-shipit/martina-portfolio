'use client'

import { useEffect } from 'react'

export default function ProgressBar() {
  useEffect(() => {
    const bar = document.getElementById('progress-bar')
    if (!bar) return

    const onScroll = () => {
      const scrollY = window.scrollY
      const docH = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = `${(scrollY / docH) * 100}%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
