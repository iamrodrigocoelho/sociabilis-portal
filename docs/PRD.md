# PRD - Website Sociabilis AI Labs

## 1. Visão geral do produto

### Nome do projeto
**Website Sociabilis AI Labs**

### Produto
Website institucional e comercial da **Sociabilis AI Labs**, divisão de inteligência artificial aplicada da Sociabilis.

### Objetivo do website
Criar uma página institucional moderna, responsiva, performática e segura para apresentar a Sociabilis AI Labs como uma divisão de implantação de IA responsável e sustentável.

O site deve comunicar claramente que a Sociabilis AI Labs atua como uma **AI Deployment Company**, ajudando empresas responsáveis, B Corps, PMEs e negócios de impacto a implantarem soluções de IA na operação real do negócio, com governança, eficiência e menor impacto socioambiental.

### Referências internas obrigatórias
O Claude Code deve utilizar os seguintes arquivos já existentes no projeto:

- Logotipo: `img/logo-big-sociabilis.png`
- Design system: `docs/DESIGN.md`

Antes de implementar, o Claude Code deve ler o arquivo `docs/DESIGN.md` e aplicar suas diretrizes visuais, incluindo cores, tipografia, espaçamentos, botões, componentes, grid, tokens visuais e demais padrões definidos.

---

## 2. Contexto da marca

A Sociabilis ajuda negócios a se tornarem mais competitivos por meio de inovação e sustentabilidade.

A Sociabilis AI Labs é a divisão especializada em inteligência artificial aplicada, com foco em:

- AI Deployment;
- Forward Deployed AI;
- copilotos internos;
- agentes de IA;
- automação inteligente;
- RAG;
- governança de IA;
- segurança e privacidade;
- IA sustentável;
- mitigação da pegada socioambiental da IA.

A proposta central é transformar IA em resultado real, não apenas em experimentos isolados.

---

## 3. Posicionamento

### Posicionamento principal
**Sociabilis AI Labs é um laboratório de implantação de IA responsável e sustentável para empresas responsáveis, B Corps e negócios de impacto.**

### Descrição curta
**AI Deployment Lab for Sustainable Business Transformation**

### Frase principal
**Implantamos IA responsável e sustentável no coração da operação do seu negócio.**

### Subfrase
A Sociabilis AI Labs ajuda empresas responsáveis a transformarem IA em resultado real por meio de copilotos, agentes, automações e soluções com RAG, sempre com governança, eficiência e atenção aos impactos socioambientais.

---

## 4. Público-alvo

O website deve falar principalmente com:

- empresas responsáveis;
- B Corps;
- negócios de impacto socioambiental;
- PMEs em transformação digital;
- consultorias ESG;
- startups;
- organizações do terceiro setor;
- áreas de inovação;
- áreas de sustentabilidade;
- áreas de tecnologia;
- áreas de produto e operações.

### Perfil do visitante
O visitante ideal é um decisor ou influenciador que busca aplicar IA no negócio, mas tem preocupação com segurança, governança, custo, eficiência, reputação, sustentabilidade e impacto.

Exemplos:

- CEOs;
- fundadores;
- heads de inovação;
- heads de tecnologia;
- gestores de sustentabilidade;
- gestores de produto;
- gestores de operações;
- consultores ESG;
- líderes de transformação digital.

---

## 5. Objetivos de negócio

O website deve:

1. Posicionar a Sociabilis AI Labs como uma divisão especializada em IA aplicada, responsável e sustentável.
2. Explicar de forma clara o conceito de AI Deployment Company.
3. Apresentar as principais ofertas da divisão.
4. Gerar leads qualificados.
5. Direcionar visitantes para contato comercial.
6. Transmitir confiança, modernidade, responsabilidade e visão técnica.
7. Reforçar a conexão entre IA, inovação, sustentabilidade e competitividade.
8. Preparar a base para futuras páginas de produtos, como AI Carbon Tracker e CNPJ Neutro.

---

## 6. Objetivos de experiência do usuário

O usuário deve conseguir entender em menos de 10 segundos:

- o que é a Sociabilis AI Labs;
- para quem ela é;
- qual problema ela resolve;
- quais soluções oferece;
- qual é seu diferencial;
- como entrar em contato.

A experiência deve ser:

- simples;
- moderna;
- responsiva;
- acessível;
- objetiva;
- visualmente alinhada à Sociabilis;
- otimizada para dispositivos móveis;
- rápida em conexões móveis;
- clara para públicos técnicos e não técnicos.

---

## 7. Escopo do MVP

### Tipo de website
Landing page institucional one-page.

### Páginas
Para o MVP, criar uma única página principal:

- `/` ou rota equivalente da home.

### Seções obrigatórias da página

1. Header com logo e navegação
2. Hero section
3. Seção de problema
4. Seção de proposta de valor
5. Seção de pilares
6. Seção de ofertas
7. Seção de metodologia
8. Seção de diferenciais
9. Seção de público-alvo
10. Seção de chamada final
11. Footer

---

## 8. Requisitos funcionais

### RF01 - Header

O header deve conter:

- logotipo da Sociabilis usando o arquivo `img/logo-big-sociabilis.png`;
- navegação com links âncora para as seções principais;
- botão de CTA.

Links sugeridos:

- O que fazemos
- Ofertas
- Metodologia
- Diferenciais
- Contato

CTA sugerido:

- **Fale com a Sociabilis**

Comportamento:

- Em desktop, exibir navegação horizontal.
- Em mobile, exibir menu responsivo.
- Header deve permanecer limpo, sem excesso de elementos.
- Pode ser fixo ou não, de acordo com o padrão do design system.

---

### RF02 - Hero section

A primeira dobra deve comunicar imediatamente a proposta de valor.

Conteúdo sugerido:

**Eyebrow:**  
Sociabilis AI Labs

**Título:**  
Implantamos IA responsável e sustentável no coração da operação do seu negócio.

**Subtítulo:**  
Ajudamos empresas responsáveis, B Corps e negócios de impacto a transformarem IA em resultado real por meio de copilotos, agentes, automações e soluções com RAG, sempre com governança, eficiência e atenção aos impactos socioambientais.

**CTAs:**  
- Conheça nossas soluções
- Fale com a Sociabilis

Elementos visuais:

- Usar o logo da Sociabilis de forma elegante.
- Utilizar elementos gráficos inspirados em IA, redes, dados, sustentabilidade, impacto ou tecnologia limpa.
- Evitar visual genérico de robôs ou imagens artificiais exageradas.
- Manter estética profissional, moderna e confiável.

---

### RF03 - Seção de problema

Objetivo: mostrar que muitas empresas testam IA, mas não conseguem implantar com segurança e escala.

Título sugerido:

**IA não gera valor quando fica presa em pilotos isolados.**

Texto sugerido:

Muitas organizações já utilizam ferramentas de IA, mas ainda enfrentam dificuldade para transformar experimentos em soluções operacionais. O resultado são iniciativas desconectadas, baixa governança, riscos de segurança, custos pouco visíveis e impactos socioambientais ignorados.

Cards sugeridos:

1. Ferramentas desconectadas
2. Falta de integração aos processos
3. Riscos de dados e privacidade
4. Baixa governança
5. Custos e impactos invisíveis
6. Dificuldade de escalar pilotos

---

### RF04 - Seção de proposta de valor

Título sugerido:

**Da estratégia à implantação: IA aplicada com governança e impacto positivo.**

Texto sugerido:

A Sociabilis AI Labs atua como uma AI Deployment Company. Entramos no contexto real do cliente, entendemos seus processos, priorizamos casos de uso de alto impacto e implantamos soluções de IA que podem ser medidas, governadas e evoluídas.

Blocos sugeridos:

- Implantar IA na operação
- Governar riscos e uso responsável
- Reduzir desperdícios e impactos
- Medir resultados e evolução

---

### RF05 - Seção de pilares

Título sugerido:

**Três pilares para uma IA que gera resultado real.**

Criar três cards principais:

#### 1. Deploy AI
Implantamos soluções de IA conectadas aos processos reais da empresa, como copilotos internos, agentes, automações e sistemas com RAG.

