# DESIGN.md: Sociabilis AI Labs (v2, redesign)

> **Versão 2.0, novembro de 2026.** Substitui a v1, que reproduzia o design system da Zapier (laranja `#ff4f00`, creme, Degular Display) e não correspondia à identidade da Sociabilis.
>
> **Referência de estrutura:** o site da Dharma AI (dharma-ai.com.br) inspira a organização das páginas, o ritmo das seções e a linguagem visual minimalista. **Não copiar** textos, números, ícones, imagens ou logotipos da Dharma. Cores, tipografia e conteúdo são da Sociabilis.

## Overview

Um site de **laboratório de IA aplicada**: claro, técnico, editorial e sem ruído. A página é majoritariamente branca, com tipografia grande e firme, ícones em traço fino, seções modulares separadas por linhas finas (hairlines) e **poucas** faixas escuras de alto contraste para os momentos de manifesto e conversão.

A identidade vem do logotipo: **verde Sociabilis** (`#339966`), **verde-lima** (`#8cc63f`) e **grafite** (`#4d4d4d`). O verde é a marca. O lima é um acento de energia, usado com parcimônia e só sobre fundos escuros ou como elemento decorativo.

**Características-chave:**
- Fundo branco puro `{colors.canvas}` e superfícies em verde-acinzentado muito claro `{colors.canvas-soft}`.
- Um único verde de conversão `{colors.primary}` (`#267a4f`), uma versão acessível do verde do logo, para todos os CTAs primários.
- Texto em quase-preto com leve tom verde `{colors.ink}` e grafite do logo `{colors.body}`.
- Faixas escuras `{colors.night}` (verde-noite) para manifesto, CTA intermediário e footer.
- Ícones em traço fino (1.5px), monocromáticos.
- Setas `→` no lugar de bullets em frases-chave, para um tom direcional e orientado à ação.
- Divisores hairline de 1px entre seções e blocos, em vez de sombras.
- Rótulos de sequência (A, B, C… / 01, 02, 03…) para pilares, etapas e ofertas.

## Colors

### Brand
| Token | Hex | Uso |
|---|---|---|
| `{colors.brand}` | `#339966` | Verde do logo. Ícones, setas `→`, marcadores, linhas e detalhes gráficos (contraste não textual ≥ 3:1), títulos grandes (≥24px) sobre branco. **Não usar** em texto pequeno sobre branco ou `{colors.canvas-soft}` (contraste 3.57:1), inclusive rótulos de sequência. |
| `{colors.primary}` | `#267a4f` | Fundo dos CTAs primários, links de texto e texto verde pequeno sobre fundo claro (eyebrows, rótulos A/B/C e 01/02). Branco sobre ele: 5.28:1 (AA). |
| `{colors.primary-hover}` | `#1f6b45` | Hover/active do CTA primário (6.47:1). |
| `{colors.accent}` | `#8cc63f` | Verde-lima do logo. Apenas sobre `{colors.night}` (8.71:1) ou como elemento gráfico (linhas, marcadores, sublinhados). **Nunca** como texto sobre branco. |

### Surface
| Token | Hex | Uso |
|---|---|---|
| `{colors.canvas}` | `#ffffff` | Fundo padrão das páginas. |
| `{colors.canvas-soft}` | `#f4f7f5` | Cards, faixas alternadas, blocos de destaque. |
| `{colors.line}` | `#e3e8e5` | Hairlines, bordas de cards e inputs em repouso. |
| `{colors.night}` | `#0f1a14` | Faixas escuras (manifesto, CTA intermediário), footer, modal de contato (cabeçalho). |
| `{colors.night-soft}` | `#18261e` | Cards sobre `{colors.night}`. |

### Text
| Token | Hex | Uso |
|---|---|---|
| `{colors.ink}` | `#111412` | Títulos e texto primário (18.5:1). |
| `{colors.body}` | `#4d4d4d` | Grafite do logo. Texto corrido (8.45:1). |
| `{colors.body-mid}` | `#5f6661` | Metadados, legendas, datas (5.9:1). |
| `{colors.on-night}` | `#ffffff` | Texto sobre `{colors.night}`. |
| `{colors.on-night-mid}` | `#b8c2bc` | Texto secundário sobre `{colors.night}` (9.7:1). |

