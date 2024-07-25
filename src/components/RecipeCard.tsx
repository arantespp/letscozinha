'use client';

import logo from '../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Recipe } from 'src/cms/recipes';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const router = useRouter();

  const image = recipe.imagens?.[0];

  return (
    <div className="flex flex-col gap-sm border rounded p-sm hover:shadow-md">
      <div className="aspect-square relative">
        <Image
          src={image?.url || logo}
          alt={recipe.nome}
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
      <h3 className="my-none">
        <Link href={`/receitas/${recipe.slug}`}>{recipe.nome}</Link>
      </h3>
      <span className="text-text-light line-clamp-5 leading-snug">
        {recipe.descricao}
      </span>
      <button
        className="bg-primary text-text-dark text-neutral rounded p-xs hover:bg-secondary"
        onClick={() => router.push(`/receitas/${recipe.slug}`)}
      >
        Ver Receita
      </button>
    </div>
  );
}
