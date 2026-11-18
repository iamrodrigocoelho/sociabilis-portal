import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'

interface ExpandableProps {
  openLabel?: string
  closeLabel?: string
  className?: string
  children: ReactNode
}

/** "Ver mais" nativo com <details>/<summary>; fundo suave quando aberto. */
export function Expandable({ openLabel = 'Ver mais', closeLabel = 'Ver menos', className = '', children }: ExpandableProps) {
  return (
    <details className={`group rounded-md border border-line open:bg-canvas-soft ${className}`}>
      <summary className="flex min-h-touch cursor-pointer list-none items-center justify-between gap-md rounded-md px-xl py-md font-semibold text-primary hover:text-primary-hover [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">{openLabel}</span>
        <span className="hidden group-open:inline">{closeLabel}</span>
        <ChevronDown
          size={20}
          strokeWidth={1.5}
          aria-hidden="true"
          className="transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="px-xl pb-xl text-body-sm text-body">{children}</div>
    </details>
  )
}
