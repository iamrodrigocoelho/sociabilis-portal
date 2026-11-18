---
# Modelo de post. Arquivos iniciados por "_" são ignorados pelo build.
#
# Como publicar:
# 1. Copie este arquivo para content/blog/<slug>.md (o nome do arquivo deve ser igual ao slug).
# 2. Preencha o frontmatter abaixo.
# 3. Coloque as imagens em public/blog/<slug>/ (WebP ou AVIF, largura máxima 1600px).
# 4. Rode `npm run build`: o build valida o frontmatter e falha com uma mensagem clara se algo estiver errado.
#    Ele gera a página do post, as páginas de tag e paginação, o sitemap.xml e o blog/rss.xml.
# 5. Não publique afirmações numéricas sem fonte citada (link para a fonte no texto).

title: "Título do post"                 # obrigatório. Recomendado: até 70 caracteres
slug: "titulo-do-post"                  # obrigatório. kebab-case, sem acentos, único. Não pode ser "pagina" nem "tag"
description: "Resumo do post para buscadores e redes sociais, com entre 120 e 160 caracteres. Diga o que o leitor vai aprender."  # obrigatório
date: "2026-11-18"                      # obrigatório (AAAA-MM-DD). Datas futuras só são publicadas a partir do dia
# updated: "2026-11-20"                 # opcional (AAAA-MM-DD), não pode ser anterior a date
author: "equipe"                        # obrigatório. Chave (ou nome exato) de um autor em src/content/authors.ts
tags: ["IA sustentável", "RAG"]         # obrigatório. 1 a 4 tags
# cover: "/blog/titulo-do-post/capa.webp"   # opcional. Imagem 16:9 em public/
# coverAlt: "Descrição da capa"             # obrigatório se houver cover
draft: true                             # true = não publicado (aparece só no `npm run dev`)
---

Parágrafo de abertura. Comece pelo problema do leitor.

## Primeiro subtítulo

Use `##` para seções (posts com 3 ou mais `##` ganham sumário automático) e `###` para subseções.
Não use `#`: o título do post vem do frontmatter.

- Listas com `-` ou `1.`
- **Negrito**, *itálico* e `código`
- [Link interno](/ia-no-seu-negocio#impact-scan) ou [link externo](https://exemplo.com) (abre em nova aba)

> Citações com `>`.

![Texto alternativo obrigatório](/blog/titulo-do-post/imagem.webp "Legenda opcional (vira a legenda da figura)")

| Coluna | Coluna |
|---|---|
| Tabelas | são suportadas |

HTML bruto (`<div>`, `<br>`, `<iframe>`...) não é permitido e faz o build falhar.