### Semantic (formulários)
- Erro: `#b42318`. Sucesso: `{colors.primary}`. Foco: anel de 2px `{colors.brand}` com offset de 2px.

## Typography

### Famílias
1. **Inter Tight** (600): títulos de display. Compacta e técnica, conversa com o lettering condensado do logo.
2. **Inter** (400/500/600): corpo, navegação, botões, formulários.
3. **JetBrains Mono** (500), opcional: rótulos de sequência (`01`, `A`) e eyebrows técnicos.

Fontes **self-hosted** (ex.: `@fontsource/inter`, `@fontsource/inter-tight`) com `font-display: swap`, subset latin. Não usar Google Fonts via CDN (privacidade e CSP).

### Hierarquia

| Token | Desktop | Mobile | Peso | Line height | Tracking | Uso |
|---|---|---|---|---|---|---|
| `{typography.display-xl}` | 64px | 40px | 600 | 1.05 | -0.02em | Hero (Inter Tight). |
| `{typography.display-lg}` | 48px | 32px | 600 | 1.1 | -0.02em | Títulos de seção e manifesto. |
| `{typography.display-md}` | 32px | 26px | 600 | 1.2 | -0.01em | Subtítulos de seção, títulos de oferta. |
| `{typography.heading-sm}` | 22px | 20px | 600 | 1.3 | -0.01em | Títulos de card. |
| `{typography.body-lg}` | 20px | 18px | 400 | 1.55 | 0 | Lead/introdução. |
| `{typography.body-md}` | 17px | 16px | 400 | 1.6 | 0 | Texto padrão. |
| `{typography.body-sm}` | 15px | 15px | 400 | 1.5 | 0 | Texto de card, metadados. |
| `{typography.caption}` | 13px | 13px | 400 | 1.4 | 0 | Notas legais, créditos. |
| `{typography.eyebrow}` | 13px | 12px | 500 | 1 | 0.12em | MAIÚSCULAS. Rótulo acima do título. |
| `{typography.label-seq}` | 14px | 14px | 500 | 1 | 0.04em | `A`, `B`, `01`, `02` (mono opcional). Cor `{colors.primary}` em fundo claro. |
| `{typography.button}` | 16px | 16px | 600 | 1 | 0 | Botões. |
| `{typography.prose}` | 18px | 17px | 400 | 1.7 | 0 | Corpo dos posts do blog (largura máx. 68ch). |

### Princípios
- Títulos em **sentence case**. Maiúsculas só no eyebrow.
- Títulos curtos e afirmativos. Frases de manifesto em linhas separadas, com ritmo.
- Uma ideia por título.

## Layout

### Espaçamento
- Base de 4px. Tokens: `xs` 4 · `sm` 8 · `md` 12 · `lg` 16 · `xl` 24 · `2xl` 32 · `3xl` 48 · `4xl` 64 · `5xl` 96 · `6xl` 128.
- Seções: `5xl` (96px) vertical no desktop, `4xl` (64px) no mobile. Hero: `6xl` no topo do desktop.
- Interior de card: `xl` (24px). Cards grandes de oferta: `2xl` (32px).

### Grid & container
- Container máximo de **1200px**, com gutters de 24px (mobile) e 32px (desktop).
- Grid de 12 colunas no desktop. Padrões: 4-up (ícones de valor), 3-up (pilares, mídia, posts), 2-up (ofertas na home).
- Texto corrido limitado a ~68ch.

### Breakpoints
| Nome | Largura | Mudanças |
|---|---|---|
| Mobile | < 640px | Grids 1-up, menu hambúrguer, hero empilhado. |
| Tablet | 640–1023px | Grids 2-up. |
| Desktop | ≥ 1024px | Grids completos, header com navegação horizontal. |

Sem rolagem horizontal em nenhuma largura. Alvos de toque com no mínimo 44×44px.

## Elevation & Depth

| Nível | Tratamento | Uso |
|---|---|---|
| 0 Flat | Sem borda nem sombra. | Hero, faixas de conteúdo. |
| 1 Hairline | 1px `{colors.line}`. | Cards padrão, inputs, divisores de seção. |
| 2 Soft | Fundo `{colors.canvas-soft}`. | Cards de destaque e blocos "ver mais" abertos. |
| 3 Overlay | `0 24px 48px -12px rgba(15,26,20,.25)` | **Apenas** modal de contato e menu mobile. |

