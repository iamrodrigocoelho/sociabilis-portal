import type { ElementType, ReactNode } from 'react'

interface CardProps {
  as?: ElementType
  /** `hairline` (padrão), `soft` (destaque) ou `night` (sobre faixa escura). */
  variant?: 'hairline' | 'soft' | 'night'
  /** `lg`: cards grandes de oferta (padding 32px, raio 16px). */
  size?: 'md' | 'lg'
  className?: string
  children: ReactNode
}

const VARIANTS = {
  hairline: 'border border-line bg-canvas',
  soft: 'bg-canvas-soft',
  night: 'bg-night-soft text-on-night-mid',
}

/** Card sem sombra: profundidade por hairline ou contraste de superfície. */
export function Card({ as: Tag = 'div', variant = 'hairline', size = 'md', className = '', children }: CardProps) {
  const sizing = size === 'lg' ? 'rounded-lg p-2xl' : 'rounded-md p-xl'
  return <Tag className={`${VARIANTS[variant]} ${sizing} ${className}`}>{children}</Tag>
}
