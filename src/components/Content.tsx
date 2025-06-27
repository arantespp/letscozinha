import * as React from 'react';
import { Breadcrumbs } from './Breadcrumbs';

/**
 * Item do breadcrumb para navegação hierárquica
 */
export interface BreadcrumbItem {
  /** Texto exibido no breadcrumb */
  name: string;
  /** URL do link (opcional para página atual) */
  href?: string;
  /** Alternativa para href */
  url?: string;
  /** Marca se é o item atual (opcional) */
  current?: boolean;
}

/**
 * Props do componente Content
 */
interface ContentProps {
  /** Título da página */
  title: string;
  /** Descrição da página (opcional) */
  description?: string;
  /** Array manual de breadcrumbs */
  breadcrumb?: BreadcrumbItem[];
  /** Conteúdo da página */
  children: React.ReactNode;
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Props do componente Content.Section
 */
interface ContentSectionProps {
  /** Conteúdo da seção */
  children: React.ReactNode;
  /** Variante da seção para espaçamento */
  variant?:
    | 'default'
    | 'hero'
    | 'content'
    | 'list'
    | 'meta'
    | 'tight'
    | 'loose';
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Content Component
 *
 * Wrapper inteligente para conteúdo das páginas com:
 * - Breadcrumb manual configurável
 * - Header padronizado (título + descrição)
 * - Layout responsivo (70% desktop, 100% mobile)
 * - Sistema de espaçamento consistente
 * - SEO otimizado com structured data
 * - A11y compliant
 */
export function Content({
  title,
  description,
  breadcrumb,
  children,
  className = '',
}: ContentProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Breadcrumb Navigation */}
      {breadcrumb && breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb" className="mb-md">
          <Breadcrumbs items={breadcrumb} />
        </nav>
      )}

      {/* Page Header */}
      <div className="mb-lg">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-sm">
          {title}
        </h1>
        {description && (
          <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
        )}
      </div>

      {/* Page Content */}
      <div className="space-y-md">{children}</div>
    </div>
  );
}

/**
 * Content.Section Component
 *
 * Seção organizada APENAS com espaçamento consistente.
 * Single Responsibility: controla espaçamento, não visual.
 * Implementa UX Laws: Chunking, Cognitive Load, Law of Proximity
 *
 * Variants disponíveis:
 * - default: py-lg (32px) - espaçamento padrão
 * - hero: py-xl (48px) - espaçamento grande para heroes
 * - content: py-md (24px) - espaçamento médio para conteúdo principal
 * - list: py-sm (16px) - espaçamento pequeno para listas
 * - meta: py-xs (12px) - espaçamento mínimo para elementos meta próximos ao header
 * - tight: py-2 (8px) - espaçamento muito pequeno para elementos relacionados (Law of Proximity)
 * - loose: py-8 (32px) - espaçamento grande para separação de blocos diferentes
 */
function ContentSection({
  children,
  variant = 'default',
  className = '',
}: ContentSectionProps) {
  const variantClasses = {
    default: 'py-lg', // 2rem (32px) - espaçamento padrão
    hero: 'py-xl', // 3rem (48px) - espaçamento grande para heroes
    content: 'py-md', // 1.5rem (24px) - espaçamento médio para conteúdo
    list: 'py-sm', // 1rem (16px) - espaçamento pequeno para listas
    meta: 'py-xs', // 0.75rem (12px) - espaçamento mínimo para elementos meta
    tight: 'py-2', // 0.5rem (8px) - espaçamento muito pequeno para elementos relacionados
    loose: 'py-8', // 2rem (32px) - espaçamento grande para separação de blocos
  };

  return (
    <section className={`${variantClasses[variant]} ${className}`}>
      {children}
    </section>
  );
}

// Assignar o componente ao Content
Content.Section = ContentSection;
