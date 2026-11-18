# Sociabilis AI Labs: website

Site institucional multipágina e bilíngue (PT/EN) da Sociabilis AI Labs. Requisitos em `docs/PRD.md` (inglês: seção 15), design system em `docs/DESIGN.md`.

## Idiomas

- Português na raiz (`/`, `/ia-no-seu-negocio`, `/blog`...) e inglês sob `/en` (`/en`, `/en/ai-for-your-business`, `/en/blog`...). Os caminhos ficam em `src/i18n/locales.ts`.
- O idioma da página vem da URL (`Layout` → `useLocale()`). Os conteúdos de `src/content/` são objetos `{ pt, en }`, e o TypeScript exige que o inglês tenha a mesma estrutura do português.
- O seletor PT | EN (`LanguageSwitcher`) leva à página equivalente (`src/lib/i18nPaths.ts`). O `hreflang` só é gerado entre páginas realmente equivalentes.
- Para mudar um texto, edite os dois idiomas no mesmo arquivo de `src/content/`.

## Stack

React 18 + TypeScript + Vite 8 + Tailwind CSS 3, `react-router` 7 (roteamento), Express (`server.js`) e Resend (formulário de contato).

## Requisitos

Node.js ^20.19 ou ≥ 22.12, exigido pelo Vite 8 e declarado em `engines` no `package.json`.

## Comandos

| Comando | O que faz |
|---|---|
| `npm run dev` | Vite em modo desenvolvimento (renderização só no cliente). |
| `npm run dev:server` | API local (`/api/contact`) na porta 3001; o Vite faz proxy de `/api`. |
| `npm run build` | Typecheck, build do cliente, build SSR e pré-renderização de todas as rotas. |
| `npm start` | Servidor de produção: HTML pré-renderizado, assets e API. |
| `npm run preview` | Build + servidor de produção local. |
| `npm run lint` | ESLint. |

## Pré-renderização (SSG)

Todas as rotas são entregues com HTML completo (conteúdo, `<title>`, description, canonical, Open Graph, JSON-LD). Optamos por um script próprio, mais leve, em vez de `vite-react-ssg`: não adiciona dependências além do roteador.

1. `vite build`: bundle do cliente, com um chunk por página (`src/pages/*.tsx`) e `manifest.json`.
2. `vite build --ssr src/entry-server.tsx`: bundle de renderização em Node.
3. `scripts/prerender.js`: para cada caminho de `getPrerenderPaths()` (`src/routes.ts`), renderiza com `renderToString` e escreve `dist/<rota>/index.html`. Também gera `dist/404.html`, `sitemap.xml`, `robots.txt` e `dist/.routes.json`. **O build falha** se uma página não tiver `<Seo>` ou se o title ou a description de uma página indexável se repetirem.
4. No navegador, `src/main.tsx` carrega o chunk da rota atual e então hidrata o HTML (`hydrateRoot`).

O `server.js` usa `dist/.routes.json` para servir o HTML de cada rota, responde 404 com `404.html`, redireciona barra final (`/blog/` → `/blog`) e serve `/assets` com cache imutável de 1 ano.

## Contato e servidor

