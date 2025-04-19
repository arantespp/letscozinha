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

export default function RecipeCard({
  recipe,
  priority,
}: {
  recipe: Recipe;
  priority?: boolean;
}) {
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
    <div className="flex flex-col gap-sm border border-gray-100 rounded-lg p-sm shadow-sm hover:shadow-lg transition-all duration-300 bg-white h-full">
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
        <h3 className="my-none text-lg font-bold line-clamp-2">
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
          className="mt-2 text-center bg-primary hover:bg-primary/80 text-text-dark font-medium transition-colors"
        >
          Ver Receita
        </LinkButton>
      </div>
    </div>
  );
}
