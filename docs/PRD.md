# PRD: Website Sociabilis AI Labs (v2, redesign + IA no seu negócio + Blog)

> **Versão 2.0, novembro de 2026.** Substitui a v1 (landing page one-page).
> Mudanças principais: (1) redesign da home com estrutura inspirada na Dharma AI e identidade visual da Sociabilis; (2) nova página **IA no seu negócio**; (3) novo **Blog** em Markdown; (4) site passa de one-page para **multipágina com rotas**.
>
> Itens marcados com **[VALIDAR]** são propostas de texto que a Sociabilis precisa confirmar antes da publicação. Itens marcados com **[ASSET]** dependem de arquivos ou informações a fornecer.

---

## 1. Visão geral

### Produto
Website institucional e comercial da **Sociabilis AI Labs**, divisão de inteligência artificial aplicada da Sociabilis.

### Objetivo da v2
1. Modernizar a home com uma estrutura de **laboratório de IA aplicada** (referência: dharma-ai.com.br), mais enxuta, editorial e com prova social.
2. Criar a página **IA no seu negócio**, que detalha as 6 ofertas como caminhos de contratação (referência: dharma-ai.com.br/ia-para-sua-empresa).
3. Criar um **Blog** para autoridade, SEO e nutrição de leads, também alimentando a seção "Mídia e publicações".
4. Manter o formulário de contato existente (Resend + reCAPTCHA), agora com campo de interesse por oferta.

### Referências obrigatórias
- Design system: `docs/DESIGN.md` (v2)
- Logotipo: `img/logo-big-sociabilis.png` (também `public/img/`)
- Configuração de contato: `src/config/contact.ts`

### Sobre a referência (Dharma AI)
A Dharma é referência de **estrutura, ritmo e linguagem visual**. É proibido copiar textos, números, ícones, ilustrações, vídeos ou logotipos do site da Dharma. Todo o conteúdo deve ser da Sociabilis.

---

## 2. Marca e posicionamento (mantido da v1)

**Posicionamento:** Sociabilis AI Labs é um laboratório de implantação de IA responsável e sustentável para empresas responsáveis, B Corps e negócios de impacto.

**Descrição curta:** AI Deployment Lab for Sustainable Business Transformation.

**Frase principal:** Implantamos IA responsável e sustentável no coração da operação do seu negócio.

**Foco:** AI Deployment, Forward Deployed AI, copilotos internos, agentes, automação inteligente, RAG, governança, segurança e privacidade, IA sustentável e mitigação da pegada socioambiental da IA.

## 3. Público-alvo (mantido da v1)

Empresas responsáveis, B Corps, negócios de impacto, PMEs em transformação digital, consultorias ESG, startups, terceiro setor e áreas de inovação, tecnologia, sustentabilidade, produto e operações.

Perfil do visitante: decisor ou influenciador (CEO, fundador, head de inovação/tecnologia, gestor de sustentabilidade, produto ou operações) que quer aplicar IA com segurança, governança, controle de custo e responsabilidade socioambiental.

---

## 4. Escopo da v2

### Páginas e rotas

| Rota | Página | Status |
|---|---|---|
| `/` | Home (redesign) | Alterar |
| `/ia-no-seu-negocio` | IA no seu negócio | Nova |
| `/blog` | Lista de posts | Nova |
| `/blog/pagina/:n` | Paginação do blog | Nova |
| `/blog/tag/:tag` | Posts por tag | Nova |
| `/blog/:slug` | Post | Nova |
| `/politica-de-privacidade` | Política de privacidade | Nova [ASSET: texto ou URL externa] |
| `*` | 404 | Nova |
| `/sitemap.xml`, `/robots.txt`, `/blog/rss.xml` | Arquivos de SEO | Novos/atualizar |

### Navegação principal (header)
- Início → `/`
- IA no seu negócio → `/ia-no-seu-negocio`
- Blog → `/blog`
- Sobre → `/#sobre` (âncora para o manifesto)
- CTA: **Fale conosco** → abre o modal de contato (fallback: `/#contato`)

