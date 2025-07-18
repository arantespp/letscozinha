# Lets Cozinha - Design & Requirements

![Lets Cozinha](./public/logo-texto.png)

## 📋 Instruções para Agentes de IA

**IMPORTANTE**: Este README.md é o único local para documentação do projeto.

### Regras de Documentação

- ✅ **Documentar APENAS no README.md** - Toda documentação deve ser adicionada neste arquivo
- ✅ **Documentar diretamente no componente** - JSDoc e comentários detalhados no código quando necessário
- ❌ **NÃO criar arquivos de documentação externos** - Não criar arquivos .md separados
- ❌ **NÃO criar diretórios de exemplos** - Não criar pastas `/examples/` ou similares
- ❌ **NÃO criar arquivos de exemplo** - Não criar arquivos de demonstração separados

### Estrutura de Documentação

- **Componentes**: Documentar na seção "Componentes Base"
- **Páginas**: Documentar na seção "Páginas Principais"
- **Implementação**: Documentar na seção "Lista de Tarefas"

---

## 🎯 Objetivo Principal

**Vender e-books culinários** através de conteúdo gratuito e conversões estratégicas.

---

## 🧠 Laws of UX (Obrigatórias)

### Conversão

- **Jakob's Law**: Interface familiar (padrões web conhecidos)
- **Hick's Law**: Máximo 5 opções por decisão para acelerar escolhas
- **Miller's Law**: Máximo 7 itens por grupo/menu
- **Fitts's Law**: CTAs grandes (44px+) próximos ao conteúdo relevante
- **Serial Position**: E-books principais no início e fim das listas

### Performance Cognitiva

- **Cognitive Load**: Uma ação principal por página, reduzir esforço mental
- **Chunking**: Agrupar informações relacionadas (receitas por categoria)
- **Choice Overload**: Máximo 3-4 e-books em destaque na home

### Experiência

- **Peak-End Rule**: Hero impactante + CTA final forte
- **Von Restorff Effect**: E-books destacados visualmente
- **Aesthetic-Usability**: Design belo = percepção de usabilidade

---

## 🏗️ Princípios de Desenvolvimento

### Componentização Obrigatória

**REQUISITO FUNDAMENTAL**: Todo bloco de código reutilizável DEVE ser componentizado.

#### Regras de Componentização

- ✅ **Componentizar blocos reutilizáveis** - Qualquer elemento que apareça em mais de um local
- ✅ **Separar responsabilidades** - Um componente, uma responsabilidade clara
- ✅ **Props tipadas** - Sempre usar TypeScript interfaces para props
- ✅ **JSDoc obrigatório** - Documentar propósito, props e uso de cada componente
- ✅ **Reutilização antes de duplicação** - Sempre verificar se existe componente similar antes de criar novo

#### Padrão de Encapsulação ✅

**Princípio**: Componentes devem encapsular sua própria apresentação visual, incluindo Cards quando necessário.

**Implementações Completas:**

- **EmailSubscription** ✅: Card integrado internamente
- **RecipeEmailSubscription** ✅: Card com background gradiente encapsulado
- **RecipeShare** ✅: Card subtle integrado internamente
- **LayoutAside** ✅: Usa componentes internos com configuração flexível

### CSS/Styling

#### Tema Centralizado ✅

- **Design Tokens**: Cores, tipografia e espaçamentos padronizados
- **Sistema de Cores de Texto**: 7 cores essenciais do tema
- **Classes Tailwind**: Apenas classes padrão, sem CSS customizado
- **Mobile-first**: CSS responsivo partindo do mobile

**Sistema de Cores de Texto:**

- `text-text-dark` (principal), `text-text-light` (secundário)
- `text-text-strong` (enfático), `text-text-muted` (auxiliar)
- `text-text-success`, `text-text-error`, `text-text-warning` (feedback)

---

## 📱 Estrutura Base

### **Desktop (`lg`: 1024px+)**

