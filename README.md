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

### 🎯 **Encapsulação de Componentes - Padrão Implementado**

**Princípio**: Componentes devem encapsular sua própria apresentação visual, incluindo Cards quando necessário.

**Implementações Completas:**

#### LinkButton ✅

- **Centralização Perfeita**: Flex layout com items-center e justify-center para texto sempre centralizado
- **Touch-Friendly**: Compatible com min-height 44px+ quando aplicado externamente
- **Variants System**: Primary e secondary variants com hover states otimizados
- **Consistência**: Base sólida para todos os CTAs do projeto
- **Fitts's Law Ready**: Pronto para receber dimensões mínimas adequadas

#### EbookCard ✅

- **JSDoc Completo**: Documentação detalhada com propósito, features e exemplos de uso
- **3 Variants**: default (padrão), featured (destaque), minimal (compacto para sidebars)
- **Encapsulação**: Card component integrado internamente seguindo padrão do projeto
- **Fitts's Law**: CTA com min-height 44px+ para touch-friendly interaction
- **Formatação de Preço**: Suporte a preços em BRL com formatação brasileira
- **Acessibilidade**: ARIA labels descritivos e alt text para imagens
- **UX Otimizada**: Hover animations, aspect ratio de livro (5:7), Von Restorff Effect no variant featured
- **Laws of UX**: Aesthetic-Usability com design limpo e variants contextuais

#### RecipeCard ✅

- **JSDoc Completo**: Documentação detalhada com propósito, features e exemplos de uso
- **Encapsulação**: Card component integrado internamente seguindo padrão do projeto
- **Fitts's Law**: CTA com min-height 44px+ para touch-friendly interaction
- **Acessibilidade**: ARIA labels descritivos para melhor navegação
- **UX Otimizada**: Hover animations, responsive images e Von Restorff Effect no badge de categoria
- **Laws of UX**: Aesthetic-Usability com design limpo e espaçamento consistente

#### EmailSubscription ✅

- **JSDoc Completo**: Documentação detalhada com propósito, features e exemplos de uso
- **Acessibilidade**: ARIA labels, roles e live regions para feedback
- **Fitts's Law**: CTAs com min-height 44px+ e min-width adequado
- **Encapsulação**: Card integrado internamente seguindo padrão do projeto
- **UX Otimizada**: Estados de loading, feedback de sucesso/erro contextual

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

#### Exemplos de Componentização

- **Botões** → `LinkButton`, `CookingCTA`
- **Cards** → `RecipeCard`, `CategoryCard`, `EbookCard`
- **Formulários** → `EmailSubscription`, `RecipeEmailSubscription`
- **Navegação** → `HeaderNav`, `SocialNav`, `PagesNav`
- **Layout** → `Container`, `Main`, `Aside`

#### Benefícios

- **Consistência**: Design system uniforme
- **Manutenibilidade**: Alterações centralizadas
- **Testabilidade**: Componentes isolados
- **Performance**: Reutilização otimizada
- **Escalabilidade**: Fácil expansão do projeto

---

## 🎯 Objetivo Principal

**Vender e-books culinários** através de conteúdo gratuito e conversões estratégicas.

---

## 🧠 Laws of UX (Obrigatórias)

O projeto **DEVE** seguir estas leis de UX para maximizar conversões:

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
- **Law of Proximity**: Elementos relacionados próximos

### Experiência

- **Peak-End Rule**: Hero impactante + CTA final forte
- **Von Restorff Effect**: E-books destacados visualmente
- **Goal-Gradient**: Mostrar progresso em formulários
- **Aesthetic-Usability**: Design belo = percepção de usabilidade

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

**Semântica HTML**: O `<main>` contém apenas o conteúdo principal da página para otimizar acessibilidade e SEO. Header e Footer ficam fora do `<main>` por serem elementos de navegação/informação global.

### **Diferenças Chave Desktop vs Mobile:**

#### **Desktop (lg+):**

