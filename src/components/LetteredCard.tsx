import type { ReactNode } from 'react'

interface LetteredCardProps {
  /** Rótulo de sequência: "A", "B", "01"… */
  label: string
  title: string
  headingLevel?: 'h3' | 'h4'
  theme?: 'light' | 'night'
  children: ReactNode
}

/** Card com rótulo A/B/C ou 01/02, hairline acima. */
export function LetteredCard({ label, title, headingLevel: Heading = 'h3', theme = 'light', children }: LetteredCardProps) {
  const night = theme === 'night'
  return (
    <article className={`border-t pt-xl ${night ? 'border-night-soft' : 'border-line'}`}>
      <p className={`text-label-seq tabular-nums ${night ? 'text-accent' : 'text-primary'}`} aria-hidden="true">
        {label}
      </p>
      <Heading className={`mt-lg text-heading-sm ${night ? 'text-on-night' : 'text-ink'}`}>
        <span className="sr-only">{label}. </span>
        {title}
      </Heading>
      <div className={`mt-md text-body-sm ${night ? 'text-on-night-mid' : 'text-body'}`}>{children}</div>
    </article>
  )
}
