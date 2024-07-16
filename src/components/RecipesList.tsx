import Link from 'next/link';
import { Pagination } from './Pagination';

type Recipe = {
  nome: string;
  slug: string;
};

function RecipesCard({ recipe }: { recipe: Recipe }) {
  const href = `/receitas/${recipe.slug}`;

  return (
    <div className="my-1">
      <Link href={href} className="underline">
        {recipe.nome}
      </Link>
    </div>
  );
}

type RecipesListProps = {
  recipes: Recipe[];
  pagination?: {
    pageCount: number;
  };
};

export async function RecipesList(props: RecipesListProps) {
  return (
    <div>
      {props.recipes.map((recipe: Recipe) => (
        <RecipesCard key={recipe.nome} recipe={recipe} />
      ))}
      <div className="my-5">
        {props.pagination && <Pagination pagination={props.pagination} />}
      </div>
    </div>
  );
}