```
┌───────────────────────────────────────┐
│              HEADER                   │ ← Fora do <main>
├───────────────────────────────────────┤
│ <main>                                │
│ ┌───────────────────────────────────┐ │
│ │             HERO                  │ |
│ │       (quando aplicável)          │ │
│ ├───────────────────────────────────┤ │
│ │ ┌─────────────┬─────────────────┐ │ │
│ │ │   CONTENT   │     ASIDE       │ | │
│ │ │   (70%)     │    (30%)        │ | │
│ │ │ (Conteúdo)  │  (Conversão)    │ | │
│ │ └─────────────┴─────────────────┘ | │
│ └───────────────────────────────────┘ │
│ </main>                               │
├───────────────────────────────────────┤
│              FOOTER                   │ ← Fora do <main>
└───────────────────────────────────────┘
```

### **Mobile (`sm` e menor: <768px)**

```
┌───────────────────────────────────────┐
│         HEADER (compacto)             │ ← Fora do <main>
├───────────────────────────────────────┤
│ <main>                                │
│ ┌───────────────────────────────────┐ │
│ │        HERO (full-width)          │ |
│ │      (quando aplicável)           │ │
│ ├───────────────────────────────────┤ │
│ │          CONTENT                  │ │
│ │        (100% width)               │ │
│ │                                   │ │
│ │ • Seções integradas:              │ │
│ │   - Newsletter contextual         │ │
│ │   - Compartilhamento social       │ │
│ │   - CTAs de conversão             │ │
│ ├───────────────────────────────────┤ │
│ │           ASIDE                   │ │
│ │      (empilhado abaixo)           │ │
│ │                                   │ │
│ │ • E-book contextual               │ │
│ │ • Quem é a Lets                   │ │
│ │ • Categorias                      │ │
│ └───────────────────────────────────┘ │
│ </main>                               │
├───────────────────────────────────────┤
│      FOOTER (coluna única)            │ ← Fora do <main>
└───────────────────────────────────────┘
```

**Responsivo**: Mobile-first com breakpoints Tailwind padrão: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)

---

## 🏠 Páginas Principais

### 1. **Home (`/`)**

**Objetivo**: Converter visitantes em compradores de e-books

**Layout**:

- **Hero**: E-book principal + headline impactante + CTA grande
- **Content (70% desktop)**:
  - E-books em destaque (3-4 máximo - Choice Overload)
  - Newsletter geral
  - Receitas populares (prova social)

**Mobile**: Hero full-width, Content e Aside em coluna única

### 2. **Receitas (`/receitas`)**

**Objetivo**: Engajar usuários e converter sutilmente

**Layout**:

- **Content (70% desktop)**:
  - Busca + filtros
  - Lista de receitas com scroll infinito
  - Banner de e-book a cada 6-8 receitas (Von Restorff)

**Mobile**: Content em coluna única, Aside empilhado abaixo

### 3. **Receita (`/receitas/:slug`)**

**Objetivo**: Entregar valor e converter no timing certo

#### **Receitas Completas (Padrão)**

- **Content (70% desktop)**:
  - Breadcrumb + título + galeria de imagens
  - **Ingredientes + Modo de preparo** (receita completa - valor principal)
  - **Compartilhamento social** (após consumo do valor)
  - **Newsletter contextual** (conversão após entregar valor)
  - **E-book recomendado** (conversão principal - featured variant)
  - **Receitas similares** (manter engajamento)

#### **Receitas Exclusivas (`mostrar_ebook` definido) ✅**

- **Content (70% desktop)**:
  - Breadcrumb + título + galeria de imagens
  - **Preview Limitado**: Apenas 2 parágrafos do modo de preparo
  - **Gradiente Visual**: Segundo parágrafo com fade-out para criar curiosidade
  - **Conversão Exclusiva**: E-book específico com texto persuasivo sobre exclusividade

**Estratégia de Conversão (Receitas Completas)**:

- **Timing 1**: Compartilhamento após entregar valor completo (receita lida)
- **Timing 2**: Newsletter no momento ideal (Peak-End Rule aplicado)
- **Timing 3**: E-book recomendado como conversão principal destacada
- **Timing 4**: Receitas similares para manter engajamento e navegação

**Estratégia de Conversão (Receitas Exclusivas)**:

- **Scarcity Principle**: Preview limitado cria sensação de exclusividade
- **Curiosity Gap**: Gradiente visual no texto gera necessidade de completude
- **Single CTA**: Foco total na conversão do e-book específico
- **Zero Distrações**: Remove todas as outras opções para maximizar conversão