Âncoras devem funcionar a partir de qualquer página (ex.: em `/blog`, "Sobre" navega para `/` e rola até `#sobre`).

---

## 5. Requisitos funcionais: Home (`/`)

Ordem das seções (espelha o ritmo da referência):

### RF01: Header
Ver seção 4. Sticky, logo à esquerda, links, CTA. Menu mobile acessível.

### RF02: Hero
- **Eyebrow:** Sociabilis AI Labs
- **Título:** Implantamos IA responsável e sustentável no coração da operação do seu negócio.
- **Lead:** Copilotos, agentes, automações e soluções com RAG para empresas responsáveis, B Corps e negócios de impacto, com governança, eficiência e atenção aos impactos socioambientais.
- **CTAs:** "Fale conosco" (primário, abre modal) · "Conheça as soluções" (secundário → `/ia-no-seu-negocio`)
- Visual: ilustração abstrata (rede/nós/padrão low-poly inspirado no pássaro do logo). Sem robôs.

### RF03: Ícones de valor (4 colunas)
Sem métricas numéricas (não há cases com números validados). Cada item tem ícone, título e uma linha:
1. **Implantação real**: IA conectada aos processos da operação, não só pilotos.
2. **Governança desde o início**: segurança, privacidade e rastreabilidade no desenho da solução.
3. **Eficiência e menor pegada**: escolha adequada de modelos, menos desperdício técnico, financeiro e ambiental.
4. **Impacto mensurável**: indicadores de produtividade, adoção, custo e impacto acompanhados.

### RF04: Faixa de parceiros e certificações
- Rótulo: "Parceiros e certificações"
- Logos monocromáticos [ASSET: SVG/PNG de cada parceiro/certificação + autorização de uso].
- Configurável via `src/content/logos.ts` (nome, arquivo, URL opcional, categoria `partner` | `client`).

### RF05: Manifesto (`#sobre`), faixa escura
- **Eyebrow:** Nossa missão
- **Título [VALIDAR]:** Fazer a IA trabalhar a favor dos negócios e do planeta.
- **Frases curtas, uma por linha [VALIDAR]:**
  - IA não gera valor quando fica presa em pilotos.
  - Não precisamos do maior modelo. Precisamos do modelo **certo**.
  - Eficiência também é sustentabilidade.
  - Governança não é freio. É o que permite escalar com confiança.
- Parágrafo curto: a Sociabilis AI Labs atua como uma AI Deployment Company. Entramos no contexto real do cliente, priorizamos casos de uso de alto impacto e implantamos soluções que podem ser medidas, governadas e evoluídas.
- Opcional: vídeo institucional [ASSET], com carregamento sob demanda (facade, sem iframe até o clique).

### RF06: Pilares (A, B, C)
Título: **Três pilares para uma IA que gera resultado real.**
- **A · Deploy AI**: implantamos soluções conectadas aos processos reais: copilotos internos, agentes, automações e sistemas com RAG.
- **B · Govern AI**: bases de governança, segurança, privacidade, rastreabilidade e uso responsável.
- **C · Sustain AI**: eficiência, escolha adequada de modelos, redução de desperdícios e mensuração da pegada socioambiental da IA.

### RF07: Linhas de negócio (6 ofertas)
Título: **Como podemos ajudar.**
Grid 2-up (desktop) com `offer-card`: ícone, nome, uma frase e "Veja mais" → `/ia-no-seu-negocio#<slug>`.

