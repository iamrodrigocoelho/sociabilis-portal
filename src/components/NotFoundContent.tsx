import { NOT_FOUND as NOT_FOUND_BY_LOCALE, PAGE_SEO } from '../content/pages'
import { useLocale } from '../i18n/context'
import { Button } from './Button'
import { Section } from './Section'
import { SectionHeader } from './SectionHeader'
import { Seo } from './Seo'

/** Conteúdo da 404, reutilizado por rotas com parâmetro inválido (ex.: post inexistente). */
export function NotFoundContent() {
  const locale = useLocale()
  const NOT_FOUND = NOT_FOUND_BY_LOCALE[locale]
  return (
    <>
      <Seo {...PAGE_SEO[locale].notFound} />
      <Section spacing="hero" labelledBy="not-found-title">
        <SectionHeader
          as="h1"
          size="xl"
          id="not-found-title"
          eyebrow={NOT_FOUND.eyebrow}
          title={NOT_FOUND.title}
          subtitle={NOT_FOUND.text}
          className="mb-2xl"
        />
        <div className="flex flex-col gap-md sm:flex-row">
          <Button to={NOT_FOUND.primary.to}>{NOT_FOUND.primary.label}</Button>
          <Button to={NOT_FOUND.secondary.to} variant="secondary">
            {NOT_FOUND.secondary.label}
          </Button>
        </div>
      </Section>
    </>
  )
}
