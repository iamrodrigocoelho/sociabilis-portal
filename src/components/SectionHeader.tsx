interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  theme?: 'light' | 'dark'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  theme = 'light',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'
  const eyebrowColor = theme === 'dark' ? 'text-canvas/50' : 'text-body-mid'
  const titleColor = theme === 'dark' ? 'text-canvas' : 'text-ink'
  const subtitleColor = theme === 'dark' ? 'text-canvas/70' : 'text-body'
  const maxWidthClass = align === 'center' ? 'mx-auto' : ''

  return (
    <div className={`${alignClass} mb-12 md:mb-16 ${className}`}>
      {eyebrow && (
        <p
          className={`${eyebrowColor} text-[13px] font-medium tracking-[1.2px] uppercase mb-3`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`${titleColor} text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-5 max-w-3xl ${maxWidthClass}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`${subtitleColor} text-lg leading-relaxed max-w-2xl ${maxWidthClass}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
