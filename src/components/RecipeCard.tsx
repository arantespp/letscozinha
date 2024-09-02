import logo from '../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import type { Recipe } from 'src/cms/recipes';
import { CategoryTag } from './CategoryTag';

export default function RecipeCard({
  recipe,
  priority,
}: {
  recipe: Recipe;
  priority?: boolean;
}) {
  const image = recipe.imagens?.[0] || recipe.imagens?.[0].formats.medium;

  const href = `/receitas/${recipe.slug}`;

  return (
    <div className="flex flex-col gap-sm border rounded p-sm shadow-sm hover:shadow-md">
      <Link href={href}>
        <div className="aspect-square relative">
          <Image
            className="rounded object-cover object-center"
            src={image?.url || logo}
            alt={recipe.nome}
            fill
            quality={50}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 300px"
            priority={priority}
          />
        </div>
      </Link>
      <h3 className="my-none flex-1">
        <Link href={href}>{recipe.nome}</Link>
      </h3>
      <div className="flex flex-row flex-wrap gap-xs">
        {(recipe.categorias || []).map((category) => (
          <div key={category.id} className="p-xs">
            <CategoryTag {...category} isSmall />
          </div>
        ))}
      </div>
      <span className="text-text-light line-clamp-5 leading-snug">
        {recipe.descricao}
      </span>
      <Link
        href={href}
        className="bg-primary text-text-dark hover:text-neutral rounded p-xs hover:bg-secondary text-center no-underline"
      >
        Ver Receita
      </Link>
    </div>
  );
}
