import { Button } from '../../components/Button'
import { DarkBand } from '../../components/DarkBand'
import { Reveal } from '../../components/Reveal'
import { HOME } from '../../content/home'
import { useLocale } from '../../i18n/context'

/** RF08: CTA intermediário em faixa escura. */
export function CtaBandSection() {
  const CTA_BAND = HOME[useLocale()].ctaBand
  return (
    <DarkBand labelledBy="cta-band-title">
      <Reveal className="flex flex-col gap-2xl lg:flex-row lg:items-end lg:justify-between">
        <h2 id="cta-band-title" className="max-w-3xl text-display-md text-balance text-on-night lg:text-display-lg">
          {CTA_BAND.title}
        </h2>
        <Button to={CTA_BAND.cta.to} variant="on-night" className="shrink-0">
          {CTA_BAND.cta.label}
        </Button>
      </Reveal>
    </DarkBand>
  )
}