#### 2. Govern AI
Criamos bases de governança, segurança, privacidade, rastreabilidade e uso responsável para que a IA possa ser adotada com confiança.

#### 3. Sustain AI
Aplicamos princípios de eficiência, escolha adequada de modelos, redução de desperdícios e mensuração da pegada socioambiental da IA.

---

### RF06 - Seção de ofertas

Título sugerido:

**Ofertas para acelerar sua jornada de IA responsável.**

Exibir cards para as ofertas abaixo.

#### AI Opportunity & Impact Scan
Diagnóstico para identificar onde a IA pode gerar mais valor no negócio.

Entregáveis:

- mapa de oportunidades;
- matriz impacto x esforço;
- riscos e dependências;
- roadmap de 30, 60 e 90 dias.

#### RAG Starter
Implantação de copilotos com base de conhecimento própria da empresa.

Casos de uso:

- atendimento interno;
- políticas e procedimentos;
- documentos ESG;
- suporte técnico;
- RH;
- jurídico;
- operações.

#### Forward Deployed AI Pod
Squad da Sociabilis AI Labs atuando próximo ao cliente para implantar IA no contexto real do negócio.

Perfis possíveis:

- AI Deployment Lead;
- Forward Deployed AI Engineer;
- Product/Process Strategist;
- Data/RAG Engineer;
- Responsible & Sustainable AI Specialist.

#### AI Agents & Automation
Criação de agentes de IA e automações inteligentes para apoiar ou executar tarefas operacionais.

Exemplos:

- triagem de e-mails;
- análise de documentos;
- geração de relatórios;
- coleta de evidências ESG;
- suporte interno;
- integração com APIs e workflows.

#### Sustainable AI Assessment
Avaliação da maturidade, governança e impacto socioambiental do uso de IA na organização.

Entregáveis:

- inventário de ferramentas;
- análise de riscos;
- recomendações de governança;
- estimativa de consumo, custo e emissões;
- plano de otimização e mitigação.

#### AI Carbon Tracker
Produto da Sociabilis para estimar, acompanhar e comunicar a pegada climática associada ao uso de IA generativa.

---

### RF07 - Seção de metodologia

Título sugerido:

**Como trabalhamos**

Exibir a metodologia em etapas visuais.

Etapas:

1. Diagnosticar  
Entendemos o negócio, os processos, os dados e as principais dores.

2. Priorizar  
Selecionamos casos de uso com maior potencial de impacto e viabilidade.

3. Prototipar  
Criamos MVPs rápidos para validar valor, experiência e aderência técnica.

4. Implantar  
Integramos a solução ao fluxo real de trabalho.

5. Medir  
Acompanhamos indicadores de produtividade, adoção, custo, qualidade e impacto.

6. Otimizar  
Evoluímos a solução com base em dados, feedback e melhoria contínua.

7. Mitigar  
Apoiamos a redução de desperdícios e a mensuração da pegada socioambiental da IA.

---

### RF08 - Seção de diferenciais

Título sugerido:

**Por que a Sociabilis AI Labs**

Diferenciais:

#### IA aplicada, não apenas conceitual
Ajudamos a tirar a IA da apresentação e levá-la para a operação.

#### Modelo Forward Deployed AI
Atuamos próximos ao cliente para entender contexto, cultura, dados e processos reais.

#### Sustentabilidade como premissa
Consideramos eficiência, custo, consumo e impacto socioambiental desde o desenho da solução.

#### Governança desde o início
Projetamos soluções com atenção a segurança, privacidade, rastreabilidade e uso responsável.

#### Arquitetura eficiente
Priorizamos RAG, SLMs, automações e escolha adequada de modelos para evitar desperdício técnico e financeiro.

#### Foco em negócios responsáveis
Falamos com empresas que desejam crescer com inovação, sustentabilidade e impacto positivo.

---

### RF09 - Seção de público-alvo

Título sugerido:

**Para empresas que querem crescer com IA e responsabilidade.**

Exibir segmentos:

- B Corps;
- negócios de impacto;
- empresas responsáveis;
- PMEs em transformação digital;
- consultorias ESG;
- startups;
- organizações do terceiro setor;
- áreas de inovação, tecnologia, sustentabilidade e operações.

