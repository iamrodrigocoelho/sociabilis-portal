import type { ReactNode } from 'react'

/** Afirmação-chave iniciada por "→" (body-lg). */
export function ArrowStatement({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <p className={`flex max-w-prose gap-md text-body-lg text-ink ${className}`}>
      <span aria-hidden="true" className="font-semibold text-brand">
        →
      </span>
      <span>{children}</span>
    </p>
  )
}
