import { Container } from '../../components/Container'
import { FeatureItem } from '../../components/FeatureItem'
import { VALUE_ICONS, VALUE_ICONS_TITLE } from '../../content/home'

/** RF03: 4 colunas, sem métricas numéricas. */
export function ValueIconsSection() {
  return (
    <section aria-labelledby="value-icons-title" className="border-y border-line">
      <Container>
        {/* Título só para leitores de tela: mantém a hierarquia h1 → h2 → h3. */}
        <h2 id="value-icons-title" className="sr-only">
          {VALUE_ICONS_TITLE}
        </h2>
        <ul className="grid gap-2xl py-3xl sm:grid-cols-2 lg:grid-cols-4 lg:gap-xl">
          {VALUE_ICONS.map((item) => (
            <li key={item.title}>
              <FeatureItem icon={item.icon} title={item.title} iconSize={24}>
                {item.text}
              </FeatureItem>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
