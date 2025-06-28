import { Card } from './Card';
import { CategoryTag } from './CategoryTag';
import { LinkButton } from './LinkButton';
import { getOptimizedImageProps } from 'src/methods/generateNextImageSizesString';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.png';
import type { Recipe } from 'src/cms/recipes';

// Configurações de tamanho específicas para cards de receitas
const recipeCardSizes = [
  { maxWidth: '640px', size: '90vw' }, // Mobile (mais amplo)
  { maxWidth: '768px', size: '45vw' }, // Tablet (2 colunas)
  { maxWidth: '1024px', size: '30vw' }, // Desktop pequeno (3 colunas)
  { size: '25vw' }, // Desktop grande
];

type RecipeCardProps = {
  /** Recipe data to display */
  recipe: Recipe;
  /** Whether to prioritize image loading (for above-the-fold content) */
  priority?: boolean;
};

/**
 * Recipe Card Component with encapsulated Card presentation.
 *
 * This component follows the project's encapsulation pattern where the Card
 * wrapper is handled internally for consistent presentation across the app.
 *
 * Features:
 * - Responsive image optimization with custom sizes
 * - Touch-friendly CTAs (44px+ following Fitts's Law)
 * - Category tags with primary category highlighted
 * - Hover animations for enhanced UX
 * - Single responsibility: recipe preview and navigation
 * - Von Restorff Effect: Primary category badge for visual distinction
 * - Aesthetic-Usability: Clean design with proper spacing and typography
 *
 * @example
 * ```tsx
 * // Basic usage
 * <RecipeCard recipe={recipe} />
 *
 * // With priority loading (for above-the-fold content)
 * <RecipeCard recipe={recipe} priority />
 * ```
 */

export default function RecipeCard({
  recipe,
  priority = false,
}: RecipeCardProps) {
  const image = recipe.imagens?.[0] || recipe.imagens?.[0]?.formats?.medium;
  const href = `/receitas/${recipe.slug}`;

  // Usando a nova função helper que retorna todas as props otimizadas
  const imageProps = getOptimizedImageProps(image, {
    defaultWidth: 400,
    defaultHeight: 400,
    priority,
    quality: 70,
    customSizes: recipeCardSizes,
    useDefaultSizes: false,
  });

  return (
    <Card
      variant="default"
      className="hover:shadow-lg transition-all duration-300 h-full"
    >
      <div className="flex flex-col gap-sm">
        <Link href={href} className="overflow-hidden rounded-lg block">
          <div className="aspect-square relative overflow-hidden">
            <Image
              className="rounded-lg object-cover object-center transform hover:scale-105 transition-transform duration-500"
              src={image?.url || logo}
              alt={recipe.nome}
              {...imageProps}
            />
            {recipe.categorias && recipe.categorias.length > 0 && (
              <div className="absolute top-2 left-2">
                <span className="bg-primary text-text-dark text-xs font-medium py-1 px-2 rounded-full">
                  {recipe.categorias[0].nome}
                </span>
              </div>
            )}
          </div>
        </Link>
        <div className="flex flex-col gap-xs flex-1 pt-1">
          <h3 className="my-none text-lg line-clamp-2">
            <Link
              href={href}
              className="no-underline hover:text-primary transition-colors"
            >
              {recipe.nome}
            </Link>
          </h3>
          <div className="flex flex-row flex-wrap gap-xs mb-1">
            {(recipe.categorias || []).slice(1).map((category) => (
              <div key={category.documentId}>
                <CategoryTag {...category} isSmall />
              </div>
            ))}
          </div>
          <span className="text-text-light text-sm line-clamp-3 leading-snug mb-auto">
            {recipe.meta_descricao}
          </span>
          <LinkButton
            href={href}
            className="mt-2 text-center bg-primary hover:bg-primary/80 text-text-dark font-medium transition-colors min-h-[44px]"
            aria-label={`Ver receita completa: ${recipe.nome}`}
          >
            Ver Receita
          </LinkButton>
        </div>
      </div>
    </Card>
  );
}
