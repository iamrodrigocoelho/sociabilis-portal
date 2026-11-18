import { Reveal } from '../../components/Reveal'
import { Section } from '../../components/Section'
import { SectionHeader } from '../../components/SectionHeader'
import { TagChip } from '../../components/TagChip'
import { AI_FOR_BUSINESS } from '../../content/aiForBusiness'
import { useLocale } from '../../i18n/context'
import { UI } from '../../content/ui'

/** RF25: público-alvo com segmentos em chips. */
export function AudienceSection() {
  const locale = useLocale()
  const AUDIENCE = AI_FOR_BUSINESS[locale].audience
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
        <Reveal as="ul" aria-label={UI[locale].audienceSegments} className="flex flex-wrap content-start gap-sm lg:col-span-6">
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