- ✅ **Layout em duas colunas**: Content (70%) + Aside (30%)
- ✅ **Aside sempre visível**: Conversão constante durante navegação
- ✅ **Header completo**: Navegação expandida, busca visível
- ✅ **Footer multi-coluna**: Informações organizadas em grid

#### **Mobile (<768px):**

- ✅ **Layout em coluna única**: Content primeiro, Aside empilhado
- ✅ **Seções integradas**: Newsletter e compartilhamento no Content
- ✅ **Header compacto**: Menu hamburger, busca em modal
- ✅ **Aside estratégico**: Apenas elementos essenciais (e-book, credibilidade)
- ✅ **Footer simplificado**: Coluna única, informações prioritárias

#### **Estratégia Mobile-First:**

- **Peak-End Rule**: Seções integradas garantem conversão no timing certo
- **Cognitive Load**: Aside reduzido a 3 elementos essenciais
- **Touch-Friendly**: CTAs grandes (44px+), espaçamento adequado
- **Performance**: Conteúdo principal carrega primeiro

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

- **Hero**: Não possui (título direto)
- **Content (70% desktop)**:
  - Busca + filtros
  - Lista de receitas com scroll infinito
  - Banner de e-book a cada 6-8 receitas (Von Restorff)

**Mobile**: Content em coluna única, Aside empilhado abaixo

### 3. **Receita (`/receitas/:slug`)**

**Objetivo**: Entregar valor e converter no timing certo

**Layout**:

- **Hero**: Não possui (breadcrumb + título direto)
- **Content (70% desktop)**:
  - Breadcrumb + título + galeria de imagens
  - **Ingredientes + Modo de preparo** (receita completa - valor principal)
  - **Compartilhamento social** (após consumo do valor)
  - **Newsletter contextual** (conversão após entregar valor)
  - **E-book recomendado** (conversão principal - featured variant)
  - **Receitas similares** (manter engajamento)

**Estratégia de Conversão**:

- **Timing 1**: Compartilhamento após entregar valor completo (receita lida)
- **Timing 2**: Newsletter no momento ideal (Peak-End Rule aplicado)
- **Timing 3**: E-book recomendado como conversão principal destacada
- **Timing 4**: Receitas similares para manter engajamento e navegação

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

- **Hero**: Não possui (título direto)
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

### 7. **E-book (`/ebooks/:slug`)**

**Objetivo**: Converter em compra com página de vendas completa

**Layout**:

- **Hero**: Página de vendas (capa + título + preço + CTA principal)
- **Content (80% desktop)**:
  - Benefícios do e-book
  - Testemunhos específicos
  - FAQ
  - CTA final forte (Peak-End Rule)

**Mobile**: Hero + Content em coluna única, Aside minimal empilhado

### **📌 Aside Padrão (30% desktop)**

**Conteúdo comum para todas as páginas** (exceto onde especificado):

- **Quem é a Lets Cozinha**: Credibilidade e autoridade da marca
- **Categorias**: Navegação relacionada ao contexto
- **Newsletter**: Inscrição geral (complementar às seções integradas)

**Exceções**:

- **Receitas (`/receitas/:slug`)**: E-book como seção integrada no Content (não no Aside)

- **Categorias (`/categorias`)**: Não possui Aside
- **E-book (`/ebooks/:slug`)**: Aside minimal (20% width, apenas newsletter/contato)

**Mobile**: Empilhado abaixo do Content em todas as páginas

---

## ⚡ Implementação Técnica

### Parallel Routes (Recomendado)

```
app/
├── layout.tsx                 # Layout principal
├── page.tsx                   # Main content home
├── @hero/                     # Slot do hero
│   ├── default.tsx           # Sem hero (null)
│   ├── page.tsx              # Hero da home
│   └── ebooks/[slug]/page.tsx # Hero de vendas
├── @aside/                    # Slot do aside
│   ├── default.tsx           # Aside padrão (LayoutAside)
│   ├── page.tsx              # Aside da home
│   └── ebooks/[slug]/page.tsx # Aside de vendas
└── receitas/
    └── [slug]/page.tsx       # Main da receita
```

