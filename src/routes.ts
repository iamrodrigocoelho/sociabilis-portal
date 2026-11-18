import { createElement, lazy, type ComponentType } from 'react'
import { matchRoutes } from 'react-router'

/**
 * Página carregada sob demanda (code splitting por rota) que pode ser
 * pré-carregada antes da hidratação. Depois de carregada, renderiza de forma
 * síncrona, evitando que o HTML pré-renderizado seja trocado por um fallback.
 */
export interface LazyPage {
  Component: ComponentType
  preload: () => Promise<unknown>
  /** Arquivo-fonte (usado no build para gerar <link rel="modulepreload">). */
  file: string
}

type PageModule = { default: ComponentType }

// Um chunk por página (code splitting por rota).
const pageModules = import.meta.glob<PageModule>('./pages/*.tsx')

function lazyPage(name: string): LazyPage {
  const file = `./pages/${name}.tsx`
  const loader = pageModules[file]
  if (!loader) throw new Error(`Página não encontrada: ${file}`)

  let Loaded: ComponentType | null = null
  let promise: Promise<PageModule> | null = null

  const preload = () => {
    promise ??= loader().then((mod) => {
      Loaded = mod.default
      return mod
    })
    return promise
  }

  const Lazy = lazy(preload)
  function Page() {
    return createElement(Loaded ?? Lazy)
  }

  return { Component: Page, preload, file: `src/pages/${name}.tsx` }
}

type Params = Record<string, string | undefined>

export interface AppRoute {
  path: string
  page: LazyPage
  /** Dados carregados junto com a página (antes da hidratação e no SSG). */
  loadData?: (params: Params) => Promise<unknown>
  /** Ids dos módulos usados por `loadData` (para <link rel="modulepreload"> no build). */
  dataModules?: (params: Params) => string[]
}

export const NOT_FOUND_PATH = '*'

export const routes: AppRoute[] = [
  { path: '/', page: lazyPage('HomePage') },
  { path: '/ia-no-seu-negocio', page: lazyPage('AiForBusinessPage') },
  { path: '/blog', page: lazyPage('BlogPage') },
  { path: '/blog/pagina/:page', page: lazyPage('BlogPage') },
  { path: '/blog/tag/:tag', page: lazyPage('BlogTagPage') },
  {
    path: '/blog/:slug',
    page: lazyPage('BlogPostPage'),
    loadData: async ({ slug }) => (await import('./lib/blogBodies')).loadPostBody(slug),
    dataModules: ({ slug }) => ['src/lib/blogBodies.ts', `virtual:blog-post/${slug}`],
  },
  { path: '/politica-de-privacidade', page: lazyPage('PrivacyPolicyPage') },
  { path: NOT_FOUND_PATH, page: lazyPage('NotFoundPage') },
]

const matchable = routes.map((r) => ({ path: r.path }))

function findRoute(pathname: string): { route: AppRoute; params: Params } | undefined {
  const match = matchRoutes(matchable, pathname)?.[0]
  return match ? { route: routes[matchable.indexOf(match.route)], params: match.params } : undefined
}

/** Carrega o chunk da página e os dados da rota de `pathname` (antes da hidratação e no SSG). */
export function preloadRoute(pathname: string): Promise<unknown> {
  const found = findRoute(pathname)
  if (!found) return Promise.resolve()
  return Promise.all([found.route.page.preload(), found.route.loadData?.(found.params)])
}

export function preloadAllRoutes(): Promise<unknown> {
  return Promise.all(routes.map((r) => r.page.preload()))
}

/** Módulos (chaves do manifest do Vite) da página e dos dados que atendem `pathname`. */
export function modulesFor(pathname: string): string[] {
  const found = findRoute(pathname)
  if (!found) return []
  return [found.route.page.file, ...(found.route.dataModules?.(found.params) ?? [])]
}

/** Rotas estáticas (sem parâmetros) a pré-renderizar. As do blog vêm de lib/blog. */
export function getStaticRoutePaths(): string[] {
  return routes.map((r) => r.path).filter((p) => p !== NOT_FOUND_PATH && !p.includes(':'))
}
