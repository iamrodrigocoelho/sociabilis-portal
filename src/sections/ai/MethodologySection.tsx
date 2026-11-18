import { Reveal } from '../../components/Reveal'
import { Section } from '../../components/Section'
import { SectionHeader } from '../../components/SectionHeader'
import { Steps } from '../../components/Steps'
import { METHODOLOGY } from '../../content/aiForBusiness'

/** RF23: as 7 etapas. Vertical, ao lado do título, para caber os textos. */
export function MethodologySection() {
  return (
    <Section id={METHODOLOGY.id} tone="soft" labelledBy="methodology-title">
      <div className="grid gap-3xl lg:grid-cols-12">
        <SectionHeader
          id="methodology-title"
          eyebrow={METHODOLOGY.eyebrow}
          title={METHODOLOGY.title}
          subtitle={METHODOLOGY.subtitle}
          className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start"
        />
        <Reveal className="lg:col-span-7">
          <Steps steps={METHODOLOGY.steps} orientation="vertical" />
        </Reveal>
      </div>
    </Section>
  )
}
