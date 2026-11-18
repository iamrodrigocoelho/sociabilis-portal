import { SITE_CONFIG } from '../config/contact'

interface LogoProps {
  /** `night`: versão monocromática branca para fundos escuros. */
  theme?: 'light' | 'night'
  className?: string
}

/** Logotipo (versão 240px, 2x para exibição em até ~36px de altura). */
export function Logo({ theme = 'light', className = 'h-8 lg:h-9' }: LogoProps) {
  return (
    <img
      src="/img/logo-sociabilis-240.png"
      alt={SITE_CONFIG.name}
      width={240}
      height={75}
      decoding="async"
      className={`w-auto ${theme === 'night' ? 'brightness-0 invert' : ''} ${className}`}
    />
  )
}