| Oferta | Slug | Frase |
|---|---|---|
| AI Opportunity & Impact Scan | `impact-scan` | Diagnóstico para identificar onde a IA gera mais valor no seu negócio. |
| RAG Starter | `rag-starter` | Copilotos com a base de conhecimento da sua empresa. |
| Forward Deployed AI Pod | `forward-deployed-pod` | Um squad da Sociabilis implantando IA junto ao seu time. |
| AI Agents & Automation | `agents-automation` | Agentes e automações que apoiam ou executam tarefas operacionais. |
| Sustainable AI Assessment | `sustainable-ai-assessment` | Maturidade, governança e pegada socioambiental do seu uso de IA. |
| AI Carbon Tracker | `ai-carbon-tracker` | Estime, acompanhe e comunique a pegada climática da IA generativa. |

### RF08: CTA intermediário (faixa escura)
- Frase [VALIDAR]: **Sua empresa não precisa só testar IA. Precisa implantar com estratégia, governança e impacto positivo.**
- Botão: "Quero implantar IA com governança" → abre modal.

### RF09: Mídia e publicações
- Título: **Mídia e publicações**
- 3 cards mais recentes, mesclando posts do blog e itens externos (podcasts, artigos, entrevistas).
- Badge de tipo: Artigo (post do blog) · Podcast · Na mídia.
- "Ver todos" → `/blog`.
- Itens externos em `src/content/media.ts` (título, tipo, veículo, data, URL externa, thumbnail opcional) [ASSET: lista de podcasts/artigos/mídia com links].

### RF10: Clientes
- Rótulo: "Empresas que confiam na Sociabilis"
- Logos monocromáticos [ASSET: logos + autorização de cada cliente para exibição].
- Se a lista tiver menos de 4 logos, ocultar a seção (feature flag no arquivo de conteúdo).

### RF11: Contato (`#contato`)
Mantém o formulário atual, com estas mudanças:
- Campos: nome*, e-mail corporativo*, empresa*, cargo, **interesse*** (checkboxes, ao menos 1), mensagem.
- Opções de interesse: as 6 ofertas + "Quero entender por onde começar".
- Aviso de privacidade com link para `/politica-de-privacidade`.
- O mesmo formulário é usado no **modal de contato** (`<dialog>`), aberto pelos CTAs. Um CTA pode pré-selecionar um interesse (ex.: "Falar sobre RAG Starter").
- `server.js`: aceitar e validar `cargo` e `interesses[]` (lista branca com as opções válidas) e incluí-los no e-mail.

### RF12: Footer
Fundo escuro. Logo, descrição ("IA aplicada, governança desde o início e sustentabilidade como diferencial."), colunas: Navegação · IA no seu negócio (6 ofertas) · Conteúdo (Blog, Mídia) · Contato (dados de `contact.ts`, sem inventar valores). Redes sociais se configuradas. Faixa de parceiros e certificações. Link para a política de privacidade. Copyright `© {ano} Sociabilis. Todos os direitos reservados.`

### Conteúdo da v1 que sai da home
- Seção **Problema**: o conteúdo é absorvido pelo manifesto.
- **Proposta de valor**: vira os ícones de valor (RF03).
- **Metodologia**, **Diferenciais** e **Público-alvo**: migram para a página IA no seu negócio.

---

## 6. Requisitos funcionais: IA no seu negócio (`/ia-no-seu-negocio`)

### RF20: Hero
- **Eyebrow:** IA no seu negócio
- **Título [VALIDAR]:** IA aplicada ao que a sua operação realmente precisa.
- **Intro:** Trabalhamos com empresas que querem sair do piloto e colocar IA para funcionar com governança, eficiência e impacto mensurável.
- **`arrow-statement`:** → IA gera resultado quando parte de um problema real, de dados da própria operação e de critérios claros de sucesso. Por isso organizamos nosso trabalho em seis caminhos, do diagnóstico à operação contínua.
- CTA: "Não sabe por onde começar? Fale conosco" → modal com interesse "Quero entender por onde começar".

### RF21: Índice de ofertas
Chips com âncoras para as 6 ofertas (sticky no desktop). Destacar o chip da seção visível (IntersectionObserver).

### RF22: Bloco de oferta (template, repetido 6×)
Cada oferta é um `offer-block` com `id` igual ao slug (RF07) e esta estrutura:

