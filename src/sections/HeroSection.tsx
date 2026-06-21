import { CTAButton } from '../components/CTAButton'

function NetworkVisualization() {
  return (
    <div
      className="relative w-full max-w-sm md:max-w-none mx-auto"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 420"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-90"
      >
        {/* Background rings */}
        <circle cx="200" cy="210" r="165" fill="none" stroke="rgba(255,254,251,0.05)" strokeWidth="1" />
        <circle cx="200" cy="210" r="115" fill="none" stroke="rgba(255,254,251,0.06)" strokeWidth="1" />
        <circle cx="200" cy="210" r="68" fill="none" stroke="rgba(255,254,251,0.08)" strokeWidth="1" />

        {/* Connection lines from center */}
        <line x1="200" y1="210" x2="200" y2="55" stroke="#ff4f00" strokeOpacity="0.65" strokeWidth="1.5" />
        <line x1="200" y1="210" x2="325" y2="105" stroke="rgba(255,254,251,0.22)" strokeWidth="1" />
        <line x1="200" y1="210" x2="368" y2="210" stroke="rgba(255,254,251,0.14)" strokeWidth="1" />
        <line x1="200" y1="210" x2="325" y2="318" stroke="rgba(255,254,251,0.2)" strokeWidth="1" />
        <line x1="200" y1="210" x2="200" y2="368" stroke="#ff4f00" strokeOpacity="0.28" strokeWidth="1" />
        <line x1="200" y1="210" x2="75" y2="318" stroke="rgba(255,254,251,0.2)" strokeWidth="1" />
        <line x1="200" y1="210" x2="32" y2="210" stroke="rgba(255,254,251,0.14)" strokeWidth="1" />
        <line x1="200" y1="210" x2="75" y2="105" stroke="rgba(255,254,251,0.22)" strokeWidth="1" />

        {/* Outer ring connections */}
        <line x1="75" y1="105" x2="200" y2="55" stroke="rgba(255,254,251,0.07)" strokeWidth="1" />
        <line x1="200" y1="55" x2="325" y2="105" stroke="rgba(255,254,251,0.07)" strokeWidth="1" />
        <line x1="325" y1="105" x2="368" y2="210" stroke="rgba(255,254,251,0.07)" strokeWidth="1" />
        <line x1="368" y1="210" x2="325" y2="318" stroke="rgba(255,254,251,0.07)" strokeWidth="1" />
        <line x1="75" y1="318" x2="32" y2="210" stroke="rgba(255,254,251,0.07)" strokeWidth="1" />
        <line x1="32" y1="210" x2="75" y2="105" stroke="rgba(255,254,251,0.07)" strokeWidth="1" />

        {/* Outer nodes */}
        <circle cx="200" cy="55" r="9" fill="#ff4f00" opacity="0.9" />
        <circle cx="325" cy="105" r="6" fill="#fffefb" opacity="0.42" />
        <circle cx="368" cy="210" r="5" fill="#fffefb" opacity="0.28" />
        <circle cx="325" cy="318" r="6" fill="#fffefb" opacity="0.38" />
        <circle cx="200" cy="368" r="7" fill="#ff4f00" opacity="0.38" />
        <circle cx="75" cy="318" r="6" fill="#fffefb" opacity="0.38" />
        <circle cx="32" cy="210" r="5" fill="#fffefb" opacity="0.28" />
        <circle cx="75" cy="105" r="6" fill="#fffefb" opacity="0.42" />

        {/* Central node — glow layers */}
        <circle cx="200" cy="210" r="40" fill="#ff4f00" opacity="0.06" />
        <circle cx="200" cy="210" r="26" fill="#ff4f00" opacity="0.12" />
        <circle cx="200" cy="210" r="14" fill="#ff4f00" opacity="0.92" />
      </svg>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="bg-ink text-canvas" aria-labelledby="hero-heading">
      <div className="container-base py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <p className="text-[13px] font-medium tracking-[1.2px] uppercase text-canvas/50 mb-5">
              Sociabilis AI Labs
            </p>
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-[54px] font-medium leading-tight text-canvas mb-6"
            >
              Implantamos IA responsável e sustentável no coração da operação do seu negócio.
            </h1>
            <p className="text-lg leading-relaxed text-canvas/70 mb-10 max-w-xl">
              Ajudamos empresas responsáveis, B Corps e negócios de impacto a transformarem IA em
              resultado real por meio de copilotos, agentes, automações e soluções com RAG, sempre
              com governança, eficiência e atenção aos impactos socioambientais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton href="#ofertas" variant="primary">
                Conheça nossas soluções
              </CTAButton>
              <CTAButton href="#contato" variant="outline-light">
                Fale com a Sociabilis
              </CTAButton>
            </div>
          </div>

          {/* Visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="w-64 md:w-80 lg:w-full lg:max-w-md">
              <NetworkVisualization />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
