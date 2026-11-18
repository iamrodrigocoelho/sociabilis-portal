import { Button } from '../../components/Button'
import { Container } from '../../components/Container'
import { Eyebrow } from '../../components/Eyebrow'
import { HeroIllustration } from '../../components/HeroIllustration'
import { HOME } from '../../content/home'
import { useLocale } from '../../i18n/context'

/**
 * RF02: painel suave (DESIGN.md v2.2). Fundo verde-sálvia claro, cantos
 * inferiores arredondados, título leve. No mobile, a ilustração fica discreta
 * no rodapé do painel; no desktop, à direita.
 */
export function HeroSection() {
  const HERO = HOME[useLocale()].hero
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden rounded-b-hero bg-hero lg:rounded-b-hero-lg"
    >
      <Container className="grid items-center gap-2xl pb-[13rem] pt-3xl sm:pb-[15rem] lg:grid-cols-12 lg:gap-3xl lg:pb-5xl lg:pt-4xl">
        <div className="lg:col-span-8">
          <Eyebrow className="mb-lg !text-primary-hover">{HERO.eyebrow}</Eyebrow>
          <h1 id="hero-title" className="max-w-[18ch] text-display-xl text-ink lg:max-w-none">
            {HERO.title}
          </h1>
          <p className="mt-lg max-w-[34rem] text-body-md text-body lg:mt-xl lg:text-body-lg">{HERO.lead}</p>
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

      {/* Mobile/tablet: ilustração discreta no rodapé do painel, atrás e abaixo do texto. */}
      <HeroIllustration className="pointer-events-none absolute -bottom-2xl -right-xl -z-10 h-auto w-[19rem] opacity-60 sm:w-[24rem] lg:hidden" />
    </section>
  )
}
