# QA: Website Sociabilis AI Labs v2

Fase 6 do `docs/PRD.md`. Rodada de 18/11/2026, sobre o build de produção servido pelo `server.js` (com CSP e demais cabeçalhos).

## Como reproduzir

```bash
npm run lint
npm run build
PORT=3099 npm start
# em outro terminal (Lighthouse 13.6, emulação mobile padrão):
npx lighthouse http://localhost:3099/ --form-factor=mobile --chrome-flags="--headless=new" --view
```

## 1. Lint e build

| Comando | Resultado |
|---|---|
| `npm run lint` | Sem erros nem avisos. |
| `npm run build` | OK: 7 rotas + 404, `sitemap.xml`, `robots.txt`, `blog/rss.xml`. |
| Testes automatizados | Não existem no projeto. |

## 2. Lighthouse mobile

| Página | Performance | Acessibilidade | Boas práticas | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 | 1,1 s | 0 |
| `/ia-no-seu-negocio` | 100 | 100 | 100 | 100 | 1,2 s | 0 |
| `/blog` | 100 | 100 | 100 | 100 | 0,9 s | 0 |
| `/blog/por-onde-comecar-a-implantar-ia` | 100 | 100 | 100 | 100 | 1,1 s | 0 |
| `/politica-de-privacidade` | 100 | 100 | 100 | 66 | 0,9 s | 0 |
| 404 (`/404.html`) | 100 | 100 | 100 | n/a | | |

- **Política de privacidade (SEO 66):** esperado. A página fica `noindex` enquanto não houver texto aprovado (`src/content/legal.ts`); a nota sobe quando o texto for publicado.
- **404:** o Lighthouse não analisa respostas 404; medido no mesmo HTML servido como `/404.html`.
- **Ressalva:** medição local, sem latência real de rede nem CDN. Repetir no domínio de produção após o deploy.

### Corrigido nesta rodada

- **Contraste:** rótulos de sequência (`A/B/C`, `01–06`) e as iniciais do autor usavam `brand` (#339966, 3.57:1) em texto pequeno. Passaram para `primary` (5.28:1). O `docs/DESIGN.md` foi atualizado (v2.1), pois definia `brand` para esses rótulos em conflito com a própria regra de contraste.
- **Hierarquia de títulos na home:** a faixa de ícones de valor tinha `h3` sem `h2`. Recebeu um `h2` visível só para leitores de tela.

## 3. Larguras 360 / 768 / 1024 / 1440

Verificadas em todas as rotas: `/`, `/ia-no-seu-negocio`, `/blog`, `/blog/tag/governanca`, post, `/politica-de-privacidade` e 404.

- Sem rolagem horizontal em nenhuma combinação, com a página rolada até o fim (animações e reCAPTCHA carregados).
- **Alvos de toque:** os links da última linha do footer e da trilha de navegação do blog tinham menos de 24px de altura. Passaram a ter 44px, como pede o DESIGN.md. Nenhum outro controle ficou abaixo de 24px.

## 4. Teclado

Teste com teclas reais no Chrome, layout mobile (614px), contra o servidor de produção.

| Fluxo | Resultado |
|---|---|
| Primeiro Tab | "Pular para o conteúdo" visível, com anel de foco verde. Enter leva o foco ao `<main>`. |
| Menu mobile | Enter abre e o foco vai ao primeiro link (`aria-current="page"` correto). Tab fica preso no header. Esc fecha e devolve o foco ao botão. |
| Modal de contato | Enter no CTA abre e o foco vai ao primeiro campo. Após 25 Tabs o foco continua no modal. Esc fecha e o foco volta ao CTA. Fundo travado e liberado corretamente. |
| "Ver mais" (`<details>`) | Enter expande; o rótulo muda para "Ver menos". |
| Índice de ofertas | Chip com anel de foco; Enter rola até a oferta (topo a 96px, abaixo do header). |
| Console | Sem erros, inclusive sem violações de CSP com o reCAPTCHA carregado. |

## 5. Critérios de aceite (PRD, seção 12)

| # | Critério | Status |
|---|---|---|
| 1 | Rotas funcionando, com HTML pré-renderizado | OK |
| 2 | Visual segue o DESIGN.md v2 e contraste AA | OK (sem `#ff4f00`/creme no código; Lighthouse 100 em acessibilidade) |
| 3 | Home com RF01–RF12 em ordem; seções sem asset ocultas | OK (parceiros e clientes ocultos até haver logos) |
| 4 | 6 ofertas com âncoras a partir da home e do footer | OK |
| 5 | Blog: post publicado, `draft`, tags, paginação, RSS, sitemap, frontmatter validado | OK (paginação e `draft` testados com posts temporários) |
| 6 | Formulário com interesses e cargo, validação no servidor, pré-seleção no modal | OK |
| 7 | Nada copiado da Dharma AI | OK (verificação manual de conteúdo; nenhum asset externo) |
| 8 | Sem secrets no frontend e sem `dangerouslySetInnerHTML` | OK (só a chave pública do reCAPTCHA; nenhuma ocorrência) |
| 9 | `lint` e `build` sem erros | OK |
| 10 | Lighthouse mobile ≥ 90 em `/`, `/ia-no-seu-negocio`, `/blog` e um post | OK (100 em todas as categorias) |

## 6. Não coberto nesta rodada

- **Envio real do formulário:** a validação, a lista branca, o rate limit e a recusa sem token do reCAPTCHA foram testados chamando a API diretamente. O envio pelo Resend depende das chaves de produção.
- **Leitores de tela:** não testados (NVDA/VoiceOver). A semântica foi checada pelo Lighthouse/axe.
- **Safari e Firefox:** não testados; apenas Chrome.
- **Produção:** testar após o deploy, por exemplo os cabeçalhos de segurança atrás do proxy da Hostinger, o `TRUST_PROXY` e o HSTS.

## 7. Pendências de conteúdo (bloqueiam a publicação, não o código)

- Textos **[VALIDAR]** listados nos resumos de cada fase, incluindo o post de exemplo.
- Texto da política de privacidade.
- Logos de parceiros e clientes, com autorização de uso.
- Itens de mídia (podcasts, artigos, entrevistas).
- Imagem de compartilhamento (1200×630) e favicon em alta resolução (≥ 180px ou SVG).