**Vantagens dos Slots**:

- Separação de responsabilidades
- Performance otimizada (streaming separado)
- A/B testing mais fácil
- Heroes contextuais por página
- Asides contextuais por página

**Breadcrumbs**: Gerenciados pelo componente `Content` através de props manuais, não por parallel routes.

### Componentes Base

> **Status**: ✅ = Implementado | ⏳ = Em desenvolvimento | ❌ = Pendente

#### Header ✅

**Navegação**:

- Receitas (`/receitas`)
- Categorias (`/categorias`)
- E-books (`/ebooks`)
- Sobre (`/conheca-a-lets`)
- Contato (`/contato`)

#### Container ✅

Wrapper com max-width 80rem (1280px) e padding responsivo.

#### Content ✅

Wrapper inteligente para conteúdo das páginas com breadcrumb manual, título e descrição integrados.

**Compound Pattern**: `Content.Section` para seções organizadas.

**Exemplo de uso:**

```tsx
<Content
  title="Bolo de Chocolate"
  description="Uma receita deliciosa para toda família"
  breadcrumb={[
    { name: 'Home', href: '/' },
    { name: 'Receitas', href: '/receitas' },
    { name: 'Sobremesas', href: '/categorias/sobremesas' },
    { name: 'Bolo de Chocolate' },
  ]}
>
  <Content.Section variant="content">
    {/* Conteúdo da receita */}
  </Content.Section>
</Content>
```

#### Content.Section ✅

Seções organizadas com espaçamento consistente e variants: `default`, `hero`, `content`, `list`, `tight`, `loose`.

#### Footer ✅

Navegação secundária, conversão final e informações legais.

#### RecipeImages ✅

Galeria otimizada para mobile com swipe navigation, thumbnails interativas e scroll automático.

#### RecipeShare ✅

Compartilhamento social de receitas com Card integrado e acessibilidade completa. Suporta Facebook, WhatsApp, Twitter, Pinterest + cópia de link.

#### Card ✅

Container flexível com 3 variants: `default`, `subtle`, `newsletter`. Usado internamente em componentes específicos.

#### Aside ⏳

- **Responsabilidade**: Sidebar de conversão focada (30% desktop)
- **Conteúdo Essencial**:
  - E-book contextual (conversão principal)
  - Quem é a Lets Cozinha (credibilidade/autoridade)
  - Categorias (navegação relacionada)
- **Comportamento**: Sticky behavior no scroll
- **Mobile**: Stack após Main content com mesmo conteúdo
- **Filosofia**: Foco em conversão + credibilidade + navegação contextual

### Estratégias de Conversão

#### Seções Integradas vs Aside

**Aside (Sidebar)**: Elementos permanentes e estratégicos

- E-book contextual (conversão principal)
- Quem é a Lets Cozinha (credibilidade/autoridade)
- Categorias (navegação relacionada)

**Seções no Content**: Elementos de timing e contexto

- Newsletter: integrada após entregar valor (ex: após ingredientes)
- Compartilhamento: integrada após consumo completo (ex: após modo de preparo)
- CTAs contextuais: no momento certo do flow de leitura

**Vantagens dessa Separação:**

- **Peak-End Rule**: Newsletter/compartilhamento no timing ideal
- **Cognitive Load**: Aside focado em 3 elementos essenciais
- **Proximity Law**: Conversão próxima ao conteúdo relevante
- **Mobile-First**: Seções fluem naturalmente em qualquer dispositivo

#### Mobile-First

- CTAs grandes e touch-friendly (44px+)
- Scroll infinito em listas
- Filtros em modals
- Grid responsivo otimizado
- Galeria com swipe navigation
- Thumbnails touch-friendly (80x80px)

#### Contextual

