import {
  BookOpenText,
  Cable,
  Calculator,
  CalendarRange,
  ChartLine,
  Eye,
  FileText,
  Gauge,
  GraduationCap,
  Grid2x2,
  Leaf,
  Library,
  Map as MapIcon,
  MessagesSquare,
  Plug,
  Route,
  ScanSearch,
  ShieldCheck,
  Users,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

/**
 * As 6 ofertas (RF07 e RF22). Fonte única para home, footer, formulário de
 * contato e página IA no seu negócio.
 *
 * Textos marcados [VALIDAR] no PRD estão sinalizados com comentário. Campos
 * opcionais ausentes não são exibidos: não inventar conteúdo para preenchê-los.
 */
export interface OfferFeature {
  icon: LucideIcon
  title: string
  /** Linha de apoio. O PRD ainda não define estas linhas: deixar vazio até haver texto aprovado. */
  text?: string
}

export interface Offer {
  /** Âncora em /ia-no-seu-negocio e valor do interesse no formulário. */
  slug: string
  name: string
  /** Frase curta da home (RF07). */
  summary: string
  icon: LucideIcon
  /** 1–2 frases (RF22.2). */
  pitch: string
  /** Qualificador "Para quem é" (RF22.3). */
  forWhom: string
  /** "O que entregamos": 3 itens (RF22.4). */
  features?: OfferFeature[]
  /** "Ver mais": benefícios adicionais (RF22.5). */
  moreBenefits?: string[]
  /** "Como funciona": etapas (RF22.6). */
  steps?: string[]
  /** Usa a metodologia completa da página (seção Como trabalhamos). */
  usesFullMethodology?: boolean
  /** "Entregáveis / resultados" (RF22.7). */
  deliverables?: string[]
  /** "Casos de uso" (RF22.8). */
  useCases?: string[]
  /** Perfis do squad (Forward Deployed AI Pod). */
  profiles?: string[]
  /** Texto do CTA; padrão "Falar sobre <nome>". */
  ctaLabel?: string
  /** Página própria da oferta, quando existir (ex.: AI Carbon Tracker no futuro). */
  pagePath?: string
}

export const OFFERS: Offer[] = [
  {
    slug: 'impact-scan',
    name: 'AI Opportunity & Impact Scan',
    summary: 'Diagnóstico para identificar onde a IA gera mais valor no seu negócio.',
    icon: ScanSearch,
    pitch:
      'Diagnóstico para identificar onde a IA pode gerar mais valor no negócio, com riscos e prioridades claros.',
    forWhom: 'Empresas que querem começar ou reorganizar sua jornada de IA com foco em resultado.', // [VALIDAR]
    features: [
      { icon: MapIcon, title: 'Mapa de oportunidades' },
      { icon: Grid2x2, title: 'Matriz impacto x esforço' },
      { icon: CalendarRange, title: 'Roadmap de 30, 60 e 90 dias' },
    ],
    moreBenefits: [
      'Riscos e dependências mapeados.',
      'Visão de custo e de impacto socioambiental de cada caso de uso.',
      'Recomendação de arquitetura (RAG, SLMs, automação).',
    ],
    // [VALIDAR]
    steps: ['Imersão (entrevistas e processos)', 'Mapeamento e priorização', 'Apresentação do roadmap'],
    deliverables: [
      'Mapa de oportunidades',
      'Matriz impacto x esforço',
      'Riscos e dependências',
      'Roadmap 30/60/90',
    ],
  },
  {
    slug: 'rag-starter',
    name: 'RAG Starter',
    summary: 'Copilotos com a base de conhecimento da sua empresa.',
    icon: BookOpenText,
    pitch:
      'Implantação de copilotos que respondem com base no conhecimento da sua empresa: políticas, documentos e procedimentos.',
    forWhom:
      'Empresas com conhecimento disperso em documentos e equipes que perdem tempo procurando informação.', // [VALIDAR]
    // [VALIDAR]
    features: [
      { icon: Library, title: 'Base de conhecimento estruturada' },
      { icon: MessagesSquare, title: 'Copilot integrado ao canal do time' },
      { icon: ShieldCheck, title: 'Governança de acesso e fontes citadas' },
    ],
    // [VALIDAR]
    moreBenefits: [
      'Respostas com referência à fonte.',
      'Controle de quem acessa o quê.',
      'Monitoramento de qualidade.',
      'Escolha de modelo eficiente.',
    ],
    // [VALIDAR]
    steps: ['Curadoria das fontes', 'Construção e testes', 'Implantação e acompanhamento'],
    useCases: [
      'Atendimento interno',
      'Políticas e procedimentos',
      'Documentos ESG',
      'Suporte técnico',
      'RH',
      'Jurídico',
      'Operações',
    ],
  },
  {
    slug: 'forward-deployed-pod',
    name: 'Forward Deployed AI Pod',
    summary: 'Um squad da Sociabilis implantando IA junto ao seu time.',
    icon: Users,
    pitch:
      'Um squad da Sociabilis AI Labs atuando próximo ao seu time para implantar IA no contexto real do negócio.',
    forWhom:
      'Organizações com vários casos de uso, dados sensíveis ou necessidade de acelerar a implantação com acompanhamento contínuo.', // [VALIDAR]
    // [VALIDAR]
    features: [
      { icon: Users, title: 'Squad dedicado' },
      { icon: Cable, title: 'Implantação integrada aos processos' },
      { icon: GraduationCap, title: 'Transferência de conhecimento para o time interno' },
    ],
    profiles: [
      'AI Deployment Lead',
      'Forward Deployed AI Engineer',
      'Product/Process Strategist',
      'Data/RAG Engineer',
      'Responsible & Sustainable AI Specialist',
    ],
    usesFullMethodology: true,
  },
  {
    slug: 'agents-automation',
    name: 'AI Agents & Automation',
    summary: 'Agentes e automações que apoiam ou executam tarefas operacionais.',
    icon: Workflow,
    pitch: 'Agentes de IA e automações inteligentes para apoiar ou executar tarefas operacionais.',
    forWhom: 'Times com tarefas repetitivas, alto volume de documentos ou fluxos entre sistemas.', // [VALIDAR]
    // [VALIDAR]
    features: [
      { icon: Route, title: 'Agentes desenhados para o processo' },
      { icon: Plug, title: 'Integrações com APIs e workflows' },
      { icon: Eye, title: 'Monitoramento e pontos de supervisão humana' },
    ],
    useCases: [
      'Triagem de e-mails',
      'Análise de documentos',
      'Geração de relatórios',
      'Coleta de evidências ESG',
      'Suporte interno',
      'Integração com APIs e workflows',
    ],
  },
  {
    slug: 'sustainable-ai-assessment',
    name: 'Sustainable AI Assessment',
    summary: 'Maturidade, governança e pegada socioambiental do seu uso de IA.',
    icon: Leaf,
    pitch: 'Avaliação da maturidade, governança e impacto socioambiental do uso de IA na organização.',
    forWhom: 'Empresas que já usam IA e precisam de visibilidade de riscos, custos e pegada.', // [VALIDAR]
    // Linguagem: "estimativa", nunca "neutralização" ou "compensação" sem metodologia definida.
    deliverables: [
      'Inventário de ferramentas',
      'Análise de riscos',
      'Recomendações de governança',
      'Estimativa de consumo, custo e emissões',
      'Plano de otimização e mitigação',
    ],
  },
  {
    slug: 'ai-carbon-tracker',
    name: 'AI Carbon Tracker',
    summary: 'Estime, acompanhe e comunique a pegada climática da IA generativa.',
    icon: Gauge,
    pitch:
      'Produto da Sociabilis para estimar, acompanhar e comunicar a pegada climática associada ao uso de IA generativa.',
    forWhom: 'Empresas que querem medir e reportar o impacto do seu uso de IA (ex.: relatórios ESG).', // [VALIDAR]
    // [VALIDAR]
    features: [
      { icon: Calculator, title: 'Estimativas de emissões por uso' },
      { icon: ChartLine, title: 'Acompanhamento ao longo do tempo' },
      { icon: FileText, title: 'Material para comunicação e relatórios' },
    ],
    ctaLabel: 'Quero conhecer o AI Carbon Tracker',
    // pagePath: '/ai-carbon-tracker', // futura página própria (fora do escopo da v2)
  },
]

/** Interesse extra do formulário (RF11), além das 6 ofertas. */
export const START_INTEREST = { slug: 'por-onde-comecar', label: 'Quero entender por onde começar' }

export const OFFERS_PAGE_PATH = '/ia-no-seu-negocio'
export const offerHref = (offer: Pick<Offer, 'slug'>) => `${OFFERS_PAGE_PATH}#${offer.slug}`
export const offerCtaLabel = (offer: Offer) => offer.ctaLabel ?? `Falar sobre ${offer.name}`
export const offerNumber = (index: number) => String(index + 1).padStart(2, '0')
