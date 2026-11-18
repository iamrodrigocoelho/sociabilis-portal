import type { ElementType, ReactNode } from 'react'

interface ContainerProps {
  as?: ElementType
  className?: string
  children: ReactNode
}

/** Container de 1200px com gutters de 24px (mobile) e 32px (desktop). */
export function Container({ as: Tag = 'div', className = '', children }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-container px-6 lg:px-8 ${className}`}>{children}</Tag>
}