Sem sombras em cards. Profundidade vem de contraste de superfície e hairlines.

## Shapes

| Token | Valor | Uso |
|---|---|---|
| `{rounded.none}` | 0 | Faixas full-bleed, divisores. |
| `{rounded.sm}` | 6px | Inputs, tags. |
| `{rounded.md}` | 10px | Botões, cards. |
| `{rounded.lg}` | 16px | Cards grandes de oferta, modal, capas de post. |
| `{rounded.pill}` | 9999px | Badges, chips de filtro do blog, chips de índice. |

## Iconography & imagery
- Ícones em traço fino de 1.5px, 24px ou 32px, cor `{colors.ink}` (ou `{colors.brand}` em destaque). Biblioteca leve com tree-shaking (ex.: `lucide-react`) ou SVGs próprios. Um estilo só.
- Ilustrações abstratas de redes, nós, grafos e folhas/ramificações, em linha, conectando IA e sustentabilidade. O pássaro geométrico do logo pode inspirar padrões de polígonos (low-poly) como textura de fundo em faixas escuras.
- **Evitar** robôs, cérebros brilhantes, mãos humanas tocando circuitos e banco de imagens genérico de "IA".
- Logos de clientes e parceiros em **monocromático** (grafite em fundo claro, branco em fundo escuro), altura uniforme (28–36px), `opacity: .8` com hover 1.

## Motion
- Sutil: fade + translateY(8px) em 200–300ms ao entrar na viewport (IntersectionObserver, sem biblioteca).
- Respeitar `prefers-reduced-motion`: sem animação.
- Faixa de logos pode rolar em loop lento (marquee CSS), pausando no hover, com versão estática se `reduced-motion`.

## Components

### Buttons
- **`button-primary`**: fundo `{colors.primary}`, texto branco, `{typography.button}`, padding 14px 24px, `{rounded.md}`. Hover `{colors.primary-hover}`.
- **`button-secondary`**: fundo transparente, texto `{colors.ink}`, borda 1px `{colors.ink}`. Hover com fundo `{colors.ink}` e texto branco.
- **`button-on-night`**: sobre faixa escura, fundo `{colors.accent}`, texto `{colors.night}`.
- **`link-arrow`**: texto `{colors.primary}` 600 + `→`. A seta desloca 4px no hover. Usado para "Veja mais", "Saber mais" e "Ver todos".

### Navigation
- **`header`**: sticky, fundo branco com `backdrop-blur` e hairline inferior ao rolar. Logo à esquerda (altura 32–36px). Links ao centro/direita. CTA `button-primary` "Fale conosco" à direita.
- **`nav-link`**: `{typography.body-sm}` 500, `{colors.ink}`. Ativo com sublinhado de 2px `{colors.brand}`.
- **`mobile-menu`**: painel em tela cheia, links grandes (`display-md`), CTA ao final. Fecha com Esc e devolve o foco ao botão.
- **`skip-link`**: "Pular para o conteúdo" ("Skip to content" em inglês), visível no foco.
- **`language-switcher`**: "PT | EN" em `{typography.body-sm}` 500. O idioma atual fica em `{colors.ink}` com sublinhado de 2px `{colors.brand}` e `aria-current`; o outro, em `{colors.body-mid}`, é link com `hreflang` e `lang`. Fica antes do CTA no header desktop e acima do CTA no menu mobile. Alvos de 44px.

### Signature sections (inspiradas na estrutura da Dharma)
- **`hero`**: eyebrow + `display-xl` + lead `body-lg` + 2 CTAs. Ilustração abstrata à direita no desktop. Fundo branco.
- **`value-icons`**: 4 colunas com ícone, título curto (`heading-sm`) e uma linha de apoio. Hairline acima e abaixo. **Sem números inventados.**
- **`logo-strip`**: rótulo eyebrow à esquerda ("Parceiros e certificações" / "Clientes") e logos em linha.
- **`manifesto-band`**: fundo `{colors.night}`, eyebrow em `{colors.accent}`, título `display-lg` branco, frases curtas em linhas separadas, palavra-chave destacada em `{colors.accent}`.
- **`lettered-cards`**: cards com rótulo `A`, `B`, `C` em `{colors.primary}` (texto pequeno: `brand` não atinge AA), título e texto. Sobre `{colors.night}`, rótulo em `{colors.accent}`. Hairline à esquerda ou acima.
- **`offer-card`** (home): card hairline com ícone, nome, uma frase e `link-arrow` "Veja mais" para a âncora da oferta na página "IA no seu negócio".
- **`cta-band`**: faixa `{colors.night}` com uma frase forte + `button-on-night`.
- **`media-card`**: thumbnail 16:9 `{rounded.lg}`, badge de tipo (Artigo / Podcast / Na mídia), data, título e `link-arrow`.
- **`arrow-statement`**: parágrafo iniciado por `→` em `{colors.brand}`, `body-lg`, para afirmações-chave.

