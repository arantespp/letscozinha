import * as React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container Component
 *
 * Wrapper fundamental para conteúdo com max-width e padding responsivo.
 * Usado como base para estruturação de layout em todas as páginas.
 *
 * Especificações equivalentes à utility @container do globals.css:
 * - Max-width: 80rem (1280px) → max-w-[80rem]
 * - Padding: 1.25rem (20px) horizontal → px-5
 * - Margin: auto (centralizado) → mx-auto
 *
 * @param children - Conteúdo a ser envolvido pelo container
 * @param className - Classes CSS adicionais (opcional)
 */
export function Container({ children, className }: ContainerProps) {
  const baseClasses = 'mx-auto px-5 max-w-[80rem]';
  const finalClasses = className ? `${baseClasses} ${className}` : baseClasses;

  return <div className={finalClasses}>{children}</div>;
}
