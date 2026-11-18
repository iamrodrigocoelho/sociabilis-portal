import plugin from 'tailwindcss/plugin'

/**
 * Tokens do docs/DESIGN.md (v2). Alterações no design system devem ser feitas
 * primeiro no DESIGN.md e depois aqui.
 */

// Tipografia: [mobile, desktop, peso, line-height, tracking, família]
// Desktop a partir do breakpoint `lg` (1024px).
const TYPE_SCALE = {
  'display-xl': ['2rem', '3.5rem', 400, '1.12', '-0.025em', 'sans'],
  'display-lg': ['2rem', '3rem', 600, '1.1', '-0.02em', 'display'],
  'display-md': ['1.625rem', '2rem', 600, '1.2', '-0.01em', 'display'],
  'heading-sm': ['1.25rem', '1.375rem', 600, '1.3', '-0.01em', 'display'],
  'body-lg': ['1.125rem', '1.25rem', 400, '1.55', '0', 'sans'],
  'body-md': ['1rem', '1.0625rem', 400, '1.6', '0', 'sans'],
  'body-sm': ['0.9375rem', '0.9375rem', 400, '1.5', '0', 'sans'],
  caption: ['0.8125rem', '0.8125rem', 400, '1.4', '0', 'sans'],
  eyebrow: ['0.75rem', '0.8125rem', 500, '1', '0.12em', 'sans'],
  'label-seq': ['0.875rem', '0.875rem', 500, '1', '0.04em', 'sans'],
  button: ['1rem', '1rem', 600, '1', '0', 'sans'],
  prose: ['1.0625rem', '1.125rem', 400, '1.7', '0', 'sans'],
}

const FONT_FAMILY = {
  display: ['"Inter Tight"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
  sans: ['Inter', '"Inter Fallback"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand
        brand: '#339966',
        primary: {
          DEFAULT: '#267a4f',
          hover: '#1f6b45',
        },
        accent: '#8cc63f',
        // Surface
        canvas: {
          DEFAULT: '#ffffff',
          soft: '#f4f7f5',
        },
        line: '#e3e8e5',
        hero: '#e4ede7',
        night: {
          DEFAULT: '#0f1a14',
          soft: '#18261e',
        },
        // Text
        ink: '#111412',
        body: {
          DEFAULT: '#4d4d4d',
          mid: '#5f6661',
        },
        'on-night': {
          DEFAULT: '#ffffff',
          mid: '#b8c2bc',
        },
        // Semantic
        error: '#b42318',
      },
      fontFamily: FONT_FAMILY,
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '32px',
        '3xl': '48px',
        '4xl': '64px',
        '5xl': '96px',
        '6xl': '128px',
      },
      borderRadius: {
        none: '0',
        sm: '6px',
        md: '10px',
        lg: '16px',
        pill: '9999px',
        hero: '32px',
        'hero-lg': '48px',
      },
      boxShadow: {
        overlay: '0 24px 48px -12px rgba(15, 26, 20, 0.25)',
      },
      maxWidth: {
        container: '1200px',
        prose: '68ch',
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
    },
  },
  plugins: [
    // Gera `.text-display-xl`, `.text-body-md`, `.text-eyebrow` etc. com valores
    // mobile e desktop do DESIGN.md.
    plugin(({ addComponents, theme }) => {
      const lg = theme('screens.lg')
      const components = {}
      for (const [name, [mobile, desktop, weight, lineHeight, tracking, family]] of Object.entries(
        TYPE_SCALE,
      )) {
        components[`.text-${name}`] = {
          fontFamily: FONT_FAMILY[family].join(', '),
          fontSize: mobile,
          fontWeight: String(weight),
          lineHeight,
          letterSpacing: tracking,
          ...(name === 'eyebrow' ? { textTransform: 'uppercase' } : {}),
          ...(mobile !== desktop ? { [`@media (min-width: ${lg})`]: { fontSize: desktop } } : {}),
        }
      }
      addComponents(components)
    }),
  ],
}
