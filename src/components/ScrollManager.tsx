import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

const MAX_FRAMES = 60

/**
 * - Âncoras funcionam a partir de qualquer página (ex.: /blog → /#sobre):
 *   aguarda a página (lazy) renderizar e rola até o elemento.
 * - Em navegações sem âncora, volta ao topo e move o foco para o <main>
 *   (leitores de tela anunciam a nova página).
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const lastKey = useRef<string | null>(null)

  useEffect(() => {
    const initial = lastKey.current === null
    if (lastKey.current === key) return // StrictMode (dev) executa efeitos duas vezes
    lastKey.current = key

    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      let frames = 0
      let raf = 0
      const tryScroll = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView()
          return
        }
        if (++frames < MAX_FRAMES) raf = requestAnimationFrame(tryScroll)
      }
      tryScroll()
      return () => cancelAnimationFrame(raf)
    }

    if (!initial) {
      window.scrollTo(0, 0)
      document.getElementById('main-content')?.focus({ preventScroll: true })
    }
  }, [pathname, hash, key])

  return null
}
