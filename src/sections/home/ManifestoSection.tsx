import { DarkBand } from '../../components/DarkBand'
import { Eyebrow } from '../../components/Eyebrow'
import { Reveal } from '../../components/Reveal'
import { MANIFESTO } from '../../content/home'

/** "Texto **destaque** texto" → nós React, sem HTML bruto. */
function renderHighlight(line: string) {
  return line.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-accent">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

/** RF05: manifesto em faixa escura, âncora #sobre. */
export function ManifestoSection() {
  return (
    <DarkBand id={MANIFESTO.id} labelledBy="manifesto-title">
      <Reveal className="grid gap-3xl lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow theme="night" className="mb-lg">
            {MANIFESTO.eyebrow}
          </Eyebrow>
          <h2 id="manifesto-title" className="text-display-lg text-balance text-on-night">
            {MANIFESTO.title}
          </h2>
        </div>
        <div className="lg:col-span-7">
          <ul className="flex flex-col">
            {MANIFESTO.lines.map((line) => (
              <li key={line} className="border-t border-night-soft py-lg text-display-md text-on-night first:border-t-0 first:pt-0">
                {renderHighlight(line)}
              </li>
            ))}
          </ul>
          <p className="mt-2xl max-w-prose text-body-lg text-on-night-mid">{MANIFESTO.paragraph}</p>
        </div>
      </Reveal>
    </DarkBand>
  )
}
