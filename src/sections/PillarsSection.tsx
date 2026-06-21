import { SectionHeader } from '../components/SectionHeader'

const PILLARS = [
  {
    tag: 'Deploy AI',
    title: 'Implantação real na operação',
    description:
      'Implantamos soluções de IA conectadas aos processos reais da empresa, como copilotos internos, agentes, automações e sistemas com RAG. A IA deixa de ser projeto e se torna parte do fluxo de trabalho.',
    accent: true,
  },
  {
    tag: 'Govern AI',
    title: 'Governança desde o início',
    description:
      'Criamos bases de governança, segurança, privacidade, rastreabilidade e uso responsável para que a IA possa ser adotada com confiança — tanto pelas equipes quanto pela liderança.',
    accent: false,
  },
  {
    tag: 'Sustain AI',
    title: 'Sustentabilidade como premissa',
    description:
      'Aplicamos princípios de eficiência, escolha adequada de modelos, redução de desperdícios e mensuração da pegada socioambiental da IA desde o desenho da solução.',
    accent: false,
  },
]

export function PillarsSection() {
  return (
    <section className="bg-ink text-canvas" aria-labelledby="pillars-heading">
      <div className="container-base section-padding">
        <SectionHeader
          eyebrow="Nossos pilares"
          title="Três pilares para uma IA que gera resultado real."
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.tag}
              className={`rounded-xl p-7 flex flex-col gap-4 ${
                pillar.accent
                  ? 'bg-primary text-ink'
                  : 'bg-ink-soft border border-canvas/10'
              }`}
            >
              <span
                className={`text-[12px] font-semibold tracking-[1.2px] uppercase ${
                  pillar.accent ? 'text-ink/60' : 'text-canvas/50'
                }`}
              >
                {pillar.tag}
              </span>
              <h3
                className={`text-xl font-semibold leading-snug ${
                  pillar.accent ? 'text-ink' : 'text-canvas'
                }`}
              >
                {pillar.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  pillar.accent ? 'text-ink/70' : 'text-canvas/65'
                }`}
              >
                {pillar.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
