import { Seo } from '../components/Seo'
import { CLIENTS_LABEL, PARTNERS_LABEL } from '../content/home'
import { clientLogos, partnerLogos } from '../content/logos'
import { PAGE_SEO } from '../content/pages'
import { organizationSchema } from '../lib/schema'
import { ContactSection } from '../sections/home/ContactSection'
import { CtaBandSection } from '../sections/home/CtaBandSection'
import { HeroSection } from '../sections/home/HeroSection'
import { LogoStripSection } from '../sections/home/LogoStripSection'
import { ManifestoSection } from '../sections/home/ManifestoSection'
import { MediaSection } from '../sections/home/MediaSection'
import { OffersSection } from '../sections/home/OffersSection'
import { PillarsSection } from '../sections/home/PillarsSection'
import { ValueIconsSection } from '../sections/home/ValueIconsSection'

/** Home (RF01–RF12, na ordem do PRD). Header e footer vêm do Layout. */
export default function HomePage() {
  return (
    <>
      <Seo {...PAGE_SEO.home} jsonLd={organizationSchema()} />
      <HeroSection />
      <ValueIconsSection />
      <LogoStripSection label={PARTNERS_LABEL} logos={partnerLogos()} />
      <ManifestoSection />
      <PillarsSection />
      <OffersSection />
      <CtaBandSection />
      <MediaSection />
      <LogoStripSection label={CLIENTS_LABEL} logos={clientLogos()} />
      <ContactSection />
    </>
  )
}
