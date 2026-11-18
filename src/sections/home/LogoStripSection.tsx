import { Container } from '../../components/Container'
import { LogoStrip } from '../../components/LogoStrip'
import type { Logo } from '../../content/logos'

/** RF04 / RF10: faixa de logos. Oculta quando a lista está vazia. */
export function LogoStripSection({ label, logos }: { label: string; logos: Logo[] }) {
  if (logos.length === 0) return null
  return (
    <section aria-label={label} className="border-b border-line py-2xl">
      <Container>
        <LogoStrip label={label} logos={logos} />
      </Container>
    </section>
  )
}
