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

**Conteúdo**:

- Logo Lets Cozinha (link home)
- Menu principal (5 itens max)
- Busca rápida (expansível)
- CTA de e-book destacado

**Navegação**:

- Receitas (`/receitas`)
- Categorias (`/categorias`)
- E-books (`/ebooks`)
- Sobre (`/conheca-a-lets`)
- Contato (`/contato`)

#### Container ✅

- Max-width: 80rem (1280px)
- Padding: 1.25rem (20px) na horizontal
- Margin: 0 auto

#### Content ✅

- **Tag semântica**: `<div>` com área de conteúdo principal (70% desktop)
- **Responsabilidade**: Wrapper inteligente para conteúdo das páginas
- **Funcionalidades integradas**: Breadcrumb manual + Título + Descrição
- **Compound Pattern**: `Content.Section` para seções organizadas
- **Props**: `title`, `description`, `breadcrumb`, `children`, `className`

**Funcionalidades do Content:**

- **Breadcrumb manual** - Array de objetos com `label` e `href` opcional
- **Header inteligente** - Props `title` e `description` geram header padronizado
- **Layout responsivo** - 70% desktop, 100% mobile com stack vertical
- **Espaçamento consistente** - Sistema de padding/margin otimizado
- **SEO otimizado** - Structured data para breadcrumbs quando fornecidos
- **A11y compliant** - Navegação por teclado e screen readers

**Breadcrumb Manual:**

O componente `Content` aceita um array de breadcrumbs que você define manualmente:

**Estrutura do Breadcrumb:**

```tsx
interface BreadcrumbItem {
  name: string; // Texto exibido no breadcrumb
  href?: string; // URL (opcional para página atual)
  url?: string; // Alternativa para href
  current?: boolean; // Marca item atual (opcional)
}

// Exemplo de breadcrumb para uma receita:
const breadcrumb = [
  { name: 'Home', href: '/' },
  { name: 'Receitas', href: '/receitas' },
  { name: 'Sobremesas', href: '/categorias/sobremesas' },
  { name: 'Bolo de Chocolate' }, // Página atual (sem href)
];
```

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

**Interface do Content:**

```tsx
interface BreadcrumbItem {
  name: string; // Texto exibido no breadcrumb
  href?: string; // URL (opcional para página atual)
  url?: string; // Alternativa para href
  current?: boolean; // Marca item atual (opcional)
}

interface ContentProps {
  title: string;
  description?: string;
  breadcrumb?: BreadcrumbItem[]; // Array manual de breadcrumbs
  children: React.ReactNode;
  className?: string;
}
```

#### Content.Section ✅

- **Tag semântica**: `<section>` para estrutura clara
- **Variants**: `default` (py-lg), `hero` (py-xl), `content` (py-md), `list` (py-sm)
- **Auto-spacing**: Espaçamento otimizado entre seções
- **UX Laws**: Implementa Chunking, Cognitive Load, Law of Proximity

#### Content/Aside Grid ⏳

- **Desktop**: 70% Content + 30% Aside
- **Mobile**: Stack vertical (Aside após Content)

#### Footer ✅

- **Tag semântica**: `<footer>` com `role="contentinfo"`
- **Responsabilidade**: Navegação secundária, conversão final e informações legais
- **Layout**: 4 colunas no desktop, stack vertical no mobile
- **Seções**: Sobre + Newsletter, Receitas, Institucional, Redes Sociais

**Conteúdo**:

- **Principal**: Descrição da marca + Newsletter CTA destacado
- **Navegação**: Links para categorias, receitas, e-books
- **Institucional**: Sobre, contato, políticas legais
- **Social**: Instagram, Facebook, Pinterest, RSS
- **Copyright**: Ano atual + direitos reservados

**UX Laws**:

- **Peak-End Rule**: Última impressão com newsletter e redes sociais
- **Miller's Rule**: Máximo 7 links por seção
- **Von Restorff Effect**: Newsletter CTA visualmente destacado
- **Jakob's Law**: Layout familiar de footer web

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

### **Hick's Law** → Menu com máximo 5 itens principais

### **Miller's Law** → E-books agrupados de 3-4 por seção

### **Fitts's Law** → CTAs grandes (44px+) próximos ao conteúdo

### **Jakob's Law** → Busca no header, logo top-left, padrões familiares

### **Choice Overload** → Máximo 3-4 e-books em destaque na home

### **Chunking** → Receitas por categoria, ingredientes listados

### **Serial Position** → E-book principal primeiro, CTA final último

### **Cognitive Load** → Uma ação principal por página

### **Peak-End Rule** → Hero impactante + CTA final forte

### **Von Restorff** → E-books destacados com cores/badges

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
- **Mobile-first approach** - CSS responsivo partindo do mobile
- **Flexbox/CSS Grid** para layouts estruturais
- **Breakpoints padrão do Tailwind** - Usar os breakpoints nativos: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px)
- **Sistema de espaçamento consistente** - Usar classes padrão do Tailwind (p-4, px-5, etc.)
- **Design tokens** - Cores, tipografia e espaçamentos padronizados no tema

#### Performance

- Lazy loading de conteúdo do Aside
- Componentes otimizados
- Imagens responsivas
- Fonts otimizadas

#### Acessibilidade

