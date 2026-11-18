export interface Step {
  title: string
  description?: string
}

interface StepsProps {
  steps: Step[]
  /** Layout horizontal no desktop (padrão). `vertical` mantém a lista empilhada. */
  orientation?: 'responsive' | 'vertical'
  className?: string
}

/**
 * Etapas numeradas: número em círculo hairline com linha conectora.
 * Vertical no mobile; horizontal no desktop.
 */
export function Steps({ steps, orientation = 'responsive', className = '' }: StepsProps) {
  const horizontal = orientation === 'responsive'
  return (
    <ol className={`grid gap-xl ${horizontal ? 'lg:grid-flow-col lg:auto-cols-fr lg:gap-lg' : ''} ${className}`}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1
        return (
          <li key={step.title} className={`relative flex gap-lg ${horizontal ? 'lg:block' : ''}`}>
            {/* Linha conectora */}
            {!last && (
              <span
                aria-hidden="true"
                className={`absolute left-[21px] top-[44px] h-[calc(100%-20px)] w-px bg-line ${
                  horizontal ? 'lg:left-[52px] lg:-right-lg lg:top-[22px] lg:h-px lg:w-auto' : ''
                }`}
              />
            )}
            <span className="relative flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-pill border border-line bg-canvas text-label-seq tabular-nums text-ink">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className={horizontal ? 'pb-lg lg:mt-lg lg:pb-0 lg:pr-lg' : 'pb-lg'}>
              <p className="text-heading-sm text-ink">{step.title}</p>
              {step.description && <p className="mt-sm text-body-sm text-body">{step.description}</p>}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
