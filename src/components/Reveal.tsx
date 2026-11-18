import { useEffect, useRef, type ElementType, type ReactNode } from 'react'

interface RevealProps {
  as?: ElementType
  className?: string
  'aria-label'?: string
  children: ReactNode
}

/**
 * Fade + translateY(8px) ao entrar na viewport (IntersectionObserver, sem biblioteca).
 * O conteúdo pré-renderizado fica sempre visível sem JS; a animação só é aplicada
 * a elementos que ainda estão abaixo da dobra na hidratação, evitando "piscar".
 * Desligada com prefers-reduced-motion.
 */
export function Reveal({ as: Tag = 'div', className = '', children, 'aria-label': ariaLabel }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (el.getBoundingClientRect().top < window.innerHeight) return

    el.classList.add('reveal-pending')
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        el.classList.add('reveal-in')
        el.classList.remove('reveal-pending')
        observer.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={className} aria-label={ariaLabel}>
      {children}
    </Tag>
  )
}