- Navegação por teclado
- Skip links
- ARIA labels
- Contraste adequado
- Estrutura semântica HTML

---

## 📄 Páginas Complementares

- `/conheca-a-lets` - Sobre a autora (credibilidade)
- `/contato` - Suporte e confiança
- `/politica-de-privacidade` - Legal
- `/termos-de-uso` - Legal

---

## 📋 Estrutura Detalhada das Páginas

### `/` - Home

**Objetivo**: Converter visitantes em compradores de e-books

**Estrutura completa**:

1. **Hero Section** - E-book principal + headline impactante + CTA grande
2. **E-books em Destaque** - 3-4 e-books com preços e benefícios claros
3. **Newsletter** - Captura de e-mail com oferta irresistível
4. **Conheça a Autora** - Credibilidade + link para `/conheca-a-lets`
5. **Receitas Populares** - Social proof + conteúdo gratuito de qualidade

### `/receitas` - Busca de Receitas

**Objetivo**: Engajar usuários e converter sutilmente

**Estrutura completa**:

1. **Cabeçalho** - Título + descrição (sem hero desnecessário)
2. **Busca + Filtros** - Input com busca em tempo real + tags de categorias
3. **Lista de Receitas** - Grid responsivo + scroll infinito
4. **Banner de Conversão** - A cada 6-8 receitas, inserir e-book relacionado

### `/receitas/:slug` - Página da Receita

**Objetivo**: Entregar valor e converter no momento certo

**Estrutura completa**:

1. **Breadcrumb** - Home > Receitas > [Categoria] > Receita
2. **Cabeçalho** - Título + descrição + categorias + link Instagram
3. **Imagens** - Galeria otimizada para mobile
4. **Receita** - Ingredientes + preparo + tempo/rendimento
5. **E-book Relacionado** - Contextual após o usuário ver o valor
6. **Newsletter** - "Receba mais receitas como esta"
7. **Receitas Similares** - 4-6 sugestões da mesma categoria

### `/categorias` - Listagem de Categorias

**Objetivo**: Facilitar navegação por tipo de receita

**Estrutura completa**:

1. **Breadcrumb** - Home > Categorias
2. **Cabeçalho** - Título direto + descrição breve
3. **Grid de Categorias** - Cards com imagem + nome + contador + preview
4. **Banner Central** - E-book destacado no meio da página
5. **Ordenação** - Por popularidade, quantidade ou alfabética

### `/categorias/:slug` - Página da Categoria

**Objetivo**: Mostrar receitas da categoria específica

**Estrutura completa**:

1. **Breadcrumb** - Home > Categorias > [Nome]
2. **Cabeçalho** - Nome da categoria + contador de receitas
3. **Filtros** - Ordenação por data, popularidade + filtros básicos
4. **Lista de Receitas** - Layout consistente com `/receitas`
5. **Banner Contextual** - E-book específico da categoria a cada 8-10 receitas

### `/ebooks` - Catálogo de E-books

**Objetivo**: Maximizar vendas com página comercial otimizada

**Estrutura completa**:

1. **Breadcrumb** - Home > E-books
2. **Cabeçalho Comercial** - Título + valor dos e-books + contador
3. **Filtros** - Por preço, categoria, mais vendidos
4. **Grid de E-books** - Capas destacadas + preços + CTAs diretos
5. **Prova Social** - Testemunhos + estatísticas de vendas
6. **Newsletter Específica** - Novos lançamentos + ofertas exclusivas

### `/ebooks/:slug` - Página de Vendas do E-book

**Objetivo**: Converter visitante em comprador com página de vendas completa

**Estrutura completa**:

1. **Breadcrumb** - Home > E-books > [Nome]
2. **Hero de Vendas** - Capa + título + preço + CTA principal
3. **Benefícios** - Lista clara do que o cliente vai receber
4. **Prova Social** - Depoimentos específicos + números de vendas
5. **Sobre a Autora** - Credibilidade + expertise
6. **FAQ** - Removes objeções comuns de compra
7. **CTA Final** - Botão repetido + garantias/bônus

---

_Design fundamentado em UX para maximizar conversões e usabilidade._

---

## 📝 Lista de Tarefas - Implementação

### 🏗️ **Fase 1: Fundação (Componentes Base)**

#### 1.0 Configuração do Tema

- [ ] **globals.css Theme Setup** - Definir variáveis CSS, cores, tipografia
- [ ] **Design Tokens** - Sistema de espaçamento, cores primárias/secundárias

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

- [ ] **LinkButton Component** - CTAs padronizados (44px+)
- [ ] **EmailSubscription Component** - Newsletter signup
- [ ] **RecipeEmailSubscription Component** - Newsletter contextual
- [ ] **CookingCTA Component** - Calls-to-action culinários

#### 2.2 Componentes de Conteúdo

- [ ] **RecipeCard Component** - Card de receita para listas
- [ ] **RecipesList Component** - Grid responsivo de receitas
- [ ] **EbooksList Component** - Grid comercial de e-books
- [ ] **CategoriesList Component** - Grid de categorias
- [ ] **CategoryTag Component** - Tags de categoria

#### 2.3 Componentes de Mídia

- [ ] **RecipeImages Component** - Galeria otimizada
- [ ] **RecipeShare Component** - Compartilhamento social
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
