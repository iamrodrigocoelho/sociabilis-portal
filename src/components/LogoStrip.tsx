import type { Logo } from '../content/logos'
import { Eyebrow } from './Eyebrow'

interface LogoStripProps {
  label: string
  logos: Logo[]
  theme?: 'light' | 'night'
  className?: string
}

/**
 * Rótulo + logos monocromáticos em linha, com altura uniforme.
 * Não renderiza nada quando não há logos (seções sem asset ficam ocultas).
 */
export function LogoStrip({ label, logos, theme = 'light', className = '' }: LogoStripProps) {
  if (logos.length === 0) return null
  const night = theme === 'night'
  const mono = night ? 'brightness-0 invert' : 'grayscale'

  return (
    <div className={`flex flex-col gap-xl lg:flex-row lg:items-center lg:gap-3xl ${className}`}>
      <Eyebrow theme={theme} className={`shrink-0 ${night ? '!text-on-night-mid' : '!text-body-mid'}`}>
        {label}
      </Eyebrow>
      <ul className="flex flex-wrap items-center gap-x-2xl gap-y-xl">
        {logos.map((logo) => {
          const img = (
            <img
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              loading="lazy"
              decoding="async"
              className={`h-8 w-auto opacity-80 transition-opacity duration-200 hover:opacity-100 ${mono}`}
            />
          )
          return (
            <li key={logo.name}>
              {logo.url ? (
                <a href={logo.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-touch items-center">
                  {img}
                </a>
              ) : (
                img
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
