/** Padrão geométrico da marca (fallback de capas e thumbnails sem imagem). Decorativo. */
export function BrandPattern({ seed = 0, className = '' }: { seed?: number; className?: string }) {
  // Varia levemente a composição para cards vizinhos não ficarem idênticos.
  const shift = (seed % 3) * 20
  return (
    <svg viewBox="0 0 160 90" className={`h-full w-full ${className}`} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="160" height="90" fill="#f4f7f5" />
      <polygon points={`0,90 ${60 + shift},20 110,90`} fill="#339966" fillOpacity="0.12" />
      <polygon points={`${60 + shift},20 160,0 110,90`} fill="#339966" fillOpacity="0.22" />
      <polygon points="110,90 160,0 160,90" fill="#8cc63f" fillOpacity="0.3" />
    </svg>
  )
}