- E-books relacionados ao conteúdo atual
- Newsletter contextual integrada nas seções do conteúdo principal
- Compartilhamento social integrado após consumo do valor
- Banners integrados naturalmente

#### Timing

- Conversão após entregar valor
- Hero impactante no início
- CTA final forte (Peak-End Rule)

#### Prova Social

- Receitas populares (analytics)
- Testemunhos de clientes
- Números de vendas
- Credibilidade da autora

---

## ✅ Aplicação Prática das Laws of UX

- **Hick's Law** → Menu com máximo 5 itens principais + navegação simples
- **Miller's Law** → E-books agrupados de 3-4 por seção
- **Fitts's Law** → CTAs grandes (44px+) próximos ao conteúdo
- **Jakob's Law** → Busca no header, logo top-left, padrões familiares
- **Choice Overload** → Máximo 3-4 e-books em destaque na home
- **Chunking** → Receitas por categoria, ingredientes listados
- **Serial Position** → E-book principal primeiro, CTA final último
- **Cognitive Load** → Uma ação principal por página
- **Peak-End Rule** → Hero impactante + CTA final forte
- **Von Restorff** → E-books destacados com cores/badges

---

## 🎨 Layout e Componentes Detalhados

### Comportamento Responsivo

**Desktop (`lg`: 1024px+)**:

- Header fixo no topo
- Hero full-width (quando aplicável)
- Main (70%) + Aside (30%) em duas colunas
- Footer com múltiplas colunas

**Tablet (`md`: 768px - 1023px)**:

- Header fixo no topo
- Hero full-width (quando aplicável)
- Main (100%) + Aside abaixo em coluna única
- Footer com 2 colunas

**Mobile (`sm` e menor: <768px)**:

- Header compacto fixo
- Hero full-width (quando aplicável)
- Main (100%) + Aside em coluna única
- Footer em coluna única

**Breakpoints Tailwind padrão**:

- `sm`: 640px | `md`: 768px | `lg`: 1024px | `xl`: 1280px | `2xl`: 1536px

### Considerações Técnicas

#### Componentização (Obrigatório)

- **Blocos reutilizáveis** - SEMPRE componentizar elementos que aparecem em múltiplos locais
- **Responsabilidade única** - Um componente, uma função específica
- **Props tipadas** - TypeScript interfaces obrigatórias
- **JSDoc completo** - Documentação de propósito, props e exemplos de uso
- **Composição sobre duplicação** - Reutilizar componentes existentes antes de criar novos

#### CSS/Styling

- **Tema centralizado** - Todos os estilos devem vir do tema definido em `globals.css`
- **Classes nativas do Tailwind** - Componentes devem usar apenas classes padrão do Tailwind CSS
- **Cores de texto padronizadas** - OBRIGATÓRIO usar apenas cores do tema
- **Mobile-first approach** - CSS responsivo partindo do mobile
- **Design tokens** - Cores, tipografia e espaçamentos padronizados no tema

**Sistema de Cores de Texto:**

- `text-text-dark` (principal), `text-text-light` (secundário)
- `text-text-strong` (enfático), `text-text-muted` (auxiliar)
- `text-text-success`, `text-text-error`, `text-text-warning` (feedback)

#### Performance & Acessibilidade

- Lazy loading, componentes otimizados, imagens responsivas
- Navegação por teclado, skip links, ARIA labels, contraste adequado

---

## 📄 Páginas Complementares

- `/conheca-a-lets` - Sobre a autora (credibilidade)
- `/contato` - Suporte e confiança
- `/politica-de-privacidade` - Legal
- `/termos-de-uso` - Legal

---

## Lista de Tarefas - Implementação

### 🏗️ **Fase 1: Fundação (Componentes Base)**

#### 1.0 Configuração do Tema

- [x] **globals.css Theme Setup** - Variáveis CSS, cores, tipografia e base styles implementados ✅
- [x] **Design Tokens** - Sistema completo de espaçamento, cores e tipografia funcionando ✅
- [x] **Sistema de Cores de Texto** - Padronização completa das cores de texto do tema ✅

