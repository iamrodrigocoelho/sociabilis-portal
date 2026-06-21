import { SectionHeader } from '../components/SectionHeader'

const PROBLEMS = [
  {
    title: 'Ferramentas desconectadas',
    description:
      'Múltiplas ferramentas de IA coexistindo sem integração, gerando silos e retrabalho operacional.',
  },
  {
    title: 'Falta de integração aos processos',
    description:
      'Experimentos que não se conectam ao fluxo real de trabalho e nunca chegam à operação.',
  },
  {
    title: 'Riscos de dados e privacidade',
    description:
      'Uso de IA sem controles adequados sobre quais dados são compartilhados e com quais sistemas.',
  },
  {
    title: 'Baixa governança',
    description:
      'Ausência de políticas claras sobre uso responsável, rastreabilidade e responsabilização.',
  },
  {
    title: 'Custos e impactos invisíveis',
    description:
      'Consumo crescente de recursos com pouca visibilidade sobre custo real e pegada socioambiental.',
  },
  {
    title: 'Dificuldade de escalar pilotos',
    description:
      'Provas de conceito que funcionam em laboratório mas não ganham escala na empresa.',
  },
]

function WarningIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className="flex-shrink-0 mt-0.5"
    >
      <path
        d="M10 2L18 16H2L10 2Z"
        stroke="#939084"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <line x1="10" y1="8" x2="10" y2="12" stroke="#939084" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="14.5" r="0.75" fill="#939084" />
    </svg>
  )
}

export function ProblemSection() {
  return (
    <section className="bg-canvas-soft" aria-labelledby="problem-heading">
      <div className="container-base section-padding">
        <SectionHeader
          eyebrow="O desafio"
          title="IA não gera valor quando fica presa em pilotos isolados."
          subtitle="Muitas organizações já utilizam ferramentas de IA, mas ainda enfrentam dificuldade para transformar experimentos em soluções operacionais. O resultado são iniciativas desconectadas, baixa governança, riscos de segurança, custos pouco visíveis e impactos socioambientais ignorados."
          align="center"
          theme="light"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map((problem) => (
            <article
              key={problem.title}
              className="bg-canvas border border-canvas-soft rounded-xl p-6 flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <WarningIcon />
                <h3 className="text-ink font-semibold text-base leading-snug">
                  {problem.title}
                </h3>
              </div>
              <p className="text-body text-sm leading-relaxed">{problem.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
