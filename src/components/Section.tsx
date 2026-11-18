import type { ReactNode } from 'react'
import { Container } from './Container'

export type SectionTone = 'default' | 'soft' | 'night'

interface SectionProps {
  id?: string
  tone?: SectionTone
  /** Hairline no topo, para separar seções de mesmo fundo. */
  divider?: boolean
  /** Sem Container interno (conteúdo full-bleed). */
  bleed?: boolean
  /** Espaçamento vertical: `default` (64/96px), `hero` (64/128px no topo) ou `compact`. */
  spacing?: 'default' | 'hero' | 'compact'
  labelledBy?: string
  label?: string
  className?: string
  children: ReactNode
}

const TONES: Record<SectionTone, string> = {
  default: 'bg-canvas',
  soft: 'bg-canvas-soft',
  night: 'bg-night text-on-night-mid',
}

const SPACING = {
  default: 'py-4xl lg:py-5xl',
  hero: 'pt-4xl pb-4xl lg:pt-6xl lg:pb-5xl',
  compact: 'py-3xl lg:py-4xl',
}

export function Section({
  id,
  tone = 'default',
  divider = false,
  bleed = false,
  spacing = 'default',
  labelledBy,
  label,
  className = '',
  children,
}: SectionProps) {
  const border = divider ? (tone === 'night' ? 'border-t border-night-soft' : 'border-t border-line') : ''
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={labelledBy ? undefined : label}
      className={`${TONES[tone]} ${SPACING[spacing]} ${border} ${className}`}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  )
}
