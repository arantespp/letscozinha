import * as React from 'react';

/**
 * Props do componente Card
 */
interface CardProps {
  /** Conteúdo do card */
  children: React.ReactNode;
  /** Variante do card para diferentes níveis de destaque */
  variant?: 'default' | 'subtle' | 'elevated' | 'outlined';
  /** Padding interno do card */
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  /** Classes CSS adicionais */
  className?: string;
}

/**
 * Card Component
 *
 * Componente simples para destacar conteúdo quando necessário.
 * Use com moderação para evitar sobrecarga visual.
 *
 * Segue Laws of UX:
 * - Von Restorff Effect: Use apenas para conteúdo que precisa se destacar
 * - Aesthetic-Usability Effect: Design limpo e minimalista
 * - Law of Proximity: Agrupa conteúdo relacionado
 *
 * @example
 * ```tsx
 * // Card principal (receita)
 * <Card variant="elevated" padding="lg">
 *   <Markdown source={recipe.receita} />
 * </Card>
 *
 * // Card sutil (compartilhamento)
 * <Card variant="subtle" padding="md">
 *   <RecipeShare />
 * </Card>
 *
 * // Sem card (imagens, listas)
 * <RecipeImages /> // Direto, sem wrapper
 * ```
 */
export function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
}: CardProps) {
  const variantClasses = {
    default: 'bg-white border border-gray-200 rounded-lg',
    subtle: 'bg-gray-50 rounded-md',
    elevated: 'bg-white border border-gray-100 rounded-lg shadow-sm',
    outlined: 'border border-gray-300 rounded-lg',
  };

  const paddingClasses = {
    sm: 'p-sm',
    md: 'p-md',
    lg: 'p-lg',
    xl: 'p-xl',
  };

  return (
    <div
      className={`${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