Texto de apoio:

Se sua organização quer usar IA para aumentar produtividade, reduzir desperdícios, melhorar decisões e acelerar inovação, a Sociabilis AI Labs pode ajudar a construir essa jornada de forma prática, segura e sustentável.

---

### RF10 - Seção de CTA final

Título sugerido:

**Sua empresa não precisa apenas testar IA. Ela precisa implantar IA com estratégia, governança e impacto positivo.**

Texto sugerido:

A Sociabilis AI Labs transforma inteligência artificial em resultado real para negócios responsáveis.

CTA:

- **Fale com a Sociabilis**
- **Conheça nossas soluções**

O CTA pode direcionar para:

- link de e-mail configurável;
- formulário de contato, caso já exista backend ou serviço de formulário;
- seção de contato;
- WhatsApp, se houver número oficial definido no projeto.

Não inventar e-mail, telefone ou WhatsApp. Caso essas informações não existam no projeto, usar placeholders claros em constantes de configuração.

---

### RF11 - Footer

O footer deve conter:

- logotipo ou nome Sociabilis AI Labs;
- breve descrição;
- links internos;
- espaço para redes sociais, se existirem;
- copyright;
- menção à Sociabilis.

Texto sugerido:

**Sociabilis AI Labs**  
IA aplicada, governança desde o início e sustentabilidade como diferencial.

Copyright:

`© ${anoAtual} Sociabilis. Todos os direitos reservados.`

---

## 9. Requisitos não funcionais

### RNF01 - Responsividade

O website deve ser totalmente responsivo e funcionar corretamente em:

- smartphones pequenos;
- smartphones grandes;
- tablets;
- notebooks;
- desktops;
- telas ultrawide.

Breakpoints mínimos recomendados:

- mobile: até 640px;
- tablet: 641px a 1024px;
- desktop: acima de 1024px.

Não deve haver rolagem horizontal em nenhuma resolução.

---

### RNF02 - Performance

O site deve ser rápido e leve.

Requisitos:

- otimizar carregamento de imagens;
- usar lazy loading quando aplicável;
- evitar bibliotecas pesadas desnecessárias;
- minimizar JavaScript no cliente;
- aplicar boas práticas de Core Web Vitals;
- manter bom desempenho em conexões móveis.

Metas sugeridas:

- Lighthouse Performance maior ou igual a 90;
- Accessibility maior ou igual a 90;
- Best Practices maior ou igual a 90;
- SEO maior ou igual a 90.

---

### RNF03 - Acessibilidade

Implementar boas práticas de acessibilidade:

- HTML semântico;
- hierarquia correta de headings;
- contraste adequado;
- texto alternativo em imagens relevantes;
- foco visível em elementos interativos;
- navegação por teclado;
- labels em campos de formulário;
- aria-label quando necessário;
- evitar texto essencial apenas em imagens.

---

### RNF04 - SEO

Implementar SEO básico:

- title adequado;
- meta description;
- Open Graph tags;
- Twitter card;
- favicon, se existir no projeto;
- estrutura semântica;
- headings bem organizados;
- URLs limpas;
- conteúdo indexável.

Title sugerido:

**Sociabilis AI Labs | IA responsável e sustentável para negócios de impacto**

Meta description sugerida:

**A Sociabilis AI Labs implanta copilotos, agentes, automações e soluções com RAG para empresas responsáveis, B Corps e negócios de impacto, com governança e sustentabilidade.**

---

### RNF05 - Segurança

Mesmo sendo um site institucional, aplicar boas práticas de segurança:

- não expor chaves, tokens ou segredos no frontend;
- não hardcodar credenciais;
- validar entradas de formulário, caso exista formulário;
- sanitizar dados antes de envio, caso aplicável;
- usar HTTPS em produção;
- configurar headers de segurança quando possível;
- evitar dependências desnecessárias;
- manter dependências atualizadas;
- evitar uso de `dangerouslySetInnerHTML` ou equivalente;
- não coletar dados pessoais sem necessidade;
- se houver formulário, incluir aviso de privacidade ou link para política de privacidade.

