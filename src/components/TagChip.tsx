import type { ReactNode } from 'react'
import { Link } from 'react-router'

interface TagChipProps {
  to?: string
  active?: boolean
  className?: string
  children: ReactNode
}

/** Pill hairline. Ativo: fundo ink, texto branco. Com `to`, vira link. */
export function TagChip({ to, active = false, className = '', children }: TagChipProps) {
  const classes = `inline-flex items-center rounded-pill border px-lg text-body-sm font-medium transition-colors duration-200 ${
    active ? 'border-ink bg-ink text-white' : 'border-line bg-canvas text-ink hover:border-ink'
  } ${className}`

  if (to) {
    return (
      <Link to={to} aria-current={active ? 'page' : undefined} className={`min-h-touch ${classes}`}>
        {children}
      </Link>
    )
  }
  return <span className={`py-xs ${classes}`}>{children}</span>
}
