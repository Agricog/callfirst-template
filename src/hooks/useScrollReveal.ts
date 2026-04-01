// ============================================================
// CallFirst Client Template — Scroll Reveal Hook
// ============================================================

import { useEffect, useRef, useState, useCallback } from 'react'

interface RevealState {
  [key: string]: boolean
}

export function useScrollReveal() {
  const [revealed, setRevealed] = useState<RevealState>({})
  const observers = useRef<Map<string, IntersectionObserver>>(new Map())
  const elements = useRef<Map<string, HTMLElement>>(new Map())

  const setSectionRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (!el) return
      elements.current.set(id, el)

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed((prev) => ({ ...prev, [id]: true }))
            observer.disconnect()
          }
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )

      observer.observe(el)
      observers.current.set(id, observer)
    },
    []
  )

  useEffect(() => {
    return () => {
      observers.current.forEach((obs) => obs.disconnect())
    }
  }, [])

  const revealClass = useCallback(
    (id: string) =>
      revealed[id]
        ? 'animate-reveal'
        : 'opacity-0 translate-y-6',
    [revealed]
  )

  return { setSectionRef, revealClass }
}
