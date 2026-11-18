import * as blogIndex from 'virtual:blog-index'
import type { PostBody } from './blogTypes'

const bodyLoaders = blogIndex.bodyLoaders as Record<string, () => Promise<{ default: PostBody }>>

/**
 * Corpo dos posts, carregado sob demanda (um chunk por post). O carregamento é
 * disparado pela rota antes da hidratação/renderização (routes.ts → loadData),
 * para que a página leia o corpo de forma síncrona.
 */
const loaded = new Map<string, PostBody>()
const pending = new Map<string, Promise<PostBody | undefined>>()

export function loadPostBody(slug: string | undefined): Promise<PostBody | undefined> {
  if (!slug || !(slug in bodyLoaders)) return Promise.resolve(undefined)
  const cached = loaded.get(slug)
  if (cached) return Promise.resolve(cached)
  let promise = pending.get(slug)
  if (!promise) {
    promise = bodyLoaders[slug]().then((mod) => {
      loaded.set(slug, mod.default)
      return mod.default
    })
    pending.set(slug, promise)
  }
  return promise
}

/**
 * Lê o corpo já carregado. Se ainda não estiver (navegação client-side),
 * suspende a renderização até carregar (padrão Suspense do React 18).
 */
export function readPostBody(slug: string): PostBody | undefined {
  const body = loaded.get(slug)
  if (body || !(slug in bodyLoaders)) return body
  throw loadPostBody(slug)
}
