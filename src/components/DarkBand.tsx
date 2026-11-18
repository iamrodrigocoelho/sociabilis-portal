import type { ComponentProps } from 'react'
import { Section } from './Section'

/** Faixa escura (manifesto, CTA intermediário). Usar no máximo 2–3 vezes por página. */
export function DarkBand(props: Omit<ComponentProps<typeof Section>, 'tone'>) {
  return <Section {...props} tone="night" />
}
