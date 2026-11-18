import type { Locale } from '../i18n/locales'
import { OFFERS, START_INTEREST, START_INTEREST_SLUG } from './offers'

/** Opções de interesse do formulário (RF11): as 6 ofertas + "por onde começar". Slugs iguais nos dois idiomas. */
export const contactInterests = (locale: Locale): { slug: string; label: string }[] => [
  ...OFFERS[locale].map((o) => ({ slug: o.slug, label: o.name })),
  START_INTEREST[locale],
]

/** Lista branca exportada no build para o server.js (rótulos em PT: o e-mail interno é em português). */
export const CONTACT_INTERESTS = contactInterests('pt')

const VALID_SLUGS = new Set([...OFFERS.pt.map((o) => o.slug), START_INTEREST_SLUG])
export const isContactInterest = (slug: string | null | undefined): slug is string => Boolean(slug) && VALID_SLUGS.has(slug!)

/** Códigos de erro devolvidos por /api/contact (server.js). */
export type ContactErrorCode =
  | 'required'
  | 'email'
  | 'interests'
  | 'invalid'
  | 'too_long'
  | 'captcha'
  | 'rate_limited'
  | 'unavailable'
  | 'send_failed'

const pt = {
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
    invalid: 'Dados inválidos. Revise o formulário.',
    too_long: 'Um dos campos excede o tamanho permitido.',
    captcha: 'Não foi possível confirmar o envio. Tente novamente em instantes.',
    rate_limited: 'Muitas tentativas em pouco tempo. Tente novamente em alguns minutos.',
    unavailable: 'O formulário está temporariamente indisponível. Tente novamente mais tarde.',
    send_failed: 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.',
    generic: 'Ocorreu um erro. Tente novamente.',
    network: 'Erro de conexão. Verifique sua internet e tente novamente.',
  } satisfies Record<ContactErrorCode | 'generic' | 'network', string>,
  privacy: {
    before: 'Seus dados serão usados exclusivamente para responder a este contato. Saiba mais na nossa ',
    linkLabel: 'política de privacidade',
    after: '. Este site é protegido pelo reCAPTCHA do Google, sujeito à ',
    googlePrivacy: { label: 'Política de Privacidade', href: 'https://policies.google.com/privacy' },
    and: ' e aos ',
    googleTerms: { label: 'Termos de Serviço', href: 'https://policies.google.com/terms' },
    end: ' do Google.',
  },
  recaptchaLang: 'pt-BR',
  modal: {
    title: 'Fale com a Sociabilis AI Labs',
    subtitle: 'Conte o que você precisa e nossa equipe retorna para entender como podemos ajudar.',
    close: 'Fechar',
  },
}

// [VALIDAR EN]
const en: typeof pt = {
  fields: {
    nome: { label: 'Name', placeholder: 'Your full name', autoComplete: 'name' },
    email: { label: 'Work email', placeholder: 'you@company.com', autoComplete: 'email' },
    empresa: { label: 'Company', placeholder: 'Your company name', autoComplete: 'organization' },
    cargo: { label: 'Job title', placeholder: 'e.g. Head of Innovation', autoComplete: 'organization-title' },
    mensagem: { label: 'Message', placeholder: 'Tell us a bit about your context (optional)', autoComplete: 'off' },
  },
  interests: { legend: "I'm interested in", hint: 'Select at least one option.' },
  optional: '(optional)',
  requiredHint: 'Fields marked with * are required.',
  submit: 'Send message',
  submitting: 'Sending…',
  success: { title: 'Message sent.', text: 'Thank you for reaching out. We will get back to you soon.' },
  errors: {
    required: 'Please fill in the required fields.',
    email: 'Please enter a valid email address.',
    interests: 'Please select at least one interest.',
    invalid: 'Invalid data. Please review the form.',
    too_long: 'One of the fields is too long.',
    captcha: "We couldn't verify your submission. Please try again in a moment.",
    rate_limited: 'Too many attempts in a short time. Please try again in a few minutes.',
    unavailable: 'The form is temporarily unavailable. Please try again later.',
    send_failed: 'We could not send your message. Please try again later.',
    generic: 'Something went wrong. Please try again.',
    network: 'Connection error. Please check your internet connection and try again.',
  },
  privacy: {
    before: 'Your data will only be used to reply to this message. Learn more in our ',
    linkLabel: 'privacy policy',
    after: '. This site is protected by reCAPTCHA and the Google ',
    googlePrivacy: { label: 'Privacy Policy', href: 'https://policies.google.com/privacy' },
    and: ' and ',
    googleTerms: { label: 'Terms of Service', href: 'https://policies.google.com/terms' },
    end: ' apply.',
  },
  recaptchaLang: 'en',
  modal: {
    title: 'Talk to Sociabilis AI Labs',
    subtitle: 'Tell us what you need and our team will get back to you to understand how we can help.',
    close: 'Close',
  },
}

export const CONTACT_FORM: Record<Locale, typeof pt> = { pt, en }