Headers recomendados, se o framework permitir:

- Content-Security-Policy;
- X-Content-Type-Options;
- Referrer-Policy;
- Permissions-Policy;
- X-Frame-Options ou frame-ancestors via CSP.

---

### RNF06 - Privacidade

O site não deve coletar dados sensíveis.

Caso seja implementado formulário de contato:

- coletar apenas dados necessários;
- campos mínimos sugeridos: nome, e-mail, empresa e mensagem;
- informar finalidade do contato;
- não armazenar dados localmente no navegador sem necessidade;
- não enviar dados para serviços terceiros sem configuração explícita.

---

### RNF07 - Manutenibilidade

O código deve ser organizado e fácil de manter.

Requisitos:

- componentes reutilizáveis;
- separação clara entre conteúdo, componentes e layout;
- nomes descritivos;
- evitar duplicação de código;
- usar constantes para textos repetidos;
- manter estrutura escalável para futuras páginas;
- seguir padrões existentes do projeto.

---

## 10. Stack técnica

O Claude Code deve primeiro inspecionar o projeto para identificar a stack já existente.

### Regra principal
Se o projeto já possuir framework configurado, manter a stack existente.

### Caso não exista stack definida
Criar o projeto usando uma stack moderna e adequada para landing page:

- React com TypeScript;
- Vite ou Next.js;
- CSS seguindo o design system em `docs/DESIGN.md`;
- Tailwind CSS apenas se já estiver no projeto ou se fizer sentido com o design system;
- componentes sem dependências pesadas desnecessárias.

### Importante
Não instalar bibliotecas sem necessidade clara. Priorizar simplicidade, performance e manutenibilidade.

---

## 11. Diretrizes visuais

O Claude Code deve seguir o arquivo `docs/DESIGN.md`.

Antes de criar componentes, ler e aplicar:

- cores;
- tipografia;
- espaçamentos;
- tokens;
- bordas;
- sombras;
- estilo de botões;
- grid;
- cards;
- ícones;
- padrões de responsividade;
- padrões de acessibilidade.

### Logotipo
Utilizar obrigatoriamente:

`img/logo-big-sociabilis.png`

Requisitos:

- preservar proporção;
- não distorcer;
- usar tamanho adequado no header e, se fizer sentido, no footer;
- definir `alt` adequado, como: `Sociabilis AI Labs`.

---

## 12. Tom de voz e copywriting

O tom do site deve ser:

- profissional;
- claro;
- moderno;
- confiável;
- estratégico;
- acessível;
- sem excesso de jargão;
- orientado a negócio;
- com autoridade técnica;
- com preocupação socioambiental.

Evitar:

- promessas exageradas;
- linguagem genérica de IA;
- frases como "revolucione tudo com IA";
- excesso de termos técnicos sem explicação;
- greenwashing;
- afirmar neutralização ou compensação sem metodologia definida;
- prometer redução ambiental sem medição.

Usar linguagem como:

- implantação;
- governança;
- eficiência;
- impacto mensurável;
- negócios responsáveis;
- IA aplicada;
- produtividade responsável;
- sustentabilidade como premissa.

---

## 13. Conteúdo final da landing page

### Hero

**Sociabilis AI Labs**

**Implantamos IA responsável e sustentável no coração da operação do seu negócio.**

Ajudamos empresas responsáveis, B Corps e negócios de impacto a transformarem IA em resultado real por meio de copilotos, agentes, automações e soluções com RAG, sempre com governança, eficiência e atenção aos impactos socioambientais.

Botões:

- Conheça nossas soluções
- Fale com a Sociabilis

---

### Problema

**IA não gera valor quando fica presa em pilotos isolados.**

Muitas organizações já utilizam ferramentas de IA, mas ainda enfrentam dificuldade para transformar experimentos em soluções operacionais. O resultado são iniciativas desconectadas, baixa governança, riscos de segurança, custos pouco visíveis e impactos socioambientais ignorados.

Cards:

- Ferramentas desconectadas
- Falta de integração aos processos
- Riscos de dados e privacidade
- Baixa governança
- Custos e impactos invisíveis
- Dificuldade de escalar pilotos

