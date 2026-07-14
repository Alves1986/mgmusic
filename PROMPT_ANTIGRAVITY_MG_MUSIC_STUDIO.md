# PROMPT — Finalização do Website MG Music Studio (Frontend já iniciado no v0.app)

Já existe uma base de código gerada no **v0.app (Vercel)** para o site institucional da **MG Music Studio**, produtora musical de Gesiel Jasson, sediada em Telêmaco Borba - PR. Essa base cobre **apenas o frontend público estático** (Home com hero, prova social, serviços, portfólio, formulário de contato e footer), reproduzindo fielmente o design de referência. **Não tenho certeza do que exatamente foi implementado nem se está documentado.**

Sua tarefa agora tem duas frentes:
1. **Auditar o código existente** (gerado pelo v0) e documentar o que já está pronto.
2. **Implementar tudo que está faltando** — principalmente o **backend completo** (banco de dados, autenticação, painel administrativo, CRUD de portfólio, captura de leads) — sem quebrar ou re-fazer do zero o frontend que já está bom.

Este é um site que precisa **se vender sozinho**: autoridade, prova social e conversão são os pilares.

Antes de começar, leia os 4 arquivos de referência anexados a este prompt:
1. `mg_music_studio_v2.html` — versão estática já prototipada anteriormente (conteúdo e seções aproximados, mas com dados fake/placeholder e sem backend).
2. `stitch_mg_music_studio_layout.zip` — mockups gerados no Stitch (`mg_music_studio_home/code.html` e `admin_login_mg_music_studio/code.html`) + `DESIGN.md` com o design system oficial "Aural Gold Elite" (cores, tipografia, espaçamento, componentes).
3. `Relatório_Detalhado__MG_Music_Studio_e_Gesiel_Jasson.md` — briefing de negócio com todo o conteúdo real, copy de vendas, portfólio e diferenciais competitivos.
4. Print de tela do projeto atual no v0.app (`v0.app/cassiaandinho-4998/chat/mg-music-studio-...`), mostrando o resultado já gerado: hero com gradiente dourado, prova social (100M+ ouvintes, 300+ projetos, 50+ artistas), cards de serviços, grid de portfólio, formulário de contato, mapa e footer — já usando o logo oficial e os dados reais da empresa (CNPJ, endereço, telefone). O v0 relatou que os ícones do `lucide-react` foram substituídos por SVGs inline porque a versão instalada da lib removeu esses ícones — **atenção a esse ponto ao auditar dependências**.

**Use o design system do Stitch (`DESIGN.md`) como fonte da verdade visual** — ele é mais refinado que o v2.html. Use o `v2.html` apenas como referência de estrutura de seções e o relatório como fonte da verdade de **conteúdo/copy real**.

---

## 0. Primeiro Passo Obrigatório: Auditoria do Código Existente

Antes de escrever qualquer código novo:

1. Abra/clone o projeto exportado do v0.app e faça um **inventário completo**: quais páginas/seções existem, quais componentes, se há alguma rota de API, se há algum arquivo de schema/banco, se há autenticação, se há variáveis de ambiente configuradas, quais dependências estão no `package.json` (confirmar estado do `lucide-react` e se vale a pena fixar a versão ou trocar por outra lib de ícones).
2. Produza um arquivo `AUDITORIA.md` na raiz do projeto listando: (a) o que já existe e está correto, (b) o que existe mas está incompleto/mockado (ex: formulário de contato que não persiste em lugar nenhum, portfólio com dados hardcoded no componente em vez de vir de banco), (c) o que não existe ainda (banco, auth, admin).
3. Só depois de concluída a auditoria, siga para a implementação do que falta, descrito nas seções abaixo. **Preserve o layout/estética já gerado** — o trabalho aqui é essencialmente "plugar" um backend real por trás do que já existe visualmente, não redesenhar.

---

## 1. Stack Técnica

**Requisito central: o sistema deve rodar 100% dentro do ecossistema Vercel — frontend (já existente, vindo do v0) e backend juntos, no mesmo projeto, sem depender de provedores externos (nada de Supabase, Firebase, etc.).** Um único deploy na Vercel deve subir site público, painel admin e toda a camada de dados/API.