### Página "IA no seu negócio"
- **`offer-index`**: linha de chips (pill) com âncoras para as 6 ofertas, sticky abaixo do header no desktop.
- **`offer-block`**: bloco longo por oferta, separado por hairline. Contém: rótulo `01`–`06`, nome (`display-md`), pitch, qualificador "Para quem é", lista de 3 `feature-item`, `expandable` "Ver mais", `steps` "Como funciona", entregáveis/resultados, casos de uso e CTA.
- **`feature-item`**: ícone 32px + título + 1–2 linhas.
- **`expandable`**: `<details>/<summary>` nativo, com rótulo "Ver mais"/"Ver menos" e chevron. Fundo `{colors.canvas-soft}` quando aberto.
- **`steps`**: lista ordenada horizontal (desktop) ou vertical (mobile), com número `label-seq` em círculo hairline e linha conectora.

### Blog
- **`post-card`**: capa 16:9 (opcional, com fallback de padrão geométrico na cor da marca), tag, data, tempo de leitura, título `heading-sm`, resumo de 2 linhas.
- **`tag-chip`**: pill hairline. Ativo com fundo `{colors.ink}` e texto branco.
- **`post-layout`**: coluna de 68ch, título `display-lg`, meta (autor, data, leitura), capa, corpo em `{typography.prose}`. Headings `h2` 28px e `h3` 22px. Links em `{colors.primary}` sublinhados. `blockquote` com borda esquerda 3px `{colors.brand}`. `code` em mono sobre `{colors.canvas-soft}`. Imagens `{rounded.md}` com legenda `caption`.
- **`post-cta`**: card `{colors.canvas-soft}` ao final do post com convite ao contato.
- **`pagination`**: anterior/próxima + números, alvos de 44px.

### Forms
- **`text-input`**: fundo branco, borda 1px `{colors.line}`, foco com borda `{colors.brand}` + anel, `{rounded.sm}`, padding 12px 16px, label sempre visível acima.
- **`checkbox-group`**: para "Interesse" no formulário de contato. Grid 2-up no desktop.
- **`contact-modal`**: `<dialog>` nativo, `{rounded.lg}`, nível 3, título + formulário. Fecha com Esc e clique fora, com foco preso dentro.

### Footer
- Fundo `{colors.night}`, logo em versão clara (ou monocromática), descrição curta, colunas (Navegação, IA no seu negócio, Conteúdo, Contato), redes sociais, linha de parceiros/certificações, política de privacidade e copyright.

## Changelog

- **v2.1 (nov/2026, QA):** rótulos de sequência (A/B/C, 01/02), eyebrows e outros textos verdes pequenos sobre fundo claro passam de `{colors.brand}` para `{colors.primary}`, para atingir contraste AA. `{colors.brand}` segue para ícones, setas e detalhes gráficos.

## Do's and Don'ts

### Do
- Usar `{colors.primary}` só para CTAs e links. Um CTA primário por bloco.
- Manter a página predominantemente branca e usar faixas `{colors.night}` no máximo 2–3 vezes por página.
- Separar seções com hairlines e respiro generoso.
- Usar `→` em frases-chave e rótulos A/B/C e 01/02 para estruturar.
- Garantir contraste AA em todo texto (verificar combinações novas).

### Don't
- Não usar o laranja ou o creme da v1.
- Não usar `{colors.accent}` (lima) como texto ou fundo de botão sobre branco.
- Não usar gradientes chamativos, glows neon ou "visual de IA" genérico.
- Não usar números ou métricas de desempenho sem fonte ou case real (a Dharma usa "200x" e similares; a Sociabilis **não** replica esse recurso sem dados próprios).
- Não copiar textos, ícones, ilustrações ou logos do site de referência.
- Não aplicar sombras em cards.
