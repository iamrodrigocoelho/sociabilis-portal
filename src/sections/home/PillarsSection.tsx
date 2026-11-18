import { LetteredCard } from '../../components/LetteredCard'
import { Reveal } from '../../components/Reveal'
import { Section } from '../../components/Section'
import { SectionHeader } from '../../components/SectionHeader'
import { PILLARS } from '../../content/home'

/** RF06: pilares A, B, C. */
export function PillarsSection() {
  return (
    <Section labelledBy="pillars-title">
      <SectionHeader id="pillars-title" eyebrow={PILLARS.eyebrow} title={PILLARS.title} />
      <Reveal as="ul" className="grid gap-2xl md:grid-cols-3 md:gap-xl">
        {PILLARS.items.map((pillar) => (
          <li key={pillar.label}>
            <LetteredCard label={pillar.label} title={pillar.title}>
              <p>{pillar.text}</p>
            </LetteredCard>
          </li>
        ))}
      </Reveal>
    </Section>
  )
}
