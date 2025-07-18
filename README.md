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

### 🎯 **Encapsulação de Compo**Padrão para Novos Componentes:\*\*

Se um componente sempre precisa de um Card específico, o Card deve ser encapsulado internamente no componente, não requerido externamente.

---

### 🎯 **Unificação dos Asides - Implementação Concluída** ✅

**Problema Anterior**: Múltiplos asides com código duplicado e manutenção fragmentada.

**Solução Implementada**: Componente `LayoutAside` configurável que unifica todos os asides do projeto.

#### **Arquitetura da Solução**

```tsx
interface LayoutAsideProps {
  sections?: {
    featuredEbook?: boolean; // E-book em destaque
    whoIsLets?: boolean; // Seção "Quem é a Lets"
    categories?: boolean; // Lista de categorias
    newsletter?: {
      // Newsletter personalizada
      title: string;
      description: string;
      formLayout?: 'row' | 'column';
      textAlignment?: 'left' | 'center';
    };
  };
}
```

#### **Configurações por Página**

- **Padrão** (`/@aside/page.tsx`): Todas as seções ativas
- **E-books** (`/@aside/ebooks/page.tsx`): Newsletter específica + credibilidade + categorias (sem featured ebook)
- **Fallback** (`/@aside/default.tsx`): Configuração padrão para rotas sem aside específico

#### **Benefícios Alcançados**

- ✅ **Código Unificado**: 80% redução de duplicação entre asides
- ✅ **Manutenção Centralizada**: Mudanças visuais em um único componente
- ✅ **Flexibilidade**: Cada rota pode configurar suas seções específicas
- ✅ **Consistência**: Comportamento idêntico em todas as páginas
- ✅ **Tipagem**: Interface TypeScript garante uso correto
- ✅ **Performance**: Componentes reutilizáveis otimizados

---

### 📊 **Ordem de Execução Recomendada**

Padrão Implementado\*\*

**Princípio**: Componentes devem encapsular sua própria apresentação visual, incluindo Cards quando necessário.

**Implementações Completas:**

#### LinkButton ✅

- **Centralização Perfeita**: Flex layout com items-center e justify-center para texto sempre centralizado
- **Touch-Friendly**: Compatible com min-height 44px+ quando aplicado externamente
- **Variants System**: Primary e secondary variants com hover states otimizados
- **Consistência**: Base sólida para todos os CTAs do projeto
- **Fitts's Law Ready**: Pronto para receber dimensões mínimas adequadas
- **External Links**: Suporte a target="\_blank" e rel="noopener noreferrer" para checkout seguro
- **Flexible Props**: Interface expandida para casos de uso diversos

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

#### LayoutAside ✅

- **JSDoc Completo**: Documentação detalhada com estratégias de UX e Laws aplicadas
- **Encapsulação**: Usa EbookCard variant minimal e Card components internamente
- **Fitts's Law**: CTAs touch-friendly (44px+) para melhor usabilidade
- **Cognitive Load**: Máximo 3 seções essenciais para não sobrecarregar
- **Conversion Strategy**: E-book no topo, credibilidade no meio, navegação no final
- **Laws of UX**: Miller's Law, Peak-End Rule e Von Restorff Effect implementados
- **Parallel Route**: Integrado com @aside slot para contextos específicos
- **Responsividade**: Layout adaptável (30% desktop, empilhado mobile)

#### ExclusiveRecipePreview ✅

- **JSDoc Completo**: Documentação detalhada com propósito e estratégias UX
- **Receitas Exclusivas**: Mostra preview limitado (2 parágrafos) para receitas de e-book
- **Gradiente Visual**: Efeito fade-out no segundo parágrafo para criar curiosidade
- **Conversão Estratégica**: E-book em destaque após preview limitado
- **Von Restorff Effect**: Design diferenciado com background gradiente e ícone de cadeado
- **Peak-End Rule**: Timing ideal para conversão após entregar valor parcial
- **Scarcity Principle**: Texto sobre exclusividade e receitas limitadas
- **Laws of UX**: Aesthetic-Usability com design atrativo e hierarquia visual clara
- **Personalização**: Texto contextual com nome da receita e quantidade dinâmica

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

**Layout Dinâmico por Tipo de Receita**:

#### **Receitas Completas (Padrão)**

- **Hero**: Não possui (breadcrumb + título direto)
- **Content (70% desktop)**:
  - Breadcrumb + título + galeria de imagens
  - **Ingredientes + Modo de preparo** (receita completa - valor principal)
  - **Compartilhamento social** (após consumo do valor)
  - **Newsletter contextual** (conversão após entregar valor)
  - **E-book recomendado** (conversão principal - featured variant)
  - **Receitas similares** (manter engajamento)

#### **Receitas Exclusivas (`mostrar_ebook` definido) ✅**

- **Hero**: Não possui (breadcrumb + título direto)
- **Content (70% desktop)**:
  - Breadcrumb + título + galeria de imagens
  - **Preview Limitado**: Apenas 2 parágrafos do modo de preparo
  - **Gradiente Visual**: Segundo parágrafo com fade-out para criar curiosidade
  - **Conversão Exclusiva**: E-book específico com texto persuasivo sobre exclusividade
  - **Seções Removidas**: Compartilhamento, newsletter, recomendações e similares

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