---

### Proposta de valor

**Da estratégia à implantação: IA aplicada com governança e impacto positivo.**

A Sociabilis AI Labs atua como uma AI Deployment Company. Entramos no contexto real do cliente, entendemos seus processos, priorizamos casos de uso de alto impacto e implantamos soluções de IA que podem ser medidas, governadas e evoluídas.

Blocos:

- Implantar IA na operação
- Governar riscos e uso responsável
- Reduzir desperdícios e impactos
- Medir resultados e evolução

---

### Pilares

**Três pilares para uma IA que gera resultado real.**

**Deploy AI**  
Implantamos soluções de IA conectadas aos processos reais da empresa, como copilotos internos, agentes, automações e sistemas com RAG.

**Govern AI**  
Criamos bases de governança, segurança, privacidade, rastreabilidade e uso responsável para que a IA possa ser adotada com confiança.

**Sustain AI**  
Aplicamos princípios de eficiência, escolha adequada de modelos, redução de desperdícios e mensuração da pegada socioambiental da IA.

---

### Ofertas

**Ofertas para acelerar sua jornada de IA responsável.**

**AI Opportunity & Impact Scan**  
Diagnóstico para identificar onde a IA pode gerar mais valor no negócio.

**RAG Starter**  
Implantação de copilotos com base de conhecimento própria da empresa.

**Forward Deployed AI Pod**  
Squad da Sociabilis AI Labs atuando próximo ao cliente para implantar IA no contexto real do negócio.

**AI Agents & Automation**  
Criação de agentes de IA e automações inteligentes para apoiar ou executar tarefas operacionais.

**Sustainable AI Assessment**  
Avaliação da maturidade, governança e impacto socioambiental do uso de IA na organização.

**AI Carbon Tracker**  
Produto da Sociabilis para estimar, acompanhar e comunicar a pegada climática associada ao uso de IA generativa.

---

### Metodologia

**Como trabalhamos**

1. **Diagnosticar**  
Entendemos o negócio, os processos, os dados e as principais dores.

2. **Priorizar**  
Selecionamos casos de uso com maior potencial de impacto e viabilidade.

3. **Prototipar**  
Criamos MVPs rápidos para validar valor, experiência e aderência técnica.

4. **Implantar**  
Integramos a solução ao fluxo real de trabalho.

5. **Medir**  
Acompanhamos indicadores de produtividade, adoção, custo, qualidade e impacto.

6. **Otimizar**  
Evoluímos a solução com base em dados, feedback e melhoria contínua.

7. **Mitigar**  
Apoiamos a redução de desperdícios e a mensuração da pegada socioambiental da IA.

---

### Diferenciais

**Por que a Sociabilis AI Labs**

**IA aplicada, não apenas conceitual**  
Ajudamos a tirar a IA da apresentação e levá-la para a operação.

**Modelo Forward Deployed AI**  
Atuamos próximos ao cliente para entender contexto, cultura, dados e processos reais.

**Sustentabilidade como premissa**  
Consideramos eficiência, custo, consumo e impacto socioambiental desde o desenho da solução.

**Governança desde o início**  
Projetamos soluções com atenção a segurança, privacidade, rastreabilidade e uso responsável.

**Arquitetura eficiente**  
Priorizamos RAG, SLMs, automações e escolha adequada de modelos para evitar desperdício técnico e financeiro.

**Foco em negócios responsáveis**  
Falamos com empresas que desejam crescer com inovação, sustentabilidade e impacto positivo.

---

### Público-alvo

**Para empresas que querem crescer com IA e responsabilidade.**

Atendemos B Corps, negócios de impacto, empresas responsáveis, PMEs em transformação digital, consultorias ESG, startups, organizações do terceiro setor e áreas de inovação, tecnologia, sustentabilidade e operações.

Se sua organização quer usar IA para aumentar produtividade, reduzir desperdícios, melhorar decisões e acelerar inovação, a Sociabilis AI Labs pode ajudar a construir essa jornada de forma prática, segura e sustentável.

---

### CTA final

**Sua empresa não precisa apenas testar IA. Ela precisa implantar IA com estratégia, governança e impacto positivo.**

