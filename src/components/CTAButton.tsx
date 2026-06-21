interface CTAButtonProps {
  href: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline-light'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function CTAButton({
  href,
  variant = 'primary',
  children,
  className = '',
  onClick,
}: CTAButtonProps) {
  const base =
    'inline-block px-6 py-3 rounded-xl text-[18px] font-semibold leading-[27px] transition-opacity duration-150 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2'

  const variants: Record<string, string> = {
    primary: 'bg-primary text-canvas focus-visible:outline-primary',
    secondary: 'bg-ink text-canvas focus-visible:outline-ink',
    tertiary: 'bg-canvas text-ink border border-ink hover:bg-canvas-soft focus-visible:outline-ink',
    'outline-light':
      'bg-transparent text-canvas border border-canvas/60 hover:border-canvas focus-visible:outline-canvas',
  }

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`} onClick={onClick}>
      {children}
    </a>
  )
}