1. Rótulo `01`–`06` + nome
2. **Pitch**: 1–2 frases
3. **Para quem é**: qualificador
4. **O que entregamos**: 3 `feature-item` (ícone + título + linha)
5. **Ver mais** (expansível): benefícios adicionais
6. **Como funciona**: etapas numeradas
7. **Entregáveis / resultados**: lista com `→`
8. **Casos de uso**: lista numerada (quando aplicável)
9. **CTA**: "Falar sobre <oferta>" → modal com o interesse pré-selecionado

O conteúdo de cada oferta fica em um arquivo de dados tipado (`src/content/offers.ts`), não hardcoded no JSX, para ser reutilizado na home, no footer, no formulário e nesta página.

#### 01 · AI Opportunity & Impact Scan (`impact-scan`)
- **Pitch:** Diagnóstico para identificar onde a IA pode gerar mais valor no negócio, com riscos e prioridades claros.
- **Para quem é [VALIDAR]:** empresas que querem começar ou reorganizar sua jornada de IA com foco em resultado.
- **O que entregamos:** mapa de oportunidades · matriz impacto x esforço · roadmap de 30, 60 e 90 dias.
- **Ver mais:** riscos e dependências mapeados · visão de custo e de impacto socioambiental de cada caso de uso · recomendação de arquitetura (RAG, SLMs, automação).
- **Como funciona [VALIDAR]:** 1. Imersão (entrevistas e processos) · 2. Mapeamento e priorização · 3. Apresentação do roadmap.
- **Entregáveis:** mapa de oportunidades; matriz impacto x esforço; riscos e dependências; roadmap 30/60/90.

#### 02 · RAG Starter (`rag-starter`)
- **Pitch:** Implantação de copilotos que respondem com base no conhecimento da sua empresa: políticas, documentos e procedimentos.
- **Para quem é [VALIDAR]:** empresas com conhecimento disperso em documentos e equipes que perdem tempo procurando informação.
- **O que entregamos [VALIDAR]:** base de conhecimento estruturada · copilot integrado ao canal do time · governança de acesso e fontes citadas.
- **Ver mais [VALIDAR]:** respostas com referência à fonte · controle de quem acessa o quê · monitoramento de qualidade · escolha de modelo eficiente.
- **Como funciona [VALIDAR]:** 1. Curadoria das fontes · 2. Construção e testes · 3. Implantação e acompanhamento.
- **Casos de uso:** atendimento interno; políticas e procedimentos; documentos ESG; suporte técnico; RH; jurídico; operações.

#### 03 · Forward Deployed AI Pod (`forward-deployed-pod`)
- **Pitch:** Um squad da Sociabilis AI Labs atuando próximo ao seu time para implantar IA no contexto real do negócio.
- **Para quem é [VALIDAR]:** organizações com vários casos de uso, dados sensíveis ou necessidade de acelerar a implantação com acompanhamento contínuo.
- **O que entregamos [VALIDAR]:** squad dedicado · implantação integrada aos processos · transferência de conhecimento para o time interno.
- **Perfis possíveis:** AI Deployment Lead; Forward Deployed AI Engineer; Product/Process Strategist; Data/RAG Engineer; Responsible & Sustainable AI Specialist.
- **Como funciona:** usa a metodologia completa (RF23).

#### 04 · AI Agents & Automation (`agents-automation`)
- **Pitch:** Agentes de IA e automações inteligentes para apoiar ou executar tarefas operacionais.
- **Para quem é [VALIDAR]:** times com tarefas repetitivas, alto volume de documentos ou fluxos entre sistemas.
- **O que entregamos [VALIDAR]:** agentes desenhados para o processo · integrações com APIs e workflows · monitoramento e pontos de supervisão humana.
- **Casos de uso:** triagem de e-mails; análise de documentos; geração de relatórios; coleta de evidências ESG; suporte interno; integração com APIs e workflows.