**Psicologia da Ordem Implementada**:

1. **Valor Primeiro**: O usuário recebe o que veio buscar (receita completa)
2. **Reciprocidade**: Após receber valor, está predisposto a "retribuir" (compartilhar)
3. **Commitment**: Newsletter captura no momento de maior satisfação
4. **Conversão Principal**: E-book apresentado quando há maior confiança estabelecida
5. **Retenção**: Receitas similares mantêm o usuário no site (reduz bounce rate)

**Otimizações de Copy e UX**:

- **Título Aspiracional**: "Para você que ama cozinhar" (identidade + pertencimento)
- **Texto Conciso**: 12 palavras vs 25 palavras originais (52% mais eficiente)
- **Conexão Contextual**: Menciona nome da receita para personalização
- **Tom Sofisticado**: Linguagem elegante alinhada com posicionamento gourmet
- **Menos Pressure**: Sem perguntas diretas ou linguagem vendedora

**Mobile**: Content em coluna única, Aside empilhado abaixo com mesmo conteúdo

### 4. **Categorias (`/categorias`)**

**Objetivo**: Navegação eficiente por tipos de receita

**Layout**:

- **Content (100%)**:
  - Grid de categorias com contador de receitas
  - Banner central com e-book relacionado (Miller's Law - máximo 7 categorias visíveis)
- **Aside**: Não possui nesta página

**Mobile**: Grid responsivo, banner integrado naturalmente

### 5. **Categoria (`/categorias/:slug`)**

**Objetivo**: Listar receitas da categoria específica

**Layout**:

- **Hero**: Não possui (breadcrumb + título da categoria)
- **Content (70% desktop)**:
  - Lista de receitas da categoria
  - Filtros básicos (tempo, dificuldade)
  - Banner contextual a cada 8-10 receitas

**Mobile**: Content em coluna única, Aside empilhado abaixo

### 6. **E-books (`/ebooks`)**

**Objetivo**: Maximizar vendas com página comercial

**Layout**:

- **Hero**: Não possui (título comercial direto)
- **Content (70% desktop)**:
  - Grid comercial de e-books
  - Testemunhos de clientes
  - Newsletter específica para e-books

**Mobile**: Content em coluna única, Aside empilhado abaixo

### 7. **E-book (`/ebooks/:slug`)** ✅

**Objetivo**: Converter em compra com página de vendas completa

**Status**: ✅ **IMPLEMENTADO** - Seguindo todos os padrões do README.md

**Layout Otimizado**:

- **Hero Integrado**: Via Content.Section variant="hero" para espaçamento consistente
- **Content (70% desktop)**:
  - Breadcrumb navigation via Content.tsx
  - Hero com layout 2 colunas (info + imagem responsiva)
  - Benefícios detalhados (página_website)
  - CTA final com reforço visual (imagem + copy persuasivo)
- **Aside**: Via parallel route (@aside/ebooks/[slug]) com LayoutAside minimal

**Implementação Técnica Refinada**:

- **Content.tsx Padrão**: Breadcrumb + título + descrição integrados
- **Hero Componentizado**: EbookHero com aspect ratio natural preservado
- **Imagem Otimizada**: width/height props com h-auto para proporção natural
- **CTA Duplo**: Hero principal + CTA final com reforço visual estratégico
- **Structured Data**: Product schema completo para SEO

**Laws of UX Implementadas**:

- **Fitts's Law**: CTAs 44px+ touch-friendly, próximos ao conteúdo
- **Peak-End Rule**: Hero impactante + CTA final com reforço visual
- **Von Restorff Effect**: E-book destacado no hero + repetido no CTA final
- **Mere Exposure Effect**: Imagem repetida aumenta familiaridade e conversão
- **Aesthetic-Usability**: Layout limpo com imagens em aspect ratio natural
- **Cognitive Load**: Foco em uma ação (comprar), aside minimal

**Estratégia de Conversão Refinada**:

1. **Timing 1**: Hero com valor imediato (capa full-width mobile + descrição + preço + CTA)
2. **Timing 2**: Benefícios detalhados para convencimento (página_website em prose)
3. **Timing 3**: CTA final com reforço visual (imagem menor + copy + CTA) - **Peak-End Rule**

**Otimizações Visuais Implementadas**:

- **Imagem Responsiva**: w-full mobile, larguras fixas desktop (lg:w-96, xl:w-[420px], 2xl:w-[480px])
- **Aspect Ratio Natural**: width/height props com h-auto preserva proporções da imagem
- **CTA com Reforço**: Layout 2 colunas no CTA final (imagem + texto/CTA) aumenta conversão
- **Performance**: priority na imagem hero, formato medium quando disponível

**Mobile Optimization**:

- **Imagem Full-Width**: w-full no mobile para máximo impacto visual
- **Layout Responsivo**: Content via Content.tsx, Aside empilhado via parallel route
- **CTAs Touch-Friendly**: 44px+ altura, espaçamento adequado

### **📌 Aside Padrão (30% desktop)**

**Conteúdo comum para todas as páginas** (exceto onde especificado):

- **E-book em destaque**: Conversão principal (configurável via `featuredEbook`)
- **Quem é a Lets Cozinha**: Credibilidade e autoridade da marca (configurável via `whoIsLets`)
- **Categorias**: Navegação relacionada ao contexto (configurável via `categories`)
- **Newsletter personalizada**: Quando especificada (configurável via `newsletter`)

**Implementação Unificada**:

Todos os asides agora usam o componente `LayoutAside` configurável, permitindo:

- ✅ Ativar/desativar seções específicas por rota
- ✅ Newsletter personalizada quando necessário
- ✅ Manutenção centralizada em um único componente
- ✅ Consistência visual e comportamental

**Exceções**:

- **Receitas (`/receitas/:slug`)**: E-book como seção integrada no Content (não no Aside)
- **Categorias (`/categorias`)**: Não possui Aside
- **E-books (`/ebooks`)**: Newsletter específica para e-books, sem featured ebook (via `LayoutAside` configurável)
- **E-book (`/ebooks/:slug`)**: Aside minimal (20% width, apenas newsletter/contato)

---

## ⚡ Implementação Técnica

### Parallel Routes

```
app/
├── layout.tsx                 # Layout principal
├── page.tsx                   # Main content home
├── @hero/                     # Slot do hero
│   ├── default.tsx           # Sem hero (null)
│   ├── page.tsx              # Hero da home
│   └── ebooks/[slug]/page.tsx # Hero de vendas
├── @aside/                    # Slot do aside (UNIFICADO)
│   ├── default.tsx           # Fallback padrão (LayoutAside completo)
│   ├── page.tsx              # Aside padrão (LayoutAside completo)
│   └── ebooks/page.tsx       # Aside e-books (LayoutAside configurável)
└── receitas/
    └── [slug]/page.tsx       # Main da receita
```

### Componentes Base

> **Status**: ✅ = Implementado | ⏳ = Em desenvolvimento | ❌ = Pendente

#### Layout ✅

- **Container**: Wrapper com max-width 80rem (1280px) e padding responsivo
- **Content**: Wrapper inteligente com breadcrumb manual, título e descrição integrados
- **Content.Section**: Seções organizadas com variants: `default`, `hero`, `content`, `list`, `tight`, `loose`
- **Header**: Navegação principal com 5 itens
- **Footer**: Navegação secundária, conversão final e informações legais
- **LayoutAside**: Sidebar configurável unificada (30% desktop)

#### UI Components ✅

- **LinkButton**: CTAs padronizados com centralização perfeita (44px+)
- **Card**: Container flexível com 3 variants: `default`, `subtle`, `newsletter`
- **EmailSubscription**: Newsletter com acessibilidade completa e estados de loading
- **RecipeEmailSubscription**: Newsletter contextual com Card encapsulado

#### Content Components ✅

- **RecipeCard**: Card de receita com encapsulação Card e Fitts's Law
- **EbookCard**: Card de e-book com variants (default/featured/minimal)
- **RecipeImages**: Galeria otimizada para mobile com swipe navigation
- **RecipeShare**: Compartilhamento social com Card integrado
- **ExclusiveRecipePreview**: Preview limitado para receitas de e-book

---

## 📄 Páginas Complementares

- `/conheca-a-lets` - Sobre a autora (credibilidade)
- `/contato` - Suporte e confiança
- `/politica-de-privacidade` - Legal
- `/termos-de-uso` - Legal

---

## Lista de Tarefas - Implementação

### 🏗️ **Fase 1: Fundação (Componentes Base)** ✅

#### 1.0 Configuração do Tema ✅

- [x] **globals.css Theme Setup** - Variáveis CSS, cores, tipografia implementados
- [x] **Design Tokens** - Sistema completo funcionando
- [x] **Sistema de Cores de Texto** - Padronização completa

#### 1.1 Layout Principal ✅

- [x] **Container Component** - Wrapper responsivo
- [x] **Header Component** - Logo + navegação + busca + CTA
- [x] **Footer Component** - Links + newsletter + redes sociais
- [x] **Content Component** - Wrapper com breadcrumb + título + descrição
- [x] **Content.Section Component** - Seções organizadas
- [x] **LayoutAside Configurável** - Componente unificado para todos os asides

#### 1.2 Configuração Parallel Routes ✅

- [x] **Setup app/layout.tsx** - Layout principal com slots
- [x] **Criar @aside slot** - Estrutura para asides contextuais
- [x] **LayoutAside Unificado** - Todos os asides usam LayoutAside configurável
- [x] **default.tsx files** - Fallbacks implementados

### 🎨 **Fase 2: UI Components** ✅

#### 2.1 Componentes de Conversão ✅

- [x] **LinkButton Component** - CTAs padronizados com centralização perfeita
- [x] **EmailSubscription Component** - Newsletter com acessibilidade completa
- [x] **RecipeEmailSubscription Component** - Newsletter contextual
- [x] **Card Component** - Container flexível com variants

#### 2.2 Componentes de Conteúdo ✅

- [x] **RecipeCard Component** - Card com encapsulação e Fitts's Law
- [x] **EbookCard Component** - Card com variants e formatação de preço

#### 2.3 Componentes de Mídia ✅

- [x] **RecipeImages Component** - Galeria otimizada para mobile
- [x] **RecipeShare Component** - Compartilhamento social completo

### 📄 **Fase 3: Páginas Principais**

#### 3.1 Home Page ❌

- [ ] **app/page.tsx** - Content da home
- [ ] **app/@hero/page.tsx** - Hero com e-book principal

#### 3.2 Receitas ⏳

- [ ] **app/receitas/page.tsx** - Lista de receitas com busca
- [x] **app/receitas/[slug]/page.tsx** - Página individual com seções otimizadas

#### 3.3 Categorias ❌

- [ ] **app/categorias/page.tsx** - Grid de categorias
- [ ] **app/categorias/[slug]/page.tsx** - Receitas por categoria

#### 3.4 E-books ✅

- [x] **app/ebooks/page.tsx** - Catálogo comercial
- [x] **app/ebooks/@aside/page.tsx** - Aside configurável
- [x] **app/ebooks/[slug]/page.tsx** - Página de vendas completa
- [x] **app/ebooks/[slug]/@aside/page.tsx** - Aside minimal

### 🔧 **Fase 4: Funcionalidades** ❌

- [ ] **Search functionality** - Busca em tempo real
- [ ] **Category filters** - Filtros por categoria
- [ ] **Conversion tracking** - Tracking de CTAs
- [ ] **Newsletter integration** - Integração com email service

### 📱 **Fase 5: Responsividade** ⏳

- [x] **Mobile-first CSS** - Breakpoints Tailwind implementados
- [x] **Touch-friendly CTAs** - Botões grandes (44px+) implementados
- [ ] **Mobile navigation** - Menu hamburger
- [ ] **Mobile search** - Busca em modal

### 🧪 **Fase 6: Testes e Qualidade** ⏳

- [x] **Fitts's Law compliance** - CTAs grandes implementados
- [ ] **Hick's Law compliance** - Máximo 5 opções por decisão
- [ ] **Component testing** - Testes unitários
- [ ] **Performance testing** - Core Web Vitals

### 🚀 **Fase 7: Deploy e Monitoramento** ❌

- [ ] **Environment setup** - Configuração de ambientes
- [ ] **Build optimization** - Otimização de build
- [ ] **Staging deployment** - Deploy de teste
- [ ] **Production deployment** - Deploy de produção