**Mobile**: Empilhado abaixo do Content em todas as páginas usando `LayoutAside`

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
├── @aside/                    # Slot do aside (UNIFICADO)
│   ├── default.tsx           # Fallback padrão (LayoutAside completo)
│   ├── page.tsx              # Aside padrão (LayoutAside completo)
│   └── ebooks/page.tsx       # Aside e-books (LayoutAside sem featured ebook)
└── receitas/
    └── [slug]/page.tsx       # Main da receita
```

**Status da Unificação**: ✅ **COMPLETO**

Todos os asides agora usam o componente `LayoutAside` configurável:

- **Configuração flexível**: Cada rota pode escolher suas seções
- **Manutenção centralizada**: Mudanças visuais em um só lugar
- **Consistência garantida**: Comportamento idêntico em todas as páginas
- **Código reduzido**: Eliminação de duplicação entre asides

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

#### LayoutAside (Aside Unificado) ✅

- **Responsabilidade**: Sidebar de conversão focada (30% desktop) - UNIFICADO
- **Arquitetura**: Componente configurável que substitui todos os asides específicos
- **Seções Configuráveis**:
  - `featuredEbook`: E-book contextual (conversão principal) - padrão: true
  - `whoIsLets`: Quem é a Lets Cozinha (credibilidade/autoridade) - padrão: true
  - `categories`: Navegação relacionada ao contexto - padrão: true
  - `newsletter`: Newsletter personalizada - padrão: null
- **Comportamento**: Sticky behavior no scroll, responsivo automático
- **Mobile**: Stack após Main content com mesma configuração
- **Filosofia**: Foco em conversão + credibilidade + navegação contextual
- **Implementação**: Parallel route @aside com LayoutAside configurável
- **Vantagens**: Manutenção centralizada, configuração flexível, código reutilizável

**Exemplos de Configuração**:

- **Padrão**: Todas as seções ativas (home, receitas, categorias)
- **E-books**: Newsletter específica + credibilidade + categorias (sem featured ebook)
- **Receitas individuais**: E-book integrado no content (aside com configuração padrão)

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
- [x] **Aside Component** - Sidebar focada: E-book + Quem é a Lets + Categorias ✅
- [x] **LayoutAside Configurável** - Componente unificado para todos os asides com seções configuráveis ✅

#### 1.2 Configuração Parallel Routes

- [x] **Setup app/layout.tsx** - Layout principal com slots hero e aside ✅
- [ ] **Criar @hero slot** - Estrutura de pastas para heroes contextuais
- [x] **Criar @aside slot** - Estrutura de pastas para asides contextuais ✅
- [x] **LayoutAside Unificado** - Todos os asides agora usam LayoutAside configurável ✅
- [x] **default.tsx files** - Fallbacks para slots não utilizados (aside default implementado) ✅
- [x] **Asides Unificados** - Todos os asides (@aside/page.tsx, @aside/ebooks/page.tsx, @aside/default.tsx) usam LayoutAside configurável ✅

#### 1.3 Componentes de Navegação

- [x] **Breadcrumb Component** - Navegação hierárquica com structured data e acessibilidade (integrado ao Content) ✅
- [x] **HeaderNav Component** - Menu principal (5 itens)
- [x] **HeaderSearch Component** - Busca expansível
- [x] **SocialNav Component** - Links redes sociais

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

- [x] **app/ebooks/page.tsx** - Catálogo comercial com Content wrapper, EbookCard components e EmailSubscription ✅
- [x] **app/ebooks/@aside/page.tsx** - Aside configurável sem featured ebook + newsletter específica para e-books ✅
- [x] **app/ebooks/[slug]/page.tsx** - Página de vendas completa com Content.tsx, hero integrado e CTA com reforço visual ✅
- [x] **app/ebooks/[slug]/@aside/page.tsx** - Aside minimal via parallel route com LayoutAside configurável ✅

**✅ Implementações Completas**:

- **Página Individual de E-book**: Layout otimizado seguindo todos os padrões do README.md
- **Hero Componentizado**: EbookHero com imagem responsiva e aspect ratio natural
- **CTA Duplo**: Hero principal + CTA final com reforço visual estratégico
- **Laws of UX**: Fitts's Law, Peak-End Rule, Von Restorff Effect e Mere Exposure Effect
- **Estratégia de Conversão**: Timing 1 (Hero) → Timing 2 (Benefícios) → Timing 3 (CTA final)
- **Mobile Optimization**: w-full em mobile, larguras específicas desktop
- **Performance**: priority na imagem hero, formato medium quando disponível
- **SEO**: Product schema completo e breadcrumb navigation integrado

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

#### LayoutAside Configurável ✅

- **JSDoc Completo**: Documentação detalhada com propósito, configurações e exemplos de uso
- **Interface Tipada**: `LayoutAsideProps` com configurações flexíveis para cada seção
- **Seções Configuráveis**:
  - `featuredEbook`: E-book em destaque (padrão: true)
  - `whoIsLets`: Seção "Quem é a Lets" (padrão: true)
  - `categories`: Lista de categorias (padrão: true)
  - `newsletter`: Newsletter personalizada (padrão: null)
- **Unificação Total**: Todos os asides agora usam um único componente base
- **Flexibilidade**: Cada rota pode escolher quais seções mostrar
- **Exemplo de Uso**: Aside de e-books sem featured ebook + newsletter específica

**Implementações Específicas:**

- **Aside Padrão**: Todas as seções ativas (featuredEbook + whoIsLets + categories)
- **Aside E-books**: Newsletter personalizada + whoIsLets + categories (sem featuredEbook para evitar competição)
- **Fallback Aside**: Comportamento padrão para rotas sem aside específico

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
