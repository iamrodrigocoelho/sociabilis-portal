import { ArrowStatement } from '../../components/ArrowStatement'
import { Button } from '../../components/Button'
import { Section } from '../../components/Section'
import { SectionHeader } from '../../components/SectionHeader'
import { AI_FOR_BUSINESS } from '../../content/aiForBusiness'
import { useLocale } from '../../i18n/context'

/** RF20 */
export function AiHeroSection() {
  const HERO = AI_FOR_BUSINESS[useLocale()].hero
  return (
    <Section spacing="hero" labelledBy="ai-hero-title">
      <SectionHeader
        as="h1"
        size="xl"
        id="ai-hero-title"
        eyebrow={HERO.eyebrow}
        title={HERO.title}
        subtitle={HERO.intro}
        className="mb-2xl max-w-4xl"
      />
      <ArrowStatement>{HERO.statement}</ArrowStatement>
      <div className="mt-2xl">
        <Button to={HERO.cta.to} variant="secondary">
          {HERO.cta.label}
        </Button>
      </div>
    </Section>
  )
}
