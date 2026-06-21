import { SectionHeader } from '../components/SectionHeader'

const DIFFERENTIALS = [
  {
    title: 'IA aplicada, não apenas conceitual',
    description:
      'Ajudamos a tirar a IA da apresentação e levá-la para a operação. Nosso foco é implantação real, com resultado mensurável.',
  },
  {
    title: 'Modelo Forward Deployed AI',
    description:
      'Atuamos próximos ao cliente para entender contexto, cultura, dados e processos reais — não apenas especificações em documentos.',
  },
  {
    title: 'Sustentabilidade como premissa',
    description:
      'Consideramos eficiência, custo, consumo e impacto socioambiental desde o desenho da solução, não como etapa adicional.',
  },
  {
    title: 'Governança desde o início',
    description:
      'Projetamos soluções com atenção a segurança, privacidade, rastreabilidade e uso responsável em cada decisão de arquitetura.',
  },
  {
    title: 'Arquitetura eficiente',
    description:
      'Priorizamos RAG, SLMs, automações e escolha adequada de modelos para evitar desperdício técnico e financeiro.',
  },
  {
    title: 'Foco em negócios responsáveis',
    description:
      'Trabalhamos com organizações que querem crescer com inovação, sustentabilidade e impacto positivo — não apenas com escala.',
  },
]

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5"
    >
      <circle cx="10" cy="10" r="9" stroke="#ff4f00" strokeWidth="1.5" />
      <path
        d="M6.5 10L9 12.5L13.5 7.5"
        stroke="#ff4f00"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function DifferentialsSection() {
  return (
    <section id="diferenciais" className="bg-canvas" aria-labelledby="differentials-heading">
      <div className="container-base section-padding">
        <SectionHeader
          eyebrow="Diferenciais"
          title="Por que a Sociabilis AI Labs"
          subtitle="O que nos diferencia não é apenas o que fazemos, mas como e para quem fazemos."
          align="center"
          theme="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DIFFERENTIALS.map((diff) => (
            <article
              key={diff.title}
              className="bg-canvas-soft rounded-xl p-7 flex flex-col gap-4"
            >
              <div className="flex items-start gap-3">
                <CheckIcon />
                <h3 className="text-ink font-semibold text-base leading-snug">{diff.title}</h3>
              </div>
              <p className="text-body text-sm leading-relaxed">{diff.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
