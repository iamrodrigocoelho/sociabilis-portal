/**
 * Conteúdo da página IA no seu negócio (RF20–RF26). O conteúdo das ofertas
 * fica em offers.ts. Metodologia, diferenciais, público e CTA final são textos da v1.
 */
import type { Step } from '../components/Steps'
import { contactTo } from './navigation'
import { START_INTEREST } from './offers'

export const HERO = {
  eyebrow: 'IA no seu negócio',
  title: 'IA aplicada ao que a sua operação realmente precisa.', // [VALIDAR]
  intro:
    'Trabalhamos com empresas que querem sair do piloto e colocar IA para funcionar com governança, eficiência e impacto mensurável.',
  statement:
    'IA gera resultado quando parte de um problema real, de dados da própria operação e de critérios claros de sucesso. Por isso organizamos nosso trabalho em seis caminhos, do diagnóstico à operação contínua.',
  cta: { label: 'Não sabe por onde começar? Fale conosco', to: contactTo(START_INTEREST.slug) },
}

export const OFFER_INDEX_LABEL = 'Nossas ofertas'

/** Rótulos dos subtítulos de cada bloco de oferta (RF22). */
export const OFFER_BLOCK_LABELS = {
  forWhom: 'Para quem é',
  features: 'O que entregamos',
  more: { open: 'Ver mais', close: 'Ver menos' },
  steps: 'Como funciona',
  fullMethodology: 'Segue a nossa metodologia completa, do diagnóstico à mitigação.',
  fullMethodologyLink: 'Veja como trabalhamos',
  deliverables: 'Entregáveis e resultados',
  useCases: 'Casos de uso',
  profiles: 'Perfis possíveis',
}

export const METHODOLOGY = {
  id: 'como-trabalhamos',
  eyebrow: 'Metodologia',
  title: 'Como trabalhamos',
  subtitle:
    'Uma abordagem estruturada que vai do diagnóstico à implantação, com foco em resultado real e impacto responsável.',
  steps: [
    { title: 'Diagnosticar', description: 'Entendemos o negócio, os processos, os dados e as principais dores antes de propor qualquer solução.' },
    { title: 'Priorizar', description: 'Selecionamos casos de uso com maior potencial de impacto e viabilidade considerando dados, maturidade e risco.' },
    { title: 'Prototipar', description: 'Criamos MVPs rápidos para validar valor, experiência e aderência técnica antes da implantação completa.' },
    { title: 'Implantar', description: 'Integramos a solução ao fluxo real de trabalho, com suporte à adoção pelas equipes.' },
    { title: 'Medir', description: 'Acompanhamos indicadores de produtividade, adoção, custo, qualidade e impacto ao longo do tempo.' },
    { title: 'Otimizar', description: 'Evoluímos a solução com base em dados, feedback das equipes e melhoria contínua.' },
    { title: 'Mitigar', description: 'Apoiamos a redução de desperdícios e a mensuração da pegada socioambiental da IA na organização.' },
  ] satisfies Step[],
}

export const DIFFERENTIALS = {
  eyebrow: 'Diferenciais',
  title: 'Por que a Sociabilis AI Labs',
  subtitle: 'O que nos diferencia não é apenas o que fazemos, mas como e para quem fazemos.',
  items: [
    { title: 'IA aplicada, não apenas conceitual', text: 'Ajudamos a tirar a IA da apresentação e levá-la para a operação. Nosso foco é implantação real, com resultado mensurável.' },
    { title: 'Modelo Forward Deployed AI', text: 'Atuamos próximos ao cliente para entender contexto, cultura, dados e processos reais, não apenas especificações em documentos.' },
    { title: 'Sustentabilidade como premissa', text: 'Consideramos eficiência, custo, consumo e impacto socioambiental desde o desenho da solução, não como etapa adicional.' },
    { title: 'Governança desde o início', text: 'Projetamos soluções com atenção a segurança, privacidade, rastreabilidade e uso responsável em cada decisão de arquitetura.' },
    { title: 'Arquitetura eficiente', text: 'Priorizamos RAG, SLMs, automações e escolha adequada de modelos para evitar desperdício técnico e financeiro.' },
    { title: 'Foco em negócios responsáveis', text: 'Trabalhamos com organizações que querem crescer com inovação, sustentabilidade e impacto positivo, não apenas com escala.' },
  ],
}

export const AUDIENCE = {
  eyebrow: 'Para quem é',
  title: 'Para empresas que querem crescer com IA e responsabilidade.',
  text: 'Se sua organização quer usar IA para aumentar produtividade, reduzir desperdícios, melhorar decisões e acelerar inovação, a Sociabilis AI Labs pode ajudar a construir essa jornada de forma prática, segura e sustentável.',
  segments: [
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
  ],
}

export const FINAL_CTA = {
  eyebrow: 'Próximo passo',
  title: 'Sua empresa não precisa apenas testar IA. Ela precisa implantar IA com estratégia, governança e impacto positivo.',
  text: 'A Sociabilis AI Labs transforma inteligência artificial em resultado real para negócios responsáveis.',
  cta: { label: 'Fale conosco', to: contactTo() },
}