- **Formulário** (`src/components/ContactForm.tsx`): nome, e-mail corporativo, empresa, cargo (opcional), interesses (ao menos 1: as 6 ofertas + "Quero entender por onde começar") e mensagem (opcional). Usado na seção `#contato` da home e no modal.
- **Modal** (`ContactModal`, `<dialog>` nativo): todo `Button` com link gerado por `contactTo()` abre o modal, com o interesse pré-selecionado (`contactTo('rag-starter')`). Sem JS, ou com Ctrl/Cmd-clique, o link leva ao formulário da home, que lê `?interesse=`.
- **reCAPTCHA v3** (invisível): o script é carregado quando o formulário se aproxima da tela, e o token (ação `contact`) é gerado no envio. O selo flutuante do Google fica oculto porque o formulário exibe o aviso exigido; não remova esse aviso.
- **`/api/contact`** (`server.js`): valida os campos e limites, aceita só interesses da lista branca (gerada no build em `dist/.contact-interests.json` a partir de `src/content/offers.ts`), verifica o reCAPTCHA (token válido, ação `contact` e pontuação ≥ `RECAPTCHA_MIN_SCORE`, padrão 0.5) e envia pelo Resend. Limite de 5 envios por IP a cada 10 minutos. Recusas do reCAPTCHA aparecem no log como "reCAPTCHA recusado", com a pontuação.
- **Cabeçalhos de segurança** em todas as respostas: CSP compatível com o reCAPTCHA, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options` e `frame-ancestors 'none'`.
- Variáveis em `.env.example`. Atrás de proxy reverso, ajuste `TRUST_PROXY` para o limite de envios usar o IP real do visitante.
- Para testar a API localmente (`npm run dev:server`), rode `npm run build` uma vez antes: o servidor lê a lista de interesses do `dist/`.

### Adicionar uma página

1. Criar `src/pages/MinhaPagina.tsx` com `export default` e um `<Seo>` (metadados em `src/content/pages.ts`).
2. Registrar em `src/routes.ts`: `{ path: '/minha-pagina', page: lazyPage('MinhaPagina') }`.
3. Para rotas com parâmetro (ex.: `/blog/:slug`), informar `staticPaths: () => [...]` com os caminhos a pré-renderizar.

Páginas com `noindex` ficam fora do sitemap.

## Estrutura

- `src/components/`: componentes base do design system (Container, Section, DarkBand, Eyebrow, SectionHeader, Button, LinkArrow, ArrowStatement, Card, LetteredCard, FeatureItem, Steps, Expandable, LogoStrip, TagChip, Pagination, MediaCard, ContactForm, Reveal, HeroIllustration, Seo) e layout (Header, Footer, Layout, SkipLink, ScrollManager).
- `src/content/`: conteúdo. Não hardcodar conteúdo nos componentes.
  - `home.ts`: textos da home. `offers.ts`: as 6 ofertas com todo o conteúdo dos blocos (home, footer, formulário, página IA no seu negócio). Campos opcionais vazios não são exibidos.
  - `logos.ts`: parceiros e clientes (faixa de clientes só aparece com 4+ logos). `media.ts`: podcasts, artigos e mídia.
  - `aiForBusiness.ts`: hero, rótulos dos blocos de oferta, metodologia, diferenciais, público e CTA final da página IA no seu negócio.
  - `blog.ts` (textos do blog), `authors.ts` (autores dos posts).
  - `navigation.ts`, `pages.ts` (SEO por página), `contactForm.ts`, `legal.ts`.
- `src/sections/home/`: seções da home (RF02–RF11). Seções sem conteúdo (logos, mídia) não são renderizadas.
- `src/sections/ai/`: seções da página IA no seu negócio (RF20–RF26), incluindo `OfferIndex` (chips sticky) e `OfferBlock` (template de oferta).
- `src/config/contact.ts`: URL do site, dados de contato (placeholders `null`) e chave pública do reCAPTCHA.
- `tailwind.config.js`: tokens do `docs/DESIGN.md`. A tipografia gera classes responsivas (`text-display-xl`, `text-body-md`, `text-eyebrow`…).

## Blog

Posts em Markdown, um arquivo por post, em `content/blog/`. Não há CMS nem banco de dados.

### Publicar um post

1. Copie `content/blog/_TEMPLATE.md` para `content/blog/pt/<slug>.md` ou `content/blog/en/<slug>.md`. O idioma vem da pasta, e o nome do arquivo deve ser igual ao `slug`.
2. Preencha o frontmatter: `title`, `slug`, `description` (120–160 caracteres), `date` (AAAA-MM-DD), `author`, `tags` (1–4) e, se quiser, `updated`, `cover` + `coverAlt` e `draft`.
   - `author` é a chave (ou o nome exato) de um autor em `src/content/authors.ts`.
   - Se o post tiver versão no outro idioma, preencha `translation` nos dois arquivos, cada um com o slug do outro. O build confere se a ligação é recíproca e mostra o link "Read in English"/"Ler em português" no post.
3. Coloque as imagens em `public/blog/<slug>/` (WebP/AVIF, largura máx. 1600px) e referencie como `/blog/<slug>/arquivo.webp`.
4. Rode `npm run build`. O build **falha** com uma mensagem clara se o frontmatter estiver incompleto, o autor não existir, uma imagem não for encontrada, faltar texto alternativo ou houver HTML bruto ou link inseguro no texto.
5. Faça commit e deploy.

Não publique afirmações numéricas sem fonte citada no texto.

- `draft: true` e posts com data futura não entram no build de produção (nem no sitemap e no RSS). Um post agendado só aparece no primeiro build a partir da data. No `npm run dev`, rascunhos aparecem marcados como "Rascunho".
- Posts com 3 ou mais `##` ganham sumário automático.

### Como funciona

`scripts/vite-plugin-blog.ts` lê os arquivos no build, valida o frontmatter e converte o Markdown (GFM) numa árvore própria, sem HTML. Ela é renderizada por `src/components/blog/Markdown.tsx` com componentes React (sem `dangerouslySetInnerHTML`). Cada corpo de post vira um chunk separado; a listagem usa só os metadados.

O build gera, em cada idioma, a listagem (`/blog`, `/en/blog`), a paginação (`/blog/pagina/<n>`, `/en/blog/page/<n>`, 9 posts por página), as tags, os posts, o RSS (`/blog/rss.xml`, `/en/blog/rss.xml`) e o `sitemap.xml` (com `lastmod` dos posts). Cada idioma lista só os próprios posts, que também aparecem na seção "Mídia e publicações" da home do idioma.
