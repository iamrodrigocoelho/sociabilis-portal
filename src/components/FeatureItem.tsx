import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

interface FeatureItemProps {
  icon: LucideIcon
  title: string
  headingLevel?: 'h3' | 'h4'
  /** Tamanho do ícone: 32px (padrão) ou 24px. */
  iconSize?: 24 | 32
  children?: ReactNode
}

/** Ícone em traço fino + título + 1–2 linhas (opcionais). */
export function FeatureItem({ icon: Icon, title, headingLevel: Heading = 'h3', iconSize = 32, children }: FeatureItemProps) {
  return (
    <div>
      <Icon size={iconSize} strokeWidth={1.5} className="text-brand" aria-hidden="true" />
      <Heading className="mt-lg text-heading-sm text-ink">{title}</Heading>
      {children && <div className="mt-sm text-body-sm text-body">{children}</div>}
    </div>
  )
}
