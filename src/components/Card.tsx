import * as React from 'react';

/**
 * Props do componente Card
 */
interface CardProps {
  /** Conteúdo do card */
  children: React.ReactNode;
  /** Variante do card para diferentes contextos */
  variant?: 'default' | 'subtle' | 'newsletter';
  /** Background do card (opcional, sobrescreve o padrão da variant) */
  background?:
    | 'white'
    | 'subtle'
    | 'gradient-primary'
    | 'gradient-muted'
    | 'transparent';
  /** Padding interno do card (opcional, sobrescreve o padrão da variant) */
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Card Component
 *
 * Componente flexível para destacar conteúdo com configurações pré-definidas por variant.
 * Cada variant tem background, padding e classes otimizadas para seu contexto de uso.
 *
 * Segue Laws of UX:
 * - Von Restorff Effect: Use apenas para conteúdo que precisa se destacar
 * - Aesthetic-Usability Effect: Design limpo e minimalista
 * - Law of Proximity: Agrupa conteúdo relacionado
 * - Hick's Law: Variants simples reduzem decisões de implementação
 *
 * Variants disponíveis:
 * - default: Card básico branco com borda sutil
 * - subtle: Card com fundo cinza suave (para destaque mínimo)
 * - newsletter: Card com gradiente e sombra (para conversão)
 *
 * @example
 * ```tsx
 * // Uso simples - variant define tudo
 * <Card variant="newsletter">
 *   <RecipeEmailSubscription />
 * </Card>
 *
 * // Card básico para conteúdo principal
 * <Card variant="default">
 *   <MainContent />
 * </Card>
 *
 * // Sobrescrever configurações se necessário
 * <Card variant="default" background="gradient-muted" padding="xl">
 *   <SpecialContent />
 * </Card>
 * ```
 */
export function Card({
  children,
  variant = 'default',
  background,
  padding,
  className = '',
}: CardProps) {
  // Configurações completas por variant
  const variantConfigs = {
    default: {
      background: 'white' as const,
      padding: 'md' as const,
      classes: 'border border-gray-100 rounded-lg shadow-sm',
    },
    subtle: {
      background: 'subtle' as const,
      padding: 'md' as const,
      classes: 'rounded-md',
    },
    newsletter: {
      background: 'gradient-primary' as const,
      padding: 'md' as const,
      classes: 'rounded-lg shadow-sm',
    },
  };

  const backgroundClasses = {
    white: 'bg-white',
    subtle: 'bg-gray-50',
    'gradient-primary': 'bg-gradient-to-br from-primary/10 to-accent/10',
    'gradient-muted': 'bg-gradient-to-b from-muted/50 to-neutral',
    transparent: 'bg-transparent',
  };

  const paddingClasses = {
    sm: 'p-sm',
    md: 'p-md',
    lg: 'p-lg',
    xl: 'p-xl',
  };

  // Usar configurações da variant ou props explícitas
  const config = variantConfigs[variant];
  const finalBackground = background || config.background;
  const finalPadding = padding || config.padding;

  return (
    <div
      className={`${backgroundClasses[finalBackground]} ${config.classes} ${paddingClasses[finalPadding]} ${className}`}
    >
      {children}
    </div>
  );
}
