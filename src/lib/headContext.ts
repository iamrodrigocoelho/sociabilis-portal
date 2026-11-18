import { createContext } from 'react'
import type { SeoData } from './seo'

/**
 * Coletor usado apenas na pré-renderização: o componente <Seo> grava aqui os
 * metadados da página para que o script de build gere o <head> estático.
 */
export interface HeadCollector {
  seo?: SeoData
}

export const HeadContext = createContext<HeadCollector | null>(null)
