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
│ │ │ (Conteúdo)  │  (Conversão)    │ | │
│ │ └─────────────┴─────────────────┘ | │
│ └───────────────────────────────────┘ │
│ </main>                               │
├───────────────────────────────────────┤
│              FOOTER                   │ ← Fora do <main>
└───────────────────────────────────────┘
```

**Responsivo**: Mobile-first com breakpoints Tailwind padrão: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)

**Semântica HTML**: O `<main>` contém apenas o conteúdo principal da página para otimizar acessibilidade e SEO. Header e Footer ficam fora do `<main>` por serem elementos de navegação/informação global.

---

## 🏠 Páginas Principais

### 1. **Home (`/`)**

**Objetivo**: Converter visitantes em compradores de e-books

**Estrutura**:

- **Hero**: E-book principal + headline impactante + CTA grande
- **Content**: E-books em destaque (3-4) + newsletter + receitas populares
- **Aside**: Categorias + sobre a autora + redes sociais

### 2. **Receitas (`/receitas`)**

**Objetivo**: Engajar usuários e converter sutilmente

**Estrutura**:

- **Content**: Busca + filtros + lista com scroll infinito
- **Aside**: E-book contextual + newsletter + categorias
- **Conversão**: Banner de e-book a cada 6-8 receitas

### 3. **Receita (`/receitas/:slug`)**

**Objetivo**: Entregar valor e converter no timing certo

**Estrutura**:

- **Content**: Breadcrumb + receita completa + receitas similares
- **Aside**: E-book relacionado + newsletter + compartilhamento
- **Conversão**: Após usuário ver a receita completa

### 4. **Categorias (`/categorias`)**

**Objetivo**: Navegação eficiente por tipos de receita

**Estrutura**:

- **Content**: Grid de categorias + contador de receitas
- **Conversão**: Banner central com e-book relacionado

### 5. **Categoria (`/categorias/:slug`)**

**Objetivo**: Listar receitas da categoria específica

**Estrutura**:

- **Content**: Lista de receitas + filtros básicos
- **Conversão**: Banner contextual a cada 8-10 receitas

### 6. **E-books (`/ebooks`)**

**Objetivo**: Maximizar vendas com página comercial

**Estrutura**:

- **Content**: Grid comercial + testemunhos + newsletter específica
- **Aside**: Prova social + categorias + mais vendidos

### 7. **E-book (`/ebooks/:slug`)**

**Objetivo**: Converter em compra com página de vendas completa

**Estrutura**:

- **Hero**: Capa + título + preço + CTA principal
- **Content**: Benefícios + testemunhos + FAQ + CTA final
- **Aside**: Minimal (não distrair da venda)

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

#### Aside ❌

- **Responsabilidade**: Sidebar de conversão (30% desktop)
- **Conteúdo**: Newsletter + e-books contextuais + categorias
- **Comportamento**: Sticky behavior no scroll
- **Mobile**: Stack após Main content

### Estratégias de Conversão

#### Mobile-First

- CTAs grandes e touch-friendly (44px+)
- Scroll infinito em listas
- Filtros em modals
- Grid responsivo otimizado
- Galeria com swipe navigation
- Thumbnails touch-friendly (80x80px)

#### Contextual

- E-books relacionados ao conteúdo atual
- Newsletter contextual por página
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

### Estratégia de Layout por Página

#### Home

- **Hero**: E-book principal + headline + CTA
- **Content**: E-books + Newsletter + Receitas Populares
- **Aside**: Categorias + Autora + Redes sociais

#### /receitas

- **Hero**: Não possui (título direto)
- **Content**: Busca + Filtros + Lista de Receitas
- **Aside**: E-book destaque + Newsletter + Categorias

#### /receitas/:slug

- **Hero**: Não possui (breadcrumb + título)
- **Content**: Receita completa + Receitas similares
- **Aside**: E-book relacionado + Newsletter + Compartilhamento

#### /ebooks

- **Hero**: Não possui (título comercial direto)
- **Content**: Grid de e-books + Testemunhos
- **Aside**: Newsletter + Categorias + Prova social

#### /ebooks/:slug

- **Hero**: Página de vendas (capa + preço + CTA)
- **Content**: Benefícios + Testemunhos + FAQ + CTA final
- **Aside**: Minimizada (apenas newsletter e contato)

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

## 📋 Estrutura das Páginas

### Home (`/`)

E-book principal + e-books em destaque + newsletter + receitas populares + categorias

### Receitas (`/receitas`)

Busca + filtros + lista com scroll infinito + banners de conversão

### Receita (`/receitas/:slug`)

Breadcrumb + galeria de imagens + receita completa + e-book relacionado + receitas similares

### Categorias (`/categorias`)

Grid de categorias + banner central de e-book

### Categoria (`/categorias/:slug`)

Lista de receitas + filtros + banners contextuais

### E-books (`/ebooks`)

Grid comercial + testemunhos + newsletter específica

### E-book (`/ebooks/:slug`)

Hero de vendas + benefícios + testemunhos + FAQ + CTA final

---

## 📝 Lista de Tarefas - Implementação

### 🏗️ **Fase 1: Fundação (Componentes Base)**

#### 1.0 Configuração do Tema

- [x] **globals.css Theme Setup** - Variáveis CSS, cores, tipografia e base styles implementados ✅
- [x] **Design Tokens** - Sistema completo de espaçamento, cores e tipografia funcionando ✅
- [x] **Sistema de Cores de Texto** - Padronização completa das cores de texto do tema ✅

**Detalhes da Implementação:**

- **Tema Tailwind CSS v4** - Usando nova sintaxe `@theme` para definição de variáveis
- **7 Cores de Texto Essenciais** - Sistema enxuto com apenas cores realmente utilizadas
- **Substituição de Classes Hardcoded** - Todos os `text-gray-*`, `text-red-*`, etc. foram substituídos
- **Componentes Atualizados** - RecipeImages, Breadcrumbs, EmailSubscription, e páginas
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
- [ ] **Aside Component** - Sidebar de conversão

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

- [x] **LinkButton Component** - CTAs padronizados (44px+) ✅
- [x] **EmailSubscription Component** - Newsletter signup ✅
- [x] **RecipeEmailSubscription Component** - Newsletter contextual usando Card com background gradiente ✅
- [ ] **CookingCTA Component** - Calls-to-action culinários
- [x] **Card Component** - Container flexível com variants (usado em RecipeEmailSubscription e RecipeShare) ✅

#### 2.2 Componentes de Conteúdo

- [ ] **RecipeCard Component** - Card de receita para listas
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
- [ ] **app/receitas/@aside/page.tsx** - Aside com e-book contextual
- [ ] **app/receitas/[slug]/page.tsx** - Página individual da receita
- [ ] **app/receitas/[slug]/@aside/page.tsx** - Aside com conversão

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

- [ ] **Hick's Law compliance** - Máximo 5 opções por decisão
- [ ] **Miller's Law compliance** - Máximo 7 itens por grupo
- [ ] **Fitts's Law compliance** - CTAs grandes e próximos
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