- **Next.js 15+ (App Router)** + **TypeScript strict** (sem `any`) — o frontend já foi gerado pelo v0 nessa base; **mantenha-o**, apenas conecte-o a Server Actions/Route Handlers reais em vez de dados hardcoded
- **Tailwind CSS** já configurado pelo v0 — confirmar na auditoria se os tokens do `DESIGN.md` (cores, fontes, spacing, radius) foram aplicados corretamente; ajustar o que estiver divergente do design system oficial
- **Banco de dados: Vercel Postgres** (Neon, via Vercel Marketplace/Storage) — provisionado direto no dashboard da Vercel e conectado ao projeto por variáveis de ambiente injetadas automaticamente — **isso ainda não existe e precisa ser criado**
- **ORM: Drizzle ORM** (leve, TypeScript-first, com bom suporte a migrations — pode ser Prisma se preferir, mas manter consistência com o restante do stack Vercel-native)
- **Armazenamento de arquivos (fotos do portfólio, thumbnails): Vercel Blob** — upload direto do painel admin, sem serviço externo — **ainda não existe**
- **Autenticação do admin: Auth.js (NextAuth) com Credentials Provider**, sessão via JWT/cookies, validando contra a tabela de usuários admin no próprio Postgres — sem depender de provedor de auth externo — **ainda não existe, é a principal peça faltante**
- **Deploy: Vercel** (produção + preview deployments automáticos por branch/PR) — o projeto já deve estar vinculado à Vercel via v0; confirmar/formalizar isso
- Formulário de contato **hoje provavelmente não persiste em lugar nenhum** — precisa gravar lead direto no Postgres via Server Action/Route Handler (sem necessidade de e-mail transacional na v1, mas deixar estrutura pronta para integrar Resend — que também roda nativo na Vercel — depois)
- Site 100% responsivo (mobile-first) — o v0 já reportou responsividade mobile; validar na auditoria

---

## 2. Design System — "Aural Gold Elite"

Replique fielmente os tokens abaixo no `tailwind.config.ts`. Estilo: **Minimalismo Industrial Moderno** — preto profundo ("true black") como base, com acentos metálicos dourados, bordas finas estilo hardware de estúdio, sem sombras tradicionais (usar tonal layering / glow sutil).

**Cores principais:**
- Base: `#000000` (preto profundo) / superfícies: `#121212` a `#1c1b1b`
- Gradiente dourado (CTA/destaques): `linear-gradient(135deg, #B8860B 0%, #FFD700 100%)`
- Texto principal: `#E8E8E8` / `#e5e2e1` (silver claro)
- Texto secundário: `#d0c6ab` (on-surface-variant)
- Bordas "hardware": `1px solid rgba(232,232,232,0.1)`
- Demais tokens completos (surface-container-lowest, outline-variant, error, etc.) estão no `DESIGN.md` anexo — importar a paleta completa.

**Tipografia:**
- Títulos/Headlines: **Outfit** (peso 600-700, tracking negativo em títulos grandes)
- Corpo de texto: **DM Sans** (ou Instrument Sans como já usado no v2.html — manter consistência, decida uma e use em todo o site)
- Labels/metadata (tags, badges, specs técnicas): **Geist**, uppercase, letter-spacing amplo (0.1em+)

**Escala tipográfica:** display-lg 72px/1.1, headline-lg 48px/1.2, headline-md 32px/1.3, body-lg 18px/1.6, body-md 16px/1.6, label-sm 12px uppercase.

**Espaçamento:** grid de 8px, container máximo 1440px, gutter 24px, margem mobile 20px / desktop 80px, gap entre seções 160px (desktop).

**Formas:** cantos levemente arredondados (4px como padrão para cards/inputs/botões) — nada de "pill" totalmente arredondado, exceto ícones circulares pontuais.

**Elevação:** sem drop-shadow tradicional. Usar tonal layering (camadas de cinza/preto) + glow dourado sutil (opacidade ~20%) em elementos ativos/primários. Navbar e overlays usam `backdrop-blur` pesado (20px) com fundo preto em 80-90% de opacidade.

**Componentes (seguir padrão do DESIGN.md e do admin_login mockup):**
- Botão primário: gradiente dourado, texto preto, bold, sem borda
- Botão secundário: transparente, borda silver 1px, texto silver
- Inputs: fundo `#121212`, borda silver 10% opacidade, foco = borda dourada + glow interno sutil
- Cards: fundo `#121212`, borda `1px solid rgba(232,232,232,0.05)`, padding 32-48px
- Chips/tags (gênero musical, status): fundo `#1A1A1A`, texto uppercase Geist pequeno

---

## 3. Arquitetura do Site

### 3.1 Site Público (rotas principais) — **frontend já existe, falta conectar a dados reais**
- `/` — Home (hero + resumo de todas as seções, com CTAs) — já gerada pelo v0
- `/produtora` — Sobre a MG Music Studio e Gesiel Jasson — verificar na auditoria se existe como página separada ou como âncora dentro da Home
- `/servicos` — Detalhamento de serviços
- `/portfolio` — Galeria completa de projetos — **hoje provavelmente com dados hardcoded no componente**; migrar para buscar do banco (Server Component fazendo `SELECT` via Drizzle)
- `/contato` — Formulário + informações de contato + mapa — formulário existe visualmente, mas precisa ser conectado a uma Server Action que grava em `leads`

