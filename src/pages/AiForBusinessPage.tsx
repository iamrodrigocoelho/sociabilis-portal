import { Seo } from '../components/Seo'
import { OFFER_INDEX_LABEL } from '../content/aiForBusiness'
import { OFFERS, OFFERS_PAGE_PATH } from '../content/offers'
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
  return (
    <>
      <Seo {...PAGE_SEO.aiForBusiness} jsonLd={OFFERS.map((offer) => serviceSchema(offer, OFFERS_PAGE_PATH))} />
      <AiHeroSection />
      {/* Índice + blocos no mesmo contêiner, para o índice ficar sticky durante as ofertas. */}
      <div>
        <OfferIndex offers={OFFERS} label={OFFER_INDEX_LABEL} />
        {OFFERS.map((offer, i) => (
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
