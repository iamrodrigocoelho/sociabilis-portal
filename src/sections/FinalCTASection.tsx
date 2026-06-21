import { CTAButton } from '../components/CTAButton'
import { getContactHref } from '../config/contact'

export function FinalCTASection() {
  return (
    <section id="cta-final" className="bg-ink text-canvas" aria-labelledby="cta-heading">
      <div className="container-base py-20 md:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[13px] font-medium tracking-[1.2px] uppercase text-canvas/50 mb-5">
            Próximo passo
          </p>
          <h2
            id="cta-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-canvas mb-6"
          >
            Sua empresa não precisa apenas testar IA.
            <br className="hidden md:block" />
            <span className="text-primary"> Ela precisa implantar IA</span> com estratégia,
            governança e impacto positivo.
          </h2>
          <p className="text-lg leading-relaxed text-canvas/70 mb-10">
            A Sociabilis AI Labs transforma inteligência artificial em resultado real para negócios
            responsáveis.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <CTAButton href={getContactHref()} variant="primary">
              Fale com a Sociabilis
            </CTAButton>
            <CTAButton href="#ofertas" variant="outline-light">
              Conheça nossas soluções
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}
