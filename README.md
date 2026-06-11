# Lets Cozinha

![Lets Cozinha](./public/logo-texto.png)

Site de receitas culinárias ([letscozinha.com.br](https://www.letscozinha.com.br))
construído com Next.js. O conteúdo gratuito (receitas e categorias) atrai
visitantes e os converte em compradores de e-books.

> 🤖 **Agentes de IA**: leia as regras de desenvolvimento e documentação em
> [CLAUDE.md](./CLAUDE.md).

---

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 20+
- [pnpm](https://pnpm.io/)

### Instalação e Desenvolvimento

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

### Scripts

| Script              | Descrição                                      |
| ------------------- | ---------------------------------------------- |
| `pnpm dev`          | Servidor de desenvolvimento                    |
| `pnpm build`        | Build de produção                              |
| `pnpm start`        | Servidor de produção                           |
| `pnpm lint`         | Lint                                           |
| `pnpm test`         | Testes unitários (jest, `tests/unit`)          |
| `pnpm analyze`      | Build com análise de bundle                    |
| `pnpm index-now`    | Submete URLs ao IndexNow                       |
| `pnpm print-recipe` | Imprime uma receita do CMS no terminal         |

### Variáveis de Ambiente

| Variável              | Descrição                                            |
| --------------------- | ---------------------------------------------------- |
| `CMS_URL`             | URL do CMS (Strapi)                                  |
| `CMS_TOKEN`           | Token de API do CMS                                  |
| `MEILISEARCH_HOST`    | Host do Meilisearch (busca de receitas e e-books)    |
| `MEILISEARCH_API_KEY` | Chave de API do Meilisearch                          |
| `LETS_COZINHA_API_KEY`| Chave para rotas internas de API (ex.: revalidação)  |
| `GA4_PROPERTY_ID`     | Propriedade do Google Analytics 4                    |
| `GOOGLE_SERVICE_KEY`  | Credencial de service account do Google              |

## 🏗️ Arquitetura

- **Next.js (App Router)** com **React** e **TypeScript**
- **Tailwind CSS** com tema centralizado (design tokens em `globals.css`)
- **Strapi** (headless CMS) - receitas, categorias, e-books e single types (`src/cms/`)
- **Meilisearch** - busca de receitas e e-books com busca semântica (embedders OpenAI)
- **Listmonk** - newsletter, via rota interna `/api/subscribe`
- **Parallel Routes** - slots `@hero` e `@aside` para composição de layout por rota

```
src/
├── app/                  # App Router
│   ├── @hero/            # Slot do hero (home, vendas de e-book)
│   ├── @aside/           # Slot do aside (LayoutAside configurável)
│   ├── api/              # Rotas internas (subscribe, revalidate)
│   ├── receitas/         # Lista e página de receita
│   ├── categorias/       # Lista e página de categoria
│   └── ebooks/           # Catálogo e página de vendas
├── cms/                  # Acesso ao Strapi e Meilisearch
├── components/           # Componentes reutilizáveis
└── methods/              # Helpers compartilhados
```

---

## 🎯 Objetivo Principal

**Vender e-books culinários** através de conteúdo gratuito e conversões
estratégicas. Toda decisão de design e produto usa este objetivo como
critério de desempate.

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

### Padrões Mobile-First

- **Sticky Search**: Input de busca fica fixo no topo quando focado, com
  scroll automático para o topo (apenas mobile)
- **Compact Cards**: Variant `compact` para cards menores em 2 colunas no mobile
- **Grid Responsivo**: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`
- **Progressive Enhancement**: Desktop adiciona features, mobile é a base
- **Touch-First**: Áreas de toque mínimas de 44px em todos os elementos interativos

---

## 🏠 Páginas Principais

### 1. **Home (`/`)**

**Objetivo**: Converter visitantes em compradores de e-books

- **Hero**: E-book principal + headline impactante + CTA grande
- **Content**: E-books em destaque (3-4 máximo - Choice Overload), newsletter
  geral, receitas populares (prova social)

### 2. **Receitas (`/receitas`)**

**Objetivo**: Engajar usuários e converter sutilmente

- **Search sticky** no topo (mobile), resultados imediatos - Cognitive Load
- **Cards compactos** em grid responsivo (2 → 5 colunas)
- **Category badges** destacados nos cards - Von Restorff Effect

### 3. **Receita (`/receitas/:slug`)**

**Objetivo**: Entregar valor e converter no timing certo

#### Receitas Completas (Padrão)

Ordem do conteúdo, baseada em psicologia de conversão:

1. **Valor primeiro**: Breadcrumb + título + galeria + ingredientes + modo de
   preparo completo (o usuário recebe o que veio buscar)
2. **Reciprocidade**: Compartilhamento social após o consumo do valor
3. **Commitment**: Newsletter contextual no momento de maior satisfação
   (Peak-End Rule)
4. **Conversão principal**: E-book recomendado (variant `featured`) quando há
   maior confiança estabelecida
5. **Retenção**: Receitas similares para manter engajamento e reduzir bounce

#### Receitas Exclusivas (`mostrar_ebook` definido)

- **Preview limitado**: Apenas 2 parágrafos do modo de preparo, com gradiente
  de fade-out no segundo - Curiosity Gap
- **Single CTA**: Foco total na conversão do e-book específico, zero distrações
- **Scarcity Principle**: Preview limitado cria sensação de exclusividade

**Copy**: título aspiracional ("Para você que ama cozinhar"), texto conciso,
conexão contextual com o nome da receita, tom elegante sem linguagem vendedora.

### 4. **Categorias (`/categorias`)**

**Objetivo**: Navegação eficiente por tipos de receita

- Grid de categorias com contador de receitas
- Sem Aside nesta página

### 5. **Categoria (`/categorias/:slug`)**

**Objetivo**: Listar receitas da categoria específica

- Breadcrumb + título da categoria (sem hero)
- Lista de receitas com variant `compact` e paginação

### 6. **E-books (`/ebooks`)**

**Objetivo**: Maximizar vendas com página comercial

- Grid comercial de e-books + newsletter específica para e-books

### 7. **E-book (`/ebooks/:slug`)**

**Objetivo**: Converter em compra com página de vendas completa

Estratégia de conversão em 3 momentos:

1. **Hero** com valor imediato: capa (full-width no mobile) + descrição +
   preço + CTA
2. **Benefícios detalhados** para convencimento (campo `pagina_website` em prose)
3. **CTA final com reforço visual** (imagem repetida + copy persuasivo) -
   Peak-End Rule e Mere Exposure Effect

- **Aside minimal** via parallel route - Cognitive Load: foco em uma ação (comprar)
- **Structured Data**: Product schema completo para SEO

### 📌 Aside Padrão (30% desktop)

Todos os asides usam o componente `LayoutAside` configurável, permitindo
ativar/desativar seções por rota com manutenção centralizada:

- **E-book em destaque**: Conversão principal (`featuredEbook`)
- **Quem é a Lets Cozinha**: Credibilidade da marca (`whoIsLets`)
- **Categorias**: Navegação relacionada (`categories`)
- **Newsletter personalizada**: Quando especificada (`newsletter`)

**Exceções**:

- **Receita (`/receitas/:slug`)**: E-book como seção integrada no Content
- **Categorias (`/categorias`)**: Não possui Aside
- **E-books (`/ebooks`)**: Newsletter específica, sem featured ebook
- **E-book (`/ebooks/:slug`)**: Aside minimal (apenas newsletter/contato)

---

## 📄 Páginas Complementares

- `/conheca-a-lets` - Sobre a autora (credibilidade)
- `/contato` - Suporte e confiança
- `/politica-de-privacidade` - Legal
- `/termos-de-uso` - Legal