#### 05 · Sustainable AI Assessment (`sustainable-ai-assessment`)
- **Pitch:** Avaliação da maturidade, governança e impacto socioambiental do uso de IA na organização.
- **Para quem é [VALIDAR]:** empresas que já usam IA e precisam de visibilidade de riscos, custos e pegada.
- **Entregáveis:** inventário de ferramentas; análise de riscos; recomendações de governança; estimativa de consumo, custo e emissões; plano de otimização e mitigação.
- Linguagem: "estimativa", nunca "neutralização" ou "compensação" sem metodologia definida.

#### 06 · AI Carbon Tracker (`ai-carbon-tracker`)
- **Pitch:** Produto da Sociabilis para estimar, acompanhar e comunicar a pegada climática associada ao uso de IA generativa.
- **Para quem é [VALIDAR]:** empresas que querem medir e reportar o impacto do seu uso de IA (ex.: relatórios ESG).
- **O que entregamos [VALIDAR]:** estimativas de emissões por uso · acompanhamento ao longo do tempo · material para comunicação e relatórios.
- CTA: "Quero conhecer o AI Carbon Tracker". Deixar estrutura pronta para uma futura página própria.

### RF23: Como trabalhamos
As 7 etapas da v1 em `steps`: Diagnosticar · Priorizar · Prototipar · Implantar · Medir · Otimizar · Mitigar (textos da v1).

### RF24: Por que a Sociabilis AI Labs
Os 6 diferenciais da v1 em grid 3-up: IA aplicada, não apenas conceitual · Modelo Forward Deployed AI · Sustentabilidade como premissa · Governança desde o início · Arquitetura eficiente · Foco em negócios responsáveis.

### RF25: Para quem
Texto de público-alvo da v1, com os segmentos em chips.

### RF26: CTA final
Faixa escura com título da v1 + botão "Fale conosco".

---

## 7. Requisitos funcionais: Blog

### RF30: Conteúdo em Markdown no repositório
- Posts em `content/blog/<slug>.md` (um arquivo por post).
- Imagens em `public/blog/<slug>/` (WebP/AVIF, largura máx. 1600px).
- Frontmatter obrigatório, validado no build (o build falha se um campo obrigatório faltar):

```yaml
---
title: "Título do post"            # obrigatório, ≤ 70 caracteres recomendado
slug: "titulo-do-post"             # obrigatório, kebab-case, único
description: "Resumo para SEO"     # obrigatório, 120–160 caracteres
date: 2026-11-18                   # obrigatório (publicação)
updated: 2026-11-20                # opcional
author: "Nome Sobrenome"           # obrigatório (deve existir em src/content/authors.ts)
tags: ["IA sustentável", "RAG"]    # obrigatório, 1–4 tags
cover: "/blog/titulo-do-post/capa.webp"  # opcional
coverAlt: "Descrição da capa"      # obrigatório se houver cover
draft: false                       # true = não publicado
---
```

- Autores em `src/content/authors.ts` (nome, cargo, foto opcional, LinkedIn opcional).
- Posts com `draft: true` ou data futura não aparecem no build de produção.

### RF31: Listagem (`/blog`)
- Hero curto: eyebrow "Blog", título [VALIDAR] "Ideias sobre IA aplicada, governança e sustentabilidade".
- Filtro por tag (chips → `/blog/tag/:tag`).
- Grid 3-up de `post-card`, ordenado por data desc, 9 por página, com paginação.
- Estado vazio amigável.

### RF32: Página do post (`/blog/:slug`)
- Breadcrumb (Início › Blog › Título), título, autor, data (formato pt-BR), tempo de leitura calculado, tags, capa.
- Corpo renderizado a partir do Markdown **sem HTML bruto** (sem `dangerouslySetInnerHTML`; usar renderizador seguro, ex.: `react-markdown` sem `rehype-raw`, ou conversão no build com sanitização).
- Suporte a: headings, listas, links (externos com `rel="noopener noreferrer"`), imagens com legenda, citações, tabelas, código.
- Sumário (TOC) automático para posts com 3 ou mais `h2`.
- Card de autor, `post-cta` (contato), 3 posts relacionados (por tag) e links de compartilhamento (LinkedIn, WhatsApp, copiar link) **sem scripts de terceiros**.

