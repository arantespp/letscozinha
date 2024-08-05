import logo from '../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import type { Recipe } from 'src/cms/recipes';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const image = recipe.imagens?.[0] || recipe.imagens?.[0].formats.medium;

  return (
    <div className="flex flex-col gap-sm border rounded p-sm shadow-sm hover:shadow-md">
      <div className="aspect-square relative">
        <Image
          className="rounded object-cover object-center"
          src={image?.url || logo}
          alt={recipe.nome}
          fill
          quality={50}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
      </div>
      <h3 className="my-none flex-1">
        <Link href={`/receitas/${recipe.slug}`}>{recipe.nome}</Link>
      </h3>
      <span className="text-text-light line-clamp-5 leading-snug">
        {recipe.descricao}
      </span>
      <Link
        href={`/receitas/${recipe.slug}`}
        className="bg-primary text-text-dark hover:text-neutral rounded p-xs hover:bg-secondary text-center no-underline"
      >
        Ver Receita
      </Link>
    </div>
  );
}
