import { SectionHeader } from '../components/SectionHeader'

const STEPS = [
  {
    number: '01',
    title: 'Diagnosticar',
    description:
      'Entendemos o negócio, os processos, os dados e as principais dores antes de propor qualquer solução.',
  },
  {
    number: '02',
    title: 'Priorizar',
    description:
      'Selecionamos casos de uso com maior potencial de impacto e viabilidade considerando dados, maturidade e risco.',
  },
  {
    number: '03',
    title: 'Prototipar',
    description:
      'Criamos MVPs rápidos para validar valor, experiência e aderência técnica antes da implantação completa.',
  },
  {
    number: '04',
    title: 'Implantar',
    description:
      'Integramos a solução ao fluxo real de trabalho, com suporte à adoção pelas equipes.',
  },
  {
    number: '05',
    title: 'Medir',
    description:
      'Acompanhamos indicadores de produtividade, adoção, custo, qualidade e impacto ao longo do tempo.',
  },
  {
    number: '06',
    title: 'Otimizar',
    description:
      'Evoluímos a solução com base em dados, feedback das equipes e melhoria contínua.',
  },
  {
    number: '07',
    title: 'Mitigar',
    description:
      'Apoiamos a redução de desperdícios e a mensuração da pegada socioambiental da IA na organização.',
  },
]

export function MethodologySection() {
  return (
    <section id="metodologia" className="bg-canvas-soft" aria-labelledby="methodology-heading">
      <div className="container-base section-padding">
        <SectionHeader
          eyebrow="Metodologia"
          title="Como trabalhamos"
          subtitle="Uma abordagem estruturada que vai do diagnóstico à implantação, com foco em resultado real e impacto responsável."
          align="center"
          theme="light"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.slice(0, 4).map((step) => (
            <article
              key={step.number}
              className="bg-canvas rounded-xl p-6 flex flex-col gap-3"
            >
              <span
                className="text-[13px] font-semibold tracking-widest text-mute"
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3 className="text-ink font-semibold text-lg">{step.title}</h3>
              <p className="text-body text-sm leading-relaxed">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
          {STEPS.slice(4).map((step) => (
            <article
              key={step.number}
              className={`rounded-xl p-6 flex flex-col gap-3 ${
                step.number === '07'
                  ? 'bg-ink text-canvas'
                  : 'bg-canvas'
              }`}
            >
              <span
                className={`text-[13px] font-semibold tracking-widest ${
                  step.number === '07' ? 'text-canvas/40' : 'text-mute'
                }`}
                aria-hidden="true"
              >
                {step.number}
              </span>
              <h3
                className={`font-semibold text-lg ${
                  step.number === '07' ? 'text-canvas' : 'text-ink'
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  step.number === '07' ? 'text-canvas/65' : 'text-body'
                }`}
              >
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
