import { OFFERS, START_INTEREST } from './offers'

/** Opções de interesse do formulário (RF11): as 6 ofertas + "por onde começar". */
export const CONTACT_INTERESTS: { slug: string; label: string }[] = [
  ...OFFERS.map((o) => ({ slug: o.slug, label: o.name })),
  START_INTEREST,
]

export const isContactInterest = (slug: string | null | undefined): slug is string =>
  Boolean(slug) && CONTACT_INTERESTS.some((i) => i.slug === slug)

/** Textos do formulário de contato (RF11) e do modal. */
export const CONTACT_FORM = {
  fields: {
    nome: { label: 'Nome', placeholder: 'Seu nome completo', autoComplete: 'name' },
    email: { label: 'E-mail corporativo', placeholder: 'voce@empresa.com.br', autoComplete: 'email' },
    empresa: { label: 'Empresa', placeholder: 'Nome da sua empresa', autoComplete: 'organization' },
    cargo: { label: 'Cargo', placeholder: 'Ex.: Head de Inovação', autoComplete: 'organization-title' },
    mensagem: { label: 'Mensagem', placeholder: 'Conte um pouco sobre o seu contexto (opcional)', autoComplete: 'off' },
  },
  interests: { legend: 'Tenho interesse em', hint: 'Selecione ao menos uma opção.' },
  optional: '(opcional)',
  requiredHint: 'Campos com * são obrigatórios.',
  submit: 'Enviar mensagem',
  submitting: 'Enviando…',
  success: { title: 'Mensagem enviada.', text: 'Obrigado pelo contato. Retornaremos em breve.' },
  errors: {
    required: 'Preencha os campos obrigatórios.',
    email: 'Informe um e-mail válido.',
    interests: 'Selecione ao menos um interesse.',
    captcha: 'Por favor, confirme que você não é um robô.',
    generic: 'Ocorreu um erro. Tente novamente.',
    network: 'Erro de conexão. Verifique sua internet e tente novamente.',
  },
  privacy: {
    before: 'Seus dados serão usados exclusivamente para responder a este contato. Saiba mais na nossa ',
    linkLabel: 'política de privacidade',
    after: '. Este site é protegido pelo reCAPTCHA do Google, sujeito à ',
    googlePrivacy: { label: 'Política de Privacidade', href: 'https://policies.google.com/privacy' },
    and: ' e aos ',
    googleTerms: { label: 'Termos de Serviço', href: 'https://policies.google.com/terms' },
    end: ' do Google.',
  },
}

export const CONTACT_MODAL = {
  title: 'Fale com a Sociabilis AI Labs',
  subtitle: 'Conte o que você precisa e nossa equipe retorna para entender como podemos ajudar.',
  close: 'Fechar',
}
