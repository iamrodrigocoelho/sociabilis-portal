import { Reveal } from '../../components/Reveal'
import { Section } from '../../components/Section'
import { SectionHeader } from '../../components/SectionHeader'
import { TagChip } from '../../components/TagChip'
import { AUDIENCE } from '../../content/aiForBusiness'

/** RF25: público-alvo com segmentos em chips. */
export function AudienceSection() {
  return (
    <Section tone="soft" labelledBy="audience-title">
      <div className="grid gap-3xl lg:grid-cols-12">
        <SectionHeader
          id="audience-title"
          eyebrow={AUDIENCE.eyebrow}
          title={AUDIENCE.title}
          subtitle={AUDIENCE.text}
          className="lg:col-span-6"
        />
        <Reveal as="ul" aria-label="Segmentos atendidos" className="flex flex-wrap content-start gap-sm lg:col-span-6">
          {AUDIENCE.segments.map((segment) => (
            <li key={segment}>
              <TagChip>{segment}</TagChip>
            </li>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
