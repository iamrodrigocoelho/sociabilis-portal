import { Button } from '../../components/Button'
import { DarkBand } from '../../components/DarkBand'
import { Eyebrow } from '../../components/Eyebrow'
import { Reveal } from '../../components/Reveal'
import { FINAL_CTA } from '../../content/aiForBusiness'

/** RF26: CTA final em faixa escura. */
export function FinalCtaSection() {
  return (
    <DarkBand labelledBy="final-cta-title">
      <Reveal className="max-w-3xl">
        <Eyebrow theme="night" className="mb-lg">
          {FINAL_CTA.eyebrow}
        </Eyebrow>
        <h2 id="final-cta-title" className="text-display-lg text-balance text-on-night">
          {FINAL_CTA.title}
        </h2>
        <p className="mt-xl text-body-lg text-on-night-mid">{FINAL_CTA.text}</p>
        <Button to={FINAL_CTA.cta.to} variant="on-night" className="mt-2xl">
          {FINAL_CTA.cta.label}
        </Button>
      </Reveal>
    </DarkBand>
  )
}
