/**
 * Módulo gerado por scripts/vite-plugin-blog.ts. Declarações ambientes não
 * podem importar tipos por caminho relativo: os tipos concretos (PostMeta,
 * PostBody) são aplicados em src/lib/blog.ts e src/lib/blogBodies.ts.
 */
declare module 'virtual:blog-index' {
  export const posts: unknown[]
  export const bodyLoaders: Record<string, () => Promise<{ default: unknown }>>
}
