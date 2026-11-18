import { Button } from '../../components/Button'
import { Container } from '../../components/Container'
import { Eyebrow } from '../../components/Eyebrow'
import { HeroIllustration } from '../../components/HeroIllustration'
import { HERO } from '../../content/home'

/** RF02 */
export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="overflow-hidden pb-4xl pt-3xl lg:pb-5xl lg:pt-6xl">
      <Container className="grid items-center gap-3xl lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Eyebrow className="mb-xl">{HERO.eyebrow}</Eyebrow>
          <h1 id="hero-title" className="text-display-xl text-balance">
            {HERO.title}
          </h1>
          <p className="mt-xl max-w-prose text-body-lg">{HERO.lead}</p>
          <div className="mt-2xl flex flex-col gap-md sm:flex-row">
            <Button to={HERO.primaryCta.to}>{HERO.primaryCta.label}</Button>
            <Button to={HERO.secondaryCta.to} variant="secondary">
              {HERO.secondaryCta.label}
            </Button>
          </div>
        </div>
        <div className="hidden lg:col-span-4 lg:block">
          <HeroIllustration className="h-auto w-full" />
        </div>
      </Container>
    </section>
  )
}
