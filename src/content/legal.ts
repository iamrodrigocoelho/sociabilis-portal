/**
 * Política de privacidade. [ASSET] Preencher `sections` com o texto aprovado
 * ou informar `externalUrl`. Enquanto vazia, a página não é indexada.
 */
export interface PolicySection {
  heading: string
  paragraphs: string[]
}

export const PRIVACY_POLICY: {
  externalUrl: string | null
  updatedAt: string | null
  sections: PolicySection[]
} = {
  externalUrl: null,
  updatedAt: null,
  sections: [],
}

export const hasPrivacyPolicy = () =>
  Boolean(PRIVACY_POLICY.externalUrl) || PRIVACY_POLICY.sections.length > 0