### RF33: Integração com a home
A seção "Mídia e publicações" (RF09) consome os posts mais recentes e os itens de `media.ts`.

### RF34: Fluxo de publicação (via Claude Code)
1. Criar `content/blog/<slug>.md` com frontmatter válido.
2. Adicionar imagens em `public/blog/<slug>/`.
3. Rodar `npm run build` (valida frontmatter, gera rotas, sitemap e RSS).
4. Commit e deploy.

Documentar esse fluxo no `README.md` e em `content/blog/_TEMPLATE.md`.

---

## 8. Requisitos não funcionais

### RNF01: Roteamento e renderização (SEO)
- Adicionar roteamento client-side (ex.: `react-router-dom`).
- **Todas as rotas devem ser servidas com HTML pré-renderizado no build** (SSG), com `<title>`, meta description, Open Graph e conteúdo indexável no HTML inicial. Uma SPA que só renderiza no cliente **não atende** ao requisito do blog. Sugestão: `vite-react-ssg` ou script de pré-renderização no build. O Claude Code deve escolher a opção mais leve compatível com a stack, justificar e documentar.
- `server.js` (Express) deve servir os HTMLs pré-renderizados por rota, os assets com cache longo (hash) e responder 404 com a página 404.

### RNF02: SEO
- Title e description únicos por página e por post. Canonical. OG e Twitter cards (imagem OG padrão + capa do post).
- JSON-LD: `Organization` (home), `Service` (cada oferta na página IA no seu negócio), `BlogPosting` + `BreadcrumbList` (posts).
- `sitemap.xml` gerado no build com todas as rotas e posts. `robots.txt` apontando para o sitemap. RSS em `/blog/rss.xml`.
- `lang="pt-BR"`. URLs em kebab-case sem acentos.

### RNF03: Performance
- Lighthouse ≥ 90 em Performance, Accessibility, Best Practices e SEO em todas as páginas (mobile).
- Fontes self-hosted com subset. Imagens WebP/AVIF com `width`/`height` e `loading="lazy"` abaixo da dobra.
- Code splitting por rota. Evitar bibliotecas pesadas: animações via CSS + IntersectionObserver.

### RNF04: Acessibilidade
Mantém a v1 (HTML semântico, headings corretos, contraste AA, foco visível, teclado, labels, alt), mais: `<dialog>` com foco preso e retorno de foco; `<details>` nativo; `aria-current` no link ativo; `prefers-reduced-motion`.

### RNF05: Segurança
Mantém a v1. Exceção explícita: nenhum HTML bruto vindo do Markdown. Headers de segurança no Express (CSP compatível com reCAPTCHA, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `frame-ancestors`). Validar `interesses[]` contra lista branca no servidor. Rate limit simples em `/api/contact`.

### RNF06: Privacidade
Mantém a v1. Página `/politica-de-privacidade`. Nenhum analytics ou pixel sem decisão explícita (fora do escopo).

### RNF07: Manutenibilidade
- Conteúdo separado de componentes: `src/content/` (offers, logos, media, authors, navigation) e `content/blog/`.
- Tokens do DESIGN.md em `tailwind.config.js` (substituir os tokens da v1).
- Componentes reutilizáveis: `Container`, `Section`, `Eyebrow`, `SectionHeader`, `Button`, `LinkArrow`, `Card`, `LetteredCard`, `FeatureItem`, `Steps`, `Expandable`, `LogoStrip`, `DarkBand`, `MediaCard`, `PostCard`, `TagChip`, `Pagination`, `ContactForm`, `ContactModal`, `Seo`.

---

