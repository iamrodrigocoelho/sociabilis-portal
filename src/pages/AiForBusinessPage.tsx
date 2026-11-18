import { Seo } from '../components/Seo'
import { OFFERS } from '../content/offers'
import { UI } from '../content/ui'
import { useLocale } from '../i18n/context'
import { PATHS } from '../i18n/locales'
import { PAGE_SEO } from '../content/pages'
import { serviceSchema } from '../lib/schema'
import { AiHeroSection } from '../sections/ai/AiHeroSection'
import { AudienceSection } from '../sections/ai/AudienceSection'
import { DifferentialsSection } from '../sections/ai/DifferentialsSection'
import { FinalCtaSection } from '../sections/ai/FinalCtaSection'
import { MethodologySection } from '../sections/ai/MethodologySection'
import { OfferBlock } from '../sections/ai/OfferBlock'
import { OfferIndex } from '../sections/ai/OfferIndex'

/** IA no seu negócio (RF20–RF26). */
export default function AiForBusinessPage() {
  const locale = useLocale()
  const offers = OFFERS[locale]
  return (
    <>
      <Seo {...PAGE_SEO[locale].aiForBusiness} jsonLd={offers.map((offer) => serviceSchema(offer, PATHS.offers[locale], locale))} />
      <AiHeroSection />
      {/* Índice + blocos no mesmo contêiner, para o índice ficar sticky durante as ofertas. */}
      <div>
        <OfferIndex offers={offers} label={UI[locale].offerIndex} />
        {offers.map((offer, i) => (
          <OfferBlock key={offer.slug} offer={offer} index={i} />
        ))}
      </div>
      <MethodologySection />
      <DifferentialsSection />
      <AudienceSection />
      <FinalCtaSection />
    </>
  )
}
