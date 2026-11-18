import type { Locale } from '../i18n/locales'

/**
 * Política de privacidade. [ASSET] Preencher `sections` com o texto aprovado
 * ou informar `externalUrl`. Enquanto vazia, a página não é indexada.
 */
export interface PolicySection {
  heading: string
  paragraphs: string[]
}

interface PrivacyPolicy {
  externalUrl: string | null
  /** AAAA-MM-DD */
  updatedAt: string | null
  sections: PolicySection[]
}

/** Uma versão por idioma. [ASSET] Texto PT e tradução EN aprovados. */
export const PRIVACY_POLICY: Record<Locale, PrivacyPolicy> = {
  pt: { externalUrl: null, updatedAt: null, sections: [] },
  en: { externalUrl: null, updatedAt: null, sections: [] },
}

export const hasPrivacyPolicy = (locale: Locale) =>
  Boolean(PRIVACY_POLICY[locale].externalUrl) || PRIVACY_POLICY[locale].sections.length > 0
