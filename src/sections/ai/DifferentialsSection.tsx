import { Card } from '../../components/Card'
import { Reveal } from '../../components/Reveal'
import { Section } from '../../components/Section'
import { SectionHeader } from '../../components/SectionHeader'
import { AI_FOR_BUSINESS } from '../../content/aiForBusiness'
import { useLocale } from '../../i18n/context'

/** RF24: 6 diferenciais em grid 3-up. */
export function DifferentialsSection() {
  const DIFFERENTIALS = AI_FOR_BUSINESS[useLocale()].differentials
  return (
    <Section labelledBy="differentials-title">
      <SectionHeader
        id="differentials-title"
        eyebrow={DIFFERENTIALS.eyebrow}
        title={DIFFERENTIALS.title}
        subtitle={DIFFERENTIALS.subtitle}
      />
      <Reveal as="ul" className="grid gap-lg sm:grid-cols-2 lg:grid-cols-3 lg:gap-xl">
        {DIFFERENTIALS.items.map((item) => (
          <li key={item.title}>
            <Card as="article" className="h-full">
              <h3 className="text-heading-sm">{item.title}</h3>
              <p className="mt-md text-body-sm">{item.text}</p>
            </Card>
          </li>
        ))}
      </Reveal>
    </Section>
  )
}
