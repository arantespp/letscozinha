# Instruções para Agentes de IA

## Regras de Documentação

- ✅ **Documentar no README.md** - Decisões de design, arquitetura e instruções de uso pertencem ao README.md
- ✅ **Documentar diretamente no componente** - JSDoc e comentários detalhados no código quando necessário
- ❌ **NÃO criar arquivos de documentação externos** - Não criar arquivos .md separados
- ❌ **NÃO criar diretórios de exemplos** - Não criar pastas `/examples/` ou similares
- ❌ **NÃO criar arquivos de exemplo** - Não criar arquivos de demonstração separados
- ❌ **NÃO adicionar listas de tarefas ou status de implementação ao README.md** - Progresso é rastreado em issues e pull requests, não na documentação

## Princípios de Desenvolvimento

### Componentização Obrigatória

**REQUISITO FUNDAMENTAL**: Todo bloco de código reutilizável DEVE ser componentizado.

- ✅ **Componentizar blocos reutilizáveis** - Qualquer elemento que apareça em mais de um local
- ✅ **Separar responsabilidades** - Um componente, uma responsabilidade clara
- ✅ **Props tipadas** - Sempre usar TypeScript interfaces para props
- ✅ **JSDoc obrigatório** - Documentar propósito, props e uso de cada componente
- ✅ **Reutilização antes de duplicação** - Sempre verificar se existe componente similar antes de criar novo
- ✅ **Encapsulação visual** - Componentes encapsulam sua própria apresentação, incluindo Cards quando necessário
- ✅ **Variants em vez de duplicação** - Preferir variants (`default`, `compact`, `featured`...) a criar componentes paralelos

### CSS/Styling

- **Apenas classes Tailwind padrão** - Sem CSS customizado fora de `globals.css`
- **Design Tokens** - Usar as cores, tipografia e espaçamentos do tema centralizado
- **Mobile-first** - CSS responsivo partindo do mobile; desktop adiciona features
- **Touch-first** - Áreas de toque mínimas de 44px em todos os elementos interativos

**Sistema de Cores de Texto** (7 cores essenciais do tema):

- `text-text-dark` (principal), `text-text-light` (secundário)
- `text-text-strong` (enfático), `text-text-muted` (auxiliar)
- `text-text-success`, `text-text-error`, `text-text-warning` (feedback)

### Design e UX

Toda decisão de interface deve respeitar as **Laws of UX** e a estratégia de
conversão documentadas no [README.md](./README.md). Em caso de dúvida, o
objetivo principal do projeto é o critério de desempate: **vender e-books
culinários**.

## Comandos

```bash
pnpm dev     # Servidor de desenvolvimento
pnpm build   # Build de produção
pnpm lint    # Lint (next lint)
pnpm test    # Testes unitários (jest, tests/unit)
```
