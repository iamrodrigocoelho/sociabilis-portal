import { SectionHeader } from '../components/SectionHeader'

const VALUE_BLOCKS = [
  {
    number: '01',
    title: 'Implantar IA na operação',
    description:
      'Levamos a IA para dentro dos processos reais do seu negócio, conectada às ferramentas, dados e pessoas que já existem.',
  },
  {
    number: '02',
    title: 'Governar riscos e uso responsável',
    description:
      'Criamos estruturas de uso responsável com atenção a segurança, privacidade, rastreabilidade e conformidade.',
  },
  {
    number: '03',
    title: 'Reduzir desperdícios e impactos',
    description:
      'Priorizamos soluções eficientes que consomem menos recursos, geram menos desperdício e consideram a pegada socioambiental.',
  },
  {
    number: '04',
    title: 'Medir resultados e evolução',
    description:
      'Definimos indicadores claros de adoção, produtividade, custo e qualidade para que a IA gere valor mensurável.',
  },
]

export function ValuePropositionSection() {
  return (
    <section id="o-que-fazemos" className="bg-canvas" aria-labelledby="value-heading">
      <div className="container-base section-padding">
        <SectionHeader
          eyebrow="AI Deployment Company"
          title="Da estratégia à implantação: IA aplicada com governança e impacto positivo."
          subtitle="A Sociabilis AI Labs entra no contexto real do cliente, entende seus processos, prioriza casos de uso de alto impacto e implanta soluções de IA que podem ser medidas, governadas e evoluídas."
          align="center"
          theme="light"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
          {VALUE_BLOCKS.map((block) => (
            <article
              key={block.number}
              className="bg-canvas-soft rounded-xl p-7 flex gap-5"
            >
              <span
                className="text-[13px] font-semibold text-mute tracking-widest flex-shrink-0 pt-0.5"
                aria-hidden="true"
              >
                {block.number}
              </span>
              <div>
                <h3 className="text-ink font-semibold text-lg leading-snug mb-2">
                  {block.title}
                </h3>
                <p className="text-body text-sm leading-relaxed">{block.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
