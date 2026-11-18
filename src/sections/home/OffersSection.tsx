import { Card } from '../../components/Card'
import { LinkArrow } from '../../components/LinkArrow'
import { Reveal } from '../../components/Reveal'
import { Section } from '../../components/Section'
import { SectionHeader } from '../../components/SectionHeader'
import { HOME } from '../../content/home'
import { OFFERS, offerHref } from '../../content/offers'
import { useLocale } from '../../i18n/context'

/** RF07: 6 ofertas em grid 2-up, cada uma levando à sua âncora em /ia-no-seu-negocio. */
export function OffersSection() {
  const locale = useLocale()
  const OFFERS_SECTION = HOME[locale].offersSection
  return (
    <Section tone="soft" labelledBy="offers-title">
      <SectionHeader id="offers-title" eyebrow={OFFERS_SECTION.eyebrow} title={OFFERS_SECTION.title} />
      <Reveal as="ul" className="grid gap-lg md:grid-cols-2 lg:gap-xl">
        {OFFERS[locale].map((offer) => (
          <li key={offer.slug}>
            <Card as="article" size="lg" className="flex h-full flex-col">
              <offer.icon size={32} strokeWidth={1.5} className="text-brand" aria-hidden="true" />
              <h3 className="mt-xl text-heading-sm">{offer.name}</h3>
              <p className="mt-sm text-body-md">{offer.summary}</p>
              <LinkArrow to={offerHref(locale, offer)} className="mt-auto pt-lg">
                {OFFERS_SECTION.cardCta}
                <span className="sr-only">: {offer.name}</span>
              </LinkArrow>
            </Card>
          </li>
        ))}
      </Reveal>
    </Section>
  )
}