**Detalhes da Implementação:**

- **Tema Tailwind CSS v4** - Usando nova sintaxe `@theme` para definição de variáveis
- **7 Cores de Texto Essenciais** - Sistema enxuto com apenas cores realmente utilizadas
- **Substituição de Classes Hardcoded** - Todos os `text-gray-*`, `text-red-*`, etc. foram substituídos
- **Componentes Atualizados** - RecipeImages, Breadcrumbs, EmailSubscription (com melhorias UX/acessibilidade), RecipeCard (com Card encapsulado), LinkButton (com centralização perfeita), e páginas
- **Regra Obrigatória** - NUNCA usar cores hardcoded como `text-gray-500`, sempre usar cores do tema

**Cores Implementadas:**

- `text-text-dark` (principal), `text-text-light` (secundário)
- `text-text-strong` (enfático), `text-text-muted` (auxiliar)
- `text-text-success`, `text-text-error`, `text-text-warning` (feedback)

#### 1.1 Layout Principal

- [x] **Container Component** - Wrapper com max-width 1200px e padding responsivo
- [x] **Header Component** - Logo + navegação + busca + CTA
- [x] **Footer Component** - Links + newsletter + redes sociais + copyright
- [x] **Content Component** - Wrapper com breadcrumb manual + título + descrição
- [x] **Content.Section Component** - Seções organizadas com espaçamento consistente
- [ ] **Aside Component** - Sidebar focada: E-book + Quem é a Lets + Categorias

#### 1.2 Configuração Parallel Routes

- [ ] **Setup app/layout.tsx** - Layout principal com slots hero e aside
- [ ] **Criar @hero slot** - Estrutura de pastas para heroes contextuais
- [ ] **Criar @aside slot** - Estrutura de pastas para asides contextuais
- [ ] **default.tsx files** - Fallbacks para slots não utilizados

#### 1.3 Componentes de Navegação

- [x] **Breadcrumb Component** - Navegação hierárquica com structured data e acessibilidade (integrado ao Content) ✅
- [ ] **HeaderNav Component** - Menu principal (5 itens)
- [ ] **HeaderSearch Component** - Busca expansível
- [ ] **SocialNav Component** - Links redes sociais

### 🎨 **Fase 2: UI Components**

#### 2.1 Componentes de Conversão

- [x] **LinkButton Component** - CTAs padronizados (44px+) com centralização perfeita de texto ✅
- [x] **EmailSubscription Component** - Newsletter signup com JSDoc completo, acessibilidade e Fitts's Law (44px+ CTAs) ✅
- [x] **RecipeEmailSubscription Component** - Newsletter contextual usando Card com background gradiente ✅
- [ ] **CookingCTA Component** - Calls-to-action culinários
- [x] **Card Component** - Container flexível com variants (usado em RecipeEmailSubscription e RecipeShare) ✅

#### 2.2 Componentes de Conteúdo

- [x] **RecipeCard Component** - Card de receita com encapsulação Card, JSDoc completo e Fitts's Law (44px+ CTAs) ✅
- [x] **EbookCard Component** - Card de e-book com variants (default/featured/minimal), formatação de preço e encapsulação Card ✅
- [ ] **RecipesList Component** - Grid responsivo de receitas
- [ ] **EbooksList Component** - Grid comercial de e-books
- [ ] **CategoriesList Component** - Grid de categorias
- [ ] **CategoryTag Component** - Tags de categoria

#### 2.3 Componentes de Mídia

- [x] **RecipeImages Component** - Galeria otimizada para mobile com swipe/touch navigation ✅
- [x] **RecipeShare Component** - Compartilhamento social com Card integrado e acessibilidade completa ✅
- [ ] **RecipeInstagramLinks Component** - Links Instagram

#### 2.4 Componentes Utilitários

