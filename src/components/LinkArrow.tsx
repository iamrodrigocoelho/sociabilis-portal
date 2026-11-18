import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface LinkArrowProps {
  /** Rota interna. */
  to?: string
  /** Link externo (abre em nova aba). */
  href?: string
  theme?: 'light' | 'night'
  className?: string
  children: ReactNode
}

/** Link de texto com seta "→" (Veja mais, Saber mais, Ver todos). */
export function LinkArrow({ to, href, theme = 'light', className = '', children }: LinkArrowProps) {
  const color = theme === 'night' ? 'text-accent' : 'text-primary hover:text-primary-hover'
  const classes = `group inline-flex min-h-touch items-center gap-sm font-semibold ${color} ${className}`
  const content = (
    <>
      <span className="underline-offset-4 group-hover:underline">{children}</span>
      <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    )
  }
  return (
    <Link to={to ?? '/'} className={classes}>
      {content}
    </Link>
  )
}
