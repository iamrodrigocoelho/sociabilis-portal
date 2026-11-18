# CLAUDE.md - Sociabilis AI Labs Website

## Projeto

Este projeto é o website institucional da Sociabilis AI Labs, divisão de inteligência artificial aplicada da Sociabilis.

Na v2, o site é **multipágina** e **bilíngue**: Home, **IA no seu negócio** (`/ia-no-seu-negocio`), **Blog** (`/blog`) e política de privacidade, em português na raiz e em inglês sob `/en` (PRD seção 15). O foco é AI Deployment, Forward Deployed AI, IA responsável e IA sustentável.

## Arquivos de referência obrigatórios

Antes de implementar qualquer alteração, leia:

- `docs/PRD.md` (v2): requisitos, rotas, conteúdo e fases
- `docs/DESIGN.md` (v2): design system da Sociabilis

Use o logotipo em:

- `img/logo-big-sociabilis.png`

## Regras principais

- Seguir o PRD como fonte principal de requisitos.
- Seguir o design system definido em `docs/DESIGN.md` (v2). Os tokens da v1 (laranja `#ff4f00`, creme) devem ser **substituídos**, não mantidos.
- Alterações no design system devem ser feitas primeiro no `docs/DESIGN.md` e depois no `tailwind.config.js`.
- O site da Dharma AI é referência apenas de **estrutura e linguagem visual**. Nunca copiar textos, números, ícones, imagens, vídeos ou logos dele.
- Não inventar e-mail, telefone, WhatsApp, links de contato, logos de clientes, depoimentos ou métricas.
- Usar placeholders configuráveis quando informações ou assets não existirem, e ocultar seções que ficariam vazias.
- Textos marcados como **[VALIDAR]** no PRD podem ser usados, mas devem ser listados no resumo final como pendentes de validação.
- Conteúdo fica em `src/content/` (ofertas, logos, mídia, autores, navegação), sempre nos dois idiomas (`{ pt, en }`), e em `content/blog/pt/` e `content/blog/en/` (posts). Não hardcodar conteúdo nos componentes.
- Todo texto novo precisa existir em português e em inglês. O inglês é tradução do português: não acrescentar promessas, números ou informações que não estejam na versão PT. Traduções novas devem ser listadas no resumo como **[VALIDAR EN]**.
- Criar um website responsivo, mobile-first e acessível.
- Usar HTML semântico.
- Aplicar boas práticas de SEO. Todas as rotas devem ter HTML pré-renderizado.
- Não usar `dangerouslySetInnerHTML`. Markdown deve ser renderizado sem HTML bruto.
- Não expor secrets, tokens ou credenciais no frontend.
- Evitar dependências pesadas desnecessárias. Justificar cada dependência nova no resumo.
- Priorizar performance, segurança e manutenibilidade.
- Não criar banco de dados, CMS, painel administrativo ou autenticação sem solicitação explícita. O backend existente (`server.js`) pode ser ajustado conforme o PRD.

## Blog: como publicar um post

1. Copiar `content/blog/_TEMPLATE.md` para `content/blog/pt/<slug>.md` (ou `content/blog/en/<slug>.md` para inglês).
2. Preencher o frontmatter (title, slug, description, date, author, tags, cover/coverAlt opcionais, draft, translation opcional). `author` é a chave (ou o nome exato) de um autor em `src/content/authors.ts`; o nome do arquivo deve ser igual ao slug; `translation` liga as versões PT e EN (nos dois arquivos).
3. Colocar imagens em `public/blog/<slug>/` (WebP, largura máx. 1600px).
4. Rodar `npm run build`, que valida o frontmatter e gera rotas, sitemap e RSS.
5. Não publicar posts com afirmações numéricas sem fonte citada.

## Tom de voz

O tom deve ser profissional, claro, moderno, confiável e orientado a negócios, nos dois idiomas. Frases curtas e afirmativas são bem-vindas (manifesto, títulos). Em inglês, usar inglês americano.

Evitar:
- promessas exageradas;
- métricas sem fonte ou case real (ex.: "200x mais barato");
- jargão técnico excessivo;
- greenwashing ("neutralizamos", "compensamos" sem metodologia);
- linguagem genérica de IA;
- frases vagas como "revolucione seu negócio com IA".

Usar termos como:
- implantação de IA;
- governança;
- eficiência;
- IA aplicada;
- sustentabilidade;
- impacto mensurável;
- negócios responsáveis;
- produtividade responsável.

## Comandos

Antes de finalizar alterações, execute:

- `npm run lint`
- `npm run build`
- testes, se existirem.

Se algum comando não existir, informe isso no resumo final.