Não é necessário refazer a estrutura de navegação/seções — apenas trocar as fontes de dados hardcoded por consultas reais ao banco, mantendo a UI já pronta.

### 3.2 Painel Administrativo (`/admin`) — **não existe ainda, é a principal entrega desta etapa**
Construir do zero, usando como referência visual o mockup `admin_login_mg_music_studio/code.html` (tela de login):
- `/admin/login` — autenticação via **Auth.js (NextAuth) com Credentials Provider**, validando e-mail/senha (hash com bcrypt) contra a tabela `admin_users` no Postgres da Vercel. Visual "Painel de Controle / Acesso Administrativo", canvas de partículas douradas de fundo (replicar do mockup).
- `/admin` (protegido, requer sessão) — dashboard com:
  - CRUD de itens do portfólio (título, artista, gênero/tag, thumbnail — upload via **Vercel Blob**, link do YouTube/streaming, destaque na home ou não, ordem de exibição)
  - Listagem de leads recebidos pelo formulário de contato (nome, e-mail, mensagem, data, status: novo/respondido)
  - Edição dos números de destaque exibidos na Home (ex: "+100 Milhões de Views", "+300 Projetos", "+50 Artistas" — já visíveis no frontend atual como texto fixo) como campos editáveis, para não depender de deploy para atualizar

Proteger todas as rotas `/admin/*` com **middleware do Next.js** checando o JWT de sessão do Auth.js; redirecionar não autenticados para `/admin/login`.

---

## 4. Conteúdo Real (usar exatamente estas informações — não inventar dados)

### 4.1 Identidade
- **Empresa:** MG Music Studio
- **Responsável legal:** Gesiel Jasson de Oliveira
- **CNPJ:** 31.865.270/0001-99
- **Endereço:** Rua dos Curiós, 25 — São João — Telêmaco Borba, PR
- **Telefone/WhatsApp:** (42) 99825-1011

### 4.2 Sobre Gesiel Jasson (seção "A Produtora")
Produtor musical multifacetado atuando em produção musical, edição de áudio/vídeo e direção de fotografia — do início da concepção artística até a finalização visual dos projetos.

**Conexões familiares (usar como pilar de autoridade/prova social):**
- Irmão de **Moisés Cleyton** (cantor, compositor e evangelista reconhecido no gospel)
- Irmão de **Giselli Cristina** (cantora gospel, hit "Meu Barquinho" com +102 milhões de views no YouTube), mãe de **Rafaelli Cristina** e **Nicolas Henrique** (jovens artistas emergentes no gospel)

### 4.3 Serviços (4 pilares — usar ícones consistentes com o mockup: equalizer, podcasts, etc.)
1. **Produção Musical e Artística** — arranjos, pré-produção, direção artística
2. **Gravação e Masterização** — infraestrutura de ponta, sonoridade impecável
3. **Edição de Áudio e Vídeo** — mixagem, sincronização, color grading para clipes e lives
4. **Espaço para Podcast** — estúdio dedicado, equipado para áudio e vídeo profissional

### 4.4 Portfólio (dados reais para popular o Supabase inicialmente)
| Artista/Projeto | Detalhe | Métrica/Destaque |
|---|---|---|
| Giselli Cristina — "Meu Barquinho" (feat. Moisés Cleyton) | Single/clipe | +102 milhões de views no YouTube |
| Giselli Cristina — "Recomeçar" | Produção musical | — |
| Hudson Almeida — "Que Se Abram Os Céus" | Produção musical + direção de vídeo por Gesiel Jasson | — |
| Hudson Almeida — "Dono do Meu Coração" | Produção | — |
| Cantor Garcez — "Rude Cruz" | Direção do clipe oficial | — |
| Rafaelli Cristina & Nicolas Henrique | Novos talentos do portfólio familiar | — |
| Outras colaborações | Clayton Queiroz, André & Felipe, Paloma Gomes | — |

Campo de "número de impacto" em destaque na Home: **+100 milhões de visualizações produzidas**.

### 4.5 Copy de vendas (gatilhos mentais — usar como headline/subheadlines, adaptando o tom para não soar artificial)
- Autoridade: "Trabalhe com quem produz os maiores sucessos do gospel nacional e tem um legado de excelência."
- Prova social: "Junte-se aos mais de 100 milhões de ouvintes e espectadores já impactados por nossas produções."
- Qualidade/exclusividade: "Seu projeto merece a assinatura MG Music Studio: qualidade técnica impecável e visão artística que transforma."
- CTA: "Agendar Orçamento" (botão principal, sempre visível na navbar, linkando para WhatsApp `https://wa.me/5542998251011` e/ou seção de contato)

