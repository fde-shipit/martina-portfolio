'use client'

import { useEffect } from 'react'

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    if (!cursor) return

    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0
    const lerp = 0.12

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onMouseEnter = () => cursor.classList.add('expanded')
    const onMouseLeave = () => cursor.classList.remove('expanded')

    const interactives = document.querySelectorAll('a, button, [role="button"]')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    let rafId: number
    const animate = () => {
      curX += (mouseX - curX) * lerp
      curY += (mouseY - curY) * lerp
      cursor.style.left = `${curX}px`
      cursor.style.top = `${curY}px`
      rafId = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  return null
}
