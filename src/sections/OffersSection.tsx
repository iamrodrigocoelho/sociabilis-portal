import { SectionHeader } from '../components/SectionHeader'
import { CTAButton } from '../components/CTAButton'

const OFFERS = [
  {
    name: 'AI Opportunity & Impact Scan',
    type: 'Diagnóstico',
    description:
      'Identificamos onde a IA pode gerar mais valor no negócio com priorização por impacto e viabilidade.',
    deliverables: [
      'Mapa de oportunidades',
      'Matriz impacto × esforço',
      'Riscos e dependências',
      'Roadmap de 30, 60 e 90 dias',
    ],
  },
  {
    name: 'RAG Starter',
    type: 'Implantação',
    description:
      'Implantamos copilotos com base de conhecimento própria da empresa para uso interno imediato.',
    deliverables: [
      'Atendimento interno',
      'Políticas e procedimentos',
      'Documentos ESG e relatórios',
      'Suporte técnico, RH e jurídico',
    ],
  },
  {
    name: 'Forward Deployed AI Pod',
    type: 'Squad dedicado',
    description:
      'Um squad da Sociabilis AI Labs atuando próximo ao cliente para implantar IA no contexto real do negócio.',
    deliverables: [
      'AI Deployment Lead',
      'Forward Deployed AI Engineer',
      'Product/Process Strategist',
      'Responsible & Sustainable AI Specialist',
    ],
  },
  {
    name: 'AI Agents & Automation',
    type: 'Automatização',
    description:
      'Criamos agentes de IA e automações inteligentes para apoiar ou executar tarefas operacionais.',
    deliverables: [
      'Triagem e análise de documentos',
      'Geração de relatórios',
      'Coleta de evidências ESG',
      'Integração com APIs e workflows',
    ],
  },
  {
    name: 'Sustainable AI Assessment',
    type: 'Avaliação',
    description:
      'Avaliamos maturidade, governança e impacto socioambiental do uso de IA na organização.',
    deliverables: [
      'Inventário de ferramentas',
      'Análise de riscos',
      'Estimativa de consumo e emissões',
      'Plano de otimização e mitigação',
    ],
  },
  {
    name: 'AI Carbon Tracker',
    type: 'Produto',
    description:
      'Estimamos, acompanhamos e comunicamos a pegada climática associada ao uso de IA generativa na sua organização.',
    deliverables: [
      'Estimativa de consumo por uso',
      'Painel de acompanhamento',
      'Comunicação de impacto',
      'Recomendações de eficiência',
    ],
  },
]

export function OffersSection() {
  return (
    <section id="ofertas" className="bg-canvas" aria-labelledby="offers-heading">
      <div className="container-base section-padding">
        <SectionHeader
          eyebrow="Ofertas"
          title="Soluções para acelerar sua jornada de IA responsável."
          subtitle="Do diagnóstico à implantação, oferecemos o que sua organização precisa para colocar IA para trabalhar com governança e eficiência."
          align="center"
          theme="light"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {OFFERS.map((offer) => (
            <article
              key={offer.name}
              className="bg-canvas-soft rounded-xl p-7 flex flex-col gap-4"
            >
              <div>
                <span className="inline-block text-[11px] font-semibold tracking-[1px] uppercase text-primary mb-3">
                  {offer.type}
                </span>
                <h3 className="text-ink font-semibold text-lg leading-snug mb-2">
                  {offer.name}
                </h3>
                <p className="text-body text-sm leading-relaxed">{offer.description}</p>
              </div>

              <ul className="flex flex-col gap-1.5 mt-auto pt-4 border-t border-canvas">
                {offer.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-body">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                      className="flex-shrink-0 mt-0.5"
                    >
                      <circle cx="7" cy="7" r="6" stroke="#c5c0b1" strokeWidth="1" />
                      <line
                        x1="4.5"
                        y1="7"
                        x2="6"
                        y2="8.8"
                        stroke="#939084"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <line
                        x1="6"
                        y1="8.8"
                        x2="9.5"
                        y2="5.2"
                        stroke="#939084"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <CTAButton href="#contato" variant="secondary">
            Fale com a Sociabilis sobre suas necessidades
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
