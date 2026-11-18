import type { ReactNode } from 'react'

interface EyebrowProps {
  theme?: 'light' | 'night'
  className?: string
  children: ReactNode
}

/** Rótulo em maiúsculas acima do título. Verde `primary` (AA) em fundo claro; lima sobre `night`. */
export function Eyebrow({ theme = 'light', className = '', children }: EyebrowProps) {
  const color = theme === 'night' ? 'text-accent' : 'text-primary'
  return <p className={`text-eyebrow ${color} ${className}`}>{children}</p>
}
