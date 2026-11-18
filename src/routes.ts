import { createElement, lazy, type ComponentType } from 'react'
import { matchRoutes } from 'react-router'
import { BLOG_PAGE_SEGMENT, LOCALES, PATHS, type Locale } from './i18n/locales'

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

const PAGES = {
  home: lazyPage('HomePage'),
  offers: lazyPage('AiForBusinessPage'),
  blog: lazyPage('BlogPage'),
  blogTag: lazyPage('BlogTagPage'),
  blogPost: lazyPage('BlogPostPage'),
  privacy: lazyPage('PrivacyPolicyPage'),
  notFound: lazyPage('NotFoundPage'),
}

/** Rotas de um idioma (RF40). As páginas leem o idioma do contexto (Layout). */
function localeRoutes(locale: Locale): AppRoute[] {
  const blog = PATHS.blog[locale]
  return [
    { path: PATHS.home[locale], page: PAGES.home },
    { path: PATHS.offers[locale], page: PAGES.offers },
    { path: blog, page: PAGES.blog },
    { path: `${blog}/${BLOG_PAGE_SEGMENT[locale]}/:page`, page: PAGES.blog },
    { path: `${blog}/tag/:tag`, page: PAGES.blogTag },
    {
      path: `${blog}/:slug`,
      page: PAGES.blogPost,
      loadData: async ({ slug }) => (await import('./lib/blogBodies')).loadPostBody(locale, slug),
      dataModules: ({ slug }) => ['src/lib/blogBodies.ts', `virtual:blog-post/${locale}/${slug}`],
    },
    { path: PATHS.privacy[locale], page: PAGES.privacy },
  ]
}

export const routes: AppRoute[] = [
  ...LOCALES.flatMap(localeRoutes),
  { path: NOT_FOUND_PATH, page: PAGES.notFound },
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
  const blogIndexes = new Set<string>(LOCALES.map((l) => PATHS.blog[l]))
  // Os índices do blog entram por blogPrerenderPaths().
  return routes.map((r) => r.path).filter((p) => p !== NOT_FOUND_PATH && !p.includes(':') && !blogIndexes.has(p))
}
