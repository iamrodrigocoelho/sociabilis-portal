import { SectionHeader } from '../components/SectionHeader'

const SEGMENTS = [
  'B Corps',
  'Negócios de impacto',
  'Empresas responsáveis',
  'PMEs em transformação digital',
  'Consultorias ESG',
  'Startups',
  'Organizações do terceiro setor',
  'Áreas de inovação',
  'Áreas de tecnologia',
  'Áreas de sustentabilidade',
  'Áreas de produto',
  'Áreas de operações',
]

export function AudienceSection() {
  return (
    <section className="bg-ink text-canvas" aria-labelledby="audience-heading">
      <div className="container-base section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text */}
          <div>
            <SectionHeader
              eyebrow="Para quem é"
              title="Para empresas que querem crescer com IA e responsabilidade."
              subtitle="Se sua organização quer usar IA para aumentar produtividade, reduzir desperdícios, melhorar decisões e acelerar inovação, a Sociabilis AI Labs pode ajudar a construir essa jornada de forma prática, segura e sustentável."
              align="left"
              theme="dark"
              className="mb-0"
            />
          </div>

          {/* Segments */}
          <div>
            <p
              className="text-[13px] font-medium tracking-[1.2px] uppercase text-canvas/50 mb-6"
              aria-label="Segmentos atendidos"
            >
              Atendemos
            </p>
            <ul
              className="flex flex-wrap gap-3"
              aria-label="Lista de segmentos atendidos"
            >
              {SEGMENTS.map((segment) => (
                <li
                  key={segment}
                  className="bg-ink-soft border border-canvas/10 text-canvas/80 text-sm font-medium px-4 py-2 rounded-full"
                >
                  {segment}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
