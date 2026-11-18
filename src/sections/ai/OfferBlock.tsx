import { Button } from '../../components/Button'
import { Container } from '../../components/Container'
import { Expandable } from '../../components/Expandable'
import { FeatureItem } from '../../components/FeatureItem'
import { LinkArrow } from '../../components/LinkArrow'
import { Steps } from '../../components/Steps'
import { AI_FOR_BUSINESS } from '../../content/aiForBusiness'
import { useLocale } from '../../i18n/context'
import { contactTo } from '../../content/navigation'
import { offerCtaLabel, offerNumber, type Offer } from '../../content/offers'

function SubHeading({ children }: { children: string }) {
  return <h3 className="text-eyebrow text-body-mid">{children}</h3>
}

function ArrowList({ items }: { items: string[] }) {
  return (
    <ul className="mt-lg grid gap-md sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex gap-md text-body-md text-ink">
          <span aria-hidden="true" className="font-semibold text-brand">
            →
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * RF22: bloco de uma oferta (id = slug). Itens sem conteúdo em offers.ts
 * não são renderizados.
 */
export function OfferBlock({ offer, index }: { offer: Offer; index: number }) {
  const locale = useLocale()
  const { blockLabels: L, methodology: METHODOLOGY } = AI_FOR_BUSINESS[locale]
  const titleId = `${offer.slug}-title`
  const number = offerNumber(index)

  return (
    <article
      id={offer.slug}
      aria-labelledby={titleId}
      className="scroll-mt-0 border-t border-line py-4xl first:border-t-0 lg:scroll-mt-12 lg:py-5xl"
    >
      <Container className="grid gap-3xl lg:grid-cols-12">
        {/* 1–3: rótulo, nome, pitch, para quem é */}
        <header className="lg:col-span-5">
          <p className="text-label-seq tabular-nums text-primary" aria-hidden="true">
            {number}
          </p>
          <h2 id={titleId} className="mt-md text-display-md text-balance">
            <span className="sr-only">{number}. </span>
            {offer.name}
          </h2>
          <p className="mt-lg text-body-lg">{offer.pitch}</p>
          <div className="mt-2xl border-l-2 border-accent pl-lg">
            <SubHeading>{L.forWhom}</SubHeading>
            <p className="mt-sm text-body-md text-ink">{offer.forWhom}</p>
          </div>
        </header>

        <div className="flex min-w-0 flex-col gap-3xl lg:col-span-7">
          {/* 4: o que entregamos */}
          {offer.features && offer.features.length > 0 && (
            <section>
              <SubHeading>{L.features}</SubHeading>
              <ul className="mt-xl grid gap-2xl sm:grid-cols-3 sm:gap-xl">
                {offer.features.map((f) => (
                  <li key={f.title}>
                    <FeatureItem icon={f.icon} title={f.title} headingLevel="h4">
                      {f.text}
                    </FeatureItem>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 5: ver mais */}
          {offer.moreBenefits && offer.moreBenefits.length > 0 && (
            <Expandable openLabel={L.more.open} closeLabel={L.more.close}>
              <ul className="flex list-disc flex-col gap-sm pl-xl marker:text-brand">
                {offer.moreBenefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </Expandable>
          )}

          {/* 6: como funciona */}
          {offer.steps && offer.steps.length > 0 && (
            <section>
              <SubHeading>{L.steps}</SubHeading>
              <Steps steps={offer.steps.map((title) => ({ title }))} className="mt-xl" />
            </section>
          )}
          {offer.usesFullMethodology && (
            <section>
              <SubHeading>{L.steps}</SubHeading>
              <p className="mt-sm text-body-md">{L.fullMethodology}</p>
              <LinkArrow to={`#${METHODOLOGY.id}`}>{L.fullMethodologyLink}</LinkArrow>
            </section>
          )}

          {/* Perfis do squad (Forward Deployed AI Pod) */}
          {offer.profiles && offer.profiles.length > 0 && (
            <section>
              <SubHeading>{L.profiles}</SubHeading>
              <ul className="mt-lg flex flex-wrap gap-sm">
                {offer.profiles.map((p) => (
                  <li key={p} className="rounded-pill border border-line px-lg py-sm text-body-sm text-ink">
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* 7: entregáveis */}
          {offer.deliverables && offer.deliverables.length > 0 && (
            <section>
              <SubHeading>{L.deliverables}</SubHeading>
              <ArrowList items={offer.deliverables} />
            </section>
          )}

          {/* 8: casos de uso */}
          {offer.useCases && offer.useCases.length > 0 && (
            <section>
              <SubHeading>{L.useCases}</SubHeading>
              <ol className="mt-lg grid gap-x-xl sm:grid-cols-2">
                {offer.useCases.map((useCase, i) => (
                  <li key={useCase} className="flex gap-md border-b border-line py-md text-body-md text-ink">
                    <span className="text-label-seq tabular-nums leading-[inherit] text-primary" aria-hidden="true">
                      {offerNumber(i)}
                    </span>
                    {useCase}
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* 9: CTA */}
          <div>
            <Button to={offer.pagePath ?? contactTo(locale, offer.slug)}>{offerCtaLabel(locale, offer)}</Button>
          </div>
        </div>
      </Container>
    </article>
  )
}
