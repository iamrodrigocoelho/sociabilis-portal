import type { ReactNode } from 'react'
import { Eyebrow } from './Eyebrow'

interface SectionHeaderProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  /** Nível do título. Use `h1` apenas no hero da página. */
  as?: 'h1' | 'h2'
  /** Tamanho do título: `lg` (display-lg) ou `xl` (display-xl, hero). */
  size?: 'lg' | 'xl' | 'md'
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
  id?: string
  className?: string
}

const SIZES = { xl: 'text-display-xl', lg: 'text-display-lg', md: 'text-display-md' }

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  as: Heading = 'h2',
  size = 'lg',
  align = 'left',
  theme = 'light',
  id,
  className = 'mb-3xl lg:mb-4xl',
}: SectionHeaderProps) {
  const dark = theme === 'dark'
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && (
        <Eyebrow theme={dark ? 'night' : 'light'} className="mb-lg">
          {eyebrow}
        </Eyebrow>
      )}
      <Heading id={id} className={`${SIZES[size]} text-balance ${dark ? 'text-on-night' : 'text-ink'}`}>
        {title}
      </Heading>
      {subtitle && (
        <p
          className={`mt-xl max-w-prose text-body-lg ${centered ? 'mx-auto' : ''} ${
            dark ? 'text-on-night-mid' : 'text-body'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