- [ ] **Loading Component** - Estados de loading
- [ ] **Pagination Component** - Paginação de listas
- [ ] **Search Component** - Busca com filtros
- [ ] **Markdown Component** - Renderização de conteúdo

### 📄 **Fase 3: Páginas Principais**

#### 3.1 Home Page

- [ ] **app/page.tsx** - Content da home
- [ ] **app/@hero/page.tsx** - Hero com e-book principal
- [ ] **app/@aside/page.tsx** - Aside com categorias + autora
- [ ] **Integração completa** - Testar layout responsivo

#### 3.2 Receitas

- [ ] **app/receitas/page.tsx** - Lista de receitas com busca
- [ ] **app/receitas/@aside/page.tsx** - Aside com e-book contextual + Quem é a Lets + Categorias
- [x] **app/receitas/[slug]/page.tsx** - Página individual da receita com seções integradas na ordem ideal (Receita → Compartilhamento → Newsletter → E-book → Similares) ✅
- [ ] **app/receitas/[slug]/@aside/page.tsx** - Aside com e-book relacionado + Quem é a Lets + Categorias

**✅ Melhorias Implementadas na Página de Receitas**:

- **Ordem Otimizada**: Reorganizada seguindo psicologia do usuário e melhores práticas de conversão
- **E-book Destacado**: Variant `featured` com título de seção para maior conversão
- **Timing Perfeito**: Compartilhamento → Newsletter → E-book → Similares
- **UX Laws**: Peak-End Rule, Reciprocidade e Commitment aplicados
- **Copy Otimizado**: Título "Para você que ama cozinhar" (aspiracional e inclusivo)
- **Texto Conciso**: Apresentação do e-book resumida para 12 palavras (52% redução)
- **Conexão Contextual**: Texto liga diretamente a receita atual ao e-book recomendado

#### 3.3 Categorias

- [ ] **app/categorias/page.tsx** - Grid de categorias
- [ ] **app/categorias/[slug]/page.tsx** - Receitas por categoria
- [ ] **Banner de conversão** - E-book contextual por categoria

#### 3.4 E-books

- [ ] **app/ebooks/page.tsx** - Catálogo comercial
- [ ] **app/ebooks/[slug]/page.tsx** - Página de vendas
- [ ] **app/ebooks/[slug]/@hero/page.tsx** - Hero de vendas
- [ ] **app/ebooks/[slug]/@aside/page.tsx** - Aside minimal

### 🔧 **Fase 4: Funcionalidades**

#### 4.1 Busca e Filtros

- [ ] **Search functionality** - Busca em tempo real
- [ ] **Category filters** - Filtros por categoria
- [ ] **Advanced filters** - Ordenação e filtros avançados
- [ ] **Search results** - Página de resultados

#### 4.2 Conversão e Analytics

- [ ] **Conversion tracking** - Tracking de CTAs
- [ ] **Newsletter integration** - Integração com email service
- [ ] **Social proof** - Receitas populares (analytics)
- [ ] **A/B testing setup** - Testes de conversão

#### 4.3 Performance

- [ ] **Image optimization** - Next.js Image component
- [ ] **Lazy loading** - Loading otimizado
- [ ] **SEO optimization** - Meta tags e structured data
- [ ] **Performance audit** - Lighthouse optimization

### 📱 **Fase 5: Responsividade**

#### 5.1 Mobile Optimization

- [ ] **Mobile-first CSS** - Breakpoints Tailwind padrão (`sm`, `md`, `lg`, `xl`, `2xl`)
- [ ] **Touch-friendly CTAs** - Botões grandes (44px+)
- [ ] **Mobile navigation** - Menu hamburger
- [ ] **Mobile search** - Busca em modal

#### 5.2 Tablet Optimization

- [ ] **Tablet layouts** - Layouts intermediários
- [ ] **Grid adjustments** - Ajustes de grid responsivo
- [ ] **Touch interactions** - Otimização para touch