## 9. Stack técnica
- Manter: React 18 + TypeScript + Vite + Tailwind CSS 3 + Express (server.js) + Resend.
- Adicionar somente o necessário (justificar no resumo): roteador; SSG/pré-renderização; parser de frontmatter e Markdown seguro; fontes self-hosted; ícones com tree-shaking.

---

## 10. Assets e informações a fornecer pela Sociabilis

| Item | Necessário para | Status |
|---|---|---|
| Logos de clientes (SVG/PNG) + autorização | RF10 | [ASSET] |
| Logos de parceiros e certificações + autorização | RF04, RF12 | [ASSET] |
| Lista de podcasts, artigos e mídia (título, veículo, data, URL) | RF09 | [ASSET] |
| 2–3 posts iniciais | RF31 | [ASSET] |
| Autores (nome, cargo, foto, LinkedIn) | RF30 | [ASSET] |
| E-mail, WhatsApp, LinkedIn, Instagram | RF12, `contact.ts` | [ASSET] |
| Texto da política de privacidade (ou URL) | RF11, RF12 | [ASSET] |
| Validação dos textos [VALIDAR] | Home, IA no seu negócio | Pendente |
| Vídeo institucional (opcional) | RF05 | Opcional |
| Logo em versão clara (para o footer escuro) | RF12 | [ASSET] (ou gerar versão monocromática) |

Enquanto um asset não existir: usar placeholder configurável e ocultar a seção quando ela ficaria vazia. Nunca inventar logos, números, depoimentos ou dados de contato.

---

## 11. Fases de implementação (sugestão para o Claude Code)

1. **Fundação:** tokens do DESIGN.md no Tailwind, fontes, componentes base, roteamento, SSG, `Seo`, 404, servidor.
2. **Home:** redesign seção por seção (RF01–RF12), conteúdo em `src/content/`.
3. **IA no seu negócio:** RF20–RF26 a partir de `offers.ts`.
4. **Blog:** pipeline de Markdown, listagem, tags, paginação, post, RSS, sitemap, template.
5. **Contato:** modal, interesses, ajustes no `server.js`, rate limit, headers.
6. **QA:** lint, build, Lighthouse mobile por página, teste de teclado, larguras 360/768/1024/1440.

Cada fase deve terminar com build sem erros e pode virar um commit/PR separado.

---

## 12. Critérios de aceite
1. Todas as rotas da seção 4 funcionam localmente e no build de produção, com HTML pré-renderizado.
2. Visual segue o `docs/DESIGN.md` v2 (sem laranja/creme da v1). Contraste AA.
3. Home contém RF01–RF12 na ordem definida. Seções sem asset ficam ocultas, não vazias.
4. IA no seu negócio exibe as 6 ofertas com âncoras funcionais a partir da home e do footer.
5. Blog: um post de exemplo publicado, `draft` respeitado, tags, paginação, RSS e sitemap gerados, frontmatter validado no build.
6. Formulário envia `interesses` e `cargo`, valida no servidor e o modal pré-seleciona interesses.
7. Nenhum conteúdo, número ou asset copiado da Dharma AI.
8. Sem secrets no frontend. Sem `dangerouslySetInnerHTML`.
9. `npm run lint` e `npm run build` sem erros.
10. Lighthouse mobile ≥ 90 nas quatro categorias em `/`, `/ia-no-seu-negocio`, `/blog` e em um post.

---

## 13. Fora de escopo da v2
CMS ou painel administrativo · autenticação · comentários no blog · busca no site · newsletter · versão em inglês · analytics/pixels · integração com CRM · cálculo real de pegada de carbono · página própria do AI Carbon Tracker.

## 14. Evoluções futuras
Versão bilíngue PT/EN (a referência é bilíngue) · busca no blog · newsletter · página do AI Carbon Tracker · página do CNPJ Neutro · biblioteca de cases (com números reais) · diagnóstico gratuito/calculadora de maturidade · integração com CRM · analytics com consentimento · CMS headless, se a equipe editorial crescer.
