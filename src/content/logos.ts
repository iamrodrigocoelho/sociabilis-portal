/**
 * Logos de parceiros, certificações e clientes.
 * [ASSET] Adicionar somente logos com autorização de uso.
 * Arquivos em public/logos/ (SVG preferencialmente, monocromático).
 */
export interface Logo {
  name: string
  /** Caminho a partir da raiz pública, ex.: "/logos/parceiro.svg". */
  src: string
  width: number
  height: number
  url?: string
  category: 'partner' | 'client'
}

export const LOGOS: Logo[] = []

/** A faixa de clientes só aparece com pelo menos este número de logos (RF10). */
export const MIN_CLIENT_LOGOS = 4

export const partnerLogos = () => LOGOS.filter((l) => l.category === 'partner')
export const clientLogos = () => {
  const clients = LOGOS.filter((l) => l.category === 'client')
  return clients.length >= MIN_CLIENT_LOGOS ? clients : []
}