A Sociabilis AI Labs transforma inteligência artificial em resultado real para negócios responsáveis.

Botões:

- Fale com a Sociabilis
- Conheça nossas soluções

---

### Footer

**Sociabilis AI Labs**  
IA aplicada, governança desde o início e sustentabilidade como diferencial.

`© ${anoAtual} Sociabilis. Todos os direitos reservados.`

---

## 14. Componentes sugeridos

Criar componentes reutilizáveis, conforme a stack do projeto:

- `Header`
- `HeroSection`
- `ProblemSection`
- `ValuePropositionSection`
- `PillarsSection`
- `OffersSection`
- `MethodologySection`
- `DifferentialsSection`
- `AudienceSection`
- `FinalCTASection`
- `Footer`
- `SectionHeader`
- `Card`
- `CTAButton`
- `Container`

Caso o projeto use outra convenção de nomes, seguir o padrão existente.

---

## 15. Critérios de aceite

O desenvolvimento será considerado concluído quando:

1. O website estiver funcional localmente.
2. O logotipo `img/logo-big-sociabilis.png` estiver aplicado corretamente.
3. As diretrizes de `docs/DESIGN.md` tiverem sido respeitadas.
4. Todas as seções obrigatórias estiverem presentes.
5. A página estiver responsiva em mobile, tablet e desktop.
6. Não houver rolagem horizontal.
7. A navegação por âncoras estiver funcionando.
8. Os CTAs estiverem visíveis e funcionais.
9. O site tiver title e meta description.
10. As imagens tiverem textos alternativos.
11. O HTML estiver semântico.
12. O código estiver organizado em componentes reutilizáveis.
13. Não houver secrets ou credenciais expostas.
14. O site passar em build sem erros.
15. O Lighthouse deve atingir pontuação mínima sugerida de 90 em Performance, Accessibility, Best Practices e SEO, sempre que possível.

---

## 16. Instruções específicas para o Claude Code

Antes de implementar:

1. Inspecione a estrutura do projeto.
2. Leia `docs/DESIGN.md`.
3. Verifique onde estão os arquivos de imagem.
4. Confirme a stack pelo `package.json` ou arquivos equivalentes.
5. Preserve padrões existentes do projeto.
6. Não remova arquivos não relacionados.
7. Não altere o design system sem necessidade.
8. Não crie backend sem solicitação explícita.
9. Não invente dados de contato.
10. Use placeholders configuráveis caso informações como e-mail, telefone ou WhatsApp não estejam disponíveis.

Durante a implementação:

1. Criar a landing page da Sociabilis AI Labs.
2. Separar a página em componentes.
3. Aplicar responsividade mobile-first.
4. Usar HTML semântico.
5. Aplicar boas práticas de acessibilidade.
6. Otimizar imagens.
7. Evitar dependências pesadas.
8. Garantir build sem erros.
9. Testar visualmente em diferentes larguras de tela.
10. Documentar no README, se necessário, como rodar o projeto.

Após implementar:

1. Rodar lint, se existir.
2. Rodar build, se existir.
3. Corrigir erros encontrados.
4. Informar arquivos alterados.
5. Informar comandos utilizados.
6. Informar pontos pendentes, caso existam.

---

## 17. Fora de escopo do MVP

Não implementar neste primeiro momento:

- área administrativa;
- blog;
- CMS;
- autenticação;
- dashboard;
- backend próprio;
- banco de dados;
- checkout;
- integração real com CRM;
- cálculo real de pegada de carbono;
- formulário funcional com envio real, salvo se já existir serviço configurado no projeto.

---

## 18. Evoluções futuras

O projeto deve ser estruturado de forma que permita evoluções futuras, como:

- página específica do AI Carbon Tracker;
- página específica do CNPJ Neutro;
- blog sobre IA sustentável;
- biblioteca de cases;
- formulário integrado a CRM;
- página de diagnóstico gratuito;
- calculadora simples de maturidade em IA;
- calculadora de pegada de IA;
- versão multilíngue;
- dashboard de leads;
- integração com analytics;
- área de materiais ricos.
