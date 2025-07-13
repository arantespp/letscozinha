import { EbookCard } from './EbookCard';
import type { Ebook } from 'src/cms/ebooks';

type ExclusiveRecipePreviewProps = {
  /** Os primeiros parágrafos do modo de preparo */
  instructions: string[];
  /** O e-book que contém a receita completa */
  ebook: Ebook;
  /** Nome da receita para personalizar o texto */
  recipeName: string;
};

/**
 * Componente para mostrar preview de receitas exclusivas de e-books.
 *
 * Mostra apenas os primeiros parágrafos do modo de preparo com um gradiente
 * ofuscando o texto no final, seguido do e-book para conversão.
 *
 * Features:
 * - Gradiente vertical ofuscando o segundo parágrafo
 * - Texto persuasivo sobre exclusividade
 * - E-book em destaque para conversão
 * - Design que cria curiosidade (Von Restorff Effect)
 *
 * @example
 * ```tsx
 * <ExclusiveRecipePreview
 *   instructions={firstTwoInstructions}
 *   ebook={exclusiveEbook}
 *   recipeName="Bolo de Chocolate Especial"
 * />
 * ```
 */
export function ExclusiveRecipePreview({
  instructions,
  ebook,
  recipeName,
}: ExclusiveRecipePreviewProps) {
  // Mostrar apenas os primeiros 2 parágrafos
  const firstTwoInstructions = instructions.slice(0, 2);

  if (firstTwoInstructions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-lg">
      {/* Preview do modo de preparo com gradiente */}
      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-playfair text-text-strong mb-md">
          Modo de preparo
        </h2>

        <div className="space-y-md relative">
          {firstTwoInstructions.map((instruction, index) => (
            <div
              key={index}
              className={`
                leading-relaxed text-text-default
                ${
                  index === firstTwoInstructions.length - 1 &&
                  firstTwoInstructions.length > 1
                    ? 'relative overflow-hidden'
                    : ''
                }
              `}
            >
              <p>{instruction}</p>

              {/* Gradiente no último parágrafo visível */}
              {index === firstTwoInstructions.length - 1 &&
                firstTwoInstructions.length > 1 && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none" />
                )}
            </div>
          ))}
        </div>

        {/* Overlay final para criar efeito de fade out */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      {/* Seção de conversão para o e-book */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border border-primary/10">
        <div className="text-center m-lg ">
          <h3 className="text-xl md:text-2xl font-playfair text-text-strong mb-sm">
            🔒 Receita Exclusiva
          </h3>
          <p className="text-text-light leading-relaxed">
            A receita completa de{' '}
            <strong className="text-text-dark">{recipeName}</strong> com todos
            os passos detalhados, dicas especiais e segredos da Lets está
            disponível exclusivamente no nosso e-book:
          </p>
        </div>

        <div className="flex justify-center">
          <EbookCard ebook={ebook} variant="featured" priority />
        </div>
      </div>
    </div>
  );
}
