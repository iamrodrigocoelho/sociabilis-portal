import { Seo } from '../components/Seo'
import { HOME } from '../content/home'
import { clientLogos, partnerLogos } from '../content/logos'
import { PAGE_SEO } from '../content/pages'
import { useLocale } from '../i18n/context'
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
  const locale = useLocale()
  const { partnersLabel, clientsLabel } = HOME[locale]
  return (
    <>
      <Seo {...PAGE_SEO[locale].home} jsonLd={organizationSchema(locale)} />
      <HeroSection />
      <ValueIconsSection />
      <LogoStripSection label={partnersLabel} logos={partnerLogos()} />
      <ManifestoSection />
      <PillarsSection />
      <OffersSection />
      <CtaBandSection />
      <MediaSection />
      <LogoStripSection label={clientsLabel} logos={clientLogos()} />
      <ContactSection />
    </>
  )
}