### 4.6 Seção de Contato
- Formulário: Nome, E-mail, Mensagem/Descrição do projeto → hoje só existe visualmente; conectar a Server Action que grava em tabela `leads` no Postgres da Vercel
- Bloco de informações fixas: endereço completo, CNPJ, responsável legal, telefone/WhatsApp clicável — v0 já usou os dados reais, confirmar na auditoria
- Mapa: embed do Google Maps (endereço real) — v0 relatou que o iframe do Google Maps pode aparecer vazio no sandbox de preview, mas deve funcionar em produção; validar isso pós-deploy

---

## 5. Modelo de Dados (Vercel Postgres + Drizzle ORM)

Sugestão de schema mínimo, escrito com **Drizzle ORM** (gerar migrations com `drizzle-kit` e versionar em `/drizzle`):

```ts
// schema.ts
import { pgTable, uuid, text, boolean, integer, timestamp } from "drizzle-orm/pg-core";

export const portfolioItems = pgTable("portfolio_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  artist: text("artist"),
  genreTag: text("genre_tag"),
  description: text("description"),
  thumbnailUrl: text("thumbnail_url"), // URL retornada pelo Vercel Blob
  videoUrl: text("video_url"), // link YouTube/streaming
  isFeatured: boolean("is_featured").default(false),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message"),
  status: text("status").default("novo"), // novo | respondido
  createdAt: timestamp("created_at").defaultNow(),
});

export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(), // ex: "hero_views_counter"
  value: text("value"),
});

export const adminUsers = pgTable("admin_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
```

**Regras de acesso (sem RLS de banco — controle feito na camada de aplicação, já que é um único projeto Next.js falando direto com o Postgres):**
- Leitura pública de `portfolio_items` e `site_settings`: via Server Components/Route Handlers `GET`, sem autenticação.
- Escrita em `portfolio_items` e `site_settings`: exclusivamente em Route Handlers/Server Actions protegidos, checando sessão Auth.js do admin.
- `leads`: inserção pública apenas via Server Action/Route Handler `POST` do formulário de contato (nunca acesso direto do client ao banco), com validação (ex: Zod) e rate limiting básico para evitar spam. Leitura restrita ao admin autenticado.
- `admin_users`: sem nenhum acesso público; usado apenas internamente pelo Auth.js Credentials Provider.

---

## 6. Requisitos Técnicos Adicionais

- **SEO:** metatags completas (title, description, Open Graph), sitemap.xml, dados estruturados (schema.org `LocalBusiness`/`MusicGroup`) já que é um negócio local em Telêmaco Borba
- **Performance:** imagens otimizadas via `next/image`, lazy loading no portfólio, Lighthouse 90+ em mobile
- **Acessibilidade:** contraste adequado (o dourado sobre preto já ajuda), labels em todos os inputs, navegação por teclado no menu mobile
- **Não usar imagens placeholder do Stitch/Unsplash na versão final** — deixar estrutura pronta para upload real de fotos do estúdio via **Vercel Blob** (o admin deve poder trocar as imagens do portfólio direto pelo painel, sem precisar de deploy)
- **Nenhuma dependência de infraestrutura fora da Vercel**: banco (Vercel Postgres), storage (Vercel Blob) e hospedagem (Vercel) devem ser provisionados e gerenciados inteiramente pelo dashboard/CLI da Vercel, com variáveis de ambiente linkadas automaticamente ao projeto (`vercel env pull` deve ser suficiente para rodar localmente)
- Manter o efeito de partículas douradas do canvas (`admin_login_mg_music_studio/code.html`) como diferencial visual do painel admin
- Smooth scroll entre âncoras (como já implementado no v2.html) se optar por single-page

---

## 7. Entregáveis Esperados

1. `AUDITORIA.md` documentando o estado real do projeto vindo do v0 antes de qualquer alteração (seção 0)
2. Projeto Next.js único (frontend existente + backend novo integrados), rodando localmente (`npm run dev`) e pronto para deploy 1-clique na Vercel
3. Migrations Drizzle versionadas (`/drizzle`) para o Vercel Postgres + instruções de setup no README (`vercel link`, `vercel env pull`, `drizzle-kit push`/`migrate`, seed inicial dos dados reais do portfólio)
4. Site público com as 5 seções/páginas de conteúdo real, agora **consumindo dados do banco em vez de hardcoded** (portfólio, formulário de contato, números de destaque)
5. Painel `/admin` novo e funcional com login (Auth.js), CRUD de portfólio (com upload de imagem via Vercel Blob) e listagem de leads
6. Design fiel ao sistema "Aural Gold Elite" preservado em 100% das telas (público, já existente, e admin, novo)
7. `README.md` explicando claramente que todo o provisionamento (banco, storage, deploy) é feito via Vercel, sem serviços de terceiros, e resumindo o que foi herdado do v0 vs. o que foi implementado nesta etapa