### 🧪 **Fase 6: Testes e Qualidade**

#### 6.1 Testes de UX

- [x] **Fitts's Law compliance** - CTAs grandes e próximos (implementado em EmailSubscription, RecipeCard e LinkButton) ✅
- [ ] **Hick's Law compliance** - Máximo 5 opções por decisão
- [ ] **Miller's Law compliance** - Máximo 7 itens por grupo
- [ ] **Cognitive Load test** - Uma ação principal por página

#### 6.2 Testes Técnicos

- [ ] **Component testing** - Testes unitários
- [ ] **Integration testing** - Testes de integração
- [ ] **Performance testing** - Core Web Vitals
- [ ] **Accessibility testing** - A11y compliance

### 🚀 **Fase 7: Deploy e Monitoramento**

#### 7.1 Preparação para Deploy

- [ ] **Environment setup** - Configuração de ambientes
- [ ] **Build optimization** - Otimização de build
- [ ] **Error boundaries** - Tratamento de erros
- [ ] **Monitoring setup** - Analytics e monitoramento

#### 7.2 Launch

- [ ] **Staging deployment** - Deploy de teste
- [ ] **Production deployment** - Deploy de produção
- [ ] **Post-launch monitoring** - Monitoramento pós-launch
- [ ] **Conversion optimization** - Otimização baseada em dados

---

### 🎯 **Encapsulação de Componentes - Padrão Implementado**

**Princípio**: Componentes devem encapsular sua própria apresentação visual, incluindo Cards quando necessário.

**Implementações Completas:**

#### EmailSubscription ✅

- **JSDoc Completo**: Documentação detalhada com propósito, features e exemplos de uso
- **Acessibilidade**: ARIA labels, roles e live regions para feedback
- **Fitts's Law**: CTAs com min-height 44px+ e min-width adequado
- **Encapsulação**: Card integrado internalmente seguindo padrão do projeto
- **UX Otimizada**: Estados de loading, feedback de sucesso/erro contextual

#### RecipeEmailSubscription ✅

- **Antes**: `<Card variant="newsletter"><RecipeEmailSubscription /></Card>`
- **Depois**: `<RecipeEmailSubscription />` (Card encapsulado internamente)
- **Benefício**: Página não precisa saber sobre implementação visual do componente

#### RecipeShare ✅

- **Antes**: `<Card variant="subtle"><RecipeShare recipe={recipe} /></Card>`
- **Depois**: `<RecipeShare recipe={recipe} />` (Card encapsulado internamente)
- **Benefício**: Componente auto-contido com responsabilidade visual própria

**Vantagens do Padrão:**

- **Single Responsibility**: Cada componente é responsável por sua própria apresentação
- **Encapsulação**: Detalhes de implementação não vazam para componentes pais
- **Manutenibilidade**: Mudanças visuais ficam centralizadas no próprio componente
- **Reutilização**: Componentes podem ser usados em qualquer contexto sem setup adicional
- **Consistência**: Garantia de que o componente sempre terá a apresentação correta

**Padrão para Novos Componentes:**

Se um componente sempre precisa de um Card específico, o Card deve ser encapsulado internamente no componente, não requerido externamente.

---

### 📊 **Ordem de Execução Recomendada**

**Sequência lógica de desenvolvimento:**

1. **Fundação primeiro** - Componentes base são pré-requisitos
2. **UI Components** - Building blocks para as páginas
3. **Páginas por complexidade** - Home → Receitas → Categorias → E-books
4. **Funcionalidades incrementais** - Adicionar features conforme necessário
5. **Otimização contínua** - Responsividade e performance ao longo do desenvolvimento
6. **Testes e deploy** - Validação final

**Dependências críticas:**

- Container, Header, Footer devem ser criados antes das páginas
- Parallel Routes setup necessário antes dos heroes contextuais
- RecipeCard necessário antes de RecipesList
- Layout base necessário antes de qualquer página
