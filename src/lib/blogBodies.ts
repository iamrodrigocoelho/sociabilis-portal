import * as blogIndex from 'virtual:blog-index'
import type { Locale } from '../i18n/locales'
import type { PostBody } from './blogTypes'

const bodyLoaders = blogIndex.bodyLoaders as Record<string, () => Promise<{ default: PostBody }>>

/**
 * Corpo dos posts, carregado sob demanda (um chunk por post). O carregamento é
 * disparado pela rota antes da hidratação/renderização (routes.ts → loadData),
 * para que a página leia o corpo de forma síncrona.
 */
const loaded = new Map<string, PostBody>()
const pending = new Map<string, Promise<PostBody | undefined>>()

const keyOf = (locale: Locale, slug: string) => `${locale}/${slug}`

export function loadPostBody(locale: Locale, slug: string | undefined): Promise<PostBody | undefined> {
  if (!slug) return Promise.resolve(undefined)
  const key = keyOf(locale, slug)
  if (!(key in bodyLoaders)) return Promise.resolve(undefined)
  const cached = loaded.get(key)
  if (cached) return Promise.resolve(cached)
  let promise = pending.get(key)
  if (!promise) {
    promise = bodyLoaders[key]().then((mod) => {
      loaded.set(key, mod.default)
      return mod.default
    })
    pending.set(key, promise)
  }
  return promise
}

/**
 * Lê o corpo já carregado. Se ainda não estiver (navegação client-side),
 * suspende a renderização até carregar (padrão Suspense do React 18).
 */
export function readPostBody(locale: Locale, slug: string): PostBody | undefined {
  const key = keyOf(locale, slug)
  const body = loaded.get(key)
  if (body || !(key in bodyLoaders)) return body
  throw loadPostBody(locale, slug)
}
