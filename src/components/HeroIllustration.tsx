/**
 * Ilustração abstrata do hero: rede de nós e triângulos low-poly, inspirada
 * no pássaro geométrico do logo. Decorativa (aria-hidden), em SVG inline.
 */
const NODES: [number, number][] = [
  [60, 300], [150, 190], [170, 360], [250, 110], [270, 260],
  [300, 420], [360, 180], [390, 330], [450, 80], [470, 240],
  [500, 400], [560, 160], [580, 300],
]

const TRIANGLES: [number, number, number][] = [
  [0, 1, 4], [0, 4, 2], [2, 4, 5], [1, 3, 4], [3, 6, 4],
  [4, 6, 7], [4, 7, 5], [5, 7, 10], [3, 8, 6], [6, 8, 9],
  [6, 9, 7], [7, 9, 10], [8, 11, 9], [9, 11, 12], [9, 12, 10],
]

// Triângulos destacados (verde da marca / lima) para dar ritmo.
const HIGHLIGHT = new Set([3, 6, 10])
const ACCENT = new Set([13])
const KEY_NODES = new Set([4, 9])

export function HeroIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 480" fill="none" aria-hidden="true" focusable="false" className={className}>
      {TRIANGLES.map(([a, b, c], i) => {
        const points = [NODES[a], NODES[b], NODES[c]].map((p) => p.join(',')).join(' ')
        const fill = ACCENT.has(i) ? '#8cc63f' : HIGHLIGHT.has(i) ? '#339966' : '#f4f7f5'
        const opacity = ACCENT.has(i) ? 0.35 : HIGHLIGHT.has(i) ? 0.14 : 1
        return <polygon key={i} points={points} fill={fill} fillOpacity={opacity} stroke="#e3e8e5" strokeWidth={1.5} strokeLinejoin="round" />
      })}
      {TRIANGLES.flatMap(([a, b, c], i) =>
        HIGHLIGHT.has(i) || ACCENT.has(i)
          ? [[a, b], [b, c], [c, a]].map(([p, q]) => (
              <line
                key={`${i}-${p}-${q}`}
                x1={NODES[p][0]}
                y1={NODES[p][1]}
                x2={NODES[q][0]}
                y2={NODES[q][1]}
                stroke="#339966"
                strokeWidth={1.5}
                strokeOpacity={0.6}
              />
            ))
          : [],
      )}
      {NODES.map(([x, y], i) => (
        <g key={i}>
          {KEY_NODES.has(i) && <circle cx={x} cy={y} r={14} fill="#8cc63f" fillOpacity={0.25} />}
          <circle cx={x} cy={y} r={KEY_NODES.has(i) ? 6 : 4} fill={KEY_NODES.has(i) ? '#339966' : '#ffffff'} stroke="#339966" strokeWidth={1.5} />
        </g>
      ))}
    </svg>
  )
}
