import { useContext, useEffect } from 'react'
import { HeadContext } from '../lib/headContext'
import { applyHead, type SeoData } from '../lib/seo'

/**
 * Define title, meta description, canonical, Open Graph, Twitter e JSON-LD.
 * - No build (SSG): registra os dados no HeadContext; o <head> é escrito no HTML.
 * - No cliente: atualiza o <head> a cada navegação.
 */
export function Seo(props: SeoData) {
  const collector = useContext(HeadContext)
  if (collector) collector.seo = props

  const key = JSON.stringify(props)
  useEffect(() => {
    applyHead(JSON.parse(key) as SeoData)
  }, [key])

  return null
}
